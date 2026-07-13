package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotBlank(message="Title required")
    @Column(nullable=false)
    private String title;


    @NotBlank(message="Company required")
    @Column(nullable=false)
    private String company;


    @NotBlank(message="Location required")
    @Column(nullable=false)
    private String location;


    @Column(length=2000)
    private String description;


    @NotNull(message="Salary required")
    @Column(nullable=false)
    private Double salary;


    // Default constructor
    public Job() {
    }


    // Parameterized constructor
    public Job(Long id, String title, String company,
               String location, String description,
               Double salary) {

        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
        this.salary = salary;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}