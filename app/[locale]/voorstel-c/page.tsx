import type { Metadata, ResolvingMetadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import RethinkHome from '@/components/rethink/RethinkHome'

type Props = { params: Promise<{ locale: string }> }

// VOORSTEL nieuwe homepage, richting C (W-535). Niet gelinkt, niet in de
// sitemap, noindex. Verhuist naar app/[locale]/page.tsx na Koens akkoord.
//
// Bij die verhuizing: RethinkHome is alleen Nederlands (tekst staat in de
// code, KlantLogos krijgt vast nl). Render hem alleen voor locale nl en laat
// de huidige HomePage voor en staan tot er een Engelse versie is. Neem
// generateMetadata van de huidige page.tsx over (canonical, hreflang, RSS en de
// VERCEL_ENV-noindex), met een eigen Nederlandse title (absolute) en dezelfde
// description als hieronder, ook voor openGraph en twitter. Geen "dag en
// nacht" zolang de Hub dat niet waarmaakt.

// Past bij de hero. Zonder eigen description kreeg deze pagina de meta- en
// OG-tekst van de oude homepage uit de layout.
const BESCHRIJVING =
  'Je ziet wat je marketing oplevert en wat er beter kan. Stevin.AI legt je campagnes, website, telefoon en verkoop naast elkaar en helpt bij de uitvoering.'

export async function generateMetadata(_: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // openGraph en twitter vervangen die van de layout in hun geheel; daarom de
  // rest (afbeelding, sitenaam, kaarttype) uit de layout meenemen.
  const ouder = await parent
  const titel = 'Voorstel homepage, richting C'
  return {
    title: titel,
    description: BESCHRIJVING,
    robots: { index: false, follow: false },
    openGraph: {
      type: 'website',
      locale: ouder.openGraph?.locale,
      siteName: ouder.openGraph?.siteName,
      images: ouder.openGraph?.images,
      title: titel,
      description: BESCHRIJVING,
    },
    twitter: {
      card: 'summary_large_image',
      images: ouder.twitter?.images,
      title: titel,
      description: BESCHRIJVING,
    },
  }
}

export default async function VoorstelPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkHome richting="c" />
}
