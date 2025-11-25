import React from 'react'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props 
}) {
  const sizeStyles = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem'
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem'
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.125rem'
    }
  }

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: '8px',
    fontWeight: '600',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles[size]
  }

  const variantClasses = {
    primary: 'btn primary',
    ghost: 'btn ghost',
    secondary: 'btn'
  }

  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${className}`}
      style={{ ...baseStyles, ...style }}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite'
        }} />
      )}
      {icon && !loading && icon}
      {children}
    </button>
  )
}
