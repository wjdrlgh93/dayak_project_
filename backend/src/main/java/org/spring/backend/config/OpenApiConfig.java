package org.spring.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        // 🚀 1. 서버 주소 설정 (프론트 IP와 일치시킴)
        Server server = new Server();
        server.setUrl("http://168.107.15.125"); // Nginx를 거친다면 포트 제외, 아니라면 :8080 추가
        server.setDescription("운영 서버");

        // 🚀 2. JWT 인증 설정 (Authorize 버튼 생성)
        String jwtSchemeName = "jwtAuth";
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);
        Components components = new Components()
                .addSecuritySchemes(jwtSchemeName, new SecurityScheme()
                        .name(jwtSchemeName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT"));

        return new OpenAPI()
                .info(new Info()
                        .title("Dayak API 문서")
                        .description("실시간 상담 및 회원 관리 API 명세서")
                        .version("v0.0.1"))
                .servers(List.of(server)) // 🚀 서버 주소 리스트 등록
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}