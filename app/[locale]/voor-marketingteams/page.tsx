import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import { localizedMetadata } from '@/lib/seo'
import DeskProof from '@/components/DeskProof'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd op 4 sep 2026 (W-042), in dezelfde vorm als /fmcg en /retail.
// De oude pagina draaide op de marketing-namespace en beloofde "native
// koppelingen met Meta, Google, TikTok, LinkedIn, Shopify, Klaviyo en meer",
// een dashboardvergelijking en zes features zonder grens erbij.
//
// Wat hier gecontroleerd is voor het opgeschreven werd:
// - Creative-verzadiging bestaat echt: src/services/creativeFatigue.ts, en hij
//   wordt aangeroepen vanuit runFullIntelligencePipeline in attributionLogic.ts,
//   die op drie plekken in de scheduler staat. Geen roadmap-claim dus.
// - De budgetscenario's komen uit diezelfde pijplijn (runScenarioSimulation) en
//   schrijven alleen een voorstel weg, geen wijziging.
// - Er is geen schrijfpad naar Google of Meta. Nul mutate-aanroepen in de
//   codebase, en src/core/governance/actionRequests.ts legt vast dat een
//   voorstel een taak voor een mens wordt. Dat staat hier nu als belofte in
//   plaats van als voetnoot, want het is precies wat een team wil weten.
// - Connector-health is REGEL #3: stale is zichtbaar, geen stille mislukking.
// - De drie principes staan woordelijk in docs/knowledge/ADVISOR_KNOWLEDGE.md
//   (kern 1, 4 en 5), inclusief hun "betekent niet".
// Zie docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md in Stevin-Hub.

const COPY = {
  nl: {
    eyebrow: 'Voor marketingteams en bureaus',
    h1_line: 'Je weet het maandag,',
    h1_accent: 'en het gebeurde dinsdag.',
    sub: 'Voor teams die de cijfers wel hebben, maar er pas naar kijken als iemand er tijd voor maakt. Het probleem is zelden dat er geen data is. Het is dat niemand doorlopend kijkt, en dat wat je vorig jaar leerde nergens staat.',
    cta: 'Start de diagnose',
    cta_sec: 'Wat het platform doet',

    eerlijk_h2: 'Wat wij hier niet doen.',
    eerlijk_sub: 'Twee dingen vooraf, want dit is precies waar tools in deze categorie vaag over blijven.',
    eerlijk: [
      {
        t: 'Wij veranderen niets in je accounts',
        d: 'Er zit geen schrijfpad naar Google of Meta in dit systeem, met opzet. Elk voorstel wordt een taak met een naam eronder, en een mens voert het uit of legt uit waarom niet. Je krijgt er dus geen tweede hand bij die zonder overleg aan je budgetten zit.',
      },
      {
        t: 'Wij zijn geen dashboard erbij',
        d: 'Je hebt er waarschijnlijk al twee. Wat hier gebeurt is het omgekeerde van een dashboard: je hoeft niet te kijken. Er komt een melding als iets afwijkt, met de reden en het voorstel eronder, en de bron erbij zodat je het kunt nakijken.',
      },
    ],

    wel_h2: 'Wat we wel doen, en waarom dat het verschil maakt.',
    wel: [
      {
        t: 'Verse data, of het staat er als oud',
        d: 'Elke koppeling schrijft weg wanneer hij voor het laatst geslaagd is. Loopt een sync vast, dan zie je dat als stale of failed in plaats van een grafiek die stil doorloopt op cijfers van vorige maand. Dit is de saaiste belofte op deze pagina en in de praktijk de duurste als hij ontbreekt.',
      },
      {
        t: 'Creative-verzadiging voordat je het voelt',
        d: 'Doorklikratio over rollende vensters, stijgende klikprijs, dalende interactie en tijd in de markt. Als een uiting op is hoor je dat terwijl je er nog iets aan kunt doen, niet in de evaluatie achteraf.',
      },
      {
        t: 'Een voorstel voor de volgende euro',
        d: 'Waar je budget nu boven zijn rendement zit en waar het onder zijn potentie draait, doorgerekend als scenario met een geschatte opbrengst. Het blijft een voorstel: je ziet de aanname, en jij besluit.',
      },
      {
        t: 'Drie zinnen die je kunt doorsturen',
        d: 'De briefing is geen rapport van veertig pagina\'s maar wat er nu speelt, waarom het ertoe doet en wat de eerstvolgende stap is. Genoeg om aan een klant of een directeur te sturen zonder er een avond aan te besteden.',
      },
      {
        t: 'Een geheugen dat blijft',
        d: 'Wat je vorig jaar in dezelfde week deed, wat het kostte en wat je ervan leerde. Ook de dingen die niet werkten. Vertrekt de persoon die het wist, dan blijft het staan, en het volgende bureau erft het in plaats van opnieuw te beginnen.',
      },
      {
        t: 'Een tweede blik die niets verkoopt',
        d: 'De aanbevelingen van de platformen zelf zijn ook verkoop. Wij wegen ze als zodanig: een voorstel van Google of Meta gaat pas door als het bewijs erbij past, niet omdat de optimalisatiescore erom vraagt.',
      },
    ],

    canon_eyebrow: 'Waarom ons advies klopt',
    canon_h2: 'Onder elk advies ligt een kennislaag met bronnen.',
    canon_sub: '105 principes uit gepubliceerd onderzoek, over zeven domeinen, met kernprincipes die bij elke analyse meewegen en conflictregels voor als twee principes elkaar tegenspreken. Drie ervan, zoals ze in het systeem staan, met hun grens erbij. Die grens is het punt: een principe zonder grens is een dogma.',
    principes: [
      {
        p: 'Controleer tracking en conversieconfiguratie voordat je iets anders beoordeelt.',
        u: 'Een event dat op het verkeerde moment vuurt of een doel buiten de stuurlaag maakt elke diagnose ongeldig. De klassiekers: een aankoop-event dat bij het laden van de pagina afgaat, en UTM-tags die onderweg sneuvelen.',
        bron: 'Kernprincipe 1',
        grens: 'Betekent niet dat je zonder perfecte meting niet mag adverteren. Wel dat je je cijfers dan niet blind interpreteert.',
      },
      {
        p: 'Reken elk kanaal af op business-uitkomsten over kanalen heen, nooit op kanaal-eigen metrics.',
        u: 'E-mail duwt conversies die ergens anders landen, en bereikkanalen laten zich zien als lift op merkzoekvraag en conversieratio, niet op hun eigen last-click.',
        bron: 'Kernprincipe 4',
        grens: 'Betekent niet dat opens en kliks nutteloos zijn. Ze blijven diagnostiek van bereik en interesse, ze horen alleen niet in de stuurlaag.',
      },
      {
        p: 'Weeg platform-aanbevelingen en standaardinstellingen als verkoopsignaal: eis bewijs voordat je iets doorvoert.',
        u: 'De optimalisatiescore is een verkoopmetric, standaardmetrics meten betrokkenheid en automatische verfraaiingen passen je creatie aan zonder dat je het vroeg.',
        bron: 'Kernprincipe 5',
        grens: 'Betekent niet dat aanbevolen functies nooit werken. Met een deugend conversiesignaal eronder kunnen ze prima zijn.',
      },
    ],

    ervaring_h2: 'Waarom wij dit weten.',
    ervaring_p1: 'Dit systeem is gebouwd door iemand die twintig jaar aan de bureau-kant zat en er zelf een had. De maandrapportage, de exports, het samenvoegen, het presenteren: dat is niet een detail van dat werk, dat is het grootste deel ervan.',
    ervaring_p2: 'Wat er zelden bij zat: iemand die er doorlopend naar keek, en een plek waar bleef staan wat je vorig jaar had geleerd. Dat zat in het hoofd van de persoon die het account deed, en dat hoofd wisselde van baan.',
    ervaring_p3: 'Daarom begint dit systeem bij meten, bij vastleggen waarom je iets besloot, en bij de afspraak dat wij niets in je accounts veranderen zonder dat er een mens met een naam achter staat.',

    slot_h2: 'Begin bij wat er nu gemeten wordt.',
    slot_sub: 'De diagnose loopt op je eigen cijfers en laat zwart op wit zien wat er klopt en wat niet. Binnen twee weken, en je houdt het rapport.',
  },
  en: {
    eyebrow: 'For marketing teams and agencies',
    h1_line: 'You find out on Monday,',
    h1_accent: 'and it happened on Tuesday.',
    sub: 'For teams that have the numbers but only look at them when someone makes time. The problem is rarely a lack of data. It is that nobody watches continuously, and that what you learned last year is written down nowhere.',
    cta: 'Start the diagnosis',
    cta_sec: 'What the platform does',

    eerlijk_h2: 'What we do not do here.',
    eerlijk_sub: 'Two things up front, because this is exactly where tools in this category stay vague.',
    eerlijk: [
      {
        t: 'We change nothing in your accounts',
        d: 'There is no write path to Google or Meta in this system, by design. Every proposal becomes a task with a name under it, and a person carries it out or explains why not. So you are not getting a second pair of hands touching your budgets without a conversation.',
      },
      {
        t: 'We are not another dashboard',
        d: 'You probably already have two. What happens here is the opposite of a dashboard: you do not have to look. You get a notification when something deviates, with the reason and the proposal underneath, and the source attached so you can check it.',
      },
    ],

    wel_h2: 'What we do, and why it matters.',
    wel: [
      {
        t: 'Fresh data, or it is marked as old',
        d: 'Every connection records when it last succeeded. If a sync breaks you see it as stale or failed, instead of a chart quietly running on last month\'s numbers. This is the dullest promise on this page and in practice the most expensive one to miss.',
      },
      {
        t: 'Creative fatigue before you feel it',
        d: 'Click-through rate across rolling windows, rising cost per click, declining interaction and time in market. When an execution is spent you hear it while you can still do something about it, not in the evaluation afterwards.',
      },
      {
        t: 'A proposal for the next euro',
        d: 'Where your budget sits above its return and where it runs below its potential, worked through as a scenario with an estimated result. It stays a proposal: you see the assumption, and you decide.',
      },
      {
        t: 'Three sentences you can forward',
        d: 'The briefing is not a forty page report but what is happening now, why it matters and what the next step is. Enough to send to a client or a director without spending an evening on it.',
      },
      {
        t: 'A memory that stays',
        d: 'What you did in the same week last year, what it cost and what you learned. Including the things that did not work. If the person who knew it leaves, it stays, and the next agency inherits it instead of starting over.',
      },
      {
        t: 'A second opinion that sells you nothing',
        d: 'The platforms\' own recommendations are sales too. We weigh them that way: a proposal from Google or Meta goes through when the evidence supports it, not because the optimisation score asks for it.',
      },
    ],

    canon_eyebrow: 'Why the advice holds',
    canon_h2: 'Under every piece of advice sits a knowledge layer with sources.',
    canon_sub: '105 principles from published research across seven domains, with core principles that weigh in on every analysis and conflict rules for when two of them disagree. Three of them, as they sit in the system, with their limits. That limit is the point: a principle without a limit is a dogma.',
    principes: [
      {
        p: 'Check tracking and conversion configuration before judging anything else.',
        u: 'An event that fires at the wrong moment, or a goal outside the steering layer, invalidates every diagnosis. The classics: a purchase event firing on page load, and UTM tags that break along the way.',
        bron: 'Core principle 1',
        grens: 'Does not mean you cannot advertise without perfect measurement. It means you do not read your numbers blindly.',
      },
      {
        p: 'Judge every channel on business outcomes across channels, never on channel-owned metrics.',
        u: 'Email pushes conversions that land elsewhere, and reach channels show up as lift on brand search and conversion rate, not on their own last click.',
        bron: 'Core principle 4',
        grens: 'Does not mean opens and clicks are useless. They remain diagnostics of reach and interest; they just do not belong in the steering layer.',
      },
      {
        p: 'Treat platform recommendations and defaults as a sales signal: demand evidence before applying them.',
        u: 'The optimisation score is a sales metric, default metrics measure engagement, and automatic enhancements change your creative without being asked.',
        bron: 'Core principle 5',
        grens: 'Does not mean recommended features never work. With a sound conversion signal underneath they can be perfectly good.',
      },
    ],

    ervaring_h2: 'Why we know this.',
    ervaring_p1: 'This system was built by someone who spent twenty years on the agency side and owned one. The monthly report, the exports, the merging, the presenting: that is not a detail of the work, it is the bulk of it.',
    ervaring_p2: 'What was rarely included: someone who watched it continuously, and a place where last year\'s lessons stayed. That lived in the head of the person on the account, and that person changed jobs.',
    ervaring_p3: 'So this system starts with measuring, with recording why a decision was made, and with the agreement that we change nothing in your accounts without a person putting their name to it.',

    slot_h2: 'Start with what is being measured now.',
    slot_sub: 'The diagnosis runs on your own numbers and shows in black and white what holds and what does not. Within two weeks, and you keep the report.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/voor-marketingteams',
    title: nl ? 'Voor marketingteams en bureaus' : 'For marketing teams and agencies',
    description: nl
      ? 'Doorlopend meekijken in plaats van een maandrapport, met een geheugen dat blijft. Wij veranderen niets in je accounts: elk voorstel wordt een taak met een naam eronder.'
      : 'Continuous oversight instead of a monthly report, with a memory that stays. We change nothing in your accounts: every proposal becomes a task with a name under it.',
    image: nl ? 'https://stevin.ai/marketing/opengraph-image' : 'https://stevin.ai/en/marketing/opengraph-image',
  })
}

export default async function MarketingTeamsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/50">{t.eyebrow}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              {t.h1_line} <span className="text-accent">{t.h1_accent}</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">{t.sub}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors">{t.cta}</Link>
              <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">{t.cta_sec}</Link>
            </div>
          </div>
        </div>
      </section>

      <Section bg="white">
        <SectionHeader title={t.eerlijk_h2} subtitle={t.eerlijk_sub} />
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {t.eerlijk.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold text-primary">{i.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="surface">
        <SectionHeader title={t.wel_h2} />
        <div className="grid gap-6 md:grid-cols-2">
          {t.wel.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold text-primary">{i.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <DeskProof locale={locale} melding="meta-storing" />

      <Section bg="white">
        <SectionHeader title={t.canon_h2} subtitle={t.canon_sub} />
        <div className="mx-auto max-w-3xl flex flex-col gap-5">
          {t.principes.map((p) => (
            <div key={p.p} className="rounded-xl border border-border bg-white p-6 border-l-[3px] border-l-accent">
              <p className="text-base font-semibold text-primary leading-snug">{p.p}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.u}</p>
              <p className="mt-4 text-xs font-mono uppercase tracking-[0.1em] text-muted/70">{p.bron}</p>
              <p className="mt-3 text-sm text-primary/80 leading-relaxed border-t border-border pt-3">{p.grens}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="surface">
        <div className="mx-auto max-w-3xl">
          <SectionHeader title={t.ervaring_h2} centered={false} />
          <div className="flex flex-col gap-4">
            <p className="text-muted leading-relaxed">{t.ervaring_p1}</p>
            <p className="text-primary leading-relaxed font-medium">{t.ervaring_p2}</p>
            <p className="text-muted leading-relaxed">{t.ervaring_p3}</p>
          </div>
        </div>
      </Section>

      <Section bg="primary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{t.slot_h2}</h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">{t.slot_sub}</p>
          <Link href="/contact" className="mt-8 inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors">{t.cta}</Link>
        </div>
      </Section>
    </>
  )
}
