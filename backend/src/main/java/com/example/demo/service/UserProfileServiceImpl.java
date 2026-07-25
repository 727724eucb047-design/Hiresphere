package com.example.demo.service;

import com.example.demo.entity.UserProfile;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileServiceImpl(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @Override
    @Transactional
    public UserProfile save(UserProfile profile) {
        return userProfileRepository.save(profile);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserProfile> getAllProfiles() {
        return userProfileRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfile getProfile(Long id) {
        return userProfileRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User profile not found"));
    }

    @Override
    @Transactional
    public UserProfile updateProfile(Long id, UserProfile profile) {

        UserProfile existing = getProfile(id);

        existing.setPhone(profile.getPhone());
        existing.setAddress(profile.getAddress());
        existing.setSkills(profile.getSkills());
        existing.setEducation(profile.getEducation());
        existing.setResumeUrl(profile.getResumeUrl());

        if (profile.getUser() != null) {
            existing.setUser(profile.getUser());
        }

        return userProfileRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteProfile(Long id) {

        UserProfile profile = getProfile(id);

        userProfileRepository.delete(profile);
    }
}