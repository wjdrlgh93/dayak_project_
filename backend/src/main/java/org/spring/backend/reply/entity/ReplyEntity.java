package org.spring.backend.reply.entity;

import jakarta.persistence.*;
import lombok.*;
import org.spring.backend.board.entity.BoardEntity;
import org.spring.backend.member.entity.MemberEntity;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reply")
public class ReplyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private MemberEntity user;

    @CreationTimestamp
    private LocalDateTime createdAt;
}