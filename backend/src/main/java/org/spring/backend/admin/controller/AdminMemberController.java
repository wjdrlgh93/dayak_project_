package org.spring.backend.admin.controller;

import lombok.RequiredArgsConstructor;
import org.spring.backend.admin.service.AdminMemberService;
import org.spring.backend.member.dto.MemberDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminMemberController {

    private final AdminMemberService adminMemberService;

    @GetMapping("/users")
    public ResponseEntity<Page<MemberDto>> getUserList(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(adminMemberService.getAllMembersPage(pageable));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        adminMemberService.deleteMember(id);
        return ResponseEntity.ok("회원이 삭제되었습니다.");
    }
}
