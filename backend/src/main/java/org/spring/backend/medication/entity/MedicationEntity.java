package org.spring.backend.medication.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.spring.backend.global.BasicTime;
import org.spring.backend.member.entity.MemberEntity;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "medication_tb")
public class MedicationEntity extends BasicTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medication_id")
    @JsonProperty("medicationId")
    private Long id;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity member;

    
    @Column(nullable = false)
    private String medicineName;

    
    
    @Column(nullable = false)
    @JsonProperty("intakeTime")
    private LocalTime intakeTime;

    
    @Column(nullable = false)
    private String intakeDays;

    
    @Column(nullable = false)
    @JsonProperty("isKakaoAlert")
    private boolean isKakaoAlert;

    
    @Builder.Default
    private boolean isActive = true;


    @OneToMany(mappedBy = "medication", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<MedicationCheckEntity> medicationChecks = new ArrayList<>();
}