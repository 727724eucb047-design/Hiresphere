package com.example.demo.service;

import com.example.demo.entity.Job;
import java.util.List;

import org.springframework.stereotype.Service;
@Service
public interface JobService {
    Job createJob(Job job);
    List<Job> getAllJobs();
    Job getJobById(Long id);
    Job updateJob(Long id, Job job);
    void deleteJob(Long id);
}