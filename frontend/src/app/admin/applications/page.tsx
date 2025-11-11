'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';
import { api } from '@/services/api';
import { Application } from '@/types';

interface ApplicationWithJobTitle extends Application {
  jobTitle?: string;
}

const statusColors: { [key: string]: { bg: string; text: string } } = {
  'submitted': { bg: '#fef3c7', text: '#92400e' },
  'reviewing': { bg: '#dbeafe', text: '#1e3a8a' },
  'interview': { bg: '#ede9fe', text: '#4c1d95' },
  'accepted': { bg: '#dcfce7', text: '#166534' },
  'rejected': { bg: '#fee2e2', text: '#991b1b' },
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationWithJobTitle[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationWithJobTitle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/applications/');
        const data = response.data;
        // Handle both array and paginated response formats
        const appList = Array.isArray(data) ? data : (data.results || []);
        setApplications(appList);
        setFilteredApplications(appList);
      } catch (err) {
        setError('Failed to load applications');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }

    // Filter by search term (name or email)
    if (searchTerm) {
      filtered = filtered.filter(
        app =>
          app.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.candidate_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [applications, filterStatus, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap' as const,
    gap: '20px',
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };

  const statCardStyle = {
    backgroundColor: '#f3f4f6',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center' as const,
  };

  const statNumberStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#667eea',
  };

  const filterContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap' as const,
  };

  const selectStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  const searchStyle = {
    flex: 1,
    minWidth: '200px',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
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

  const statusBadgeStyle = (status: string) => {
    const colors = statusColors[status] || { bg: '#e5e7eb', text: '#374151' };
    return {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600' as const,
      backgroundColor: colors.bg,
      color: colors.text,
    };
  };

  const actionButtonStyle = {
    padding: '6px 12px',
    marginRight: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600' as const,
  };

  const downloadButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#667eea',
    color: 'white',
  };

  const viewButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#e5e7eb',
    color: '#374151',
  };

  const emptyStateStyle = {
    textAlign: 'center' as const,
    padding: '60px 20px',
    color: '#6b7280',
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '18px', color: '#6b7280' }}>Loading applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          backgroundColor: '#fee2e2', 
          color: '#991b1b', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>

      <div style={{ backgroundColor: '#fef08a', border: '1px solid #fcd34d', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', color: '#92400e' }}>
        🔐 <strong>Admin Only</strong> - This page is for administrators only
      </div>

      <div style={headerStyle}>
        <h1 style={{ margin: 0, color: '#1f2937' }}>Job Applications (Admin)</h1>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Total: {applications.length} applications
        </div>
      </div>

      <div style={statsStyle}>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>{applications.length}</div>
          <div style={{ color: '#6b7280', marginTop: '8px' }}>Total</div>
        </div>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>
            {applications.filter(a => a.status === 'submitted').length}
          </div>
          <div style={{ color: '#6b7280', marginTop: '8px' }}>Submitted</div>
        </div>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>
            {applications.filter(a => a.status === 'accepted').length}
          </div>
          <div style={{ color: '#6b7280', marginTop: '8px' }}>Accepted</div>
        </div>
        <div style={statCardStyle}>
          <div style={statNumberStyle}>
            {applications.filter(a => a.status === 'rejected').length}
          </div>
          <div style={{ color: '#6b7280', marginTop: '8px' }}>Rejected</div>
        </div>
      </div>

      <div style={filterContainerStyle}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="reviewing">Reviewing</option>
          <option value="interview">Interview</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchStyle}
        />
      </div>

      {filteredApplications.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
          <h2>No applications found</h2>
          <p>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Candidate Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Applied On</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>
                      {app.candidate_name}
                    </div>
                  </td>
                  <td style={tdStyle}>{app.candidate_email}</td>
                  <td style={tdStyle}>
                    <div style={statusBadgeStyle(app.status)}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    {formatDate(app.submitted_at)}
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={downloadButtonStyle}
                      onClick={() => {
                        if (app.cv) {
                          window.open(`http://localhost:8000${app.cv}`, '_blank');
                        }
                      }}
                    >
                      📥 CV
                    </button>
                    <button style={viewButtonStyle}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
