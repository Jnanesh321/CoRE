import React from 'react'

export default function Card({ 
  children, 
  variant = 'default', 
  hover = false,
  className = '',
  style = {},
  ...props 
}) {
  const baseStyles = {
    padding: '1.5rem',
    borderRadius: '12px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--card-shadow)',
    transition: 'all 0.3s ease'
  }

  const variantStyles = {
    default: {},
    elevated: {
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    flat: {
      boxShadow: 'none',
      border: 'none'
    },
    outlined: {
      boxShadow: 'none',
      border: '2px solid var(--border)'
    }
  }

  const hoverStyles = hover ? {
    cursor: 'pointer'
  } : {}

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...hoverStyles,
    ...style
  }

  const handleMouseEnter = (e) => {
    if (hover) {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
    }
  }

  const handleMouseLeave = (e) => {
    if (hover) {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = combinedStyles.boxShadow
    }
  }

  return (
    <div
      className={`card ${className}`}
      style={combinedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}
