import React, { useEffect } from 'react'
import Icon from '../components/Icon'
import SEO from '../components/SEO'

export default function Activities(){
  // Force reveal animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal, [data-reveal-child]')
        reveals.forEach(el => {
          el.classList.add('revealed')
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container">
      <SEO 
        title="Our Offerings" 
        description="Explore CoRE's focus domains: Web Development, App Development, AI & ML, IoT & Embedded Systems, Game Development, and UI/UX Design. Join workshops, hackathons, and competitions."
      />
      <h1 className="reveal" style={{textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem'}}>
        Our Offerings
      </h1>
      <p className="reveal" style={{maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center', fontSize: '1.1rem', color: 'var(--muted)'}}>
        CoRE offers a wide range of activities to its members, including technical workshops, guest lectures, coding competitions, hackathons, and much more. We strive to provide our members with a holistic learning experience that goes beyond the classroom.
      </p>

      {/* Domains Section - Inspired by Sceptix */}
      <section className="reveal" style={{marginBottom: '4rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '3rem', fontSize: '1.8rem'}}>Our Focus Domains</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }} data-stagger="80">
          {[
            { 
              name: 'Web Development', 
              color: '#3b82f6',
              icon: 'code'
            },
            { 
              name: 'App Development', 
              color: '#10b981',
              icon: 'mobile'
            },
            { 
              name: 'AI & ML', 
              color: '#8b5cf6',
              icon: 'brain'
            },
            { 
              name: 'IoT & Embedded', 
              color: '#f59e0b',
              icon: 'zap'
            },
            { 
              name: 'Game Development', 
              color: '#ef4444',
              icon: 'gamepad'
            },
            { 
              name: 'UI/UX Design', 
              color: '#ec4899',
              icon: 'palette'
            }
          ].map((domain, i) => (
            <article key={i} data-reveal-child style={{
              padding: '2rem 1.5rem',
              borderRadius: '16px',
              background: 'var(--surface)',
              border: '2px solid rgba(0,0,0,0.05)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} className="domain-badge">
              <div style={{color: 'var(--brand-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center'}}>
                <Icon name={domain.icon} size="3rem" color={domain.color} />
              </div>
              <h3 style={{fontSize: '1.05rem', fontWeight: '600', color: 'var(--text)'}}>{domain.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal" style={{marginBottom: '4rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem'}}>Core Values & Principles</h2>
        <div className="cards" data-stagger="80">
          <article className="card" data-reveal-child style={{padding: '2rem'}}>
            <div style={{width: '50px', height: '50px', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </div>
            <h3>Innovation</h3>
            <p>Fostering a culture of innovation and creative problem-solving to tackle real-world challenges.</p>
          </article>
          <article className="card" data-reveal-child style={{padding: '2rem'}}>
            <div style={{width: '50px', height: '50px', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Collaboration</h3>
            <p>Breaking down barriers between students to work together and share knowledge openly.</p>
          </article>
          <article className="card" data-reveal-child style={{padding: '2rem'}}>
            <div style={{width: '50px', height: '50px', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3>Learning in Public</h3>
            <p>Encouraging students to share their learning journey, build in the open, and grow together.</p>
          </article>
          <article className="card" data-reveal-child style={{padding: '2rem'}}>
            <div style={{width: '50px', height: '50px', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3>Community First</h3>
            <p>Prioritizing the growth and well-being of our community members above all else.</p>
          </article>
        </div>
      </section>

      <section className="reveal" style={{marginBottom: '4rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem'}}>What We Offer</h2>
        <div className="cards" data-stagger="80">
          <article className="card" data-reveal-child style={{position: 'relative'}}>
            <span style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'var(--brand-primary)',
              color: 'var(--on-primary)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}>Premium</span>
              <h3>Technical Workshops</h3>
            <p>Our technical workshops are designed to provide hands-on experience in various fields of engineering. From building robots to designing circuits, our workshops cover a wide range of topics and are conducted by experts in their respective fields.</p>
          </article>
          <article className="card" data-reveal-child style={{position: 'relative'}}>
            <span style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: '#10b981',
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}>Popular</span>
            <h3>Coding Competitions</h3>
            <p>We organize coding competitions to encourage our members to hone their programming skills and think creatively. Our competitions are designed to challenge our members and help them push their limits.</p>
          </article>
          <article className="card" data-reveal-child>
            <h3>Hackathons</h3>
            <p>Our hackathons are intense coding events where members work in teams to build innovative solutions to real-world problems. We provide resources and support to bring ideas to life.</p>
          </article>
          <article className="card" data-reveal-child>
            <h3>Networking Opportunities</h3>
            <p>CoRE provides ample opportunities to network with industry professionals, alumni, and other students from across the country. We believe that networking is an essential part of personal and professional growth.</p>
          </article>
        </div>
      </section>

      <section className="reveal" style={{textAlign: 'center', padding: '3rem 2rem', background: 'var(--surface)', borderRadius: '16px', marginBottom: '3rem', boxShadow: 'var(--card-shadow)', border: '1px solid rgba(0,0,0,0.05)'}}>
        <h2 style={{marginBottom: '1.5rem', fontSize: '1.8rem'}}>Benefits of Membership</h2>
        <ul style={{listStyle: 'none', padding: 0, maxWidth: '700px', margin: '0 auto', textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem'}}>
          <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <span style={{fontSize: '1.5rem'}}>✅</span>
            <span>Access to all events and activities</span>
          </li>
          <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <span style={{fontSize: '1.5rem'}}>✅</span>
            <span>Exclusive workshops and learning resources</span>
          </li>
          <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <span style={{fontSize: '1.5rem'}}>✅</span>
            <span>Opportunities to work on real-world projects</span>
          </li>
          <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <span style={{fontSize: '1.5rem'}}>✅</span>
            <span>Mentorship from industry professionals</span>
          </li>
          <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <span style={{fontSize: '1.5rem'}}>✅</span>
            <span>Online community to connect and collaborate</span>
          </li>
          <li style={{marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <span style={{fontSize: '1.5rem'}}>✅</span>
            <span>Recognition for contributions to the community</span>
          </li>
        </ul>
        <p style={{marginTop: '2.5rem'}}>
          <a className="btn primary" href="/contact" style={{padding: '0.85rem 2rem', fontSize: '1.05rem'}}>Join CoRE Today →</a>
        </p>
      </section>
    </div>
  )
}
