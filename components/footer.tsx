'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-border/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="space-y-4"
          >
            <h3 className="text-2xl sm:text-3xl font-serif tracking-tight">
              Ines Raziborsky
            </h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">
              Contemporary artist exploring the intersection of light, emotion, and form.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '#gallery', label: 'Works' },
                { href: '#about', label: 'About' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm hover:opacity-60 transition-opacity w-fit relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="space-y-4 md:text-right"
          >
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Back to top
            </h4>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-sans text-sm hover:opacity-60 transition-opacity group inline-flex items-center gap-2"
              aria-label="Scroll to top"
            >
              <span>Return</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="font-sans text-xs text-muted-foreground uppercase tracking-[0.15em]">
            © {currentYear} Ines Raziborsky — All Rights Reserved
          </p>
          <p className="font-sans text-xs text-muted-foreground/60 uppercase tracking-[0.15em]">
            Contemporary Art
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
