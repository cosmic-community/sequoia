# Sequoia

![App Preview](https://imgix.cosmicjs.com/a5fc77b0-b7c6-11f1-a43a-a32884c478cc-CleanShot-2026-09-23-at-20-18-362x.png?w=1200&h=630&fit=crop&auto=format,compress)

A lean, minimal venture capital firm website styled after sequoiacap.com, built with Next.js and powered entirely by Cosmic CMS.

## Features

- 🏠 Editorial homepage with a serif headline, hand-drawn underline accent, and a mixed feed of latest Stories + Podcasts
- ✍️ Stories section (list + detail) powered by the `article` object type
- 🎙️ Podcasts section (list + detail) powered by the `podcast` object type, with a "LISTEN" tag
- 🏢 Companies grid page powered by the `company` object type
- 🎨 Cream + near-black minimal design with uppercase monospace navigation
- ⚡ Fast, server-rendered pages using the Next.js App Router
- 🛡️ Graceful fallback for missing images, descriptions, or empty content

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ab40ca6e080f7a3ab756b9f&clone_repository=6ab49e27e080f7a3ab757aa9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js application for a company website called "Sequoia". The content is managed in Cosmic CMS with the following object types: founder, people, article, company, podcast. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A lean, minimal venture capital firm website styled like sequoiacap.com, using existing Cosmic content types. KEEP THE CODEBASE SMALL: this is a scoped first build.
>
> PAGES (only these):
> 1. Home (/): centered serif headline "We help the daring build legendary companies." with a hand-drawn green underline accent (simple inline SVG), then a 2-column grid of large image cards mixing latest Articles and Podcasts. Each card: featured image, small uppercase monospace label (STORY or PODCAST), a "LISTEN" tag on podcasts, title.
> 2. Stories (/stories) list + detail (/stories/[slug]) using the "article" type.
> 3. Podcasts (/podcasts) list + detail (/podcasts/[slug]) using the "podcast" type.
> 4. Companies (/companies): a single grid page using the "company" type (no detail page).
>
> DESIGN: cream background (#F5F2EA-ish), near-black text, bold uppercase "SEQUOIA" wordmark top-left, uppercase monospace nav links (Stories, Podcasts, Companies), serif headlines, sans body, generous whitespace, minimal footer. Use Tailwind only; no extra UI libraries.
>
> CODE RULES:
> - Put ALL Cosmic SDK code (client + every fetch function) in ONE file: lib/cosmic.ts. Create that file FIRST, before any page.
> - Do NOT create or import any preview helper, lib/cosmic-preview, draft mode, or preview API route.
> - Only import files you also create. Keep components few: Header, Footer, Card.
> - Render markdown/rich text with a simple approach (e.g. react-markdown only if needed).
> - Use seo_description and featured image metafields for page metadata where available; handle missing fields gracefully with optional chaining.
> - Do not generate Founders or Team pages in this build.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router, Server Components
- [Cosmic](https://www.cosmicjs.com) — headless CMS for all content
- [TypeScript](https://www.typescriptlang.org/) — strict typing throughout
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling with the typography plugin

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with a bucket containing `article`, `podcast`, and `company` objects

### Installation

```bash
bun install
```

Set up your environment variables (see below), then run:

```bash
bun run dev
```

Visit `http://localhost:3000` to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all articles, sorted by newest first
const { objects: articles } = await cosmic.objects
  .find({ type: 'article' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single podcast by slug
const { object: podcast } = await cosmic.objects
  .findOne({ type: 'podcast', slug: 'my-podcast-slug' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three existing object types in your bucket:

- **article** — `seo_description`, `seo_title`, `featured_image`, `published_at`, `content`
- **podcast** — `seo_description`, `featured_image`, `content`
- **company** — `seo_description`, `featured_image`, `content`

All Cosmic SDK configuration and data-fetching logic lives in a single file, `lib/cosmic.ts`, for a small and easy-to-audit codebase.

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the required environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the required environment variables in the Netlify dashboard
5. Deploy

Set these environment variables in your hosting platform:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```
<!-- README_END -->