package org.spring.backend.member.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.spring.backend.member.dto.MemberDto;
import org.spring.backend.member.dto.MemberLoginDto;
import org.spring.backend.member.dto.TokenDto;
import org.spring.backend.member.service.impl.MemberServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody MemberDto dto) {
        memberService.signup(dto);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberLoginDto loginDto) {
                String token = memberService.login(loginDto);

                TokenDto tokenDto = TokenDto.builder()
                .accessToken(token)
                .grantType("Bearer")
                .build();

        return ResponseEntity.ok(tokenDto);
    }

        @GetMapping("/detail")
    public ResponseEntity<MemberDto> getMemberDetail(@AuthenticationPrincipal UserDetails userDetails) {
        MemberDto memberDto = memberService.getMemberDetail(userDetails.getUsername());
        return ResponseEntity.ok(memberDto);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateMember(@AuthenticationPrincipal UserDetails userDetails,
                                               @RequestBody MemberDto memberDto) {
        try {
                        memberService.updateMember(userDetails.getUsername(), memberDto);
            return ResponseEntity.ok("회원 정보가 성공적으로 수정되었습니다.");
        } catch (IllegalArgumentException e) {
                        return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

        @PostMapping("/profileImg")
    public ResponseEntity<String> uploadProfileImg(@AuthenticationPrincipal UserDetails userDetails,
                                                   @RequestParam("file") MultipartFile file) {
        try {
            memberService.uploadProfileImage(userDetails.getUsername(), file);
            return ResponseEntity.ok("프로필 이미지가 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("이미지 업로드 실패: " + e.getMessage());
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMember(@AuthenticationPrincipal UserDetails userDetails) {
        memberService.deleteMember(userDetails.getUsername());
        return ResponseEntity.ok("회원 탈퇴 및 게시물 삭제가 완료되었습니다.");
    }

}
