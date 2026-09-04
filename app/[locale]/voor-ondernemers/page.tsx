import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import DeskProof from '@/components/DeskProof'
import { localizedMetadata } from '@/lib/seo'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

// Hoofddeur voor eigenaren/directeuren (doc 13 + teardown doc 23):
// zelfkwalificatie in de subregel, taak-tabel voor/na, gekochte-leads-hoek,
// bezwaren-FAQ, diagnose-CTA. Herkenning eerst, geen "wij"-opening.
const COPY = {
  nl: {
    eyebrow: 'Voor ondernemers',
    h1_line: 'Je wilt er geen omkijken naar hebben.', h1_accent: 'Maar wel grip.',
    sub: 'Voor eigenaren en directeuren die marketing uitbesteden of een compact team hebben, en willen weten dat het klopt zonder er zelf bovenop te zitten.',
    cta: 'Start de diagnose', cta_micro: 'Eerst de diagnose op jouw eigen data. Daarna pas een voorstel.',

    table_eyebrow: 'Wat er verandert',
    table_h2: 'Zelfde bedrijf, andere werkdag.',
    rows: [
      { t: 'De factuur', before: 'Je betaalt elke maand en hoopt dat er iets voor gebeurd is.', after: 'Je ziet elk besluit in het logboek, met de reden erbij.' },
      { t: 'De cijfers', before: 'Je stuurt op het dashboard van het bureau.', after: 'Je meting telt echte aanvragen, gecontroleerd, op jouw naam.' },
      { t: 'De kennis', before: 'Alles zit in het hoofd van een persoon die kan vertrekken.', after: 'Alles staat in een marketinggeheugen dat van je bedrijf blijft.' },
      { t: 'Het contract', before: 'Opzeggen voelt als opnieuw beginnen.', after: 'Je exit is ingebouwd vanaf dag een. Stoppen kost je niets, behalve ons.' },
    ],
    before_label: 'Nu', after_label: 'Met Stevin',

    leads_eyebrow: 'Herken je dit?',
    leads_h2: 'Leads kopen is geen marketing.',
    leads_quote: '1.100 euro aan gekochte leads. Nul opdrachten.',
    leads_quote_a: 'Installatiebedrijf, uit een diagnosegesprek',
    leads_body: 'Leadplatforms verkopen dezelfde aanvraag aan vijf bedrijven tegelijk, en volgend jaar betaal je opnieuw. Marketing die van jou is werkt andersom: je eigen vindbaarheid, je eigen aanvragen, en alles wat je opbouwt blijft van jou. De diagnose laat zien waar je nu staat en wat je laat liggen.',

    own_eyebrow: 'Alles blijft van jou',
    own_h2: 'Grip betekent: je kunt altijd weg.',
    own_body: 'Accounts op naam van jouw bedrijf. Data die je kunt exporteren. Een dossier met elk besluit en de reden erbij. Wij bouwen je exit in vanaf dag een, en juist daarom durven we het te zeggen: de meeste klanten blijven omdat het goed geregeld is, niet omdat ze vastzitten.',
    own_link: 'Zo werkt de controle',

    canon_eyebrow: 'Waarom ons advies klopt',
    canon_h2: 'Ons advies komt niet uit onze onderbuik.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek, met bij elk principe de grens van wat het betekent. Drie ervan, zoals ze in het systeem staan.',
    principes: [
      {
        p: 'Controleer de meting voordat je iets anders beoordeelt.',
        u: 'Een conversie die op het verkeerde moment wordt geteld maakt elk oordeel over je marketing waardeloos. Wij beginnen daar, en dat is meestal ook waar het misgaat.',
        bron: 'Praktijkprincipe uit de kennislaag',
        grens: 'Betekent niet dat je zonder perfecte meting niet mag adverteren. Wel dat je je cijfers dan niet blind gelooft.',
      },
      {
        p: 'Weeg aanbevelingen van Google en Meta als verkoopsignaal.',
        u: 'De optimalisatiescore in je account is een verkoopmetric, geen rapportcijfer. Een aanbeveling gaat pas door als het bewijs erbij past.',
        bron: 'Praktijkprincipe uit de kennislaag',
        grens: 'Betekent niet dat die functies nooit werken. Met een goed conversiesignaal eronder kunnen ze prima zijn.',
      },
      {
        p: 'Groei komt vooral van nieuwe klanten, niet van bestaande klanten loyaler maken.',
        u: 'Merken van gelijke grootte hebben vrijwel gelijke loyaliteit. Wie groeit, groeit door meer mensen te bereiken die nog niet kochten.',
        bron: 'Ehrenberg-Bass',
        grens: 'Betekent niet dat je bestaande klanten mag verwaarlozen, of dat dit opgaat als je je markt al vrijwel volledig bedient.',
      },
    ],

    faq_h2: 'Wat eigenaren ons eerst vragen.',
    faqs: [
      { question: 'Verlies ik controle als AI meekijkt?', answer: 'Nee, je krijgt er juist controle bij. Het platform verandert uit zichzelf niets, elk voorstel gaat langs een mens, en alles wat er gebeurt staat in een logboek waar jij altijd in kunt kijken.' },
      { question: 'Ik heb al een bureau. Kan dit ernaast?', answer: 'Ja. De diagnose is een tweede blik op jouw eigen data. Staat het goed, dan weet je dat nu zeker. Staat het niet goed, dan heb je iets om te bespreken.' },
      { question: 'Hoeveel tijd kost mij dit?', answer: 'De diagnose vraagt een uur van jou en toegang tot je cijfers. Daarna zie je binnen twee weken zwart op wit waar je staat. Beheer daarna is onze taak, meekijken kan altijd, moeten hoeft nooit.' },
      { question: 'Wat kost het?', answer: 'Vanaf 399 per maand. Alles laten beheren kan ook, op maat en altijd na de diagnose. Geen verborgen marges op je mediabudget.' },
    ],

    closing_l1: 'Wij regelen het nu goed.', closing_l2: 'Alles blijft van jou.',
    closing_body: 'Start de diagnose. Binnen twee weken zie je zwart op wit hoe je marketing ervoor staat.',
  },
  en: {
    eyebrow: 'For business owners',
    h1_line: 'You want it off your plate.', h1_accent: 'But with grip.',
    sub: 'For owners and directors who outsource marketing or run a compact team, and want to know it is right without sitting on top of it.',
    cta: 'Start the diagnosis', cta_micro: 'First the diagnosis, on your own data. Only then a proposal.',

    table_eyebrow: 'What changes',
    table_h2: 'Same company, different workday.',
    rows: [
      { t: 'The invoice', before: 'You pay every month and hope something happened for it.', after: 'You see every decision in the log, with the reason attached.' },
      { t: 'The numbers', before: 'You steer on the agency dashboard.', after: 'Your measurement counts real enquiries, verified, in your name.' },
      { t: 'The knowledge', before: 'Everything sits in the head of one person who can leave.', after: 'Everything sits in a marketing memory that stays with your company.' },
      { t: 'The contract', before: 'Cancelling feels like starting over.', after: 'Your exit is built in from day one. Stopping costs you nothing, except us.' },
    ],
    before_label: 'Now', after_label: 'With Stevin',

    leads_eyebrow: 'Sound familiar?',
    leads_h2: 'Buying leads is not marketing.',
    leads_quote: '1,100 euros on purchased leads. Zero jobs.',
    leads_quote_a: 'Installation company, from a diagnosis conversation',
    leads_body: 'Lead platforms sell the same enquiry to five companies at once, and next year you pay again. Marketing you own works the other way: your own visibility, your own enquiries, and everything you build stays yours. The diagnosis shows where you stand and what you are leaving on the table.',

    own_eyebrow: 'Everything stays yours',
    own_h2: 'Grip means: you can always leave.',
    own_body: 'Accounts in your company name. Data you can export. A file with every decision and its reason. We build in your exit from day one, and that is exactly why we dare to say it: most clients stay because things are well arranged, not because they are stuck.',
    own_link: 'How the control works',

    canon_eyebrow: 'Why the advice holds',
    canon_h2: 'Our advice does not come from a hunch.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research, each with the limit of what it means. Three of them, as they sit in the system.',
    principes: [
      {
        p: 'Check the measurement before judging anything else.',
        u: 'A conversion counted at the wrong moment makes every judgement about your marketing worthless. We start there, and that is usually where it goes wrong.',
        bron: 'Practice principle from the knowledge layer',
        grens: 'Does not mean you cannot advertise without perfect measurement. It means you do not believe your numbers blindly.',
      },
      {
        p: 'Treat recommendations from Google and Meta as a sales signal.',
        u: 'The optimisation score in your account is a sales metric, not a report card. A recommendation goes through when the evidence supports it.',
        bron: 'Practice principle from the knowledge layer',
        grens: 'Does not mean those features never work. With a sound conversion signal underneath they can be perfectly good.',
      },
      {
        p: 'Growth comes mostly from new customers, not from making existing ones more loyal.',
        u: 'Brands of similar size have almost identical loyalty. The ones that grow, grow by reaching more people who have not bought yet.',
        bron: 'Ehrenberg-Bass',
        grens: 'Does not mean you may neglect existing customers, or that this holds when you already serve nearly your whole market.',
      },
    ],

    faq_h2: 'What owners ask us first.',
    faqs: [
      { question: 'Do I lose control when AI reads along?', answer: 'No, you gain control. The platform changes nothing on its own, every proposal passes a person, and everything that happens sits in a log you can always open.' },
      { question: 'I already have an agency. Can this run alongside?', answer: 'Yes. The diagnosis is a second opinion on your own data. If things are right, you now know for sure. If not, you have something to discuss.' },
      { question: 'How much of my time does this take?', answer: 'The diagnosis takes an hour of your time and access to your numbers. Within two weeks you see in black and white where you stand. Management after that is our job; looking along is always possible, never required.' },
      { question: 'What does it cost?', answer: 'From 399 per month. Full management is available too, tailored and always after the diagnosis. No hidden margins on your media budget.' },
    ],

    closing_l1: 'We set it right now.', closing_l2: 'Everything stays yours.',
    closing_body: 'Start the diagnosis. Within two weeks you see in black and white where your marketing stands.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale !== 'en'
  return localizedMetadata({
    path: '/voor-ondernemers',
    locale,
    title: isNl ? 'Voor ondernemers · marketing goed geregeld, met grip' : 'For business owners · marketing done right, with grip',
    description: isNl
      ? 'Geen omkijken naar je marketing, wel grip: elk besluit in een logboek, meting die klopt, en alles blijft van jou. Eerst een diagnose op je eigen data.'
      : 'Marketing off your plate, with grip: every decision logged, measurement that adds up, and everything stays yours. First a diagnosis on your own data.',
  })
}

const h2Style = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const
const eyebrowCls = 'text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const dash = <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />

export default async function VoorOndernemersPage({ params }: Props) {
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
          <h1 className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]" style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '20ch' }}>
            {c.h1_line} <span className="text-[#5DA3FF]">{c.h1_accent}</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '18px', maxWidth: '560px', marginTop: '28px' }}>
            {c.sub}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
            <p className="text-white/45 text-[13.5px] m-0">{c.cta_micro}</p>
          </div>
        </div>
      </section>

      {/* Taak-tabel voor/na */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className={eyebrowCls}>{dash}{c.table_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>{c.table_h2}</h2>
          <div className="rounded-[14px] border border-border overflow-hidden bg-white">
            <div className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-border">
              <div className="p-3 sm:p-4" aria-hidden="true" />
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-muted" style={{ fontSize: '12px' }}>{c.before_label}</div>
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-accent" style={{ fontSize: '12px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{c.after_label}</div>
            </div>
            {c.rows.map((row, i, arr) => (
              <div key={row.t} className={`grid grid-cols-[0.7fr_1fr_1fr] ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="p-3 sm:p-4 font-display font-semibold text-primary" style={{ fontSize: '14px' }}>{row.t}</div>
                <div className="p-3 sm:p-4 text-muted leading-[1.5]" style={{ fontSize: '13.5px' }}>{row.before}</div>
                <div className="p-3 sm:p-4 text-primary leading-[1.5]" style={{ fontSize: '13.5px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gekochte-leads-hoek */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className={eyebrowCls}>{dash}{c.leads_eyebrow}</p>
            <h2 className="font-display font-extrabold text-primary m-0 mb-5" style={h2Style}>{c.leads_h2}</h2>
            <p className="text-muted leading-[1.65] m-0" style={{ fontSize: '16px' }}>{c.leads_body}</p>
          </div>
          <figure className="m-0 rounded-[14px] bg-white border border-border p-8 lg:p-10">
            <blockquote className="m-0 font-display font-bold text-primary leading-[1.3]" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', letterSpacing: '-0.02em' }}>
              &ldquo;{c.leads_quote}&rdquo;
            </blockquote>
            <figcaption className="text-muted text-[13px] mt-4">{c.leads_quote_a}</figcaption>
          </figure>
        </div>
      </section>

      {/* Eigenaarschap */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.own_eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-white m-0 mb-6" style={{ ...h2Style, maxWidth: '18ch' }}>{c.own_h2}</h2>
          <p className="text-white/60 leading-[1.65] m-0" style={{ fontSize: '16px', maxWidth: '620px' }}>{c.own_body}</p>
          <div className="mt-8">
            <Link href="/controle" className="font-display font-semibold text-[#5DA3FF] text-[15px] inline-flex items-center gap-2 hover:gap-3 transition-all">
              {c.own_link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Kennislaag. Toegevoegd 4 sep 2026 (W-042) zodat deze pagina hetzelfde
          bewijsstuk draagt als /fmcg, /retail en de andere voor-wie-paginas:
          drie principes uit docs/knowledge/ADVISOR_KNOWLEDGE.md met hun grens.
          Kern 1, kern 5 en kern 8, woordelijk overgenomen inclusief het
          "betekent niet". */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className={eyebrowCls}>{dash}{c.canon_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-5" style={h2Style}>{c.canon_h2}</h2>
          <p className="text-muted leading-[1.65] m-0 mb-12" style={{ fontSize: '16px', maxWidth: '640px' }}>{c.canon_sub}</p>
          <div className="flex flex-col gap-5">
            {c.principes.map((pr) => (
              <div key={pr.p} className="rounded-[14px] border border-border bg-white p-6 border-l-[3px] border-l-accent">
                <p className="text-base font-semibold text-primary leading-snug m-0">{pr.p}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed m-0">{pr.u}</p>
                <p className="mt-4 text-xs font-mono uppercase tracking-[0.1em] text-muted/70 m-0">{pr.bron}</p>
                <p className="mt-3 text-sm text-primary/80 leading-relaxed border-t border-border pt-3 m-0">{pr.grens}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bezwaren-FAQ */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-display font-extrabold text-primary m-0 mb-10" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}>
            {c.faq_h2}
          </h2>
          <FAQAccordion faqs={[...c.faqs]} />
        </div>
      </section>

      {/* Slot */}
      <section className="bg-primary" style={{ padding: '96px 24px 112px' }}>
        <div className="mx-auto max-w-[1200px] flex items-end justify-between gap-12 flex-col lg:flex-row">
          <h2 className="font-display font-extrabold text-white m-0" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', lineHeight: '1.08', letterSpacing: '-0.03em', maxWidth: '15ch' }}>
            {c.closing_l1}<br /><span className="text-[#5DA3FF]">{c.closing_l2}</span>
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="text-white/55 leading-[1.6] m-0 lg:text-right" style={{ fontSize: '15px', maxWidth: '360px' }}>{c.closing_body}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
      {/* Er ging iets stuk en niemand die het je vertelde. Dat is de deur voor de ondernemer. */}
      <DeskProof locale={locale} toonBrein={false} melding="meta-storing" />

    </>
  )
}
