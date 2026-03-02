package org.spring.backend.medication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicationDto {
    private Long medicationId;
    private String medicineName;
    private String intakeTime;     private String intakeDays;

    @JsonProperty("isKakaoAlert")
    private boolean isKakaoAlert;
    private boolean isActive;
}