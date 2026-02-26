package org.spring.backend.drug.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring.backend.drug.dto.DrugDto;
import org.spring.backend.drug.entity.DrugEntity;
import org.spring.backend.drug.repository.DrugRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DrugService {

    private final DrugRepository drugRepository;
    private final DrugDataProcessor drugDataProcessor;

    @Value("${api.public-data.easy-drug.service-key}")
    private String serviceKey;

    @Value("${api.public-data.easy-drug.url}")
    private String apiUrl;

    @Value("${naver.client.id}")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverClientSecret;

    
    
    
    @Transactional
    public Page<DrugEntity> searchDrug(String keyword, Pageable pageable) {
        
        Page<DrugEntity> dbResults = drugRepository.findByItemNameContaining(keyword, pageable);

        
        if (dbResults.isEmpty() && pageable.getPageNumber() == 0) {
            System.out.println("🔍 DB에 데이터 없음. API 호출 수행: " + keyword);

            
            fetchAndSaveFromApi(keyword);

            
            return drugRepository.findByItemNameContaining(keyword, pageable);
        }

        return dbResults;
    }

    
    
    
    @Async
    public void syncAllDrugs() {
        int pageNo = 1;
        int numOfRows = 100;

        log.info("🚀 [e약은요] 전체 동기화 시작 (비동기)");

        while (true) {
            try {
                log.info("🔄 동기화 진행 중... Page: {}", pageNo);
                URI uri = buildUri(null, pageNo, numOfRows);
                List<DrugDto.Item> items = fetchItemsFromUri(uri);

                if (items == null || items.isEmpty()) {
                    log.info("✅ 더 이상 가져올 데이터가 없습니다.");
                    break;
                }

                
                int savedCount = drugDataProcessor.savePage(items);

                log.info("📄 Page {} 완료: {}개 신규 저장", pageNo, savedCount);

                if (items.size() < numOfRows) {
                    log.info("✅ 마지막 페이지 도달 완료.");
                    break;
                }

                pageNo++;

                
                Thread.sleep(500);

            } catch (Exception e) {
                log.error("🚨 동기화 중 오류 발생 (Page {}): {}", pageNo, e.getMessage());
                break; 
            }
        }
        log.info("🏁 [e약은요] 전체 동기화 프로세스 종료");
    }

    
    
    

    
    private void fetchAndSaveFromApi(String keyword) {
        
        URI uri = buildUri(keyword, 1, 20);
        List<DrugDto.Item> apiResults = fetchItemsFromUri(uri);

        if (apiResults != null) {
            for (DrugDto.Item item : apiResults) {
                saveDrugIfNotExists(item);
            }
        }
    }

    private URI buildUri(String keyword, int pageNo, int numOfRows) {
        
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("serviceKey", serviceKey)
                .queryParam("pageNo", pageNo)
                .queryParam("numOfRows", numOfRows)
                .queryParam("type", "json");

        if (keyword != null && !keyword.isEmpty()) {
            builder.queryParam("itemName", keyword);
        }

        
        
        return builder.build().encode().toUri();
    }

    private List<DrugDto.Item> fetchItemsFromUri(URI uri) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            DrugDto response = restTemplate.getForObject(uri, DrugDto.class);
            if (response != null && response.getBody() != null && response.getBody().getItems() != null) {
                return response.getBody().getItems();
            }
        } catch (Exception e) {
            System.out.println("🚨 API 호출 오류: " + e.getMessage());
        }
        return Collections.emptyList();
    }

    private void saveDrugIfNotExists(DrugDto.Item item) {
        if (!drugRepository.existsByItemSeq(item.getItemSeq())) {
            String efficacy = cleanText(item.getEfficacy());

            if (efficacy.equals("정보 없음") || efficacy.isEmpty()) {
                String naverResult = searchNaverEncyclopedia(item.getItemName());
                if (!naverResult.isEmpty()) efficacy = naverResult;
            }

            DrugEntity entity = DrugEntity.builder()
                    .itemSeq(item.getItemSeq())
                    .itemName(item.getItemName())
                    .entpName(item.getEntpName())
                    .efficacy(efficacy)
                    .useMethod(cleanText(item.getUseMethod()))
                    .caution(cleanText(item.getCaution()))
                    .itemImage(item.getItemImage())
                    .build();

            drugRepository.save(entity);
        }
    }

    private String searchNaverEncyclopedia(String query) {
        
        try {
            RestTemplate restTemplate = new RestTemplate();
            String searchWord = query + " 효능";
            URI uri = UriComponentsBuilder.fromUriString("https://openapi.naver.com")
                    .path("/v1/search/encyc.json")
                    .queryParam("query", searchWord).queryParam("display", 1)
                    .encode(StandardCharsets.UTF_8).build().toUri();
            RequestEntity<Void> req = RequestEntity.get(uri)
                    .header("X-Naver-Client-Id", naverClientId)
                    .header("X-Naver-Client-Secret", naverClientSecret).build();
            ResponseEntity<Map> res = restTemplate.exchange(req, Map.class);
            Map<String, Object> body = res.getBody();
            if (body != null && body.containsKey("items")) {
                List<Map> items = (List<Map>) body.get("items");
                if (!items.isEmpty()) return ((String) items.get(0).get("description")).replaceAll("<[^>]*>", "");
            }
        } catch (Exception e) { }
        return "";
    }

    private String cleanText(String text) {
        if (text == null || text.trim().isEmpty()) return "정보 없음";
        return text.replaceAll("<[^>]*>", "").trim();
    }

    public Optional<DrugEntity> getDrugDetail(String itemSeq) {
        
        
        
        return drugRepository.findByItemSeq(itemSeq);
    }
}