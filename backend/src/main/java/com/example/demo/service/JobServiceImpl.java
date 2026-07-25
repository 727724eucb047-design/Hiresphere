package com.example.demo.service;

import com.example.demo.dto.JobResponse;
import com.example.demo.entity.Job;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.JobRepository;
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
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public JobResponse getJobById(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        return convertToResponse(job);
    }

    @Override
    public JobResponse updateJob(Long id, Job job) {

        Job existing = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        existing.setTitle(job.getTitle());
        existing.setCompany(job.getCompany());
        existing.setLocation(job.getLocation());
        existing.setDescription(job.getDescription());
        existing.setSalary(job.getSalary());

        Job saved = jobRepository.save(existing);

        return convertToResponse(saved);
    }

    @Override
    public void deleteJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        jobRepository.delete(job);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobResponse> getEmployerJobs() {

        return jobRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobResponse> searchJobs(String keyword) {

        return jobRepository.findAll()
                .stream()
                .filter(job ->
                        job.getTitle().toLowerCase().contains(keyword.toLowerCase())
                                || job.getCompany().toLowerCase().contains(keyword.toLowerCase())
                                || job.getLocation().toLowerCase().contains(keyword.toLowerCase()))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private JobResponse convertToResponse(Job job) {

        JobResponse response = new JobResponse();

        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setCompany(job.getCompany());
        response.setLocation(job.getLocation());
        response.setDescription(job.getDescription());
        response.setSalary(job.getSalary());

        if (job.getEmployer() != null) {
            response.setEmployerName(job.getEmployer().getName());
        }

        return response;
    }
}