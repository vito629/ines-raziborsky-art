import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { GalleryGrid } from '@/components/gallery-grid'
import { AboutSection } from '@/components/about-section'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <GalleryGrid />
        <AboutSection />
      </main>
      <footer className="py-16 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="font-sans text-sm text-muted-foreground">
            © {new Date().getFullYear()} Atelier. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
