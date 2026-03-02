package org.spring.backend.medication.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.spring.backend.medication.entity.MedicationEntity;
import org.spring.backend.medication.repository.MedicationCheckRepository;
import org.spring.backend.medication.repository.MedicationRepository;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.medication.service.KakaoMessageService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.time.ZoneId;

@Slf4j
@Component
@RequiredArgsConstructor
public class MedicationScheduler {

    private final MedicationRepository medicationRepository;
    private final MedicationCheckRepository medicationCheckRepository;
    private final KakaoMessageService kakaoMessageService;

    @Transactional
    @Scheduled(cron = "0 * * * * *")     public void processMedicationAlerts() {
                ZonedDateTime seoulNow = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalTime now = LocalTime.now(ZoneId.of("Asia/Seoul")).withSecond(0).withNano(0);
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
                String dayOfWeek = today.getDayOfWeek().name().substring(0, 3);
        log.info("⏰ 스케줄러 가동 [KST]: {}, 요일: {}", now, dayOfWeek);
                        List<MedicationEntity> allData = medicationRepository.findAll();
        log.info("📊 현재 DB 내 전체 약물 수: {}건", allData.size());
        for (MedicationEntity m : allData) {
            log.info("📊 데이터 점검 -> 이름: [{}], 저장된 시간: [{}], 알림설정: [{}], 요일: [{}]",
                    m.getMedicineName(), m.getIntakeTime(), m.isKakaoAlert(), m.getIntakeDays());
        }
                        handleAlerts(now, today, dayOfWeek, "🔔 [복약 알림] 약 드실 시간입니다!", false);

                handleAlerts(now.minusMinutes(10), today, dayOfWeek, "⚠️ [1차 재알림] 아직 복약 확인이 되지 않았습니다. 잊지 말고 챙겨 드세요!", false);

                handleAlerts(now.minusMinutes(20), today, dayOfWeek, "🚨 [최종 재알림] 20분이 지났습니다. 지금 바로 확인해 주세요!", true);
    }

    private void handleAlerts(LocalTime targetIntakeTime, LocalDate today, String dayOfWeek, String messagePrefix, boolean isFinal) {
                List<MedicationEntity> targets = medicationRepository.findByIntakeTime(targetIntakeTime);
        log.info("🎯 시간 [{}] 조회 결과: {}건 발견", targetIntakeTime, targets.size());

        for (MedicationEntity medication : targets) {
                        String savedDays = medication.getIntakeDays().toUpperCase();
            boolean isTodayMed = medication.getIntakeDays().equals("EVERYDAY") || medication.getIntakeDays().contains(dayOfWeek);

            if (!isTodayMed) {
                log.info("💊 약물 체크: [{}] / 저장된 요일: {} / 오늘 요일: {} -> 결과: {}",
                        medication.getMedicineName(), savedDays, dayOfWeek, isTodayMed);
                continue;
            }
            if (!medication.isKakaoAlert()) {
                log.info("⏩ 카톡 알림이 꺼져있음 (isKakaoAlert=false)");
                continue;
            }

                        boolean alreadyTaken = medicationCheckRepository.existsByMedicationIdAndCheckDate(medication.getId(), today);

            if (!alreadyTaken && medication.isKakaoAlert()) {
                MemberEntity user = medication.getMember();
                String fullMessage = messagePrefix + "\n약 이름: " + medication.getMedicineName();

                                kakaoMessageService.sendSelfMessage(user.getId(), medication.getId(), fullMessage);



            }
        }
    }
}