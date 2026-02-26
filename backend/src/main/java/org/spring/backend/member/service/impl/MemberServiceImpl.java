package org.spring.backend.member.service.impl;


import java.util.Collections;

import org.spring.backend.auth.dto.KakaoUserDto;
import org.spring.backend.config.security.JwtProvider;
import org.spring.backend.config.security.UserPrincipal;
import org.spring.backend.global.Gender;
import org.spring.backend.global.Role;
import org.spring.backend.member.dto.MemberDto;
import org.spring.backend.member.dto.MemberLoginDto;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.spring.backend.oracle.OciStorageService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl  {

    private final MemberRepository memberRepository;
    private final OciStorageService ociStorageService;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;



    @Transactional
    public void signup(MemberDto dto) {

        
        if(memberRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다");
        }
        if(memberRepository.existsByNickName(dto.getNickName())){
            throw new RuntimeException("이미 존재하는 닉네임입니다");
        }
        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        MemberEntity member = MemberEntity.builder()
                    .email(dto.getEmail())
                    .password(encodedPassword)
                    .name(dto.getName())
                    .nickName(dto.getNickName())
                    .address(dto.getAddress())
                    .gender(Gender.valueOf(dto.getGender().toString()))
                    .role(Role.MEMBER)
                    .isProfileImg(0)
                    .socialLogin(0)
                    .isDeleted(false)
                .build();
        memberRepository.save(member);
    }

    @Transactional
    public String login(MemberLoginDto loginDto) {
        
        MemberEntity member = memberRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        
        if (member.isDeleted()) {
            throw new IllegalArgumentException("탈퇴 처리된 계정입니다. 관리자에게 문의하세요.");
        }
        if (!passwordEncoder.matches(loginDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        
        UserPrincipal userPrincipal = new UserPrincipal(
                member.getId(),
                member.getEmail(),
                member.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + member.getRole()))
        );

        
        return jwtProvider.createToken(userPrincipal);
    }


    @Transactional(readOnly = true)
    public MemberDto getMemberDetail(String email) {
        MemberEntity member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        return MemberDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .nickName(member.getNickName())
                .gender(member.getGender())
                .role(member.getRole())
                .address(member.getAddress())
                .isProfileImg(member.getIsProfileImg())
                .newFileName(member.getNewFileName())
                .fileUrl(member.getIsProfileImg() == 1 ? member.getNewFileName() : null)
                .socialLogin(member.getSocialLogin())
                .password("")
                .build();
    }

    @Transactional
    public void updateMember(String email, MemberDto memberDto) {
        MemberEntity member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        
        member.setNickName(memberDto.getNickName());
        member.setAddress(memberDto.getAddress());
        

        
        
        if (StringUtils.hasText(memberDto.getNewPassword())) {

            
            if (!StringUtils.hasText(memberDto.getCurrentPassword())) {
                throw new IllegalArgumentException("비밀번호 변경을 위해서는 현재 비밀번호가 필요합니다.");
            }

            
            if (!passwordEncoder.matches(memberDto.getCurrentPassword(), member.getPassword())) {
                throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
            }

            
            member.setPassword(passwordEncoder.encode(memberDto.getNewPassword()));
        }
        memberRepository.save(member);
    }

    @Transactional
    public void uploadProfileImage(String email, MultipartFile file) {
        MemberEntity member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        
        

        try {
            
            String imageUrl = ociStorageService.uploadImage(file);

            
            member.setNewFileName(imageUrl);
            member.setIsProfileImg(1);

            memberRepository.save(member);

        } catch (Exception e) {
            
            throw new RuntimeException("오라클 클라우드 이미지 업로드 실패", e);
        }
    }

}
