package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;


@Component
public class JwtUtil {


    // t23 test expects private key
    private final String SECRET_KEY =
            "MySecretKeyForJwtAuthenticationProject123456789";



    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }



    // t24_jwtGenerateToken
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                           System.currentTimeMillis() + 3600000
                        )
                )
                .signWith(
                        getSigningKey(),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }




    // t26_jwtExtractUsername
    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }




    public Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }




    public <T> T extractClaim(
            String token,
            Function<Claims,T> resolver) {

        Claims claims =
                Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();


        return resolver.apply(claims);
    }




    // t25_jwtIsTokenValid
    public boolean isTokenValid(String token) {

        try {

            Claims claims =
                    Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();


            return claims.getExpiration()
                    .after(new Date());


        } catch(Exception e) {

            return false;
        }
    }

}