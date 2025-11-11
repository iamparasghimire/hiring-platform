// FILE: components/JobCard.tsx

import Link from 'next/link';
import styles from './JobCard.module.css';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  if (!job) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{job.title}</h3>
        <span className={styles.jobType}>{job.job_type}</span>
      </div>

      <div className={styles.meta}>
        <p className={styles.company}>
          <strong>Company:</strong> {job.company?.name || 'Unknown'}
        </p>
        <p className={styles.location}>
          <strong>Location:</strong> {job.location}
        </p>
        {job.salary_min && (
          <p className={styles.salary}>
            <strong>Salary:</strong> ${job.salary_min.toLocaleString()}
            {job.salary_max && ` - $${job.salary_max.toLocaleString()}`}
          </p>
        )}
      </div>

      <p className={styles.category}>
        Category: <strong>{job.category?.name || 'Uncategorized'}</strong>
      </p>

      <p className={styles.description}>
        {job.description.substring(0, 150)}
        {job.description.length > 150 ? '...' : ''}
      </p>

      <div className={styles.footer}>
        <span className={styles.date}>
          Posted {formatDate(job.created_at)}
        </span>
        <Link href={`/jobs/${job.id}`} className={styles.link}>
          View Details →
        </Link>
      </div>
    </div>
  );
}