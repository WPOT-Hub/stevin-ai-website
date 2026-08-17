import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      // Google-Extended, niet Googlebot-Extended: die naam bestaat niet in
      // Google's eigen crawlerdocumentatie. Vandaag is het effect nul omdat de
      // algemene regel alles toestaat, maar zodra hier iets wordt afgeschermd
      // valt Gemini buiten de bedoelde uitzondering.
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://stevin.ai/sitemap.xml',
    // llms.txt stond nergens vermeld, dus een assistent moest ernaar raden.
    host: 'https://stevin.ai',
  }
}
