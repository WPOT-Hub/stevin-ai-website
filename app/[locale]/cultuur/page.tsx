import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import { localizedMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

// Verdeelpagina, 5 sep 2026 (W-042). Bewust kort: drie keuzes en niets anders.
// "Cultuur" is te breed voor een belofte; een museum, een podium en een
// tourshow hebben elk een ander probleem, dus elk een eigen pagina.

const COPY = {
  nl: {
    eyebrow: 'Voor de cultuursector',
    h1: 'Cultuur is geen sector. Het zijn er drie.',
    sub: 'Een museum wil de bezoeker die nog niet aan hem dacht. Een podium wil de slaper in het ticketsysteem terug. Een tournee heeft een datum die niet schuift. Kies wat op jou lijkt.',
    keuzes: [
      { href: '/musea', t: 'Musea', d: 'Collectie, doorlopend programma, klein team, vaak een Google Ad Grant. Wie je kent vindt je, wie je niet kent vindt een ander.' },
      { href: '/podia', t: 'Podia en concertzalen', d: 'Een seizoen vol voorstellingen, een ticketsysteem met labels, en een campagne per titel. Van seizoen naar seizoen leren in plaats van opnieuw beginnen.' },
      { href: '/evenementen', t: 'Evenementen en tourshows', d: 'On-sale, premiere, laatste dagen. Per stad, per fase, per dag sturen, met een geheugen dat de tournee overleeft.' },
    ],
  },
  en: {
    eyebrow: 'For the cultural sector',
    h1: 'Culture is not one sector. It is three.',
    sub: 'A museum wants the visitor who was not thinking of it yet. A venue wants the dormant customer in the ticketing system back. A tour has a date that does not move. Pick the one that looks like you.',
    keuzes: [
      { href: '/musea', t: 'Museums', d: 'A collection, a continuous programme, a small team, often a Google Ad Grant. People who know you find you, people who do not find someone else.' },
      { href: '/podia', t: 'Venues and concert halls', d: 'A season full of shows, a ticketing system with labels, and a campaign per title. Learning from season to season instead of starting over.' },
      { href: '/evenementen', t: 'Events and touring shows', d: 'On-sale, premiere, last days. Steering per city, per phase, per day, with a memory that outlives the tour.' },
    ],
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/cultuur',
    title: nl ? 'Marketing voor de cultuursector' : 'Marketing for the cultural sector',
    description: nl
      ? 'Musea, podia en tourshows hebben elk een ander probleem. Drie pagina\'s, kies wat op jou lijkt.'
      : 'Museums, venues and touring shows each have a different problem. Three pages, pick the one that looks like you.',
  })
}

export default async function CultuurPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = locale === 'en' ? COPY.en : COPY.nl
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/50">{c.eyebrow}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">{c.h1}</h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">{c.sub}</p>
          </div>
        </div>
      </section>
      <Section bg="white">
        <div className="grid gap-6 md:grid-cols-3">
          {c.keuzes.map((k) => (
            <Link key={k.href} href={k.href} className="group rounded-xl border border-border bg-white p-6 hover:border-accent transition-colors">
              <h2 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">{k.t}</h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">{k.d}</p>
              <p className="mt-5 text-sm font-medium text-accent">{locale === 'en' ? 'Read more' : 'Lees verder'} <span aria-hidden="true">&rarr;</span></p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
