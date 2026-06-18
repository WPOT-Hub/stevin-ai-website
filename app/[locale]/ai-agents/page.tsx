import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { localizedMetadata } from '@/lib/seo'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  nl: {
    metaTitle: 'AI Agents, je nieuwe digitale collega\'s, Stevin',
    metaDesc:
      'Geen chatbot, maar AI-agents die echt werk uit handen nemen. Elk met eigen rechten en context, gegrond in je data, met een mens die de belangrijke stappen goedkeurt.',
    eyebrow: 'AI Agents',
    h1: 'Agents die echt werk uit handen nemen.',
    sub: 'Geen chatbot die antwoorden geeft, maar agents die taken oppakken. Elk met eigen rechten, eigen context, en een mens die de belangrijke stappen goedkeurt. Gegrond in je echte data, niet in gokwerk.',
    cta: 'Plan een gesprek',
    problemEyebrow: 'Het probleem',
    problemH2: 'Het meeste werk blijft liggen, niet omdat mensen het niet kunnen.',
    problemBody:
      'In elk bedrijf valt werk tussen wal en schip. Een lead die niet wordt opgevolgd. Een rapport dat niemand maakt. Een afwijking die pas opvalt als het te laat is. Niet door onkunde, maar omdat de informatie niet op tijd bij de juiste persoon komt en repetitieve taken blijven liggen.',
    howEyebrow: 'Hoe het werkt',
    howH2: 'Niet een agent. Een afdeling aan agents.',
    howIntro:
      'Elke agent heeft een taak, eigen rechten en eigen context. Ze lezen uit de systemen die je al gebruikt, herkennen wat aandacht vraagt en stellen de actie voor. Jij houdt de regie.',
    agents: [
      { t: 'Lead-agent', d: 'Vangt aanvragen uit mail, web en WhatsApp, kwalificeert ze en zet ze klaar in je CRM. Geen lead die blijft liggen.' },
      { t: 'Opvolg-agent', d: 'Bewaakt offertes, afspraken en open acties. Herinnert op het juiste moment, aan de juiste persoon.' },
      { t: 'Signaal-agent', d: 'Monitort je data en tikt je zodra iets afwijkt, met de oorzaak en de volgende stap erbij.' },
      { t: 'Dossier-agent', d: 'Bouwt automatisch een dossier op van communicatie, besluiten en documenten. Compleet als het ertoe doet.' },
    ],
    controlEyebrow: 'Jij in controle',
    controlH2: 'Een agent stelt voor. Een mens beslist.',
    controlBody:
      'Elke actie met impact gaat eerst langs een mens. Elke agent werkt binnen vooraf ingestelde rechten: de een mag mail lezen, de ander komt niet bij financiele data. Elk advies toont zijn bron, en alles wordt gelogd. Zo werken agents mee zonder dat je grip verliest.',
    getEyebrow: 'Wat het oplevert',
    get: [
      'Minder werk dat tussen wal en schip valt',
      'Sneller opvolgen, met minder mensen',
      'Geen losse tools, maar agents die je systemen al begrijpen',
      'Vertrouwen: bron, rechten en logboek bij elke stap',
    ],
    ctaH2: 'Welke taak wil je als eerste uit handen geven?',
    ctaSub: 'Plan een gesprek. We kijken samen welke agent het snelste waarde levert.',
    ctaBtn: 'Plan een gesprek',
  },
  en: {
    metaTitle: 'AI Agents, your new digital colleagues, Stevin',
    metaDesc:
      'Not a chatbot, but AI agents that genuinely take work off your hands. Each with their own permissions and context, grounded in your data, with a human approving the important steps.',
    eyebrow: 'AI Agents',
    h1: 'Agents that genuinely take work off your hands.',
    sub: 'Not a chatbot that gives answers, but agents that pick up tasks. Each with their own permissions, their own context, and a human approving the important steps. Grounded in your real data, not in guesswork.',
    cta: 'Book a call',
    problemEyebrow: 'The problem',
    problemH2: 'Most work gets stuck, not because people cannot do it.',
    problemBody:
      'In every business, work falls through the cracks. A lead that is not followed up. A report nobody makes. A deviation noticed only when it is too late. Not from incompetence, but because information does not reach the right person in time and repetitive tasks get left behind.',
    howEyebrow: 'How it works',
    howH2: 'Not one agent. A department of agents.',
    howIntro:
      'Each agent has a task, its own permissions and its own context. They read from the systems you already use, recognise what needs attention and propose the action. You keep control.',
    agents: [
      { t: 'Lead agent', d: 'Captures requests from email, web and WhatsApp, qualifies them and sets them up in your CRM. No lead left behind.' },
      { t: 'Follow-up agent', d: 'Watches quotes, appointments and open actions. Reminds at the right moment, the right person.' },
      { t: 'Signal agent', d: 'Monitors your data and taps you the moment something deviates, with the cause and next step attached.' },
      { t: 'Dossier agent', d: 'Automatically builds a record of communication, decisions and documents. Complete when it matters.' },
    ],
    controlEyebrow: 'You stay in control',
    controlH2: 'An agent proposes. A human decides.',
    controlBody:
      'Every action with impact passes by a human first. Each agent works within preset permissions: one may read email, another cannot touch financial data. Every recommendation shows its source, and everything is logged. That way agents work with you without you losing your grip.',
    getEyebrow: 'What you get',
    get: [
      'Less work falling through the cracks',
      'Faster follow-up, with fewer people',
      'Not loose tools, but agents that already understand your systems',
      'Trust: source, permissions and an audit log at every step',
    ],
    ctaH2: 'Which task do you want to hand over first?',
    ctaSub: 'Book a call. Together we look at which agent delivers value fastest.',
    ctaBtn: 'Book a call',
  },
} as const

const pick = (l: string) => (l === 'en' ? COPY.en : COPY.nl)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return localizedMetadata({
    path: '/ai-agents',
    locale,
    title: c.metaTitle,
    description: c.metaDesc,
  })
}

export default async function AiAgentsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = pick(locale)

  return (
    <main>
      {/* HERO met dimmed teamfoto */}
      <section className="relative -mt-[72px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/agents-team.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(150deg, rgba(10,22,40,0.86) 0%, rgba(10,22,40,0.9) 45%, rgba(10,22,40,0.97) 100%)' }}
        />
        <div className="relative mx-auto max-w-[1120px]" style={{ padding: 'calc(96px + 64px) 24px 120px' }}>
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]" style={{ fontSize: 'clamp(38px, 5.2vw, 74px)', maxWidth: '16ch' }}>
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

      {/* HOE HET WERKT - agents */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {c.agents.map((a, i) => (
              <div key={a.t} className="bg-white p-8 lg:p-10">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[19px] font-display font-bold text-primary mb-3">{a.t}</h3>
                <p className="text-[15px] text-muted leading-[1.65]">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JIJ IN CONTROLE */}
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
          <p className="text-white/55 leading-[1.6] mb-9 mx-auto" style={{ fontSize: '18px', maxWidth: '500px' }}>{c.ctaSub}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-8 py-4 rounded-lg hover:bg-[#7BB8FF] transition-colors">
            {c.ctaBtn}
          </Link>
        </div>
      </section>
    </main>
  )
}
