import { createBucketClient } from '@cosmicjs/sdk'
import type { Article, Company, Podcast, FeedItem } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

function getDateValue(obj: { metadata?: unknown; created_at: string }): number {
  let publishedAt: string | undefined
  const meta = obj.metadata
  if (typeof meta === 'object' && meta !== null && 'published_at' in meta) {
    const value = (meta as { published_at?: unknown }).published_at
    if (typeof value === 'string' && value) publishedAt = value
  }
  const dateStr = publishedAt || obj.created_at
  const t = new Date(dateStr).getTime()
  return isNaN(t) ? 0 : t
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'article' })
      .props(['id', 'slug', 'title', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    const articles = response.objects as Article[]
    return articles.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch articles')
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'article', slug })
      .props(['id', 'slug', 'title', 'content', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    return response.object as Article
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch article')
  }
}

export async function getPodcasts(): Promise<Podcast[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'podcast' })
      .props(['id', 'slug', 'title', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    const podcasts = response.objects as Podcast[]
    return podcasts.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch podcasts')
  }
}

export async function getPodcastBySlug(slug: string): Promise<Podcast | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'podcast', slug })
      .props(['id', 'slug', 'title', 'content', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    return response.object as Podcast
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch podcast')
  }
}

export async function getCompanies(): Promise<Company[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'company' })
      .props(['id', 'slug', 'title', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    const companies = response.objects as Company[]
    return companies.sort((a, b) => a.title.localeCompare(b.title))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch companies')
  }
}

export async function getHomepageFeed(limit = 8): Promise<FeedItem[]> {
  const [articles, podcasts] = await Promise.all([getArticles(), getPodcasts()])

  const feed: FeedItem[] = [
    ...articles.map((a) => ({ ...a, feedType: 'article' as const })),
    ...podcasts.map((p) => ({ ...p, feedType: 'podcast' as const })),
  ]

  feed.sort((a, b) => getDateValue(b) - getDateValue(a))

  return feed.slice(0, limit)
}