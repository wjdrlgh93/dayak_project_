package org.spring.backend.board.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NoticeResponseDto {
    private Long id;
    private String title;
    private String content;
    private boolean isPinned;
    private String writer;         private LocalDateTime createdAt;
}
