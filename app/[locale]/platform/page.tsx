import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import AskStevinDemo from '@/components/AskStevinDemo'
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
        // W-078, Koen 13 sep 10:40: "als de vraag er is koppelen we". Het blok
        // blijft eerlijk over wat er vandaag draait, maar sluit niets meer uit.
        t: 'Het koppelt niet alvast met alles',
        d: 'Advertentieplatforms, analytics en je webshop lezen we vandaag uit. Je kassasysteem, je ERP of je DMS koppelen we pas als jouw vraag erom vraagt, niet omdat het op een lijst mooi staat. Als de vraag er is, koppelen we.',
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

    ladder_eyebrow: 'De volgorde',
    ladder_h2: 'Wat er moet kloppen voordat AI iets voor je kan betekenen.',
    ladder_sub: 'Niet omdat het braaf is, maar omdat elke stap de volgende mogelijk maakt. Sla er een over en alles daarboven is gokwerk met meer rekenkracht.',
    ladder_grip: 'Eerst grip',
    ladder_dan: 'Dan pas dit',
    ladder: [
      { n: '01', t: 'Op jouw naam', d: 'De accounts staan op naam van je bedrijf en jij bepaalt wie erbij mag. Zonder dit kun je morgen niet wisselen van uitvoerder, hoe goed de rest ook staat.' },
      { n: '02', t: 'Meting', d: 'Een conversie is een echte aanvraag, geen knopklik. Vuurt je meting op het verkeerde moment, dan is elk cijfer erboven onbruikbaar.' },
      { n: '03', t: 'Een bron', d: 'Een plek waar de cijfers samenkomen, in plaats van vier dashboards die elkaar tegenspreken. Anders discussieer je over wie gelijk heeft in plaats van over wat je doet.' },
      { n: '04', t: 'Geheugen', d: 'Wat is er geprobeerd, waarom, en wat kwam eruit. Zonder dat begint elke nieuwe partij weer bij nul, en betaal je twee keer voor dezelfde les.' },
      { n: '05', t: 'Automatiseren', d: 'Pas hier. Wat vier keer hetzelfde gaat, kan zichzelf doen. Daarvoor is het gokken welk werk je automatiseert.' },
      { n: '06', t: 'AI', d: 'Bovenop, niet eronder. Met de vier stappen hierboven op orde is dit een vliegwiel. Zonder is het een dure manier om sneller de verkeerde kant op te sturen.' },
    ],
    ladder_slot: 'Wij beginnen altijd onderaan. Niet omdat het de leukste kant is, maar omdat de rest daar op rust.',

    slot_h2: 'Kijk eerst, beslis daarna.',
    slot_sub: 'De diagnose draait op je eigen cijfers en levert zwart op wit op waar je staat. Daarna pas een voorstel.',
  },
  en: {
    eyebrow: 'What it does',
    h1_line: 'You see it today.',
    h1_accent: 'Not in next month\'s report.',
    sub: 'Four weeks of paying for a campaign that broke three weeks ago: that is the real price of looking too late. Stevin sees it the same day, tells you why research says it matters, and records what you did about it.',
    cta: 'Start the diagnosis',
    cta_sec: 'How to check us',

    doet_eyebrow: 'Three things, every day',
    doet_h2: 'Three things. Today already.',
    doet_sub: 'No roadmap, no coming soon. This runs, and you can check it.',
    doet: [
      {
        t: 'Signals on your own data',
        d: 'Checked daily for drift in your ads, your budgets and your measurement. You hear about it with the reason attached, not in next month\'s report.',
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
        t: 'It does not connect to everything up front',
        d: 'Ad platforms, analytics and your shop we read today. Your point of sale, your ERP or your DMS we connect when your question calls for it, not because it looks good on a list. If there is demand, we connect it.',
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

    ladder_eyebrow: 'The order',
    ladder_h2: 'What has to be right before AI can do anything for you.',
    ladder_sub: 'Not out of tidiness, but because each step makes the next one possible. Skip one and everything above it is guesswork with more compute.',
    ladder_grip: 'Grip first',
    ladder_dan: 'Only then this',
    ladder: [
      { n: '01', t: 'Ownership', d: 'The accounts are in your company name and you decide who gets access. Without this you cannot switch executor tomorrow, however good the rest is.' },
      { n: '02', t: 'Measurement', d: 'A conversion is a real enquiry, not a button click. If your tracking fires at the wrong moment, every number above it is unusable.' },
      { n: '03', t: 'One source', d: 'One place where the numbers meet, instead of four dashboards contradicting each other. Otherwise you argue about who is right instead of what to do.' },
      { n: '04', t: 'Memory', d: 'What was tried, why, and what came of it. Without it every new party starts from zero and you pay twice for the same lesson.' },
      { n: '05', t: 'Automation', d: 'Only here. What happens the same way four times can do itself. Before this you are guessing which work to automate.' },
      { n: '06', t: 'AI', d: 'On top, not underneath. With the four steps above in place this is a flywheel. Without them it is an expensive way to go the wrong way faster.' },
    ],
    ladder_slot: 'We always start at the bottom. Not because it is the fun part, but because the rest rests on it.',

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

      {/* W-078: de klantportal als gescripte demo, zie components/AskStevinDemo.tsx.
          Na "wat het doet", voor "wat het niet doet": eerst zien, dan de grens. */}
      <AskStevinDemo locale={locale} />

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

      {/* De volgorde. Stond tot 13 sep 2026 op de homepage en is daar weggehaald:
          het blok eindigt bij AI en dat is niet de vraag van de ondernemer die
          daar landt, en het zei in abstracte vorm hetzelfde als "Hoe het werkt".
          Hier is de lezer wel iemand die zo'n volgorde leest. */}
      <Section bg="primary">
        <SectionHeader title={t.ladder_h2} subtitle={t.ladder_sub} light />
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/40 mb-5">{t.ladder_grip}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.ladder.slice(0, 4).map((stap) => (
              <div key={stap.n} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-mono text-xs text-accent">{stap.n}</p>
                <h3 className="mt-3 text-base font-semibold text-white">{stap.t}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{stap.d}</p>
              </div>
            ))}
          </div>

          <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/40 mt-10 mb-5">{t.ladder_dan}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.ladder.slice(4).map((stap) => (
              <div key={stap.n} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-mono text-xs text-accent">{stap.n}</p>
                <h3 className="mt-3 text-base font-semibold text-white">{stap.t}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{stap.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-white/50 leading-relaxed max-w-[58ch]">{t.ladder_slot}</p>
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
