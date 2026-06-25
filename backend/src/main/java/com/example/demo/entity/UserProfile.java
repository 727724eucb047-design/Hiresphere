package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String address;
    private String skills;
    private String education;
    private String resumeUrl;

    private Long userId;

    public UserProfile() {
    }

    public UserProfile(Long id, String phone, String address,
                       String skills, String education,
                       String resumeUrl, Long userId) {
        this.id = id;
        this.phone = phone;
        this.address = address;
        this.skills = skills;
        this.education = education;
        this.resumeUrl = resumeUrl;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getSkills() {
        return skills;
    }

    public String getEducation() {
        return education;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public Long getUserId() {
        return userId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}