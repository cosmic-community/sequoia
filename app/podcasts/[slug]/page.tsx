// app/podcasts/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPodcastBySlug } from '@/lib/cosmic'
import Markdown from '@/components/Markdown'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const podcast = await getPodcastBySlug(slug)

  if (!podcast) {
    return { title: 'Podcast Not Found — Sequoia' }
  }

  return {
    title: `${podcast.title} — Sequoia`,
    description: podcast.metadata?.seo_description || undefined,
  }
}

export default async function PodcastDetailPage({ params }: PageProps) {
  const { slug } = await params
  const podcast = await getPodcastBySlug(slug)

  if (!podcast) {
    notFound()
  }

  const featuredImage = podcast.metadata?.featured_image
  const imageUrl = featuredImage?.imgix_url
    ? `${featuredImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`
    : undefined

  const bodyContent = podcast.metadata?.content || podcast.content

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
        Podcast
      </p>
      <div className="inline-block bg-ink text-cream font-mono text-[10px] uppercase tracking-widest px-3 py-1 mb-6">
        Listen
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight">{podcast.title}</h1>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={podcast.title}
          width={2000}
          height={1200}
          className="w-full h-auto mt-10 mb-10 object-cover"
        />
      )}
      {bodyContent && <Markdown content={bodyContent} title={podcast.title} />}
    </article>
  )
}