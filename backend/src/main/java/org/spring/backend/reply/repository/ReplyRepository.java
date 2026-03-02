package org.spring.backend.reply.repository;

import org.spring.backend.reply.entity.ReplyEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<ReplyEntity, Long> {

            Page<ReplyEntity> findByBoardId(Long boardId, Pageable pageable);
}