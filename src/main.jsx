import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles.css'
import initReveal from './utils/reveal'
import initParallax from './utils/parallax'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HashRouter>
  </React.StrictMode>
)

// Initialize reveal animations (non-blocking)
setTimeout(()=>{
  try{ initReveal() }catch(e){ /* ignore */ }
},250)

// Initialize parallax decorations
setTimeout(()=>{
  try{ initParallax() }catch(e){ /* ignore */ }
},300)

// Trigger a simple page reveal animation by toggling a class on the <html> element
// This allows CSS to animate elements marked with `.page-reveal` without layout thrash.
setTimeout(()=>{
  try{
    document.documentElement.classList.add('page-loaded')
  }catch(e){}
},80)

// Custom cursor: simple follow-dot for a more immersive feel
;(function initCursor(){
  try{
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if(prefersReduced) return // hide fancy cursor for reduced-motion
    const dot = document.createElement('div')
    dot.className = 'custom-cursor'
    document.body.appendChild(dot)
    let mx=0,my=0,x=0,y=0
    document.addEventListener('mousemove', (e)=>{ mx=e.clientX; my=e.clientY; dot.style.opacity = 1 })
    function raf(){ x += (mx - x) * 0.14; y += (my - y) * 0.14; dot.style.transform = `translate(${x}px, ${y}px)`; requestAnimationFrame(raf) }
    raf()
  }catch(e){}
})()

// Tilt effect: small mousemove -> rotate transform for elements with data-tilt or .tilt
;(function initTilt(){
  try{
    const els = document.querySelectorAll('[data-tilt], .tilt')
    els.forEach(el=>{
      el.addEventListener('mousemove', (ev)=>{
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5
        const py = (ev.clientY - r.top) / r.height - 0.5
        const rx = (-py) * 6
        const ry = (px) * 8
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      })
      el.addEventListener('mouseleave', ()=>{ el.style.transform = '' })
    })
  }catch(e){}
})()
