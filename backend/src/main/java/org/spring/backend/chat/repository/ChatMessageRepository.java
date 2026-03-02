package org.spring.backend.chat.repository;

import org.spring.backend.chat.entity.ChatMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {


    void deleteByRoomId(String roomId);
    // 🚀 1. 특정 방의 이전 대화 내역을 시간순으로 불러오기
   List<ChatMessageEntity> findByRoomIdOrderBySentAtAsc(String roomId);

    @Query("SELECT DISTINCT m.roomId FROM ChatMessageEntity m")
    List<String> findDistinctRoomIds();

    // 🚀 2. 읽음 카운트 차감 로직 (핵심)
    @Modifying
    @Transactional
    @Query("UPDATE ChatMessageEntity c SET c.unreadCount = c.unreadCount - 1 " +
            "WHERE c.roomId = :roomId " +
            "AND c.sender != :readerEmail " + // 내가 보낸 메시지는 카운트에서 제외
            "AND c.unreadCount > 0")          // 이미 0인 것은 더 줄이지 않음
    void decreaseUnreadCount(@Param("roomId") String roomId, @Param("readerEmail") String readerEmail);

    @Query("SELECT c FROM ChatMessageEntity c WHERE c.roomId = :roomId " +
            "AND c.sender != :readerEmail " +
            "AND NOT EXISTS (SELECT r FROM ChatMessageReadEntity r WHERE r.message = c AND r.readerEmail = :readerEmail)")
    List<ChatMessageEntity> findUnreadMessages(@Param("roomId") String roomId, @Param("readerEmail") String readerEmail);
}

