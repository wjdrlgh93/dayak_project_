package org.spring.backend.pill.repository;

import org.spring.backend.pill.entity.PillEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PillRepository extends JpaRepository<PillEntity, Long> {

    
    boolean existsByItemSeq(String itemSeq);

    
    Optional<PillEntity> findByItemSeq(String itemSeq);

    List<PillEntity> findAllByItemSeqIn(List<String> itemSeqs);


    /**
     * [DB 전수 조사용 쿼리]
     * 사용자가 입력한 3가지 조건(식별문자, 모양, 색상)을 모두 만족하는 데이터를 찾습니다.
     * 식별문자는 앞면(printFront) 또는 뒷면(printBack)에 포함되어 있으면 검색됩니다.
     */
    @Query("SELECT p FROM PillEntity p " +
            "WHERE (:itemName IS NULL OR :itemName = '' OR p.itemName LIKE %:itemName%) " + 
            "AND (:printFront IS NULL OR :printFront = '' OR " +
            "      p.printFront LIKE %:printFront% OR p.printBack LIKE %:printFront%) " +
            "AND (:drugShape IS NULL OR :drugShape = '' OR p.drugShape LIKE %:drugShape%) " +
            "AND (:colorClass1 IS NULL OR :colorClass1 = '' OR p.colorClass1 LIKE %:colorClass1%)")
    Page<PillEntity> searchPills(
            @Param("itemName") String itemName, 
            @Param("printFront") String printFront,
            @Param("drugShape") String drugShape,
            @Param("colorClass1") String colorClass1,
            Pageable pageable
    );
}
