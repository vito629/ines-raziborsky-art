'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { useState, useEffect } from 'react'

interface Artwork {
  _id: string
  title: string
  slug: { current: string }
  image: any
  description?: string
  medium?: string
  dimensions?: string
  year?: number
}

interface GalleryAnimatedProps {
  artworks: Artwork[]
}

const ease = [0.22, 1, 0.36, 1] as const

// Staggered reveal for gallery items
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
} as const

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
} as const

// Image reveal with curtain effect
const imageRevealVariants = {
  hidden: {
    clipPath: 'inset(0 0 100% 0)',
  },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 1.2,
      ease,
      delay: 0.1,
    },
  },
} as const

// Individual artwork card with hover effects
function ArtworkCard({ artwork, index }: { artwork: Artwork; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Static render before mount
  if (!mounted) {
    return (
      <article className="group">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6 flex items-center justify-center">
          {artwork.image && (
            <Image
              src={urlFor(artwork.image).width(1200).quality(90).url()}
              alt={artwork.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-serif tracking-tight">{artwork.title}</h3>
          <div className="font-sans text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
            {artwork.year && <span>{artwork.year}</span>}
            {artwork.year && artwork.medium && <span> · </span>}
            {artwork.medium && <span>{artwork.medium}</span>}
          </div>
        </div>
      </article>
    )
  }

  return (
    <motion.article
      variants={itemVariants}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with reveal effect */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
        {artwork.image && (
          <>
            {/* Image with curtain reveal */}
            <motion.div
              className="absolute inset-0"
              variants={imageRevealVariants}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  scale: isHovered && !prefersReducedMotion ? 1.05 : 1,
                }}
                transition={{ duration: 0.6, ease }}
                style={{ willChange: isHovered ? 'transform' : 'auto' }}
              >
                <Image
                  src={urlFor(artwork.image).width(1200).quality(90).url()}
                  alt={artwork.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            </motion.div>

            {/* Subtle overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.05 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Number indicator */}
            <div className="absolute top-4 left-4 font-sans text-[10px] uppercase tracking-widest text-white mix-blend-difference opacity-60">
              {String(index + 1).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title with underline animation */}
        <h3 className="text-xl sm:text-2xl font-serif tracking-tight relative inline-block">
          <span>{artwork.title}</span>
          <motion.span
            className="absolute bottom-0 left-0 h-[1px] bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : 0 }}
            transition={{ duration: 0.4, ease }}
          />
        </h3>

        {/* Meta info - single line */}
        <div className="font-sans text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
          {artwork.year && <span>{artwork.year}</span>}
          {artwork.year && artwork.medium && <span className="mx-2">·</span>}
          {artwork.medium && <span>{artwork.medium}</span>}
        </div>

        {/* Dimensions on hover */}
        {artwork.dimensions && (
          <motion.p
            className="font-sans text-xs text-muted-foreground/70 uppercase tracking-wider"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {artwork.dimensions}
          </motion.p>
        )}
      </div>
    </motion.article>
  )
}

export function GalleryAnimated({ artworks }: GalleryAnimatedProps) {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-20">
        {artworks.map((artwork, index) => (
          <ArtworkCard key={artwork._id} artwork={artwork} index={index} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-20"
    >
      {artworks.map((artwork, index) => (
        <ArtworkCard key={artwork._id} artwork={artwork} index={index} />
      ))}
    </motion.div>
  )
}
