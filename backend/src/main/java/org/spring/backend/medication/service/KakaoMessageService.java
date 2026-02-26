package org.spring.backend.medication.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; 
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j 
@Service
@RequiredArgsConstructor
public class KakaoMessageService {

    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;

    @Value("${kakao.client-id}")
    private String clientId;

    
    public void sendSelfMessage(Long memberId, Long medicationId, String text) {
        MemberEntity member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        String url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
        String accessToken = member.getKakaoAccessToken();

        log.info("📢 알림 전송 시도: 회원ID={}, 약물ID={}", memberId, medicationId);

        executeSendMessage(url, accessToken, text, member, medicationId);
    }

    
    private void executeSendMessage(String url, String accessToken, String text, MemberEntity member, Long medicationId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        
        long sentAt = System.currentTimeMillis();

        
        
        String linkUrl = "http://168.107.15.125:8080/api/medication/check/direct?id="
                + medicationId + "&sentAt=" + sentAt;

        String safeText = text.replace("\n", " ").replace("\"", "'");

        
        String templateJson = "{" +
                "\"object_type\":\"text\"," +
                "\"text\":\"" + safeText + "\"," +
                "\"link\":{" +
                "\"web_url\":\"" + linkUrl + "\"," +
                "\"mobile_web_url\":\"" + linkUrl + "\"" +
                "}," +
                "\"buttons\": [" +
                "{" +
                "\"title\": \"약 먹었어요 💊\"," +
                "\"link\": {" +
                "\"web_url\": \"" + linkUrl + "\"," +
                "\"mobile_web_url\": \"" + linkUrl + "\"" +
                "}" +
                "}" +
                "]" +
                "}";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("template_object", templateJson);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("✅ 카카오톡 전송 성공! (회원: {})", member.getName());

        } catch (HttpClientErrorException e) {
            log.error("❌ 전송 실패 (HTTP {}): {}", e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("❌ 알 수 없는 오류 발생", e);
        }
    }
    
    public String refreshKakaoToken(MemberEntity member) {
        String url = "https://kauth.kakao.com/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "refresh_token");
        params.add("client_id", clientId);
        params.add("refresh_token", member.getKakaoRefreshToken());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            Map<String, Object> body = response.getBody();

            String newAccessToken = (String) body.get("access_token");
            member.setKakaoAccessToken(newAccessToken);

            if (body.containsKey("refresh_token")) {
                member.setKakaoRefreshToken((String) body.get("refresh_token"));
                log.info("🔄 리프레시 토큰도 함께 갱신되었습니다.");
            }

            memberRepository.save(member);
            log.info("✅ 액세스 토큰 갱신 완료");
            return newAccessToken;

        } catch (HttpClientErrorException e) {
            log.error("❌ 토큰 갱신 API 호출 실패: {}", e.getResponseBodyAsString());
            return null;
        } catch (Exception e) {
            log.error("❌ 토큰 갱신 중 예외 발생", e);
            return null;
        }
    }
}