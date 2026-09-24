import type { Metadata } from 'next'
import { getPeople } from '@/lib/cosmic'
import ProfileGrid from '@/components/ProfileGrid'

export const metadata: Metadata = {
  title: 'Our Team — Sequoia',
  description: 'The people who partner with founders from idea to IPO and beyond.',
}

export default async function TeamPage() {
  const people = await getPeople()

  return (
    <ProfileGrid
      title="Our Team"
      intro="We partner with founders from idea to IPO and beyond."
      items={people}
      basePath="/team"
      label="Team"
      emptyText="No team members yet"
    />
  )
}
