'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// Elegant easing curve - cubic-bezier for smooth, natural motion
const ease = [0.22, 1, 0.36, 1] as const

// Text reveal animation - letter by letter for award-winning effect
const letterVariants = {
  hidden: {
    y: 100,
    opacity: 0,
    rotateX: -90,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1.2,
      delay: i * 0.03,
      ease,
    },
  }),
} as const

// Split text into individual letters for animation
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1000 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={letterVariants}
          className="inline-block"
          style={{
            transformOrigin: 'bottom',
            willChange: 'transform, opacity',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function HeroParallax() {
  const ref = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768
    setIsMobile(checkMobile())

    const handleResize = () => setIsMobile(checkMobile())
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax only on desktop for performance
  const y = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, isMobile ? 1 : 0.3, isMobile ? 1 : 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 0.95])

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-serif tracking-tighter leading-[0.85]">
            Ines
            <br />
            Raziborsky
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            Contemporary artist exploring the intersection of light, emotion, and form
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      <motion.div
        style={{
          y: isMobile ? 0 : y,
          opacity,
          scale: isMobile ? 1 : scale,
          willChange: isMobile ? 'auto' : 'transform, opacity',
        }}
        className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12"
      >
        {/* Main title with letter-by-letter reveal */}
        <div className="overflow-hidden">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-serif tracking-tighter leading-[0.85]">
            <span className="block overflow-hidden">
              <AnimatedText text="Ines" />
            </span>
            <span className="block overflow-hidden mt-[-0.1em]">
              <AnimatedText text="Raziborsky" delay={4} />
            </span>
          </h1>
        </div>

        {/* Subtitle with fade up */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed"
        >
          Contemporary artist exploring the intersection of light, emotion, and form
        </motion.p>

        {/* CTA with elegant hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.2 }}
          className="pt-4 sm:pt-8"
        >
          <a
            href="#gallery"
            className="group inline-flex items-center gap-3 font-sans text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] relative overflow-hidden"
          >
            <span className="relative">
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                Explore Works
              </span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                Explore Works
              </span>
            </span>
            <span className="relative w-12 h-[1px] bg-foreground overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-foreground origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease }}
              />
            </span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle gradient orbs - CSS only on mobile for performance */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Static orbs on mobile, animated on desktop */}
        <div
          className={`
            absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96
            bg-gradient-to-br from-neutral-100 to-transparent rounded-full blur-3xl
            ${!isMobile ? 'animate-float-slow' : ''}
          `}
          style={{ opacity: 0.5 }}
        />
        <div
          className={`
            absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96
            bg-gradient-to-tl from-neutral-100 to-transparent rounded-full blur-3xl
            ${!isMobile ? 'animate-float-slow-reverse' : ''}
          `}
          style={{ opacity: 0.4, animationDelay: '2s' }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-foreground/0 via-foreground/30 to-foreground/0"
        />
      </motion.div>
    </section>
  )
}
