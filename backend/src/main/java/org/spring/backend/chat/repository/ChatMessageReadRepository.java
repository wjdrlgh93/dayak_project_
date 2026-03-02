package org.spring.backend.chat.repository;

import org.spring.backend.chat.entity.ChatMessageEntity;
import org.spring.backend.chat.entity.ChatMessageReadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ChatMessageReadRepository extends JpaRepository<ChatMessageReadEntity, Long> {

    // 🚀 특정 메시지를 특정 사용자가 읽었는지 확인 (중복 방지 핵심) [cite: 2026-02-23]
    boolean existsByMessageAndReaderEmail(ChatMessageEntity message, String readerEmail);

    // 필요 시: 특정 메시지를 읽은 사람의 수를 카운트할 때 사용
    long countByMessage(ChatMessageEntity message);

    @Modifying
    @Transactional
    @Query("DELETE FROM ChatMessageReadEntity r WHERE r.message.roomId = :roomId")
    void deleteByMessageRoomId(@Param("roomId") String roomId);
}