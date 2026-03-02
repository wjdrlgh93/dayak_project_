package org.spring.backend.auth.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.spring.backend.auth.dto.KakaoTokenDto;
import org.spring.backend.auth.dto.KakaoUserDto;
import org.spring.backend.auth.service.KakaoAuthService;
import org.spring.backend.config.security.JwtProvider;
import org.spring.backend.config.security.UserPrincipal;
import org.spring.backend.global.Gender;
import org.spring.backend.global.Role;
import org.spring.backend.member.entity.MemberEntity; import org.spring.backend.member.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth/kakao")
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider; 
    @GetMapping("/callback")
    public void kakaoCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
                KakaoTokenDto kakaoToken = kakaoAuthService.getKakaoAccessToken(code);

                KakaoUserDto kakaoUser = kakaoAuthService.getKakaoUserInfo(kakaoToken.getAccessToken());

                String email = kakaoUser.getKakaoAccount().getEmail();
        String nickname = kakaoUser.getKakaoAccount().getProfile().getNickname();

        MemberEntity member = memberRepository.findByEmail(email).orElse(null);

        if (member == null) {
                        member = MemberEntity.builder()
                    .email(email)
                    .nickName(nickname)
                    .name(nickname) 
                    .password("kakao_social_pw")
                    .address("카카오 주소 미제공")
                    .gender(Gender.MAN) 
                    .role(Role.MEMBER)
                    .socialLogin(1)
                    .isDeleted(false)
                    .build();
            memberRepository.save(member);
        }

                member.setKakaoAccessToken(kakaoToken.getAccessToken());
        member.setKakaoRefreshToken(kakaoToken.getRefreshToken());
        memberRepository.save(member);

                List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(member.getRole().name())         );

        UserPrincipal userPrincipal = new UserPrincipal(
                member.getId(),
                member.getEmail(),
                member.getPassword(),
                authorities
        );

                String appToken = jwtProvider.createToken(userPrincipal); 
                response.sendRedirect("http://168.107.15.125/login/success?token=" + appToken);
    }
}