import { client } from '@/sanity/lib/client'
import { GalleryAnimated } from './gallery-animated'

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
      <section id="gallery" className="py-40 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight">Selected Works</h2>
            <p className="text-muted-foreground font-sans text-lg max-w-2xl mx-auto">
              Add your first artwork in the{' '}
              <a href="/studio" className="underline hover:opacity-70 transition-opacity">
                Studio
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-40 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-center mb-24">
          Selected Works
        </h2>
        <GalleryAnimated artworks={artworks} />
      </div>
    </section>
  )
}
