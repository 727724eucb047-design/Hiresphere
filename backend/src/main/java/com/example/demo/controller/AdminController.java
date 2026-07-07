package com.example.demo.controller;

import com.example.demo.DTO.DashboardStatsDTO;
import com.example.demo.entity.Job;
import com.example.demo.entity.User;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AdminService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {


    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final AdminService adminService;


    public AdminController(UserRepository userRepository,
                           JobRepository jobRepository,
                           AdminService adminService) {

        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.adminService = adminService;
    }


    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){

        return userRepository.findAll();
    }


    @GetMapping("/jobs")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Job> getAllJobs(){

        return jobRepository.findAll();
    }


    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public DashboardStatsDTO dashboard(){

        return adminService.getDashboardStats();
    }

}