import { Navigation } from '@/components/navigation'
import { HeroParallax } from '@/components/hero-parallax'
import { GalleryGrid } from '@/components/gallery-grid'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroParallax />
        <GalleryGrid />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
