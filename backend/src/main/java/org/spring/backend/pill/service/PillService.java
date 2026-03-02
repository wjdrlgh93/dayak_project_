package org.spring.backend.pill.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring.backend.pill.dto.PillDto;
import org.spring.backend.pill.entity.PillEntity;
import org.spring.backend.pill.repository.PillRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PillService {

    private final PillRepository pillRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${api.public-data.service-key}")
    private String serviceKey;

    @Value("${api.public-data.url}")
    private String apiUrl;

    @Value("${naver.client.id}")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverClientSecret;

    /**
     * ✅ 검색 + 네이버 설명 자동 보강 로직
     */

    @Transactional(readOnly = true)
    public Page<PillEntity> searchPills(String itemName, String printFront, String drugShape, String colorClass1, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        String cleanName = (itemName != null) ? itemName.trim() : "";
        String cleanPrint = (printFront != null) ? printFront.trim().toUpperCase() : "";
        String cleanShape = (drugShape != null && !drugShape.equals("전체") && !drugShape.isEmpty()) ? drugShape : null;
        String cleanColor = (colorClass1 != null && !colorClass1.equals("전체") && !colorClass1.isEmpty()) ? colorClass1 : null;

                return pillRepository.searchPills(cleanName, cleanPrint, cleanShape, cleanColor, pageable);
    }

        @Transactional
    public PillEntity getPillDetail(String itemSeq) {
                PillEntity pill = pillRepository.findByItemSeq(itemSeq)
                .orElseThrow(() -> new IllegalArgumentException("해당 알약 정보를 찾을 수 없습니다: " + itemSeq));

                if (pill.getEfficacy() == null || pill.getEfficacy().isEmpty() || pill.getEfficacy().equals("정보 없음")) {
            String naverDesc = searchNaverEncyclopedia(pill.getItemName());
            if (!naverDesc.equals("정보 없음")) {
                pill.setEfficacy(naverDesc);
            }
        }
        return pill;
    }

    public String searchNaverEncyclopedia(String query) {
        if (query == null || query.isEmpty()) return "정보 없음";

        try {
                        String cleanQuery = query.split("\\(")[0].trim();             String searchWord = cleanQuery + " 효능";

            URI uri = UriComponentsBuilder
                    .fromUriString("https://openapi.naver.com/v1/search/encyc.json")
                    .queryParam("query", searchWord)
                    .queryParam("display", 1)                     .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUri();

            RequestEntity<Void> req = RequestEntity
                    .get(uri)
                    .header("X-Naver-Client-Id", naverClientId)
                    .header("X-Naver-Client-Secret", naverClientSecret)
                    .build();

            ResponseEntity<Map> response = restTemplate.exchange(req, Map.class);
            Map<String, Object> body = response.getBody();

            if (body != null && body.get("items") instanceof List) {
                List<Map<String, String>> items = (List<Map<String, String>>) body.get("items");
                if (!items.isEmpty()) {
                                        String description = items.get(0).get("description");
                    return description.replaceAll("<[^>]*>", "").trim();
                }
            }
        } catch (Exception e) {
            log.warn("🚨 네이버 검색 실패 ({}): {}", query, e.getMessage());
        }
        return "정보 없음";
    }

    @Async
    public void syncAllPills() {
        int pageNo = 1;
        int numOfRows = 100;
        int errorCount = 0; 
        while (true) {
            try {
                int savedCount = savePageFromApi(pageNo, numOfRows);

                if (savedCount == 0) {
                    log.info("=== 더 이상 가져올 데이터가 없습니다. 종료 ===");
                    break;
                }

                log.info("페이지 {} 완료 ({}개 저장)", pageNo, savedCount);
                pageNo++;
                errorCount = 0;                 Thread.sleep(500); 
            } catch (Exception e) {
                errorCount++;
                log.error("🚨 페이지 {} 에러: {}", pageNo, e.getMessage());

                if (errorCount > 3) {                     log.error("연속 에러 발생으로 동기화 중단");
                    break;
                }

                                pageNo++;
            }
        }
    }
    /**
     * ✅ 페이지 단위로 트랜잭션을 분리하여 실행 (Propagation.REQUIRES_NEW)
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public int savePageFromApi(int pageNo, int numOfRows) throws Exception {
                URI uri = UriComponentsBuilder
                .fromHttpUrl(apiUrl)
                .queryParam("serviceKey", serviceKey)
                .queryParam("pageNo", pageNo)
                .queryParam("numOfRows", numOfRows)
                .queryParam("type", "json")
                .build(true)
                .toUri();

        ResponseEntity<Map> response = restTemplate.getForEntity(uri, Map.class);
        if (response.getBody() == null || response.getBody().get("body") == null) {
            return 0;
        }

        Map<String, Object> body = (Map<String, Object>) response.getBody().get("body");
        List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("items");

        if (items == null || items.isEmpty()) {
            return 0;
        }

                List<String> itemSeqs = items.stream()
                .map(item -> String.valueOf(item.get("ITEM_SEQ")))
                .collect(Collectors.toList());

                List<PillEntity> existingPills = pillRepository.findAllByItemSeqIn(itemSeqs);
        Map<String, PillEntity> pillMap = existingPills.stream()
                .collect(Collectors.toMap(PillEntity::getItemSeq, p -> p));

        List<PillEntity> saveList = new ArrayList<>();

                for (Map<String, Object> item : items) {
            String itemSeq = String.valueOf(item.get("ITEM_SEQ"));

                        PillEntity pill = pillMap.getOrDefault(itemSeq, new PillEntity());

                        pill.setItemSeq(itemSeq);
            pill.setItemName(String.valueOf(item.get("ITEM_NAME")));
            pill.setEntpName(String.valueOf(item.get("ENTP_NAME")));
            pill.setChart(String.valueOf(item.get("CHART")));
            pill.setItemImage(String.valueOf(item.get("ITEM_IMAGE")));
            pill.setDrugShape(String.valueOf(item.get("DRUG_SHAPE")));
            pill.setColorClass1(String.valueOf(item.get("COLOR_CLASS1")));
            pill.setPrintFront(String.valueOf(item.get("PRINT_FRONT")));
            pill.setPrintBack(String.valueOf(item.get("PRINT_BACK")));

                        if (pill.getEfficacy() == null) {
                pill.setEfficacy("정보 없음");
            }

            saveList.add(pill);
        }

                pillRepository.saveAll(saveList);

        return saveList.size();
    }
}