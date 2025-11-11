'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';

interface CompanyFormData {
  name: string;
  email: string;
  password: string;
  location: string;
  website: string;
  industry: string;
  description: string;
  phone: string;
  employee_count: string;
  founded_year: string;
  isSubmitting: boolean;
  submitMessage: string;
  error: string;
}

export default function CompanySignupPage() {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    email: '',
    password: '',
    location: '',
    website: '',
    industry: '',
    description: '',
    phone: '',
    employee_count: '',
    founded_year: '',
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
    
    if (!formData.name || !formData.email || !formData.password || !formData.location) {
      setFormData(prev => ({ ...prev, error: 'Please fill in all required fields' }));
      return;
    }

    setFormData(prev => ({ ...prev, isSubmitting: true, error: '' }));
    
    try {
      const response = await fetch('http://localhost:8000/api/company-register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: formData.location,
          website: formData.website,
          industry: formData.industry,
          description: formData.description,
          phone: formData.phone,
          employee_count: formData.employee_count,
          founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store authentication tokens
        localStorage.setItem('company_token', data.token);
        localStorage.setItem('company_id', data.company_id.toString());
        
        setFormData(prev => ({
          ...prev,
          isSubmitting: false,
          submitMessage: '✓ Company registered successfully! Redirecting to dashboard...',
        }));
        setTimeout(() => {
          window.location.href = '/company/dashboard';
        }, 1500);
      } else {
        const errorData = await response.json();
        setFormData(prev => ({ ...prev, isSubmitting: false, error: errorData.detail || 'Failed to register company' }));
      }
    } catch (err) {
      setFormData(prev => ({ ...prev, isSubmitting: false, error: 'Network error. Please try again.' }));
    }
  };

  const formStyle = {
    maxWidth: '800px',
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
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <section className={styles.hero}>
        <h1 className={styles.title}>Register Your Company</h1>
        <p className={styles.subtitle}>Join our hiring platform and start recruiting</p>
      </section>

      <section className={styles.section}>
        <div style={formStyle}>
          {formData.error && <div style={errorStyle}>{formData.error}</div>}
          {formData.submitMessage && <div style={successStyle}>{formData.submitMessage}</div>}

          <form onSubmit={handleSubmit}>
            <h2 style={{ color: '#1f2937', marginBottom: '24px' }}>Company Information</h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Company Name *
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your company name"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="company@example.com"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Password *
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Secure password"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
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

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Website
              </label>
              <input
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Industry
              </label>
              <input
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g., Technology, Finance, Healthcare"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Employee Count
              </label>
              <select
                name="employee_count"
                value={formData.employee_count}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select range...</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-100">51-100</option>
                <option value="101-500">101-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Founded Year
              </label>
              <input
                name="founded_year"
                type="number"
                value={formData.founded_year}
                onChange={handleChange}
                placeholder="2020"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Company Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your company..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={formData.isSubmitting}
              style={{ ...buttonStyle, opacity: formData.isSubmitting ? 0.7 : 1, cursor: formData.isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              {formData.isSubmitting ? 'Registering...' : 'Register Company'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>
            Already registered? <Link href="/company/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Login here</Link>
          </p>
        </div>
      </section>
    </>
  );
}
