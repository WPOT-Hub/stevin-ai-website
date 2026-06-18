import type { Metadata } from 'next'
import './globals.css'

// De <html>/<body>, fonts en providers staan in app/[locale]/layout.tsx. Reden:
// de root-layout mag geen dynamische next-intl API (getLocale) aanroepen, want
// dat zette de HELE site in dynamic-render-modus (cache-control: no-store, geen
// edge-cache, trage TTFB, verspild crawl-budget). Door de root als pass-through
// te houden kan elke pagina onder [locale] statisch geprerenderd worden en zet
// de [locale]-layout meteen de juiste lang per taal. De globale 404
// (app/not-found.tsx) draagt zijn eigen <html>/<body>.
export const metadata: Metadata = {
  metadataBase: new URL('https://stevin.ai'),
  verification: {
    google: 'ItP2M9E-39xqD9M8dKV_qAwtizunWFlIH1pnw4E5p10',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
