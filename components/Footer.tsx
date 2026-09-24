export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
          © {new Date().getFullYear()} Sequoia
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
          Helping the daring build legendary companies
        </p>
      </div>
    </footer>
  )
}