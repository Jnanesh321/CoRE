import React from 'react'
import Icon from './Icon'

export default function BackendStatusBanner({ isOffline }) {
  if (!isOffline) return null

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white',
      padding: '0.75rem 1rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Icon name="alert-triangle" size={18} />
      <span>Backend Offline - Showing cached data</span>
    </div>
  )
}
