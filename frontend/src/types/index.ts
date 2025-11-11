// FILE: types/index.ts

export interface Company {
  id: number;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  location: string;
  industry?: string;
  employee_count?: string;
  founded_year?: number;
  phone?: string;
  email: string;
  verified: boolean;
  jobs_count: number;
  active_jobs: number;
  created_at: string;
  updated_at: string;
}

export interface JobCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  jobs_count: number;
  created_at: string;
}

export interface Job {
  id: number;
  title: string;
  company: Company;
  location: string;
  description: string;
  requirements: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  experience_level?: 'Entry' | 'Mid' | 'Senior';
  status: 'open' | 'closed' | 'on_hold';
  category?: JobCategory;
  category_id?: number;
  skills_required?: string;
  benefits?: string;
  applications_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job: Job;
  job_title?: string;
  candidate_name: string;
  candidate_email: string;
  phone_number: string;
  candidate_message?: string;
  cv: string; // File URL
  status: 'submitted' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  rating?: number;
  notes?: string;
  submitted_at: string;
  updated_at: string;
}

export interface Interview {
  id: number;
  application: number;
  interview_type: 'phone' | 'video' | 'in_person' | 'assignment';
  scheduled_at: string;
  duration_minutes: number;
  interviewer_name: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface SavedJob {
  id: number;
  job: Job;
  candidate_email: string;
  saved_at: string;
}

export interface ApplicationFormData {
  job: number;
  candidate_name: string;
  candidate_email: string;
  phone_number: string;
  candidate_message?: string;
  cv: File;
}

export interface JobSearchFilters {
  search?: string;
  category?: number;
  job_type?: string;
  experience_level?: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
}