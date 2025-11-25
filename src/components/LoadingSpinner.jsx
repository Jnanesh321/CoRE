import React from 'react'

export default function LoadingSpinner({ fullPage = false }) {
  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid var(--border)',
    borderTop: '4px solid var(--brand-primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  }

  const containerStyle = fullPage ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem'
  } : {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem'
  }

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} role="status" aria-label="Loading"></div>
      {fullPage && <p className="muted">Loading...</p>}
    </div>
  )
}
