import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import VentureLabNav from '@/components/VentureLabNav'

type Props = { params: Promise<{ locale: string }> }

const COPY = {
  nl: {
    metaTitle: 'Stevin Venture Lab, het programma',
    metaDesc:
      'Een praktisch programma van idee naar marktvalidatie. Van probleemselectie tot eerste klantbewijs en fundingvoorbereiding.',
    eyebrow: 'Programma',
    h1: 'Een praktisch programma van idee naar marktvalidatie.',
    sub: 'Stevin Venture Lab helpt AI-teams in duidelijke fases. Van probleemselectie tot eerste klantbewijs en fundingvoorbereiding.',
    phasesH: 'De route',
    phases: [
      {
        tag: 'Fase 1',
        name: 'Opportunity Sprint',
        goal: 'Bepalen of het probleem sterk genoeg is.',
        body: 'We onderzoeken de markt voordat we bouwen. We scherpen het probleem aan, bepalen de eerste doelgroep en testen of er commerciele interesse is.',
        output: ['scherpe probleemdefinitie', 'eerste doelgroep', 'concurrentie en alternatieven', 'propositie versie 1', 'klantgesprekken', 'go of no-go advies'],
      },
      {
        tag: 'Fase 2',
        name: 'Venture Sprint',
        goal: 'Een eerste oplossing testen met de markt.',
        body: 'We bouwen alleen wat nodig is om te leren. Dat kan een prototype, MVP, demo of een handmatige pilotflow zijn.',
        output: ['prototype of MVP', 'pilotaanpak', 'pricing-hypothese', 'sales script', 'feedback van potentiele klanten', 'aangescherpte productrichting'],
      },
      {
        tag: 'Fase 3',
        name: 'Commercial Validation',
        goal: 'Bewijs verzamelen dat klanten dit willen.',
        body: 'De focus ligt op echte marktinteractie. We zoeken pilotklanten, betaalbereidheid, herhaalbare signalen en een scherpere GTM.',
        output: ['pilotgesprekken', 'betaalde pilot of intentieverklaring', 'sales pipeline', 'aangescherpte propositie', 'kanaalkeuze', 'commerciele metrics'],
      },
      {
        tag: 'Fase 4',
        name: 'Fundraise Readiness',
        goal: 'Bepalen of funding logisch is en de venture voorbereiden.',
        body: 'Niet elke startup hoeft funding op te halen. Maar als de markt, het team en de tractie sterk genoeg zijn, helpen we met het verhaal richting investeerders.',
        output: ['pitchdeck', 'investor narrative', 'dataroom-outline', 'use of funds', 'target investor list', 'funding- of bootstrapadvies'],
      },
    ],
    werkwijzeH: 'Werkwijze',
    werkwijze:
      'We werken praktisch, snel en commercieel. Geen lange theorie, geen innovatie-theater, geen maanden bouwen zonder marktcontact. Elke fase moet meer bewijs opleveren. Is een idee niet sterk genoeg, dan stoppen we of passen we aan. Dat is geen verlies, maar precies de bedoeling.',
    selectieH: 'Selectiecriteria',
    selectie: ['urgentie van het probleem', 'scherpte van de doelgroep', 'AI-fit', 'marktpotentieel', 'snelheid van het team', 'toegang tot klanten of domeinkennis', 'bereidheid om commercieel te testen'],
    ctaH: 'Wil je meedoen aan een volgende Venture Sprint?',
    ctaSub: 'Laat ons weten wie je bent, welk probleem je ziet en waarom dit nu relevant is.',
    ctaBtn: 'Meld je interesse',
    outputLabel: 'Output',
    goalLabel: 'Doel',
  },
  en: {
    metaTitle: 'Stevin Venture Lab, the programme',
    metaDesc:
      'A practical programme from idea to market validation. From problem selection to first customer proof and fundraise readiness.',
    eyebrow: 'Programme',
    h1: 'A practical programme from idea to market validation.',
    sub: 'Stevin Venture Lab helps AI teams in clear phases. From problem selection to first customer proof and fundraise readiness.',
    phasesH: 'The route',
    phases: [
      {
        tag: 'Phase 1',
        name: 'Opportunity Sprint',
        goal: 'Decide whether the problem is strong enough.',
        body: 'We research the market before we build. We sharpen the problem, define the first audience and test whether there is commercial interest.',
        output: ['sharp problem definition', 'first audience', 'competition and alternatives', 'proposition v1', 'customer conversations', 'go or no-go advice'],
      },
      {
        tag: 'Phase 2',
        name: 'Venture Sprint',
        goal: 'Test a first solution with the market.',
        body: 'We build only what is needed to learn. That can be a prototype, MVP, demo or a manual pilot flow.',
        output: ['prototype or MVP', 'pilot approach', 'pricing hypothesis', 'sales script', 'feedback from potential customers', 'sharpened product direction'],
      },
      {
        tag: 'Phase 3',
        name: 'Commercial Validation',
        goal: 'Collect proof that customers want this.',
        body: 'The focus is real market interaction. We look for pilot customers, willingness to pay, repeatable signals and a sharper GTM.',
        output: ['pilot conversations', 'paid pilot or letter of intent', 'sales pipeline', 'sharpened proposition', 'channel choice', 'commercial metrics'],
      },
      {
        tag: 'Phase 4',
        name: 'Fundraise Readiness',
        goal: 'Decide whether funding makes sense and prepare the venture.',
        body: 'Not every startup needs to raise. But when the market, team and traction are strong enough, we help with the story towards investors.',
        output: ['pitch deck', 'investor narrative', 'data room outline', 'use of funds', 'target investor list', 'funding or bootstrap advice'],
      },
    ],
    werkwijzeH: 'How we work',
    werkwijze:
      'We work practically, fast and commercially. No long theory, no innovation theatre, no months of building without market contact. Every phase has to produce more proof. If an idea is not strong enough, we stop or adjust. That is not a loss, it is exactly the point.',
    selectieH: 'Selection criteria',
    selectie: ['urgency of the problem', 'sharpness of the audience', 'AI fit', 'market potential', 'speed of the team', 'access to customers or domain knowledge', 'willingness to test commercially'],
    ctaH: 'Want to join a next Venture Sprint?',
    ctaSub: 'Tell us who you are, what problem you see and why this is relevant now.',
    ctaBtn: 'Register your interest',
    outputLabel: 'Output',
    goalLabel: 'Goal',
  },
} as const

const pick = (l: string) => (l === 'en' ? COPY.en : COPY.nl)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = pick(locale)
  return { title: c.metaTitle, description: c.metaDesc, robots: { index: false, follow: false } }
}

export default async function ProgrammaPage({ params }: Props) {
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
          <h1
            className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.03em]"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '18ch' }}
          >
            {c.h1}
          </h1>
          <p className="text-white/60 leading-[1.6] mt-7" style={{ fontSize: '19px', maxWidth: '560px' }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* FASES */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <p className="text-accent text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-12 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.phasesH}
          </p>
          <div className="space-y-5">
            {c.phases.map((p) => (
              <div key={p.tag} className="rounded-2xl border border-border bg-white p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
                <div>
                  <p className="font-mono text-[12px] text-accent mb-3">{p.tag}</p>
                  <h3 className="font-display font-extrabold text-primary text-[24px] leading-tight mb-3">{p.name}</h3>
                  <p className="text-[14px] text-muted leading-[1.6]">
                    <span className="font-semibold text-primary">{c.goalLabel}: </span>{p.goal}
                  </p>
                </div>
                <div>
                  <p className="text-[16px] text-[#2A3A54] leading-[1.65] mb-6">{p.body}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted mb-3">{c.outputLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.output.map((o) => (
                      <span key={o} className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] text-primary">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WERKWIJZE + SELECTIE */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-5" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
              {c.werkwijzeH}
            </h2>
            <p className="text-[17px] text-muted leading-[1.7]">{c.werkwijze}</p>
          </div>
          <div>
            <h2 className="font-display font-extrabold text-primary tracking-[-0.025em] mb-6" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
              {c.selectieH}
            </h2>
            <ul className="space-y-3">
              {c.selectie.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[16px] text-[#2A3A54]">
                  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-center" style={{ padding: '110px 24px' }}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display font-extrabold text-white tracking-[-0.025em] mb-5" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
            {c.ctaH}
          </h2>
          <p className="text-white/55 leading-[1.6] mb-9 mx-auto" style={{ fontSize: '18px', maxWidth: '520px' }}>
            {c.ctaSub}
          </p>
          <Link
            href="/venture-lab/apply"
            className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-8 py-4 rounded-lg hover:bg-[#7BB8FF] transition-colors"
          >
            {c.ctaBtn}
          </Link>
        </div>
      </section>
    </main>
  )
}
