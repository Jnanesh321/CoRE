import React, { useEffect } from 'react'
import Icon from '../components/Icon'
import SEO from '../components/SEO'

// CoRE Team Structure: Neurites → CoRE Members (Executive, PoC, Tech Support, Design)
const teamStructure = {
  executive: [
    { 
      id: 'kk', 
      name: 'Karthik Krishna', 
      role: 'Coordinator', 
      team: 'Executive', 
      linkedin: '#',
      contributions: ['Event Management', 'Member Engagement', 'Technical Sessions'],
      description: 'Coordinating technical events and member activities'
    }
  ],
  poc: [
    { 
      id: 's', 
      name: 'Shreyas Rao', 
      role: 'Point of Contact', 
      team: 'PoC', 
      linkedin: 'https://www.linkedin.com/in/shreyasraosayshello/',
      contributions: ['Industry Relations', 'Partnership Development', 'External Communications'],
      description: 'Managing external partnerships and communications'
    }
  ],
  techSupport: [
    { 
      id: 'p', 
      name: 'Prajnashankari M N', 
      role: 'Tech Support Lead', 
      team: 'Tech Support', 
      linkedin: 'https://www.linkedin.com/in/prajnashankari-m-n-78ab63246/',
      contributions: ['Infrastructure Setup', 'Technical Mentoring', 'System Administration'],
      description: 'Overseeing technical infrastructure and support'
    },
    { 
      id: 'j', 
      name: 'Jeevith S', 
      role: 'Backend Developer', 
      team: 'Tech Support', 
      linkedin: 'https://www.linkedin.com/in/jeevithsgowda/',
      contributions: ['API Development', 'Database Management', 'Server Maintenance'],
      description: 'Building and maintaining backend systems'
    }
  ],
  design: [
    { 
      id: 'jns', 
      name: 'Jnanesh Sharma H', 
      role: 'Design & Development Lead', 
      team: 'Design', 
      linkedin: '#',
      contributions: ['CoRE Website Development', 'UI/UX Design', 'Brand Identity'],
      description: 'Leading design initiatives and web development projects'
    },
    { 
      id: 'd2', 
      name: 'Priya Kumari', 
      role: 'Graphic Designer', 
      team: 'Design', 
      linkedin: '#',
      contributions: ['Social Media Graphics', 'Event Posters', 'Marketing Materials'],
      description: 'Creating visual content for events and social media'
    },
    { 
      id: 'd3', 
      name: 'Arjun Patel', 
      role: 'UI/UX Designer', 
      team: 'Design', 
      linkedin: '#',
      contributions: ['User Experience Research', 'Interface Design', 'Prototyping'],
      description: 'Designing intuitive user experiences for CoRE projects'
    }
  ],
  neurites: [
    { 
      id: 'jn2', 
      name: 'Jnanesh Sharma H', 
      year: '2nd Year', 
      branch: 'CSE',
      linkedin: '#',
      contributions: ['Website Development', 'Frontend Projects'],
      description: 'Building responsive web applications and learning full-stack development'
    },
    { 
      id: 'n1', 
      name: 'Ashok Reddy', 
      year: '1st Year', 
      branch: 'ECE',
      linkedin: '#',
      contributions: ['IoT Workshop Participation', 'Arduino Projects'],
      description: 'Passionate about IoT and embedded systems'
    },
    { 
      id: 'n2', 
      name: 'Rahul Verma', 
      year: '2nd Year', 
      branch: 'CSE',
      linkedin: '#',
      contributions: ['ML Model Development', 'Data Analysis'],
      description: 'Exploring AI/ML and data science'
    },
    { 
      id: 'n3', 
      name: 'Sneha Singh', 
      year: '1st Year', 
      branch: 'ISE',
      linkedin: '#',
      contributions: ['Flutter App Development', 'Mobile UI Design'],
      description: 'Interested in mobile app development'
    },
    { 
      id: 'n4', 
      name: 'Vikram Shetty', 
      year: '2nd Year', 
      branch: 'ISE',
      linkedin: '#',
      contributions: ['Game Development', 'Unity Projects'],
      description: 'Learning game development and interactive applications'
    }
  ]
}

export default function Team(){
  // Force reveal animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal, [data-reveal-child]')
      reveals.forEach(el => {
        el.classList.add('revealed')
        // Fallback: directly set opacity and transform if class doesn't work
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container">
      <SEO 
        title="Our Team" 
        description="Meet the CoRE team at VCET Puttur - Neurites and CoRE Members driving innovation in tech. Explore our Executive, PoC, Tech Support, and Design teams."
      />
      <h1 className="reveal" style={{textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem'}}>
        Meet Our Team
      </h1>
      <p className="reveal spaced-text" style={{textAlign: 'center', margin: '0 auto 1.5rem', fontSize: '0.85rem', color: 'var(--muted)', letterSpacing: '0.15em', fontWeight: '600'}}>
        N E U R I T E S · C O R E   M E M B E R S
      </p>
      <p className="reveal" style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 1.5rem', fontSize: '1.1rem', color: 'var(--muted)'}}>
        CoRE is structured into two main groups: <strong>Neurites</strong> (aspiring members in their 1st-2nd year) and <strong>CoRE Members</strong> (experienced members organized into Executive, PoC, Tech Support, and Design teams).
      </p>
      <p className="reveal" style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '0.95rem', color: 'var(--muted)', fontStyle: 'italic'}}>
        Neurites gain experience through projects and contributions, eventually being promoted to CoRE Members.
      </p>

      {/* Executive Team */}
      <section className="reveal" style={{marginBottom: '4rem'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: '700'}}>
          Executive Team
        </h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem'}}>
          Leading CoRE's strategic vision and operations
        </p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto'}} data-stagger="90">
          {teamStructure.executive.map((m) => (
            <article key={m.id} className="team-member" data-reveal-child style={{padding: '2rem', borderRadius: '16px', background: 'var(--surface)', boxShadow: 'var(--card-shadow)', textAlign: 'center', transition: 'all 0.3s ease', border: '2px solid var(--brand-primary)'}}>
              <div className="avatar" aria-hidden="true" style={{width: '80px', height: '80px', fontSize: '1.8rem', margin: '0 auto 1rem'}}>
                {m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
              </div>
              <h3 style={{fontSize: '1.3rem', marginBottom: '0.25rem'}}>
                {m.linkedin !== '#' ? (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{m.name}</a>) : m.name}
              </h3>
              <p style={{color: 'var(--brand-primary)', fontWeight: '600', marginBottom: '0.5rem'}}>{m.role}</p>
              <p className="muted" style={{fontSize: '0.9rem', marginBottom: '1rem'}}>{m.description}</p>
              
              {/* Contributions */}
              {/* Domain badges */}
              <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem'}}>
                {m.contributions && m.contributions.some(c => c.includes('Web') || c.includes('Website') || c.includes('Frontend')) && (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', fontWeight: '600'}}>Web</span>
                )}
                {m.contributions && m.contributions.some(c => c.includes('Backend') || c.includes('API') || c.includes('Server')) && (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: '600'}}>Backend</span>
                )}
                {(m.team && m.team.includes('Design')) || (m.contributions && m.contributions.some(c => c.includes('UI') || c.includes('UX') || c.includes('Graphics'))) ? (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', fontWeight: '600'}}>Design</span>
                ) : null}
                {m.contributions && m.contributions.some(c => c.includes('Industry') || c.includes('Partnership') || c.includes('External')) && (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontWeight: '600'}}>Partnerships</span>
                )}
              </div>

              {m.contributions && m.contributions.length > 0 && (
                <div style={{marginBottom: '1rem', textAlign: 'left'}}>
                  <p style={{fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--muted)'}}>Key Contributions</p>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem'}}>
                    {m.contributions.map((contrib, i) => (
                      <li key={i} style={{marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative'}}>
                        <span style={{position: 'absolute', left: 0, color: 'var(--brand-primary)'}}>•</span>
                        {contrib}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {m.linkedin !== '#' && (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.85rem', padding: '0.5rem 1rem'}}>Connect on LinkedIn</a>)}
            </article>
          ))}
        </div>
      </section>

      {/* PoC Team */}
      <section className="reveal" style={{marginBottom: '4rem'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: '700'}}>Point of Contact (PoC)</h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem'}}>Managing partnerships and external communications</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto'}} data-stagger="90">
          {teamStructure.poc.map((m) => (
            <article key={m.id} className="team-member" data-reveal-child style={{padding: '1.5rem', borderRadius: '12px', background: 'var(--surface)', boxShadow: 'var(--card-shadow)', textAlign: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(0,0,0,0.05)'}}>
              <div className="avatar" aria-hidden="true" style={{width: '70px', height: '70px', fontSize: '1.5rem', margin: '0 auto 1rem'}}>{m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <h3 style={{fontSize: '1.15rem', marginBottom: '0.25rem'}}>{m.linkedin !== '#' ? (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{m.name}</a>) : m.name}</h3>
              <p style={{color: 'var(--brand-primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem'}}>{m.role}</p>
              <p className="muted" style={{fontSize: '0.85rem', marginBottom: '1rem'}}>{m.description}</p>
              
              {/* Domain badges */}
              <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem'}}>
                {m.contributions && m.contributions.some(c => c.includes('Industry') || c.includes('Partnership') || c.includes('External')) && (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontWeight: '600'}}>Partnerships</span>
                )}
              </div>
              
              {m.contributions && m.contributions.length > 0 && (
                <div style={{marginBottom: '1rem', textAlign: 'left'}}>
                  <p style={{fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem', color: 'var(--muted)'}}>Contributions</p>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem'}}>
                    {m.contributions.map((contrib, i) => (
                      <li key={i} style={{marginBottom: '0.2rem', paddingLeft: '0.8rem', position: 'relative'}}>
                        <span style={{position: 'absolute', left: 0, color: 'var(--brand-primary)', fontSize: '0.7rem'}}>•</span>
                        {contrib}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {m.linkedin !== '#' && (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.8rem', padding: '0.4rem 0.9rem'}}>LinkedIn →</a>)}
            </article>
          ))}
        </div>
      </section>

      {/* Tech Support Team */}
      <section className="reveal" style={{marginBottom: '4rem'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: '700'}}>Tech Support Team</h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem'}}>Building and maintaining technical infrastructure</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto'}} data-stagger="90">
          {teamStructure.techSupport.map((m) => (
            <article key={m.id} className="team-member" data-reveal-child style={{padding: '1.5rem', borderRadius: '12px', background: 'var(--surface)', boxShadow: 'var(--card-shadow)', textAlign: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(0,0,0,0.05)'}}>
              <div className="avatar" aria-hidden="true" style={{width: '70px', height: '70px', fontSize: '1.5rem', margin: '0 auto 1rem'}}>{m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <h3 style={{fontSize: '1.15rem', marginBottom: '0.25rem'}}>{m.linkedin !== '#' ? (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{m.name}</a>) : m.name}</h3>
              <p style={{color: 'var(--brand-primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem'}}>{m.role}</p>
              <p className="muted" style={{fontSize: '0.85rem', marginBottom: '1rem'}}>{m.description}</p>
              
              {/* Domain badges */}
              <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem'}}>
                {m.contributions && m.contributions.some(c => c.includes('Backend') || c.includes('API') || c.includes('Server') || c.includes('Database')) && (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: '600'}}>Backend</span>
                )}
                {m.contributions && m.contributions.some(c => c.includes('Infrastructure') || c.includes('System') || c.includes('DevOps')) && (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontWeight: '600'}}>Infrastructure</span>
                )}
              </div>
              
              {m.contributions && m.contributions.length > 0 && (
                <div style={{marginBottom: '1rem', textAlign: 'left'}}>
                  <p style={{fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem', color: 'var(--muted)'}}>Contributions</p>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem'}}>
                    {m.contributions.map((contrib, i) => (
                      <li key={i} style={{marginBottom: '0.2rem', paddingLeft: '0.8rem', position: 'relative'}}>
                        <span style={{position: 'absolute', left: 0, color: 'var(--brand-primary)', fontSize: '0.7rem'}}>•</span>
                        {contrib}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {m.linkedin !== '#' && (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.8rem', padding: '0.4rem 0.9rem'}}>LinkedIn →</a>)}
            </article>
          ))}
        </div>
      </section>

      {/* Design Team */}
      <section className="reveal" style={{marginBottom: '4rem'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: '700'}}>Design Team</h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem'}}>Creating visual identity and user experiences</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto'}} data-stagger="90">
          {teamStructure.design.map((m) => (
            <article key={m.id} className="team-member" data-reveal-child style={{padding: '1.5rem', borderRadius: '12px', background: 'var(--surface)', boxShadow: 'var(--card-shadow)', textAlign: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(0,0,0,0.05)'}}>
              <div className="avatar" aria-hidden="true" style={{width: '70px', height: '70px', fontSize: '1.5rem', margin: '0 auto 1rem'}}>{m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <h3 style={{fontSize: '1.15rem', marginBottom: '0.25rem'}}>{m.linkedin !== '#' ? (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{m.name}</a>) : m.name}</h3>
              <p style={{color: 'var(--brand-primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem'}}>{m.role}</p>
              <p className="muted" style={{fontSize: '0.85rem', marginBottom: '1rem'}}>{m.description}</p>
              
              {/* Domain badges */}
              <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem'}}>
                {(m.team && m.team.includes('Design')) || (m.contributions && m.contributions.some(c => c.includes('UI') || c.includes('UX') || c.includes('Graphics') || c.includes('Design'))) ? (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', fontWeight: '600'}}>Design</span>
                ) : null}
                {m.contributions && m.contributions.some(c => c.includes('Web') || c.includes('Website') || c.includes('Frontend') || c.includes('Development')) && (
                  <span style={{padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', fontWeight: '600'}}>Web</span>
                )}
              </div>
              
              {m.contributions && m.contributions.length > 0 && (
                <div style={{marginBottom: '1rem', textAlign: 'left'}}>
                  <p style={{fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem', color: 'var(--muted)'}}>Contributions</p>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem'}}>
                    {m.contributions.map((contrib, i) => (
                      <li key={i} style={{marginBottom: '0.2rem', paddingLeft: '0.8rem', position: 'relative'}}>
                        <span style={{position: 'absolute', left: 0, color: 'var(--brand-primary)', fontSize: '0.7rem'}}>•</span>
                        {contrib}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {m.linkedin !== '#' && (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.8rem', padding: '0.4rem 0.9rem'}}>LinkedIn →</a>)}
            </article>
          ))}
        </div>
      </section>

      {/* Neurites Section */}
      <section className="reveal" style={{marginBottom: '4rem', padding: '3rem 2rem', background: 'var(--surface)', borderRadius: '16px', border: '2px solid rgba(0,0,0,0.08)'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: '700'}}>Neurites </h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto 2rem'}}>Our aspiring members in their 1st-2nd year, learning and growing through projects and contributions</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto'}} data-stagger="90">
          {teamStructure.neurites.map((m) => (
            <article key={m.id} className="team-member" data-reveal-child style={{padding: '1.5rem', borderRadius: '12px', background: 'var(--bg)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(0,0,0,0.06)'}}>
              <div className="avatar" aria-hidden="true" style={{width: '60px', height: '60px', fontSize: '1.3rem', margin: '0 auto 1rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)'}}>{m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <h3 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>{m.linkedin !== '#' ? (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{m.name}</a>) : m.name}</h3>
              <p style={{color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem'}}>{m.year} • {m.branch}</p>
              <p className="muted" style={{fontSize: '0.85rem', marginBottom: '1rem'}}>{m.description}</p>
              
              {m.contributions && m.contributions.length > 0 && (
                <div style={{marginBottom: '1rem', textAlign: 'left'}}>
                  <p style={{fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem', color: 'var(--muted)'}}>Contributions</p>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem'}}>
                    {m.contributions.map((contrib, i) => (
                      <li key={i} style={{marginBottom: '0.2rem', paddingLeft: '0.8rem', position: 'relative'}}>
                        <span style={{position: 'absolute', left: 0, color: 'var(--brand-primary)', fontSize: '0.7rem'}}>•</span>
                        {contrib}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {m.linkedin !== '#' && (<a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.75rem', padding: '0.35rem 0.75rem'}}>LinkedIn →</a>)}
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="reveal" style={{textAlign: 'center', padding: '3rem 2rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid rgba(0,0,0,0.05)'}}>
        <h2 style={{marginBottom: '1rem', fontSize: '1.8rem'}}>Join Our Team</h2>
        <p style={{maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem', color: 'var(--muted)'}}>Start your journey as a Neurite and grow into a CoRE Member. Apply now to become part of our thriving tech community!</p>
        <a className="btn primary" href="/contact" style={{padding: '0.85rem 2rem', fontSize: '1.05rem'}}>Apply Now </a>
      </section>
    </div>
  )
}
