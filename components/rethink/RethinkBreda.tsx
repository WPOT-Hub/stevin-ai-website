import { Link } from '@/i18n/navigation'
import { DonkerBlok, Kennismaken, PaginaKop, Punten, Vragen, h2Stijl, tekst } from './RethinkBlokken'

// /marketingbureau-breda (W-860). Gemeten vraag (Keyword Planner, NL, 19 nov
// 2026): online marketing bureau breda 210, marketingbureau breda 170, website
// laten maken breda 170, seo bureau breda 50 per maand. Tot deze pagina stond
// het woord Breda op geen enkele commerciele pagina van de site.
//
// Positionering van Koen, 19 nov: "het bureau van Breda dat echt meedenkt in
// de hele flow", met koppelingen, automatiseringen en AI. De onderwerpen in
// HERKEN komen uit klantgesprekken van 12 tot 18 nov. De voorbeelden in FLOW
// zijn werk dat in de klantdossiers staat; namen staan er pas bij na akkoord
// van de klant.
//
// Niet nagekeken: de echte SERP voor "marketingbureau breda" (Google gaf een
// captcha, 19 nov). Het paginatype is dus een aanname tot die gelezen is.

const HERKEN = [
  {
    t: 'Je krijgt aanvragen, maar niet de goede',
    d: 'Het formulier loopt vol en de helft is spam of iemand die alleen een prijs wil weten. Google weet dat niet, en zoekt er meer van.',
  },
  {
    t: 'Je zit vol met werk',
    d: 'Dan wil je geen twintig aanvragen extra. Je wilt de vijf waar je het meest aan verdient, en de rest niet.',
  },
  {
    t: 'Elk systeem weet iets anders',
    d: 'De advertenties tellen een verkoop, de webshop telt er twee en de boekhouding ziet er anderhalf. Niemand weet welk getal klopt.',
  },
  {
    t: 'Je wilt een nieuwe site, maar je vindbaarheid niet kwijt',
    d: 'Een nieuwe site met standaardteksten van de bouwer kost je de plekken in Google die je nu hebt. Dat hoeft niet, als je vooraf vastlegt wat moet blijven.',
  },
]

const FLOW = [
  {
    t: 'Gevonden worden',
    d: 'Google Ads, social, Google zelf en steeds vaker ChatGPT. We kiezen waar jouw klanten zoeken en laten de rest liggen.',
  },
  {
    t: 'De aanvraag',
    d: 'Formulier, telefoon en WhatsApp komen op een plek binnen, met erbij uit welke advertentie de aanvraag kwam. Spam gaat eruit voordat jij hem ziet.',
  },
  {
    t: 'De opvolging',
    d: 'Wie niet binnen een dag antwoord krijgt, belt een ander. We regelen dat een aanvraag vanzelf bij de juiste persoon komt en dat er een herinnering volgt als niemand reageert.',
  },
  {
    t: 'De opdracht',
    d: 'Werd het een klant, en voor hoeveel? Dat koppelen we terug aan Google en Meta, zodat ze zoeken naar mensen die kopen in plaats van mensen die klikken.',
  },
  {
    t: 'De cijfers',
    d: 'Een overzicht dat rekent met betaalde orders en echte opdrachten. Niet met wat een advertentieplatform over zichzelf zegt.',
  },
  {
    t: 'Het saaie werk',
    d: 'Overtypen, doorsturen, lijstjes bijhouden. Waar een koppeling of AI dat betrouwbaar kan overnemen, bouwen we die. Waar het niet kan, zeggen we dat.',
  },
]

const VOORBEELDEN = [
  {
    t: 'Een meubelstoffeerder',
    d: 'De site stond live, maar Google Analytics telde nul bezoeken en het formulier meldde geen enkele aanvraag. Na het herstel kwamen er in oktober 11 offerteaanvragen binnen. Een op de drie wordt een opdracht van gemiddeld 1.000 euro. Dat is naar verwachting ruim 8 euro omzet op elke euro aan advertenties.',
  },
  {
    t: 'Een webwinkel in witgoed',
    d: 'Google Ads telde op een dag 5 aankopen, de winkel 10 betaalde orders. Wie op het eerste getal stuurt, zet campagnes uit die geld opleveren. De rapportage rekent nu met de orders uit de winkel.',
  },
]

const VRAGEN = [
  {
    v: 'Zitten jullie echt in Breda?',
    a: 'Ja. Ons kantoor staat aan de Claudius Prinsenlaan 12 in Breda. We werken voor ondernemers in Breda en de rest van West-Brabant, en ook daarbuiten. Kennismaken kan op kantoor, bij jou of in een videogesprek.',
  },
  {
    v: 'Wat doet een marketingbureau dat ook koppelt en automatiseert?',
    a: 'Hetzelfde als een ander bureau, plus wat erna komt. We beheren je advertenties en je vindbaarheid, en we zorgen dat een aanvraag goed binnenkomt, wordt opgevolgd en als opdracht terug te zien is in je cijfers. Daarvoor koppelen we je site, je formulier, je CRM of webshop en je advertentieaccounts aan elkaar.',
  },
  {
    v: 'Is AI iets voor een bedrijf als het mijne?',
    a: 'Soms. AI is handig voor werk dat vaak terugkomt en waar een fout niet duur is: aanvragen sorteren, spam eruit halen, een eerste antwoord klaarzetten, cijfers naast elkaar leggen. Voor een offerte of een klantgesprek blijf jij nodig. We beginnen bij wat jou tijd kost, niet bij de techniek.',
  },
  {
    v: 'Van wie zijn de accounts en de data, en zit ik ergens aan vast?',
    a: 'Van jou. Advertentieaccounts, Analytics en de koppelingen staan op naam van jouw bedrijf en jij houdt beheerdersrechten. Stoppen kan altijd, en dan neem je alles mee.',
  },
  {
    v: 'Wat kost het?',
    a: 'Dat hangt af van het werk, niet van je advertentiebudget. De vaste prijzen staan op de pagina Tarieven. Los werk rekenen we per uur en spreken we vooraf af.',
  },
]

export default function RethinkBreda() {
  return (
    <main className="bg-white">
      <PaginaKop
        brein="alles"
        eyebrow="Marketingbureau Breda"
        kop="Marketingbureau in Breda."
        accent="Dat meedenkt van klik tot opdracht."
        knop="breda_kop"
        lede={
          <p className="m-0">
            Je zoekt een bureau voor online marketing in Breda dat meer doet dan advertenties aanzetten. Wij kijken naar de hele weg: hoe iemand je
            vindt, hoe de aanvraag binnenkomt, wie hem opvolgt en of het een opdracht werd. Waar het hapert, koppelen of automatiseren
            we het. Je advertenties en je data zijn van jou, en stoppen kan altijd.
          </p>
        }
      />

      <section className="px-6 pb-24 pt-20 sm:pt-24">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Wat ondernemers in Breda ons vertellen.
          </h2>
          <Punten items={HERKEN} />
          <p className={`m-0 mt-10 max-w-[640px] ${tekst}`}>
            Geen van deze vier los je op met meer advertentiebudget. Het zit in wat er na de klik gebeurt.
          </p>
        </div>
      </section>

      <DonkerBlok seed={31} label="De hele weg">
        <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-white" style={h2Stijl}>
          Van gevonden worden tot betaald krijgen.
        </h2>
        <p className="m-0 mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
          De meeste bureaus stoppen bij de aanvraag. Daar begint voor jou het werk pas. Wij denken mee over elke stap en maken het je
          makkelijker met de juiste koppelingen, automatiseringen en AI.
        </p>
        <Punten items={FLOW} donker kolommen={3} />
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[22ch] font-display font-extrabold text-primary" style={h2Stijl}>
            AI is een verzamelnaam geworden. Dit is wat we echt doen.
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            Veel van ons werk is geen AI. Het is systemen koppelen, handwerk automatiseren en al je klant- en verkoopcijfers op een
            plek zetten, zodat je ziet wat een advertentie heeft opgeleverd.
          </p>
          <p className={`m-0 mt-5 max-w-[680px] ${tekst}`}>
            AI zonder verstand van marketing levert een site op die live staat en niets telt. Daar gaat dan elke maand
            advertentiebudget naartoe, zonder dat iemand weet wat het oplevert. Dat zijn we letterlijk zo tegengekomen.
          </p>
          <p className={`m-0 mt-5 max-w-[680px] ${tekst}`}>
            Koen Hoogenboom, oprichter, zit twintig jaar in online marketing en werkte onder meer voor Etex, Hyundai, Cirque du
            Soleil, Goossens Wonen &amp; Slapen, JBL en Leen Bakker. &ldquo;Daar bouwde ik dit voor grote bedrijven. Die betaalden
            er tienduizenden euro&apos;s per jaar voor, en dan had je de uren van de consultants en de kosten van de invoering nog niet.
            AI heeft het bouwen zo veel goedkoper gemaakt dat het nu ook voor een gewone ondernemer kan.&rdquo;
          </p>
          <p className={`m-0 mt-5 max-w-[680px] ${tekst}`}>
            Stevin.AI is vanaf de eerste dag rond AI gebouwd. We zijn geen bureau dat AI erbij is gaan doen en nu merkt dat
            het echt anders moet. We hebben geen ambitie om het grootste bureau te worden. Wel om het beste werk te leveren. Je werkt bij ons met de
            mensen die het zelf bouwen, niet met een accountmanager die het doorgeeft.
          </p>
        </div>
      </section>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Twee voorbeelden uit ons werk.
          </h2>
          <Punten items={VOORBEELDEN} />
          <p className={`m-0 mt-10 max-w-[680px] ${tekst}`}>
            Wil je alleen je advertenties uitbesteden? Dat kan ook. Lees verder over{' '}
            <Link href="/google-ads-uitbesteden" className="font-semibold text-accent underline-offset-4 hover:underline">
              Google Ads uitbesteden
            </Link>
            ,{' '}
            <Link href="/social-media-uitbesteden" className="font-semibold text-accent underline-offset-4 hover:underline">
              social media uitbesteden
            </Link>{' '}
            of{' '}
            <Link href="/leadopvolging" className="font-semibold text-accent underline-offset-4 hover:underline">
              leadopvolging
            </Link>
            . De prijzen staan op{' '}
            <Link href="/tarieven" className="font-semibold text-accent underline-offset-4 hover:underline">
              Tarieven
            </Link>
            .
          </p>
        </div>
      </section>

      <Vragen kop="Wat ondernemers uit Breda ons vragen" vragen={VRAGEN} />

      <Kennismaken
        kop="Geloof je ons niet? Prima."
        zin="Er lopen veel cowboys rond in deze markt, ook cowboys die zeggen dat ze het niet zijn. Wij laten je de cijfers zien. Plan een gesprek, en bel daarna gerust een van onze klanten. Die staan je graag te woord."
      />
    </main>
  )
}
