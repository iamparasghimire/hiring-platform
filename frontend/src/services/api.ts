// FILE: services/api.ts

import axios, { AxiosResponse } from 'axios';
import { Job, JobCategory, Application, ApplicationFormData } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== CATEGORIES ==========
export const getCategories = (): Promise<AxiosResponse<JobCategory[]>> =>
  api.get('/categories/');

export const getCategoryById = (id: string | number): Promise<AxiosResponse<JobCategory>> =>
  api.get(`/categories/${id}/`);

export const getCategoryJobs = (categoryId: string | number): Promise<AxiosResponse<Job[]>> =>
  api.get(`/categories/${categoryId}/jobs/`);

// ========== JOBS ==========
export const getJobs = (): Promise<AxiosResponse<Job[]>> =>
  api.get('/jobs/');

export const getJobById = (id: string | number): Promise<AxiosResponse<Job>> =>
  api.get(`/jobs/${id}/`);

export const getJobsByCategoryId = (categoryId: string | number): Promise<AxiosResponse<Job[]>> =>
  api.get(`/jobs/?category=${categoryId}`);

export const getRecentJobs = (): Promise<AxiosResponse<Job[]>> =>
  api.get('/recent-jobs/');

export const getSimilarJobs = (jobId: string | number): Promise<AxiosResponse<Job[]>> =>
  api.get(`/jobs/${jobId}/similar/`);

export const searchJobs = (query: string): Promise<AxiosResponse<Job[]>> =>
  api.get(`/jobs/?search=${query}`);

export const getJobsByType = (jobType: string): Promise<AxiosResponse<Job[]>> =>
  api.get(`/jobs/?job_type=${jobType}`);

// ========== APPLICATIONS ==========
export const getApplications = (): Promise<AxiosResponse<Application[]>> =>
  api.get('/applications/');

export const getApplicationById = (id: number): Promise<AxiosResponse<Application>> =>
  api.get(`/applications/${id}/`);

export const getJobApplications = (jobId: number): Promise<AxiosResponse<Application[]>> =>
  api.get(`/applications/?job=${jobId}`);

export const getApplicationsByStatus = (status: string): Promise<AxiosResponse<Application[]>> =>
  api.get(`/applications/?status=${status}`);

export const submitApplication = async (formData: ApplicationFormData): Promise<AxiosResponse> => {
  const data = new FormData();
  data.append('job', String(formData.job));
  data.append('candidate_name', formData.candidate_name);
  data.append('candidate_email', formData.candidate_email);
  data.append('phone_number', formData.phone_number);
  if (formData.candidate_message) {
    data.append('candidate_message', formData.candidate_message);
  }
  data.append('cv', formData.cv);

  return api.post('/applications/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateApplication = (id: number, data: Partial<Application>): Promise<AxiosResponse> =>
  api.patch(`/applications/${id}/`, data);

export const deleteApplication = (id: number): Promise<AxiosResponse> =>
  api.delete(`/applications/${id}/`);

// Error handler
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as any;
      if (typeof data === 'object' && data !== null) {
        const firstError = Object.values(data)[0];
        if (Array.isArray(firstError)) {
          return firstError[0];
        }
        return String(firstError);
      }
      return error.response.statusText || 'An error occurred';
    }
    return error.message;
  }
  return 'An unexpected error occurred';
};