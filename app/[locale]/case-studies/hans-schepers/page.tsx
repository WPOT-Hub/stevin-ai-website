import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase, { type Case } from '@/components/rethink/RethinkCase'

// W-860. NIET LIVE ZETTEN ZONDER AKKOORD VAN HANS SCHEPERS. Staat op noindex
// en niet in de sitemap. Alle cijfers komen uit
// Stevin-company/legal/klanten/hansschepers/KLANTFEITEN.md (stand 19 nov 2026).
type Props = { params: Promise<{ locale: string }> }

const CASE: Case = {
  eyebrow: 'Klantcase: Hans Schepers Stoffering',
  kop: 'De site stond live.',
  accent: 'Alleen telde niemand mee.',
  knop: 'case_hans_kop',
  lede: 'Hans Schepers herstoffeert banken, stoelen en fauteuils in Oirschot. Hij adverteerde op Google, maar wist niet wat het opleverde. De partij voor ons verkocht SEO met AI, maar keek niet naar de marketing erachter: wat kost een aanvraag en wat levert hij op? Toen wij gingen kijken, bleek dat niemand het kon weten. De meting deed het niet.',
  probleemKop: 'Wat we aantroffen.',
  problemen: [
    {
      t: 'Google Analytics telde nul bezoeken',
      d: 'Sinds de site live stond kwam er geen enkele paginaweergave binnen. Elke controle stond op groen, want de code zat er wel in.',
    },
    {
      t: 'Het formulier meldde geen aanvragen',
      d: 'Een ingevuld formulier werd niet als aanvraag doorgegeven. Google Ads kon dus niet leren welke klik iets opleverde.',
    },
    {
      t: 'Bijna alles in het formulier was spam',
      d: 'Van de 265 inzendingen waren er 235 spam. De echte aanvragen zaten ertussen verstopt.',
    },
    {
      t: 'Het budget was te vroeg op',
      d: 'Op 7 van de 9 gemeten dagen liep de campagne vertoningen mis, omdat het dagbudget van 13,30 euro op was.',
    },
  ],
  aanpakKop: 'Eerst meten, dan pas sturen.',
  aanpakZin: 'We hebben niets aan de advertenties veranderd voordat de cijfers klopten. Daarna pas het budget.',
  aanpak: [
    { t: 'Meting hersteld', d: 'Op 21 oktober kwamen de bezoeken weer binnen in Google Analytics, op 22 oktober telde het formulier als aanvraag.' },
    { t: 'Herkomst bij elke aanvraag', d: 'Sinds 2 november staat bij elk formulier uit welke advertentie en welke zoekterm de aanvraag kwam.' },
    { t: 'Budget omhoog, met een reden', d: 'Op 27 oktober ging het dagbudget van 13,30 naar 20 euro, in overleg met Hans, omdat de campagne op 7 van de 9 dagen vertoningen miste.' },
    { t: 'Rekenen met wat een opdracht waard is', d: 'Een herstoffering levert gemiddeld 1.000 euro op en een op de drie aanvragen wordt een opdracht. Daar toetsen we de kosten aan.' },
  ],
  uitkomstKop: 'Oktober in cijfers.',
  cijfers: [
    { getal: '444 euro', uitleg: 'uitgegeven aan Google Ads, voor 272 klikken' },
    { getal: '11', uitleg: 'aanvragen via het formulier, plus 1 via mail' },
    { getal: '40 euro', uitleg: 'per aanvraag via het formulier, bij een opdracht van gemiddeld 1.000 euro' },
    { getal: 'ROAS 8,3', uitleg: 'verwachte opbrengst per uitgegeven euro: 11 aanvragen, een op de drie wordt een opdracht van gemiddeld 1.000 euro' },
  ],
  bron: 'Bron: Google Ads en Google Analytics van Hans Schepers Stoffering, oktober 2026. De opbrengst per opdracht en de slagingskans zijn opgegeven door de klant.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/case-studies/hans-schepers',
      locale,
      title: 'Klantcase Hans Schepers Stoffering',
      description: 'Hoe een stoffeerder ontdekte dat zijn site live stond maar niets telde, en wat een aanvraag hem nu kost.',
      translated: false,
    }),
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkCase c={CASE} />
}
