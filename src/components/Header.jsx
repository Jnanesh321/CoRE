import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

export default function Header(){
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try{
      return localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }catch(e){ return 'light' }
  })

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    try{ localStorage.setItem('theme', theme) }catch(e){}
    // Update favicon to match theme so tab icon matches the monochrome logo
    try{
      var mainFav = document.querySelector('link[rel="icon"]');
      if(mainFav){
        mainFav.href = theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
      }
    }catch(e){}
  },[theme])
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <Logo className="logo" />
          <span className="brand-name">CoRE</span>
        </Link>

        <nav className={`site-nav ${open? 'open':''}`} aria-label="Main navigation">
          <ul>
            <li><NavLink to="/" end onClick={()=>setOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/activities" onClick={()=>setOpen(false)}>Activities</NavLink></li>
            <li><NavLink to="/projects" onClick={()=>setOpen(false)}>Projects</NavLink></li>
            <li><NavLink to="/events" onClick={()=>setOpen(false)}>Events</NavLink></li>
            <li><NavLink to="/team" onClick={()=>setOpen(false)}>Team</NavLink></li>
            <li><NavLink to="/about" onClick={()=>setOpen(false)}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink></li>
            <li><NavLink to="/join" onClick={()=>setOpen(false)}>Join</NavLink></li>
          </ul>
        </nav>

        <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginLeft:'auto'}}>
          <button className="nav-toggle" aria-expanded={open} onClick={()=>setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
          <Link to="/login" className="btn ghost" style={{padding:'0.4rem 0.8rem',fontSize:'0.9rem',textDecoration:'none',whiteSpace:'nowrap'}}>
            Login
          </Link>
          <button aria-label="Toggle dark mode" className="theme-toggle" onClick={()=>setTheme(t=> t==='dark' ? 'light' : 'dark')} title="Toggle dark mode">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.03 2.05l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM20 11v2h3v-2h-3zM12 20v3h2v-3h-2zm4.24-1.76l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM6.76 19.16l-1.8 1.79L3.17 19.16l1.79-1.79 1.8 1.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
