package org.spring.backend.pharmacy.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.pharmacy.dto.KakaoPharmacyDto;
import org.spring.backend.pharmacy.dto.PharmacyDto;
import org.spring.backend.pharmacy.entity.PharmacyEntity;
import org.spring.backend.pharmacy.repository.PhamacyRepository;
import org.spring.backend.pharmacy.service.ParmacyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy")
@RequiredArgsConstructor
public class PhamacyController {

    private final PhamacyRepository pharmacyRepository;
    private final ParmacyService parmacyService;

    @PostMapping("/sync-all")
    public ResponseEntity<String> syncAll() {

        
        parmacyService.syncAllPharmacies();
        return ResponseEntity.ok("약국 데이터 동기화가 백그라운드에서 시작되었습니다. 작업 완료 여부는 서버 로그에서 확인해 주세요.");
    }

    @GetMapping("/list")
    public ResponseEntity<Page<PharmacyEntity>> getPharmacyList(
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon,
            @PageableDefault(size = 200) Pageable pageable) {

        
        if (lat == null || lon == null) {
            return ResponseEntity.ok(pharmacyRepository.findAll(pageable));
        }

        return ResponseEntity.ok(pharmacyRepository.findNearbyPharmacies(lat, lon, pageable));
    }

    @PostMapping("/save-kakao-data")
    public ResponseEntity<String> saveKakaoData(@RequestBody List<KakaoPharmacyDto> kakaoList) {
        parmacyService.saveKakaoPharmacies(kakaoList);
        return ResponseEntity.ok("성공: " + kakaoList.size() + "건의 약국 데이터가 처리되었습니다.");
    }

    @GetMapping("/region")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesByRegion(
            @RequestParam String city,     
            @RequestParam String district  
    ) {
        return ResponseEntity.ok(parmacyService.findByRegion(city, district));
    }
}