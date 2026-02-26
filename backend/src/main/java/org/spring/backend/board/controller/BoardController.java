package org.spring.backend.board.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.board.dto.BoardDto;
import org.spring.backend.board.service.BoardService;
import org.spring.backend.oracle.OciStorageService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal; 
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final OciStorageService ociStorageService;

    
    
    @GetMapping("/list")
    public ResponseEntity<Page<BoardDto.Response>> getBoardList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<BoardDto.Response> list = boardService.getBoardList(page, size);
        return ResponseEntity.ok(list);
    }

    
    
    @GetMapping("/{id}")
    public ResponseEntity<BoardDto.Response> getBoardDetail(@PathVariable Long id) {
        BoardDto.Response detail = boardService.getBoardDetail(id);
        return ResponseEntity.ok(detail);
    }

    
    
    @PostMapping
    public ResponseEntity<String> createBoard(
            @RequestBody BoardDto.Request dto,
            Principal principal 
    ) {
        boardService.createBoard(dto, principal.getName());
        return ResponseEntity.ok("게시글이 등록되었습니다.");
    }

    
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBoard(
            @PathVariable Long id,
            @RequestBody BoardDto.Request dto,
            Principal principal
    ) {
        boardService.updateBoard(id, dto, principal.getName());
        return ResponseEntity.ok("게시글이 수정되었습니다.");
    }

    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBoard(
            @PathVariable Long id,
            Principal principal
    ) {
        boardService.deleteBoard(id, principal.getName());
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadEditorImage(@RequestParam("file") MultipartFile file) throws Exception {
        
        String url = ociStorageService.uploadImage(file);
        return ResponseEntity.ok(url);
    }


}