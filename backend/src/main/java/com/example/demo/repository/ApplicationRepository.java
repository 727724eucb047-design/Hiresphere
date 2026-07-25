package com.example.demo.repository;

import com.example.demo.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByJob_Id(Long jobId);

    List<Application> findByUser_Id(Long userId);

    boolean existsByJob_IdAndUser_Id(Long jobId, Long userId);
}