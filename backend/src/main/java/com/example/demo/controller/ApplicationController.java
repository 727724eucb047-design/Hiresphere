package com.example.demo.controller;

import com.example.demo.entity.Application;
import com.example.demo.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public Application applyJob(@RequestBody Application application) {
        return applicationService.apply(application);
    }

    @GetMapping
    public List<Application> getApplications() {
        return applicationService.getAllApplications();
    }
}