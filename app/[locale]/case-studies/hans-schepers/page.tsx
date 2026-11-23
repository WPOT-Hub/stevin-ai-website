import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase, { type Case } from '@/components/rethink/RethinkCase'
import { BeeldKader, Tellers } from '@/components/rethink/CaseVisuals'

// W-860. NIET LIVE ZETTEN ZONDER AKKOORD VAN HANS SCHEPERS. Staat op noindex
// en niet in de sitemap, zonder citaat tot Hans de exacte zin goedkeurt.
// Bron: Stevin-company/legal/klanten/hansschepers (LOGBOEK.md, 15 okt en 17 nov)
// en het Internet Archive (snapshot van 17 april 2026, zelf geopend op 23 nov).
// Geen bedragen. Het vorige bureau noemen we niet bij naam.
type Props = { params: Promise<{ locale: string }> }

const CASE: Case = {
  eyebrow: 'Klantcase: Hans Schepers Stoffering',
  kop: 'Op zijn site stonden gokpagina’s.',
  accent: 'Hans wist van niets.',
  knop: 'case_hans_kop',
  lede: 'Hans herstoffeert meubels in Oirschot. Zijn site was gebouwd door een paar jongens die ook zijn vindbaarheid deden. Op papier liep alles. In de praktijk belde er bijna niemand. In de eerste week vonden we waarom.',
  beeld: (
    <BeeldKader
      src="/images/cases/hans-gokpagina-2026-04-17.jpg"
      alt="Een casinopagina op hansschepers.nl uit het Internet Archive, met de koptekst bet365 Casino Review en onderaan Hans' telefoonnummer en aanvraagformulier"
      breedte={800}
      hoogte={500}
      url="hansschepers.nl/bet365-nl/"
      bijschrift="Een van de gokpagina's op Hans' site, zoals het Internet Archive hem vastlegde op 17 april 2026. Onderaan staan zijn telefoonnummer en zijn aanvraagformulier."
    />
  ),
  probleemKop: 'Wat we aantroffen.',
  problemen: [
    {
      t: '137 of meer gokpagina’s die Hans nooit maakte',
      d: 'Casinoreviews en gokgidsen, in meerdere talen, tussen zijn eigen pagina’s. Het Internet Archive had ze al op 17 april vastgelegd, zes maanden voor onze start. Hoe ze er kwamen weten we niet.',
    },
    {
      t: 'De meting laadde twee keer',
      d: 'Google Tag Manager stond dubbel op de site. Telefoontjes en mails telden al maanden niet meer als aanvraag, alleen het formulier. Wie op de advertenties stuurde, stuurde blind.',
    },
    {
      t: 'Echte aanvragen belandden in de spambak',
      d: 'Sinds 1 augustus kwamen 605 inzendingen als spam binnen. Twee daarvan waren echte aanvragen met een foto van een meubel.',
    },
    {
      t: 'Advertenties zonder duidelijk doel',
      d: 'Ze stuurden op alles wat Hans doet. Hij doet het liefst herstofferen en reparatie.',
    },
  ],
  aanpakKop: 'Eerst opruimen, dan meten, dan pas sturen.',
  aanpakZin: 'We hebben niets aan de advertenties veranderd voordat de cijfers klopten.',
  aanpak: [
    { t: 'Gokpagina’s weg', d: 'Op 15 oktober haalden we alle pagina’s weg, in elk posttype en elke status. Daarna 0 treffers. De oude adressen geven nu 404.' },
    { t: 'Meting opnieuw opgebouwd', d: 'Een formulier, een telefoontje en een mail tellen nu elk mee, en bij elke aanvraag staat waar die vandaan kwam.' },
    { t: 'Advertenties op het werk dat hij wil', d: 'Herstofferen en reparatie, zoals afgesproken met Hans op 23 oktober.' },
    { t: 'Alle spam doorgelezen', d: 'We lazen de 605 inzendingen door, zetten de 2 echte terug en bouwden een regel: een aanvraag met een foto en een Nederlands of Belgisch nummer gaat nooit meer naar de spam.' },
  ],
  uitkomstKop: 'Wat het oplevert.',
  uitkomstBeeld: (
    <Tellers
      items={[
        { getal: '137+', label: 'gokpagina’s weggehaald in de eerste week' },
        { getal: '605', label: 'spaminzendingen doorgelezen, 2 echte aanvragen teruggezet' },
        { getal: '3 kanalen', label: 'formulier, telefoon en mail tellen weer mee' },
      ]}
    />
  ),
  cijfers: [],
  bron: 'Bron: logboek Hans Schepers Stoffering (15 oktober en 17 november 2026) en het Internet Archive, snapshot van 17 april 2026. Hoeveel opdrachten de aanvragen opleverden is nog niet nagekeken.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/case-studies/hans-schepers',
      locale,
      title: 'Klantcase Hans Schepers Stoffering',
      description: 'Op de site van een stoffeerder stonden gokpagina’s en de meting liep scheef. Wat we vonden en wat we deden.',
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
