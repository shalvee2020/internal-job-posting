import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../candidate-list/candidate';

@Component({
  selector: 'app-candidate-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './candidate-registration.component.html',
  styleUrl: './candidate-registration.component.css'
})
export class CandidateRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitting = false;
  submitError = '';
  submitSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      resumeUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const candidateData: Candidate = this.registrationForm.value;

    this.candidateService.createCandidate(candidateData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        // Reset the form
        this.registrationForm.reset();
        // Navigate to candidate list or show success message
        setTimeout(() => {
          this.router.navigate(['/candidates']);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitError = 'Failed to register candidate. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }

  // Helper methods for template
  get nameControl() { return this.registrationForm.get('name'); }
  get emailControl() { return this.registrationForm.get('email'); }
  get resumeUrlControl() { return this.registrationForm.get('resumeUrl'); }

  // Resume file upload handling (optional enhancement)
  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Here you would typically upload the file to your server or cloud storage
      // and then update the resumeUrl field with the returned URL

      // This is just a placeholder - implement actual file upload logic as needed
      console.log('File selected:', file.name);

      // For demo purposes only - normally you'd set this after successful upload
      this.registrationForm.patchValue({
        resumeUrl: `uploads/${file.name}` // Placeholder URL
      });
    }
  }
}
