import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import VentureLabNav from '@/components/VentureLabNav'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  nl: {
    metaTitle: 'Stevin Venture Lab, voor founders',
    metaDesc:
      'Voor founders die sneller bewijs willen. Van AI-idee naar gevalideerde startupkans, met marktvalidatie, positionering, GTM en fundingvoorbereiding.',
    eyebrow: 'Voor founders',
    h1: 'Voor founders die sneller bewijs willen.',
    sub: 'Heb je een AI-idee, maar nog geen scherpe markt, propositie of eerste klanten? Stevin Venture Lab helpt je van idee naar gevalideerde startupkans.',
    herkenbaarH: 'Herkenbaar?',
    herkenbaar: [
      'Je hebt een idee waarvan je voelt dat er iets in zit. Misschien heb je al een prototype gebouwd. Misschien heb je alleen nog een probleem scherp.',
      'De grootste valkuil is te vroeg bouwen. Daarom starten we niet met features, maar met bewijs.',
    ],
    krijgH: 'Wat je krijgt',
    krijg: [
      { t: 'Marktvalidatie', d: 'We onderzoeken wie de koper is, hoe groot het probleem is en of er bereidheid is om te betalen.' },
      { t: 'Positionering', d: 'We maken je propositie scherper, concreter en verkoopbaar.' },
      { t: 'GTM-begeleiding', d: 'Doelgroepkeuze, salesaanpak, pricing, pilotstructuur en eerste outreach.' },
      { t: 'Productrichting', d: 'We bepalen welke versie minimaal nodig is om de markt te testen.' },
      { t: 'Commerciele feedback', d: 'Directe input op je verhaal, aanbod, deck, demo en klantgesprekken.' },
      { t: 'Fundingvoorbereiding', d: 'Als het idee sterk genoeg is, helpen we met pitchdeck, investor narrative en de route naar funding.' },
    ],
    zoekenH: 'Wat we zoeken',
    zoekenIntro: 'Founders en builders met snelheid, nieuwsgierigheid en realiteitszin. Je hoeft nog geen volledig team of product te hebben. Wel de bereidheid om snel te testen en scherp te kiezen.',
    zoeken: ['je kent een concreet probleem', 'je hebt toegang tot een doelgroep', 'je kunt bouwen of organiseren', 'je staat open voor commerciele validatie', 'je wilt een bedrijf bouwen, geen losse tool'],
    nietH: 'Wat we niet zoeken',
    niet: 'We zoeken geen ideeen die alleen interessant zijn omdat AI erin zit. Geen teams die maanden willen bouwen zonder marktcontact. Geen vage platformconcepten zonder duidelijke eerste koper. Een goed idee mag klein beginnen. Maar het moet wel scherp zijn.',
    ctaH: 'Wil je ontdekken of jouw AI-idee startupwaardig is?',
    ctaSub: 'Meld je aan. We bekijken of je past bij een volgende Venture Sprint.',
    ctaBtn: 'Aanmelden als founder',
  },
  en: {
    metaTitle: 'Stevin Venture Lab, for founders',
    metaDesc:
      'For founders who want proof faster. From AI idea to validated startup opportunity, with market validation, positioning, GTM and fundraise preparation.',
    eyebrow: 'For founders',
    h1: 'For founders who want proof faster.',
    sub: 'Do you have an AI idea, but no sharp market, proposition or first customers yet? Stevin Venture Lab helps you go from idea to a validated startup opportunity.',
    herkenbaarH: 'Sound familiar?',
    herkenbaar: [
      'You have an idea you feel is onto something. Maybe you already built a prototype. Maybe you only have a sharp problem.',
      'The biggest trap is building too early. That is why we do not start with features, but with proof.',
    ],
    krijgH: 'What you get',
    krijg: [
      { t: 'Market validation', d: 'We research who the buyer is, how big the problem is and whether there is willingness to pay.' },
      { t: 'Positioning', d: 'We make your proposition sharper, more concrete and sellable.' },
      { t: 'GTM guidance', d: 'Audience choice, sales approach, pricing, pilot structure and first outreach.' },
      { t: 'Product direction', d: 'We decide the minimum version needed to test the market.' },
      { t: 'Commercial feedback', d: 'Direct input on your story, offer, deck, demo and customer conversations.' },
      { t: 'Fundraise preparation', d: 'If the idea is strong enough, we help with pitch deck, investor narrative and the route to funding.' },
    ],
    zoekenH: 'What we look for',
    zoekenIntro: 'Founders and builders with speed, curiosity and realism. You do not need a full team or product yet. But you need the willingness to test fast and choose sharply.',
    zoeken: ['you know a concrete problem', 'you have access to an audience', 'you can build or organise', 'you are open to commercial validation', 'you want to build a company, not just a tool'],
    nietH: 'What we do not look for',
    niet: 'We do not look for ideas that are only interesting because AI is in them. No teams that want to build for months without market contact. No vague platform concepts without a clear first buyer. A good idea may start small. But it has to be sharp.',
    ctaH: 'Want to find out if your AI idea is startup-worthy?',
    ctaSub: 'Apply. We will see whether you fit a next Venture Sprint.',
    ctaBtn: 'Apply as a founder',
  },
} as const

const pick = (l: string) => (l === 'en' ? COPY.en : COPY.nl)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return { title: c.metaTitle, description: c.metaDesc, robots: { index: false, follow: false } }
}

export default async function FoundersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)

  return (
    <main>
      {/* HERO */}
      <section className="hero-mesh-gradient -mt-[72px]" style={{ padding: 'calc(96px + 56px) 24px 96px' }}>
        <div className="mx-auto max-w-[1120px]">
          <VentureLabNav locale={locale} />
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]" style={{ fontSize: 'clamp(36px, 5vw, 70px)', maxWidth: '16ch' }}>
            {c.h1}
          </h1>
          <p className="text-white/60 leading-[1.6] mt-7" style={{ fontSize: '19px', maxWidth: '560px' }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* HERKENBAAR */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-6" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}>
            {c.herkenbaarH}
          </h2>
          <div className="space-y-5">
            {c.herkenbaar.map((p) => (
              <p key={p} className="text-[18px] text-[#2A3A54] leading-[1.7]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* WAT JE KRIJGT */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-12" style={{ fontSize: 'clamp(26px, 3.2vw, 44px)' }}>
            {c.krijgH}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {c.krijg.map((f, i) => (
              <div key={f.t} className="border-b border-border py-9 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[18px] font-display font-bold text-primary mb-3 leading-tight">{f.t}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZOEKEN / NIET ZOEKEN */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-5" style={{ fontSize: 'clamp(24px, 2.8vw, 34px)' }}>
              {c.zoekenH}
            </h2>
            <p className="text-[16px] text-muted leading-[1.7] mb-6">{c.zoekenIntro}</p>
            <ul className="space-y-3">
              {c.zoeken.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[16px] text-[#2A3A54]">
                  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-5" style={{ fontSize: 'clamp(24px, 2.8vw, 34px)' }}>
              {c.nietH}
            </h2>
            <p className="text-[17px] text-muted leading-[1.7]">{c.niet}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-center" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display font-extrabold text-white tracking-[-0.025em] mb-5" style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}>
            {c.ctaH}
          </h2>
          <p className="text-white/55 leading-[1.6] mb-9 mx-auto" style={{ fontSize: '18px', maxWidth: '480px' }}>
            {c.ctaSub}
          </p>
          <Link href="/venture-lab/apply" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-8 py-4 rounded-lg hover:bg-[#7BB8FF] transition-colors">
            {c.ctaBtn}
          </Link>
        </div>
      </section>
    </main>
  )
}
