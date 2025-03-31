package com.example.internaljobpostingbackend.service;

import com.example.internaljobpostingbackend.model.JobPosting;
import com.example.internaljobpostingbackend.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class jobpostings implements JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Override
    public JobPosting saveJobPosting(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }

    @Override
    public Optional<JobPosting> getJobPostingById(Long id) {
        return jobPostingRepository.findById(id);
    }

    @Override
    public List<JobPosting> getAllJobPostings() {
        return jobPostingRepository.findAll();
    }

    @Override
    public JobPosting updateJobPosting(Long id, JobPosting jobPostingDetails) {
        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(id);
        if (jobPostingOptional.isPresent()) {
            JobPosting jobPosting = jobPostingOptional.get();
            jobPosting.setTitle(jobPostingDetails.getTitle());
            jobPosting.setDescription(jobPostingDetails.getDescription());
            jobPosting.setDepartment(jobPostingDetails.getDepartment());
            return jobPostingRepository.save(jobPosting);
        } else {
            throw new RuntimeException("JobPosting not found with id " + id);
        }
    }

    @Override
    public void deleteJobPostingById(Long id) {
        jobPostingRepository.deleteById(id);
    }

    @Override
    public void deleteJobPostingByTitle(String title) {
        List<JobPosting> jobPostings = jobPostingRepository.findByTitle(title);
        jobPostingRepository.deleteAll(jobPostings);
    }


}
