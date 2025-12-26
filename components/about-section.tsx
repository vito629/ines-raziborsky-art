import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'

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
      <section id="about" className="py-40 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">About</h2>
          <p className="text-muted-foreground font-sans text-lg">
            Add artist information in the{' '}
            <a href="/studio" className="underline hover:opacity-70 transition-opacity">
              Studio
            </a>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-40 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-center mb-24">
          About the Artist
        </h2>
        <div className="grid md:grid-cols-5 gap-16 items-start">
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
            {(about.email || about.instagram) && (
              <div id="contact" className="pt-8 space-y-4 font-sans text-sm uppercase tracking-widest">
                {about.email && (
                  <p>
                    <a
                      href={`mailto:${about.email}`}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {about.email}
                    </a>
                  </p>
                )}
                {about.instagram && (
                  <p>
                    <a
                      href={`https://instagram.com/${about.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      @{about.instagram}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
