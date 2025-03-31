package com.example.internaljobpostingbackend.repository;

import com.example.internaljobpostingbackend.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByTitle(String title);
    List<JobPosting> findByDescription(String description);
    List<JobPosting> findByDepartment(String dept);


}
