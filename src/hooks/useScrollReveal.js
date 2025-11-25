import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'none'
            // Unobserve after revealing (performance optimization)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all elements with reveal class
    const reveals = document.querySelectorAll('.reveal, [data-reveal-child]')
    reveals.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
