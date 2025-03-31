package com.example.internaljobpostingbackend.controller;

import com.example.internaljobpostingbackend.model.JobPosting;
import com.example.internaljobpostingbackend.repository.JobPostingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobpostings")
public class JobPostingController {
    private final JobPostingRepository repository;

    public JobPostingController(JobPostingRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public JobPosting createJobPosting(@RequestBody JobPosting jobPosting) {
        return repository.save(jobPosting);
    }

    @GetMapping
    public List<JobPosting> getAllJobPostings() {
        return repository.findAll();
    }
}