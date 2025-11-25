import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            padding: '2rem',
            borderRadius: '12px',
            background: 'var(--surface)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border)'
          }}>
            <h1 style={{fontSize: '3rem', margin: '0 0 1rem'}}>⚠️</h1>
            <h2 style={{margin: '0 0 1rem', fontSize: '1.5rem'}}>Something went wrong</h2>
            <p style={{color: 'var(--muted)', marginBottom: '1.5rem'}}>
              We encountered an unexpected error. Please refresh the page or go back to home.
            </p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button 
                className="btn primary" 
                onClick={() => window.location.href = '/'}
                style={{minWidth: '140px'}}
              >
                Go to Home
              </button>
              <button 
                className="btn ghost" 
                onClick={() => window.location.reload()}
                style={{minWidth: '140px'}}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
