import Image from 'next/image'
import { DonkerBlok, Kennismaken, Punten, h2Stijl, tekst } from './RethinkBlokken'

// W-916 (28 nov 2026), Koen: "misschien ook even een pagina hierover aan maken,
// ik sta in het midden", "aub de andere niet teveel in de picture zetten" en
// "het is ook weer een bewijs van de kunde". Koen staat centraal, de teamgenoten
// staan een keer bij naam in het bijschrift.
//
// Bronnen, allemaal gelezen op 28 nov 2026:
// - opdracht en weging: hackathon-challenge-brief.md van de organisatie
//   (40 procent compleetheid, 40 procent tokens, 80 procent testdekking,
//   "a single well-crafted prompt will not produce a complete solution");
// - datum, regels, budget en modelprijzen: de slides "20260825 Hackathon Slides"
//   (30 dollar per team, duurste model 4,40 dollar per miljoen tokens output,
//   dus 80.000 tokens kost hooguit 0,35 dollar: "nog geen 40 dollarcent");
// - 80.000 tokens en de winnaars: de LinkedIn-post van de AiOps Community en die
//   van Remy Gankema;
// - werkwijze en Koens rol: het bouwplan van het team ("Impact Compare").
//   Bewust niet "voor de eerste prompt": het plan is pas om 16:59 afgedrukt;
// - organisatoren en jury: hun eigen sites (yoink.nl, greenpt.com, orq.ai,
//   aiopscommunity.ai) en sprekersprofielen.
// Niet gebruikt: het aantal teams (nergens openbaar) en de cijfers op het
// dashboard achter de foto (geen bron die zegt wat ze betekenen).

// Zet hier het pad naar de foto zodra hij in public/ staat. Zonder foto
// verschijnt er geen leeg vak.
const FOTO: { src: string; breed: number; hoog: number } | null = null

const AANPAK = [
  {
    t: 'Werken vanuit een bouwplan',
    d: 'Wat het programma doet, hoe het rekent, welke uitkomsten bij de voorbeelddata horen en wanneer het af is. Iedereen werkte vanuit dezelfde afspraken.',
  },
  {
    t: 'Een persoon aan het stuur',
    d: 'Een van ons gaf de opdrachten aan de AI. De andere twee testten en meldden fouten als actie, verwachte uitkomst en echte uitkomst. Zo kwamen er geen dubbele opdrachten en geen code die elkaar tegenspreekt.',
  },
  {
    t: 'AI voor het bouwen, gewone code voor het rekenen',
    d: 'Het programma zelf gebruikt geen AI. Elke uitkomst is terug te leiden tot een hoeveelheid en een emissiefactor.',
  },
  {
    t: 'Controleren op bekende uitkomsten',
    d: 'In het plan stonden de juiste uitkomsten voor de voorbeelddata. Klopte een getal niet, dan zagen we dat meteen.',
  },
]

const PARTIJEN = [
  {
    t: 'Yoink',
    d: 'Organisator. Softwarebedrijf uit Utrecht dat Java- en cloudsoftware bouwt voor middelgrote en grote bedrijven, en zijn eigen energieverbruik meet.',
  },
  {
    t: 'GreenPT',
    d: 'Europees AI-platform dat open modellen draait op groene stroom in Europese datacenters. Elk team bouwde met GreenPT.',
  },
  {
    t: 'orq.ai',
    d: 'Nederlands platform om AI-toepassingen te bouwen en te beheren. Het leverde de toegang tot de modellen.',
  },
  {
    t: 'AiOps Community',
    d: 'Gratis Nederlandstalige community voor IT-professionals die met AI werken, met meetups en coworkingdagen door het hele land.',
  },
]

export default function RethinkHackathon() {
  return (
    <main className="bg-white">
      <section className="px-6 pb-20 pt-28 sm:pt-32">
        <div className={`mx-auto grid max-w-[1152px] items-center gap-12 ${FOTO ? 'lg:grid-cols-[1fr_440px]' : ''}`}>
          <div>
            <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
              Sustainable AI Hackathon, Utrecht
            </p>
            <h1 className="m-0 max-w-[20ch] text-balance font-display font-extrabold text-primary" style={{ ...h2Stijl, fontSize: 'clamp(34px, 4vw, 56px)' }}>
              Werkende software, gebouwd met 80.000 tokens.
            </h1>
            <div className={`mt-6 max-w-[620px] flex flex-col gap-5 ${tekst}`}>
              <p className="m-0">
                Op 25 augustus 2026 won ik met mijn team de Sustainable AI Hackathon in Utrecht. De opdracht: bouw in drie en een half uur
                werkende software, met zo weinig mogelijk AI.
              </p>
              <p className="m-0">
                Wij leverden een compleet, werkend product op met 80.000 tokens. Tokens zijn de stukjes tekst waarvoor je bij AI betaalt:
                hoe minder, hoe goedkoper en zuiniger. Elk team had 30 dollar aan AI-budget. Wij gebruikten nog geen 40 dollarcent.
              </p>
            </div>
          </div>
          {FOTO ? (
            <figure className="m-0">
              <Image
                src={FOTO.src}
                alt="Koen Hoogenboom met zijn twee teamgenoten na de prijsuitreiking van de Sustainable AI Hackathon"
                width={FOTO.breed}
                height={FOTO.hoog}
                sizes="(min-width: 1024px) 440px, 100vw"
                className="block h-auto w-full rounded-[14px] border border-border"
                priority
              />
              <figcaption className="mt-3 text-[13px] text-muted">Met teamgenoten Jurre Machielsen en Remy Gankema, na de prijsuitreiking.</figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 font-display font-extrabold text-primary" style={h2Stijl}>
            De opdracht
          </h2>
          <div className={`mt-6 max-w-[680px] flex flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Bouw een programma dat de milieu-impact van twee producten naast elkaar zet, bijvoorbeeld water in een glazen fles tegenover
              water in PET. Op drie punten: CO2, vervuiling van zoet water en waterverbruik. Het moest lokaal draaien, alles bewaren,
              overal bewerkbaar zijn, met tests voor ongeveer 80 procent van de code.
            </p>
            <p className="m-0">
              De jury woog compleetheid en tokenverbruik elk voor 40 procent. Elk team begon met een leeg project en bouwde met dezelfde AI.
              Een slimme prompt was niet genoeg: de opdracht was zo gekozen dat je het vak moest begrijpen en zelf keuzes moest maken.
            </p>
          </div>
        </div>
      </section>

      <DonkerBlok seed={31} label="Hoe we het aanpakten">
        <h2 className="m-0 font-display font-extrabold text-white" style={h2Stijl}>
          Hoe we het aanpakten
        </h2>
        <Punten items={AANPAK} donker />
        <p className="m-0 mt-12 max-w-[680px] text-[18px] leading-[1.6] text-white">
          Mijn rol: bewaken wat er wel en niet in kwam, het scherm beoordelen, met de hand testen, het tokenverbruik bijhouden en de demo geven.
        </p>
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 96, paddingBottom: 24 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 font-display font-extrabold text-primary" style={h2Stijl}>
            Zo werken we ook voor jou
          </h2>
          <div className={`mt-6 max-w-[680px] flex flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Minder AI is geen doel op zich. Het gaat erom dat je weet waar AI iets toevoegt en waar gewone code beter past.
            </p>
            <p className="m-0">
              Bij Stevin.AI leggen we eerst vast wat goed is, daarna bouwen we, en elke uitkomst moet je kunnen nalopen. Dat deden we op
              die dag in Utrecht, en dat doen we voor je marketing.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 font-display text-[22px] font-bold text-primary">Wie er achter de dag stonden</h2>
          <Punten items={PARTIJEN} />
          <p className={`m-0 mt-10 max-w-[680px] ${tekst}`}>
            De jury: Bert Jan Schrijver (OpenValue), Tim van Bergenhenegouwen (GreenPT) en Bauke Brenninkmeijer (orq.ai).
          </p>
        </div>
      </section>

      <Kennismaken />
    </main>
  )
}
