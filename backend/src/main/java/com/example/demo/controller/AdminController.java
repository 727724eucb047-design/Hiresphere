package com.example.demo.controller;

import com.example.demo.dto.DashboardStatsDTO;
import com.example.demo.dto.JobResponse;
import com.example.demo.entity.User;
import com.example.demo.service.AdminService;
import com.example.demo.service.JobService;
import com.example.demo.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserService userService;
    private final JobService jobService;
    private final AdminService adminService;


    public AdminController(UserService userService,
                           JobService jobService,
                           AdminService adminService) {

        this.userService = userService;
        this.jobService = jobService;
        this.adminService = adminService;
    }


    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }


    @GetMapping("/jobs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<JobResponse>> getAllJobs() {

        return ResponseEntity.ok(
                jobService.getAllJobs()
        );
    }


    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {

        return ResponseEntity.ok(
                adminService.getDashboardStats()
        );
    }
}