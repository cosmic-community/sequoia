import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-32 text-center">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-6">Page not found</h1>
      <p className="font-mono text-sm uppercase tracking-widest text-ink/50 mb-10">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-accent hover:opacity-70 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  )
}