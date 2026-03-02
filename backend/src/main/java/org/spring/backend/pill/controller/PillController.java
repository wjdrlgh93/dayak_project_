package org.spring.backend.pill.controller;


import lombok.RequiredArgsConstructor;
import org.spring.backend.pill.entity.PillEntity;
import org.spring.backend.pill.service.PillService;
import org.spring.backend.pill.entity.PillEntity;
import org.spring.backend.pill.service.PillService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pill")
@RequiredArgsConstructor
public class PillController {

    private final PillService pillService;

    @GetMapping("/search")
    public ResponseEntity<Page<PillEntity>> searchPills(
            @RequestParam(required = false) String itemName,
            @RequestParam(required = false) String printFront,
            @RequestParam(required = false) String drugShape,
            @RequestParam(required = false) String colorClass1,
            @RequestParam(defaultValue = "0") int page,             @RequestParam(defaultValue = "20") int size)  {

        Page<PillEntity> results = pillService.searchPills(itemName ,printFront, drugShape, colorClass1, page, size);;
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{itemSeq}")
    public ResponseEntity<PillEntity> getPillDetail(@PathVariable String itemSeq) {
        PillEntity pill = pillService.getPillDetail(itemSeq);
        return ResponseEntity.ok(pill);
    }
}