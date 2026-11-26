import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase, { type Case } from '@/components/rethink/RethinkCase'
import { Tellers } from '@/components/rethink/CaseVisuals'

// W-860. Hoofdcase van Hans (26 nov 2026, Koen): het resultaat voorop, geen
// vergelijking met de periode van voor de nieuwe meting (telefoon en mail
// telden toen niet mee, dus een percentage zou deels de meting zelf meten).
// Het gokpagina- en opruimverhaal staat in een aparte, verstopte case
// (/case-studies/hans-gokpagina, noindex) waar onderaan naar verwezen wordt.
// Citaat: Hans' eigen zin van de PS5-pagina, door Koen goedgekeurd (26 nov).
// Cijfer: Google Ads API (account Hans, actie 'offerte aanvraag indienen'), gelezen
// 26 nov 2026. 1 jul t/m 20 okt: 23 formulieren in 112 dagen. 21 okt t/m 25 nov:
// 16 in 36 dagen. (16/36)/(23/112) = 2,16, dus +116%. Voor 1 juli bestond er geen
// formuliermeting. Budget ging in de tweede periode omhoog (13,30 naar 20 euro per
// dag, logboek 27 okt) en de meting van het formulier is op 21 okt hersteld (https-fix);
// dat staat in de voetnoot. Geen bedragen.
type Props = { params: Promise<{ locale: string }> }

const CASE: Case = {
  eyebrow: 'Klantcase: Hans Schepers Stoffering',
  kop: 'Hoe Hans +116% meer formulieraanvragen per maand kreeg.',
  accent: 'Eerst belde er bijna niemand.',
  knop: 'case_hans_kop',
  lede: 'Hans Schepers herstoffeert meubels in Oirschot. Zijn advertenties stuurden op alles wat hij doet, en de meting telde alleen het formulier. Sinds 15 oktober sturen we op herstofferen en reparatie, en tellen formulier, telefoon en mail elk mee.',
  beeld: (
    <figure className="m-0 rounded-2xl border border-border bg-[#F3F6FA] p-8 sm:p-12">
      <blockquote className="m-0 font-display font-extrabold text-primary" style={{ fontSize: 'clamp(26px, 3.4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
        “Ik was al blij als er iemand een keer belde.”
      </blockquote>
      <figcaption className="mt-5 text-[15px] text-[#5B6B85]">Hans, Hans Schepers Stoffering</figcaption>
    </figure>
  ),
  probleemKop: 'Waar hij mee zat.',
  problemen: [
    {
      t: 'Advertenties zonder duidelijk doel',
      d: 'Ze stuurden op alles wat Hans doet. Hij doet het liefst herstofferen en reparatie.',
    },
    {
      t: 'Telefoon en mail telden niet mee',
      d: 'Alleen het formulier gold als aanvraag, en de meting laadde twee keer. Wie op de advertenties stuurde, stuurde blind.',
    },
    {
      t: 'Echte aanvragen belandden in de spambak',
      d: 'Sinds 1 augustus kwamen 605 inzendingen als spam binnen. Twee daarvan waren echte aanvragen met een foto van een meubel.',
    },
  ],
  aanpakKop: 'Eerst opruimen, dan meten, dan pas sturen.',
  aanpakZin: 'We hebben niets aan de advertenties veranderd voordat de cijfers klopten.',
  aanpak: [
    { t: 'Meting opnieuw opgebouwd', d: 'Een formulier, een telefoontje en een mail tellen nu elk mee, en bij elke aanvraag staat waar die vandaan kwam.' },
    { t: 'Advertenties op het werk dat hij wil', d: 'Herstofferen en reparatie, zoals afgesproken met Hans op 23 oktober.' },
    { t: 'Alle spam doorgelezen', d: 'We lazen de 605 inzendingen door, zetten de 2 echte terug en bouwden een regel: een aanvraag met een foto en een Nederlands of Belgisch nummer gaat nooit meer naar de spam.' },
    { t: 'De site opgeruimd', d: 'Op zijn site stonden gokpagina’s die hij nooit maakte. Die haalden we weg.' },
  ],
  uitkomstKop: 'Resultaten, 21 oktober tot en met 25 november ten opzichte van 1 juli tot en met 20 oktober.',
  uitkomstBeeld: (
    <Tellers
      items={[
        { getal: '+116%', label: 'formulieraanvragen per maand' },
        { getal: '2', label: 'echte aanvragen teruggehaald uit 605 spaminzendingen' },
        { getal: '3 kanalen', label: 'formulier, telefoon en mail tellen weer mee' },
      ]}
    />
  ),
  cijfers: [],
  verwant: {
    tekst: 'Op zijn site stonden ook gokpagina’s. Hoe we dat vonden en opruimden staat in een eigen case.',
    label: 'Lees over de gokpagina’s',
    href: '/case-studies/hans-gokpagina',
  },
  bron: 'Bron: Google Ads van Hans Schepers Stoffering, conversieactie offerte aanvraag indienen, gelezen op 26 november 2026. We vergelijken alleen formulieraanvragen, want die zijn in beide periodes op dezelfde manier gemeten: 23 in de 112 dagen van 1 juli tot en met 20 oktober, 16 in de 36 dagen van 21 oktober tot en met 25 november. Voor 1 juli bestond die meting niet. In de tweede periode ging het dagbudget omhoog en is de meting van het formulier op 21 oktober hersteld, dus een deel van de stijging komt daarvan. Hoeveel opdrachten de aanvragen opleverden is nog niet nagekeken.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/case-studies/hans-schepers',
      locale,
      title: 'Klantcase Hans Schepers Stoffering',
      description: 'Eerst belde er bijna niemand. Nu 116% meer formulieraanvragen per maand voor een stoffeerder in Oirschot.',
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
