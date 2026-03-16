package org.spring.backend.drug.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.drug.document.DrugDocument;
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
    public ResponseEntity<Page<DrugDocument>> search(
            @RequestParam String keyword,
            @PageableDefault(size = 10) Pageable pageable) {
        // 이전에 만든 하이브리드 검색 메서드 호출
        return ResponseEntity.ok(drugService.searchWithAutoSync(keyword, pageable));
    }

    @GetMapping("/{itemSeq}")
    public ResponseEntity<DrugEntity> getDrugDetail(@PathVariable String itemSeq) {
                        return drugService.getDrugDetail(itemSeq)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sync-db-to-es")
    public ResponseEntity<String> syncDbToEs() {
        drugService.syncAllDbToEs();
        return ResponseEntity.ok("✅ DB 데이터를 ES로 옮기는 작업이 백그라운드에서 시작되었습니다. 로그를 확인해 주세요.");
    }
}
