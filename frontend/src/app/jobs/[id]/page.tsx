// FILE: app/jobs/[id]/page.tsx

"use client";

import { getJobById, getSimilarJobs, handleApiError } from '../../../services/api';
import Link from 'next/link';
import JobCard from '../../../components/JobCard';
import ApplicationForm from '../../../components/ApplicationForm';
import { useState, useEffect } from 'react';
import { Job } from '../../../types';
import styles from '../../../styles/Home.module.css';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;
  
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJobData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch the main job details
        const jobRes = await getJobById(id);
        const fetchedJob = jobRes.data;
        setJob(fetchedJob);

        // Fetch similar jobs
        try {
          const similarJobsRes = await getSimilarJobs(id);
          const filteredSimilar = Array.isArray(similarJobsRes.data) 
            ? similarJobsRes.data.slice(0, 3)
            : [];
          setSimilarJobs(filteredSimilar);
        } catch (err) {
          console.error("Failed to fetch similar jobs:", err);
        }
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        setError(handleApiError(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div>
        <p style={{ color: '#ef4444', fontSize: '1.1rem', textAlign: 'center', padding: '40px 20px' }}>
          {error || 'Job not found.'}
        </p>
        <Link href="/" className={styles.backLink}>
          ← Back to homepage
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← Back to homepage
      </Link>

      <article>
        <div style={{ marginBottom: '40px' }}>
          <h1 className={styles.title}>{job.title}</h1>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div>
              <strong style={{ color: '#6b7280' }}>Company:</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: '1.1rem', color: '#1f2937' }}>{job.company?.name || 'Unknown'}</p>
            </div>
            <div>
              <strong style={{ color: '#6b7280' }}>Location:</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: '1.1rem', color: '#1f2937' }}>{job.location}</p>
            </div>
            <div>
              <strong style={{ color: '#6b7280' }}>Job Type:</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: '1.1rem', color: '#1f2937' }}>{job.job_type}</p>
            </div>
            {job.salary_min && (
              <div>
                <strong style={{ color: '#6b7280' }}>Salary:</strong>
                <p style={{ margin: '8px 0 0 0', fontSize: '1.1rem', color: '#1f2937' }}>
                  ${job.salary_min.toLocaleString()}
                  {job.salary_max && ` - $${job.salary_max.toLocaleString()}`}
                </p>
              </div>
            )}
          </div>

          <p style={{ marginTop: '16px', color: '#6b7280' }}>
            <strong>Category:</strong>{' '}
            {job.category ? (
              <Link href={`/category/${job.category.id}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                {job.category.name}
              </Link>
            ) : (
              <span>Uncategorized</span>
            )}
          </p>

          <p style={{ marginTop: '16px', color: '#6b7280' }}>
            Posted on {formatDate(job.created_at)}
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
            Job Description
          </h2>
          <p style={{ lineHeight: '1.8', color: '#4b5563', whiteSpace: 'pre-wrap' }}>
            {job.description}
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
            Requirements
          </h2>
          <p style={{ lineHeight: '1.8', color: '#4b5563', whiteSpace: 'pre-wrap' }}>
            {job.requirements}
          </p>
        </div>
      </article>

      {/* Application Form Section */}
      <section style={{ maxWidth: '800px', margin: '40px auto' }}>
        <ApplicationForm jobId={job.id} jobTitle={job.title} />
      </section>

      {/* Similar Jobs Section */}
      {similarJobs.length > 0 && (
        <section className={styles.section}>
          <h2>Similar Job Openings</h2>
          <div className={styles.jobList}>
            {similarJobs.map((similarJob) => (
              <JobCard key={similarJob.id} job={similarJob} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}