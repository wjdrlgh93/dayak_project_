package org.spring.backend.drug.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.drug.service.DrugService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drug")
@RequiredArgsConstructor
public class DrugAdminController {

    private final DrugService drugService;

        @PostMapping("/sync")
    public ResponseEntity<String> syncDrugs() {
                drugService.syncAllDrugs();
        return ResponseEntity.ok("e약은요(Drug) 데이터 전체 동기화가 완료되었습니다.");
    }
}