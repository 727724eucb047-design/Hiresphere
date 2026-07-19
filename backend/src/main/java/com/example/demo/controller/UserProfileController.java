package com.example.demo.controller;

import com.example.demo.entity.UserProfile;
import com.example.demo.service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class UserProfileController {

    private final UserProfileService profileService;

    public UserProfileController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<UserProfile> createProfile(
            @Valid @RequestBody UserProfile profile) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(profileService.save(profile));
    }

    @GetMapping
    public ResponseEntity<List<UserProfile>> getAllProfiles() {
        return ResponseEntity.ok(profileService.getAllProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getProfile(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody UserProfile profile) {

        return ResponseEntity.ok(
                profileService.updateProfile(id, profile));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {

        profileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}