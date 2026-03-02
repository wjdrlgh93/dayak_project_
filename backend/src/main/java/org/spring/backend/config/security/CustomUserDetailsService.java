package org.spring.backend.config.security;

import lombok.RequiredArgsConstructor;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                MemberEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 사용자를 찾을 수 없습니다: " + email));

                System.out.println("==========================================");
        System.out.println("로그인 시도 이메일: " + email);
        System.out.println("DB에서 가져온 유저 ID: " + user.getId());
        System.out.println("==========================================");

                        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole());

                        return new UserPrincipal(
                user.getId(),                           user.getEmail(),                        user.getPassword(),                     Collections.singletonList(authority)         );
    }
}