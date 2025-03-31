import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobPostingService } from '../../services/job.service';
import { JobPosting } from '../job-posting-list/jobposting';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  jobForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  submitSuccess = false;

  employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  constructor(
    private formBuilder: FormBuilder,
    private jobPostingService: JobPostingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.jobForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      department: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      employmentType: ['Full-time', Validators.required],
      jobId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      Object.keys(this.jobForm.controls).forEach(key => {
        const control = this.jobForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const jobData: Omit<JobPosting, 'id'> = {
      ...this.jobForm.value,
      salary: parseFloat(this.jobForm.value.salary)
    };

    this.jobPostingService.createJobPosting(jobData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.jobForm.reset();
        this.initializeForm();
        setTimeout(() => {
          this.router.navigate(['/jobs']);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'Failed to create job posting. Please try again.';
        console.error('Job creation error:', error);
      }
    });
  }

  get titleControl() { return this.jobForm.get('title'); }
  get descriptionControl() { return this.jobForm.get('description'); }
  get departmentControl() { return this.jobForm.get('department'); }
  get locationControl() { return this.jobForm.get('location'); }
  get salaryControl() { return this.jobForm.get('salary'); }
  get employmentTypeControl() { return this.jobForm.get('employmentType'); }
  get jobIdControl() { return this.jobForm.get('jobId'); }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // This is a placeholder for file handling functionality
      // In a real application, you might upload the file to a server and get back a URL
      console.log('File selected:', file.name);

      // If your JobPosting model has a property for attachments or documents,
      // you would update the form here
      // Example:
      // this.jobForm.patchValue({
      //   attachmentUrl: 'uploads/' + file.name // Placeholder
      // });
    }
  }
}
