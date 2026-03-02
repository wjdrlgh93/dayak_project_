package org.spring.backend.medication.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicationCheckDto {
    private Long id;
    private String checkDate;     private String medicineName;
    private Long medicationId;
}