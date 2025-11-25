import React, { useState } from 'react'
import TicketModal from '../components/TicketModal'
import SEO from '../components/SEO'
import { events as eventsData } from '../data/projectsData'

export default function Events(){
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  function openTicket(ev){ setSelected(ev); setOpen(true) }

  return (
    <div className="container">
      <SEO 
        title="Upcoming Events" 
        description="Join CoRE events including workshops, hackathons, and technical competitions. Get tickets for robotics workshops, AI sessions, and campus hackathons at VCET Puttur."
      />
      <h2 className="reveal">Upcoming Events</h2>
      <p className="muted reveal">Grab tickets for workshops and hackathons. Tickets are generated client-side here for demo.</p>
      <div className="cards reveal" data-stagger="80">
        {eventsData.map(ev => (
          <article key={ev.id} className="card tilt" data-tilt style={{padding: '1.5rem'}}>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: ev.category === 'Hackathon' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
              color: ev.category === 'Hackathon' ? '#ef4444' : '#3b82f6',
              marginBottom: '1rem'
            }}>
              {ev.category}
            </div>
            <h3 style={{marginBottom: '0.5rem'}}>{ev.title}</h3>
            <p className="muted" style={{fontSize: '0.9rem', marginBottom: '0.75rem'}}>{ev.date} • {ev.location}</p>
            {ev.description && <p style={{fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--muted)'}}>{ev.description}</p>}
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--muted)'}}>
              <span>👥</span>
              <span>{ev.capacity} seats</span>
            </div>
            <div style={{display:'flex',gap:'0.75rem',marginTop:'1rem'}}>
              <button className="btn primary btn--float" onClick={()=>openTicket(ev)}>Get Ticket</button>
              <a className="btn ghost" href="#" onClick={e=>e.preventDefault()}>Details</a>
            </div>
          </article>
        ))}
      </div>

      <TicketModal open={open} event={selected} onClose={()=>setOpen(false)} />
    </div>
  )
}
