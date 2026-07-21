package com.example.demo.repository;

import com.example.demo.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Find jobs by location
    List<Job> findByLocation(String location);

    // Find jobs by company
    List<Job> findByCompany(String company);

    // Custom query
    @Query("SELECT j FROM Job j WHERE LOWER(j.company) = LOWER(?1)")
    List<Job> findJobsByCompany(String company);
}