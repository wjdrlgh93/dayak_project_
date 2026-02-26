package org.spring.backend.board.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NoticeDto {
    private Long id;
    private String title;
    private String content;
    private boolean isPinned;
    private String writer;
    private String createdAt;
}