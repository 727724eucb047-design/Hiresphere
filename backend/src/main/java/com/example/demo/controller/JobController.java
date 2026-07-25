package com.example.demo.controller;

import com.example.demo.dto.JobResponse;
import com.example.demo.entity.Job;
import com.example.demo.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYER','ROLE_ADMIN')")
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job, Authentication authentication) {
        return ResponseEntity.ok(jobService.createJob(job, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        Job job = jobService.getJobById(id);
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setRequiredSkills(job.getRequiredSkills());
        response.setLocation(job.getLocation());
        response.setSalary(job.getSalary());
        response.setExperienceRequired(job.getExperienceRequired());
        response.setCreatedAt(job.getCreatedAt());
        response.setActive(job.getActive());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/employer")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYER')")
    public ResponseEntity<List<JobResponse>> getEmployerJobs(Authentication authentication) {
        return ResponseEntity.ok(jobService.getJobsByEmployer(authentication.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYER')")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id,
                                                  @RequestBody Job job,
                                                  Authentication authentication) {
        return ResponseEntity.ok(jobService.updateJob(id, job, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYER','ROLE_ADMIN')")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok("Job deleted successfully.");
    }

    @GetMapping("/search")
    public ResponseEntity<List<JobResponse>> searchJobs(@RequestParam String keyword) {
        return ResponseEntity.ok(jobService.searchJobs(keyword));
    }
}