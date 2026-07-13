package com.example.demo.service;

import com.example.demo.entity.UserProfile;

import java.util.List;

public interface UserProfileService {

    // Create profile
    UserProfile save(UserProfile profile);


    // Get all profiles
    List<UserProfile> getAllProfiles();


    // Get profile by id
    UserProfile getProfile(Long id);


    // Update profile
    UserProfile updateProfile(Long id, UserProfile profile);


    // Delete profile
    void deleteProfile(Long id);

}