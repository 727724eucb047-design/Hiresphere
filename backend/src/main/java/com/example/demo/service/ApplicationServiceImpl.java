package com.example.demo.service;

import com.example.demo.entity.Application;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found"));
    }

    @Override
    public Application updateApplication(Long id, Application application) {

        Application existing = getApplicationById(id);

        existing.setUser(application.getUser());
        existing.setJob(application.getJob());
        existing.setStatus(application.getStatus());

        return applicationRepository.save(existing);
    }

    @Override
    public void deleteApplication(Long id) {

        Application application = getApplicationById(id);

        applicationRepository.delete(application);
    }
}