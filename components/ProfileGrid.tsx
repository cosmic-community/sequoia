import Card from '@/components/Card'
import type { CosmicObject } from '@/types'

interface ProfileGridProps {
  title: string
  intro?: string
  items: CosmicObject[]
  basePath: string
  label: string
  emptyText: string
}

export default function ProfileGrid({
  title,
  intro,
  items,
  basePath,
  label,
  emptyText,
}: ProfileGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-ink">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-ink/60 text-lg">{intro}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mt-16">
        {items.length === 0 && (
          <p className="col-span-full font-mono text-sm uppercase tracking-widest text-ink/40">
            {emptyText}
          </p>
        )}
        {items.map((item) => {
          const image = item.metadata?.featured_image as { imgix_url?: string } | undefined
          // Portrait crop anchored to faces so heads are never cut off
          const imageUrl = image?.imgix_url
            ? `${image.imgix_url}?w=800&h=1000&fit=crop&crop=faces,top&auto=format,compress`
            : undefined

          return (
            <Card
              key={item.id}
              title={item.title}
              href={`${basePath}/${item.slug}`}
              imageUrl={imageUrl}
              label={label}
              portrait
            />
          )
        })}
      </div>
    </div>
  )
}
