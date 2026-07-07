package com.example.demo.DTO;

import jakarta.validation.constraints.NotNull;

public class ApplyRequest {

    @NotNull(message = "Job ID is required")
    private Long jobId;

    @NotNull(message = "User ID is required")
    private Long userId;

    public ApplyRequest() {
    }

    public ApplyRequest(Long jobId, Long userId) {
        this.jobId = jobId;
        this.userId = userId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}