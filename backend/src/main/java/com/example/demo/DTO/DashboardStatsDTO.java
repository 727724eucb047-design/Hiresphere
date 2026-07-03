package com.example.demo.DTO;

public class DashboardStatsDTO {

    private long totalUsers;
    private long totalJobs;
    private long totalApplications;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(long totalUsers, long totalJobs, long totalApplications) {
        this.totalUsers = totalUsers;
        this.totalJobs = totalJobs;
        this.totalApplications = totalApplications;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }
}