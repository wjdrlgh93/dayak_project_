package org.spring.backend.reply.controller;


import java.security.Principal;

import org.spring.backend.config.security.UserPrincipal;
import org.spring.backend.reply.dto.ReplyDto;
import org.spring.backend.reply.service.ReplyService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reply")
@RequiredArgsConstructor
public class ReplyController {
    private final ReplyService replyService;

    @GetMapping("/list/{boardId}")
    public ResponseEntity<Page<ReplyDto.Response>> getList(@PathVariable Long boardId, @RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(replyService.getReplyList(boardId, page, 10));
    }

    @PostMapping("/{boardId}")
    public ResponseEntity<String> create(@PathVariable Long boardId, @RequestBody ReplyDto.Request dto, Principal principal) {
        replyService.createReply(boardId, dto, principal.getName());
        return ResponseEntity.ok("댓글 등록");
    }

    @DeleteMapping("/{replyId}")
    public ResponseEntity<String> delete(@PathVariable Long replyId, Principal principal) {
        replyService.deleteReply(replyId, principal.getName());
        return ResponseEntity.ok("댓글 삭제");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateReply(
            @PathVariable Long id,
            @RequestBody ReplyDto.Request dto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) { 
                        replyService.update(id, dto.getContent(), userPrincipal.getId());

        return ResponseEntity.ok("댓글이 수정되었습니다.");
    }


}