package com.example.demo.service;

import com.example.demo.entity.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserProfileRepository profileRepository;

    public UserProfileService(UserProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public UserProfile save(UserProfile profile) {
        return profileRepository.save(profile);
    }

    public UserProfile getProfile(Long id) {
        return profileRepository.findById(id).orElse(null);
    }
}