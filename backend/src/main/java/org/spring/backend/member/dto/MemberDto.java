package org.spring.backend.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.spring.backend.global.Gender;
import org.spring.backend.global.Role;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {

    private Long id;

    @NotBlank(message = "이메일은 필수 입력 사항입니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 4, message = "비밀번호는 최소 4자 이상이어야 합니다.")
    private String password;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;

    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
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
    private boolean isDeleted;
    private String currentPassword;
    private String newPassword;

}
