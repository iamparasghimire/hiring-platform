'use client';

import { useState, FormEvent, ChangeEvent, CSSProperties } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  isSubmitting: boolean;
  submitMessage: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    isSubmitting: false,
    submitMessage: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormData(prev => ({ ...prev, isSubmitting: true }));
    
    // Simulate email submission (in real app, this would call a backend API)
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        isSubmitting: false,
        submitMessage: '✓ Thank you for your message! We\'ll get back to you soon.',
        name: '',
        email: '',
        subject: '',
        message: '',
      }));
      
      setTimeout(() => {
        setFormData(prev => ({ ...prev, submitMessage: '' }));
      }, 5000);
    }, 1000);
  };

  const formStyle: CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const buttonStyle: CSSProperties = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const messageStyle: CSSProperties = {
    padding: '12px 16px',
    marginTop: '16px',
    borderRadius: '6px',
    textAlign: 'center',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
  };

  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <section className={styles.hero}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>Get in touch with our team</p>
      </section>

      <section className={styles.section}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#667eea', fontSize: '1.5rem' }}>📧 Email</h3>
            <p style={{ color: '#6b7280' }}>support@hiringplatform.com</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#667eea', fontSize: '1.5rem' }}>📞 Phone</h3>
            <p style={{ color: '#6b7280' }}>+1 (555) 123-4567</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#667eea', fontSize: '1.5rem' }}>📍 Address</h3>
            <p style={{ color: '#6b7280' }}>123 Business St, Tech City, TC 12345</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Send us a Message</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="subject" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              rows={5}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={formData.isSubmitting}
            style={{ ...buttonStyle, opacity: formData.isSubmitting ? 0.7 : 1, cursor: formData.isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {formData.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {formData.submitMessage && (
            <div style={messageStyle}>
              {formData.submitMessage}
            </div>
          )}
        </form>
      </section>

      <section className={styles.section}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#1f2937', marginTop: 0 }}>Q: How quickly will I get a response?</h3>
            <p style={{ color: '#6b7280' }}>A: We aim to respond to all inquiries within 24-48 hours during business days.</p>
          </div>

          <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#1f2937', marginTop: 0 }}>Q: Can companies post jobs directly?</h3>
            <p style={{ color: '#6b7280' }}>A: Yes! Companies can register and post job listings through our admin portal. <Link href="/company/signup" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Sign up here</Link>.</p>
          </div>

          <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#1f2937', marginTop: 0 }}>Q: Is there a fee to apply for jobs?</h3>
            <p style={{ color: '#6b7280' }}>A: No! Job applications are completely free for job seekers.</p>
          </div>

          <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#1f2937', marginTop: 0 }}>Q: How do I track my application status?</h3>
            <p style={{ color: '#6b7280' }}>A: Once you apply, you'll receive updates about your application status via email.</p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#e0f2fe', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h3 style={{ color: '#1f2937', marginTop: 0 }}>Q: I'm a company. How do I manage my job postings?</h3>
            <p style={{ color: '#6b7280' }}>A: As a registered company, you can access your dashboard to post jobs, track applications, and manage interviews. <Link href="/company/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Login here</Link> or <Link href="/company/signup" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>sign up</Link> if you don't have an account yet.</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f0f9ff', padding: '40px 20px', marginTop: '60px', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>For Companies</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>📋 Post Jobs</h3>
            <p style={{ color: '#6b7280' }}>Post job openings, manage applications, and track candidates in real-time from your dashboard.</p>
            <Link href="/company/signup" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Get Started →</Link>
          </div>

          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>👥 Manage Candidates</h3>
            <p style={{ color: '#6b7280' }}>Review applications, rate candidates, add notes, and schedule interviews with ease.</p>
            <Link href="/company/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Login Now →</Link>
          </div>

          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>📊 Analytics</h3>
            <p style={{ color: '#6b7280' }}>View job performance metrics, application stats, and hiring pipeline overview.</p>
            <Link href="/company/dashboard" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>View Dashboard →</Link>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Still have questions?</h2>
        <p>Our support team is here to help. Don't hesitate to reach out!</p>
        <Link href="/jobs" className={styles.ctaButton}>
          Back to Jobs
        </Link>
      </section>
    </>
  );
}
