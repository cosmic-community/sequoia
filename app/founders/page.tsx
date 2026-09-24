import type { Metadata } from 'next'
import { getFounders } from '@/lib/cosmic'
import ProfileGrid from '@/components/ProfileGrid'

export const metadata: Metadata = {
  title: 'Our Founders — Sequoia',
  description: 'The daring founders building legendary companies.',
}

export default async function FoundersPage() {
  const founders = await getFounders()

  return (
    <ProfileGrid
      title="Our Founders"
      intro="The daring people building legendary companies."
      items={founders}
      basePath="/founders"
      label="Founder"
      emptyText="No founders yet"
    />
  )
}
