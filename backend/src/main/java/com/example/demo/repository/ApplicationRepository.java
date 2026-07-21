package com.example.demo.repository;

import com.example.demo.entity.Application;
import com.example.demo.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByJobId(Long jobId);

    List<Application> findBySeeker_Id(Long seekerId);

    boolean existsByJob_IdAndSeeker_Id(Long jobId, Long seekerId);

    long countByStatus(ApplicationStatus status);

}