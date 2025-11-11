'use client';

import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function NotFound() {
  const containerStyle = {
    textAlign: 'center' as const,
    padding: '80px 20px',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const codeStyle = {
    fontSize: '120px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '40px',
    maxWidth: '500px',
  };

  const linkStyle = {
    display: 'inline-block',
    padding: '12px 30px',
    margin: '8px',
    backgroundColor: '#667eea',
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600' as const,
    transition: 'all 0.2s',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={codeStyle}>404</div>
      <h1 style={titleStyle}>Page Not Found</h1>
      <p style={descriptionStyle}>
        Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
      </p>

      <div style={{ marginBottom: '40px' }}>
        <Link 
          href="/" 
          style={linkStyle}
        >
          ← Back to Home
        </Link>
        <Link 
          href="/jobs" 
          style={linkStyle}
        >
          Browse Jobs →
        </Link>
      </div>

      <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
        <p>Error Code: 404</p>
        <p>Status: Not Found</p>
      </div>
    </div>
  );
}
