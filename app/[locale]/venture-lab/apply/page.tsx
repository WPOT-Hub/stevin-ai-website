import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import VentureLabNav from '@/components/VentureLabNav'
import VentureLabApplyForm from '@/components/VentureLabApplyForm'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  nl: {
    metaTitle: 'Stevin Venture Lab, aanmelden',
    metaDesc:
      'Meld je interesse in Stevin Venture Lab. Voor founders, developers, product owners, domeinexperts, bedrijven en partners die AI-oplossingen willen bouwen met echte marktwaarde.',
    eyebrow: 'Aanmelden',
    h1: 'Meld je interesse in Stevin Venture Lab.',
    sub: 'We zoeken founders, developers, product owners, domeinexperts, bedrijven en partners die AI-oplossingen willen bouwen met echte marktwaarde.',
    afterH: 'Verwachting na aanmelding',
    after: [
      'Na je aanmelding bekijken we of er een duidelijke match is met Stevin Venture Lab. We letten vooral op probleem, markt, team, snelheid en commercieel potentieel.',
      'Als er een goede fit is, plannen we een verkennend gesprek. Niet elk idee gaat door. Dat is juist onderdeel van het proces. We steken tijd en energie in kansen waar echte marktwaarde in zit.',
    ],
  },
  en: {
    metaTitle: 'Stevin Venture Lab, apply',
    metaDesc:
      'Register your interest in Stevin Venture Lab. For founders, developers, product owners, domain experts, companies and partners who want to build AI solutions with real market value.',
    eyebrow: 'Apply',
    h1: 'Register your interest in Stevin Venture Lab.',
    sub: 'We are looking for founders, developers, product owners, domain experts, companies and partners who want to build AI solutions with real market value.',
    afterH: 'What to expect after applying',
    after: [
      'After you apply, we assess whether there is a clear match with Stevin Venture Lab. We mainly look at problem, market, team, speed and commercial potential.',
      'If there is a good fit, we schedule an exploratory call. Not every idea moves forward. That is part of the process. We invest time and energy in opportunities with real market value.',
    ],
  },
} as const

const pick = (l: string) => (l === 'en' ? COPY.en : COPY.nl)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return { title: c.metaTitle, description: c.metaDesc, robots: { index: false, follow: false } }
}

export default async function ApplyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)

  return (
    <main>
      {/* HERO */}
      <section className="hero-mesh-gradient -mt-[72px]" style={{ padding: 'calc(96px + 56px) 24px 80px' }}>
        <div className="mx-auto max-w-[1120px]">
          <VentureLabNav locale={locale} />
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.03em]" style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '18ch' }}>
            {c.h1}
          </h1>
          <p className="text-white/60 leading-[1.6] mt-7" style={{ fontSize: '19px', maxWidth: '600px' }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* FORMULIER */}
      <section className="bg-surface" style={{ padding: '72px 24px 96px' }}>
        <div className="mx-auto max-w-[760px]">
          <VentureLabApplyForm locale={locale} />
        </div>
      </section>

      {/* VERWACHTING */}
      <section className="bg-white" style={{ padding: '0 24px 110px' }}>
        <div className="mx-auto max-w-[680px]">
          <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-6" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {c.afterH}
          </h2>
          <div className="space-y-5">
            {c.after.map((p) => (
              <p key={p} className="text-[18px] text-[#2A3A54] leading-[1.7]">{p}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
