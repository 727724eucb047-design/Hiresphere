package com.example.demo.service;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.entity.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       UserProfileRepository userProfileRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
    if (userRepository.findByUsername(request.getUsername()).isPresent()) {
        throw new RuntimeException("Username already exists");
    }

    User user = new User();
    user.setFullName(request.getFullName());
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(request.getRole());

    user = userRepository.save(user);

    UserProfile profile = new UserProfile();
    profile.setUser(user);
    profile.setCompanyName(request.getCompanyName());

    userProfileRepository.save(profile);

    String token = jwtUtil.generateToken(user);

    return new AuthResponse(
            token,
            user.getUsername(),
            user.getFullName(),
            user.getRole()
    );
}

public AuthResponse authenticate(AuthRequest request) {

    User user = userRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() ->
                    new RuntimeException(
                            "Invalid username or password"
                    )
            );

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()
    )) {
        throw new RuntimeException(
                "Invalid username or password"
        );
    }

    String token = jwtUtil.generateToken(user);

    return new AuthResponse(
            token,
            user.getUsername(),
            user.getFullName(),
            user.getRole()
    );
}
}