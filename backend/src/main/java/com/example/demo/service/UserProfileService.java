package com.example.demo.service;

import com.example.demo.entity.UserProfile;

import java.util.List;

public interface UserProfileService {

    UserProfile save(UserProfile profile);

    List<UserProfile> getAllProfiles();

    UserProfile getProfile(Long id);

    UserProfile updateProfile(Long id, UserProfile profile);

    void deleteProfile(Long id);
}