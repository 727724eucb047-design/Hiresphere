package com.example.demo.controller;

import com.example.demo.dto.JobResponse;
import com.example.demo.entity.Job;
import com.example.demo.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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

    // Create Job
    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job,
                                         Authentication authentication) {
        return ResponseEntity.ok(jobService.createJob(job, authentication));
    }

    // Get All Jobs
    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Get Job By Id
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    // Update Job
    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id,
                                                 @Valid @RequestBody Job job,
                                                 Authentication authentication) {
        return ResponseEntity.ok(jobService.updateJob(id, job, authentication));
    }

    // Employer Jobs
    @GetMapping("/employer")
    public ResponseEntity<List<JobResponse>> getEmployerJobs(Authentication authentication) {
        return ResponseEntity.ok(jobService.getEmployerJobs(authentication));
    }

    // Search Jobs
    @GetMapping("/search")
    public ResponseEntity<List<JobResponse>> searchJobs(@RequestParam String keyword) {
        return ResponseEntity.ok(jobService.searchJobs(keyword));
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok("Job deleted successfully!");
    }
}