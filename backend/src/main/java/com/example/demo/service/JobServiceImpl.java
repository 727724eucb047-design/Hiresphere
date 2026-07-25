package com.example.demo.service;

import com.example.demo.dto.JobResponse;
import com.example.demo.entity.Job;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.JobRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }


    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }


    @Override
    @Transactional(readOnly = true)
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                new ResourceNotFoundException("Job not found"));
    }


    @Override
    public Job updateJob(Long id, Job job) {

        Job existing = getJobById(id);

        existing.setTitle(job.getTitle());
        existing.setCompany(job.getCompany());
        existing.setLocation(job.getLocation());
        existing.setDescription(job.getDescription());
        existing.setSalary(job.getSalary());

        return jobRepository.save(existing);
    }


    @Override
    public void deleteJob(Long id) {

        Job job = getJobById(id);

        jobRepository.delete(job);
    }
}