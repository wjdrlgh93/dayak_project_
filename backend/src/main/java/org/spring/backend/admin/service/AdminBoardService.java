package org.spring.backend.admin.service;

import lombok.RequiredArgsConstructor;
import org.spring.backend.board.dto.BoardDto;
import org.spring.backend.board.repository.BoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminBoardService {

    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public Page<BoardDto.Response> getAllBoardsPage(Pageable pageable) {
        return boardRepository.findAll(pageable)
                .map(board -> BoardDto.Response.builder() 
                        .id(board.getId())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .thumbnailUrl(board.getThumbnailUrl())
                        .viewCount(board.getViewCount())
                        .createdAt(board.getCreatedAt())
                        
                        .userId(board.getMemberId().getId())
                        .userNickname(board.getMemberId().getNickName())
                        .userProfileImage(board.getMemberId().getFileUrl())
                        .build());
    }

    @Transactional
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }

}
