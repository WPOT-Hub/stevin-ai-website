import { ChevronRight } from 'lucide-react'
import { DonkerBlok, Kennismaken, PaginaKop, Punten, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /platform, "Zo werkt Stevin" (W-535), in de stijl van de homepage.
// Tekst uit de oude pagina (W-042, getoetst aan draaiende code) en de lagen
// die op de homepage zijn bewaard "voor Zo werkt Stevin". Ingekort, niet
// opnieuw geschreven.
//
// Weg: het blok "En dit doet het expres niet" ("er loopt geen enkele opdracht
// van ons systeem naar Google of Meta"). Dat spreekt de homepage tegen, waar we
// agents bouwen die het werk doen. Ook weg: de scriptdemo (de homepage heeft
// er al een) en de diagnose als verplichte eerste stap.

const DRIE = [
  {
    t: 'Signalen op je eigen data',
    d: 'Elke dag gecontroleerd op afwijkingen in je advertenties, je budgetten en je meting. Je hoort het met de reden erbij, niet pas in de maandrapportage.',
  },
  {
    t: 'Zien wie er in jouw markt adverteert',
    d: 'Uit het openbare advertentieregister van Google en Meta halen we op wie er in jouw markt adverteert, en waarmee.',
  },
  {
    t: 'Een logboek dat blijft',
    d: 'Elke wijziging met naam, moment en reden. Wie hier volgend jaar begint, leest zich in.',
  },
]

// Letterlijk zoals op de homepage bewaard (LAGEN in RethinkHome.tsx).
const LAGEN = [
  { t: 'Vakkennis', d: 'Wat in marketing en verkoop werkt, en wat niet.' },
  { t: 'Je bedrijf', d: 'Wat je verkoopt, aan wie, en wat een goede klant is.' },
  { t: 'Je doelen', d: 'Wat je dit jaar wilt bereiken, en wat een gewone week hoort op te leveren.' },
  { t: 'Wat er eerder gebeurde', d: 'Resultaten van vorige maanden en jaren. Dan is een dip niet meteen paniek.' },
  { t: 'Je kanalen', d: 'Campagnes, website, zoekresultaten en telefoon.' },
  { t: 'De markt', d: 'Seizoen, zoekgedrag en wat concurrenten doen.' },
  { t: 'Afspraken', d: 'Wie wat oppakt, en of het gebeurd is.' },
]

const KETEN = ['Klikken', 'Aanvragen', 'Telefoontjes', 'Offertes', 'Opdrachten', 'Omzet']

const LADDER = [
  { t: 'Op jouw naam', d: 'De accounts staan op naam van je bedrijf. Anders kun je morgen niet wisselen, hoe goed de rest ook staat.' },
  { t: 'Meting', d: 'Een conversie is een echte aanvraag, geen klik. Telt de meting verkeerd, dan is elk cijfer erboven onbruikbaar.' },
  { t: 'Een bron', d: 'Een plek waar de cijfers samenkomen, in plaats van vier dashboards die elkaar tegenspreken.' },
  { t: 'Geheugen', d: 'Wat er geprobeerd is, waarom, en wat het opleverde. Anders betaal je twee keer voor dezelfde les.' },
  { t: 'Automatiseren', d: 'Pas hier. Wat vier keer hetzelfde gaat, kan zichzelf doen.' },
  { t: 'AI', d: 'Bovenop, niet eronder. Zonder de stappen hiervoor stuur je alleen sneller de verkeerde kant op.' },
]

const PRINCIPES = [
  {
    p: 'Groei komt vooral van nieuwe kopers, niet van loyaler maken.',
    bron: 'Ehrenberg-Bass',
    grens: 'Betekent niet dat retentie er niet toe doet.',
  },
  {
    p: 'Merk en activatie horen samen, rond 60/40.',
    bron: 'IPA Databank, Binet en Field',
    grens: 'Geen wet, maar een ijkpunt dat verschuift met categorie, groeifase en budget.',
  },
  {
    p: 'Controleer je meting voordat je iets anders beoordeelt.',
    bron: 'Kernprincipe, weegt altijd mee',
    grens: 'Betekent niet dat je zonder perfecte meting niet mag adverteren. Wel dat je je cijfers dan niet blind leest.',
  },
]

export default function RethinkPlatform() {
  return (
    <main className="bg-white">
      <PaginaKop
        eyebrow="Zo werkt Stevin"
        kop="Je ziet het vandaag."
        accent="Niet pas in de maandrapportage."
        lede={
          <p className="m-0">
            Vier weken doorbetalen op een campagne die al drie weken stukloopt. Dat is wat te laat kijken kost. Stevin ziet het dezelfde
            dag, zegt erbij waarom het uitmaakt, en legt vast wat je ermee deed.
          </p>
        }
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="m-0 font-display font-extrabold text-primary" style={{ ...h2Stijl, fontSize: 'clamp(26px, 2.6vw, 36px)' }}>
            Drie dingen. Vandaag al.
          </h2>
          <Punten items={DRIE} kolommen={3} />
        </div>
      </section>

      <DonkerBlok seed={23} label="Het brein">
        <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-white" style={h2Stijl}>
          Al je marketing en sales in één brein.
        </h2>
        <p className="m-0 mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
          Het weet wat je wilt bereiken, en zegt wat er nu moet gebeuren.
        </p>
        <Punten items={LAGEN} donker kolommen={3} />
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1080px]">
          <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Het gaat ons om opdrachten, niet om klikken.
          </h2>
          <ol className="m-0 mt-10 flex list-none flex-wrap items-center gap-x-2 gap-y-3 p-0" aria-label="Wat we meten">
            {KETEN.map((k, i) => (
              <li key={k} className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-4 py-2 font-display text-[15px] font-bold ${
                    i === KETEN.length - 1 ? 'border-accent bg-accent text-white' : 'border-border bg-surface text-primary'
                  }`}
                >
                  {k}
                </span>
                {i < KETEN.length - 1 ? <ChevronRight className="h-4 w-4 text-muted" aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
          <div className={`mt-10 max-w-[680px] space-y-5 ${tekst}`}>
            <p className="m-0">We meten door tot omzet. Daarom vertellen we Google en Meta welke aanvraag een opdracht werd.</p>
            <p className="m-0">Jij beslist over je budget. Pas als jij ja zegt, gaat het omhoog.</p>
          </div>
        </div>
      </section>

      <DonkerBlok seed={41} label="De volgorde">
        <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-white" style={h2Stijl}>
          Wat er moet kloppen voordat AI iets voor je kan betekenen.
        </h2>
        <ol className="m-0 mt-10 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {LADDER.map((s, i) => (
            <li key={s.t} className="border-t border-white/12 pt-5">
              <p className="m-0 font-display text-[13px] font-bold text-accent-light">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="m-0 mt-2 font-display text-[18px] font-bold text-white">{s.t}</h3>
              <p className="m-0 mt-2.5 text-[16px] leading-[1.55] text-white/70">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-10 max-w-[620px] text-[18px] leading-[1.6] text-white">Wij beginnen altijd onderaan, want de rest rust daarop.</p>
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1080px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Vraag maar waarom. Er ligt een bron onder.
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            Onder Stevin ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan, zoals ze in het systeem staan.
          </p>
          <dl className="m-0 mt-10 border-t border-border">
            {PRINCIPES.map((p) => (
              <div key={p.p} className="grid gap-2 border-b border-border py-6 sm:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] sm:gap-10">
                <dt>
                  <span className="block font-display text-[18px] font-bold leading-snug text-primary">{p.p}</span>
                  <span className="mt-2 block text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{p.bron}</span>
                </dt>
                <dd className="m-0 text-[16px] leading-[1.55] text-[#2A3A54]">{p.grens}</dd>
              </div>
            ))}
          </dl>
          <p className={`m-0 mt-8 max-w-[680px] ${tekst}`}>
            Werk je met STDC, See Think Do Care of 5A? Dan volgt het advies jouw fasen. Het model is van jou.
          </p>
        </div>
      </section>

      <Kennismaken />
    </main>
  )
}
