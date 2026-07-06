package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String location;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Double salary;

    public Job() {
    }

    public Job(Long id, String title, String company, String location, String description, Double salary) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
        this.salary = salary; // ✅ FIXED
    }

    // getters & setters
}