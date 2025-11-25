// Lightweight IntersectionObserver-based reveal utility
export default function initReveal(){
  if (typeof window === 'undefined') return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const els = document.querySelectorAll('.reveal, .reveal-on-scroll')
  if (!els.length) return

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){
        const el = e.target

        // Handle staggered children if requested
        const staggerMs = parseInt(el.getAttribute('data-stagger') || '0', 10)
        if (staggerMs > 0){
          // Prefer explicit child selector
          let children = el.querySelectorAll('[data-reveal-child]')
          if (!children.length) children = el.children
          Array.from(children).forEach((ch, i)=>{
            ch.classList.add('reveal-item')
            ch.style.transitionDelay = `${i * staggerMs}ms`
          })
        }

        el.classList.add('revealed')
        // Optionally unobserve to avoid repeated callbacks
        io.unobserve(el)
      }
    })
  },{threshold: 0.12})

  els.forEach(el=> io.observe(el))
}
