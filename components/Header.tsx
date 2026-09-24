import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <Link href="/" className="font-sans font-bold text-xl tracking-tight uppercase text-ink">
          Sequoia
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/stories"
            className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
          >
            Stories
          </Link>
          <Link
            href="/podcasts"
            className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
          >
            Podcasts
          </Link>
          <Link
            href="/companies"
            className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
          >
            Companies
          </Link>
        </nav>
      </div>
    </header>
  )
}