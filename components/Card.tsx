import Link from 'next/link'

interface CardProps {
  title: string
  href?: string
  imageUrl?: string
  label: string
  showListenTag?: boolean
  description?: string
}

export default function Card({
  title,
  href,
  imageUrl,
  label,
  showListenTag,
  description,
}: CardProps) {
  const content = (
    <div className="group flex flex-col h-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-ink/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/30 font-mono text-xs uppercase tracking-widest">
            No Image
          </div>
        )}
        {showListenTag && (
          <span className="absolute top-4 left-4 bg-cream text-ink text-[10px] font-mono uppercase tracking-widest px-3 py-1">
            Listen
          </span>
        )}
      </div>
      <div className="pt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{label}</p>
        <h3 className="font-serif text-2xl mt-2 leading-snug text-ink group-hover:opacity-70 transition-opacity">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-ink/60 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}