export interface CosmicMedia {
  url: string
  imgix_url: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

export interface Article extends CosmicObject {
  type: 'article'
  metadata: {
    seo_title?: string
    seo_description?: string
    featured_image?: CosmicMedia
    published_at?: string
    content?: string
  }
}

export interface Podcast extends CosmicObject {
  type: 'podcast'
  metadata: {
    seo_description?: string
    featured_image?: CosmicMedia
    content?: string
  }
}

export interface Company extends CosmicObject {
  type: 'company'
  metadata: {
    seo_description?: string
    featured_image?: CosmicMedia
    content?: string
  }
}

export type FeedItem = (Article | Podcast) & { feedType: 'article' | 'podcast' }