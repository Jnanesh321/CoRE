import React, { useState } from 'react'
import SEO from '../components/SEO'
import ProjectModal from '../components/ProjectModal'
import useScrollReveal from '../hooks/useScrollReveal'
import { projects as projectsData } from '../data/projectsData'

export default function Projects(){
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  
  // Use intersection observer for scroll animations
  useScrollReveal()

  // Lightweight search and filter
  const filteredProjects = projectsData.filter(p => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter
    const matchesSearch = !searchTerm || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  return (
    <div className="container">
      <SEO 
        title="Our Projects" 
        description="Browse CoRE's student projects including Autonomous Rover, Smart Home Dashboard, AI Image Classifier, and more. Open-source projects built by VCET students."
      />
      
      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
      
      <h1 className="reveal" style={{textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem'}}>Our Projects</h1>
      <p className="muted reveal" style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.1rem'}}>
        Open-source student projects built by CoRE members. Browse our portfolio and contribute to projects that interest you.
      </p>
      
      {/* Search and Filter Bar */}
      <div className="reveal" style={{
        maxWidth: '900px',
        margin: '0 auto 2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        padding: '1.5rem',
        background: 'var(--surface)',
        borderRadius: '12px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid var(--border)'
      }}>
        <input
          type="search"
          placeholder="Search projects by name, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            minWidth: '250px',
            padding: '0.75rem 1rem',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontSize: '0.95rem'
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="In Progress">In Progress</option>
          <option value="Planning">Planning</option>
        </select>
        {(searchTerm || statusFilter !== 'All') && (
          <button
            onClick={() => {setSearchTerm(''); setStatusFilter('All')}}
            className="btn ghost"
            style={{padding: '0.75rem 1.5rem', fontSize: '0.9rem'}}
          >
            Clear
          </button>
        )}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{textAlign: 'center', padding: '3rem', color: 'var(--muted)'}}>
          <p style={{fontSize: '1.1rem'}}>No projects found matching your criteria.</p>
          <button onClick={() => {setSearchTerm(''); setStatusFilter('All')}} className="btn ghost" style={{marginTop: '1rem'}}>
            Clear Filters
          </button>
        </div>
      )}
      
      <div className="cards reveal" data-stagger="80" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'}}>
        {filteredProjects.map(p => (
          <article key={p.id} className="card tilt reveal" data-reveal-child style={{position: 'relative', padding: '2rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
              <h3 style={{margin: 0, fontSize: '1.4rem'}}>{p.title}</h3>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: p.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : p.status === 'In Progress' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(156, 163, 175, 0.15)',
                color: p.status === 'Active' ? '#10b981' : p.status === 'In Progress' ? '#3b82f6' : '#9ca3af'
              }}>
                {p.status}
              </span>
            </div>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem'}}>
              {p.tags.map((tag, i) => (
                <span key={i} style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)'
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <p style={{marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text)'}}>{p.desc}</p>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)'}}>
                <span style={{fontSize: '0.85rem', color: 'var(--muted)'}}>
                  {p.contributors} contributors
              </span>
            </div>
            <div style={{display: 'flex', gap: '0.75rem', marginTop: '1rem'}}>
              <button 
                className="btn primary" 
                onClick={() => setSelectedProject(p)}
                style={{flex: 1, textAlign: 'center', cursor: 'pointer'}}
              >
                View Details
              </button>
              {p.github && (
                <a 
                  className="btn ghost" 
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{flex: 1, textAlign: 'center'}}
                >
                  GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <section className="reveal" style={{marginTop: '4rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', textAlign: 'center', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '1rem'}}>Have a Project Idea?</h2>
        <p style={{maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '1.05rem', color: 'var(--muted)'}}>
          Want to start a new project or collaborate on an existing one? Join CoRE and bring your ideas to life with the support of our community.
        </p>
        <a className="btn primary" href="/contact" style={{padding: '0.85rem 2rem', fontSize: '1.05rem'}}>Join CoRE →</a>
      </section>
    </div>
  )
}
