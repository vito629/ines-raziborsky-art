import Image from 'next/image'
import { client } from '@/sanity/lib/client'
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

export async function GalleryGrid() {
  const artworks = await getArtworks()

  if (artworks.length === 0) {
    return (
      <section id="gallery" className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif">Gallery</h2>
            <p className="text-muted-foreground font-sans">
              No artworks yet. Add your first piece in the{' '}
              <a href="/studio" className="underline hover:text-foreground">
                Studio
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-20">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {artworks.map((artwork) => (
            <div key={artwork._id} className="group space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                {artwork.image && (
                  <Image
                    src={urlFor(artwork.image).width(800).url()}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif">{artwork.title}</h3>
                <div className="font-sans text-sm text-muted-foreground space-y-1">
                  {artwork.medium && <p>{artwork.medium}</p>}
                  {artwork.dimensions && <p>{artwork.dimensions}</p>}
                  {artwork.year && <p>{artwork.year}</p>}
                </div>
                {artwork.description && (
                  <p className="font-sans text-sm text-muted-foreground pt-2">
                    {artwork.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
