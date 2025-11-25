import React from 'react'

export default function DoodleNetwork(props){
  return (
    <svg {...props} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="40" r="8" fill="var(--doodle-accent)" />
        <circle cx="160" cy="40" r="8" fill="var(--doodle-accent)" />
        <circle cx="100" cy="100" r="10" fill="var(--doodle-accent)" />
        <circle cx="40" cy="160" r="8" fill="var(--doodle-accent)" />
        <circle cx="160" cy="160" r="8" fill="var(--doodle-accent)" />
        <path d="M48 48 L92 92 L152 32" opacity="0.9" />
        <path d="M48 152 L92 108 L152 168" opacity="0.7" />
      </g>
    </svg>
  )
}
