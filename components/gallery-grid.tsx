'use client'

import { motion } from 'framer-motion'
import { client } from '@/sanity/lib/client'
import { GalleryAnimated } from './gallery-animated'
import { useEffect, useState } from 'react'

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

const ease = [0.22, 1, 0.36, 1] as const

async function getArtworks(): Promise<Artwork[]> {
  const artworks = await client.fetch(`
    *[_type == "artwork"] | order(order asc, _createdAt desc) {
      _id,
      title,
      slug,
      image,
      description,
      medium,
      dimensions,
      year
    }
  `)
  return artworks
}

// Client wrapper for the section
function GalleryGridClient({ artworks }: { artworks: Artwork[] }) {
  if (artworks.length === 0) {
    return (
      <section id="gallery" className="py-24 sm:py-32 md:py-40 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6">
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="text-muted-foreground font-sans text-base sm:text-lg max-w-2xl mx-auto"
            >
              Add your first artwork in the{' '}
              <a href="/studio" className="underline hover:opacity-70 transition-opacity">
                Studio
              </a>
            </motion.p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-24 sm:py-32 md:py-40 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section header with animated elements */}
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
            {artworks.length} {artworks.length === 1 ? 'Piece' : 'Pieces'}
          </motion.p>
        </div>

        {/* Gallery grid */}
        <GalleryAnimated artworks={artworks} />
      </div>
    </section>
  )
}

// Server component that fetches data
export async function GalleryGrid() {
  const artworks = await getArtworks()
  return <GalleryGridClient artworks={artworks} />
}
