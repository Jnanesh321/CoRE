import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { 
  getSiteConfig, 
  getCoordinators, 
  getTeamMembers,
  updateSiteConfig,
  upsertCoordinator,
  upsertTeamMember,
  deleteCoordinator,
  deleteTeamMember
} from '../lib/cmsApi'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'
import Icon from '../components/Icon'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('counters')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // Data states
  const [config, setConfig] = useState({})
  const [coordinators, setCoordinators] = useState([])
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    if (!supabase) {
      navigate('/admin/login')
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    } else {
      setUser(session.user)
      loadAllData()
    }
  }

  async function loadAllData() {
    setLoading(true)
    const [configRes, coordRes, teamRes] = await Promise.all([
      getSiteConfig(),
      getCoordinators(),
      getTeamMembers()
    ])
    
    setConfig(configRes.data)
    setCoordinators(coordRes.data)
    setTeamMembers(teamRes.data)
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  async function handleSaveConfig(key, value) {
    setSaving(true)
    const { error } = await updateSiteConfig(key, value, user)
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('✓ Saved successfully!')
      setConfig({ ...config, [key]: value })
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  async function handleSaveCoordinator(coordinator) {
    setSaving(true)
    const { error } = await upsertCoordinator(coordinator)
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('✓ Coordinator saved!')
      loadAllData()
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  async function handleDeleteCoordinator(id) {
    if (!confirm('Remove this coordinator?')) return
    setSaving(true)
    const { error } = await deleteCoordinator(id)
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('✓ Coordinator removed!')
      loadAllData()
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) return <LoadingSpinner fullPage />

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingTop: '2rem', paddingBottom: '3rem' }}>
      <SEO title="Admin Dashboard" />
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--muted)' }}>Logged in as {user?.email}</p>
        </div>
        <button onClick={handleLogout} className="btn ghost">
          Logout
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div style={{
          padding: '1rem',
          background: message.startsWith('✓') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${message.startsWith('✓') ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: '8px',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '2px solid var(--border)',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {['counters', 'hero', 'coordinators', 'team'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === tab ? 'var(--brand-primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text)',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Panels */}
      {activeTab === 'counters' && (
        <CountersPanel config={config} onSave={handleSaveConfig} saving={saving} />
      )}
      {activeTab === 'hero' && (
        <HeroPanel config={config} onSave={handleSaveConfig} saving={saving} />
      )}
      {activeTab === 'coordinators' && (
        <CoordinatorsPanel 
          coordinators={coordinators} 
          onSave={handleSaveCoordinator}
          onDelete={handleDeleteCoordinator}
          saving={saving}
        />
      )}
      {activeTab === 'team' && (
        <TeamPanel 
          members={teamMembers}
          onSave={(member) => upsertTeamMember(member).then(() => loadAllData())}
          onDelete={(id) => deleteTeamMember(id).then(() => loadAllData())}
          saving={saving}
        />
      )}
    </div>
  )
}

// Counters Panel Component
function CountersPanel({ config, onSave, saving }) {
  const [members, setMembers] = useState(config.members_count || '120')
  const [events, setEvents] = useState(config.events_count || '25')
  const [projects, setProjects] = useState(config.projects_count || '45')

  return (
    <div style={{
      background: 'var(--surface)',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid var(--border)'
    }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Homepage Counters</h2>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            Members Count
          </label>
          <input
            type="number"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)'
            }}
          />
          <button
            onClick={() => onSave('members_count', members)}
            disabled={saving}
            className="btn primary"
            style={{ marginTop: '0.75rem' }}
          >
            Save
          </button>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            Events Count
          </label>
          <input
            type="number"
            value={events}
            onChange={(e) => setEvents(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)'
            }}
          />
          <button
            onClick={() => onSave('events_count', events)}
            disabled={saving}
            className="btn primary"
            style={{ marginTop: '0.75rem' }}
          >
            Save
          </button>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            Projects Count
          </label>
          <input
            type="number"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)'
            }}
          />
          <button
            onClick={() => onSave('projects_count', projects)}
            disabled={saving}
            className="btn primary"
            style={{ marginTop: '0.75rem' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// Hero Panel Component
function HeroPanel({ config, onSave, saving }) {
  const [title, setTitle] = useState(config.hero_title || '')
  const [subtitle, setSubtitle] = useState(config.hero_subtitle || '')

  return (
    <div style={{
      background: 'var(--surface)',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid var(--border)'
    }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Hero Section</h2>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            Hero Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The Future of Tech Starts Here"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)'
            }}
          />
          <button
            onClick={() => onSave('hero_title', title)}
            disabled={saving}
            className="btn primary"
            style={{ marginTop: '0.75rem' }}
          >
            Save Title
          </button>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            Hero Subtitle
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={3}
            placeholder="Join CoRE and build..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <button
            onClick={() => onSave('hero_subtitle', subtitle)}
            disabled={saving}
            className="btn primary"
            style={{ marginTop: '0.75rem' }}
          >
            Save Subtitle
          </button>
        </div>
      </div>
    </div>
  )
}

// Coordinators Panel Component
function CoordinatorsPanel({ coordinators, onSave, onDelete, saving }) {
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', title: '', email: '' })

  function handleEdit(coord) {
    setEditingId(coord.id)
    setFormData({ name: coord.name, title: coord.title, email: coord.email || '' })
  }

  function handleCancel() {
    setEditingId(null)
    setFormData({ name: '', title: '', email: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...formData, id: editingId || undefined })
    handleCancel()
  }

  return (
    <div style={{
      background: 'var(--surface)',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid var(--border)'
    }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Coordinators</h2>
      
      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} style={{
        padding: '1.5rem',
        background: 'var(--bg)',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          {editingId ? 'Edit Coordinator' : 'Add New Coordinator'}
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--surface)',
              color: 'var(--text)'
            }}
          />
          <input
            type="text"
            placeholder="Title (e.g., Faculty Coordinator, President)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--surface)',
              color: 'var(--text)'
            }}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--surface)',
              color: 'var(--text)'
            }}
          />
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" disabled={saving} className="btn primary">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn ghost">
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Coordinators List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {coordinators.map(coord => (
          <div
            key={coord.id}
            style={{
              padding: '1rem',
              background: 'var(--bg)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{coord.name}</h4>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>
                {coord.title}
              </p>
              {coord.email && (
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.85rem' }}>
                  {coord.email}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleEdit(coord)}
                className="btn ghost"
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(coord.id)}
                className="btn"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Team Panel (simplified version, same pattern as Coordinators)
function TeamPanel({ members, onSave, onDelete, saving }) {
  return (
    <div style={{
      background: 'var(--surface)',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid var(--border)'
    }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Team Members</h2>
      <p style={{ color: 'var(--muted)' }}>
        Team member management coming soon. Same pattern as coordinators above.
      </p>
      <div style={{ marginTop: '1rem' }}>
        {members.map(member => (
          <div key={member.id} style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: '6px', marginBottom: '0.5rem' }}>
            {member.name} - {member.role} ({member.domain})
          </div>
        ))}
      </div>
    </div>
  )
}
