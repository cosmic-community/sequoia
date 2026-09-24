import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getFounderBySlug } from '@/lib/cosmic'
import DetailPage from '@/components/DetailPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const founder = await getFounderBySlug(slug)
  if (!founder) return { title: 'Founder Not Found — Sequoia' }
  return {
    title: `${founder.title} — Sequoia`,
    description: founder.metadata?.seo_description || undefined,
  }
}

export default async function FounderDetailPage({ params }: PageProps) {
  const { slug } = await params
  const founder = await getFounderBySlug(slug)
  if (!founder) notFound()

  return (
    <DetailPage
      label="Founder"
      title={founder.title}
      image={founder.metadata?.featured_image}
      summary={founder.metadata?.seo_description}
      body={founder.metadata?.content || founder.content}
      backHref="/founders"
      backLabel="All founders"
    />
  )
}
