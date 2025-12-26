export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tight">
          Atelier
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
          A curated collection of fine art, where each piece tells a story of passion, creativity, and craftsmanship.
        </p>
        <div className="pt-8">
          <a
            href="#gallery"
            className="inline-block font-sans text-sm tracking-wider uppercase border-b border-current pb-1 hover:text-muted-foreground transition-colors"
          >
            View Collection
          </a>
        </div>
      </div>
    </section>
  )
}
