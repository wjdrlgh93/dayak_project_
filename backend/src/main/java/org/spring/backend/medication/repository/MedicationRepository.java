package org.spring.backend.medication.repository;

import org.spring.backend.medication.entity.MedicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;

public interface MedicationRepository extends JpaRepository<MedicationEntity, Long> {

            @Query("SELECT m FROM MedicationEntity m " +
            "JOIN FETCH m.member " +
            "WHERE m.isActive = true " +
            "AND m.isKakaoAlert = true " +
                        "AND FUNCTION('TIME_FORMAT', m.intakeTime, '%H:%i') = FUNCTION('TIME_FORMAT', :now, '%H:%i')")
    List<MedicationEntity> findByIntakeTime(@Param("now") LocalTime now);

    List<MedicationEntity> findByMemberIdOrderByIntakeTimeAsc(Long memberId);

}