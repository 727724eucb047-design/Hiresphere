package com.example.demo.service;

import com.example.demo.DTO.AuthRequest;
import com.example.demo.DTO.AuthResponse;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {


    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;


    public AuthService(UserRepository userRepository,
                       JwtUtil jwtUtil,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }



    public String register(RegisterRequest request) {


        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // encrypt password
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(request.getRole());


        userRepository.save(user);


        return "Registration Successful";
    }





    public AuthResponse login(AuthRequest request) {


        User user =
                userRepository.findByEmail(request.getEmail())
                .orElse(null);



        if(user == null ||
           !passwordEncoder.matches(
                   request.getPassword(),
                   user.getPassword())) {


            return new AuthResponse(
                    null,
                    null,
                    null,
                    null,
                    "Invalid Credentials"
            );
        }



        String token =
                jwtUtil.generateToken(user.getEmail());



        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token
        );
    }

}