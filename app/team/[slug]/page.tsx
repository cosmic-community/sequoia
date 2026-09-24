import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPersonBySlug } from '@/lib/cosmic'
import DetailPage from '@/components/DetailPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const person = await getPersonBySlug(slug)
  if (!person) return { title: 'Team Member Not Found — Sequoia' }
  return {
    title: `${person.title} — Sequoia`,
    description: person.metadata?.seo_description || undefined,
  }
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params
  const person = await getPersonBySlug(slug)
  if (!person) notFound()

  return (
    <DetailPage
      label="Team"
      title={person.title}
      image={person.metadata?.featured_image}
      summary={person.metadata?.seo_description}
      body={person.metadata?.content || person.content}
      backHref="/team"
      backLabel="Our team"
    />
  )
}
