'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// Elegant easing curve
const ease = [0.22, 1, 0.36, 1] as const

// Letter animation variants
const letterVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.04,
      ease,
    },
  }),
} as const

// Animated text component
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export function HeroParallax() {
  const ref = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, isMobile ? 1 : 0])

  // Static version for SSR and reduced motion
  if (!mounted || prefersReducedMotion) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-serif tracking-tighter leading-[0.9]">
            <span className="block">Ines</span>
            <span className="block">Raziborsky</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
            Contemporary artist exploring the intersection of light, emotion, and form
          </p>
          <div className="pt-4">
            <a
              href="#gallery"
              className="inline-flex items-center gap-3 font-sans text-xs sm:text-sm uppercase tracking-[0.2em]"
            >
              <span>View Works</span>
              <span className="w-8 h-[1px] bg-foreground" />
            </a>
          </div>
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
        }}
        className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-10"
      >
        {/* Main title with letter-by-letter reveal */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-serif tracking-tighter leading-[0.9]">
          <span className="block overflow-hidden">
            <AnimatedText text="Ines" />
          </span>
          <span className="block overflow-hidden">
            <AnimatedText text="Raziborsky" delay={4} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed"
        >
          Contemporary artist exploring the intersection of light, emotion, and form
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="pt-4"
        >
          <a
            href="#gallery"
            className="group inline-flex items-center gap-3 font-sans text-xs sm:text-sm uppercase tracking-[0.2em]"
          >
            <span className="relative">
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                View Works
              </span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                View Works
              </span>
            </span>
            <motion.span
              className="w-8 h-[1px] bg-foreground"
              whileHover={{ width: 48 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[1px] h-10 bg-gradient-to-b from-foreground/0 via-foreground to-foreground/0"
        />
      </motion.div>
    </section>
  )
}
