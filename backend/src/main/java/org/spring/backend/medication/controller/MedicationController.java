package org.spring.backend.medication.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.config.security.UserPrincipal;
import org.spring.backend.medication.dto.MedicationCheckDto;
import org.spring.backend.medication.dto.MedicationDto;
import org.spring.backend.medication.dto.MedicationRequestDto;
import org.spring.backend.medication.entity.MedicationCheckEntity;
import org.spring.backend.medication.entity.MedicationEntity;
import org.spring.backend.medication.repository.MedicationCheckRepository;
import org.spring.backend.medication.repository.MedicationRepository;
import org.spring.backend.member.dto.GuardianSaveDto;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/medication")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationRepository medicationRepository;
    private final MemberRepository memberRepository;
    private final MedicationCheckRepository medicationCheckRepository;
    private final RestTemplate restTemplate;

        @DeleteMapping("/{id}")
    @Transactional     public ResponseEntity<?> deleteMedication(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        MedicationEntity medication = medicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 약을 찾을 수 없습니다."));

        if (!medication.getMember().getId().equals(userPrincipal.getId())) {
            return ResponseEntity.status(403).body("삭제 권한이 없습니다.");
        }

                        medicationCheckRepository.deleteByMedicationId(id);

                medicationRepository.delete(medication);

        return ResponseEntity.ok("삭제 성공");
    }
    @GetMapping("/{id}")
    public ResponseEntity<MedicationDto> getMedicationDetail(@PathVariable Long id) {
        MedicationEntity m = medicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 약 정보를 찾을 수 없습니다. ID: " + id));

        MedicationDto dto = MedicationDto.builder()
                .medicationId(m.getId())
                .medicineName(m.getMedicineName())
                .intakeTime(m.getIntakeTime() != null ? m.getIntakeTime().toString() : null)
                .intakeDays(m.getIntakeDays())
                .isKakaoAlert(m.isKakaoAlert())
                .isActive(m.isActive())
                .build();

        return ResponseEntity.ok(dto);
    }
        @PutMapping("/{id}")
    public ResponseEntity<?> updateMedication(
            @PathVariable Long id,
            @RequestBody MedicationDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        MedicationEntity medication = medicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 약을 찾을 수 없습니다."));

        if (!medication.getMember().getId().equals(userPrincipal.getId())) {
            return ResponseEntity.status(403).body("수정 권한이 없습니다.");
        }

                medication.setMedicineName(dto.getMedicineName());
        medication.setIntakeTime(LocalTime.parse(dto.getIntakeTime()));
        medication.setIntakeDays(dto.getIntakeDays());
        medication.setKakaoAlert(dto.isKakaoAlert());

        medicationRepository.save(medication);
        return ResponseEntity.ok("수정 성공");
    }

        @PostMapping
    public ResponseEntity<String> registerMedication(
            @RequestBody MedicationRequestDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

                MemberEntity member = memberRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

                MedicationEntity medication = MedicationEntity.builder()
                .member(member)
                .medicineName(dto.getMedicineName())
                .intakeTime(LocalTime.parse(dto.getIntakeTime()))                 .intakeDays(dto.getIntakeDays())
                .isKakaoAlert(dto.isKakaoAlert())
                .isActive(true)
                .build();

        medicationRepository.save(medication);

        return ResponseEntity.ok("복약 알림이 등록되었습니다.");
    }

        @GetMapping("/list")
    public ResponseEntity<List<MedicationDto>> getMyMedications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<MedicationEntity> entities = medicationRepository.findByMemberIdOrderByIntakeTimeAsc(userPrincipal.getId());

        List<MedicationDto> dtos = entities.stream().map(m -> MedicationDto.builder()
                .medicationId(m.getId())                 .medicineName(m.getMedicineName())
                .intakeTime(m.getIntakeTime() != null ? m.getIntakeTime().toString() : null)
                .intakeDays(m.getIntakeDays())
                .isKakaoAlert(m.isKakaoAlert())
                .isActive(m.isActive())
                .build()).toList();

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/check/history")
    public ResponseEntity<List<MedicationCheckDto>> getCheckHistory(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<MedicationCheckEntity> history = medicationCheckRepository.findAllByMemberId(userPrincipal.getId());

                List<MedicationCheckDto> dtoList = history.stream().map(h -> MedicationCheckDto.builder()
                .id(h.getId())
                .checkDate(h.getCheckDate().toString())
                .medicineName(h.getMedication().getMedicineName())
                .medicationId(h.getMedication().getId())
                .build()).toList();

        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/check/direct")
    @ResponseBody
    public String directCheck(
            @RequestParam("id") Long medicationId,
            @RequestParam("sentAt") Long sentAt) {

                long currentTime = System.currentTimeMillis();
        if (currentTime - sentAt > 60 * 60 * 1000) {
            return "<html><body><script>alert('⏰ 알림이 만료되었습니다.'); window.close();</script></body></html>";
        }

        LocalDate today = LocalDate.now();

                if (medicationCheckRepository.existsByMedicationIdAndCheckDate(medicationId, today)) {
            return "<html><head><meta charset='UTF-8'></head><body>" +
                    "<script>alert('이미 오늘의 복약 확인이 완료되었습니다! 중복 기록되지 않습니다.'); window.close();</script>" +
                    "</body></html>";
        }

        try {
            MedicationEntity medication = medicationRepository.findById(medicationId)
                    .orElseThrow(() -> new IllegalArgumentException("정보 없음"));

                        MedicationCheckEntity check = MedicationCheckEntity.builder()
                    .medication(medication)
                    .checkDate(today)
                    .checkTime(LocalTime.now())
                    .build();

            medicationCheckRepository.save(check);

            return "<html><head><meta charset='UTF-8'></head><body>" +
                    "<script>alert('✅ [" + medication.getMedicineName() + "] 복약 확인 완료!'); window.close();</script>" +
                    "</body></html>";

        } catch (Exception e) {
            return "<html><body><script>alert('에러 발생');</script></body></html>";
        }
    }

    @GetMapping("/kakao/friends")
    public ResponseEntity<?> getKakaoFriends(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        String accessToken = getAccessToken(userPrincipal.getId());         String url = "https://kapi.kakao.com/v1/api/talk/friends";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    }

    private String getAccessToken(Long memberId) {
                MemberEntity member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

                String token = member.getKakaoAccessToken();

        if (token == null || token.isEmpty()) {
            throw new IllegalStateException("카카오 액세스 토큰이 없습니다. 다시 로그인해주세요.");
        }

        return token;
    }

    @PostMapping("/member/guardian")
    public ResponseEntity<?> saveGuardian(
            @RequestBody GuardianSaveDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

                MemberEntity member = memberRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

                member.setGuardianUuid(dto.getGuardianUuid());
        member.setGuardianName(dto.getGuardianName());

        memberRepository.save(member); 
        return ResponseEntity.ok("보호자 지정 성공!");
    }
}