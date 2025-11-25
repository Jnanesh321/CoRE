import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container" style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          margin: '0',
          fontWeight: '800',
          background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          404
        </h1>
        <h2 style={{fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: '1rem 0'}}>
          Page Not Found
        </h2>
        <p style={{color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6'}}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/" className="btn primary" style={{minWidth: '160px'}}>
            Back to Home
          </Link>
          <Link to="/activities" className="btn ghost" style={{minWidth: '160px'}}>
            View Activities
          </Link>
        </div>
        
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'var(--surface)',
          borderRadius: '12px',
          border: '1px solid var(--border)'
        }}>
          <p style={{margin: '0 0 1rem', fontWeight: '600'}}>Quick Links:</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center'
          }}>
            {[
              { to: '/projects', label: 'Projects' },
              { to: '/events', label: 'Events' },
              { to: '/team', label: 'Team' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Join Us' }
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  color: 'var(--text)',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
