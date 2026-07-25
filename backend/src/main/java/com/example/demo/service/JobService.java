package com.example.demo.service;

import com.example.demo.dto.JobResponse;
import com.example.demo.entity.Job;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    public JobService(JobRepository jobRepository,
                      UserRepository userRepository,
                      ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    @Transactional
    public Job createJob(Job job, String username) {
        User employer = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        job.setEmployer(employer);
        if (job.getActive() == null) job.setActive(true);
        return jobRepository.save(job);
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll().stream().map(this::toResponse).toList();
    }

    public List<JobResponse> getJobsByEmployer(String username) {
        User employer = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return jobRepository.findByEmployerId(employer.getId()).stream().map(this::toResponse).toList();
    }

    @Transactional
    public JobResponse updateJob(Long jobId, Job update, String username) {
        Job existing = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (existing.getEmployer() != null &&
                !existing.getEmployer().getUsername().equals(username)) {
            throw new UnauthorizedException("Unauthorized to edit this job");
        }

        if (update.getTitle() != null) existing.setTitle(update.getTitle());
        if (update.getDescription() != null) existing.setDescription(update.getDescription());
        if (update.getRequiredSkills() != null) existing.setRequiredSkills(update.getRequiredSkills());
        if (update.getLocation() != null) existing.setLocation(update.getLocation());
        if (update.getSalary() != null) existing.setSalary(update.getSalary());
        if (update.getExperienceRequired() != null) existing.setExperienceRequired(update.getExperienceRequired());
        if (update.getActive() != null) existing.setActive(update.getActive());

        return toResponse(jobRepository.save(existing));
    }

    @Transactional
    public void deleteJob(Long jobId) {
        applicationRepository.deleteByJobId(jobId);
        jobRepository.deleteById(jobId);
    }

    public List<JobResponse> searchJobs(String keyword) {
        return jobRepository
                .findByTitleContainingIgnoreCaseOrRequiredSkillsContainingIgnoreCaseOrLocationContainingIgnoreCase(
                        keyword, keyword, keyword)
                .stream().map(this::toResponse).toList();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
    }

    private JobResponse toResponse(Job job) {
        JobResponse dto = new JobResponse();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setRequiredSkills(job.getRequiredSkills());
        dto.setLocation(job.getLocation());
        dto.setSalary(job.getSalary());
        dto.setExperienceRequired(job.getExperienceRequired());
        dto.setCreatedAt(job.getCreatedAt());
        dto.setActive(job.getActive());
        long count = job.getId() == null ? 0L : applicationRepository.countByJobId(job.getId());
        dto.setApplicationsCount(count);
        return dto;
    }
}
