package org.backend.backend.member;

import org.apache.catalina.security.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.spring.backend.BackendApplication;
import org.spring.backend.global.Gender;
import org.spring.backend.global.Role;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest(classes = BackendApplication.class)
public class MemberDataTeset {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @Transactional
    @Rollback(false) 
    public void insertDummyMembers() {
        for (int i = 1; i <= 100; i++) {
            MemberEntity member = MemberEntity.builder()
                    .email("testuser" + i + "@example.com")
                    .password(passwordEncoder.encode("1234")) 
                    .name("테스터" + i)
                    .nickName("닉네임" + i)
                    .address("서울시 강남구 " + i + "번지")
                    .gender(i % 2 == 0 ? Gender.MAN : Gender.WOMAN) 
                    .role(Role.MEMBER)
                    .isProfileImg(0)
                    .socialLogin(0)
                    .isDeleted(false)
                    .build();

            memberRepository.save(member);
        }
        System.out.println("✅ 100명의 더미 데이터 생성이 완료되었습니다!");
    }
}
