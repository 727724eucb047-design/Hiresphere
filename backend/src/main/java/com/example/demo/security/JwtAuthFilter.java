// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.example.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
   private final JwtUtil jwtUtil;

   public JwtAuthFilter(JwtUtil jwtUtil) {
      this.jwtUtil = jwtUtil;
   }

   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      String authHeader = request.getHeader("Authorization");
      String token = null;
      String username = null;
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
         token = authHeader.substring(7);

         try {
            username = this.jwtUtil.extractUsername(token);
         } catch (Exception var8) {
            username = null;
         }
      }

      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null && this.jwtUtil.isTokenValid(token)) {
         UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, (Object)null, Collections.emptyList());
         authentication.setDetails((new WebAuthenticationDetailsSource()).buildDetails(request));
         SecurityContextHolder.getContext().setAuthentication(authentication);
      }

      filterChain.doFilter(request, response);
   }
}
