'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} as const

export function GalleryAnimated({ artworks }: GalleryAnimatedProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
    >
      {artworks.map((artwork, index) => (
        <motion.div key={artwork._id} variants={item} className="group">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-6">
            {artwork.image && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                className="w-full h-full"
              >
                <Image
                  src={urlFor(artwork.image).width(1200).quality(90).url()}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-serif tracking-tight">{artwork.title}</h3>
            <div className="font-sans text-sm text-muted-foreground space-y-1 uppercase tracking-wider">
              {artwork.year && <p>{artwork.year}</p>}
              {artwork.medium && <p>{artwork.medium}</p>}
              {artwork.dimensions && <p>{artwork.dimensions}</p>}
            </div>
            {artwork.description && (
              <p className="font-sans text-sm text-muted-foreground pt-2 leading-relaxed">
                {artwork.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
