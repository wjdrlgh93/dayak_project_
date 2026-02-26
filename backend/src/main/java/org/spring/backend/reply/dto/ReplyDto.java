package org.spring.backend.reply.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

public class ReplyDto {
    @Data
    public static class Request {
        private String content;
    }

    @Data
    @Builder
    public static class Response {
        private Long id;
        private String content;
        private LocalDateTime createdAt;
        private Long userId;
        private String userNickname;
        private String userProfileImage;
        private String memberId;
    }
}