package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {


    private final String SECRET_KEY =
            "MySecretKeyForJwtAuthenticationProject123456789";


    private Key getKey() {
        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }


    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(
                    new Date(System.currentTimeMillis()+3600000)
                )
                .signWith(getKey())
                .compact();
    }


    public String extractUsername(String token) {

        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey)getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


    public boolean isTokenValid(String token) {

        try {

            Jwts.parser()
                .verifyWith((javax.crypto.SecretKey)getKey())
                .build()
                .parseSignedClaims(token);

            return true;

        } catch(Exception e) {

            return false;
        }
    }
}