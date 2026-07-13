package com.example.demo.controller;

import com.example.demo.entity.Application;
import com.example.demo.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public Application createApplication(@Valid @RequestBody Application application) {
        return applicationService.createApplication(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }

    @PutMapping("/{id}")
    public Application updateApplication(@PathVariable Long id,
                                         @Valid @RequestBody Application application) {
        return applicationService.updateApplication(id, application);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
    }
}