package org.spring.backend.chat.service;

import lombok.RequiredArgsConstructor;
import org.spring.backend.chat.dto.ChatMessageRequestDto;
import org.spring.backend.chat.dto.ChatMessageResponseDto;
import org.spring.backend.chat.entity.ChatMessageEntity;
import org.spring.backend.chat.entity.ChatMessageReadEntity;
import org.spring.backend.chat.entity.ChatRoomEntity;
import org.spring.backend.chat.repository.ChatMessageReadRepository;
import org.spring.backend.chat.repository.ChatMessageRepository;
import org.spring.backend.global.Role;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository; // 관리자 수 파악용
    private final ChatMessageReadRepository chatMessageReadRepository;


    // 🚀 1. 메시지 저장 (고객이 보낼 때 초기 unreadCount 설정)
    @Transactional
    public ChatMessageResponseDto saveMessage(String roomId, ChatMessageRequestDto dto) {
        // 관리자 그룹(MASTER, ADMIN, MANAGER) 인원수 계산
        List<Role> adminRoles = Arrays.asList(Role.MASTER, Role.ADMIN, Role.MANAGER);
        long totalAdminCount = memberRepository.countByRoleIn(adminRoles);

        ChatMessageEntity entity = ChatMessageEntity.builder()
                .roomId(roomId)
                .sender(dto.getSender())
                .message(dto.getMessage())
                .unreadCount((int) totalAdminCount) // 🚀 초기 카운트는 전체 관리자 수
                .build();

        chatMessageRepository.save(entity);
        return ChatMessageResponseDto.fromEntity(entity);
    }

    @Transactional
    public void updateReadCount(String roomId, String readerEmail) {
        // 1. 해당 방의 메시지 중 내가 읽지 않은 메시지들을 가져옵니다.
        // (자신이 보낸 메시지는 제외)
        List<ChatMessageEntity> unreadMessages = chatMessageRepository.findUnreadMessages(roomId, readerEmail);

        for (ChatMessageEntity msg : unreadMessages) {
            // 2. 이미 읽음 기록이 있는지 다시 한번 체크 (방어 로직)
            if (!chatMessageReadRepository.existsByMessageAndReaderEmail(msg, readerEmail)) {

                // 3. 읽음 기록 저장 [cite: 2026-02-23]
                chatMessageReadRepository.save(ChatMessageReadEntity.builder()
                        .message(msg)
                        .readerEmail(readerEmail)
                        .build());

                // 4. 메시지의 unreadCount 감소
                if (msg.getUnreadCount() > 0) {
                    msg.setUnreadCount(msg.getUnreadCount() - 1);
                }
            }
        }
    }

    @Transactional(readOnly = true)
    public List<ChatMessageResponseDto> getChatHistory(String roomId) {
        // DB에서 해당 방의 메시지를 시간순으로 조회
        List<ChatMessageEntity> entities = chatMessageRepository.findByRoomIdOrderBySentAtAsc(roomId);

        // Entity 리스트를 ResponseDto 리스트로 변환하여 반환
        return entities.stream()
                .map(ChatMessageResponseDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<String> findAllRooms() {
        return chatMessageRepository.findDistinctRoomIds();
    }


    @Transactional
    public void deleteChatRoom(String roomId) {
        // 1. 해당 방의 읽음 기록 삭제
        // (ChatMessage와 연관관계가 있다면 순서대로 지워야 외래키 에러가 안 납니다)
        chatMessageReadRepository.deleteByMessageRoomId(roomId);

        // 2. 해당 방의 메시지들 삭제
        chatMessageRepository.deleteByRoomId(roomId);

        // 3. (선택사항) ChatRoomEntity가 있다면 그것도 삭제
        // chatRoomRepository.deleteById(roomId);
    }

}


