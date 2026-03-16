package org.spring.backend.drug.service;

import lombok.RequiredArgsConstructor;
import org.spring.backend.drug.dto.DrugDto;
import org.spring.backend.drug.entity.DrugEntity;
import org.spring.backend.drug.repository.DrugRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DrugDataProcessor {

    private final DrugRepository drugRepository;
        
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public int savePage(List<DrugDto.Item> items) {
        if (items == null || items.isEmpty()) return 0;

        int savedCount = 0;
        for (DrugDto.Item item : items) {
                        if (!drugRepository.existsByItemSeq(item.getItemSeq())) {
                DrugEntity entity = DrugEntity.builder()
                        .itemSeq(item.getItemSeq())
                        .itemName(item.getItemName())
                        .entpName(item.getEntpName())
                        .efficacy(cleanText(item.getEfficacy()))
                        .useMethod(cleanText(item.getUseMethod()))
                        .caution(cleanText(item.getCaution()))
                        .itemImage(item.getItemImage())
                        .build();
                drugRepository.save(entity);
                savedCount++;
            }
        }
        return savedCount;
    }

    private String cleanText(String text) {
        if (text == null || text.trim().isEmpty()) return "정보 없음";
        return text.replaceAll("<[^>]*>", "").trim();
    }

    @Transactional
    public List<DrugEntity> savePageAndReturn(List<DrugDto.Item> items) {
        List<DrugEntity> savedEntities = new ArrayList<>();

        for (DrugDto.Item item : items) {
            // 1. 이미 존재하는 데이터인지 확인 (중복 저장 방지)
            if (!drugRepository.existsByItemSeq(item.getItemSeq())) {

                // 2. DTO -> Entity 변환
                DrugEntity entity = DrugEntity.builder()
                        .itemSeq(item.getItemSeq())
                        .itemName(item.getItemName())
                        .entpName(item.getEntpName())
                        .efficacy(cleanText(item.getEfficacy()))
                        .useMethod(cleanText(item.getUseMethod()))
                        .caution(cleanText(item.getCaution()))
                        .itemImage(item.getItemImage())
                        .build();

                // 3. DB 저장 후 결과 리스트에 추가
                savedEntities.add(drugRepository.save(entity));
            }
        }

        return savedEntities; // 저장된 녀석들만 싹 모아서 반환!
    }
}