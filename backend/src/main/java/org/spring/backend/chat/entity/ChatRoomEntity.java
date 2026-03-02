package org.spring.backend.chat.entity;

import jakarta.persistence.Entity;
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
public class ChatRoomEntity {

    @Id
    private String roomId; // UUID 등으로 생성된 고유 방 ID [cite: 2026-02-23]

    private String customerEmail; // 채팅을 건 고객의 이메일 [cite: 2026-02-24]
    private String customerName;  // 고객 이름

    @CreationTimestamp
    private LocalDateTime createdAt;

    // 마지막으로 올라온 메시지 내용을 저장해두면 리스트 보여줄 때 편합니다. [cite: 2026-02-24]
    private String lastMessage;
    private LocalDateTime lastMessageAt;
}
