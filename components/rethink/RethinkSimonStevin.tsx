import Image from 'next/image'
import { Clootcrans, CLOOTCRANS_VIEWBOX } from '@/components/blog/PosterWatermark'
import { StevinOntwerp, type Ontwerp } from '@/components/stevin/StevinOntwerpen'
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

const ONTWERPEN: { naam: Ontwerp; titel: string; tekst: string }[] = [
  {
    naam: 'thiende',
    titel: 'De Thiende, 1585',
    tekst: 'Rekenen met tienden, honderdsten en duizendsten, voor kooplieden, landmeters en wijnroeiers. Een komma gebruikte hij nog niet: achter elk cijfer stond een getal in een cirkeltje.',
  },
  {
    naam: 'hydrostatischeParadox',
    titel: 'De hydrostatische paradox, 1586',
    tekst: 'Hoe hard water op de bodem drukt, hangt alleen af van hoe hoog het staat. Stevin liet het zien lang voor Pascal, aan wie het meestal wordt toegeschreven.',
  },
  {
    naam: 'vestingbouw',
    titel: 'De vestingbouw, 1594',
    tekst: 'Een regelmatige zeshoek met op elke hoek een bastion, zo gelegd dat elke muur vanaf een andere te verdedigen is.',
  },
  {
    naam: 'havenvinding',
    titel: 'De havenvinding, 1599',
    tekst: 'Breedte en kompasafwijking samen wezen een plek op zee aan, zodat schepen een haven of elkaar terugvonden.',
  },
  {
    naam: 'zeilwagen',
    titel: 'De zeilwagen, rond 1600',
    tekst: "Vier wielen, twee zeilen. Met prins Maurits aan het roer van Scheveningen naar Petten in zo'n twee uur. Sneller dan een paard.",
  },
]

export default function RethinkSimonStevin({ kop, vragen }: { kop: string; vragen: Vraag[] }) {
  return (
    <main className="bg-white">
      <section className="px-6 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">De naam Stevin</p>
            <h1 className="m-0 text-balance font-display font-extrabold text-primary" style={{ ...h2Stijl, fontSize: 'clamp(34px, 4vw, 56px)' }}>
              {kop}
            </h1>
            <div className={`mt-6 max-w-[620px] space-y-5 ${tekst}`}>
              <p className="m-0">
                Het eerste idee ontstond bij mijn eigen bureau in Belgie. We kwamen klanten tegen waar drie bureaus na elkaar aan de meting hadden
                gezeten, elk met een eigen tag erbij. Wat overbleef was dubbel gemeten verkeer in GA4, en niemand die nog kon zeggen welk getal
                klopte.
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
        <div className="mt-8 max-w-[680px] space-y-5 text-[18px] leading-[1.6] text-white/75">
          <p className="m-0">
            Simon Stevin werd geboren in Brugge en maakte zijn naam in de Republiek, in Leiden en Den Haag. Zijn werk ging over kennis
            bruikbaar maken. In De Thiende uit 1585 legde hij uit hoe je met decimale breuken rekent in het dagelijks werk. Niet voor
            wiskundigen, maar voor landmeters, wijnroeiers, muntmeesters en kooplieden.
          </p>
        </div>
        <blockquote className="m-0 mt-12">
          <p className="m-0 font-display font-extrabold italic text-white" style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
            &ldquo;Wonder en is gheen wonder.&rdquo;
          </p>
          <footer className="mt-3 text-[14px] text-white/60">Simon Stevin, 1586</footer>
        </blockquote>
        <p className="m-0 mt-12 max-w-[680px] text-[18px] leading-[1.6] text-white">
          Zoals hij wetenschap bruikbaar maakte voor de praktijk, maken wij je data en systemen bruikbaar voor je dagelijkse beslissingen. Niet
          door alles te vervangen, maar door te verbinden wat er al is.
        </p>
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 lg:grid-cols-[320px_1fr]">
          <figure className="m-0 max-w-[300px]">
            <svg viewBox={CLOOTCRANS_VIEWBOX} role="img" aria-label="De clootcrans" style={{ width: '100%', height: 'auto', opacity: 0.62 }}>
              <Clootcrans kleur="var(--navy)" strook={1.5} />
            </svg>
          </figure>
          <div>
            <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
              Zichtbaar maken hoe krachten samen werken
            </h2>
            <p className={`m-0 mt-6 max-w-[620px] ${tekst}`}>
              Simon Stevin maakte zichtbaar hoe krachten samen werken. Wij maken zichtbaar hoe marketing, data en opvolging samen werken, zodat
              je weet waarop je beslist.
            </p>
            <p className="m-0 mt-6 max-w-[620px] border-t border-border pt-5 text-[14px] leading-[1.6] text-muted">
              De clootcrans, 1586. Over twee hellingen hangt een gesloten snoer van even zware bollen. Op de lange helling liggen er twee keer zo
              veel, en toch trekt die kant niet harder. Zou het snoer uit zichzelf gaan draaien, dan draaide het eeuwig door, en dat kan niet.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface px-6" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="mx-auto max-w-[1080px]">
          <p className="m-0 mb-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">Simon Stevin in de Republiek</p>
          <h2 className="m-0 font-display font-extrabold text-primary" style={h2Stijl}>
            Van Brugge naar Den Haag
          </h2>
          <p className={`m-0 mt-6 max-w-[760px] ${tekst}`}>
            In 1581 trok Stevin naar Leiden, schreef zich in aan de universiteit van Willem van Oranje en leerde diens zoon Maurits kennen. Hij
            werd zijn leraar en adviseur, zette in 1600 een opleiding voor ingenieurs op en was vanaf 1604 kwartiermeester van het Staatse
            leger. Hij stierf in 1620, waarschijnlijk in Den Haag.
          </p>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {ONTWERPEN.map((o) => (
              <div key={o.naam}>
                <figure className="m-0 max-w-[200px]" style={{ opacity: 0.62 }}>
                  <StevinOntwerp naam={o.naam} label={o.titel} kleur="var(--navy)" />
                </figure>
                <h3 className="m-0 mt-5 font-display text-[18px] font-bold text-primary">{o.titel}</h3>
                <p className="m-0 mt-2.5 text-[16px] leading-[1.55] text-[#2A3A54]">{o.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Het FAQPage-schema staat al in het entity-schema van de pagina. */}
      <Vragen kop="Veelgestelde vragen" vragen={vragen} schema={false} />

      <Kennismaken kop="Kennis die werkt." zin="Van advertentie tot aanvraag. Van meting tot besluit. Van signaal tot uitvoering." />
    </main>
  )
}
