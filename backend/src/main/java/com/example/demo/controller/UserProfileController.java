package com.example.demo.controller;

import com.example.demo.entity.UserProfile;
import com.example.demo.service.UserProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
public class UserProfileController {

    private final UserProfileService profileService;

    public UserProfileController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public UserProfile createProfile(@RequestBody UserProfile profile) {
        return profileService.save(profile);
    }

    @GetMapping("/{id}")
    public UserProfile getProfile(@PathVariable Long id) {
        return profileService.getProfile(id);
    }

    @PutMapping("/{id}")
    public UserProfile updateProfile(@PathVariable Long id,
                                     @RequestBody UserProfile profile) {

        UserProfile existing = profileService.getProfile(id);

        existing.setPhone(profile.getPhone());
        existing.setAddress(profile.getAddress());
        existing.setSkills(profile.getSkills());
        existing.setEducation(profile.getEducation());
        existing.setResumeUrl(profile.getResumeUrl());

        return profileService.save(existing);
    }
}