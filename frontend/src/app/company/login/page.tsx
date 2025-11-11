'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Home.module.css';

interface LoginFormData {
  email: string;
  password: string;
  isSubmitting: boolean;
  submitMessage: string;
  error: string;
}

export default function CompanyLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    isSubmitting: false,
    submitMessage: '',
    error: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      error: ''
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, isSubmitting: true, error: '', submitMessage: '' }));

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        setFormData(prev => ({
          ...prev,
          error: 'Please fill in all required fields',
          isSubmitting: false
        }));
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setFormData(prev => ({
          ...prev,
          error: 'Please enter a valid email address',
          isSubmitting: false
        }));
        return;
      }

      // Call login API
      const response = await fetch('http://localhost:8000/api/company-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      
      // Store token
      if (data.token) {
        localStorage.setItem('company_token', data.token);
        localStorage.setItem('company_id', data.company_id);
      }

      setFormData(prev => ({
        ...prev,
        submitMessage: 'Login successful! Redirecting to dashboard...'
      }));

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push('/company/dashboard');
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setFormData(prev => ({
        ...prev,
        error: errorMessage,
        isSubmitting: false
      }));
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '60px auto', padding: '20px' }}>
      <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
        ← Back to homepage
      </Link>

      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '10px', color: '#1f2937' }}>
        Company Login
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>
        Sign in to your company account to manage jobs and applications
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '30px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        {/* Error Message */}
        {formData.error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '0.95rem',
            border: '1px solid #fecaca'
          }}>
            {formData.error}
          </div>
        )}

        {/* Success Message */}
        {formData.submitMessage && (
          <div style={{
            backgroundColor: '#dcfce7',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '0.95rem',
            border: '1px solid #bbf7d0'
          }}>
            {formData.submitMessage}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#1f2937' }}>
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="company@example.com"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Password Field */}
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#1f2937' }}>
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formData.isSubmitting}
          style={{
            backgroundColor: '#667eea',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: formData.isSubmitting ? 'not-allowed' : 'pointer',
            opacity: formData.isSubmitting ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          {formData.isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Links */}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280', marginBottom: '10px' }}>
            Don't have an account?{' '}
            <Link href="/company/signup" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
              Sign up
            </Link>
          </p>
          <p style={{ color: '#6b7280', marginTop: '15px' }}>
            Need help?{' '}
            <Link href="/contact" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
              Contact us
            </Link>
          </p>
        </div>
      </form>

      {/* Info Section */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>
          Test Credentials
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '8px' }}>
          <strong>Email:</strong> admin@innovatetech.com
        </p>
        <p style={{ color: '#6b7280', marginBottom: '8px' }}>
          <strong>Password:</strong> SecurePass2024
        </p>
        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '12px' }}>
          Use these test credentials to access the company dashboard.
        </p>
        <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#dcfce7', borderRadius: '4px', border: '1px solid #86efac' }}>
          <p style={{ color: '#166534', fontSize: '0.9rem', margin: 0 }}>
            ✓ Or <Link href="/company/signup" style={{ color: '#166534', fontWeight: '600' }}>create your own company</Link> account to get started
          </p>
        </div>
      </div>
    </div>
  );
}
