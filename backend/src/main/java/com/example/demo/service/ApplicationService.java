package com.example.demo.service;

import com.example.demo.entity.Application;
import java.util.List;

public interface ApplicationService {

    Application createApplication(Application application);

    List<Application> getAllApplications();

    Application getApplicationById(Long id);

    Application updateApplication(Long id, Application application);

    void deleteApplication(Long id);
}