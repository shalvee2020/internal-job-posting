package com.example.internaljobpostingbackend.repository;

import com.example.internaljobpostingbackend.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByName(String name);
    List<Candidate> findByResumeUrl(String resumeUrl);
    List<Candidate> findByEmail(String email);

}