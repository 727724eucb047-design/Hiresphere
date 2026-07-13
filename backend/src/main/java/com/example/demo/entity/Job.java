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


// constructors + getters setters
}