package com.example.internaljobpostingbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.internaljobpostingbackend.model.Candidate;
import com.example.internaljobpostingbackend.repository.CandidateRepository;

import java.util.List;
import java.util.Optional;

@Service
public class candidates implements candidateService {
    @Autowired
    private CandidateRepository candidateRepository;

    @Override
    public Candidate saveCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    @Override
    public Optional<Candidate> getCandidateById(Long id) {
        return candidateRepository.findById(id);
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @Override
    public Candidate updateCandidate(Long id, Candidate candidateDetails) {
        Optional<Candidate> candidateOptional = candidateRepository.findById(id);
        if (candidateOptional.isPresent()) {
            Candidate candidate = candidateOptional.get();
            candidate.setName(candidateDetails.getName());
            candidate.setEmail(candidateDetails.getEmail());
            candidate.setResumeUrl(candidateDetails.getResumeUrl());
            return candidateRepository.save(candidate);
        } else {
            throw new RuntimeException("Candidate not found with id: " + id);
        }
    }

    @Override
    public void deleteCandidateById(Long id) {
        candidateRepository.deleteById(id);
    }

    @Override
    public void deleteCandidateByEmail(String email) {
        List<Candidate> candidates = candidateRepository.findByEmail(email);
        if (!candidates.isEmpty()) {
            candidateRepository.delete(candidates.get(0));
        }
    }
}
