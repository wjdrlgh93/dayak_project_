package org.spring.backend.admin.repository;

import org.spring.backend.member.entity.MemberEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminMemberRepository extends JpaRepository <MemberEntity, Long> {

    Page<MemberEntity> findAllByIsDeletedFalse(Pageable pageable);
    Optional<MemberEntity> findByEmail(String email);
}
