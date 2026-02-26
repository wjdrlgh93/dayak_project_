package org.spring.backend.pill.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.pill.service.PillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pill")
@RequiredArgsConstructor
public class PillAdminController {

    private final PillService pillService;

    @PostMapping("/sync")
    public ResponseEntity<String> syncPills() {
        
        
        pillService.syncAllPills();
        return ResponseEntity.ok("식약처 알약 데이터 전체 동기화가 완료되었습니다.");
    }
}