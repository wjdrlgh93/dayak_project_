package org.spring.backend.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.spring.backend.global.Gender;
import org.spring.backend.global.Role;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class AdminMemberDto {

    private Long id;

    private String email;
    private String password;
    private String name;
    private String nickName;

    private Gender gender;
    private Role role;

    private String address;

    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private int socialLogin;
    private int isProfileImg;
    private String newFileName;
    private String fileUrl;
    private String currentPassword;
    private String newPassword;
}
