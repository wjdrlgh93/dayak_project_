package org.spring.backend.medication.entity;

import jakarta.persistence.*;
import lombok.*;
import org.spring.backend.global.BasicTime;
import org.spring.backend.medication.constant.IntakeStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "medication_log_tb")
public class MedicationLogEntity extends BasicTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medication_id")
    private MedicationEntity medication;

        @Column(nullable = false)
    private LocalDate targetDate;

        private LocalDateTime takenTime;

        @Enumerated(EnumType.STRING)
    private IntakeStatus status; 
        @Builder.Default
    private boolean isGuardianNotified = false;
}