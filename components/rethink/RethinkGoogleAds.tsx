import { DonkerBlok, Kennismaken, Kosten, PaginaKop, Punten, Vragen, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /google-ads-uitbesteden (W-535), in de stijl van de homepage.
// Zoekterm "ads uitbesteden" (docs/zoekintentie/stevin.ai.md in Stevin-Hub):
// commerciele SERP, dienstpagina, de soort klopt. Daarom blijven de kop, de
// kostenkop en de vragen die de zoekvraag beantwoorden staan, ingekort.
//
// Weg: de diagnose als verplichte eerste stap en "Start de diagnose", de
// voor-en-natabel (zei hetzelfde als de herkenning), "dag en nacht" (niet
// waar te maken) en het Desk-scherm onderaan (zwaar op mobiel).

const HERKEN = [
  {
    t: 'Je account staat niet op jouw naam',
    d: 'Het bureau maakte het aan, dus het is van hen. Stop je, dan begin je opnieuw: geen historie, geen leerdata, geen campagnes.',
  },
  {
    t: 'Je krijgt cijfers, geen antwoord',
    d: 'Een rapport vol vertoningen en klikken. Hoeveel aanvragen er echt bij kwamen, weet niemand precies.',
  },
  {
    t: 'Je weet niet wat er gedaan is',
    d: 'De factuur komt elke maand. Wat er die maand in je account veranderd is, staat nergens.',
  },
  {
    t: 'Er zit een marge op je mediabudget',
    d: 'Je betaalt 2.000 euro aan advertenties, maar hoeveel daarvan bij Google aankomt, kun je niet zien.',
  },
]

const STAPPEN = [
  {
    t: 'Eerst zetten we alles goed',
    d: 'Accounts op naam van jouw bedrijf, meting die elke aanvraag telt, de koppeling met je CRM, en opgeruimde campagnes. Dit gebeurt voordat er een euro extra naar advertenties gaat.',
  },
  {
    t: 'Daarna beheren we actief',
    d: "Zoektermen, biedingen, advertenties en landingspagina's. We sturen op aanvragen en omzet, niet op klikken. Valt je meting uit, dan zien we dat dezelfde dag.",
  },
  {
    t: 'Alles blijft van jou',
    d: 'Je accounts, je data en een dossier met elk besluit en de reden erbij. Stop je, dan neem je alles mee.',
  },
]

const VRAGEN = [
  {
    v: 'Wat kost het om Google Ads uit te besteden?',
    a: 'Vanaf 1.399 per maand bij jaarbetaling. Daarbovenop komt je advertentiebudget, dat je rechtstreeks aan Google betaalt vanaf je eigen account. Wij rekenen er geen marge op. Wat je precies betaalt hangt af van het werk, niet van je budget.',
  },
  {
    v: 'Blijft mijn Google Ads-account van mij?',
    a: 'Ja. Het account staat op naam van jouw bedrijf en jij houdt beheerdersrechten. Stop je, dan neem je de historie en de leerdata mee. Vraag dit bij elke partij na en laat het op papier zetten.',
  },
  {
    v: 'Hoe weet ik of mijn huidige bureau het goed doet?',
    a: 'Kijk in de wijzigingsgeschiedenis van je account wat er de afgelopen 90 dagen is gedaan. Zoek je bedrijf op in het openbare transparantieregister van Google en kijk wie er als betaler staat. En leg je aanvragen van vorige maand naast je dashboard.',
  },
  {
    v: 'Doen jullie ook SEA, Shopping en Microsoft Ads?',
    a: 'Ja. Google Ads is meestal het zwaartepunt, maar Shopping, YouTube, Microsoft Ads en de sociale kanalen horen bij hetzelfde werk.',
  },
  {
    v: 'Hoe snel gaat het van start?',
    a: 'Eerst zetten we het fundament goed, daarna gaat er extra budget naar campagnes. Hoe lang dat duurt hangt af van wat er te repareren valt. Dat hoor je in de kennismaking.',
  },
  {
    v: 'Verlies ik controle als AI meekijkt?',
    a: 'Nee. Jij beslist over je budget, en alles wat er gebeurt staat in een logboek waar je altijd in kunt kijken.',
  },
]

export default function RethinkGoogleAds() {
  return (
    <main className="bg-white">
      <PaginaKop
        brein="google_ads"
        eyebrow="Google Ads uitbesteden"
        kop="Google Ads uitbesteden."
        accent="Zonder de controle kwijt te raken."
        knop="google_ads_kop"
        lede={
          <p className="m-0">
            Je wilt je Google Ads uitbesteden, maar je kent de verhalen: accounts op naam van het bureau, rapporten die niets zeggen en een
            factuur die je niet kunt narekenen. Bij Stevin.AI blijven je accounts op naam van je eigen bedrijf, en staat elke wijziging met
            datum en reden in een logboek. Het werk is van ons, alles blijft van jou.
          </p>
        }
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Waarom uitbesteden vaak verkeerd voelt.
          </h2>
          <Punten items={HERKEN} />
          <p className={`m-0 mt-10 max-w-[620px] ${tekst}`}>Dit zijn geen uitzonderingen. Zo werkt de markt, zolang niemand meekijkt.</p>
        </div>
      </section>

      <DonkerBlok seed={23} label="Hoe wij het doen">
        <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-white" style={h2Stijl}>
          Eerst goed zetten, dan pas beheren.
        </h2>
        <Punten items={STAPPEN} donker kolommen={3} />
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1080px]">
          <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Het gaat ons om opdrachten, niet om klikken.
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            We meten tot omzet: van klik naar aanvraag, telefoontje, offerte, opdracht en omzet. Daarom vertellen we Google welke aanvraag
            een opdracht werd.
          </p>
        </div>
      </section>

      <Kosten kop="Google Ads en SEA uitbesteden: de kosten." kanaal="Google Ads" />

      <Vragen kop="Wat ondernemers ons vragen" vragen={VRAGEN} />

      <Kennismaken />
    </main>
  )
}
