package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long jobId;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    public Application() {
    }

    public Application(Long id, Long userId,
                       Long jobId, ApplicationStatus status) {
        this.id = id;
        this.userId = userId;
        this.jobId = jobId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getJobId() {
        return jobId;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}