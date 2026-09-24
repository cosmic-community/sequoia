import { getHomepageFeed } from '@/lib/cosmic'
import Card from '@/components/Card'

export default async function HomePage() {
  const feed = await getHomepageFeed(8)

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight max-w-4xl mx-auto text-ink">
          We help the daring build legendary companies.
        </h1>
        <div className="flex justify-center mt-4" aria-hidden="true">
          <svg width="220" height="20" viewBox="0 0 220 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 12C42 2 78 2 110 10C142 18 182 18 216 6"
              stroke="#2F6F3E"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 pb-24">
        {feed.length === 0 && (
          <p className="md:col-span-2 text-center font-mono text-sm uppercase tracking-widest text-ink/40">
            No content yet
          </p>
        )}
        {feed.map((item) => {
          const isPodcast = item.feedType === 'podcast'
          const featuredImage = item.metadata?.featured_image
          const imageUrl = featuredImage?.imgix_url
            ? `${featuredImage.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`
            : undefined
          const href = isPodcast ? `/podcasts/${item.slug}` : `/stories/${item.slug}`

          return (
            <Card
              key={item.id}
              title={item.title}
              href={href}
              imageUrl={imageUrl}
              label={isPodcast ? 'Podcast' : 'Story'}
              showListenTag={isPodcast}
            />
          )
        })}
      </section>
    </div>
  )
}