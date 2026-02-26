package org.spring.backend.member.repository;

import org.spring.backend.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByNickName(String nickName);
}
