// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
   private static final String SECRET_KEY = "MySecretKeyForJwtAuthenticationProject123456789";

   public JwtUtil() {
   }

   private Key getSigningKey() {
      return Keys.hmacShaKeyFor("MySecretKeyForJwtAuthenticationProject123456789".getBytes());
   }

   public String generateToken(String username) {
      return Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 3600000L)).signWith(this.getSigningKey(), SignatureAlgorithm.HS256).compact();
   }

   public String extractUsername(String token) {
      return (String)this.extractClaim(token, Claims::getSubject);
   }

   public Date extractExpiration(String token) {
      return (Date)this.extractClaim(token, Claims::getExpiration);
   }

   public <T> T extractClaim(String token, Function<Claims, T> resolver) {
      return (T)resolver.apply(this.extractAllClaims(token));
   }

   private Claims extractAllClaims(String token) {
      return (Claims)Jwts.parserBuilder().setSigningKey(this.getSigningKey()).build().parseClaimsJws(token).getBody();
   }

   public boolean isTokenValid(String token) {
      try {
         return this.extractExpiration(token).after(new Date());
      } catch (Exception var3) {
         return false;
      }
   }
}
