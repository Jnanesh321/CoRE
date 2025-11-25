import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Lightweight SEO component - no dependencies, minimal memory
export default function SEO({ 
  title, 
  description, 
  image = '/favicon.svg',
  type = 'website' 
}) {
  const location = useLocation()
  const siteName = 'CoRE - VCET Puttur'
  const baseUrl = 'https://core.vcetputtur.ac.in'
  const fullUrl = baseUrl + location.pathname
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const defaultDescription = 'CoRE (Club of Robotics & Electronics) - The premier technical club at VCET Puttur. Join us to learn, build, and innovate in Web Dev, App Dev, AI/ML, IoT, Game Dev, and UI/UX Design.'

  useEffect(() => {
    // Update title
    document.title = fullTitle

    // Update or create meta tags
    const updateMeta = (name, content, attr = 'name') => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    // Standard meta tags
    updateMeta('description', description || defaultDescription)
    
    // Open Graph tags
    updateMeta('og:title', fullTitle, 'property')
    updateMeta('og:description', description || defaultDescription, 'property')
    updateMeta('og:url', fullUrl, 'property')
    updateMeta('og:type', type, 'property')
    updateMeta('og:image', baseUrl + image, 'property')
    updateMeta('og:site_name', siteName, 'property')
    
    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', fullTitle)
    updateMeta('twitter:description', description || defaultDescription)
    updateMeta('twitter:image', baseUrl + image)
    
    // Additional SEO
    updateMeta('robots', 'index, follow')
    updateMeta('googlebot', 'index, follow')

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)
  }, [fullTitle, description, fullUrl, image, type, defaultDescription, baseUrl])

  return null
}
