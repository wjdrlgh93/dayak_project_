package org.spring.backend.board.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.board.dto.NoticeRequestDto;
import org.spring.backend.board.dto.NoticeResponseDto;
import org.spring.backend.board.service.NoticeService;
import org.spring.backend.config.security.UserPrincipal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

        @PostMapping
    public ResponseEntity<String> createNotice(
            @RequestBody NoticeRequestDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        if (userPrincipal == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        noticeService.createNotice(dto, userPrincipal.getId());
        return ResponseEntity.ok("공지사항이 성공적으로 등록되었습니다.");
    }

        @GetMapping("/list")
    public ResponseEntity<Page<NoticeResponseDto>> getNoticeList(
            @PageableDefault(size = 10, sort = "isPinned", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<NoticeResponseDto> result = noticeService.getNoticeList(pageable);
        return ResponseEntity.ok(result);
    }

        @GetMapping("/{id}")
    public ResponseEntity<NoticeResponseDto> getNoticeDetail(@PathVariable Long id) {
        NoticeResponseDto result = noticeService.getNoticeDetail(id);
        return ResponseEntity.ok(result);
    }

        @PutMapping("/{id}")
    public ResponseEntity<String> updateNotice(
            @PathVariable Long id,
            @RequestBody NoticeRequestDto dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        if (userPrincipal == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

                noticeService.updateNotice(id, dto);

        return ResponseEntity.ok("공지사항이 수정되었습니다.");
    }

        @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotice(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        if (userPrincipal == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        noticeService.deleteNotice(id);
        return ResponseEntity.ok("공지사항이 삭제되었습니다.");
    }
}