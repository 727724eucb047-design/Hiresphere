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



    // CREATE
    @Override
    @Transactional
    public Application createApplication(Application application) {

        return applicationRepository.save(application);
    }



    // GET ALL
    @Override
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }



    // GET BY ID
    @Override
    public Application getApplicationById(Long id) {

        return applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found"
                        ));
    }



    // UPDATE
    @Override
    @Transactional
    public Application updateApplication(Long id,
                                        Application application) {


        Application existing =
                applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found"
                        ));


        existing.setUser(application.getUser());
        existing.setJob(application.getJob());
        existing.setStatus(application.getStatus());


        return applicationRepository.save(existing);
    }



    // DELETE
    @Override
@Transactional
public void deleteApplication(Long id) {

    Application application = applicationRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Application not found"));

    applicationRepository.delete(application);
}

}