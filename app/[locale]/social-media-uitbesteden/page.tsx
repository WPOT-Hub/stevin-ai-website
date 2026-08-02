import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import DeskProof from '@/components/DeskProof'
import { localizedMetadata } from '@/lib/seo'
import FAQAccordion from '@/components/FAQAccordion'

type Props = { params: Promise<{ locale: string }> }

// Gemeten volumes (Google Ads API, 25 jul 2026, NL): social media uitbesteden
// 320, facebook advertenties uitbesteden 140, facebook marketing uitbesteden 90,
// social media beheer uitbesteden 70, linkedin adverteren 50, meta ads 40,
// tiktok ads 30, linkedin ads 30. Samen ruim 500 per maand. Bewust EEN pagina:
// per kanaal een aparte pagina zou vijf dunne pagina's opleveren voor 30 tot 140
// zoekopdrachten elk, en dat is dezelfde fout als de gesnoeide doelgroeppagina's.
const COPY = {
  nl: {
    eyebrow: 'Social media uitbesteden',
    h1_line: 'Social media uitbesteden.', h1_accent: 'Met cijfers die iets betekenen.',
    lede: 'Je wilt je social media uitbesteden, maar je wilt niet betalen voor bereik en likes waar geen klant achter zit. Wij beginnen met een diagnose op je eigen data: wat leverde social tot nu toe echt op, welke kanalen doen mee en welke kosten alleen tijd. Daarna zetten we het goed en beheren we actief, over Facebook, Instagram, LinkedIn en TikTok. Je accounts en je data blijven van jou, en elke wijziging staat in een logboek waar je altijd in kunt kijken.',
    cta: 'Start de diagnose',
    cta_micro: 'Eerst de diagnose op jouw eigen data. Daarna pas een voorstel.',

    herken_eyebrow: 'Herken je dit?',
    herken_h2: 'Waarom social vaak niets oplevert.',
    herken: [
      { t: 'Je betaalt voor bereik, niet voor klanten', d: 'Het rapport toont vertoningen, volgers en interacties. Hoeveel aanvragen eruit kwamen staat er niet, want dat wordt niet gemeten.' },
      { t: 'Er wordt gepost omdat het moet', d: 'Drie posts per week volgens de kalender. Zonder dat iemand kijkt welke ooit iets opleverde.' },
      { t: 'Alle kanalen tegelijk, niks goed', d: 'Facebook, Instagram, LinkedIn en TikTok naast elkaar, met dezelfde content en een half budget per kanaal.' },
      { t: 'Het bedrijfsaccount staat op naam van het bureau', d: 'Wissel je van partij, dan begin je opnieuw: geen historie, geen doelgroepen, geen leerdata.' },
    ],
    herken_close: 'Social kan wel werken, maar alleen als je meet wat er onderaan uitkomt in plaats van bovenaan.',

    kanalen_eyebrow: 'Welke kanalen',
    kanalen_h2: 'Niet alle vier. De juiste.',
    kanalen_body: 'Wij kiezen kanalen op basis van waar jouw klanten zitten en wat de diagnose laat zien, niet op basis van wat een pakket voorschrijft. Vaak blijkt dat twee kanalen goed doen wat vier kanalen half deden.',
    kanalen: [
      { t: 'Meta: Facebook en Instagram', d: 'Het zwaartepunt voor de meeste Nederlandse bedrijven. Breed bereik, scherp te sturen op boodschap in plaats van op doelgroepknoppen.' },
      { t: 'LinkedIn', d: 'Voor zakelijke dienstverlening en langere trajecten. Duurder per klik, maar de juiste mensen.' },
      { t: 'TikTok', d: 'Werkt als je iets te laten zien hebt en creatie kunt volhouden. Anders is het een dure hobby, en dan zeggen we dat.' },
      { t: 'Organisch', d: 'Posten zonder budget heeft zin als het bij een echt verhaal hoort. Niet als vulling voor een contentkalender.' },
    ],

    table_eyebrow: 'Wat er verandert',
    table_h2: 'Uitbesteden zoals het hoort.',
    rows: [
      { t: 'Wat er gemeten wordt', before: 'Bereik, volgers en interacties.', after: 'Aanvragen en omzet, herleid naar kanaal en campagne.' },
      { t: 'Kanaalkeuze', before: 'Alle kanalen, want dat hoort in het pakket.', after: 'De kanalen die aantoonbaar iets opleveren.' },
      { t: 'Eigenaarschap', before: 'Advertentieaccount staat op naam van het bureau.', after: 'Alles op naam van jouw bedrijf, inclusief doelgroepen en historie.' },
      { t: 'Inzicht', before: 'Een maandrapport met mooie plaatjes.', after: 'Een logboek met elke wijziging, met datum en reden.' },
      { t: 'Opzeggen', before: 'Je verliest je opgebouwde data en doelgroepen.', after: 'Je neemt alles mee.' },
    ],
    before_label: 'Bij veel bureaus', after_label: 'Bij Stevin.AI',

    kosten_eyebrow: 'Wat het kost',
    kosten_h2: 'Social media uitbesteden: de kosten.',
    kosten_body: 'Beheer begint bij 399 euro per maand. Wat je daarboven nodig hebt volgt uit de diagnose, niet uit een pakketkeuze. Je advertentiebudget staat daar los van en betaal je rechtstreeks aan het platform, vanaf je eigen account.',
    kosten_punten: [
      'Vanaf 399 euro per maand voor beheer',
      'Geen marge op je advertentiebudget',
      'De diagnose is vrijblijvend en je houdt het rapport',
      'Geen langlopend contract',
    ],

    faq_h2: 'Wat ondernemers ons vragen.',
    faqs: [
      { question: 'Wat kost het om social media uit te besteden?', answer: 'Beheer begint bij 399 euro per maand. Daarbovenop komt je advertentiebudget, dat je rechtstreeks aan Meta, LinkedIn of TikTok betaalt vanaf je eigen account. Wij pakken daar geen marge op. Wat je precies nodig hebt bepalen we na de diagnose.' },
      { question: 'Doen jullie ook Meta Ads en Facebook advertenties?', answer: 'Ja, Meta (Facebook en Instagram) is voor de meeste Nederlandse bedrijven het zwaartepunt. We draaien ook LinkedIn en TikTok waar dat past. Welke kanalen zinvol zijn volgt uit de diagnose, niet uit een standaardpakket.' },
      { question: 'Is TikTok iets voor mijn bedrijf?', answer: 'Alleen als je iets te laten zien hebt en creatie kunt volhouden. TikTok vraagt veel meer nieuwe video dan Meta. Past dat niet bij je, dan zeggen we dat liever nu dan na drie maanden.' },
      { question: 'Blijven mijn social accounts van mij?', answer: 'Ja. Bedrijfspagina en advertentieaccount staan op naam van jouw bedrijf, jij houdt beheerdersrechten, en de opgebouwde doelgroepen en historie blijven bij je als je stopt.' },
      { question: 'Doen jullie ook alleen organisch posten?', answer: 'Dat kan, maar we zijn er eerlijk over: organisch posten zonder budget en zonder verhaal levert zelden aanvragen op. We doen het als het bij iets echts hoort, niet als vulling voor een kalender.' },
      { question: 'Hoe meten jullie of social iets oplevert?', answer: 'We repareren eerst de meting, zodat een aanvraag ook echt als aanvraag geteld wordt en herleidbaar is naar kanaal en campagne. Zonder die stap stuurt iedereen op bereik, en bereik betaalt geen rekeningen.' },
    ],

    closing_l1: 'Social hoeft geen kostenpost te zijn.',
    closing_body: 'Start met de diagnose. Binnen twee weken zie je zwart op wit wat social tot nu toe opleverde en wat er te halen valt.',
  },
  en: {
    eyebrow: 'Outsourcing social media',
    h1_line: 'Outsource social media.', h1_accent: 'With numbers that mean something.',
    lede: 'You want to outsource your social media, but you do not want to pay for reach and likes with no customer behind them. We start with a diagnosis on your own data: what has social actually delivered, which channels contribute and which only cost time. Then we set it up right and manage it actively, across Facebook, Instagram, LinkedIn and TikTok. Your accounts and data stay yours, and every change is logged where you can always look it up.',
    cta: 'Start the diagnosis',
    cta_micro: 'First the diagnosis, on your own data. Only then a proposal.',

    herken_eyebrow: 'Sound familiar?',
    herken_h2: 'Why social often delivers nothing.',
    herken: [
      { t: 'You pay for reach, not for customers', d: 'The report shows impressions, followers and engagement. How many enquiries came out is missing, because it is not measured.' },
      { t: 'Posting happens because it has to', d: 'Three posts a week per the calendar. Without anyone checking which ones ever delivered.' },
      { t: 'All channels at once, none of them well', d: 'Facebook, Instagram, LinkedIn and TikTok side by side, with the same content and half a budget each.' },
      { t: 'The business account is in the agency name', d: 'Switch partners and you start over: no history, no audiences, no learning data.' },
    ],
    herken_close: 'Social can work, but only if you measure what comes out at the bottom instead of what goes in at the top.',

    kanalen_eyebrow: 'Which channels',
    kanalen_h2: 'Not all four. The right ones.',
    kanalen_body: 'We pick channels based on where your customers are and what the diagnosis shows, not on what a package prescribes. Often two channels do well what four did halfway.',
    kanalen: [
      { t: 'Meta: Facebook and Instagram', d: 'The centre of gravity for most Dutch companies. Broad reach, steered sharply through message rather than targeting switches.' },
      { t: 'LinkedIn', d: 'For professional services and longer sales cycles. More expensive per click, but the right people.' },
      { t: 'TikTok', d: 'Works if you have something to show and can keep up the creative. Otherwise it is an expensive hobby, and we will say so.' },
      { t: 'Organic', d: 'Posting without budget makes sense when it belongs to a real story. Not as filler for a content calendar.' },
    ],

    table_eyebrow: 'What changes',
    table_h2: 'Outsourcing done properly.',
    rows: [
      { t: 'What gets measured', before: 'Reach, followers and engagement.', after: 'Enquiries and revenue, traced to channel and campaign.' },
      { t: 'Channel choice', before: 'All channels, because the package says so.', after: 'The channels that demonstrably deliver.' },
      { t: 'Ownership', before: 'Ad account is in the agency name.', after: 'Everything in your company name, including audiences and history.' },
      { t: 'Insight', before: 'A monthly report with nice visuals.', after: 'A log with every change, with date and reason.' },
      { t: 'Cancelling', before: 'You lose your accumulated data and audiences.', after: 'You take everything with you.' },
    ],
    before_label: 'At many agencies', after_label: 'At Stevin.AI',

    kosten_eyebrow: 'What it costs',
    kosten_h2: 'Outsourcing social media: the costs.',
    kosten_body: 'Management starts at 399 euros per month. What you need above that follows from the diagnosis, not from picking a package. Your ad budget is separate and you pay it directly to the platform, from your own account.',
    kosten_punten: [
      'From 399 euros per month for management',
      'No margin on your ad budget',
      'The diagnosis is free of obligation and you keep the report',
      'No long-term contract',
    ],

    faq_h2: 'What business owners ask us.',
    faqs: [
      { question: 'What does it cost to outsource social media?', answer: 'Management starts at 399 euros per month. On top of that comes your ad budget, which you pay directly to Meta, LinkedIn or TikTok from your own account. We take no margin on it. What you need exactly is determined after the diagnosis.' },
      { question: 'Do you also do Meta Ads and Facebook advertising?', answer: 'Yes, Meta (Facebook and Instagram) is the centre of gravity for most Dutch companies. We also run LinkedIn and TikTok where it fits. Which channels make sense follows from the diagnosis, not from a standard package.' },
      { question: 'Is TikTok right for my business?', answer: 'Only if you have something to show and can keep up the creative. TikTok demands far more new video than Meta. If that does not fit you, we would rather say so now than after three months.' },
      { question: 'Do my social accounts stay mine?', answer: 'Yes. Business page and ad account are in your company name, you keep admin rights, and the audiences and history you build stay with you if you leave.' },
      { question: 'Do you also do organic posting only?', answer: 'We can, but we are honest about it: organic posting without budget and without a story rarely produces enquiries. We do it when it belongs to something real, not as calendar filler.' },
      { question: 'How do you measure whether social delivers?', answer: 'We repair the measurement first, so an enquiry is actually counted as one and can be traced to channel and campaign. Without that step everyone steers on reach, and reach does not pay bills.' },
    ],

    closing_l1: 'Social does not have to be a cost centre.',
    closing_body: 'Start with the diagnosis. Within two weeks you see in black and white what social has delivered so far and what there is to gain.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale !== 'en'
  return localizedMetadata({
    path: '/social-media-uitbesteden',
    locale,
    title: isNl
      ? 'Social media uitbesteden, gemeten op aanvragen'
      : 'Outsource social media with numbers that mean something',
    description: isNl
      ? 'Social en Meta Ads vanaf 399 per maand. Accounts op je eigen naam, en meten op aanvragen in plaats van bereik.'
      : 'Outsource social media and Meta Ads from 399 per month. First a diagnosis on your own data, accounts in your own name, measured on enquiries instead of reach.',
  })
}

const h2Style = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const
const eyebrowLight = 'text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const dashLight = <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />

export default async function SocialMediaUitbestedenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: c.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

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
          <p className="text-white/60 leading-[1.6]" style={{ fontSize: '17px', maxWidth: '620px', marginTop: '28px' }}>
            {c.lede}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
            <p className="text-white/45 text-[13.5px] m-0">{c.cta_micro}</p>
          </div>
        </div>
      </section>

      {/* Herkenning */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.herken_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>{c.herken_h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
            {c.herken.map((item, i) => (
              <div key={item.t} className="bg-white p-8 lg:p-9">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-bold text-primary mb-3" style={{ fontSize: '18px', letterSpacing: '-0.01em', lineHeight: '1.25' }}>{item.t}</h3>
                <p className="text-muted leading-[1.6] m-0" style={{ fontSize: '14.5px' }}>{item.d}</p>
              </div>
            ))}
          </div>
          <p className="text-primary font-display font-semibold mt-8 m-0" style={{ fontSize: '16px', maxWidth: '640px' }}>{c.herken_close}</p>
        </div>
      </section>

      {/* Kanalen */}
      <section className="bg-primary" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.kanalen_eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-white m-0 mb-5" style={{ ...h2Style, maxWidth: '18ch' }}>{c.kanalen_h2}</h2>
          <p className="text-white/60 leading-[1.6] mb-12 m-0" style={{ fontSize: '16px', maxWidth: '620px' }}>{c.kanalen_body}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-9 max-w-[900px]">
            {c.kanalen.map((k) => (
              <article key={k.t} className="pt-5 border-t border-white/10">
                <h3 className="font-display font-bold text-white mb-2.5" style={{ fontSize: '17px', letterSpacing: '-0.01em' }}>{k.t}</h3>
                <p className="text-white/55 leading-[1.6] m-0" style={{ fontSize: '14.5px' }}>{k.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Voor/na */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className={eyebrowLight}>{dashLight}{c.table_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>{c.table_h2}</h2>
          <div className="rounded-[14px] border border-border overflow-hidden bg-white">
            <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-border">
              <div className="p-3 sm:p-4" aria-hidden="true" />
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-muted" style={{ fontSize: '12px' }}>{c.before_label}</div>
              <div className="p-3 sm:p-4 font-display font-bold uppercase tracking-wide text-accent" style={{ fontSize: '12px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{c.after_label}</div>
            </div>
            {c.rows.map((row, i, arr) => (
              <div key={row.t} className={`grid grid-cols-[0.8fr_1fr_1fr] ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="p-3 sm:p-4 font-display font-semibold text-primary" style={{ fontSize: '14px' }}>{row.t}</div>
                <div className="p-3 sm:p-4 text-muted leading-[1.5]" style={{ fontSize: '13.5px' }}>{row.before}</div>
                <div className="p-3 sm:p-4 text-primary leading-[1.5]" style={{ fontSize: '13.5px', backgroundColor: 'rgba(93,163,255,0.06)' }}>{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kosten */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1000px]">
          <p className={eyebrowLight}>{dashLight}{c.kosten_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-6" style={{ ...h2Style, maxWidth: '20ch' }}>{c.kosten_h2}</h2>
          <p className="text-muted leading-[1.65] mb-8" style={{ fontSize: '16px', maxWidth: '620px' }}>{c.kosten_body}</p>
          <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            {c.kosten_punten.map((p) => (
              <li key={p} className="flex items-start gap-3 text-primary" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-[7px]" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
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
          <h2 className="font-display font-extrabold text-white m-0" style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', lineHeight: '1.08', letterSpacing: '-0.03em', maxWidth: '18ch' }}>
            {c.closing_l1}
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="text-white/55 leading-[1.6] m-0 lg:text-right" style={{ fontSize: '15px', maxWidth: '380px' }}>{c.closing_body}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors">
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
      {/* Pagina over social, dus de Meta-storing. */}
      <DeskProof locale={locale} toonBrein={false} melding="meta-storing" />

    </>
  )
}
