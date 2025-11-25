import React from 'react'

// Professional geometric overlay: minimal tech-inspired shapes that complement
// the brand aesthetic. Clean lines, circuits, and grids with subtle animation.
export default function DoodleOverlay(){
  return (
    <div className="doodle-overlay" aria-hidden="true">

      {/* left-top: circuit board pattern */}
      <svg className="doodle doodle-1 float-slow" viewBox="0 0 160 160" width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="1.5" opacity="0.6">
          <rect x="30" y="30" width="40" height="40" rx="2" />
          <rect x="90" y="30" width="40" height="40" rx="2" />
          <rect x="30" y="90" width="40" height="40" rx="2" />
          <line x1="70" y1="50" x2="90" y2="50" strokeWidth="2" />
          <line x1="50" y1="70" x2="50" y2="90" strokeWidth="2" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="110" cy="50" r="3" fill="currentColor" />
          <circle cx="50" cy="110" r="3" fill="currentColor" />
        </g>
      </svg>

      {/* right-top: geometric grid */}
      <svg className="doodle doodle-2 float-slower" viewBox="0 0 180 180" width="240" height="240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="1.2" opacity="0.5">
          <path d="M40 40 L140 40 L140 140 L40 140 Z" />
          <path d="M40 90 L140 90 M90 40 L90 140" />
          <circle cx="90" cy="90" r="30" />
          <circle cx="40" cy="40" r="4" fill="currentColor" />
          <circle cx="140" cy="40" r="4" fill="currentColor" />
          <circle cx="140" cy="140" r="4" fill="currentColor" />
          <circle cx="40" cy="140" r="4" fill="currentColor" />
        </g>
      </svg>

      {/* left-bottom: minimal network nodes */}
      <svg className="doodle doodle-3 float-slower" viewBox="0 0 140 140" width="160" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="1.5" opacity="0.55">
          <line x1="30" y1="30" x2="70" y2="70" />
          <line x1="70" y1="70" x2="110" y2="50" />
          <line x1="70" y1="70" x2="90" y2="110" />
          <circle cx="30" cy="30" r="5" fill="currentColor" />
          <circle cx="70" cy="70" r="6" fill="currentColor" />
          <circle cx="110" cy="50" r="5" fill="currentColor" />
          <circle cx="90" cy="110" r="5" fill="currentColor" />
        </g>
      </svg>

    </div>
  )
}
