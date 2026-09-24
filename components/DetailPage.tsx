import Link from 'next/link'
import type { CosmicMedia } from '@/types'

interface DetailPageProps {
  label: string
  title: string
  image?: CosmicMedia
  summary?: string
  body?: string
  backHref: string
  backLabel: string
}

export default function DetailPage({
  label,
  title,
  image,
  summary,
  body,
  backHref,
  backLabel,
}: DetailPageProps) {
  const imageUrl = image?.imgix_url
    ? `${image.imgix_url}?w=1600&h=1200&fit=crop&auto=format,compress`
    : undefined

  return (
    <article className="max-w-5xl mx-auto px-6 md:px-10 py-20">
      <Link
        href={backHref}
        className="font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-accent transition-colors"
      >
        ← {backLabel}
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-10 items-start">
        <div className="w-full aspect-[4/3] overflow-hidden bg-ink/5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              width={1600}
              height={1200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ink/30 font-mono text-xs uppercase tracking-widest">
              No Image
            </div>
          )}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{label}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight">{title}</h1>
          {summary && <p className="mt-6 text-lg text-ink/70 leading-relaxed">{summary}</p>}
        </div>
      </div>
      {body && (
        <div
          className="prose prose-lg max-w-3xl mt-16 prose-headings:font-serif prose-headings:text-ink prose-p:text-ink/80"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </article>
  )
}
