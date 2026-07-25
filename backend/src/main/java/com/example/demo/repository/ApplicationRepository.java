package com.example.demo.repository;

import com.example.demo.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findBySeekerId(Long seekerId);
    List<Application> findByJobId(Long jobId);
    boolean existsByJobIdAndSeekerId(Long jobId, Long seekerId);
    long countByJobId(Long jobId);
    void deleteByJobId(Long jobId);
}