package com.example.demo.service;

import com.example.demo.dto.ApplyRequest;
import com.example.demo.entity.*;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.UserProfileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository,
                              UserProfileRepository userProfileRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Transactional
    public Application applyForJob(Long jobId, String username, ApplyRequest request) {
        User seeker = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (applicationRepository.existsByJobIdAndSeekerId(jobId, seeker.getId())) {
            throw new BusinessValidationException("Already applied");
        }

        Application app = new Application();
        app.setJob(job);
        app.setSeeker(seeker);
        app.setStatus(ApplicationStatus.APPLIED);
        app.setFullName(request.getFullName());
        app.setEmail(request.getEmail());
        app.setPhone(request.getPhone());
        app.setSkills(request.getSkills());
        app.setExperience(request.getExperience());
        app.setResumeUrl(request.getResumeUrl());
        app.setCoverLetter(request.getCoverLetter());
        app.setExpectedSalary(request.getExpectedSalary());
        app.setNoticePeriod(request.getNoticePeriod());
        app.setMatchScore(calculateMatchScore(job.getRequiredSkills(), request.getSkills()));

        return applicationRepository.save(app);
    }

    public List<Application> getSeekerApplications(String username) {
        User seeker = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return applicationRepository.findBySeekerId(seeker.getId());
    }

    public List<Application> getJobApplications(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    @Transactional
    public Application updateStatus(Long applicationId, ApplicationStatus status) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }

    @Transactional
    public void withdrawApplication(Long applicationId, String username) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        if (app.getSeeker() != null && !username.equals(app.getSeeker().getUsername())) {
            throw new UnauthorizedException("Unauthorized to withdraw this application");
        }
        applicationRepository.deleteById(applicationId);
    }

    private int calculateMatchScore(String required, String applicant) {
        if (required == null || required.isBlank() || applicant == null || applicant.isBlank()) return 0;
        Set<String> req = Arrays.stream(required.toLowerCase().split(","))
                .map(String::trim).filter(s -> !s.isBlank()).collect(Collectors.toSet());
        Set<String> own = Arrays.stream(applicant.toLowerCase().split(","))
                .map(String::trim).filter(s -> !s.isBlank()).collect(Collectors.toSet());
        if (req.isEmpty()) return 0;
        long matched = req.stream().filter(own::contains).count();
        return (int) Math.round(matched * 100.0 / req.size());
    }
}