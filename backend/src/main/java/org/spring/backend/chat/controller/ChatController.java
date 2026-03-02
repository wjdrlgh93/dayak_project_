package org.spring.backend.chat.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.chat.dto.ChatMessageRequestDto;
import org.spring.backend.chat.dto.ChatMessageResponseDto;
import org.spring.backend.chat.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;


    @GetMapping("/api/chat/rooms")
    public ResponseEntity<List<String>> getAllRooms() {
        List<String> rooms = chatService.findAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/api/chat/history/{roomId}")
    public ResponseEntity<List<ChatMessageResponseDto>> getChatHistory(@PathVariable String roomId) {
        List<ChatMessageResponseDto> history = chatService.getChatHistory(roomId);
        return ResponseEntity.ok(history);
    }

    // 🚀 클라이언트가 /app/chat/send/{roomId} 주소로 메시지를 보낼 때 실행됩니다.
    @MessageMapping("/chat/send/{roomId}")
    @SendTo("/topic/chat/{roomId}") // 🚀 이 방을 구독 중인 모든 유저에게 메시지 전송
    public ChatMessageResponseDto sendMessage(
            @DestinationVariable String roomId,
            ChatMessageRequestDto messageDto) {

        // 1. DB에 메시지 저장 및 unreadCount 설정 로직 포함
        // 2. 저장된 엔티티를 DTO로 변환하여 리턴하면 @SendTo를 통해 브로드캐스팅됩니다.
        return chatService.saveMessage(roomId, messageDto);
    }

    // 🚀 관리자가 채팅방에 입장하여 메시지를 읽었을 때 호출할 엔드포인트
    @MessageMapping("/chat/read/{roomId}")
    public void readMessage(
            @DestinationVariable String roomId,
            String readerEmail) {

        // 해당 방의 안 읽은 메시지 카운트를 줄이는 로직
        chatService.updateReadCount(roomId, readerEmail);
    }

    @DeleteMapping("/api/chat/room/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String roomId) {
        // 1. DB에서 해당 방 및 메시지 삭제 (또는 상태변경)
        chatService.deleteChatRoom(roomId);

        // 2. 🚀 핵심: 해당 방을 구독 중인 사용자에게 종료 신호 전송
        ChatMessageResponseDto closeMessage = ChatMessageResponseDto.builder()
                .type("CLOSE")
                .roomId(roomId)
                .message("상담이 종료되었습니다.")
                .build();

        messagingTemplate.convertAndSend("/topic/chat/" + roomId, closeMessage);

        return ResponseEntity.ok().build();
    }

    // admin






}