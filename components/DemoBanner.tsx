export default function DemoBanner() {
  return (
    <div
      role="note"
      className="w-full bg-ink text-cream px-4 py-2 text-center font-mono text-[11px] uppercase tracking-widest"
    >
      This is a demo site built with{' '}
      <a
        href="https://www.cosmicjs.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-80"
      >
        Cosmic
      </a>
      . Not affiliated with Sequoia Capital.
    </div>
  )
}
