package org.spring.backend.config.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long validityInMilliseconds;

    private Key key;

    @PostConstruct
    protected void init() {
                this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * UserPrincipal 정보를 바탕으로 JWT 토큰을 생성합니다.
     */
    public String createToken(UserPrincipal userPrincipal) {
        Claims claims = Jwts.claims().setSubject(userPrincipal.getEmail());

                claims.put("userId", userPrincipal.getId());

                String authorities = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        claims.put("auth", authorities);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 토큰에서 정보를 추출하여 Authentication 객체를 생성합니다.
     */
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);

                Long userId = claims.get("userId", Long.class);
        String email = claims.getSubject();

                Object authClaim = claims.get("auth");
        Collection<? extends GrantedAuthority> authorities = (authClaim == null || authClaim.toString().isEmpty())
                ? Collections.emptyList()
                : Arrays.stream(authClaim.toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

                UserPrincipal principal = new UserPrincipal(userId, email, "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    /**
     * HTTP 헤더에서 Bearer 토큰을 추출합니다.
     */
    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * 토큰의 서명 및 만료 여부를 검증합니다.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
                        return false;
        }
    }

    /**
     * 토큰 클레임을 파싱하는 공통 메서드입니다.
     */
    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
                        return e.getClaims();
        }
    }
}