// FILE: components/ApplicationForm.tsx

"use client"; // This component is interactive, so it must be a Client Component

import { useState, ChangeEvent, FormEvent } from 'react';
import { submitApplication, handleApiError } from '../services/api';
import { ApplicationFormData } from '../types';
import styles from './ApplicationForm.module.css';

// Define the props
interface ApplicationFormProps {
  jobId: number;
  jobTitle?: string;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  cvFile: File | null;
  isSubmitting: boolean;
  submitMessage: string;
  submitStatus: 'idle' | 'success' | 'error';
}

export default function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    cvFile: null,
    isSubmitting: false,
    submitMessage: '',
    submitStatus: 'idle',
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setFormState(prev => ({
          ...prev,
          submitMessage: 'Please upload a PDF or Word document',
          submitStatus: 'error'
        }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormState(prev => ({
          ...prev,
          submitMessage: 'File size must not exceed 5MB',
          submitStatus: 'error'
        }));
        return;
      }
      setFormState(prev => ({ ...prev, cvFile: file, submitMessage: '', submitStatus: 'idle' }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.cvFile) {
      setFormState(prev => ({
        ...prev,
        submitMessage: 'Please upload a CV.',
        submitStatus: 'error'
      }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, submitMessage: 'Submitting...' }));

    try {
      const applicationData: ApplicationFormData = {
        job: jobId,
        candidate_name: formState.fullName,
        candidate_email: formState.email,
        phone_number: formState.phone,
        candidate_message: formState.message,
        cv: formState.cvFile,
      };

      await submitApplication(applicationData);
      
      setFormState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        cvFile: null,
        isSubmitting: false,
        submitMessage: '✓ Application submitted successfully!',
        submitStatus: 'success',
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      const errorMsg = handleApiError(error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitMessage: errorMsg || 'Error submitting application. Please try again.',
        submitStatus: 'error'
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>Apply for {jobTitle || 'this position'}</h3>
      
      <div className={styles.formGroup}>
        <label htmlFor="fullName" className={styles.label}>
          Full Name <span className={styles.required}>*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formState.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formState.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 000-0000"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Cover Letter / Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleInputChange}
          placeholder="Tell us why you're interested in this position..."
          rows={4}
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="cv" className={styles.label}>
          Upload CV <span className={styles.required}>*</span>
        </label>
        <div className={styles.fileInputWrapper}>
          <input
            id="cv"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
            className={styles.fileInput}
          />
          <span className={styles.fileName}>
            {formState.cvFile ? formState.cvFile.name : 'Choose PDF or Word document (max 5MB)'}
          </span>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={formState.isSubmitting} 
        className={`${styles.submitButton} ${formState.isSubmitting ? styles.disabled : ''}`}
      >
        {formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>

      {formState.submitMessage && (
        <div className={`${styles.message} ${styles[formState.submitStatus]}`}>
          {formState.submitMessage}
        </div>
      )}
    </form>
  );
}