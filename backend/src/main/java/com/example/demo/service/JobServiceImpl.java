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
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }


    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }


    @Override
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job not found"
                        ));
    }


    @Override
    public Job updateJob(Long id, Job job) {

        Job existingJob = getJobById(id);

        existingJob.setTitle(job.getTitle());
        existingJob.setCompany(job.getCompany());
        existingJob.setLocation(job.getLocation());
        existingJob.setDescription(job.getDescription());
        existingJob.setSalary(job.getSalary());

        return jobRepository.save(existingJob);
    }


    @Override
    public void deleteJob(Long id) {

        if(!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Job not found"
            );
        }

        jobRepository.deleteById(id);
    }
}