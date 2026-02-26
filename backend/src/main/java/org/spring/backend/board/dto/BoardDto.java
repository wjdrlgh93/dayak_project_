package org.spring.backend.board.dto;

import lombok.Builder;
import lombok.Data;
import org.spring.backend.reply.dto.ReplyDto;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder
public class BoardDto {

    @Data
    public static class Request {
        private String title;
        private String content;
        
    }

    @Data
    @Builder
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private String thumbnailUrl;
        private int viewCount;
        private LocalDateTime createdAt;

        
        private Long userId;
        private String userNickname;
        private String userProfileImage;

        
        private List<ReplyDto.Response> replies;
    }
}