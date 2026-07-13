package com.example.demo.service;


import com.example.demo.entity.Application;
import com.example.demo.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class ApplicationServiceImpl implements ApplicationService {


    private final ApplicationRepository applicationRepository;


    public ApplicationServiceImpl(ApplicationRepository applicationRepository){
        this.applicationRepository = applicationRepository;
    }



    @Override
    @Transactional
    public Application createApplication(Application application){

        return applicationRepository.save(application);
    }



    @Override
    public List<Application> getAllApplications(){

        return applicationRepository.findAll();
    }



    @Override
    public Application getApplicationById(Long id){

        return applicationRepository.findById(id)
                .orElseThrow(
                    ()-> new RuntimeException("Application not found")
                );
    }



    @Override
    @Transactional
    public Application updateApplication(Long id,
                                        Application application){

        Application existing =
                getApplicationById(id);


        existing.setUser(application.getUser());
        existing.setJob(application.getJob());
        existing.setStatus(application.getStatus());


        return applicationRepository.save(existing);
    }



    @Override
    @Transactional
    public void deleteApplication(Long id){

        Application application =
                getApplicationById(id);

        applicationRepository.delete(application);
    }

}