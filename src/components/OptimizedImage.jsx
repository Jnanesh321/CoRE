import React, { useState, useEffect, useRef } from 'react'

export default function OptimizedImage({ 
  src, 
  alt, 
  width,
  height,
  blurDataURL,
  className = '',
  style = {},
  priority = false,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef(null)

  useEffect(() => {
    if (priority) return // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    background: blurDataURL || 'var(--surface)',
    ...style
  }

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0
  }

  const blurStyle = {
    position: 'absolute',
    inset: 0,
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease'
  }

  return (
    <div 
      ref={imgRef}
      className={className}
      style={containerStyle}
    >
      {blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          style={blurStyle}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          style={imgStyle}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      )}
    </div>
  )
}
