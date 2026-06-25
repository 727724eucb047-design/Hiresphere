package com.example.demo.DTO;

import com.example.demo.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private String message;
}