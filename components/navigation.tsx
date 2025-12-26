'use client'

import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif tracking-tight">
            Atelier
          </Link>
          <div className="flex gap-8 font-sans text-sm">
            <Link href="#gallery" className="hover:text-muted-foreground transition-colors">
              Gallery
            </Link>
            <Link href="#about" className="hover:text-muted-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-muted-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
