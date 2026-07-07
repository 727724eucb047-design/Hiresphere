package com.example.demo.controller;

import com.example.demo.entity.Application;
import com.example.demo.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // CREATE
    @PostMapping
    public Application createApplication(@Valid @RequestBody Application application) {
        return applicationService.createApplication(application);
    }

    // GET ALL
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Application updateApplication(@PathVariable Long id,
                                         @Valid @RequestBody Application application) {
        return applicationService.updateApplication(id, application);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
    }
}