package org.spring.backend.member.dto;
import lombok.Data;

@Data
public class MemberLoginDto {
    private String email;
    private String password;
}