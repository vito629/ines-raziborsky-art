'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const navLinks = [
  { href: '#gallery', label: 'Works' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

// Menu link animation variants
const menuLinkVariants = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.1 + i * 0.1,
      ease,
    },
  }),
  exit: (i: number) => ({
    y: -40,
    opacity: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.05,
      ease,
    },
  }),
} as const

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll for nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/30' : 'bg-transparent'}
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-lg sm:text-xl font-serif tracking-tight relative group"
            >
              <span className="relative z-10">Ines Raziborsky</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs uppercase tracking-[0.2em] relative group py-2"
                >
                  <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-60">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-4">
                <motion.span
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 7 : 0,
                  }}
                  transition={{ duration: 0.3, ease }}
                  className="absolute top-0 left-0 w-full h-[1.5px] bg-foreground origin-center"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-0 w-full h-[1.5px] bg-foreground -translate-y-1/2"
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -7 : 0,
                  }}
                  transition={{ duration: 0.3, ease }}
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-foreground origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background"
            />

            {/* Menu Content */}
            <div className="relative h-full flex flex-col justify-center items-center px-6">
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, i) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div
                      custom={i}
                      variants={menuLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className="block text-4xl sm:text-5xl font-serif tracking-tight hover:opacity-60 transition-opacity duration-300"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              {/* Bottom decoration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                className="absolute bottom-12 left-0 right-0 text-center"
              >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Contemporary Art
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
