import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase, { type Case } from '@/components/rethink/RethinkCase'
import { Stippen, VoorNaBalken } from '@/components/rethink/CaseVisuals'

// W-860. Live sinds 26 nov 2026: Koen meldt dat Faysal akkoord heeft gegeven.
// Indexeerbaar, in de sitemap en met een eigen canonical. Zonder citaat tot
// Faysal de exacte zin goedkeurt.
// Bron: Stevin-company/legal/klanten/sterker-witgoed (logboek 30 sep tot 22 nov 2026)
// en de feedmeting van 21 tot 23 nov. Geen bedragen. Bewust geen groeicijfer:
// de nieuwe opzet draait nog geen vier weken (eerst rond 14 december).
type Props = { params: Promise<{ locale: string }> }

const CASE: Case = {
  eyebrow: 'Klantcase: Sterker Witgoed',
  kop: '667 handelingen in acht weken.',
  accent: 'Elk met bewijs vastgelegd.',
  knop: 'case_sterker_kop',
  lede: 'Sterker Witgoed verkoopt nieuw en refurbished witgoed in een webwinkel. Faysal betaalde elke maand veel aan advertenties en zag er te weinig voor terug. Wij keken eerst naar zijn winkel, niet naar Google: wat verkoopt hij echt, en welke klikken leveren niets op?',
  beeld: (
    <div className="rounded-2xl bg-primary px-6 py-10 sm:px-10">
      <Stippen
        totaal={667}
        gemarkeerd={170}
        label="667 stippen, een per vastgelegde handeling, waarvan ongeveer 170 wijzigingen met een go"
        legenda={['Ongeveer 170 wijzigingen met een go', 'De rest: metingen en controles']}
      />
      <p className="m-0 mt-6 max-w-[620px] text-[14px] leading-[1.5] text-white/60">
        Elke stip is een regel in het logboek van Sterker, van 30 september tot 22 november. Faysal ziet zelf wat we deden, wanneer en waarom.
      </p>
    </div>
  ),
  probleemKop: 'Wat er speelde.',
  problemen: [
    { t: 'Een nieuwe site, buiten onze opdracht', d: 'Midden in onze periode ging zijn nieuwe website live. We begeleidden de livegang toch, en legden elf incidenten vast met bewijs.' },
    { t: 'Bestelmails die niet uitgingen', d: 'Klanten bestelden en kregen geen bevestiging.' },
    { t: 'Bezorgnummers die uit de agenda verdwenen', d: 'Het telefoonnummer ontbrak in de bezorgagenda.' },
    { t: 'Een beveiliging die Microsoft Ads buitensloot', d: 'Advertenties op een tweede platform konden de site niet meer lezen.' },
  ],
  aanpakKop: 'De winkel is de waarheid.',
  aanpakZin: 'Een advertentieplatform rapporteert over zichzelf. Wij kijken elke dag naar wat er in de winkel besteld is.',
  aanpak: [
    { t: 'Campagnes opnieuw opgebouwd', d: 'Op basis van wat de winkel echt verkoopt en wat er overblijft.' },
    { t: 'Elk punt vastgelegd', d: 'Met bewijs, een oplossing en een terugdraaipunt. 62 gesprekken, telefoontjes en appjes met Faysal en zijn webbouwer staan er ook in.' },
    { t: 'De productfeed hersteld', d: 'Na de overstap stonden refurbished apparaten in Google als nieuw. We vonden het en zetten het recht.' },
    { t: 'Niet alleen naar Google kijken', d: 'Google Ads telt deze week een kwart minder aankopen dan de winkel. Wie alleen daarnaar kijkt, stuurt bij op een scheef beeld.' },
  ],
  aanpakBeeld: (
    <div className="rounded-2xl bg-white px-2 py-2">
      <VoorNaBalken
        titel="Shopping-klikken op refurbished apparaten die als nieuw stonden"
        rijen={[
          { label: 'Zaterdag 21 november, voor het herstel', procent: 67, waarde: '2 van elke 3 klikken' },
          { label: 'Na het herstel', procent: 0.8, waarde: '1 van 128 klikken', accent: true },
        ]}
        bron="Bron: Google Ads en de feedmeting van Sterker Witgoed, 21 tot 23 november 2026."
      />
    </div>
  ),
  uitkomstKop: 'Wat je er zelf van ziet.',
  cijfers: [
    { getal: '667', uitleg: 'vastgelegde handelingen in acht weken, ongeveer 85 per week' },
    { getal: '11', uitleg: 'incidenten rond de nieuwe site gevonden en vastgelegd met bewijs' },
    { getal: '1 van 128', uitleg: 'Shopping-klikken ging na het herstel nog naar een apparaat dat als nieuw stond' },
  ],
  bron: 'Bron: logboek, Google Ads en de webwinkel van Sterker Witgoed, 30 september tot en met 23 november 2026. Een groeicijfer volgt als de nieuwe opzet vier weken draait.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/case-studies/sterker-witgoed',
      locale,
      title: 'Klantcase Sterker Witgoed',
      description: 'Een webwinkel in witgoed kreeg elke handeling vastgelegd, een herstelde productfeed en een begeleide livegang.',
      translated: false,
    }),
    robots: { index: true, follow: true },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkCase c={CASE} />
}
