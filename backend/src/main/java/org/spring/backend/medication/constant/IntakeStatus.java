package org.spring.backend.medication.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum IntakeStatus {
    PENDING("복용 전"),       TAKEN("복용 완료"),       MISSED("복용 잊음"),      SKIPPED("건너뜀");    
    private final String description;
}