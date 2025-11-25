import React, { useState, useEffect } from 'react'
import Icon from '../components/Icon'
import SEO from '../components/SEO'

// Netlify serverless functions base URL (supports local dev with netlify dev)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/.netlify/functions'

export default function Contact(){
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

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

  // Lightweight validation
  function validateField(name, value) {
    switch(name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format'
      case 'phone':
        return /^[\d\s\-\+\(\)]{10,}$/.test(value) ? '' : 'Invalid phone number'
      case 'firstName':
      case 'lastName':
        return value.trim().length >= 2 ? '' : 'Minimum 2 characters'
      case 'usn':
        return value.trim().length >= 5 ? '' : 'Invalid USN'
      default:
        return value.trim() ? '' : 'This field is required'
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    // Validate all fields
    const newErrors = {}
    for (let [name, value] of formData.entries()) {
      if (name !== 'bot-field' && name !== 'form-name') {
        const error = validateField(name, value)
        if (error) newErrors[name] = error
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus({ ok: false, msg: 'Please fix the errors below' })
      return
    }

    // Convert FormData to plain object for JSON submission
    const payload = {}
    for (let [name, value] of formData.entries()) {
      if (name !== 'bot-field' && name !== 'form-name') {
        payload[name] = value
      }
    }

    setLoading(true)
    setStatus(null)
    setErrors({})

    try {
      const res = await fetch(`${API_BASE_URL}/submit-application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      const json = await res.json()

      if (res.ok && json.success){
        setStatus({ ok: true, msg: 'Application submitted successfully! We will review it within 14 days.' })
        form.reset()
        setErrors({})
      } else {
        setStatus({ ok: false, msg: json.message || 'Submission failed. Please try again later.' })
        if (json.errors) setErrors(json.errors)
      }
    } catch (err) {
      console.error('Application submit error:', err)
      setStatus({ ok: false, msg: 'Network error. Please retry.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Join CoRE - Application Form" 
        description="Apply to join CoRE at VCET Puttur. Fill out the application form to become a Neurite and start your journey in tech. Learn from mentors and work on real projects."
      />
      
      <section className="hero">
        <div className="container hero-inner">
          <h1 style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: '800', letterSpacing: '-0.02em'}}>
            Join CoRE
          </h1>
          <p className="lead" style={{maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6'}}>
            Start your journey with CoRE! Join as a <strong style={{color: 'var(--brand-primary)'}}>Neurite</strong> and grow into a <strong style={{color: 'var(--brand-primary)'}}>CoRE Member</strong>.
          </p>
          <p style={{maxWidth: '650px', margin: '1rem auto 0', fontSize: '1rem', opacity: 0.8}}>
            Fill out the application form below to tell us about yourself and your interests.
          </p>
        </div>
      </section>

      <div className="container" style={{paddingTop: '2rem'}}>

      {/* Why Join CoRE Section */}
      <section className="reveal" style={{marginBottom: '3rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{marginBottom: '2rem', textAlign: 'center', fontSize: '1.8rem'}}>Why Join CoRE?</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem'}}>
          {[
            { icon: 'rocket', text: 'Work on real-world collaborative projects' },
            { icon: 'graduation', text: 'Learn from experienced mentors and industry professionals' },
            { icon: 'users', text: 'Network with like-minded tech enthusiasts' },
            { icon: 'zap', text: 'Access to exclusive workshops and hackathons' },
            { icon: 'chart', text: 'Grow from Neurite to CoRE Member through contributions' },
            { icon: 'trophy', text: 'Recognition for your technical contributions' }
          ].map((item, i) => (
            <div key={i} className="card" style={{padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'transform 0.2s ease, box-shadow 0.2s ease'}}>
              <Icon name={item.icon} size="1.75rem" color="var(--brand-primary)" style={{flexShrink: 0, marginTop: '0.25rem'}} />
              <span style={{fontSize: '1rem', lineHeight: '1.5'}}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="reveal" style={{marginBottom: '3rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.75rem'}}>Why Members Love CoRE</h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem'}}>
          Don't just take our word for it. Here's what our members have to say about their CoRE experience.
        </p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
          {[
            { name: 'Rahul Verma', role: 'Neurite, 2nd Year CSE', quote: 'CoRE has been an amazing learning journey. The workshops and mentorship helped me build my first ML project. The community is incredibly supportive!', icon: 'brain' },
            { name: 'Sneha Singh', role: 'Neurite, 1st Year ISE', quote: 'As a beginner, I was nervous about joining. But CoRE made me feel welcome. I\'ve learned Flutter and built my first mobile app with their guidance.', icon: 'mobile' },
            { name: 'Vikram Shetty', role: 'Neurite, 2nd Year ISE', quote: 'The game development workshops opened up a whole new world for me. Working on Unity projects with the team has been the highlight of my college experience.', icon: 'gamepad' }
          ].map((testimonial, i) => (
            <div key={i} className="card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
              <Icon name={testimonial.icon} size="3rem" color="var(--brand-primary)" style={{marginBottom: '1.25rem'}} />
              <p style={{fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text)', marginBottom: '1.5rem', fontStyle: 'italic', flex: 1}}>
                "{testimonial.quote}"
              </p>
              <div style={{borderTop: '1px solid var(--border)', paddingTop: '1rem', width: '100%'}}>
                <div style={{fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text)'}}>{testimonial.name}</div>
                <div style={{fontSize: '0.85rem', color: 'var(--muted)'}}>{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="reveal" style={{marginBottom: '3rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{marginBottom: '0.75rem', textAlign: 'center', fontSize: '1.8rem'}}>Application Form</h2>
        <p style={{textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem'}}>
          Tell us about yourself and why you'd like to join our community
        </p>

        <form className="contact-form" name="contact" onSubmit={handleSubmit} data-netlify="true" netlify-honeypot="bot-field" style={{maxWidth: '800px', margin: '0 auto'}}>
        {/* Netlify form detection fields */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        
        {/* Personal Information */}
        <fieldset style={{border: 'none', padding: 0, marginBottom: '2rem'}}>
          <legend style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--brand-primary)'}}>Personal Information</legend>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
            <div>
              <label htmlFor="firstName">First Name *</label>
              <input 
                id="firstName" 
                name="firstName" 
                type="text" 
                placeholder="John" 
                onBlur={handleBlur}
                required 
                style={{borderColor: errors.firstName ? '#ef4444' : undefined}}
              />
              {errors.firstName && <span style={{fontSize: '0.85rem', color: '#ef4444', marginTop: '0.25rem', display: 'block'}}>{errors.firstName}</span>}
            </div>
            <div>
              <label htmlFor="lastName">Last Name *</label>
              <input 
                id="lastName" 
                name="lastName" 
                type="text" 
                placeholder="Doe" 
                onBlur={handleBlur}
                required 
                style={{borderColor: errors.lastName ? '#ef4444' : undefined}}
              />
              {errors.lastName && <span style={{fontSize: '0.85rem', color: '#ef4444', marginTop: '0.25rem', display: 'block'}}>{errors.lastName}</span>}
            </div>
          </div>

          <label htmlFor="email">Email Address *</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="john.doe@example.com" 
            onBlur={handleBlur}
            required 
            style={{borderColor: errors.email ? '#ef4444' : undefined}}
          />
          {errors.email && <span style={{fontSize: '0.85rem', color: '#ef4444', marginTop: '0.25rem', display: 'block'}}>{errors.email}</span>}

          <label htmlFor="phone">Phone Number *</label>
          <input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="+91 98765 43210" 
            onBlur={handleBlur}
            required 
            style={{borderColor: errors.phone ? '#ef4444' : undefined}}
          />
          {errors.phone && <span style={{fontSize: '0.85rem', color: '#ef4444', marginTop: '0.25rem', display: 'block'}}>{errors.phone}</span>}
        </fieldset>

        {/* Academic Information */}
        <fieldset style={{border: 'none', padding: 0, marginBottom: '2rem'}}>
          <legend style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--brand-primary)'}}>Academic Information</legend>
          
          <label htmlFor="college">College/Institution *</label>
          <input id="college" name="college" type="text" placeholder="e.g., VCET Puttur" defaultValue="VCET Puttur" required />

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
            <div>
              <label htmlFor="year">Current Year *</label>
              <select id="year" name="year" required style={{padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem', width: '100%'}}>
                <option value="">Select your year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>
            <div>
              <label htmlFor="branch">Branch/Department *</label>
              <select id="branch" name="branch" required style={{padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem', width: '100%'}}>
                <option value="">Select branch</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="ISE">Information Science (ISE)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EEE">Electrical & Electronics (EEE)</option>
                <option value="ME">Mechanical (ME)</option>
                <option value="CV">Civil (CV)</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <label htmlFor="usn">USN (University Seat Number) <span style={{color: 'var(--muted)', fontSize: '0.9rem'}}>(Required for 2nd year and above)</span></label>
          <input id="usn" name="usn" type="text" placeholder="e.g., 4VP22CS123" />
        </fieldset>

        {/* Technical Background */}
        <fieldset style={{border: 'none', padding: 0, marginBottom: '2rem'}}>
          <legend style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--brand-primary)'}}>Technical Background</legend>
          
          <label htmlFor="interests">Technical Interests/Domains *</label>
          <input id="interests" name="interests" type="text" placeholder="e.g., Web Development, AI/ML, IoT, Mobile Apps, UI/UX" required />

          <label htmlFor="skills">Skills & Technologies *</label>
          <textarea 
            id="skills" 
            name="skills" 
            rows="3" 
            placeholder="List your technical skills and technologies you're familiar with (e.g., Python, JavaScript, React, C++, Git, Figma, etc.)"
            required
          ></textarea>

          <label htmlFor="experience">Past Experience & Projects</label>
          <textarea 
            id="experience" 
            name="experience" 
            rows="4" 
            placeholder="Tell us about any projects you've worked on, hackathons attended, competitions participated in, or relevant experience. If you're a beginner, mention what you've learned so far."
          ></textarea>

          <label htmlFor="github">GitHub Profile (Optional)</label>
          <input id="github" name="github" type="url" placeholder="https://github.com/yourusername" />

          <label htmlFor="portfolio">Portfolio/Personal Website (Optional)</label>
          <input id="portfolio" name="portfolio" type="url" placeholder="https://yourwebsite.com" />
        </fieldset>

        {/* Interest & Motivation */}
        <fieldset style={{border: 'none', padding: 0, marginBottom: '2rem'}}>
          <legend style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--brand-primary)'}}>Your Interest in CoRE</legend>
          
          <label htmlFor="preferredTeam">Which team would you like to join? *</label>
          <select id="preferredTeam" name="preferredTeam" required style={{padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem', width: '100%'}}>
            <option value="">Select a team</option>
            <option value="Tech Support - Frontend">Tech Support - Frontend Development</option>
            <option value="Tech Support - Backend">Tech Support - Backend Development</option>
            <option value="Tech Support - DevOps">Tech Support - DevOps/Infrastructure</option>
            <option value="Design - UI/UX">Design - UI/UX Design</option>
            <option value="Design - Graphics">Design - Graphic Design</option>
            <option value="PoC">Point of Contact (PoC)</option>
            <option value="Not Sure">Not Sure Yet / Open to All</option>
          </select>

          <label htmlFor="motivation">Why do you want to join CoRE? *</label>
          <textarea 
            id="motivation" 
            name="motivation" 
            rows="5" 
            placeholder="Tell us what motivates you to join CoRE, what you hope to learn and contribute, and how you plan to grow with the community..."
            required
          ></textarea>

          <label htmlFor="availability">Weekly Time Commitment</label>
          <select id="availability" name="availability" style={{padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg)', color: 'var(--text)', fontSize: '1rem', width: '100%'}}>
            <option value="">How many hours can you contribute per week?</option>
            <option value="2-5">2-5 hours per week</option>
            <option value="5-10">5-10 hours per week</option>
            <option value="10-15">10-15 hours per week</option>
            <option value="15+">15+ hours per week</option>
          </select>
        </fieldset>

        <button 
          type="submit" 
          className="btn primary" 
          disabled={loading}
          style={{
            width: '100%', 
            padding: '1rem', 
            fontSize: '1.1rem', 
            marginTop: '1rem',
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? (
            <>
              <span style={{
                width: '16px',
                height: '16px',
                border: '2px solid currentColor',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite'
              }} />
              Submitting...
            </>
          ) : (
            'Submit Application →'
          )}
        </button>
      </form>

      {status && (
        <p role="status" style={{
          marginTop:'1.5rem', 
          padding: '1rem', 
          borderRadius: '8px', 
          background: status.ok ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
          color: status.ok ? '#10b981' : '#ef4444',
          border: `1px solid ${status.ok ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          textAlign: 'center', 
          fontWeight: '600'
        }}>
          {status.msg}
        </p>
      )}
      </section>

      {/* Contact Info Section */}
      <section className="reveal" style={{marginBottom: '3rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)'}}>
        <h2 style={{marginBottom: '1rem', fontSize: '1.8rem'}}>Have Questions?</h2>
        <p style={{marginBottom: '2rem', color: 'var(--muted)', fontSize: '1rem'}}>Feel free to reach out to us for any queries about the application process or CoRE in general.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <Icon name="link" size="1.25rem" color="var(--brand-primary)" style={{marginTop: '0.25rem'}} />
            <div>
              <strong style={{display: 'block', marginBottom: '0.25rem'}}>Email</strong>
              <a href="mailto:core@vcetputtur.ac.in" style={{color: 'var(--brand-primary)', textDecoration: 'none'}}>core@vcetputtur.ac.in</a>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
            <Icon name="target" size="1.25rem" color="var(--brand-primary)" style={{marginTop: '0.25rem'}} />
            <div>
              <strong style={{display: 'block', marginBottom: '0.25rem'}}>Address</strong>
              <span style={{color: 'var(--muted)'}}>VCET, Neharu Nagara, Puttur</span>
            </div>
          </div>
        </div>

        <div>
          <p style={{fontWeight: '600', marginBottom: '1rem'}}>Connect with us:</p>
          <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            <a href="https://www.linkedin.com/company/core-vcet/" target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
              <Icon name="link" size="1rem" />
              LinkedIn
            </a>
            <a href="https://www.youtube.com/@CoRE-VCET" target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
              <Icon name="link" size="1rem" />
              YouTube
            </a>
            <a href="https://www.instagram.com/core.vcet" target="_blank" rel="noopener noreferrer" className="btn ghost" style={{fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
              <Icon name="link" size="1rem" />
              Instagram
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
