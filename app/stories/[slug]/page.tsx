// app/stories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/cosmic'
import Markdown from '@/components/Markdown'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Story Not Found — Sequoia' }
  }

  return {
    title: `${article.metadata?.seo_title || article.title} — Sequoia`,
    description: article.metadata?.seo_description || undefined,
  }
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const featuredImage = article.metadata?.featured_image
  const imageUrl = featuredImage?.imgix_url
    ? `${featuredImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`
    : undefined

  const publishedDate = article.metadata?.published_at
    ? new Date(article.metadata.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : undefined

  const bodyContent = article.metadata?.content || article.content

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Story</p>
      <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight">{article.title}</h1>
      {publishedDate && (
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mt-4">
          {publishedDate}
        </p>
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={article.title}
          width={2000}
          height={1200}
          className="w-full h-auto mt-10 mb-10 object-cover"
        />
      )}
      {bodyContent && <Markdown content={bodyContent} title={article.title} />}
    </article>
  )
}