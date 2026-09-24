import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  content: string
  title?: string
  className?: string
}

// Map relative links from imported content (e.g. ../people/jane) to site routes.
const ROUTE_MAP: Record<string, string> = {
  people: 'team',
  founders: 'founders',
  companies: 'companies',
  stories: 'stories',
  podcasts: 'podcasts',
}

function transformUrl(url: string): string {
  const match = url.match(/^(?:\.\.\/|\.\/|\/)?(people|founders|companies|stories|podcasts)\/([^/?#]+)/)
  if (match) {
    const section = match[1] ?? ''
    const slug = match[2] ?? ''
    return `/${ROUTE_MAP[section] ?? section}/${slug}`
  }
  return url
}

// Remove a leading H1 that duplicates the page title already shown in the header.
function stripDuplicateTitle(content: string, title?: string): string {
  const trimmed = content.replace(/^\s+/, '')
  const match = trimmed.match(/^#\s+(.+)\n/)
  if (match && title && match[1]?.trim() === title.trim()) {
    return trimmed.slice(match[0].length)
  }
  return trimmed
}

export default function Markdown({ content, title, className }: MarkdownProps) {
  const source = stripDuplicateTitle(content, title)

  return (
    <div
      className={
        className ??
        'prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink/80 prose-a:text-accent prose-img:w-full'
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={transformUrl}
        components={{
          a: ({ href, children }) => {
            const external = typeof href === 'string' && /^https?:\/\//.test(href)
            return (
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
