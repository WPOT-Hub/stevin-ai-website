import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import { localizedMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd 4 sep 2026 (W-042). Deze pagina was een opsomming van alles wat het
// systeem zou kunnen, met daarin een claim die niet klopte: "van anoniem
// websitebezoek naar gekwalificeerde pipeline, volledig geautomatiseerd, zonder
// cookies". Er is geen bezoeker-identificatie in de codebase; het enige bestand
// in die richting anonimiseert juist.
//
// Wat hier nu staat is getoetst aan draaiende code, tabellen met rijen en
// cronjobs, niet aan documentatie. Zie docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md
// in Stevin-Hub.
//
// Twee keuzes die de pagina dragen:
// 1. "Wat het niet doet" staat er expliciet in. Het systeem voert niets uit op
//    een advertentieaccount; dat is met D-019 een bewuste keuze geweest. Bij een
//    propositie over controle is dat geen tekort maar het punt zelf.
// 2. De kennislaag staat er voor het eerst op. 105 principes, waarvan er hier
//    drie als voorbeeld staan met bron EN grens. Niet alle 105: dat leest
//    niemand, het is de moat, en maar 27 ervan zijn publiek citeerbaar.

const COPY = {
  nl: {
    eyebrow: 'Wat het doet',
    h1_line: 'Je ziet het vandaag.',
    h1_accent: 'Niet pas in de maandrapportage.',
    sub: 'Vier weken doorbetalen op een campagne die al drie weken stukloopt, dat is het echte prijskaartje van te laat kijken. Stevin ziet het dezelfde dag, zegt erbij waarom het volgens onderzoek uitmaakt, en legt vast wat je ermee deed.',
    cta: 'Start de diagnose',
    cta_sec: 'Zo controleer je ons',

    doet_eyebrow: 'Drie dingen, elke dag',
    doet_h2: 'Drie dingen. Vandaag al.',
    doet_sub: 'Geen roadmap, geen binnenkort. Dit draait, en je kunt het nakijken.',
    doet: [
      {
        t: 'Signalen op je eigen data',
        d: 'Elke dag gecontroleerd op afwijkingen in je advertenties, je budgetten en je meting. Je hoort het als er iets scheefloopt, met de reden erbij, niet pas in de maandrapportage.',
      },
      {
        t: 'Zien wie er in jouw markt adverteert',
        d: 'Uit het openbare advertentieregister van Google en Meta halen we doorlopend op welke partijen in jouw markt adverteren en waarmee. Publieke data, dus dit werkt ook voordat je klant bent.',
      },
      {
        t: 'Een logboek dat blijft',
        d: 'Elke wijziging met naam, moment en reden. Ook de besluiten die achteraf verkeerd uitpakten, met wat eruit geleerd is. Wie hier volgend jaar begint leest zich in.',
      },
    ],

    niet_eyebrow: 'Even zo belangrijk',
    niet_h2: 'En dit doet het expres niet.',
    niet_sub: 'Omdat een systeem dat alles zelf mag, precies het systeem is dat je niet meer kunt narekenen.',
    niet: [
      {
        t: 'Het verandert niets aan je campagnes',
        d: 'Er loopt geen enkele opdracht van ons systeem naar Google of Meta. Het signaleert en zet een voorstel klaar; een mens beslist en voert uit. Dat is een keuze, geen fase.',
      },
      {
        t: 'Het koppelt niet met alles',
        d: 'Advertentieplatforms en analytics wel. Je kassasysteem, je ERP, je DMS of een retailerportaal niet. Die cijfers leg je er zelf naast, en dat zeggen we liever dan dat we het beloven.',
      },
    ],

    kennis_eyebrow: 'Waarom het advies klopt',
    kennis_h2: 'Vraag maar waarom. Er ligt een bron onder.',
    kennis_sub: 'Onder het systeem ligt een kennislaag van 105 principes, opgebouwd uit gepubliceerd onderzoek. Ze wegen mee bij elke analyse. Hieronder drie ervan, zoals ze in het systeem staan.',
    principes: [
      {
        p: 'Groei komt vooral van nieuwe kopers, niet van loyaler maken.',
        u: 'Merken van gelijke grootte hebben vrijwel gelijke loyaliteit. Wie groeit, groeit door acquisitie.',
        bron: 'Ehrenberg-Bass',
        grens: 'Betekent niet dat retentie er niet toe doet, en het geldt niet voor merken die hun categorie al vrijwel volledig bedienen.',
      },
      {
        p: 'Merk en activatie horen samen, rond 60/40.',
        u: 'Losse kortetermijncampagnes stapelen niet op tot groei op lange termijn.',
        bron: 'IPA Databank, Binet en Field',
        grens: 'Betekent niet dat 60/40 een wet is. Het is een kalibratiepunt dat verschuift met categorie, groeifase, budget en koopfrequentie. En niet dat elk MKB-budget naar dure merkkanalen moet.',
      },
      {
        p: 'Controleer je meting voordat je iets anders beoordeelt.',
        u: 'Een event dat op het verkeerde moment vuurt maakt elke diagnose ongeldig. Klassiekers: een aankoop-event dat bij het laden van de pagina afgaat, of UTM-tags die onderweg sneuvelen.',
        bron: 'Kernprincipe, weegt altijd mee',
        grens: 'Betekent niet dat je zonder perfecte meting niet mag adverteren. Wel dat je je cijfers dan niet blind interpreteert.',
      },
    ],
    kennis_slot: 'Wij bepalen niet welk model jij gebruikt. Werk je met STDC, met See Think Do Care of met 5A, dan volgt het advies jouw fasen en de bijbehorende maatstaven. Het model is van jou; wat wij toevoegen is wat er per fase aantoonbaar werkt.',

    slot_h2: 'Kijk eerst, beslis daarna.',
    slot_sub: 'De diagnose draait op je eigen cijfers en levert zwart op wit op waar je staat. Daarna pas een voorstel.',
  },
  en: {
    eyebrow: 'What it does',
    h1_line: 'You see it today.',
    h1_accent: 'Not in next month report.',
    sub: 'Four weeks of paying for a campaign that broke three weeks ago: that is the real price of looking too late. Stevin sees it the same day, tells you why research says it matters, and records what you did about it.',
    cta: 'Start the diagnosis',
    cta_sec: 'How to check us',

    doet_eyebrow: 'Three things, every day',
    doet_h2: 'Three things. Today already.',
    doet_sub: 'No roadmap, no coming soon. This runs, and you can check it.',
    doet: [
      {
        t: 'Signals on your own data',
        d: 'Checked daily for drift in your ads, your budgets and your measurement. You hear about it with the reason attached, not in next month report.',
      },
      {
        t: 'See who advertises in your market',
        d: 'From the public ad registers of Google and Meta we track who advertises in your market and with what. Public data, so this works before you are a client.',
      },
      {
        t: 'A logbook that stays',
        d: 'Every change with a name, a moment and a reason. Including the decisions that turned out wrong, with what we learned. Whoever starts here next year reads up.',
      },
    ],

    niet_eyebrow: 'Just as important',
    niet_h2: 'And this it deliberately does not do.',
    niet_sub: 'Because a system allowed to do everything by itself is exactly the system you can no longer check.',
    niet: [
      {
        t: 'It changes nothing in your campaigns',
        d: 'Not a single instruction runs from our system to Google or Meta. It flags and prepares a proposal; a person decides and executes. That is a choice, not a phase.',
      },
      {
        t: 'It does not connect to everything',
        d: 'Ad platforms and analytics, yes. Your point of sale, your ERP, your DMS or a retailer portal, no. You put those numbers alongside yourself, and we would rather say so than promise it.',
      },
    ],

    kennis_eyebrow: 'Why the advice holds',
    kennis_h2: 'Ask why. There is a source underneath.',
    kennis_sub: 'Underneath sits a knowledge layer of 105 principles, built from published research. They weigh in on every analysis. Three of them below, as they sit in the system.',
    principes: [
      {
        p: 'Growth comes mostly from new buyers, not from making existing ones more loyal.',
        u: 'Brands of similar size have near identical loyalty. Those that grow, grow through acquisition.',
        bron: 'Ehrenberg-Bass',
        grens: 'Does not mean retention is irrelevant, and it does not hold for brands already serving nearly their whole category.',
      },
      {
        p: 'Brand building and activation belong together, around 60/40.',
        u: 'Isolated short term campaigns do not add up to long term growth.',
        bron: 'IPA Databank, Binet and Field',
        grens: 'Does not mean 60/40 is a law. It is a calibration point that shifts with category, growth stage, budget and purchase frequency. And not that every small business budget belongs in expensive brand channels.',
      },
      {
        p: 'Check your measurement before judging anything else.',
        u: 'An event firing at the wrong moment invalidates any diagnosis. Classics: a purchase event firing on page load, or UTM tags lost along the way.',
        bron: 'Core principle, always weighed',
        grens: 'Does not mean you cannot advertise without perfect measurement. It means you do not read your numbers blindly.',
      },
    ],
    kennis_slot: 'We do not decide which model you use. Work with STDC, with See Think Do Care or with 5A, and the advice follows your phases and their measures. The model is yours; what we add is what demonstrably works per phase.',

    slot_h2: 'Look first, decide after.',
    slot_sub: 'The diagnosis runs on your own numbers and puts in black and white where you stand. A proposal comes after that.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/platform',
    // Geen merknaam hier: localizedMetadata plakt " | Stevin.AI" er zelf achter.
    title: nl
      ? 'Wat het platform doet, en waar het advies op steunt'
      : 'What the platform does, and what the advice rests on',
    description: nl
      ? 'Signalen op je eigen data, zien wie er in je markt adverteert, en een logboek dat blijft. Met per advies de bron en de grens erbij.'
      : 'Signals on your own data, seeing who advertises in your market, and a logbook that stays. With the source and the limit behind every piece of advice.',
  })
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/50">{t.eyebrow}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl text-balance">
            {t.h1_line}{' '}
            <span className="text-accent">{t.h1_accent}</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{t.sub}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors"
            >
              {t.cta}
            </Link>
            <Link
              href="/controle"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              {t.cta_sec}
            </Link>
          </div>
        </div>
      </section>

      {/* Wat het doet */}
      <Section bg="white">
        <SectionHeader title={t.doet_h2} subtitle={t.doet_sub} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.doet.map((item) => (
            <div key={item.t} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold text-primary">{item.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Wat het NIET doet */}
      <Section bg="surface">
        <SectionHeader title={t.niet_h2} subtitle={t.niet_sub} />
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {t.niet.map((item) => (
            <div key={item.t} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold text-primary">{item.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* De kennislaag */}
      <Section bg="white">
        <SectionHeader title={t.kennis_h2} subtitle={t.kennis_sub} />
        <div className="mx-auto max-w-3xl flex flex-col gap-5">
          {t.principes.map((p) => (
            <div key={p.p} className="rounded-xl border border-border bg-white p-6 border-l-[3px] border-l-accent">
              <p className="text-base font-semibold text-primary leading-snug">{p.p}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.u}</p>
              <p className="mt-4 text-xs font-mono uppercase tracking-[0.1em] text-muted/70">{p.bron}</p>
              <p className="mt-3 text-sm text-primary/80 leading-relaxed border-t border-border pt-3">
                {p.grens}
              </p>
            </div>
          ))}
          <p className="mt-4 text-sm text-muted leading-relaxed">{t.kennis_slot}</p>
        </div>
      </Section>

      {/* Slot */}
      <Section bg="primary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{t.slot_h2}</h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">{t.slot_sub}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </Section>
    </>
  )
}
