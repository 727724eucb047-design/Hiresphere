package com.example.demo.dto;

import java.util.Date;

public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String requiredSkills;
    private String location;
    private Long salary;
    private Integer experienceRequired;
    private Date createdAt;
    private Boolean active;
    private long applicationsCount;

    public JobResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Long getSalary() { return salary; }
    public void setSalary(Long salary) { this.salary = salary; }
    public Integer getExperienceRequired() { return experienceRequired; }
    public void setExperienceRequired(Integer experienceRequired) { this.experienceRequired = experienceRequired; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public long getApplicationsCount() { return applicationsCount; }
    public void setApplicationsCount(long applicationsCount) { this.applicationsCount = applicationsCount; }
}
