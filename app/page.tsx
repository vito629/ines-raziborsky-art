import { Navigation } from '@/components/navigation'
import { HeroParallax } from '@/components/hero-parallax'
import { GalleryGrid } from '@/components/gallery-grid'
import { AboutSection } from '@/components/about-section'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroParallax />
        <GalleryGrid />
        <AboutSection />
      </main>
      <footer className="py-24 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} Ines Raziborsky — All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  )
}
