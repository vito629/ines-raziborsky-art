'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

interface GallerySectionHeaderProps {
  count: number
}

export function GallerySectionHeader({ count }: GallerySectionHeaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render static version on server and before mount
  if (!mounted) {
    return (
      <div className="text-center mb-16 sm:mb-20 md:mb-24">
        <div className="w-16 h-[1px] bg-foreground/30 mx-auto mb-8" />
        <div className="overflow-hidden">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight">
            Selected Works
          </h2>
        </div>
        <p className="mt-6 text-muted-foreground font-sans text-sm sm:text-base uppercase tracking-[0.2em]">
          {count} {count === 1 ? 'Piece' : 'Pieces'}
        </p>
      </div>
    )
  }

  return (
    <div className="text-center mb-16 sm:mb-20 md:mb-24">
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
        className="w-16 h-[1px] bg-foreground/30 mx-auto mb-8"
      />

      {/* Title reveal */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight"
        >
          Selected Works
        </motion.h2>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 text-muted-foreground font-sans text-sm sm:text-base uppercase tracking-[0.2em]"
      >
        {count} {count === 1 ? 'Piece' : 'Pieces'}
      </motion.p>
    </div>
  )
}
