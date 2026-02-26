package org.spring.backend.board.repository;

import org.spring.backend.board.entity.NoticeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {
    Page<NoticeEntity> findAllByOrderByIsPinnedDescCreatedAtDesc(Pageable pageable);
}
