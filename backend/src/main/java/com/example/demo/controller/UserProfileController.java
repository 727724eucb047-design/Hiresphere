package com.example.demo.controller;

import com.example.demo.entity.UserProfile;
import com.example.demo.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class UserProfileController {

    private final UserProfileService profileService;

    public UserProfileController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<UserProfile> createProfile(@RequestBody UserProfile profile) {
        return ResponseEntity.ok(profileService.save(profile));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable Long id) {

        UserProfile profile = profileService.getProfile(id);

        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateProfile(@PathVariable Long id,
                                                     @RequestBody UserProfile profile) {

        UserProfile existing = profileService.getProfile(id);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setPhone(profile.getPhone());
        existing.setAddress(profile.getAddress());
        existing.setSkills(profile.getSkills());
        existing.setEducation(profile.getEducation());
        existing.setResumeUrl(profile.getResumeUrl());

        return ResponseEntity.ok(profileService.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long id) {

        profileService.deleteProfile(id);

        return ResponseEntity.ok("Profile deleted successfully");
    }
}