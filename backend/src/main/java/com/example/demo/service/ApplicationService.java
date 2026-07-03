package com.example.demo.service;

import com.example.demo.entity.Application;
import com.example.demo.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public Application apply(Application application) {
        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplication(Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    public Application updateApplication(Long id, Application application) {

        Application existing = applicationRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setUserId(application.getUserId());
            existing.setJobId(application.getJobId());
            existing.setStatus(application.getStatus());

            return applicationRepository.save(existing);
        }

        return null;
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}