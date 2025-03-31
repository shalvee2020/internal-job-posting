package com.example.internaljobpostingbackend.controller;

import com.example.internaljobpostingbackend.model.Candidate;
import com.example.internaljobpostingbackend.repository.CandidateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidates")
public class CandidateController {
    private final CandidateRepository repository;

    public CandidateController(CandidateRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Candidate createCandidate(@RequestBody Candidate candidate) {
        return repository.save(candidate);
    }

    @GetMapping
    public List<Candidate> getAllCandidates() {
        return repository.findAll();
    }
}
