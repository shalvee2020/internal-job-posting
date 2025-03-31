import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobPostingService } from '../../services/job.service';
import { JobPosting } from '../../components/job-posting-list/jobposting';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JobsComponent implements OnInit {
  jobPostings: JobPosting[] = [];
  locationFilter = '';
  departmentFilter = '';
  employmentTypeFilter = '';
  loading = false;
  error = '';

  employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  constructor(private jobPostingService: JobPostingService) { }

  ngOnInit(): void {
    this.loadAllJobPostings();
  }

  loadAllJobPostings(): void {
    this.loading = true;
    this.error = '';

    this.jobPostingService.getAllJobPostings()
      .subscribe({
        next: (data) => {
          this.jobPostings = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading job postings', error);
          this.error = 'Failed to load job postings. Please try again later.';
          this.loading = false;
        }
      });
  }

  searchByLocation(): void {
    if (!this.locationFilter.trim()) {
      this.loadAllJobPostings();
      return;
    }

    this.loading = true;
    this.error = '';

    this.jobPostingService.searchByLocation(this.locationFilter)
      .subscribe({
        next: (data) => {
          this.jobPostings = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching by location', error);
          this.error = 'Failed to search jobs by location. Please try again.';
          this.loading = false;
        }
      });
  }

  searchByDepartment(): void {
    if (!this.departmentFilter.trim()) {
      this.loadAllJobPostings();
      return;
    }

    this.loading = true;
    this.error = '';

    this.jobPostingService.searchByDepartment(this.departmentFilter)
      .subscribe({
        next: (data) => {
          this.jobPostings = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching by department', error);
          this.error = 'Failed to search jobs by department. Please try again.';
          this.loading = false;
        }
      });
  }

  searchByEmploymentType(): void {
    if (!this.employmentTypeFilter.trim()) {
      this.loadAllJobPostings();
      return;
    }

    this.loading = true;
    this.error = '';

    this.jobPostingService.searchByEmploymentType(this.employmentTypeFilter)
      .subscribe({
        next: (data) => {
          this.jobPostings = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching by employment type', error);
          this.error = 'Failed to search jobs by employment type. Please try again.';
          this.loading = false;
        }
      });
  }

  resetFilters(): void {
    this.locationFilter = '';
    this.departmentFilter = '';
    this.employmentTypeFilter = '';
    this.loadAllJobPostings();
  }

  editJob(id?: number): void {
    if (id) {
      // Navigate to edit page or open edit modal
      console.log('Edit job with ID:', id);
    }
  }

  deleteJob(id?: number): void {
    if (id && confirm('Are you sure you want to delete this job posting?')) {
      this.loading = true;
      this.error = '';

      this.jobPostingService.deleteJobPosting(id)
        .subscribe({
          next: () => {
            console.log('Job deleted successfully');
            this.loadAllJobPostings();
          },
          error: (error) => {
            console.error('Error deleting job', error);
            this.error = 'Failed to delete job posting. Please try again.';
            this.loading = false;
          }
        });
    }

  }
}

