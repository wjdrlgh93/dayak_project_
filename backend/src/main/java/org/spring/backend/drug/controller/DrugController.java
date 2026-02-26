package org.spring.backend.drug.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.drug.entity.DrugEntity;
import org.spring.backend.drug.service.DrugService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drug")
@RequiredArgsConstructor
public class DrugController {

    private final DrugService drugService;

    
    
    
    @GetMapping("/search")
    public ResponseEntity<Page<DrugEntity>> searchDrugs(
            @RequestParam String keyword,
            @PageableDefault(size = 10, sort = "itemName", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        Page<DrugEntity> result = drugService.searchDrug(keyword, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{itemSeq}")
    public ResponseEntity<DrugEntity> getDrugDetail(@PathVariable String itemSeq) {
        
        
        return drugService.getDrugDetail(itemSeq)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
