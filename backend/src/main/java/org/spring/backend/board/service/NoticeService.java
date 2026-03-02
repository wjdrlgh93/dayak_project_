package org.spring.backend.board.service;

import lombok.RequiredArgsConstructor;
import org.spring.backend.board.dto.NoticeRequestDto;
import org.spring.backend.board.dto.NoticeResponseDto;
import org.spring.backend.board.entity.NoticeEntity;
import org.spring.backend.board.repository.NoticeRepository;
import org.spring.backend.member.entity.MemberEntity;
import org.spring.backend.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;

        @Transactional
    public void createNotice(NoticeRequestDto dto, Long memberId) {
        MemberEntity writer = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        NoticeEntity notice = NoticeEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .isPinned(dto.isPinned())
                .writer(writer.getName())
                .build();

        noticeRepository.save(notice);
    }

        public Page<NoticeResponseDto> getNoticeList(Pageable pageable) {
                return noticeRepository.findAllByOrderByIsPinnedDescCreatedAtDesc(pageable)
                .map(this::convertToDto);
    }

        public NoticeResponseDto getNoticeDetail(Long id) {
        NoticeEntity notice = noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 공지사항이 없습니다. id=" + id));

        return convertToDto(notice);
    }

        @Transactional
    public void updateNotice(Long id, NoticeRequestDto dto) {
        NoticeEntity notice = noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 공지사항이 없습니다. id=" + id));

                notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        notice.setPinned(dto.isPinned());
    }

        @Transactional
    public void deleteNotice(Long id) {
        if (!noticeRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 공지사항이 없습니다. id=" + id);
        }
        noticeRepository.deleteById(id);
    }

        private NoticeResponseDto convertToDto(NoticeEntity n) {
        return NoticeResponseDto.builder()
                .id(n.getId())
                .title(n.getTitle())
                .content(n.getContent())
                .isPinned(n.isPinned())
                .writer(n.getWriter())
                .createdAt(n.getCreatedAt())
                .build();
    }
}