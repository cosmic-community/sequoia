import type { Metadata } from 'next'
import { getPodcasts } from '@/lib/cosmic'
import Card from '@/components/Card'

export const metadata: Metadata = {
  title: 'Podcasts — Sequoia',
  description: 'Conversations with the founders and operators building what is next.',
}

export default async function PodcastsPage() {
  const podcasts = await getPodcasts()

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-16">Podcasts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
        {podcasts.length === 0 && (
          <p className="md:col-span-2 font-mono text-sm uppercase tracking-widest text-ink/40">
            No podcasts yet
          </p>
        )}
        {podcasts.map((podcast) => {
          const featuredImage = podcast.metadata?.featured_image
          const imageUrl = featuredImage?.imgix_url
            ? `${featuredImage.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`
            : undefined

          return (
            <Card
              key={podcast.id}
              title={podcast.title}
              href={`/podcasts/${podcast.slug}`}
              imageUrl={imageUrl}
              label="Podcast"
              showListenTag
              description={podcast.metadata?.seo_description}
            />
          )
        })}
      </div>
    </div>
  )
}