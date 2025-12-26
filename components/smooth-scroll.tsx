'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is touch-based mobile
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 1024
      return hasTouch && isSmallScreen
    }

    setIsMobile(checkMobile())

    // Don't initialize Lenis on mobile - native scroll is better
    if (checkMobile()) {
      return
    }

    const lenis = new Lenis({
      duration: 1.0, // Slightly faster for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0, // Disable on touch
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle window resize
    const handleResize = () => {
      if (checkMobile()) {
        lenis.destroy()
        setIsMobile(true)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return null
}
