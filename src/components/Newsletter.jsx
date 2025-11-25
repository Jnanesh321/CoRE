import React, { useState } from 'react'

// Netlify Functions base (supports local dev with netlify dev)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setStatus({ ok: false, msg: 'Please enter a valid email address' })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch(`${API_BASE_URL}/newsletter-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email })
      })
      const json = await res.json()

      if (res.ok && json.success) {
        setStatus({ ok: true, msg: 'Thank you! You\'ve been subscribed to our newsletter.' })
        setEmail('')
      } else {
        setStatus({ ok: false, msg: json.message || 'Subscription failed. Please try again.' })
      }
    } catch (err) {
      console.error('Newsletter subscribe error:', err)
      setStatus({ ok: false, msg: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      padding: '2.5rem',
      background: 'var(--surface)',
      borderRadius: '16px',
      boxShadow: 'var(--card-shadow)',
      border: '1px solid var(--border)',
      textAlign: 'center'
    }}>
      <h3 style={{marginBottom: '0.75rem', fontSize: '1.5rem'}}>Stay Updated</h3>
      <p style={{color: 'var(--muted)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem'}}>
        Get the latest news, events, and project updates from CoRE delivered to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} style={{maxWidth: '450px', margin: '0 auto'}}>
        <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            disabled={loading}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '0.75rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            className="btn primary"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: '14px',
                  height: '14px',
                  border: '2px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite'
                }} />
                Subscribing...
              </>
            ) : 'Subscribe'}
          </button>
        </div>
      </form>

      {status && (
        <p style={{
          marginTop: '1rem',
          padding: '0.75rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          background: status.ok ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: status.ok ? '#10b981' : '#ef4444',
          border: `1px solid ${status.ok ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
          {status.msg}
        </p>
      )}

      <p style={{fontSize: '0.85rem', color: 'var(--muted)', marginTop: '1rem'}}>
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  )
}
