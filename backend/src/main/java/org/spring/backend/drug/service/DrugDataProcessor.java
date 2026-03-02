package org.spring.backend.drug.service;

import lombok.RequiredArgsConstructor;
import org.spring.backend.drug.dto.DrugDto;
import org.spring.backend.drug.entity.DrugEntity;
import org.spring.backend.drug.repository.DrugRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
}