package org.spring.backend.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeRequestDto {
    private String title;
    private String content;
    private boolean isPinned; }