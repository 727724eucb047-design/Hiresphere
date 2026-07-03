package com.example.demo.controller;

import com.example.demo.entity.Application;
import com.example.demo.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<Application> applyJob(@RequestBody Application application) {
        return ResponseEntity.ok(applicationService.apply(application));
    }

    @GetMapping
    public ResponseEntity<List<Application>> getApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(@PathVariable Long id) {
        Application application = applicationService.getApplication(id);

        if (application == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(
            @PathVariable Long id,
            @RequestBody Application application) {

        Application updated = applicationService.updateApplication(id, application);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.ok("Application deleted successfully");
    }
}