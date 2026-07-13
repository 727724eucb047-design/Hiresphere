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
                        new RuntimeException("Job not found")
                );
    }


    @Override
    public Job updateJob(Long id, Job job) {

        Job existing = jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found")
                );


        existing.setTitle(job.getTitle());
        existing.setCompany(job.getCompany());
        existing.setLocation(job.getLocation());
        existing.setDescription(job.getDescription());
        existing.setSalary(job.getSalary());


        return jobRepository.save(existing);
    }


    @Override
    public void deleteJob(Long id) {

        if(!jobRepository.existsById(id)){
            throw new RuntimeException("Job not found");
        }

        jobRepository.deleteById(id);
    }
}