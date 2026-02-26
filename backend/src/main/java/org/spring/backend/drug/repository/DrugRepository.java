package org.spring.backend.drug.repository;

import org.spring.backend.drug.entity.DrugEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrugRepository extends JpaRepository<DrugEntity, Long> {

    
    List<DrugEntity> findByItemNameContaining(String keyword);

    
    boolean existsByItemSeq(String itemSeq);

    Page<DrugEntity> findByItemNameContaining(String keyword, Pageable pageable);

    Optional<DrugEntity> findByItemSeq(String itemSeq);
}