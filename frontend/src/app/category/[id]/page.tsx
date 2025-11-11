// FILE: app/category/[id]/page.tsx

import { getCategoryById, getJobsByCategoryId } from '../../../services/api';
import JobCard from '../../../components/JobCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Job, JobCategory } from '../../../types';
import { Metadata } from 'next';
import styles from '../../../styles/Home.module.css';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

interface CategoryData {
  category: JobCategory;
  jobs: Job[];
}

async function getCategoryData(id: string): Promise<CategoryData> {
  try {
    const [categoryRes, jobsRes] = await Promise.all([
      getCategoryById(id),
      getJobsByCategoryId(id),
    ]);
    return {
      category: categoryRes.data,
      jobs: Array.isArray(jobsRes.data) ? jobsRes.data : [],
    };
  } catch (error) {
    console.error(`Failed to fetch data for category ${id}:`, error);
    notFound();
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const { category } = await getCategoryData(params.id);
    return {
      title: `Jobs in ${category.name} - Hiring Platform`,
    };
  } catch (error) {
    return {
      title: 'Category not found'
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, jobs } = await getCategoryData(params.id);

  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>
      
      <h1 className={styles.title}>
        {category.icon && <span>{category.icon}</span>} Jobs in {category.name}
      </h1>

      {category.description && (
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
          {category.description}
        </p>
      )}

      <section className={styles.section}>
        {jobs.length > 0 ? (
          <div className={styles.jobList}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className={styles.noData}>There are currently no jobs listed in this category.</p>
        )}
      </section>
    </>
  );
}