package org.spring.backend.medication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicationRequestDto {
    private String medicineName;
    private String intakeTime; 
    private String intakeDays; 

    @JsonProperty("isKakaoAlert")
    private boolean isKakaoAlert;
}