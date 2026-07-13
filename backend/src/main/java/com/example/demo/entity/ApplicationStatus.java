package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "application_status")
public class ApplicationStatus {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String statusName;


    @OneToMany(mappedBy = "status")
    private List<Application> applications;


    public ApplicationStatus() {
    }


    public ApplicationStatus(Long id, String statusName) {
        this.id = id;
        this.statusName = statusName;
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getStatusName() {
        return statusName;
    }


    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }


    public List<Application> getApplications() {
        return applications;
    }


    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }
}