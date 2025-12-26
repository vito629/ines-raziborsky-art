'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { useState } from 'react'

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
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
} as const

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease,
    },
  },
} as const

// Individual artwork card with hover effects
function ArtworkCard({ artwork, index }: { artwork: Artwork; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      variants={itemVariants}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
        {artwork.image && (
          <>
            {/* Image with parallax effect on hover */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered && !prefersReducedMotion ? 1.1 : 1,
              }}
              transition={{ duration: 0.8, ease }}
              style={{ willChange: isHovered ? 'transform' : 'auto' }}
            >
              <Image
                src={urlFor(artwork.image).width(1200).quality(90).url()}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Number indicator */}
            <motion.div
              className="absolute top-4 left-4 font-sans text-xs uppercase tracking-widest text-white mix-blend-difference"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title with underline animation */}
        <h3 className="text-xl sm:text-2xl font-serif tracking-tight relative inline-block">
          <span>{artwork.title}</span>
          <motion.span
            className="absolute bottom-0 left-0 h-[1px] bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : 0 }}
            transition={{ duration: 0.5, ease }}
          />
        </h3>

        {/* Meta info */}
        <div className="font-sans text-xs sm:text-sm text-muted-foreground space-y-1 uppercase tracking-wider">
          {artwork.year && (
            <motion.p
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              {artwork.year}
            </motion.p>
          )}
          {artwork.medium && (
            <motion.p
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {artwork.medium}
            </motion.p>
          )}
          {artwork.dimensions && (
            <motion.p
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {artwork.dimensions}
            </motion.p>
          )}
        </div>

        {/* Description with reveal */}
        {artwork.description && (
          <motion.p
            className="font-sans text-sm text-muted-foreground pt-2 leading-relaxed line-clamp-3"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {artwork.description}
          </motion.p>
        )}
      </div>
    </motion.article>
  )
}

export function GalleryAnimated({ artworks }: GalleryAnimatedProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16">
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16"
    >
      {artworks.map((artwork, index) => (
        <ArtworkCard key={artwork._id} artwork={artwork} index={index} />
      ))}
    </motion.div>
  )
}
