package org.spring.backend.drug.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring.backend.drug.document.DrugDocument;
import org.spring.backend.drug.dto.DrugDto;
import org.spring.backend.drug.entity.DrugEntity;
import org.spring.backend.drug.repository.DrugRepository;
import org.spring.backend.drug.repository.DrugSearchRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final DrugSearchRepository drugSearchRepository;

    @Value("${api.public-data.easy-drug.service-key}")
    private String serviceKey;

    @Value("${api.public-data.easy-drug.url}")
    private String apiUrl;

    @Value("${naver.client.id}")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverClientSecret;

    public Page<DrugDocument> search(String keyword, Pageable pageable) {
        return drugSearchRepository.findByItemNameOrEfficacyOrEntpName(keyword, keyword, keyword, pageable);
    }

    @Transactional
    public void save(DrugEntity entity) {
        DrugDocument document = DrugDocument.builder()
                .id(entity.getId().toString())
                .itemSeq(entity.getItemSeq())
                .itemName(entity.getItemName())
                .entpName(entity.getEntpName())
                .efficacy(entity.getEfficacy())
                .useMethod(entity.getUseMethod())
                .caution(entity.getCaution())
                .itemImage(entity.getItemImage())
                .build();

        drugSearchRepository.save(document);
    }

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

                // 1️⃣ 수정한 부분: 저장된 엔티티 리스트를 반환받습니다.
                // (DrugDataProcessor의 savePage 메서드가 List<DrugEntity>를 반환하도록 수정해야 합니다)
                List<DrugEntity> savedEntities = drugDataProcessor.savePageAndReturn(items);

                // 2️⃣ 추가한 부분: 저장된 엔티티들을 엘라스틱서치에 동기화합니다.
                if (savedEntities != null && !savedEntities.isEmpty()) {
                    for (DrugEntity entity : savedEntities) {
                        this.save(entity); // 기존에 만드신 ES 저장 메서드 호출
                    }
                    log.info("📄 Page {} 완료: {}개 DB 저장 및 ES 동기화 성공", pageNo, savedEntities.size());
                }

                if (items.size() < numOfRows) {
                    log.info("✅ 마지막 페이지 도달 완료.");
                    break;
                }

                pageNo++;
                Thread.sleep(500); // API 과부하 방지

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

            DrugEntity savedEntity = drugRepository.save(entity);
            save(savedEntity);
            log.info("📌 DB & ES 동기화 완료: {}", savedEntity.getItemName());
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
        } catch (Exception e) {
        }
        return "";
    }

    private String cleanText(String text) {
        if (text == null || text.trim().isEmpty()) return "정보 없음";
        return text.replaceAll("<[^>]*>", "").trim();
    }

    public Optional<DrugEntity> getDrugDetail(String itemSeq) {
        return drugRepository.findByItemSeq(itemSeq);
    }

    @Transactional
    public Page<DrugDocument> searchWithAutoSync(String keyword, Pageable pageable) {
        // 1️⃣ 먼저 엘라스틱서치(Nori 분석기 적용됨)에서 검색을 시도합니다.
        Page<DrugDocument> esResults = search(keyword, pageable);

        // 2️⃣ 결과가 없고, 검색의 첫 번째 페이지 요청인 경우에만 실시간 동기화를 수행합니다.
        if (esResults.isEmpty() && pageable.getPageNumber() == 0) {
            log.info("🔍 [Search Fallback] ES 결과 없음. 실시간 API 연동 및 동기화 진행: {}", keyword);

            try {
                // 3️⃣ 기존에 구현된 API 호출 및 저장 로직을 실행합니다.
                // (내부적으로 saveDrugIfNotExists -> save(entity)를 거쳐 ES까지 저장됩니다.)
                fetchAndSaveFromApi(keyword);

                // 4️⃣ 동기화가 완료되었으므로, 다시 한 번 ES에서 검색하여 결과를 가져옵니다.
                esResults = search(keyword, pageable);

                log.info("✅ 실시간 동기화 후 검색 성공: {}건 발견", esResults.getTotalElements());
            } catch (Exception e) {
                log.error("🚨 실시간 동기화 중 오류 발생: {}", e.getMessage());
                // 오류가 발생하더라도 빈 결과를 반환하여 시스템 중단을 방지합니다.
            }
        }
        return esResults;
    }

    @Async
    @Transactional(readOnly = true)
    public void syncAllDbToEs() {
        int pageSize = 100; // 한 번에 처리할 데이터 양
        int currentPage = 0;
        long totalSynced = 0;

        log.info("🚀 [Migration] DB -> ES 동기화 작업을 시작합니다.");

        while (true) {
            // 1. DB에서 한 페이지 분량의 데이터를 가져옵니다.
            Pageable pageable = PageRequest.of(currentPage, pageSize);
            Page<DrugEntity> drugPage = drugRepository.findAll(pageable);

            if (drugPage.isEmpty()) {
                break; // 더 이상 가져올 데이터가 없으면 종료
            }

            // 2. Entity 리스트를 Document 리스트로 변환합니다.
            List<DrugDocument> documents = drugPage.getContent().stream()
                    .map(entity -> DrugDocument.builder()
                            .id(entity.getId().toString())
                            .itemSeq(entity.getItemSeq())
                            .itemName(entity.getItemName())
                            .entpName(entity.getEntpName())
                            .efficacy(entity.getEfficacy())
                            .useMethod(entity.getUseMethod())
                            .caution(entity.getCaution())
                            .itemImage(entity.getItemImage())
                            .build())
                    .toList();

            // 3. 엘라스틱서치에 벌크(Bulk) 저장합니다.
            drugSearchRepository.saveAll(documents);
            totalSynced += documents.size();
            log.info("📦 현재 동기화 진행 중... [{} 건 완료]", totalSynced);

            // 4. 마지막 페이지인지 확인
            if (!drugPage.hasNext()) {
                break;
            }

            currentPage++;
        }

        log.info("✅ 동기화 완료! 총 {} 건의 데이터가 ES로 인덱싱되었습니다.", totalSynced);
    }
}