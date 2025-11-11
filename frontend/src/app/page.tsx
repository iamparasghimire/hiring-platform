// FILE: app/page.tsx

import { getJobs, getCategories, getRecentJobs } from '../services/api';
import Link from 'next/link';
import JobCard from '../components/JobCard';
import styles from '../styles/Home.module.css';
import { Job, JobCategory } from '../types';

interface PageData {
  categories: JobCategory[];
  recentJobs: Job[];
}

async function getPageData(): Promise<PageData> {
  try {
    const [categoriesRes, jobsRes] = await Promise.all([
      getCategories(),
      getRecentJobs(),
    ]);
    return {
      categories: Array.isArray(categoriesRes.data) ? categoriesRes.data : [],
      recentJobs: Array.isArray(jobsRes.data) ? jobsRes.data : [],
    };
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return { categories: [], recentJobs: [] };
  }
}

export default async function HomePage() {
  const { categories, recentJobs } = await getPageData();

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to Hiring Platform</h1>
        <p className={styles.subtitle}>Find your dream job or hire top talent</p>
      </section>

      <section className={styles.section}>
        <h2>Browse by Category</h2>
        {categories.length > 0 ? (
          <div className={styles.grid}>
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`} 
                className={styles.card}
              >
                <div className={styles.categoryIcon}>
                  {category.icon || '💼'}
                </div>
                <div className={styles.categoryName}>{category.name}</div>
                <div className={styles.jobsCount}>
                  {category.jobs_count} open {category.jobs_count === 1 ? 'job' : 'jobs'}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.noData}>No categories available yet.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2>Recent Job Postings</h2>
        {recentJobs.length > 0 ? (
          <div className={styles.jobList}>
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className={styles.noData}>No jobs posted yet. Check back soon!</p>
        )}
      </section>

      <section className={styles.cta}>
        <h2>Ready to Get Started?</h2>
        <p>Browse our job listings and apply for positions that match your skills.</p>
        <Link href="/jobs" className={styles.ctaButton}>
          View All Jobs
        </Link>
      </section>
    </>
  );
}