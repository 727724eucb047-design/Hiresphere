package com.example.demo.repository;

import com.example.demo.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployerId(Long employerId);

    List<Job> findByTitleContainingIgnoreCaseOrRequiredSkillsContainingIgnoreCaseOrLocationContainingIgnoreCase(
            String title, String skills, String location);

    long countByActive(boolean active);

    @Query("SELECT j FROM Job j WHERE j.active = true")
    List<Job> findActiveJobs();
}
