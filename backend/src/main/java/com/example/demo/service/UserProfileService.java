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

    public UserProfile updateProfile(Long id, UserProfile profile) {

        UserProfile existing = profileRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setPhone(profile.getPhone());
            existing.setAddress(profile.getAddress());
            existing.setSkills(profile.getSkills());
            existing.setEducation(profile.getEducation());
            existing.setResumeUrl(profile.getResumeUrl());

            return profileRepository.save(existing);
        }

        return null;
    }

    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
}