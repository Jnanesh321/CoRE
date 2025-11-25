import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Check if already logged in
  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    if (!supabase) return
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      navigate('/admin/dashboard')
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    if (!supabase) {
      setError('Backend not configured. Please add Supabase credentials.')
      return
    }

    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '450px', paddingTop: '4rem' }}>
      <SEO title="Admin Login" />
      
      <div style={{
        background: 'var(--surface)',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid var(--border)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.8rem' }}>
          CoRE Admin
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem' }}>
          Login to manage website content
        </p>

        {error && (
          <div style={{
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#ef4444',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@core.vcet.in"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)',
              marginBottom: '1rem',
              fontSize: '1rem'
            }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)',
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '1rem',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? <LoadingSpinner /> : 'Login'}
          </button>
        </form>

        <p style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--muted)'
        }}>
          Contact your coordinator if you don't have access
        </p>
      </div>
    </div>
  )
}
