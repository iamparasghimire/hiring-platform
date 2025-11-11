'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import styles from '../../../../styles/Home.module.css';

interface JobFormData {
  title: string;
  location: string;
  description: string;
  requirements: string;
  salary_min: string;
  salary_max: string;
  job_type: string;
  experience_level: string;
  category: string;
  skills_required: string;
  benefits: string;
  isSubmitting: boolean;
  submitMessage: string;
  error: string;
}

export default function PostJobPage() {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    location: '',
    description: '',
    requirements: '',
    salary_min: '',
    salary_max: '',
    job_type: 'Full-time',
    experience_level: 'Entry',
    category: '',
    skills_required: '',
    benefits: '',
    isSubmitting: false,
    submitMessage: '',
    error: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.description || !formData.category) {
      setFormData(prev => ({ ...prev, error: 'Please fill in all required fields' }));
      return;
    }

    setFormData(prev => ({ ...prev, isSubmitting: true, error: '' }));
    
    try {
      const response = await fetch('http://localhost:8000/api/jobs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          description: formData.description,
          requirements: formData.requirements,
          salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
          salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
          job_type: formData.job_type,
          experience_level: formData.experience_level,
          category: formData.category,
          skills_required: formData.skills_required,
          benefits: formData.benefits,
        }),
      });

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          isSubmitting: false,
          submitMessage: '✓ Job posted successfully! Redirecting...',
          title: '', location: '', description: '', requirements: '', salary_min: '', salary_max: '', skills_required: '', benefits: '',
        }));
        setTimeout(() => {
          window.location.href = '/company/dashboard';
        }, 2000);
      } else {
        setFormData(prev => ({ ...prev, isSubmitting: false, error: 'Failed to post job' }));
      }
    } catch (err) {
      setFormData(prev => ({ ...prev, isSubmitting: false, error: 'Network error. Please try again.' }));
    }
  };

  const formStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600' as const,
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const messageStyle = {
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '6px',
    textAlign: 'center' as const,
  };

  const successStyle = {
    ...messageStyle,
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
  };

  const errorStyle = {
    ...messageStyle,
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca',
  };

  return (
    <>
      <Link href="/company/dashboard" className={styles.backLink}>
        ← Back to Dashboard
      </Link>

      <section className={styles.hero}>
        <h1 className={styles.title}>Post a New Job</h1>
        <p className={styles.subtitle}>Fill in the details to attract top talent</p>
      </section>

      <section className={styles.section}>
        <div style={formStyle}>
          {formData.error && <div style={errorStyle}>{formData.error}</div>}
          {formData.submitMessage && <div style={successStyle}>{formData.submitMessage}</div>}

          <form onSubmit={handleSubmit}>
            <h2 style={{ color: '#1f2937', marginBottom: '24px' }}>Job Details</h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Job Title *
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Developer"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ ...gridStyle, marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Location *
                </label>
                <input
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select Category</option>
                  <option value="1">Technology</option>
                  <option value="2">Finance</option>
                  <option value="3">Healthcare</option>
                  <option value="4">Marketing</option>
                  <option value="5">Sales</option>
                </select>
              </div>
            </div>

            <div style={{ ...gridStyle, marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Job Type
                </label>
                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Experience Level
                </label>
                <select
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>

            <div style={{ ...gridStyle, marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Salary Min (Optional)
                </label>
                <input
                  name="salary_min"
                  type="number"
                  value={formData.salary_min}
                  onChange={handleChange}
                  placeholder="50000"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Salary Max (Optional)
                </label>
                <input
                  name="salary_max"
                  type="number"
                  value={formData.salary_max}
                  onChange={handleChange}
                  placeholder="100000"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and what makes this position unique..."
                rows={5}
                required
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Requirements
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List the key requirements, qualifications, and skills needed..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Skills Required (Comma-separated)
              </label>
              <input
                name="skills_required"
                type="text"
                value={formData.skills_required}
                onChange={handleChange}
                placeholder="React, Node.js, PostgreSQL"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Benefits & Perks (Optional)
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Health insurance, Remote work, Flexible hours..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={formData.isSubmitting}
              style={{ ...buttonStyle, opacity: formData.isSubmitting ? 0.7 : 1, cursor: formData.isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              {formData.isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
