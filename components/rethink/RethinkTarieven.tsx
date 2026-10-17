import { Link } from '@/i18n/navigation'
import NodeWatermerk from './NodeWatermerk'
import { PaginaKop } from './RethinkBlokken'

// De nieuwe /tarieven (W-535), in de stijl van de homepage. Koen, 11 okt
// 23:40: "deze pagina als volgende aanpakken", en twee pakketten zoals op de
// homepage, niet meer drie. Het opstartpakket van 1.499 is weg: overstappen
// van bureau naar zelf doen staat nu als zin onder het bureau.
//
// Volgorde, uit het corpus en page-cro: eerst het antwoord op de vraag waar de
// pagina naar heet (wat kost het), dan de keuze, dan waarom je prijs niet
// meegroeit, dan de markt (uit PR #113, W-506), dan de vragen die iemand nog
// heeft, dan een knop. Elk antwoord staat op zichzelf, zodat het ook los
// gelezen klopt (AI-zoekmachines knippen op betekenis).
//
// Bedragen gelijk aan de homepage (PRIJZEN in RethinkHome.tsx) en aan de oude
// pagina: 1.399 en 399 bij jaarbetaling, 1.499 en 499 per maand.

const h2Stijl = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const

const PAKKETTEN = [
  {
    id: 'bureau',
    label: 'Hier begint bijna iedereen',
    wat: 'Wij worden jouw bureau',
    prijs: 'vanaf 1.399',
    sub: 'bij jaarbetaling, 1.499 als je per maand betaalt. De opstart is maatwerk, de prijs hoor je vooraf.',
    punten: [
      'Eerst zetten we alles goed: meting, accounts en de koppeling met je CRM.',
      'Daarna sturen we bij op aanvragen en omzet, niet op klikken.',
      'Elk besluit leggen we vast, met de reden erbij.',
      'Wil je later zelf verder? Dan bouwen we agents die het werk overnemen.',
    ],
  },
  {
    id: 'zelf',
    label: 'Als het goed staat',
    wat: 'Je doet het zelf, of we zetten jouw agents aan het werk',
    prijs: 'vanaf 399',
    sub: 'bij jaarbetaling, 499 als je per maand betaalt.',
    punten: [
      'Stevin ziet wat er misgaat en zet de oplossing klaar.',
      'Jij, je eigen team of jouw agents voeren het uit.',
      'Een klus toch door ons? Dan hoor je de prijs vooraf.',
      'Terug naar het bureau kan altijd.',
    ],
  },
] as const

// Koen, 11 okt: "Prijs kun je ook niet bepalen op ad spend", "Campagne van 2k
// ad spend kan moeilijker zijn dan een campagne van 10k", en "verdienen niet
// aan marge en hebben er ook niks aan als ze meer uitgeven".
const BUDGET = {
  kop: 'Je prijs groeit niet mee met je advertentiebudget.',
  alineas: [
    'Veel bureaus rekenen 10 tot 20 procent van wat je bij Google en Meta uitgeeft. Dan verdient je bureau meer zodra jij meer uitgeeft, en het is ook je bureau dat zegt hoeveel je moet uitgeven.',
    'Bovendien zegt je budget weinig over hoeveel werk het is. Een campagne van 2.000 euro kan lastiger zijn dan een van 10.000.',
    // Geen "vast bedrag": de prijs is vanaf en hangt af van het werk (Koen, 11 okt 23:55).
    'Wij rekenen naar het werk dat er ligt, niet naar je budget. Wat je bij Google en Meta uitgeeft, gaat naar Google en Meta.',
  ],
}

// De marktprijzen van andere bureaus (225 tot 2.000 per maand, uit PR #113)
// staan er bewust niet meer: naast "vanaf 1.399" verkoop je jezelf tegen 225,
// en het zijn prijzen van anderen die we niet kunnen nagaan (Koen, 12 okt
// 00:20). Het percentagemodel staat al in het budgetblok.
const MARKT = {
  kop: 'Vraag dit voordat je tekent',
  vragen: [
    {
      v: 'Op wiens naam staan de accounts?',
      a: 'Bij ons op de jouwe, en de rekening van Google en Meta ook.',
    },
    {
      v: 'Wat neem je mee als je stopt?',
      a: 'Bij ons je accounts, je data en het dossier met elk besluit en de reden erbij.',
    },
    {
      v: 'Wanneer wordt het werk beoordeeld?',
      a: 'Pas als je hele aankoopcyclus voorbij is. Duurt het gemiddeld zes maanden voordat iemand koopt, dan zegt een oordeel na drie maanden weinig.',
    },
  ],
}

const VRAGEN = [
  {
    v: 'Zit mijn advertentiebudget in de prijs?',
    a: 'Nee. Je advertentiebudget betaal je rechtstreeks aan Google, Meta of een ander platform. Wij rekenen er geen marge op.',
  },
  {
    v: 'Wat kost Google Ads uitbesteden bij Stevin.AI?',
    a: 'Vanaf 1.399 per maand bij jaarbetaling. Google Ads valt daaronder, samen met je andere kanalen, zoals Meta en je website.',
  },
  {
    v: 'Kan ik later overstappen naar zelf doen?',
    a: 'Ja. Staat alles goed, dan ga je naar vanaf 399 per maand en voeren jij, je team of jouw agents het werk uit. Terug kan ook.',
  },
  {
    v: 'Wat als ik meer vestigingen of merken heb?',
    a: 'De tarieven gelden voor een bedrijf met een merk en een vestiging of webshop. Meer vestigingen, merken of webshops kosten meer. Hoeveel hoor je in de kennismaking.',
  },
]

export default function RethinkTarieven() {
  return (
    <main className="bg-white">
      {/* ── 1. ANTWOORD ── Het brein als kop met Verkoop open: omzet per bron
          (Koen, 12 okt 07:48, nodes per pagina). */}
      <PaginaKop
        brein="verkoop"
        eyebrow="Tarieven"
        kop="Wat kost het uitbesteden van je marketing?"
        knop="tarieven_kop"
        lede={
          <p className="m-0">
            Bij Stevin.AI betaal je vanaf 1.399 per maand als wij jouw bureau zijn, en vanaf 399 als je het zelf doet of jouw agents het werk
            laat doen. Wat je precies betaalt hangt af van het werk, niet van je advertentiebudget. Dat budget betaal je rechtstreeks aan Google
            en Meta, en daar verdienen wij niets aan.
          </p>
        }
      />

      {/* ── 2. PAKKETTEN ── Het bureau donker en eerst: daar begint bijna
          iedereen (Koen, 11 okt: "in de regel zal iedereen onder managed
          starten, daar selecteren we op"). */}
      <section className="px-6 pb-20 pt-20 sm:pt-24" aria-label="Pakketten">
        <div className="mx-auto grid max-w-[1152px] gap-5 md:grid-cols-[1.15fr_1fr]">
          {PAKKETTEN.map((p, i) => {
            const donker = i === 0
            return (
              <article
                key={p.id}
                className={`flex flex-col rounded-[14px] p-7 sm:p-9 ${
                  donker ? 'bg-primary text-white' : 'border border-border bg-white text-primary'
                }`}
              >
                <p className={`m-0 font-display text-[12px] font-bold uppercase tracking-[0.12em] ${donker ? 'text-accent' : 'text-accent'}`}>
                  {p.label}
                </p>
                <h2
                  className="m-0 mt-4 text-balance font-display font-extrabold"
                  style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', letterSpacing: '-0.02em', lineHeight: '1.2' }}
                >
                  {p.wat}
                </h2>
                <p className="m-0 mt-5 font-display">
                  <span className="font-extrabold" style={{ fontSize: 'clamp(30px, 3vw, 40px)', letterSpacing: '-0.03em' }}>
                    {p.prijs}
                  </span>{' '}
                  <span className={`text-[15px] font-medium ${donker ? 'text-white/60' : 'text-muted'}`}>per maand</span>
                </p>
                <p className={`m-0 mt-2 text-[14px] leading-snug ${donker ? 'text-white/60' : 'text-muted'}`}>{p.sub}</p>
                <ul className={`m-0 mt-7 list-none space-y-3 border-t p-0 pt-6 ${donker ? 'border-white/12' : 'border-border'}`}>
                  {p.punten.map((pt) => (
                    <li key={pt} className={`flex gap-3 text-[16px] leading-[1.5] ${donker ? 'text-white/80' : 'text-[#2A3A54]'}`}>
                      <span
                        className={`mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full ${donker ? 'bg-accent' : 'bg-accent'}`}
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
        <div className="mx-auto mt-8 flex max-w-[1152px] justify-center">
          <Link
            href="/kennismaking"
            data-cta="tarieven_pakketten"
            data-open-kennismaking=""
            className="inline-flex items-center rounded-lg bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-white transition-[filter] hover:brightness-110"
          >
            Plan een kennismaking
          </Link>
        </div>
      </section>

      {/* ── 3. BUDGET ── */}
      <section className="relative overflow-hidden bg-primary px-6 text-white" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <NodeWatermerk seed={41} thema="donker" />
        <div className="relative mx-auto max-w-[1152px]">
          <h2 className="m-0 font-display font-extrabold text-white" style={{ ...h2Stijl, maxWidth: '18ch' }}>
            {BUDGET.kop}
          </h2>
          <div className="mt-8 max-w-[680px] space-y-5">
            {BUDGET.alineas.map((a, i) => (
              <p key={a} className={`m-0 text-[18px] leading-[1.6] ${i === BUDGET.alineas.length - 1 ? 'text-white' : 'text-white/75'}`}>
                {a}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MARKT ── */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 72 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 text-balance font-display font-extrabold text-primary" style={h2Stijl}>
            {MARKT.kop}
          </h2>
          <dl className="m-0 mt-8 border-t border-border">
            {MARKT.vragen.map((q) => (
              <div key={q.v} className="grid gap-1.5 border-b border-border py-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8">
                <dt className="font-display text-[17px] font-bold text-primary">{q.v}</dt>
                <dd className="m-0 text-[16px] leading-[1.55] text-[#2A3A54]">{q.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 5. VRAGEN ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 font-display font-extrabold text-primary" style={{ ...h2Stijl, fontSize: 'clamp(26px, 2.6vw, 36px)' }}>
            Vragen over de prijs
          </h2>
          <div className="mt-6 border-t border-border">
            {VRAGEN.map((q) => (
              <details key={q.v} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[17px] font-bold text-primary [&::-webkit-details-marker]:hidden">
                  {q.v}
                  <span className="shrink-0 text-[22px] font-normal text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="m-0 max-w-[680px] pb-6 text-[16px] leading-[1.6] text-[#2A3A54]">{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. KENNISMAKEN ── zelfde slot als de homepage. */}
      <section id="kennismaken" className="relative overflow-hidden scroll-mt-24 bg-primary px-6 text-white" style={{ paddingTop: 112, paddingBottom: 112 }}>
        <NodeWatermerk seed={97} thema="donker" />
        <div className="relative mx-auto max-w-[880px] text-center">
          <h2 className="m-0 font-display font-extrabold text-white" style={h2Stijl}>
            Wat zouden wij bij jou als eerste doen?
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
            Dat hoor je in een half uur. Past het niet, dan zeggen we dat ook.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              href="/kennismaking"
              data-cta="kennismaking"
              data-open-kennismaking=""
              className="inline-flex items-center rounded-lg bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-white transition-[filter] hover:brightness-110"
            >
              Plan een kennismaking
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
