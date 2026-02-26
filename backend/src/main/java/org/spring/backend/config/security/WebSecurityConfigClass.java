package org.spring.backend.config.security;

import lombok.RequiredArgsConstructor;
import org.spring.backend.global.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfigClass {

    
    private final JwtProvider jwtProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        
        http.csrf(AbstractHttpConfigurer::disable);

        
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        
        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        
        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);

        
        http.authorizeHttpRequests(auth -> {
            auth
                    
                    .requestMatchers(
                            "/api/board/write",
                            "/api/board/update/**",
                            "/api/board/delete/**",
                            "/api/reply/write/**",  
                            "/api/reply/update/**", 
                            "/api/reply/delete/**", 
                            "/api/member/detail",
                            "/api/member/update",
                            "/api/member/profileImg"
                    ).authenticated()

                    
                    .requestMatchers(
                            "/api/member/signup", "/api/member/login",
                            "/api/board/list/**", "/api/board/list", 
                            "/api/board/detail/**",
                            "/api/reply/list/**",   
                            "/api/store/**",
                            "/images/**",
                            "/api/pill/**",
                            "/api/pharmacy/**",
                            "/api/medication/check/direct",
                            "/api/night/**", "/api/drug/**",
                            "/swagger-ui/**", "/v3/api-docs/**"
                    ).permitAll()

                    
                    .requestMatchers("/api/admin/**").hasAnyAuthority("ADMIN", "MASTER")


                    
                    .anyRequest().permitAll();
        });

        
        http.addFilterBefore(new JwtAuthenticationFilter(jwtProvider),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:3000"));
        
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}