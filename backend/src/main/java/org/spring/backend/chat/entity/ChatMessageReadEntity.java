package org.spring.backend.chat.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_message_read",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"message_id", "reader_email"})})
public class ChatMessageReadEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "message_id")
    private ChatMessageEntity message; // 읽은 메시지

    private String readerEmail; // 읽은 사람의 이메일

    @CreationTimestamp
    private LocalDateTime readAt;
}
