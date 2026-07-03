package com.example.demo.DTO;

public class ApplyRequest {

    private Long jobId;
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