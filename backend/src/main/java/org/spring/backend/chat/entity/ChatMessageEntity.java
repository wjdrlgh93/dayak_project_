package org.spring.backend.chat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;
    private String sender;
    private String message;
    private String type;

    // 🚀 읽음 처리 핵심: 1:N이므로 관리자 수에 따라 달라집니다.
    // 예를 들어 관리자가 3명이면 초기값은 3. [cite: 2026-02-23]
    private int unreadCount;

    @CreationTimestamp
    private LocalDateTime sentAt;

}
