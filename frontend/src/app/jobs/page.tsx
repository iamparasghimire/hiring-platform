'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import JobCard from '../../components/JobCard';
import styles from '../../styles/Home.module.css';
import { Job } from '../../types';

async function getAllJobs(filters: { [key: string]: string }): Promise<Job[]> {
  try {
    let url = 'http://localhost:8000/api/jobs/';
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.job_type) params.append('job_type', filters.job_type);
    if (filters.experience) params.append('experience_level', filters.experience);
    if (filters.location) params.append('location', filters.location);
    if (filters.salary_min) params.append('salary_min', filters.salary_min);
    if (filters.salary_max) params.append('salary_max', filters.salary_max);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();
    return data.results || data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

export default function AllJobsPage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    job_type: searchParams.get('job_type') || '',
    experience: searchParams.get('experience') || '',
    location: searchParams.get('location') || '',
    salary_min: searchParams.get('salary_min') || '',
    salary_max: searchParams.get('salary_max') || '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const result = await getAllJobs(filters);
      setJobs(result);
      setIsLoading(false);
    };
    
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '30px',
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  };

  const filterBoxStyle = {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  };

  const filterTitleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '12px',
    textTransform: 'uppercase' as const,
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginBottom: '8px',
    boxSizing: 'border-box' as const,
  };

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <div style={headerStyle}>
        <h1 style={{ margin: 0, color: '#1f2937' }}>All Job Openings</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div style={gridStyle}>
        {/* Sidebar Filters */}
        <aside style={sidebarStyle}>
          <div style={filterBoxStyle}>
            <div style={filterTitleStyle}>📝 Search</div>
            <input
              type="text"
              placeholder="Job title, keyword..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={filterBoxStyle}>
            <div style={filterTitleStyle}>💼 Job Type</div>
            {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map(type => (
              <label key={type} style={{ display: 'flex', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={filters.job_type === type}
                  onChange={(e) => handleFilterChange('job_type', e.target.checked ? type : '')}
                />
                <span style={{ fontSize: '14px', color: '#374151' }}>{type}</span>
              </label>
            ))}
          </div>

          <div style={filterBoxStyle}>
            <div style={filterTitleStyle}>📊 Experience Level</div>
            {['Entry', 'Mid', 'Senior'].map(level => (
              <label key={level} style={{ display: 'flex', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={filters.experience === level}
                  onChange={(e) => handleFilterChange('experience', e.target.checked ? level : '')}
                />
                <span style={{ fontSize: '14px', color: '#374151' }}>{level} Level</span>
              </label>
            ))}
          </div>

          <div style={filterBoxStyle}>
            <div style={filterTitleStyle}>📍 Location</div>
            <input
              type="text"
              placeholder="City or region..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={filterBoxStyle}>
            <div style={filterTitleStyle}>💰 Salary Range</div>
            <input
              type="number"
              placeholder="Min salary"
              value={filters.salary_min}
              onChange={(e) => handleFilterChange('salary_min', e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Max salary"
              value={filters.salary_max}
              onChange={(e) => handleFilterChange('salary_max', e.target.value)}
              style={inputStyle}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main style={mainContentStyle}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: '#6b7280' }}>Loading jobs...</p>
            </div>
          ) : jobs.length > 0 ? (
            <div className={styles.jobList}>
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
              <h2 style={{ color: '#1f2937' }}>No jobs found</h2>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>Try adjusting your search or filters</p>
              <button 
                onClick={() => setFilters({
                  search: '',
                  category: '',
                  job_type: '',
                  experience: '',
                  location: '',
                  salary_min: '',
                  salary_max: '',
                })}
                style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
