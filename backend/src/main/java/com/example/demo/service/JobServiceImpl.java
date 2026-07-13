package com.example.demo.service;

import com.example.demo.entity.Job;
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


    // CREATE
    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }


    // GET ALL
    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }


    // GET BY ID
    @Override
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found")
                );
    }


    // UPDATE
    @Override
    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found")
                );


        existingJob.setTitle(job.getTitle());
        existingJob.setCompany(job.getCompany());
        existingJob.setLocation(job.getLocation());
        existingJob.setDescription(job.getDescription());
        existingJob.setSalary(job.getSalary());


        return jobRepository.save(existingJob);
    }


    // DELETE
    @Override
    public void deleteJob(Long id) {

        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found")
                );


        jobRepository.delete(existingJob);
    }

}