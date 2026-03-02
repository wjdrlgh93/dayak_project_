package org.spring.backend.medication.entity;

import jakarta.persistence.*;
import lombok.*;
import org.spring.backend.global.BasicTime;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "medication_check_tb")
public class MedicationCheckEntity extends BasicTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medication_id")
    private MedicationEntity medication;

        @Column(nullable = false)
    private LocalDate checkDate;

        @Column(nullable = false)
    private LocalTime checkTime;
}