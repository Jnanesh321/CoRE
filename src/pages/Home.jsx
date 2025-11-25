import React, { useEffect, useState } from 'react'
import DoodleTeam from '../components/DoodleTeam'
import DoodleNetwork from '../components/DoodleNetwork'
import GLCanvas from '../components/GLCanvas'
import DoodleOverlay from '../components/DoodleOverlay'
import Icon from '../components/Icon'
import SEO from '../components/SEO'
import Newsletter from '../components/Newsletter'
import BackendStatusBanner from '../components/BackendStatusBanner'
import useScrollReveal from '../hooks/useScrollReveal'
import { getSiteConfig } from '../lib/cmsApi'

export default function Home(){
  const [counters, setCounters] = useState({ members: 0, events: 0, projects: 0 })
  const [config, setConfig] = useState(null)
  const [isOffline, setIsOffline] = useState(false)
  
  // Use intersection observer for scroll animations
  useScrollReveal()

  // Fetch site configuration
  useEffect(() => {
    async function loadConfig() {
      const { data, isOffline: offline } = await getSiteConfig()
      setConfig(data)
      setIsOffline(offline)
      
      // Set target values for counter animation
      const targets = {
        members: parseInt(data.members_count) || 120,
        events: parseInt(data.events_count) || 25,
        projects: parseInt(data.projects_count) || 45
      }
      
      // Animate counters
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps
      
      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        setCounters({
          members: Math.floor(targets.members * easeOut),
          events: Math.floor(targets.events * easeOut),
          projects: Math.floor(targets.projects * easeOut)
        })
        
        if (currentStep >= steps) {
          setCounters(targets)
          clearInterval(interval)
        }
      }, stepTime)
      
      return () => clearInterval(interval)
    }
    
    loadConfig()
  }, [])

  return (
    <div>
      <BackendStatusBanner isOffline={isOffline} />
      <SEO
        title="Home"
        description="CoRE at VCET Puttur. Join the best technical club to learn Web Dev, AI/ML, IoT, App Dev, Game Dev, and UI/UX Design. Build projects, attend workshops, and grow your skills."
      />
      <section className="hero">
        <div className="container hero-inner">
          {/* WebGL background inserted by GLCanvas (theme-aware) */}
          <GLCanvas />
          {/* SVG doodles overlay for hand-drawn aesthetic */}
          <DoodleOverlay />
          <p className="skip">Skip to Main Content</p>
          
          <div style={{marginBottom: '1rem'}}>
            <h1 className="reveal" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              {config?.hero_title || 'The Future of Tech Starts Here'}
            </h1>
            <p className="lead reveal spaced-text" style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              fontWeight: '600',
              marginTop: '1.5rem',
              maxWidth: '700px',
              margin: '1.5rem auto 0',
              letterSpacing: '0.2em',
              opacity: 0.8
            }}>
              L E A R N · A P P L Y · E N J O Y
            </p>
            <p className="lead reveal" style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: '500',
              marginTop: '1rem',
              maxWidth: '700px',
              margin: '1rem auto 0'
            }}>
              <span style={{opacity: 0.9}}>Realize Ideas.</span>
              {' '}
              <span style={{opacity: 0.9}}>Inspire the Next.</span>
            </p>
          </div>
          
          <p className="hero-cta reveal page-reveal" style={{marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a className="btn primary" href="/activities" style={{minWidth: '160px'}}>
              Get Started →
            </a>
            <a className="btn ghost" href="/join" style={{minWidth: '160px'}}>
              Join Now
            </a>
          </p>
          
          <ul className="hero-features" data-stagger="80" style={{marginTop: '3rem'}}>
            <li data-reveal-child className="reveal-left" data-parallax="0.08">Healthy and Competitive Environment</li>
            <li data-reveal-child className="reveal-up" data-parallax="0.04">Wide Range of Activities</li>
            <li data-reveal-child className="reveal-right" data-parallax="0.06">Opportunities for Personal Growth</li>
          </ul>

          {/* Decorative doodles: replaced by DoodleOverlay (single source) */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container reveal" style={{padding: '4rem 1.25rem', background: 'var(--surface)', borderRadius: '16px', marginTop: '3rem', marginBottom: '3rem', boxShadow: 'var(--card-shadow)'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center'}}>
          <div data-reveal-child>
            <div style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '0.5rem'}}>
              {counters.members}+
            </div>
            <div style={{fontSize: '1.1rem', color: 'var(--muted)', fontWeight: '500'}}>Active Members</div>
          </div>
          <div data-reveal-child>
            <div style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '0.5rem'}}>
              {counters.events}+
            </div>
            <div style={{fontSize: '1.1rem', color: 'var(--muted)', fontWeight: '500'}}>Events & Workshops</div>
          </div>
          <div data-reveal-child>
            <div style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--brand-primary)', marginBottom: '0.5rem'}}>
              {counters.projects}+
            </div>
            <div style={{fontSize: '1.1rem', color: 'var(--muted)', fontWeight: '500'}}>Active Projects</div>
          </div>
        </div>
      </section>

      <section id="who" className="container reveal">
        <h2 style={{textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.5rem'}}>Who We Are</h2>
        <p style={{maxWidth: '800px', margin: '0 auto 2rem', fontSize: '1.1rem', lineHeight: '1.7', textAlign: 'center', color: 'var(--muted)'}}>
          CoRE is a community of engineering students who are passionate about learning, growing, and exploring various fields of engineering. Our aim is to provide a platform for students to come together, share their ideas, and work on projects that challenge and inspire them.
        </p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
          <div className="card reveal" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{width: '60px', height: '60px', margin: '0 auto 1.5rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 style={{marginBottom: '0.5rem'}}>Our Mission</h3>
            <p style={{color: 'var(--muted)', fontSize: '0.95rem'}}>To empower engineering students through hands-on learning, collaboration, and real-world project experience.</p>
          </div>
          <div className="card reveal" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{width: '60px', height: '60px', margin: '0 auto 1.5rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 style={{marginBottom: '0.5rem'}}>Our Vision</h3>
            <p style={{color: 'var(--muted)', fontSize: '0.95rem'}}>To become the leading tech community that bridges the gap between academic learning and industry practice.</p>
          </div>
          <div className="card reveal" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{width: '60px', height: '60px', margin: '0 auto 1.5rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--muted) 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 style={{marginBottom: '0.5rem'}}>Our Values</h3>
            <p style={{color: 'var(--muted)', fontSize: '0.95rem'}}>Innovation, Collaboration, Learning in Public, and Community First.</p>
          </div>
        </div>
      </section>

      <section id="offerings" className="container reveal">
        <h2>Our Offerings</h2>
        <p>CoRE offers a wide range of activities to its members, including technical workshops, guest lectures, coding competitions, hackathons, and much more. We strive to provide our members with a holistic learning experience that goes beyond the classroom.</p>
        <div className="cards">
          <article className="card reveal">
            <h3>Technical Workshops</h3>
            <p>Our technical workshops are designed to provide hands-on experience to our members in various fields of engineering. From building robots to designing circuits, our workshops cover a wide range of topics and are conducted by experts in their respective fields.</p>
          </article>
          <article className="card reveal">
            <h3>Coding Competitions</h3>
            <p>We organize coding competitions to encourage our members to hone their programming skills and think creatively. Our competitions are designed to challenge our members and help them push their limits.</p>
          </article>
          <article className="card reveal">
            <h3>Hackathons</h3>
            <p>Our hackathons are intense coding events where our members work in teams to build innovative solutions to real-world problems. We provide our members with the resources and support they need to bring their ideas to life.</p>
          </article>
          <article className="card reveal">
            <h3>Networking Opportunities</h3>
            <p>CoRE provides its members with ample opportunities to network with industry professionals, alumni, and other students from across the country. We believe that networking is an essential part of personal and professional growth, and we encourage our members to make the most of these opportunities.</p>
          </article>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container reveal" style={{marginTop: '4rem', marginBottom: '4rem'}}>
        <h2 style={{textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem'}}>What Our Members Say</h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem'}}>
          Hear from students who have grown with CoRE and made meaningful contributions to the tech community.
        </p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto'}}>
          {[
            { name: 'Shreyas Rao', role: 'Point of Contact', quote: 'CoRE gave me the platform to connect with industry professionals and work on real-world projects. The mentorship and collaborative environment helped me grow both technically and personally.', domain: 'Industry Relations' },
            { name: 'Prajnashankari M N', role: 'Tech Support Lead', quote: 'Being part of CoRE has been transformative. I\'ve learned so much about infrastructure, system design, and leading technical teams. The hands-on experience is invaluable.', domain: 'Tech Infrastructure' },
            { name: 'Jnanesh Sharma H', role: 'Design & Development Lead', quote: 'CoRE provided me with opportunities to work on meaningful projects and build a portfolio. The community support and learning resources are exceptional.', domain: 'Web Development' }
          ].map((testimonial, i) => (
            <article key={i} className="card reveal" data-reveal-child style={{padding: '2rem', position: 'relative'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem', opacity: 0.7}}>"</div>
              <p style={{fontSize: '1rem', lineHeight: '1.7', color: 'var(--text)', marginBottom: '1.5rem', fontStyle: 'italic'}}>
                {testimonial.quote}
              </p>
              <div style={{borderTop: '1px solid var(--border)', paddingTop: '1rem'}}>
                <div style={{fontWeight: '600', marginBottom: '0.25rem'}}>{testimonial.name}</div>
                <div style={{fontSize: '0.9rem', color: 'var(--brand-primary)', marginBottom: '0.25rem'}}>{testimonial.role}</div>
                <div style={{fontSize: '0.85rem', color: 'var(--muted)'}}>{testimonial.domain}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="join" className="container reveal" style={{background: 'var(--surface)', padding: '3rem 2rem', borderRadius: '16px', marginTop: '3rem', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem'}}>Join CoRE</h2>
        <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.1rem', color: 'var(--muted)'}}>
          Joining CoRE is easy and comes with a range of benefits. As a member, you'll have access to all our events and activities, as well as our community, where you can connect with other members and share your work.
        </p>
        <div className="cards" style={{marginBottom: '2rem'}}>
          <article className="card reveal">
            <Icon name="target" size="2rem" color="var(--brand-primary)" style={{marginBottom: '0.75rem'}} />
            <h3>Benefits of Membership</h3>
            <p>Gain exclusive access to workshops, competitions, and networking events designed to enhance your skills and career prospects.</p>
          </article>
          <article className="card reveal">
            <Icon name="rocket" size="2rem" color="var(--brand-primary)" style={{marginBottom: '0.75rem'}} />
            <h3>Access to All Events</h3>
            <p>Participate in hackathons, coding competitions, technical workshops, and guest lectures from industry experts.</p>
          </article>
          <article className="card reveal">
            <Icon name="users" size="2rem" color="var(--brand-primary)" style={{marginBottom: '0.75rem'}} />
            <h3>Online Community</h3>
            <p>Connect with fellow members, share your projects, collaborate on ideas, and get support from our vibrant community.</p>
          </article>
        </div>
        <div style={{textAlign: 'center'}}>
          <p className="hero-cta reveal">
            <a className="btn primary" href="/join" style={{padding: '0.85rem 2rem', fontSize: '1.05rem'}}>Join Now →</a>
          </p>
          <p className="lead reveal" style={{marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0', fontSize: '1rem'}}>
            Join CoRE today and take the first step towards a brighter future. Our community of engineering students is waiting for you.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="reveal" style={{marginTop: '4rem', marginBottom: '3rem'}}>
        <Newsletter />
      </section>
    </div>
  )
}
