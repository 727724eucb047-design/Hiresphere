package com.example.demo.service;

import com.example.demo.dto.JobResponse;
import com.example.demo.entity.Job;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface JobService {

    Job createJob(Job job, Authentication authentication);

    List<JobResponse> getAllJobs();

    JobResponse getJobById(Long id);

    JobResponse updateJob(Long id, Job job, Authentication authentication);

    List<JobResponse> getEmployerJobs(Authentication authentication);

    List<JobResponse> searchJobs(String keyword);

    void deleteJob(Long id);
}