package org.spring.backend.board.service;

import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.spring.backend.board.dto.BoardDto;
import org.spring.backend.board.entity.BoardEntity;
import org.spring.backend.board.repository.BoardRepository;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository userRepository;

    
    @Transactional(readOnly = true)
    public Page<BoardDto.Response> getBoardList(int page, int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        Page<BoardEntity> boardPage = boardRepository.findAll(pageable);

        
        return boardPage.map(this::toDto);
    }

    
    @Transactional
    public BoardDto.Response getBoardDetail(Long id) {
        BoardEntity board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        board.setViewCount(board.getViewCount() + 1); 

        
        return toDto(board);
    }

    
    @Transactional
    public void createBoard(BoardDto.Request dto, String userEmail) {
        MemberEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        
        String thumbnailUrl = extractThumbnail(dto.getContent());

        BoardEntity board = BoardEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .thumbnailUrl(thumbnailUrl)
                .viewCount(0)
                .memberId(user)
                .build();

        boardRepository.save(board);
    }

    
    @Transactional
    public void updateBoard(Long id, BoardDto.Request dto, String userEmail) {
        BoardEntity board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));

        
        if (!board.getMemberId().getEmail().equals(userEmail)) {
            throw new RuntimeException("작성자만 수정할 수 있습니다.");
        }

        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        board.setThumbnailUrl(extractThumbnail(dto.getContent())); 
    }

    
    @Transactional
    public void deleteBoard(Long id, String userEmail) {
        BoardEntity board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));

        if (!board.getMemberId().getEmail().equals(userEmail)) {
            throw new RuntimeException("작성자만 삭제할 수 있습니다.");
        }

        boardRepository.delete(board);
    }

    
    private String extractThumbnail(String htmlContent) {
        if (htmlContent == null || htmlContent.isEmpty()) return null;
        Document doc = Jsoup.parse(htmlContent);
        Element img = doc.select("img").first();
        return img != null ? img.attr("src") : null;
    }

    
    private BoardDto.Response toDto(BoardEntity entity) {
        return BoardDto.Response.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent()) 
                .thumbnailUrl(entity.getThumbnailUrl())
                .viewCount(entity.getViewCount())
                .createdAt(entity.getCreatedAt())
                .userId(entity.getMemberId().getId())
                .userNickname(entity.getMemberId().getNickName()) 
                .userProfileImage(entity.getMemberId().getIsProfileImg() == 1
                        ? entity.getMemberId().getNewFileName()
                        : null)
                .build();
    }
}