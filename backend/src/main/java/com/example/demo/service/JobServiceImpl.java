package com.example.demo.service;

import com.example.demo.entity.Job;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    @Transactional
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
    @Transactional
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
    @Transactional
    public void deleteJob(Long id) {

        Job job = getJobById(id);

        jobRepository.delete(job);
    }
}