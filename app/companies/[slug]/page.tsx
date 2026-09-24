import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCompanyBySlug } from '@/lib/cosmic'
import DetailPage from '@/components/DetailPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) return { title: 'Company Not Found — Sequoia' }
  return {
    title: `${company.title} — Sequoia`,
    description: company.metadata?.seo_description || undefined,
  }
}

export default async function CompanyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) notFound()

  return (
    <DetailPage
      label="Company"
      title={company.title}
      image={company.metadata?.featured_image}
      summary={company.metadata?.seo_description}
      body={company.metadata?.content || company.content}
      backHref="/companies"
      backLabel="All companies"
    />
  )
}
