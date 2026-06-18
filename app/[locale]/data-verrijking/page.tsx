import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  nl: {
    metaTitle: 'Data koppelen, verrijken en classificeren, Stevin',
    metaDesc:
      'Ruwe, verspreide data uit je systemen wordt schoon, compleet en geordend. Klaar om signalen, rapportage en agents uit te halen, met de bron bij elke verrijking.',
    eyebrow: 'Structuur in je data',
    h1: 'Data koppelen, verrijken en classificeren.',
    sub: 'Ruwe, verspreide data uit je systemen wordt schoon, compleet en geordend. Geen losse eilanden meer, maar een plek waar je data klaarstaat om signalen en acties uit te halen.',
    cta: 'Plan een gesprek',
    problemEyebrow: 'Het probleem',
    problemH2: 'Je data is er wel. Alleen niet bruikbaar.',
    problemBody:
      'In de meeste bedrijven zit de data verspreid over tientallen systemen, half ingevuld en inconsistent. Dezelfde klant heet overal net anders, velden zijn leeg, categorieen kloppen niet. Zonder structuur is het geen bezit, maar ruis. En op ruis kun je niet sturen.',
    howEyebrow: 'Hoe het werkt',
    howH2: 'Van rommelige data naar een schoon fundament.',
    howIntro:
      'Stevin doet het werk dat niemand leuk vindt, maar dat alles bepaalt. In vier stappen wordt je data klaar voor gebruik.',
    steps: [
      { t: 'Koppelen', d: 'Stevin haalt data uit de systemen die je al gebruikt, realtime op een plek. Geen export, geen middleware.' },
      { t: 'Opschonen', d: 'Dubbele records, lege velden en inconsistenties worden eruit gehaald. Schone data om op te bouwen.' },
      { t: 'Verrijken', d: 'Ontbrekende gegevens worden aangevuld met context uit je eigen systemen en externe bronnen. Een half record wordt een compleet beeld.' },
      { t: 'Classificeren', d: 'Alles wordt geordend en getagd, zodat je data vindbaar, vergelijkbaar en bruikbaar wordt voor signalen en agents.' },
    ],
    controlEyebrow: 'Geen black box',
    controlH2: 'Elke verrijking toont waar hij vandaan komt.',
    controlBody:
      'Stevin verzint geen data. Elke aanvulling en elke classificatie is herleidbaar naar de bron, en wijzigingen worden gelogd. Twijfel je aan een veld, dan zie je precies waar het op gebaseerd is. Zo bouw je op betrouwbare data, niet op gokwerk.',
    getEyebrow: 'Wat het oplevert',
    get: [
      'Schone, complete data in plaats van losse eilanden',
      'Minder handmatig opschonen en formatteren',
      'Data die klaarstaat voor signalen, rapportage en agents',
      'Bron en logboek bij elke verrijking',
    ],
    ctaH2: 'Hoe schoon is jouw data echt?',
    ctaSub: 'Plan een gesprek. We kijken samen naar je systemen en wat er nodig is om er een fundament van te maken.',
    ctaBtn: 'Plan een gesprek',
  },
  en: {
    metaTitle: 'Connect, enrich and classify your data, Stevin',
    metaDesc:
      'Raw, scattered data from your systems becomes clean, complete and organised. Ready for signals, reporting and agents, with the source at every enrichment.',
    eyebrow: 'Structure in your data',
    h1: 'Connect, enrich and classify your data.',
    sub: 'Raw, scattered data from your systems becomes clean, complete and organised. No more islands, but one place where your data is ready to turn into signals and actions.',
    cta: 'Book a call',
    problemEyebrow: 'The problem',
    problemH2: 'Your data is there. It just is not usable.',
    problemBody:
      'In most businesses, data is scattered across dozens of systems, half filled in and inconsistent. The same customer is named slightly differently everywhere, fields are empty, categories are wrong. Without structure it is not an asset, it is noise. And you cannot steer on noise.',
    howEyebrow: 'How it works',
    howH2: 'From messy data to a clean foundation.',
    howIntro:
      'Stevin does the work nobody enjoys, but that determines everything. In four steps your data becomes ready to use.',
    steps: [
      { t: 'Connect', d: 'Stevin pulls data from the systems you already use, into one place in real-time. No export, no middleware.' },
      { t: 'Clean', d: 'Duplicate records, empty fields and inconsistencies are removed. Clean data to build on.' },
      { t: 'Enrich', d: 'Missing data is filled in with context from your own systems and external sources. A half record becomes a complete picture.' },
      { t: 'Classify', d: 'Everything is organised and tagged, so your data becomes findable, comparable and usable for signals and agents.' },
    ],
    controlEyebrow: 'No black box',
    controlH2: 'Every enrichment shows where it came from.',
    controlBody:
      'Stevin does not make up data. Every addition and classification is traceable to the source, and changes are logged. Doubt a field, and you see exactly what it is based on. That way you build on reliable data, not on guesswork.',
    getEyebrow: 'What you get',
    get: [
      'Clean, complete data instead of loose islands',
      'Less manual cleaning and formatting',
      'Data that is ready for signals, reporting and agents',
      'Source and audit log at every enrichment',
    ],
    ctaH2: 'How clean is your data really?',
    ctaSub: 'Book a call. Together we look at your systems and what it takes to turn them into a foundation.',
    ctaBtn: 'Book a call',
  },
} as const

const pick = (l: string) => (l === 'en' ? COPY.en : COPY.nl)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return localizedMetadata({
    path: '/data-verrijking',
    locale,
    title: c.metaTitle,
    description: c.metaDesc,
  })
}

export default async function DataVerrijkingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)

  return (
    <main>
      {/* HERO met dimmed foto */}
      <section className="relative -mt-[72px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/work-focus.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(150deg, rgba(10,22,40,0.86) 0%, rgba(10,22,40,0.9) 45%, rgba(10,22,40,0.97) 100%)' }}
        />
        <div className="relative mx-auto max-w-[1120px]" style={{ padding: 'calc(96px + 64px) 24px 120px' }}>
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]" style={{ fontSize: 'clamp(38px, 5.2vw, 72px)', maxWidth: '15ch' }}>
            {c.h1}
          </h1>
          <p className="text-white/70 leading-[1.6] mt-7" style={{ fontSize: '19px', maxWidth: '600px' }}>
            {c.sub}
          </p>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-8 py-4 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEEM */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-20">
          <div>
            <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
              <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
              {c.problemEyebrow}
            </p>
            <h2 className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em]" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
              {c.problemH2}
            </h2>
          </div>
          <p className="text-[18px] text-muted leading-[1.7] max-w-xl lg:pt-2">{c.problemBody}</p>
        </div>
      </section>

      {/* HOE HET WERKT */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.howEyebrow}
          </p>
          <h2 className="font-display font-extrabold text-primary leading-[1.1] tracking-[-0.025em] mb-4" style={{ fontSize: 'clamp(28px, 3.4vw, 48px)' }}>
            {c.howH2}
          </h2>
          <p className="text-[17px] text-muted leading-[1.6] max-w-xl mb-12">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-border">
            {c.steps.map((s, i) => (
              <div key={s.t} className="border-b border-border py-9 lg:px-8 lg:first:pl-0 lg:[&:nth-child(4n)]:pr-0 lg:[&:nth-child(4n+1)]:pl-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[18px] font-display font-bold text-primary mb-3 leading-tight">{s.t}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEEN BLACK BOX */}
      <section className="bg-primary" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-[0.9fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6 flex items-center gap-[14px]">
              <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
              {c.controlEyebrow}
            </p>
            <h2 className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em]" style={{ fontSize: 'clamp(28px, 3.4vw, 46px)', maxWidth: '16ch' }}>
              {c.controlH2}
            </h2>
          </div>
          <p className="text-[18px] text-white/60 leading-[1.7] max-w-xl">{c.controlBody}</p>
        </div>
      </section>

      {/* WAT HET OPLEVERT */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-10 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.getEyebrow}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 max-w-3xl">
            {c.get.map((g) => (
              <li key={g} className="flex items-start gap-3 text-[17px] text-[#2A3A54]">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-center" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display font-extrabold text-white tracking-[-0.025em] mb-5" style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}>
            {c.ctaH2}
          </h2>
          <p className="text-white/55 leading-[1.6] mb-9 mx-auto" style={{ fontSize: '18px', maxWidth: '520px' }}>{c.ctaSub}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-8 py-4 rounded-lg hover:bg-[#7BB8FF] transition-colors">
            {c.ctaBtn}
          </Link>
        </div>
      </section>
    </main>
  )
}
