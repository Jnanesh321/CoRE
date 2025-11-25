import React, { useEffect } from 'react'
import Icon from '../components/Icon'
import SEO from '../components/SEO'

const applicationSteps = [
  {
    title: 'Share Your Story',
    description: 'Tell us about your interests, skills, and what excites you in tech. We welcome members from all branches and experience levels.',
    icon: 'lightbulb'
  },
  {
    title: 'Show Your Curiosity',
    description: 'Pick your preferred domain or team, or stay open to explore. We pair you with mentors and projects that match your goals.',
    icon: 'rocket'
  },
  {
    title: 'Start Building',
    description: 'Join squad meetups, workshops, and build sessions. Every Neurite gets a guided pathway toward becoming a CoRE Member.',
    icon: 'code'
  }
]

const tracks = [
  {
    name: 'Tech Support',
    icon: 'code',
    focus: 'Frontend • Backend • DevOps',
    description: 'Build and maintain products that power CoRE. Learn modern stacks, ship features, and support campus initiatives.'
  },
  {
    name: 'Design',
    icon: 'palette',
    focus: 'UI/UX • Branding • Motion',
    description: 'Shape how CoRE looks and feels. Create delightful experiences, design systems, and collaborate with developers.'
  },
  {
    name: 'PoC',
    icon: 'users',
    focus: 'Partnerships • Community',
    description: 'Be the bridge between CoRE and the outside world. Manage collaborations, events, and alumni relations.'
  }
]

const quickFacts = [
  { label: 'Avg. mentorship hours / month', value: '6+' },
  { label: 'Active projects to join', value: '10' },
  { label: 'Workshops every semester', value: '12+' },
  { label: 'Inter-college collaborations', value: '8' }
]

const faqs = [
  {
    q: 'Who can apply?',
    a: 'Any VCET student interested in technology, design, or community building. We especially encourage 1st and 2nd years to join as Neurites.'
  },
  {
    q: 'Do I need prior experience?',
    a: 'No. Curiosity and willingness to learn matter most. We pair beginners with mentors and starter projects.'
  },
  {
    q: 'How long does the application take?',
    a: 'Applications are reviewed every two weeks. You will hear back within 14 days with next steps.'
  },
  {
    q: 'What is expected from me?',
    a: 'Attend community meetups, contribute to projects or events, and share your learning openly with the team.'
  }
]

export default function Join(){
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
        title="Join CoRE" 
        description="Become part of CoRE - VCET Puttur's premier tech club. Apply as a Neurite, choose your track (Tech Support, Design, PoC), and start building your skills."
      />
      <section className="reveal" style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h1 style={{fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', marginBottom: '1rem'}}>Join CoRE</h1>
        <p style={{fontSize: '1.1rem', maxWidth: '760px', margin: '0 auto', color: 'var(--muted)', lineHeight: '1.7'}}>
          Become part of a student-led tech community that learns by doing. Whether you are starting out or ready to lead, CoRE gives you the space, mentorship, and projects to grow.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem'}}>
          <a className="btn primary" href="/contact" style={{minWidth: '180px'}}>Apply Now →</a>
          <a className="btn ghost" href="#faq" style={{minWidth: '180px'}}>View FAQs</a>
        </div>
      </section>

      <section className="reveal" style={{marginBottom: '3.5rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>How It Works</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem'}} data-stagger="90">
          {applicationSteps.map((step, idx) => (
            <article key={step.title} className="card" data-reveal-child style={{padding: '2rem', textAlign: 'center'}}>
              {typeof step.icon === 'string' && step.icon.length < 3 ? (
                <div style={{fontSize: '2.8rem', marginBottom: '1rem'}}>{step.icon}</div>
              ) : (
                <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'center'}}>
                  <Icon name={step.icon} size="2.8rem" color="var(--brand-primary)" />
                </div>
              )}
              <p style={{fontSize: '0.85rem', fontWeight: '700', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.75rem'}}>Step {idx + 1}</p>
              <h3 style={{marginBottom: '.75rem'}}>{step.title}</h3>
              <p style={{fontSize: '.95rem', color: 'var(--text)', lineHeight: '1.6'}}>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal" style={{marginBottom: '3.5rem', padding: '2.5rem', borderRadius: '16px', background: 'var(--surface)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Choose Your Track</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem'}} data-stagger="80">
          {tracks.map(track => (
            <article key={track.name} className="card reveal" data-reveal-child style={{padding: '1.75rem'}}>
              <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
                <Icon name={track.icon} size="2.5rem" color="var(--brand-primary)" />
              </div>
              <h3 style={{marginBottom: '0.5rem'}}>{track.name}</h3>
              <p style={{fontSize: '0.85rem', color: 'var(--brand-primary)', fontWeight: '600', marginBottom: '1rem'}}>{track.focus}</p>
              <p style={{fontSize: '0.95rem', lineHeight: '1.6'}}>{track.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal" style={{marginBottom: '3.5rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>What You Get</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem'}} data-stagger="70">
          {quickFacts.map(fact => (
            <div key={fact.label} className="card" data-reveal-child style={{padding: '1.75rem', textAlign: 'center'}}>
              <div style={{fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '.5rem'}}>{fact.value}</div>
              <p style={{fontSize: '0.95rem', color: 'var(--muted)'}}>{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal" style={{marginBottom: '3.5rem', padding: '2.5rem', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>From Neurite to CoRE Member</h2>
        <div style={{display: 'grid', gap: '1.5rem', maxWidth: '760px', margin: '0 auto'}}>
          <div className="card" data-reveal-child style={{padding: '1.75rem'}}>
            <h3 style={{marginBottom: '.5rem'}}>Neurite (Onboarding)</h3>
            <p style={{fontSize: '.95rem', color: 'var(--muted)', marginBottom: '.75rem'}}>Months 0-6</p>
            <ul style={{margin: 0, paddingLeft: '1.1rem', lineHeight: '1.6', fontSize: '0.95rem'}}>
              <li>Attend domain meetups and workshops</li>
              <li>Complete starter projects and shadow mentors</li>
              <li>Share a monthly learning update with the community</li>
            </ul>
          </div>
          <div className="card" data-reveal-child style={{padding: '1.75rem'}}>
            <h3 style={{marginBottom: '.5rem'}}>CoRE Member</h3>
            <p style={{fontSize: '.95rem', color: 'var(--muted)', marginBottom: '.75rem'}}>Months 6+</p>
            <ul style={{margin: 0, paddingLeft: '1.1rem', lineHeight: '1.6', fontSize: '0.95rem'}}>
              <li>Lead technical initiatives or community programs</li>
              <li>Mentor new Neurites and guide project teams</li>
              <li>Represent CoRE in hackathons, conferences, and partnerships</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="reveal" style={{marginBottom: '3.5rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Frequently Asked Questions</h2>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '820px', margin: '0 auto'}} data-stagger="70">
          {faqs.map(faq => (
            <article key={faq.q} className="card" data-reveal-child style={{padding: '1.75rem'}}>
              <h3 style={{marginBottom: '.75rem'}}>{faq.q}</h3>
              <p style={{fontSize: '.95rem', lineHeight: '1.6', color: 'var(--muted)'}}>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal" style={{textAlign: 'center', padding: '2.5rem', borderRadius: '16px', background: 'var(--surface)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{marginBottom: '1rem'}}>Ready to Start?</h2>
        <p style={{maxWidth: '640px', margin: '0 auto 2rem', fontSize: '1.05rem', color: 'var(--muted)'}}>
          Fill out the application form, and we’ll reach out within two weeks. Keep an eye on your inbox for the invite to our next onboarding meetup.
        </p>
        <a className="btn primary" href="/contact" style={{padding: '0.9rem 2.5rem', fontSize: '1.05rem'}}>Apply via Contact Form</a>
      </section>
    </div>
  )
}

