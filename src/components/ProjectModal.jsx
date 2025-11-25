import React, { useEffect } from 'react'
import Icon from './Icon'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          borderRadius: '16px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.3s ease'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--brand-primary)'
            e.target.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--bg)'
            e.target.style.color = 'var(--text)'
          }}
        >
          <Icon name="x" size={20} />
        </button>

        <div style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>{project.title}</h2>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                background: project.status === 'Completed' 
                  ? 'var(--success-bg)' 
                  : 'var(--info-bg)',
                color: project.status === 'Completed' 
                  ? 'var(--success)' 
                  : 'var(--info)'
              }}>
                {project.status}
              </span>
            </div>
            
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {project.tags.map((tag, i) => (
                <span key={i} style={{
                  padding: '0.4rem 0.8rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              About This Project
            </h3>
            <p style={{ lineHeight: '1.7', color: 'var(--muted)' }}>
              {project.desc}
            </p>
          </div>

          {/* Team */}
          {project.team && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Team
              </h3>
              <p style={{ lineHeight: '1.7', color: 'var(--muted)' }}>
                {project.team}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Tech Stack
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.techStack.map((tech, i) => (
                  <span key={i} style={{
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--bg)',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--brand-primary)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                <Icon name="github" size={20} />
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--brand-primary)',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <Icon name="external-link" size={20} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
