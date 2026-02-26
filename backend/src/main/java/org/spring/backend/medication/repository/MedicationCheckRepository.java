package org.spring.backend.medication.repository;

import org.spring.backend.medication.entity.MedicationCheckEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MedicationCheckRepository extends JpaRepository<MedicationCheckEntity, Long> {

    
    List<MedicationCheckEntity> findByMedicationId(Long medicationId);

    
    @Query("SELECT mc FROM MedicationCheckEntity mc " +
            "JOIN FETCH mc.medication m " +
            "WHERE m.member.id = :memberId")
    List<MedicationCheckEntity> findAllByMemberId(@Param("memberId") Long memberId);

    void deleteByMedicationId(Long medicationId);
    boolean existsByMedicationIdAndCheckDate(Long medicationId, LocalDate checkDate);
}