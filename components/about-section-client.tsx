'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { useState, useEffect } from 'react'

interface AboutSectionClientProps {
  name: string
  bio: any[]
  profileImageUrl: string | null
  email?: string
  instagram?: string
}

const ease = [0.22, 1, 0.36, 1] as const

export function AboutSectionClient({
  name,
  bio,
  profileImageUrl,
  email,
  instagram,
}: AboutSectionClientProps) {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render static version on server and before mount
  if (!mounted) {
    return (
      <section id="about" className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 bg-neutral-50 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="overflow-hidden mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-center">
              About the Artist
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-8 sm:gap-12 md:gap-16 items-start">
            {profileImageUrl && (
              <div className="md:col-span-2 relative aspect-[3/4] overflow-hidden">
                <Image
                  src={profileImageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={`space-y-8 ${profileImageUrl ? 'md:col-span-3' : 'md:col-span-5'}`}>
              <div className="font-sans text-muted-foreground prose prose-lg max-w-none leading-relaxed text-sm sm:text-base md:text-lg">
                <PortableText value={bio} />
              </div>
              {(email || instagram) && (
                <div id="contact" className="pt-8 space-y-4 font-sans text-xs sm:text-sm uppercase tracking-[0.2em]">
                  {email && <p><a href={`mailto:${email}`}>{email}</a></p>}
                  {instagram && <p><a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">@{instagram}</a></p>}
                </div>
              )}
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
          {profileImageUrl && (
            <motion.div
              className="md:col-span-2 relative aspect-[3/4] overflow-hidden"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, ease }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="w-full h-full"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.8, ease }}
              >
                <Image
                  src={profileImageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Content with staggered reveal */}
          <motion.div
            className={`space-y-8 ${profileImageUrl ? 'md:col-span-3' : 'md:col-span-5'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Bio text */}
            <div className="font-sans text-muted-foreground prose prose-lg max-w-none leading-relaxed text-sm sm:text-base md:text-lg">
              <PortableText value={bio} />
            </div>

            {/* Contact links with elegant hover */}
            {(email || instagram) && (
              <motion.div
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="pt-8 space-y-4 font-sans text-xs sm:text-sm uppercase tracking-[0.2em]"
              >
                {email && (
                  <p>
                    <a
                      href={`mailto:${email}`}
                      className="relative group inline-block"
                    >
                      <span>{email}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-500 group-hover:w-full" />
                    </a>
                  </p>
                )}
                {instagram && (
                  <p>
                    <a
                      href={`https://instagram.com/${instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group inline-block"
                    >
                      <span>@{instagram}</span>
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
