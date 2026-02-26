package org.spring.backend.reply.service;

import lombok.RequiredArgsConstructor;
import org.spring.backend.reply.dto.ReplyDto;
import org.spring.backend.board.entity.*;
import org.spring.backend.board.repository.*;
import org.spring.backend.reply.dto.ReplyDto;
import org.spring.backend.reply.entity.ReplyEntity;
import org.spring.backend.reply.repository.ReplyRepository;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ReplyDto.Response> getReplyList(Long boardId, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return replyRepository.findByBoardId(boardId, pageable).map(this::toDto);
    }

    @Transactional
    public void createReply(Long boardId, ReplyDto.Request dto, String email) {
        MemberEntity user = userRepository.findByEmail(email).orElseThrow();
        BoardEntity board = boardRepository.findById(boardId).orElseThrow();

        ReplyEntity reply = ReplyEntity.builder()
                .content(dto.getContent())
                .board(board)
                .user(user)
                .build();
        replyRepository.save(reply);
    }

    @Transactional
    public void deleteReply(Long replyId, String email) {
        ReplyEntity reply = replyRepository.findById(replyId).orElseThrow();
        if (!reply.getUser().getEmail().equals(email)) throw new RuntimeException("작성자만 삭제 가능");
        replyRepository.delete(reply);
    }

    private ReplyDto.Response toDto(ReplyEntity e) {
        return ReplyDto.Response.builder()
                .id(e.getId())
                .content(e.getContent())
                .createdAt(e.getCreatedAt())
                .userId(e.getUser().getId())
                .userNickname(e.getUser().getNickName())
                .userProfileImage(e.getUser().getNewFileName())
                .build();
    }

    /**
     * 댓글 수정 로직
     * @param id 댓글 ID
     * @param content 수정할 내용
     * @param userId 요청한 사용자의 ID (작성자 확인용)
     */
    @Transactional
    public void update(Long id, String content, Long userId) {
        
        ReplyEntity reply = replyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다. id=" + id));

        
        
        if (!reply.getUser().getId().equals(userId)) {
            throw new IllegalStateException("본인이 작성한 댓글만 수정할 수 있습니다.");
        }

        
        
        reply.setContent(content);
    }
}