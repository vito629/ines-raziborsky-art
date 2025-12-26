'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-serif tracking-tight hover:opacity-70 transition-opacity">
            Ines Raziborsky
          </Link>
          <div className="flex gap-8 font-sans text-sm uppercase tracking-widest">
            <Link href="#gallery" className="hover:opacity-70 transition-opacity">
              Works
            </Link>
            <Link href="#about" className="hover:opacity-70 transition-opacity">
              About
            </Link>
            <Link href="#contact" className="hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
