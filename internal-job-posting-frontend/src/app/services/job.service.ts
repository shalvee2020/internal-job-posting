import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JobPosting } from '../components/job-posting-list/jobposting';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private apiUrl = 'http://localhost:8080/api/jobposting';

  constructor(private http: HttpClient) { }

  getAllJobPostings(): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getJobPostingById(id: number): Observable<JobPosting> {
    return this.http.get<JobPosting>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createJobPosting(jobData: Omit<JobPosting, 'id'>): Observable<JobPosting> {
    return this.http.post<JobPosting>(this.apiUrl, jobData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateJobPosting(id: number, jobData: Partial<JobPosting>): Observable<JobPosting> {
    return this.http.put<JobPosting>(`${this.apiUrl}/${id}`, jobData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteJobPosting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteJobPostingByTitle(title: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/title/${title}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchByDepartment(department: string): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/search/department?value=${department}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchByLocation(location: string): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/search/location?value=${location}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchByEmploymentType(type: string): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/search/employmentType?value=${type}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
