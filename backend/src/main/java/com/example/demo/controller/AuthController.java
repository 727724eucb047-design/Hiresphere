package com.example.demo.controller;

import com.example.demo.DTO.AuthRequest;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;

import jakarta.validation.Valid;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }



    @PostMapping("/register")
    public String register(
            @Valid @RequestBody RegisterRequest request) {


        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }


        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(request.getRole());


        userRepository.save(user);


        return "User Registered Successfully";
    }




    @PostMapping("/login")
    public String login(
            @Valid @RequestBody AuthRequest request) {


        User user =
                userRepository.findByEmail(request.getEmail())
                .orElse(null);



        if(user == null ||
                !passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword())) {


            return "Invalid Credentials";
        }



        // Generate JWT token
        String token =
                jwtUtil.generateToken(user.getEmail());


        return token;
    }

}