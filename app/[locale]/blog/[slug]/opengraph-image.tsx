import { ImageResponse } from 'next/og'
import { getArticle } from '@/data/articles'
import { OG_SIZE, StevinOgCard } from '@/lib/og-card'

export const runtime = 'nodejs'
export const alt = 'Stevin Journal'
export const size = OG_SIZE
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function BlogOGImage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)

  const title = article?.title ?? 'Stevin Journal'
  const category = article?.category ?? 'Journal'
  const edition = article?.edition ? `Editie ${article.edition}` : 'Stevin Journal'
  const author = article?.author?.name ?? 'Stevin'

  return new ImageResponse(
    (
      <StevinOgCard
        eyebrow={`${category} · ${edition}`}
        lines={[{ text: title }]}
        footer={author}
        compact={title.length > 52}
      />
    ),
    { ...size },
  )
}
