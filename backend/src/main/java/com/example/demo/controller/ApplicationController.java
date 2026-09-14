package com.example.demo.controller;

import com.example.demo.dto.ApplyRequest;
import com.example.demo.entity.Application;
import com.example.demo.entity.ApplicationStatus;
import com.example.demo.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply/{jobId}")
    @PreAuthorize("hasAuthority('ROLE_JOB_SEEKER')")
    public ResponseEntity<Application> applyForJob(@PathVariable Long jobId,
                                                    @RequestBody ApplyRequest request,
                                                    Authentication authentication) {
        return ResponseEntity.ok(applicationService.applyForJob(jobId, authentication.getName(), request));
    }

    @GetMapping("/seeker")
    @PreAuthorize("hasAuthority('ROLE_JOB_SEEKER')")
    public ResponseEntity<List<Application>> getSeekerApplications(Authentication authentication) {
        return ResponseEntity.ok(applicationService.getSeekerApplications(authentication.getName()));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYER')")
    public ResponseEntity<List<Application>> getJobApplications(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getJobApplications(jobId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYER')")
    public ResponseEntity<Application> updateStatus(@PathVariable Long id,
                                                     @RequestParam ApplicationStatus status) {
        return ResponseEntity.ok(applicationService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_JOB_SEEKER')")
    public ResponseEntity<String> withdrawApplication(@PathVariable Long id,
                                                       Authentication authentication) {
        applicationService.withdrawApplication(id, authentication.getName());
        return ResponseEntity.ok("Application deleted successfully.");
    }
    @GetMapping("/all")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public ResponseEntity<List<Application>> getAllApplications() {
    return ResponseEntity.ok(applicationService.getAllApplications());
}
}
