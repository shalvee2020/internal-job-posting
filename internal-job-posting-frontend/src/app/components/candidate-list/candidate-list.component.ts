import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../components/candidate-list/candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink]
})
export class CandidatesComponent implements OnInit {
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.loading = true;
    this.candidateService.getAllCandidates()
      .subscribe({
        next: (data) => {
          this.candidates = data;
          this.filteredCandidates = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load candidates. Please try again later.';
          this.loading = false;
          console.error('Error loading candidates:', err);
        }
      });
  }

  applyFilters(): void {
    this.filteredCandidates = this.candidates.filter(candidate => {
      return candidate.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filteredCandidates = this.candidates;
  }

  deleteCandidate(id: number): void {
    if (confirm('Are you sure you want to remove this candidate?')) {
      this.candidateService.deleteCandidate(id)
        .subscribe({
          next: () => {
            this.candidates = this.candidates.filter(candidate => candidate.id !== id);
            this.filteredCandidates = this.filteredCandidates.filter(candidate => candidate.id !== id);
          },
          error: (err) => {
            console.error('Error deleting candidate:', err);
            alert('Failed to delete candidate. Please try again.');
          }
        });
    }
  }
}
