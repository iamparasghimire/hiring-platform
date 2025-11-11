// FILE: app/layout.tsx

// We import our global styles here
import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hiring Platform',
  description: 'Find your next job',
};

// Add type for the 'children' prop
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
  };

  const navContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
    textDecoration: 'none',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#6b7280',
    fontWeight: '500' as const,
    transition: 'color 0.2s',
  };

  return (
    <html lang="en">
      <body>
        <nav style={navStyle}>
          <div style={navContainerStyle}>
            <Link href="/" style={logoStyle}>
              💼 HiringHub
            </Link>
            <div style={navLinksStyle}>
              <Link href="/jobs" style={linkStyle}>
                Jobs
              </Link>
              <Link href="/about" style={linkStyle}>
                About
              </Link>
              <Link href="/contact" style={linkStyle}>
                Contact
              </Link>
            <div style={{ borderLeft: '1px solid #d1d5db', paddingLeft: '20px', marginLeft: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Link href="/company/login" style={{ ...linkStyle, color: '#667eea', fontWeight: '600' }}>
                  Company Login
                </Link>
                <Link href="/company/signup" style={{ ...linkStyle, backgroundColor: '#667eea', color: 'white', padding: '8px 16px', borderRadius: '6px' }}>
                  For Companies
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* We apply our main layout styles here */}
        <div className={styles.container}>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}