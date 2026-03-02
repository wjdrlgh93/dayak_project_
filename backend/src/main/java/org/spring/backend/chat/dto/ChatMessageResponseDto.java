package org.spring.backend.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.spring.backend.chat.entity.ChatMessageEntity;

@Getter
@Setter
@Builder
public class ChatMessageResponseDto {
    private Long id;
    private String roomId;
    private String sender;
    private String message;
    private int unreadCount;
    private String sentAt;
    private String type;

    public static ChatMessageResponseDto fromEntity(ChatMessageEntity entity) {
        return ChatMessageResponseDto.builder()
                .id(entity.getId())
                .roomId(entity.getRoomId())
                .sender(entity.getSender())
                .message(entity.getMessage())
                .unreadCount(entity.getUnreadCount())
                .sentAt(entity.getSentAt().toString())
                .build();
    }
}
