'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function PageLoader() {
  // Start with false to avoid hydration mismatch - loader mounts on client only
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Only show loader after component mounts on client
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Eased progress - starts fast, slows down
        const increment = Math.max(1, 15 - prev / 8)
        return Math.min(100, prev + increment)
      })
    }, 40)

    // Complete loading after minimum display time
    const minLoadTime = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 400)
    }, 1200)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(minLoadTime)
    }
  }, [mounted])

  // Don't render anything on server or before mount
  if (!mounted) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo text reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter"
              >
                Ines Raziborsky
              </motion.h1>
            </div>

            {/* Progress bar */}
            <div className="w-48 sm:w-64 h-[1px] bg-border overflow-hidden">
              <motion.div
                className="h-full bg-foreground origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground tabular-nums"
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
