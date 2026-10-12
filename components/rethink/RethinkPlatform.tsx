import { ChevronRight } from 'lucide-react'
import { DonkerBlok, Kennismaken, PaginaKop, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /platform, "Zo werkt Stevin" (W-535), in de stijl van de homepage.
// Tekst uit de oude pagina (W-042, getoetst aan draaiende code) en de lagen
// die op de homepage zijn bewaard "voor Zo werkt Stevin". Ingekort, niet
// opnieuw geschreven.
//
// Weg: het blok "En dit doet het expres niet" ("er loopt geen enkele opdracht
// van ons systeem naar Google of Meta"). Dat spreekt de homepage tegen, waar we
// agents bouwen die het werk doen. Ook weg: de scriptdemo (de homepage heeft
// er al een) en de diagnose als verplichte eerste stap. 12 okt (Koen: "zeggen
// we niet veel te veel hier weer?"): ook de drie punten, de zeven lagen (staan
// in het brein) en de principes eraf.



const KETEN = ['Klikken', 'Aanvragen', 'Telefoontjes', 'Offertes', 'Opdrachten', 'Omzet']

const LADDER = [
  { t: 'Op jouw naam', d: 'Je accounts staan op naam van je bedrijf.' },
  { t: 'Meting', d: 'Een conversie is een echte aanvraag, geen klik.' },
  { t: 'Een bron', d: 'Alle cijfers op een plek.' },
  { t: 'Geheugen', d: 'Wat werkte en wat niet, blijft bewaard.' },
  { t: 'Automatiseren', d: 'Wat vaak hetzelfde gaat, doet zichzelf.' },
  { t: 'AI', d: 'Pas bovenop, niet eronder.' },
]


export default function RethinkPlatform() {
  return (
    <main className="bg-white">
      <PaginaKop
        brein="alles"
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

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
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
              <p className="m-0 font-display text-[13px] font-bold text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="m-0 mt-2 font-display text-[18px] font-bold text-white">{s.t}</h3>
              <p className="m-0 mt-2.5 text-[16px] leading-[1.55] text-white/70">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-10 max-w-[620px] text-[18px] leading-[1.6] text-white">Wij beginnen altijd onderaan, want de rest rust daarop.</p>
      </DonkerBlok>

      <Kennismaken />
    </main>
  )
}
