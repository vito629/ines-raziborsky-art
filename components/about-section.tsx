'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { useEffect, useState } from 'react'

interface AboutData {
  name: string
  bio: any[]
  profileImage?: any
  email?: string
  instagram?: string
}

interface AboutSectionClientProps {
  about: AboutData | null
}

const ease = [0.22, 1, 0.36, 1] as const

// Text reveal animation
const textRevealVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease,
    },
  }),
} as const

// Image reveal animation
const imageRevealVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease,
    },
  },
} as const

export function AboutSectionClient({ about }: AboutSectionClientProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  if (!about) {
    return (
      <section id="about" className="py-24 sm:py-32 md:py-40 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight mb-8"
          >
            About
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="text-muted-foreground font-sans text-base sm:text-lg"
          >
            Add artist information in the{' '}
            <a href="/studio" className="underline hover:opacity-70 transition-opacity">
              Studio
            </a>
          </motion.p>
        </div>
      </section>
    )
  }

  if (prefersReducedMotion) {
    return (
      <section id="about" className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 bg-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-center mb-16 sm:mb-24">
            About the Artist
          </h2>
          <div className="grid md:grid-cols-5 gap-8 sm:gap-12 md:gap-16 items-start">
            {about.profileImage && (
              <div className="md:col-span-2 relative aspect-[3/4] overflow-hidden">
                <Image
                  src={urlFor(about.profileImage).width(1000).quality(90).url()}
                  alt={about.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={`space-y-8 ${about.profileImage ? 'md:col-span-3' : 'md:col-span-5'}`}>
              <div className="font-sans text-muted-foreground prose prose-lg max-w-none leading-relaxed">
                <PortableText value={about.bio} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section title with reveal */}
        <div className="overflow-hidden mb-16 sm:mb-24">
          <motion.h2
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-center"
          >
            About the Artist
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Profile Image with reveal */}
          {about.profileImage && (
            <motion.div
              className="md:col-span-2 relative aspect-[3/4] overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0"
                variants={imageRevealVariants}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <Image
                    src={urlFor(about.profileImage).width(1000).quality(90).url()}
                    alt={about.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Content with staggered reveal */}
          <motion.div
            className={`space-y-8 ${about.profileImage ? 'md:col-span-3' : 'md:col-span-5'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Bio text */}
            <motion.div
              custom={0}
              variants={textRevealVariants}
              className="font-sans text-muted-foreground prose prose-lg max-w-none leading-relaxed text-sm sm:text-base md:text-lg"
            >
              <PortableText value={about.bio} />
            </motion.div>

            {/* Contact links with elegant hover */}
            {(about.email || about.instagram) && (
              <motion.div
                id="contact"
                custom={1}
                variants={textRevealVariants}
                className="pt-8 space-y-4 font-sans text-xs sm:text-sm uppercase tracking-[0.2em]"
              >
                {about.email && (
                  <p>
                    <a
                      href={`mailto:${about.email}`}
                      className="relative group inline-block"
                    >
                      <span>{about.email}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-500 group-hover:w-full" />
                    </a>
                  </p>
                )}
                {about.instagram && (
                  <p>
                    <a
                      href={`https://instagram.com/${about.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group inline-block"
                    >
                      <span>@{about.instagram}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-500 group-hover:w-full" />
                    </a>
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Server component wrapper to fetch data
import { client } from '@/sanity/lib/client'

async function getAbout(): Promise<AboutData | null> {
  const about = await client.fetch(`
    *[_type == "about"][0] {
      name,
      bio,
      profileImage,
      email,
      instagram
    }
  `)
  return about
}

export async function AboutSection() {
  const about = await getAbout()
  return <AboutSectionClient about={about} />
}
