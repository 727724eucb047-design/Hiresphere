package com.example.demo.service;

import com.example.demo.entity.Job;
import com.example.demo.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJob(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository.findById(id).orElse(null);

        if (existingJob != null) {
            existingJob.setTitle(job.getTitle());
            existingJob.setCompany(job.getCompany());
            existingJob.setLocation(job.getLocation());
            existingJob.setDescription(job.getDescription());
            existingJob.setSalary(job.getSalary());

            return jobRepository.save(existingJob);
        }

        return null;
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}