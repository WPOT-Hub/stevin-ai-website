import { DonkerBlok, Kennismaken, Kosten, PaginaKop, Punten, Vragen, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /social-media-uitbesteden (W-535), in de stijl van de homepage.
// Zoekterm "social media uitbesteden" (docs/zoekintentie/stevin.ai.md in
// Stevin-Hub): commerciele SERP, dienstpagina, de soort klopt. Kop, kanalen,
// kostenkop en vragen blijven, ingekort.
//
// Weg: de diagnose als verplichte eerste stap, de voor-en-natabel (zei
// hetzelfde als de herkenning) en het Desk-scherm onderaan (zwaar op mobiel).

const HERKEN = [
  {
    t: 'Je betaalt voor bereik, niet voor klanten',
    d: 'Het rapport toont vertoningen, volgers en interacties. Hoeveel aanvragen eruit kwamen staat er niet, want dat wordt niet gemeten.',
  },
  {
    t: 'Er wordt gepost omdat het moet',
    d: 'Drie posts per week volgens de kalender, zonder dat iemand kijkt welke ooit iets opleverde.',
  },
  {
    t: 'Alle kanalen tegelijk, niks goed',
    d: 'Facebook, Instagram, LinkedIn en TikTok naast elkaar, met dezelfde content en een half budget per kanaal.',
  },
  {
    t: 'Het account staat op naam van het bureau',
    d: 'Wissel je van partij, dan begin je opnieuw: geen historie, geen doelgroepen, geen leerdata.',
  },
]

const KANALEN = [
  {
    t: 'Meta: Facebook en Instagram',
    d: 'Het zwaartepunt voor de meeste Nederlandse bedrijven. Breed bereik, scherp te sturen op je boodschap.',
  },
  {
    t: 'LinkedIn',
    d: 'Voor zakelijke dienstverlening en langere trajecten. Duurder per klik, maar de juiste mensen.',
  },
  {
    t: 'TikTok',
    d: 'Werkt als je iets te laten zien hebt en video kunt blijven maken. Anders is het een dure hobby, en dan zeggen we dat.',
  },
  {
    t: 'Organisch',
    d: 'Posten zonder budget heeft zin als het bij een echt verhaal hoort. Niet als vulling voor een contentkalender.',
  },
]

const VRAGEN = [
  {
    v: 'Wat kost het om social media uit te besteden?',
    a: 'Vanaf 1.399 per maand bij jaarbetaling. Daarbovenop komt je advertentiebudget, dat je rechtstreeks aan Meta, LinkedIn of TikTok betaalt vanaf je eigen account. Wij rekenen er geen marge op. Wat je precies betaalt hangt af van het werk, niet van je budget.',
  },
  {
    v: 'Doen jullie ook Meta Ads en Facebook advertenties?',
    a: 'Ja. Meta, dus Facebook en Instagram, is voor de meeste Nederlandse bedrijven het zwaartepunt. LinkedIn en TikTok doen we waar dat past.',
  },
  {
    v: 'Is TikTok iets voor mijn bedrijf?',
    a: 'Alleen als je iets te laten zien hebt en video kunt blijven maken. TikTok vraagt veel meer nieuwe video dan Meta. Past dat niet bij je, dan zeggen we dat liever nu dan na drie maanden.',
  },
  {
    v: 'Blijven mijn social accounts van mij?',
    a: 'Ja. Bedrijfspagina en advertentieaccount staan op naam van jouw bedrijf en jij houdt beheerdersrechten. De doelgroepen en de historie blijven bij je als je stopt.',
  },
  {
    v: 'Hoe meten jullie of social iets oplevert?',
    a: 'Eerst zetten we de meting goed, zodat een aanvraag als aanvraag telt en je ziet uit welk kanaal en welke campagne hij kwam. Zonder die stap stuurt iedereen op bereik, en bereik betaalt geen rekeningen.',
  },
]

export default function RethinkSocial() {
  return (
    <main className="bg-white">
      <PaginaKop
        eyebrow="Social media uitbesteden"
        kop="Social media uitbesteden."
        accent="Met cijfers die iets betekenen."
        knop="social_kop"
        lede={
          <p className="m-0">
            Je wilt je social media uitbesteden, maar je wilt niet betalen voor bereik en likes waar geen klant achter zit. Wij zetten de
            meting goed en beheren je advertenties actief, op Facebook, Instagram, LinkedIn en TikTok. Je accounts en je data blijven van jou, en elke
            wijziging staat in een logboek.
          </p>
        }
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Waarom social vaak niets oplevert.
          </h2>
          <Punten items={HERKEN} />
          <p className={`m-0 mt-10 max-w-[640px] ${tekst}`}>
            Social kan wel werken, maar alleen als je meet wat er onderaan uitkomt in plaats van bovenaan.
          </p>
        </div>
      </section>

      <DonkerBlok seed={23} label="Welke kanalen">
        <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-white" style={h2Stijl}>
          Niet alle vier. De juiste.
        </h2>
        <p className="m-0 mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
          We kiezen de kanalen waar jouw klanten zitten en die in je cijfers iets opleveren, niet wat een pakket voorschrijft. Vaak doen
          twee kanalen goed wat vier kanalen half deden.
        </p>
        <Punten items={KANALEN} donker />
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1080px]">
          <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Het gaat ons om opdrachten, niet om klikken.
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            We meten tot omzet: van klik naar aanvraag, telefoontje, offerte, opdracht en omzet. Daarom vertellen we Meta welke aanvraag
            een opdracht werd.
          </p>
        </div>
      </section>

      <Kosten kop="Social media uitbesteden: de kosten." kanaal="Social" />

      <Vragen kop="Wat ondernemers ons vragen" vragen={VRAGEN} />

      <Kennismaken />
    </main>
  )
}
