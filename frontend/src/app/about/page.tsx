'use client';

import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function AboutPage() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <section className={styles.hero}>
        <h1 className={styles.title}>About Our Hiring Platform</h1>
        <p className={styles.subtitle}>Connecting talented professionals with great opportunities</p>
      </section>

      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563', maxWidth: '800px' }}>
          We're committed to revolutionizing the hiring process by creating a seamless platform 
          where job seekers can find meaningful employment and companies can discover top talent. 
          Our platform makes it easy to browse jobs by category, submit applications with CVs, 
          and manage the entire hiring workflow efficiently.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>📋 Easy Job Browsing</h3>
            <p>Browse thousands of job listings organized by category. Find exactly what you're looking for with our intuitive search and filtering.</p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>📤 Simple Application</h3>
            <p>Submit your CV and cover letter directly through our platform. Get instant confirmation of your application.</p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>🏢 Company Dashboard</h3>
            <p>Companies can manage job postings, track applications, and organize candidate information all in one place.</p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>🔍 Advanced Search</h3>
            <p>Filter jobs by category, job type, location, and salary. Find the perfect match with our powerful search tools.</p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>📊 Application Tracking</h3>
            <p>Track the status of your applications in real-time. Know exactly where you stand in the hiring process.</p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginTop: 0 }}>💼 Professional Platform</h3>
            <p>A modern, secure platform built with latest technology for a professional hiring experience.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>How It Works</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'flex-start' }}>
            <div style={{ 
              flex: '0 0 50px', 
              width: '50px', 
              height: '50px', 
              backgroundColor: '#667eea', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>1</div>
            <div>
              <h3 style={{ marginTop: 0 }}>Browse Jobs</h3>
              <p>Explore job listings by category or use our search feature to find positions that match your skills.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'flex-start' }}>
            <div style={{ 
              flex: '0 0 50px', 
              width: '50px', 
              height: '50px', 
              backgroundColor: '#667eea', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>2</div>
            <div>
              <h3 style={{ marginTop: 0 }}>View Details</h3>
              <p>Click on a job to see the full description, requirements, salary, and company information.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'flex-start' }}>
            <div style={{ 
              flex: '0 0 50px', 
              width: '50px', 
              height: '50px', 
              backgroundColor: '#667eea', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>3</div>
            <div>
              <h3 style={{ marginTop: 0 }}>Apply Now</h3>
              <p>Submit your CV, add your contact information, and include a cover letter if you wish.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ 
              flex: '0 0 50px', 
              width: '50px', 
              height: '50px', 
              backgroundColor: '#667eea', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>4</div>
            <div>
              <h3 style={{ marginTop: 0 }}>Get Hired</h3>
              <p>Companies will review your application and contact you directly about the next steps.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Find Your Next Opportunity?</h2>
        <p>Start browsing jobs today and take the next step in your career.</p>
        <Link href="/jobs" className={styles.ctaButton}>
          Browse All Jobs
        </Link>
      </section>
    </>
  );
}
