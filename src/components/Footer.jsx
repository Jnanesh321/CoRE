import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>CoRE</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>Learn · Apply · Enjoy</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>We are a community of engineering students passionate about research, innovation, and technical excellence.</p>
        </div>

        <div>
          <p style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Quick Links</p>
          <nav aria-label="Footer">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><a href="/">Home</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="/activities">Activities</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="/team">Team</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="/events">Events</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="/projects">Projects</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="/join">Join Us</a></li>
            </ul>
          </nav>
        </div>

        <div>
          <p style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Connect With Us</p>
          <div style={{ marginBottom: '1rem' }}>
            <a href="https://www.linkedin.com/company/core-vcet/" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em', fontSize: '0.85rem', textDecoration: 'none', color: 'inherit', opacity: 0.8, transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.target.style.opacity = '1'} onMouseLeave={e => e.target.style.opacity = '0.8'}>
              L I N K E D I N →
            </a>
            <a href="https://www.youtube.com/@CoRE-VCET" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em', fontSize: '0.85rem', textDecoration: 'none', color: 'inherit', opacity: 0.8, transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.target.style.opacity = '1'} onMouseLeave={e => e.target.style.opacity = '0.8'}>
              Y O U T U B E →
            </a>
            <a href="https://www.instagram.com/core.vcet" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em', fontSize: '0.85rem', textDecoration: 'none', color: 'inherit', opacity: 0.8, transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.target.style.opacity = '1'} onMouseLeave={e => e.target.style.opacity = '0.8'}>
              I N S T A G R A M →
            </a>
            <a href="https://github.com/CoRE-VCET" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em', fontSize: '0.85rem', textDecoration: 'none', color: 'inherit', opacity: 0.8, transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.target.style.opacity = '1'} onMouseLeave={e => e.target.style.opacity = '0.8'}>
              G I T H U B →
            </a>
          </div>
          <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
            <a href="mailto:core@vcetputtur.ac.in" style={{ color: 'inherit' }}>core@vcetputtur.ac.in</a>
          </p>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.25rem' }}>VCET, Neharu Nagara, Puttur</p>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>© 2021 Core-VCET College Club. All Rights Reserved.</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>
          <a href="#top" style={{ color: 'inherit' }}>Back to Top ↑</a>
        </p>
      </div>
    </footer>
  )
}
