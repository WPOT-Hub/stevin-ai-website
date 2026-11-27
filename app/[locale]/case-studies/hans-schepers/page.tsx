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
// Cijfer (27 nov 2026, Koen: "bijna drie keer"): Google Ads API, account Hans, gelezen
// 27 nov 2026 10:18, per conversieactie. 1 jul t/m 20 okt (112 dagen): formulier 23,
// Telefoonklik 2, Mail klik 1, samen 26. 21 okt t/m 25 nov (36 dagen): formulier 16,
// Telefoonklik 3, Mail klik 3, chat 1, samen 23. (23/36)/(26/112) = 2,75. GA4 Telefoon en
// GA4 Email zijn dezelfde klik en tellen niet dubbel mee. Kanttekeningen staan in de
// voetnoot: dagbudget omhoog (13,30 naar 20 euro, logboek 27 okt), meting hersteld rond
// 21 okt, chat bestond eerder niet, telefoon en mail zijn kliks. Geen bedragen.
type Props = { params: Promise<{ locale: string }> }

const CASE: Case = {
  eyebrow: 'Klantcase: Hans Schepers Stoffering',
  kop: 'Bijna drie keer zoveel aanvragen voor Hans.',
  accent: 'Voor het werk dat hij het liefst doet.',
  knop: 'case_hans_kop',
  lede: 'Hans Schepers herstoffeert meubels in Oirschot. Zijn advertentiebudget ging naar alle klussen tegelijk, en echte aanvragen belandden in de spam. Wij richtten zijn advertenties op herstofferen en reparatie. Nu komen er bijna drie keer zoveel aanvragen binnen als daarvoor.',
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
      t: 'Het budget was versnipperd',
      d: 'Het geld ging naar advertenties voor alle klussen die Hans kan doen. Voor herstofferen en reparatie, het werk dat hij het liefst doet, bleef te weinig over.',
    },
    {
      t: 'Google kreeg een scheef beeld van de aanvragen',
      d: 'Bij Hans telde elke aanvraag via het formulier dubbel in Google Ads. Aanvragen per telefoon of mail bleven buiten beeld. Met die cijfers zocht Google naar meer mensen die een formulier zouden invullen. Welke aanvragen ook echt een klant opleverden, wist Google niet.',
    },
    {
      t: 'Echte aanvragen belandden in de spambak',
      d: 'In ruim drie maanden kwamen 605 inzendingen als spam binnen. Twee daarvan waren echte aanvragen met een foto van een meubel.',
    },
  ],
  aanpakKop: 'Eerst opruimen, dan meten, dan pas sturen.',
  aanpakZin: 'We hebben niets aan de advertenties veranderd voordat de cijfers klopten.',
  aanpak: [
    { t: 'Meting opnieuw opgebouwd', d: 'Een formulier, een telefoontje en een mail tellen nu elk mee, en bij elke aanvraag staat waar die vandaan kwam.' },
    { t: 'Advertenties op het werk dat hij wil', d: 'Herstofferen en reparatie, zoals afgesproken met Hans.' },
    { t: 'Alle spam doorgelezen', d: 'We lazen de 605 inzendingen door, zetten de 2 echte terug en bouwden een regel: een aanvraag met een foto en een Nederlands of Belgisch nummer gaat nooit meer naar de spam.' },
    { t: 'De site opgeruimd', d: 'Op zijn site stonden gokpagina’s die hij nooit maakte. Die haalden we weg.' },
  ],
  uitkomstKop: 'Wat het oplevert.',
  uitkomstBeeld: (
    <Tellers
      items={[
        { getal: 'Bijna 3x', label: 'zoveel aanvragen per maand als in de periode ervoor' },
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
  dienst: {
    tekst: 'Zo werken wij voor elke klant met Google Ads: eerst goed zetten, dan pas beheren.',
    label: 'Lees over Google Ads uitbesteden',
    href: '/google-ads-uitbesteden',
  },
  bron: 'Bron: Google Ads van Hans Schepers Stoffering, gelezen op 27 november 2026. We tellen aanvragen via het formulier, kliks op het telefoonnummer en het mailadres op de site, en gestarte chats. Van 1 juli tot en met 20 oktober waren dat er 26 in 112 dagen (23 formulieren, 2 telefoon, 1 mail). Van 21 oktober tot en met 25 november 23 in 36 dagen (16 formulieren, 3 telefoon, 3 mail, 1 chat). Per maand is dat 2,75 keer zoveel. In de tweede periode ging het dagbudget omhoog, is de meting hersteld en kwam de chat erbij, dus een deel van de stijging komt daarvan. Een klik op het telefoonnummer of mailadres is nog geen gesprek. Hoeveel opdrachten de aanvragen opleverden is nog niet nagekeken.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/case-studies/hans-schepers',
      locale,
      title: 'Klantcase Hans Schepers Stoffering',
      description: 'Bijna drie keer zoveel aanvragen per maand voor een stoffeerder in Oirschot. Zo pakten we het aan.',
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
