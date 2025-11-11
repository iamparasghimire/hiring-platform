'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Home.module.css';

interface CompanyJob {
  id: number;
  title: string;
  location: string;
  job_type: string;
  status: string;
  applications_count: number;
  views_count: number;
  created_at: string;
}

interface DashboardStats {
  total_jobs: number;
  active_jobs: number;
  total_applications: number;
  pending_applications: number;
  jobs: CompanyJob[];
}

export default function CompanyDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    total_jobs: 0,
    active_jobs: 0,
    total_applications: 0,
    pending_applications: 0,
    jobs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyId, setCompanyId] = useState<number | null>(null);

  useEffect(() => {
    // Check if company is logged in
    const storedCompanyId = localStorage.getItem('company_id');
    if (!storedCompanyId) {
      router.push('/company/login');
      return;
    }
    
    setCompanyId(parseInt(storedCompanyId));
  }, [router]);

  useEffect(() => {
    if (!companyId) return;

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch company jobs from API
        const response = await fetch(`http://localhost:8000/api/companies/${companyId}/jobs/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const jobsData = await response.json();
        const jobs = jobsData.results || jobsData;
        
        // Calculate statistics
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter((job: any) => job.status === 'open').length;
        const totalApplications = jobs.reduce((sum: number, job: any) => sum + (job.applications_count || 0), 0);
        
        setStats({
          total_jobs: totalJobs,
          active_jobs: activeJobs,
          total_applications: totalApplications,
          pending_applications: Math.max(0, totalApplications - 10), // Placeholder calculation
          jobs: jobs.slice(0, 10), // Show last 10 jobs
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [companyId]);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  };

  const statCardStyle = {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  };

  const statNumberStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#667eea',
  };

  const statLabelStyle = {
    color: '#6b7280',
    marginTop: '8px',
    fontSize: '14px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const thStyle = {
    padding: '16px',
    textAlign: 'left' as const,
    fontWeight: '600',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    color: '#374151',
  };

  const tdStyle = {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    color: '#6b7280',
  };

  const buttonStyle = {
    padding: '10px 16px',
    marginRight: '8px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600' as const,
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#667eea',
    color: 'white',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e5e7eb',
    color: '#374151',
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '20px', borderRadius: '8px' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>

      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, color: '#1f2937' }}>Company Dashboard</h1>
          <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>Manage your jobs and applications</p>
        </div>
        <Link href="/company/jobs/post" style={primaryButtonStyle}>
          + Post New Job
        </Link>
      </div>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{stats.total_jobs}</div>
          <div style={statLabelStyle}>Total Jobs</div>
        </div>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{stats.active_jobs}</div>
          <div style={statLabelStyle}>Active Jobs</div>
        </div>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{stats.total_applications}</div>
          <div style={statLabelStyle}>Total Applications</div>
        </div>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{stats.pending_applications}</div>
          <div style={statLabelStyle}>Pending Review</div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>Your Job Postings</h2>
        
        {stats.jobs.length === 0 ? (
          <div style={{ 
            backgroundColor: '#f0f9ff', 
            padding: '40px 30px', 
            borderRadius: '8px', 
            textAlign: 'center',
            border: '2px dashed #bfdbfe'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
            <h3 style={{ color: '#1f2937', marginBottom: '10px' }}>No Jobs Posted Yet</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              You haven't posted any jobs yet. Start posting to reach qualified candidates!
            </p>
            <Link href="/company/jobs/post" style={primaryButtonStyle}>
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Job Title</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Applications</th>
                  <th style={thStyle}>Views</th>
                  <th style={thStyle}>Posted</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.jobs.map((job) => (
                  <tr key={job.id}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{job.title}</div>
                    </td>
                    <td style={tdStyle}>{job.location}</td>
                    <td style={tdStyle}>
                      <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        {job.job_type}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        {job.status === 'open' ? 'Active' : job.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontWeight: '600', color: '#667eea' }}>{job.applications_count}</span>
                    </td>
                    <td style={tdStyle}>{job.views_count}</td>
                    <td style={tdStyle}>{new Date(job.created_at).toLocaleDateString()}</td>
                    <td style={tdStyle}>
                      <Link href={`/jobs/${job.id}`} style={{ ...secondaryButtonStyle, marginRight: '8px', textDecoration: 'none', display: 'inline-block' }}>
                        View
                      </Link>
                      <button style={secondaryButtonStyle} onClick={() => alert('Edit feature coming soon!')}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: '#f9fafb', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
        <h3 style={{ color: '#1f2937', marginBottom: '10px' }}>Ready to post a new job?</h3>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          Reach thousands of job seekers on our platform
        </p>
        <Link href="/company/jobs/post" style={primaryButtonStyle}>
          Post Your First Job
        </Link>
      </div>
    </div>
  );
}
