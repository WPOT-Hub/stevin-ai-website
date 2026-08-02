import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import VentureLabNav from '@/components/VentureLabNav'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  nl: {
    metaTitle: 'Stevin Venture Lab, voor bedrijven en domeinexperts',
    metaDesc:
      'AI-kansen uit de praktijk omzetten in nieuwe ventures. Voor bedrijven en domeinexperts die een intern probleem willen valideren tot product of startup.',
    eyebrow: 'Voor bedrijven en domeinexperts',
    h1: 'AI-kansen uit de praktijk omzetten in nieuwe ventures.',
    sub: 'Veel organisaties zien waar AI waarde kan toevoegen, maar missen de tijd, het team of de commerciele structuur om er een product of startup van te maken. Stevin Venture Lab helpt die kansen valideren en doorontwikkelen.',
    introH: 'Van intern probleem naar marktpropositie',
    intro: [
      'In veel bedrijven ontstaan AI-kansen vanuit dagelijkse frictie. Een proces kost te veel tijd. Kennis zit verspreid. Klanten stellen steeds dezelfde vragen. Zorgprofessionals verliezen tijd aan administratie.',
      'Soms is zo een probleem niet alleen intern relevant, maar ook waardevol voor een bredere markt. Daar begint Stevin Venture Lab.',
    ],
    helpH: 'Hoe we helpen',
    helpIntro: 'We onderzoeken samen of een probleem kan uitgroeien tot een product, pilot of startup. We kijken naar:',
    help: ['de doelgroep', 'de urgentie van het probleem', 'bestaande alternatieven', 'commerciele waarde', 'benodigde data en processen', 'haalbaarheid van een AI-oplossing', 'eerste pilotklanten', 'mogelijke businessmodellen'],
    helpClose: 'Het doel is niet om direct een groot product te bouwen. Het doel is om snel te ontdekken of de kans groot genoeg is.',
    samenH: 'Mogelijke samenwerkingen',
    samen: [
      { t: 'Als domeinexpert', d: 'Je brengt marktkennis, praktijkervaring en toegang tot een probleem. Wij helpen met validatie, teamvorming, propositie en GTM.' },
      { t: 'Als bedrijf', d: 'Je brengt een concrete AI-kans of intern probleem. Wij helpen onderzoeken of dit kan leiden tot een pilot, product of venture.' },
      { t: 'Als launching customer', d: 'Je test een oplossing vroeg, geeft feedback en helpt een nieuwe AI-venture naar de markt.' },
      { t: 'Als partner', d: 'Je brengt toegang tot markt, data, klanten of expertise en bouwt mee aan nieuwe ventures.' },
    ],
    ctaH: 'Zie je een AI-kans in jouw markt of organisatie?',
    ctaSub: 'Laten we onderzoeken of er een venture in zit.',
    ctaBtn: 'Plan een verkenning',
  },
  en: {
    metaTitle: 'Stevin Venture Lab, for companies and domain experts',
    metaDesc:
      'Turn AI opportunities from practice into new ventures. For companies and domain experts who want to validate an internal problem into a product or startup.',
    eyebrow: 'For companies and domain experts',
    h1: 'Turning AI opportunities from practice into new ventures.',
    sub: 'Many organisations see where AI can add value, but lack the time, team or commercial structure to turn it into a product or startup. Stevin Venture Lab helps validate and develop those opportunities.',
    introH: 'From internal problem to market proposition',
    intro: [
      'In many companies, AI opportunities arise from daily friction. A process takes too much time. Knowledge is scattered. Customers keep asking the same questions. Care professionals lose time on admin.',
      'Sometimes such a problem is not only internally relevant, but valuable for a broader market. That is where Stevin Venture Lab begins.',
    ],
    helpH: 'How we help',
    helpIntro: 'Together we explore whether a problem can grow into a product, pilot or startup. We look at:',
    help: ['the audience', 'the urgency of the problem', 'existing alternatives', 'commercial value', 'required data and processes', 'feasibility of an AI solution', 'first pilot customers', 'possible business models'],
    helpClose: 'The goal is not to build a big product right away. The goal is to quickly discover whether the opportunity is big enough.',
    samenH: 'Possible collaborations',
    samen: [
      { t: 'As a domain expert', d: 'You bring market knowledge, practical experience and access to a problem. We help with validation, team building, proposition and GTM.' },
      { t: 'As a company', d: 'You bring a concrete AI opportunity or internal problem. We help explore whether it can lead to a pilot, product or venture.' },
      { t: 'As a launching customer', d: 'You test a solution early, give feedback and help a new AI venture reach the market.' },
      { t: 'As a partner', d: 'You bring access to market, data, customers or expertise and help build new ventures.' },
    ],
    ctaH: 'Do you see an AI opportunity in your market or organisation?',
    ctaSub: 'Let us explore whether there is a venture in it.',
    ctaBtn: 'Plan an exploration',
  },
} as const

const pick = (l: string) => (l === 'en' ? COPY.en : COPY.nl)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return { title: c.metaTitle, description: c.metaDesc, robots: { index: false, follow: false } }
}

export default async function BedrijvenPage({ params }: Props) {
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
          <h1 className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]" style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '17ch' }}>
            {c.h1}
          </h1>
          <p className="text-white/60 leading-[1.6] mt-7" style={{ fontSize: '19px', maxWidth: '580px' }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-6" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {c.introH}
          </h2>
          <div className="space-y-5">
            {c.intro.map((p) => (
              <p key={p} className="text-[18px] text-[#2A3A54] leading-[1.7]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* HOE WE HELPEN */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-5" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {c.helpH}
          </h2>
          <p className="text-[17px] text-muted leading-[1.7] mb-8">{c.helpIntro}</p>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {c.help.map((h) => (
              <span key={h} className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-[14px] text-primary">{h}</span>
            ))}
          </div>
          <p className="text-[17px] text-[#2A3A54] leading-[1.7]">{c.helpClose}</p>
        </div>
      </section>

      {/* SAMENWERKINGEN */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-12" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {c.samenH}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {c.samen.map((s) => (
              <div key={s.t} className="bg-white p-8 lg:p-10">
                <h3 className="text-[19px] font-display font-bold text-primary mb-3">{s.t}</h3>
                <p className="text-[15px] text-muted leading-[1.65]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-center" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display font-extrabold text-white tracking-[-0.025em] mb-5" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {c.ctaH}
          </h2>
          <p className="text-white/55 leading-[1.6] mb-9 mx-auto" style={{ fontSize: '18px', maxWidth: '460px' }}>
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
