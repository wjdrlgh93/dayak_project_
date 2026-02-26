package org.spring.backend.pill.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
@RequiredArgsConstructor
public class OpenApiManager {

    private final RestTemplate restTemplate;

    
    @Value("${api.public-data.service-key}")
    private String serviceKey;

    @Value("${api.public-data.url}")
    private String baseUrl;

    /**
     * 공공데이터 포털 API 호출 (JSON 응답 반환)
     */
    public String fetchAllPills(int pageNo, int numOfRows) {
        try {
            
            
            URI uri = UriComponentsBuilder.fromHttpUrl(baseUrl)
                    .queryParam("serviceKey", serviceKey) 
                    .queryParam("pageNo", pageNo)
                    .queryParam("numOfRows", numOfRows)
                    .queryParam("type", "json") 
                    .build(true) 
                    .toUri();

            log.info("API 호출 URL: {}", uri);

            
            return restTemplate.getForObject(uri, String.class);

        } catch (Exception e) {
            log.error("API 호출 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("공공데이터 API 호출 실패", e);
        }
    }
}