import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase, { type Case } from '@/components/rethink/RethinkCase'

// W-860. NIET LIVE ZETTEN ZONDER AKKOORD VAN STERKER WITGOED. Staat op noindex
// en niet in de sitemap. Alle cijfers komen uit
// Stevin-company/legal/klanten/sterker-witgoed/KLANTFEITEN.md (stand 19 nov 2026).
type Props = { params: Promise<{ locale: string }> }

const CASE: Case = {
  eyebrow: 'Klantcase: Sterker Witgoed',
  kop: 'Google telde 5 aankopen.',
  accent: 'De winkel telde er 10.',
  knop: 'case_sterker_kop',
  lede: 'Sterker Witgoed verkoopt nieuw en refurbished witgoed via een webwinkel en adverteert daarvoor op Google. De vraag was simpel: welke campagnes verdienen hun geld terug? Het antwoord hing af van welk systeem je het vroeg.',
  probleemKop: 'Drie systemen, drie antwoorden.',
  problemen: [
    {
      t: 'Google Ads telt op de dag zelf de helft',
      d: 'Op 14 november gaf Google Ads 5 aankopen. In de winkel stonden 10 betaalde bestellingen via Google Ads. Google zag dus 50 procent van de bestellingen en 54 procent van de opbrengst.',
    },
    {
      t: 'Een op de zes aankopen kwam niet aan in Analytics',
      d: 'Van 252 webbestellingen in vier weken ontbraken er 44 in Google Analytics. Bij betalen in termijnen ging het om bijna een op de drie.',
    },
    {
      t: 'Betalen in termijnen haakt vaker af',
      d: 'Van de bestellingen met betalen in drie termijnen werd 40 procent geannuleerd. Bij gewone iDEAL-betalingen was dat 10 procent.',
    },
    {
      t: 'Eigen testbestellingen vervuilden het alarm',
      d: 'Een alarm meldde 16 onbetaalde bestellingen op 58. Zonder onze eigen testen waren het er 8 op 50.',
    },
  ],
  aanpakKop: 'De winkel is de waarheid.',
  aanpakZin: 'Een advertentieplatform rapporteert over zichzelf. Wij rekenen met wat er betaald is.',
  aanpak: [
    { t: 'Dagcijfers uit de winkel', d: 'De dagelijkse stand komt uit de betaalde bestellingen in de winkel, per provincie, naast de uitgaven in Google Ads.' },
    { t: 'Geannuleerd is niet altijd gemist', d: 'Van 17 geannuleerde iDEAL-bestellingen in een week waren er 8 testen en bestelden 4 klanten direct opnieuw. Echt gemist: 4 bestellingen, 1.546 euro.' },
    { t: 'Testen eruit voor je een percentage noemt', d: 'Testbestellingen tellen niet meer mee in het alarm. Anders stuur je op je eigen ruis.' },
    { t: 'Elke wijziging in een logboek', d: 'Wat we aanpassen staat met datum, reden en terugdraaipunt in een logboek dat de klant kan inzien.' },
  ],
  uitkomstKop: 'Wat het verschil maakt.',
  cijfers: [
    { getal: '50 procent', uitleg: 'van de betaalde bestellingen zag Google Ads op de dag zelf' },
    { getal: '17 procent', uitleg: 'van de aankopen kwam in vier weken niet aan in Google Analytics' },
    { getal: '40 tegen 10 procent', uitleg: 'geannuleerd bij betalen in termijnen tegenover iDEAL' },
  ],
  bron: 'Bron: Google Ads, Google Analytics en de webwinkel van Sterker Witgoed, 23 september tot en met 18 november 2026.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/case-studies/sterker-witgoed',
      locale,
      title: 'Klantcase Sterker Witgoed',
      description: 'Google Ads telde 5 aankopen, de winkel 10. Hoe een webwinkel in witgoed ging sturen op betaalde bestellingen.',
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
