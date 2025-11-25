import React from 'react'

export default function DoodleTeam(props){
  return (
    <svg {...props} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* stylized team: three heads and connecting arcs */}
        <circle cx="60" cy="70" r="14" fill="var(--doodle-accent)" />
        <circle cx="100" cy="58" r="14" fill="var(--doodle-accent)" />
        <circle cx="140" cy="70" r="14" fill="var(--doodle-accent)" />
        <path d="M30 110c24-18 72-18 120 0" opacity="0.85" />
        <path d="M45 130c18-10 60-10 110 0" opacity="0.6" />
      </g>
    </svg>
  )
}
