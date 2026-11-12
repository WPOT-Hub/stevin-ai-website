import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

// Overzichtspagina voor de vier juridische documenten. Koen, 12 nov 2026: de
// vier losse links in de footer horen onder een kopje met uitleg. De
// documenten zelf staan nog op hun eigen URL (/terms, /dpa, /privacy, /nda),
// want die worden aangehaald in offertes, het klantportaal en contracten
// (ter hand stellen, art. 6:233 sub b en 6:234 BW). Hier staan ze met een
// directe link, geen verstopte of ingeklapte tekst. Staat bewust niet in de
// sitemap, net als de documenten zelf.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Legal documents' : 'Juridische documenten',
    description: isEn
      ? 'The agreements we work under, in plain language, with a link to each full document.'
      : 'De afspraken waaronder we werken, in gewone taal, met een link naar elk volledig document.',
    alternates: {
      canonical: isEn ? 'https://stevin.ai/en/juridisch' : 'https://stevin.ai/juridisch',
      languages: {
        'nl-NL': 'https://stevin.ai/juridisch',
        en: 'https://stevin.ai/en/juridisch',
        'x-default': 'https://stevin.ai/juridisch',
      },
    },
  }
}

type Doc = { href: '/terms' | '/dpa' | '/privacy' | '/nda'; title: string; what: string; when: string }

const NL_DOCS: Doc[] = [
  {
    href: '/terms',
    title: 'Algemene Voorwaarden',
    what:
      'De afspraken over onze dienstverlening. Wat we leveren, wat we niet doen, hoe tarieven en facturen werken, wat je van onze beschikbaarheid mag verwachten, wie waarvoor aansprakelijk is en hoe je opzegt.',
    when: 'Ze gelden bij elke offerte en elke overeenkomst met Stevin.AI.',
  },
  {
    href: '/dpa',
    title: 'Verwerkersovereenkomst',
    what:
      'Wij werken met gegevens uit jouw advertentie- en meetaccounts, ook met persoonsgegevens van bezoekers en leads. De AVG schrijft voor dat je daar schriftelijke afspraken over maakt. Hier staat welke gegevens we gebruiken, waarvoor, hoe we ze beveiligen, welke partijen we inschakelen en wat we doen bij een datalek.',
    when: 'Ze maakt deel uit van de Algemene Voorwaarden en geldt voor elke klant die ons platform gebruikt.',
  },
  {
    href: '/privacy',
    title: 'Privacyverklaring',
    what:
      'Wat we over jou en over bezoekers van onze site vastleggen, waarom, hoe lang we het bewaren, met wie we het delen en welke rechten je hebt. Ook de uitleg over cookies staat hier.',
    when: 'Ze geldt voor iedereen die onze site bezoekt of contact met ons opneemt.',
  },
  {
    href: '/nda',
    title: 'Geheimhoudingsovereenkomst',
    what:
      'Wederzijdse afspraken om vertrouwelijke informatie vertrouwelijk te houden. Voor jou gaat het om campagnedata en bedrijfsgegevens. Voor ons gaat het om hoe ons platform werkt. Je leest ook hoe lang de plicht duurt en wat er gebeurt met informatie als we stoppen.',
    when: 'Hij geldt tussen Stevin.AI en elke klant, en ook voordat je klant wordt.',
  },
]

const EN_DOCS: Doc[] = [
  {
    href: '/terms',
    title: 'Terms of Service',
    what:
      'The agreements about our service. What we deliver, what we do not do, how fees and invoices work, what you can expect from our availability, who is liable for what and how you cancel.',
    when: 'They apply to every quote and every agreement with Stevin.AI.',
  },
  {
    href: '/dpa',
    title: 'Data Processing Agreement',
    what:
      'We work with data from your advertising and measurement accounts, including personal data of visitors and leads. The GDPR requires written agreements for that. This document says which data we use, for what, how we protect it, which parties we use and what we do after a data breach.',
    when: 'It is part of the Terms of Service and applies to every customer who uses our platform.',
  },
  {
    href: '/privacy',
    title: 'Privacy Statement',
    what:
      'What we record about you and about visitors to our site, why, how long we keep it, who we share it with and which rights you have. The explanation about cookies is here too.',
    when: 'It applies to everyone who visits our site or contacts us.',
  },
  {
    href: '/nda',
    title: 'Non-Disclosure Agreement',
    what:
      'Mutual agreements to keep confidential information confidential. For you that is campaign data and business information. For us it is how our platform works. It also says how long the duty lasts and what happens to information when we stop working together.',
    when: 'It applies between Stevin.AI and every customer, and also before you become one.',
  },
]

export default async function JuridischPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isEn = locale === 'en'
  const docs = isEn ? EN_DOCS : NL_DOCS

  return (
    <main className="bg-surface text-primary">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            {isEn ? 'Legal documents' : 'Juridische documenten'}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {isEn
              ? 'Here are the agreements we work under. You do not need to read them all to get started. You can open each one at any time.'
              : 'Hier staan de afspraken waaronder we werken. Je hoeft ze niet allemaal te lezen om te beginnen. Je kunt elk document op elk moment openen.'}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold">
            {isEn ? 'Why we put this in writing' : 'Waarom we dit vastleggen'}
          </h2>
          <p className="mt-3 leading-relaxed">
            {isEn
              ? 'We work in your advertising accounts and with your website data. That asks for clear agreements up front: who does what, who is responsible for what, and what happens to your data.'
              : 'We werken in jouw advertentieaccounts en met de data van je website. Dat vraagt om heldere afspraken vooraf: wie doet wat, wie is waarvoor verantwoordelijk en wat gebeurt er met jouw gegevens.'}
          </p>
          <p className="mt-3 leading-relaxed">
            {isEn
              ? 'We would rather agree this now than explain it later in a dispute. A clear agreement protects you, and it protects us.'
              : 'We maken dit liever nu af dan dat we het later in een discussie moeten uitleggen. Een duidelijke afspraak beschermt jou en ons.'}
          </p>
          <p className="mt-3 leading-relaxed">
            {isEn
              ? 'Something unclear, or you want to agree something different? Tell us before you sign. Email info@stevin.ai.'
              : 'Is iets onduidelijk, of wil je iets anders afspreken? Zeg het voor je tekent. Mail naar info@stevin.ai.'}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            {isEn ? 'The four documents' : 'De vier documenten'}
          </h2>
          <ul className="mt-6 m-0 list-none space-y-4 p-0">
            {docs.map((d) => (
              <li key={d.href} className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-lg font-semibold">
                  <Link href={d.href} className="underline underline-offset-4 hover:no-underline">
                    {d.title}
                  </Link>
                </h3>
                <p className="mt-2 leading-relaxed">{d.what}</p>
                <p className="mt-2 text-sm text-muted">{d.when}</p>
                <p className="mt-3 text-sm">
                  <Link href={d.href} className="font-medium underline underline-offset-4 hover:no-underline">
                    {isEn ? `Read the ${d.title}` : `Lees de ${d.title}`}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-border pt-8 text-xs text-muted space-y-2">
          <p>
            {isEn
              ? <>Stevin.AI is the trade name of <strong>Stevin.AI B.V.</strong>, registered with the Dutch Chamber of Commerce (KvK) under number <strong>42138941</strong>, with its registered seat in <strong>Breda, the Netherlands</strong>, VAT number <strong>NL869893610B01</strong>.</>
              : <>Stevin.AI is de handelsnaam van <strong>Stevin.AI B.V.</strong>, ingeschreven bij de Kamer van Koophandel onder nummer <strong>42138941</strong>, statutair gevestigd te <strong>Breda</strong>, btw-nummer <strong>NL869893610B01</strong>.</>}
          </p>
          <p>Contact: <a className="underline" href="mailto:info@stevin.ai">info@stevin.ai</a></p>
        </footer>
      </div>
    </main>
  )
}
