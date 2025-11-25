// Lightweight parallax: translateY based on scroll for elements with data-parallax attribute.
export default function initParallax(){
  if (typeof window === 'undefined') return
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const els = document.querySelectorAll('[data-parallax]')
  if (!els.length) return

  let raf = null
  function onScroll(){
    if (raf) return
    raf = requestAnimationFrame(()=>{
      const scrollY = window.scrollY || window.pageYOffset
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      els.forEach(el=>{
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2
        // compute offset relative to viewport center
        const rect = el.getBoundingClientRect()
        const offset = (rect.top + rect.height/2 - vh/2)
        const translate = -offset * speed * 0.06
        el.style.transform = `translateY(${translate}px)`
      })
      raf = null
    })
  }
  onScroll()
  window.addEventListener('scroll', onScroll, {passive:true})
  window.addEventListener('resize', onScroll)
}
