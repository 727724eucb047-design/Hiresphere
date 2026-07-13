package com.example.demo.service;

import com.example.demo.entity.UserProfile;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserProfileRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserProfileServiceImpl implements UserProfileService {


    private final UserProfileRepository userProfileRepository;


    public UserProfileServiceImpl(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }


    @Override
    public UserProfile save(UserProfile profile) {

        return userProfileRepository.save(profile);
    }


    @Override
    public UserProfile getProfile(Long id) {

        return userProfileRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User profile not found"
                        )
                );
    }


    @Override
    public void deleteProfile(Long id) {

        UserProfile profile =
                userProfileRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User profile not found"
                        )
                );

        userProfileRepository.delete(profile);
    }

}