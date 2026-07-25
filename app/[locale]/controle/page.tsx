import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localizedMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

// De controle-pagina (doc 13, brief 21 jul): het logboek-mechaniek als
// middenstuk, daaromheen de tien vertrouwenspunten elk met "zo controleer
// je dit zelf". Geen systeemtaal, D-014: eigenschap van ons werk, geen
// beschuldiging richting anderen.
const COPY = {
  nl: {
    eyebrow: 'Kijk zelf mee',
    h1_line: 'Vertrouw ons niet op ons woord.', h1_accent: 'Controleer het.',
    sub: 'Alles wat wij voor je doen is te zien, terug te lezen en te controleren. Deze pagina laat zien hoe.',
    cta: 'Start de diagnose',

    log_eyebrow: 'Het logboek',
    log_h2: 'Niets gebeurt stil.',
    trio: [
      { t: 'Elke wijziging heeft een naam', d: 'Je ziet wie iets heeft aangepast. Een mens van ons, of een voorstel van het systeem dat een mens heeft goedgekeurd.' },
      { t: 'Elke wijziging heeft een moment', d: 'Je ziet wanneer het gebeurde. Ook als er een maand niets gebeurde, want dat zegt net zoveel.' },
      { t: 'Elke wijziging heeft een reden', d: 'Je ziet waarom. Niet "optimalisatie", maar de echte overweging, terug te lezen in gewone taal.' },
    ],
    mech: [
      { t: 'AI stelt voor, een mens keurt goed', d: 'Altijd, zonder uitzondering. Het systeem leest mee en signaleert; besluiten met impact gaan eerst langs een mens.' },
      { t: 'Ook teruggedraaide keuzes blijven zichtbaar', d: 'Een besluit dat achteraf niet goed uitpakte verdwijnt niet. Het staat er, met wat we ervan geleerd hebben.' },
      { t: 'Wij loggen ook onszelf', d: 'Ons eigen werk staat in hetzelfde logboek waar jij in meekijkt. De signalen draaien ook op ons werk, dag en nacht.' },
      { t: 'Het bewijs staat deels buiten ons om', d: 'Het wijzigingslogboek van je advertentie-account en het transparantieregister zijn van Google, niet van ons. Je hoeft ons dus niet te geloven.' },
    ],

    points_eyebrow: 'Tien afspraken',
    points_h2: 'Wat van jou is, en hoe je dat checkt.',
    points: [
      { t: 'Accounts op naam van jouw bedrijf', c: 'Open je advertentie-account en kijk wie eigenaar is. Staat daar een andere naam, dan is dat het gesprek waard.' },
      { t: 'Volledige toegang, altijd', c: 'Log zelf in. Als je iemand om een export of inlog moet vragen, heb je geen toegang maar een abonnement op andermans scherm.' },
      { t: 'Inzicht in elke wijziging', c: 'Open de wijzigingsgeschiedenis van je account en kijk wat er de afgelopen 90 dagen is gebeurd, en door wie.' },
      { t: 'Exporteerbare data', c: 'Vraag een export. Bij ons is dat een knop, geen verzoek dat weken duurt.' },
      { t: 'Geen verborgen marges op mediabudget', c: 'Zoek je bedrijf op in het transparantieregister van Google en kijk wie er als betaler geregistreerd staat.' },
      { t: 'Heldere tarieven', c: 'Vanaf 399 per maand, en managed op maat na de diagnose. Je weet vooraf wat je krijgt en wat het kost.' },
      { t: 'Vastgelegde besluiten', c: 'Vraag bij elk advies naar het waarom. Bij ons staat het er al bij.' },
      { t: 'Inzicht in wat werkt', c: 'Tel je aanvragen van vorige maand en vergelijk met je dashboard. Kloppen die niet, dan stuurt iedereen op de verkeerde cijfers.' },
      { t: 'Geen lock-in', c: 'Lees je contract. Als opzeggen betekent dat je accounts, data of kennis kwijtraakt, zit je vast.' },
      { t: 'Controle op ons eigen werk', c: 'De signalen die jouw campagnes bewaken, bewaken ook ons werk. Valt onze meting uit, dan zien wij dat dezelfde dag, en jij ook.' },
    ],

    closing_l1: 'Zien is makkelijker dan geloven.',
    closing_body: 'Vraag de diagnose aan en kijk mee in je eigen cijfers. Binnen twee weken zwart op wit.',
  },
  en: {
    eyebrow: 'See for yourself',
    h1_line: 'Do not take our word for it.', h1_accent: 'Check it.',
    sub: 'Everything we do for you can be seen, read back and verified. This page shows how.',
    cta: 'Start the diagnosis',

    log_eyebrow: 'The log',
    log_h2: 'Nothing happens silently.',
    trio: [
      { t: 'Every change has a name', d: 'You see who changed something. One of our people, or a system proposal approved by a person.' },
      { t: 'Every change has a moment', d: 'You see when it happened. Including a month where nothing happened, because that says just as much.' },
      { t: 'Every change has a reason', d: 'You see why. Not "optimisation", but the actual consideration, readable in plain language.' },
    ],
    mech: [
      { t: 'AI proposes, a person approves', d: 'Always, without exception. The system reads along and signals; decisions with impact pass a person first.' },
      { t: 'Reversed decisions stay visible', d: 'A decision that did not work out does not disappear. It stays, with what we learned from it.' },
      { t: 'We log ourselves too', d: 'Our own work sits in the same log you look into. The signals run on our work as well, day and night.' },
      { t: 'Part of the proof sits outside of us', d: 'Your ad account change history and the transparency register belong to Google, not to us. So you do not have to believe us.' },
    ],

    points_eyebrow: 'Ten agreements',
    points_h2: 'What is yours, and how to check it.',
    points: [
      { t: 'Accounts in your company name', c: 'Open your ad account and check who owns it. If there is another name, that is worth a conversation.' },
      { t: 'Full access, always', c: 'Log in yourself. If you have to ask someone for an export or login, you do not have access, you have a subscription to someone else’s screen.' },
      { t: 'Insight into every change', c: 'Open your account’s change history and see what happened in the past 90 days, and by whom.' },
      { t: 'Exportable data', c: 'Ask for an export. With us that is a button, not a request that takes weeks.' },
      { t: 'No hidden margins on media budget', c: 'Look up your company in Google’s transparency register and check who is registered as the payer.' },
      { t: 'Clear pricing', c: 'From 399 per month, and tailored management after the diagnosis. You know upfront what you get and what it costs.' },
      { t: 'Recorded decisions', c: 'Ask for the why behind every piece of advice. With us it is already written down.' },
      { t: 'Insight into what works', c: 'Count last month’s enquiries and compare with your dashboard. If they do not match, everyone steers on the wrong numbers.' },
      { t: 'No lock-in', c: 'Read your contract. If cancelling means losing accounts, data or knowledge, you are stuck.' },
      { t: 'Checks on our own work', c: 'The signals watching your campaigns watch our work too. If our measurement breaks, we see it the same day, and so do you.' },
    ],

    closing_l1: 'Seeing beats believing.',
    closing_body: 'Request the diagnosis and look into your own numbers. Black and white within two weeks.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale !== 'en'
  return localizedMetadata({
    path: '/controle',
    locale,
    title: isNl ? 'Controle · elke wijziging heeft een naam, een moment en een reden' : 'Control · every change has a name, a moment and a reason',
    description: isNl
      ? 'Vertrouw ons niet op ons woord: elk besluit staat in een logboek, accounts en data blijven van jou, en het bewijs staat deels buiten ons om. Zo controleer je het zelf.'
      : 'Do not take our word for it: every decision is logged, accounts and data stay yours, and part of the proof sits outside of us. Here is how to check it yourself.',
  })
}

const h2Style = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const
const eyebrowCls = 'text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const dash = <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />

export default async function ControlePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 112px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]" style={{ fontSize: 'clamp(34px, 4.6vw, 64px)', maxWidth: '18ch' }}>
            {c.h1_line} <span className="text-[#5DA3FF]">{c.h1_accent}</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '18px', maxWidth: '540px', marginTop: '28px' }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* Het logboek: drieluik + mechanieken */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowCls}>{dash}{c.log_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-12" style={h2Style}>{c.log_h2}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden mb-14">
            {c.trio.map((item, i) => (
              <div key={item.t} className="bg-white p-8 lg:p-10">
                <p className="font-mono text-[11px] text-muted mb-5">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-bold text-primary mb-3" style={{ fontSize: '19px', letterSpacing: '-0.01em', lineHeight: '1.25' }}>{item.t}</h3>
                <p className="text-muted leading-[1.6] m-0" style={{ fontSize: '14.5px' }}>{item.d}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 max-w-[900px]">
            {c.mech.map((item) => (
              <article key={item.t} className="pt-5 border-t border-border">
                <h3 className="font-display font-bold text-primary mb-2.5" style={{ fontSize: '16.5px', letterSpacing: '-0.01em' }}>{item.t}</h3>
                <p className="text-muted leading-[1.6] m-0" style={{ fontSize: '14.5px' }}>{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tien afspraken */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowCls}>{dash}{c.points_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>{c.points_h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.points.map((item, i) => (
              <article key={item.t} className="rounded-[14px] bg-white border border-border p-7">
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display font-bold text-primary m-0" style={{ fontSize: '16.5px', letterSpacing: '-0.01em' }}>{item.t}</h3>
                </div>
                <p className="text-muted leading-[1.6] m-0" style={{ fontSize: '14px' }}>{item.c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Slot */}
      <section className="bg-primary" style={{ padding: '96px 24px 112px' }}>
        <div className="mx-auto max-w-[1200px] flex items-end justify-between gap-12 flex-col lg:flex-row">
          <h2 className="font-display font-extrabold text-white m-0" style={{ fontSize: 'clamp(34px, 4.2vw, 58px)', lineHeight: '1.04', letterSpacing: '-0.03em', maxWidth: '16ch' }}>
            {c.closing_l1}
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="text-white/55 leading-[1.6] m-0 lg:text-right" style={{ fontSize: '15px', maxWidth: '360px' }}>{c.closing_body}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
