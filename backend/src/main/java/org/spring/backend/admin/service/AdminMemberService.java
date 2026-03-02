package org.spring.backend.admin.service;

import lombok.RequiredArgsConstructor;
import org.spring.backend.admin.dto.AdminMemberDto;
import org.spring.backend.admin.repository.AdminMemberRepository;
import org.spring.backend.board.repository.BoardRepository;
import org.spring.backend.global.Role;
import org.spring.backend.member.dto.MemberDto;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AdminMemberService {

    private final AdminMemberRepository adminMemberRepository;
    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public Page<MemberDto> getAllMembersPage(Pageable pageable) {
                return adminMemberRepository.findAllByIsDeletedFalse(pageable)
                .map(member -> MemberDto.builder()
                        .id(member.getId())
                        .email(member.getEmail())
                        .name(member.getName())
                        .nickName(member.getNickName())
                        .role(member.getRole())
                        .gender(member.getGender())
                        .createTime(member.getCreateTime())
                        .build());
    }

    @Transactional
    public void deleteMember(Long id) {
        MemberEntity member = adminMemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
                        boardRepository.deleteByMemberId(id);

                member.setDeleted(true);
    }

    @Transactional
    public void changeRole(Long id) {
        MemberEntity member = adminMemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

                if (member.getRole() == Role.ADMIN) {
            member.setRole(Role.MEMBER);
        } else {
            member.setRole(Role.ADMIN);
        }
            }

}
