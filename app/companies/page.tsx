import type { Metadata } from 'next'
import { getCompanies } from '@/lib/cosmic'
import Card from '@/components/Card'

export const metadata: Metadata = {
  title: 'Companies — Sequoia',
  description: 'The companies we are proud to partner with.',
}

export default async function CompaniesPage() {
  const companies = await getCompanies()

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-16">Companies</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {companies.length === 0 && (
          <p className="col-span-full font-mono text-sm uppercase tracking-widest text-ink/40">
            No companies yet
          </p>
        )}
        {companies.map((company) => {
          const featuredImage = company.metadata?.featured_image
          const imageUrl = featuredImage?.imgix_url
            ? `${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`
            : undefined

          return (
            <Card key={company.id} title={company.title} imageUrl={imageUrl} label="Company" />
          )
        })}
      </div>
    </div>
  )
}