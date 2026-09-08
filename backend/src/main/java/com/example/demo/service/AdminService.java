package com.example.demo.service;

import com.example.demo.dto.DashboardStatsDTO;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import java.util.List;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public AdminService(UserRepository userRepository,
                        JobRepository jobRepository,
                        ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public DashboardStatsDTO getDashboardStats() {
        return new DashboardStatsDTO(
                userRepository.count(),
                userRepository.countByRole(Role.EMPLOYER),
                userRepository.countByRole(Role.JOB_SEEKER),
                jobRepository.count(),
                applicationRepository.count(),
                jobRepository.countByActive(true),
                userRepository.countByBlocked(true)
        );
    }
    public List<User> getAllUsers() {
    return userRepository.findAll();
}

public User blockUser(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setBlocked(true);

    return userRepository.save(user);
}

public User unblockUser(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setBlocked(false);

    return userRepository.save(user);
}
}