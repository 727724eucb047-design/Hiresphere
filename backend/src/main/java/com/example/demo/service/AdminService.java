package com.example.demo.service;

import com.example.demo.dto.DashboardStatsDTO;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
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
                jobRepository.count(),
                applicationRepository.count()
        );
    }
}