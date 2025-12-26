import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { AboutSectionClient } from './about-section-client'

interface AboutData {
  name: string
  bio: any[]
  profileImage?: any
  email?: string
  instagram?: string
}

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

  if (!about) {
    return (
      <section id="about" className="py-24 sm:py-32 md:py-40 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight mb-8">
            About
          </h2>
          <p className="text-muted-foreground font-sans text-base sm:text-lg">
            Add artist information in the{' '}
            <a href="/studio" className="underline hover:opacity-70 transition-opacity">
              Studio
            </a>
          </p>
        </div>
      </section>
    )
  }

  // Pre-generate the image URL on the server
  const profileImageUrl = about.profileImage
    ? urlFor(about.profileImage).width(1000).quality(90).url()
    : null

  return (
    <AboutSectionClient
      name={about.name}
      bio={about.bio}
      profileImageUrl={profileImageUrl}
      email={about.email}
      instagram={about.instagram}
    />
  )
}
