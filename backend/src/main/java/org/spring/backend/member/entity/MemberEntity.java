package org.spring.backend.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.spring.backend.board.entity.BoardEntity;
import org.spring.backend.global.BasicTime;
import org.spring.backend.global.Gender;
import org.spring.backend.global.Role;
import org.spring.backend.reply.entity.ReplyEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "member_tb")
public class MemberEntity extends BasicTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickName; 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender; 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String address;

    @Column(name = "is_profile_img")
    private int isProfileImg;
    @Column(columnDefinition = "TEXT")
    private String newFileName;
    @Column(columnDefinition = "TEXT")
    private String fileUrl;
    private int socialLogin;

    private boolean isDeleted;

        @Column(length = 3000)
    private String kakaoAccessToken;

    @Column(length = 3000)
    private String kakaoRefreshToken; 
    @Column(name = "guardian_uuid", length = 100)
    private String guardianUuid; 
    @Column(name = "guardian_name", length = 50)
    private String guardianName; 


    
    @Builder.Default     @OneToMany(mappedBy = "memberId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardEntity> boards = new ArrayList<>();

}
