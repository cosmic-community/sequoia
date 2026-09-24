import type { Metadata } from 'next'
import { getArticles } from '@/lib/cosmic'
import Card from '@/components/Card'

export const metadata: Metadata = {
  title: 'Stories — Sequoia',
  description: 'Stories from the founders and companies we partner with.',
}

export default async function StoriesPage() {
  const articles = await getArticles()

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-16">Stories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
        {articles.length === 0 && (
          <p className="md:col-span-2 font-mono text-sm uppercase tracking-widest text-ink/40">
            No stories yet
          </p>
        )}
        {articles.map((article) => {
          const featuredImage = article.metadata?.featured_image
          const imageUrl = featuredImage?.imgix_url
            ? `${featuredImage.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`
            : undefined

          return (
            <Card
              key={article.id}
              title={article.title}
              href={`/stories/${article.slug}`}
              imageUrl={imageUrl}
              label="Story"
              description={article.metadata?.seo_description}
            />
          )
        })}
      </div>
    </div>
  )
}