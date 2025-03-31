package com.example.internaljobpostingbackend.service;

import com.example.internaljobpostingbackend.model.Candidate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public interface candidateService {
    Candidate saveCandidate(Candidate candidate);
    Optional<Candidate> getCandidateById(Long id);
    List<Candidate> getAllCandidates();
    Candidate updateCandidate(Long id, Candidate candidateDetails);
    void deleteCandidateById(Long id);
    void deleteCandidateByEmail(String email);
}
