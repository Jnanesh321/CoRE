import React, { useState } from 'react'

export default function TicketModal({ open, onClose, event }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [ticket, setTicket] = useState(null)
  const ref = React.useRef(null)
  const prevFocus = React.useRef(null)

  if(!open) return null

  React.useEffect(()=>{
    // Manage focus trap and ESC
    prevFocus.current = document.activeElement
    setTimeout(()=>{
      // focus first input
      if(ref.current){
        const f = ref.current.querySelector('input, button, [tabindex]')
        if(f) f.focus()
      }
    },30)
    function onKey(e){
      if(e.key === 'Escape') onClose()
      if(e.key === 'Tab' && ref.current){
        const focusable = ref.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
        if(focusable.length===0) return
        const first = focusable[0]
        const last = focusable[focusable.length-1]
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus() }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return ()=>{
      document.removeEventListener('keydown', onKey)
      try{ prevFocus.current && prevFocus.current.focus() }catch(e){}
    }
  },[open])

  function generateTicket(){
    const id = 'CORE-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,8)
    const payload = { id, event: event?.title || 'Event', name, email, issuedAt: new Date().toISOString() }
    setTicket(payload)
  }

  function downloadTicket(){
    if(!ticket) return
    const blob = new Blob([JSON.stringify(ticket, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${ticket.id}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal" ref={ref} tabIndex={-1}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <h3>{event?.title || 'Event Ticket'}</h3>
        <p className="muted">This generates a client-side ticket. Backend ticketing will be wired separately.</p>
        {!ticket ? (
          <div>
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" />
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@school.edu" />
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className="btn primary" onClick={generateTicket} disabled={!name||!email}>Generate Ticket</button>
              <button className="btn ghost" onClick={onClose}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h4>Ticket ID: <code>{ticket.id}</code></h4>
            <p><strong>Name:</strong> {ticket.name} — <strong>Email:</strong> {ticket.email}</p>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className="btn primary" onClick={downloadTicket}>Download</button>
              <button className="btn ghost" onClick={()=>{navigator.clipboard?.writeText(JSON.stringify(ticket)); alert('Ticket copied')}}>Copy</button>
              <button className="btn" onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
