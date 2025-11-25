import React, { useEffect } from 'react'
import Icon from '../components/Icon'
import SEO from '../components/SEO'

export default function About(){
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
        title="About Us" 
        description="Learn about CoRE's mission, vision, and approach to empowering engineering students through hands-on projects, workshops, and collaborative learning at VCET Puttur."
      />
      <h1 className="reveal" style={{textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem'}}>About CoRE</h1>
      <p className="reveal" style={{maxWidth: '800px', margin: '0 auto 2rem', textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--muted)'}}>
        CoRE is a vibrant community of engineering students at VCET Puttur who are passionate about learning, growing, and exploring various fields of engineering. We provide a platform for students to come together, share their ideas, and work on projects that challenge and inspire them.
      </p>

      <section className="reveal" style={{marginBottom: '3rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '1rem', textAlign: 'center'}}>Our Mission</h2>
        <p style={{textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto', color: 'var(--muted)'}}>
          To empower engineering students through hands-on learning, collaboration, and real-world project experience. We aim to bridge the gap between academic learning and industry practice, fostering innovation and technical excellence.
        </p>
      </section>

      <section className="reveal" style={{marginBottom: '3rem'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center'}}>Our Approach</h2>
        <div className="cards" data-stagger="80">
          <article className="card reveal" data-reveal-child>
            <Icon name="users" size="2.5rem" color="var(--brand-primary)" style={{marginBottom: '1rem'}} />
            <h3>Collaborative Learning</h3>
            <p>We believe in learning together. Our members work in teams, share knowledge openly, and support each other's growth through peer-to-peer learning and mentorship.</p>
          </article>
          <article className="card reveal" data-reveal-child>
            <Icon name="code" size="2.5rem" color="var(--brand-primary)" style={{marginBottom: '1rem'}} />
            <h3>Hands-On Projects</h3>
            <p>We emphasize practical, project-based learning. Members work on real-world problems, building solutions that matter while developing technical skills.</p>
          </article>
          <article className="card reveal" data-reveal-child>
            <Icon name="sprout" size="2.5rem" color="var(--brand-primary)" style={{marginBottom: '1rem'}} />
            <h3>Progressive Growth</h3>
            <p>Members start as Neurites, learning and contributing through projects. As they grow, they become CoRE Members, taking on leadership roles and mentoring others.</p>
          </article>
        </div>
      </section>

      <section className="reveal" style={{marginBottom: '3rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center'}}>Our Structure</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem'}}>
          <div className="card" style={{padding: '1.5rem', textAlign: 'center'}}>
            <Icon name="star" size="2rem" color="var(--brand-primary)" style={{marginBottom: '0.75rem'}} />
            <h3 style={{marginBottom: '0.5rem'}}>Neurites</h3>
            <p style={{fontSize: '0.95rem', color: 'var(--muted)'}}>1st-2nd year students learning and growing through projects and contributions.</p>
          </div>
          <div className="card" style={{padding: '1.5rem', textAlign: 'center'}}>
            <Icon name="zap" size="2rem" color="var(--brand-primary)" style={{marginBottom: '0.75rem'}} />
            <h3 style={{marginBottom: '0.5rem'}}>CoRE Members</h3>
            <p style={{fontSize: '0.95rem', color: 'var(--muted)'}}>Experienced members organized into Executive, PoC, Tech Support, and Design teams.</p>
          </div>
        </div>
      </section>

      <section className="reveal" style={{textAlign: 'center', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{fontSize: '1.8rem', marginBottom: '1rem'}}>Get Involved</h2>
        <p style={{maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '1.05rem', color: 'var(--muted)'}}>
          Whether you're a beginner looking to learn or an experienced student ready to lead, CoRE has a place for you. Join us and be part of a community that's shaping the future of tech.
        </p>
        <a className="btn primary" href="/contact" style={{padding: '0.85rem 2rem', fontSize: '1.05rem'}}>Join CoRE Today →</a>
      </section>
    </div>
  )
}
