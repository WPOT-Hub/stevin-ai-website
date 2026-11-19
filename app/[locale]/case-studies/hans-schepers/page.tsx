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
      d: 'Op 7 van de 9 gemeten dagen liep de campagne vertoningen mis, omdat het dagbudget op was voordat de dag om was.',
    },
  ],
  aanpakKop: 'Eerst meten, dan pas sturen.',
  aanpakZin: 'We hebben niets aan de advertenties veranderd voordat de cijfers klopten. Daarna pas het budget.',
  aanpak: [
    { t: 'Meting hersteld', d: 'Op 21 oktober kwamen de bezoeken weer binnen in Google Analytics, op 22 oktober telde het formulier als aanvraag.' },
    { t: 'Herkomst bij elke aanvraag', d: 'Sinds 2 november staat bij elk formulier uit welke advertentie en welke zoekterm de aanvraag kwam.' },
    { t: 'Budget omhoog, met een reden', d: 'Op 27 oktober ging het dagbudget omhoog, in overleg met Hans, omdat de campagne op 7 van de 9 dagen vertoningen miste.' },
    { t: 'Rekenen met wat een opdracht waard is', d: 'Een herstoffering levert gemiddeld 1.000 euro op en een op de drie aanvragen wordt een opdracht. Daar toetsen we de kosten aan.' },
  ],
  uitkomstKop: 'De eerste weken in cijfers.',
  cijfers: [
    { getal: '+25 procent', uitleg: 'meer offerteaanvragen per dag via Google Ads in de eerste 18 dagen van november dan in oktober' },
    { getal: '8 in 18 dagen', uitleg: 'offerteaanvragen via het formulier, tegen 11 in heel oktober' },
    { getal: '5 extra', uitleg: 'contactmomenten die eerder niet werden geteld: 2 keer bellen, 2 keer mailen en 1 chat' },
  ],
  bron: 'Bron: Google Ads van Hans Schepers Stoffering, 1 oktober tot en met 18 november 2026, uitgelezen op 19 november.',
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
