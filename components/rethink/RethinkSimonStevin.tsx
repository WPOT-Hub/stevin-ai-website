import Image from 'next/image'
import { DonkerBlok, Kennismaken, Vragen, h2Stijl, tekst, type Vraag } from './RethinkBlokken'

// De nieuwe /simon-stevin (W-535), in de stijl van de homepage. Tekst uit de
// oude pagina, ingekort; titel, metabeschrijving, H1 en het entity-schema
// blijven in app/[locale]/simon-stevin/page.tsx.
//
// Weg: het voorbeeld met weer en schoolvakanties ("elke nacht haalt Stevin
// op"): volgens de Hub-audit van 10 okt ziet Stevin dat nog niet zelf. Ook
// weg: "Stevin stuurt niets naar buiten zonder dat een mens het zag" (spreekt
// de agents op de homepage tegen), de alinea over andere vakgebieden en
// "Start de diagnose".
//
// W-569, 17 okt 2026, na Koen ("wees kritisch, wat voegt dit allemaal toe?",
// "misschien de logica achter Simon Stevin even beter uitleggen?", "die
// clootcrans is misschien niet zo relevant en te sturend"): de clootcrans en de
// vijf ontwerpen met tekeningen eruit. De tekeningen staan nog in
// components/stevin/StevinOntwerpen.tsx en PosterWatermark.tsx, voor
// watermerken. De naamgever wordt nu uitgelegd met drie echte verbanden in
// plaats van "hij maakte wetenschap bruikbaar, wij data": dezelfde route
// (Brugge naar het noorden), schrijven voor wie het werk doet (Nederlands in
// plaats van Latijn, De Thiende voor kooplieden en landmeters) en zijn motto.
// Bronnen: DBNL (stev001begh01, Beghinselen der weeghconst 1586, motto onder de
// clootcrans) en Kool 1992 over zijn rekenkundige termen (niet beweren dat hij
// woorden als wiskunde zelf bedacht: dat is omstreden).

export default function RethinkSimonStevin({ kop, vragen }: { kop: string; vragen: Vraag[] }) {
  return (
    <main className="bg-white">
      <section className="px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-[1152px] items-center gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">De naam Stevin</p>
            <h1 className="m-0 text-balance font-display font-extrabold text-primary" style={{ ...h2Stijl, fontSize: 'clamp(34px, 4vw, 56px)' }}>
              {kop}
            </h1>
            <div className={`mt-6 max-w-[620px] space-y-5 ${tekst}`}>
              <p className="m-0">
                Het eerste idee ontstond bij mijn eigen bureau in Belgie.
              </p>
              <p className="m-0">
                Alles was er al: campagnedata, CRM, agenda, offertes. Wat ontbrak was een laag eroverheen die het aan elkaar knoopte en op tijd
                iets zei. Wat begon als een interne oplossing, werd vanuit Breda uitgebouwd tot Stevin.
              </p>
            </div>
          </div>
          <figure className="m-0 max-w-[320px]">
            <Image
              src="/simon-stevin-lineart.png"
              alt="Portret van Simon Stevin"
              width={320}
              height={427}
              sizes="320px"
              className="block h-auto w-full rounded-[14px] border border-border"
              style={{ filter: 'grayscale(1) contrast(1.02)' }}
            />
            <figcaption className="mt-3 text-[13px] text-muted">Simon Stevin, 1548 tot 1620, wetenschapper uit de Lage Landen.</figcaption>
          </figure>
        </div>
      </section>

      <DonkerBlok seed={23} label="Vernoemd naar Simon Stevin">
        <h2 className="m-0 font-display font-extrabold text-white" style={h2Stijl}>
          Vernoemd naar Simon Stevin
        </h2>
        <div className="mt-8 flex max-w-[680px] flex-col gap-5 text-[18px] leading-[1.6] text-white/75">
          <p className="m-0">
            Simon Stevin werd in 1548 geboren in Brugge. Zijn naam maakte hij in het noorden, in Leiden en Den Haag, als leraar en adviseur
            van prins Maurits. Dezelfde route als dit bedrijf, ruim vier eeuwen eerder.
          </p>
          <h3 className="m-0 pt-4 font-display text-[22px] font-bold text-white">Hij schreef voor wie het werk deed</h3>
          <p className="m-0">
            Geleerden schreven in het Latijn. Stevin schreef bewust in het Nederlands, zodat ook wie geen Latijn kende hem kon volgen. De
            Thiende, zijn boekje over rekenen met tienden, was niet voor wiskundigen bedoeld maar voor kooplieden, landmeters en wijnroeiers.
          </p>
          <p className="m-0 text-white">
            Zo werkt Stevin ook. Geen dashboard voor een analist, maar in gewone woorden wat er in je marketing speelt en wat je eraan kunt
            doen.
          </p>
        </div>
        <blockquote className="m-0 mt-12">
          <p className="m-0 font-display font-extrabold italic text-white" style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
            &ldquo;Wonder en is gheen wonder.&rdquo;
          </p>
          <footer className="mt-3 text-[14px] text-white/60">Simon Stevin, 1586</footer>
        </blockquote>
        <div className="mt-8 flex max-w-[680px] flex-col gap-5 text-[18px] leading-[1.6] text-white/75">
          <p className="m-0">
            Zijn motto: wat een wonder lijkt, is geen wonder, want je kunt het verklaren.
          </p>
          <p className="m-0 text-white">
            Dat geldt ook voor je marketing. Komen er ineens minder aanvragen binnen, of kost een klik opeens het dubbele, dan heeft dat een
            oorzaak. Die staat meestal ergens in je cijfers. Stevin zoekt hem op.
          </p>
        </div>
      </DonkerBlok>

      {/* Het FAQPage-schema staat al in het entity-schema van de pagina. */}
      <Vragen kop="Veelgestelde vragen" vragen={vragen} schema={false} />

      <Kennismaken kop="Kennis die werkt." zin="Van advertentie tot aanvraag. Van meting tot besluit. Van signaal tot uitvoering." />
    </main>
  )
}
