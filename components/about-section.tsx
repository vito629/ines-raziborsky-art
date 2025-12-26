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
      <section id="about" className="py-32 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">About</h2>
          <p className="text-muted-foreground font-sans">
            Add your artist information in the{' '}
            <a href="/studio" className="underline hover:text-foreground">
              Studio
            </a>
            .
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">
          About
        </h2>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {about.profileImage && (
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={urlFor(about.profileImage).width(800).url()}
                alt={about.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif">{about.name}</h3>
            <div className="font-sans text-muted-foreground prose prose-lg">
              <PortableText value={about.bio} />
            </div>
            {(about.email || about.instagram) && (
              <div id="contact" className="pt-8 space-y-3 font-sans text-sm">
                {about.email && (
                  <p>
                    <a
                      href={`mailto:${about.email}`}
                      className="border-b border-current hover:text-muted-foreground transition-colors"
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
                      className="border-b border-current hover:text-muted-foreground transition-colors"
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
