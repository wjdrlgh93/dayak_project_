package org.spring.backend.board.repository;

import org.spring.backend.board.entity.BoardEntity;
import org.spring.backend.member.entity.MemberEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

        Page<BoardEntity> findAll(Pageable pageable);

        Page<BoardEntity> findByTitleContaining(String keyword, Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM BoardEntity b WHERE b.memberId.id = :id")
    void deleteByMemberId(@Param("id") Long id);

    void deleteByMemberId(MemberEntity member);

}