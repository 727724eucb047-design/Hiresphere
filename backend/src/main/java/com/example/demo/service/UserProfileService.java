package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.entity.UserProfile;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserProfileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class UserProfileService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserRepository userRepository, UserProfileRepository userProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Transactional
    public UserProfile getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userProfileRepository.findByUserId(user.getId()).orElseGet(() -> {
            UserProfile profile = new UserProfile();
            profile.setUser(user);
            return userProfileRepository.save(profile);
        });
    }

    @Transactional
    public UserProfile updateProfile(String username, Map<String, Object> updateData) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Object fullName = updateData.get("fullName");
        if (fullName != null) {
            user.setFullName(fullName.toString());
            userRepository.save(user);
        }

        UserProfile profile = userProfileRepository.findByUserId(user.getId()).orElseGet(() -> {
            UserProfile p = new UserProfile();
            p.setUser(user);
            return p;
        });

        if (updateData.get("about") != null) profile.setAbout(updateData.get("about").toString());
        if (updateData.get("skills") != null) profile.setSkills(updateData.get("skills").toString());
        if (updateData.get("resumeUrl") != null) profile.setResumeUrl(updateData.get("resumeUrl").toString());
        if (updateData.get("companyName") != null) profile.setCompanyName(updateData.get("companyName").toString());

        return userProfileRepository.save(profile);
    }
}