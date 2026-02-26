package org.spring.backend.medication.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring.backend.config.security.UserPrincipal;
import org.spring.backend.medication.entity.MedicationEntity;
import org.spring.backend.medication.repository.MedicationRepository;
import org.spring.backend.medication.service.KakaoMessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final KakaoMessageService kakaoMessageService;
    private final MedicationRepository medicationRepository;

    
    @PostMapping("/test/self")
    public ResponseEntity<String> sendTestMessage(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        List<MedicationEntity> myMedications = medicationRepository.findByMemberIdOrderByIntakeTimeAsc(userPrincipal.getId());

        
        if (myMedications.isEmpty()) {
            return ResponseEntity.badRequest().body("등록된 약이 없습니다. 약을 먼저 등록해주세요!");
        }

        
        MedicationEntity targetMed = myMedications.get(0);

        try {
            
            
            kakaoMessageService.sendSelfMessage(
                    userPrincipal.getId(),
                    targetMed.getId(),
                    "💊 [테스트] " + targetMed.getMedicineName() + " 드실 시간입니다!"
            );

            
            return ResponseEntity.ok("메시지 전송 성공! 카카오톡을 확인하세요.");

        } catch (Exception e) {
            
            log.error("테스트 메시지 발송 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("메시지 전송 실패: " + e.getMessage());
        }
    }


}
