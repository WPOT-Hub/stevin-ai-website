import { Link } from '@/i18n/navigation'
import { DonkerBlok, Kennismaken, PaginaKop, Punten, Vragen, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /leadopvolging (W-535), in de stijl van de homepage. Tekst uit
// data/seo-landing-pages.ts (slug leadopvolging), ingekort. Titel,
// metabeschrijving en H1 komen daar nog steeds vandaan en zijn ongewijzigd.
//
// Zoekterm "leadopvolging uitbesteden" (docs/zoekintentie/stevin.ai.md in
// Stevin-Hub): commerciele SERP, de soort klopt, maar we staan op plaats 82.
// Daarom staat de prijs er nu bij, zoals bij de concurrenten bovenaan.
//
// Weg: "Start de diagnose", alerts via Slack, de lijst met CRM-merken die we
// niet allemaal koppelen, en de links naar pagina's die verdwijnen.

const PIJN = [
  {
    t: 'Gemiste leads',
    d: 'Een formulier landt in een mailbox, een gemiste call blijft een gemiste call. Zonder centrale plek weet niemand dat er iets binnenkwam.',
  },
  {
    t: 'Te late opvolging',
    d: 'De kans op contact daalt hard na het eerste uur. Wie vrijdag een aanvraag doet en maandag wordt gebeld, is vaak al ergens anders klant.',
  },
  {
    t: 'Geen zicht op status',
    d: 'Is deze aanvraag al opgepakt? Door wie? Zonder overzicht hangt opvolging af van geheugen en goede wil.',
  },
]

const ROUTE = [
  { t: 'Lead binnen', d: 'Formulieren, telefoontjes en campagneleads op een plek, met bron, pagina en campagne erbij.' },
  { t: 'Aangevuld', d: 'Bedrijf, kanaal en vraag erbij, zodat je team weet wie er belt of mailt, en waarom.' },
  { t: 'Doorgestuurd', d: 'Naar de juiste persoon, vestiging of pijplijn in je CRM.' },
  { t: 'Opvolging bewaakt', d: 'Staat een lead te lang op nieuw, dan krijgt je team een seintje. Niets valt stil tussen systemen.' },
]

const VRAGEN = [
  {
    v: 'Wat kost leadopvolging uitbesteden?',
    a: 'Als wij jouw bureau zijn, hoort leadopvolging bij het werk, vanaf 1.399 per maand. Doe je het zelf of laat je jouw agents het werk doen, dan is het vanaf 399 per maand. Wat je precies betaalt hangt af van het werk.',
  },
  {
    v: 'Hoe snel wordt een lead doorgestuurd?',
    a: 'Direct. Zodra een formulier binnenkomt of een telefoontje wordt geregistreerd, krijgt de juiste persoon een melding en staat de lead in je CRM of leadlijst.',
  },
  {
    v: 'Werkt dit met mijn CRM?',
    a: 'Heb je een CRM, dan koppelen we. Heb je er geen, dan begint het met een simpele leadlijst die van jou is. Geen nieuw systeem om te leren.',
  },
  {
    v: 'Kan leadopvolging per team of vestiging worden ingericht?',
    a: 'Ja. Leads gaan per regio, dienst of campagne naar de juiste plek, zodat elke vestiging of elk team alleen de eigen leads ziet en opvolgt.',
  },
  {
    v: 'Wat gebeurt er met leads buiten kantooruren?',
    a: 'Die worden gewoon geregistreerd en doorgestuurd. Je team ziet de volgende ochtend precies wat er binnenkwam en wat voorgaat.',
  },
]

export default function RethinkLeadopvolging({ kop, accent }: { kop: string; accent: string }) {
  return (
    <main className="bg-white">
      <PaginaKop
        brein="crm"
        eyebrow="Leadopvolging"
        kop={kop}
        accent={accent}
        knop="leadopvolging_kop"
        lede={
          <p className="m-0">
            Wie zijn leadopvolging wil automatiseren, wil twee dingen: sneller reageren en niets missen. Wij brengen formulieren, telefoontjes
            en aanvragen uit al je bronnen samen en zorgen dat elke lead bij de juiste persoon of in je CRM landt.
          </p>
        }
      />

      <section className="px-6 pb-24 pt-20 sm:pt-24">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Waar leads nu verdwijnen
          </h2>
          <Punten items={PIJN} kolommen={3} />
        </div>
      </section>

      <DonkerBlok seed={23} label="De route">
        <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-white" style={h2Stijl}>
          Zo automatiseer je leadopvolging
        </h2>
        <p className="m-0 mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
          Elke lead volgt dezelfde route: binnenkomen, aanvullen, doorsturen, opvolgen. Blijft een stap hangen, dan zie je dat.
        </p>
        <Punten items={ROUTE} donker />
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 32 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Het gaat ons om opdrachten, niet om klikken.
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            We volgen elke aanvraag tot offerte, opdracht en omzet. Daarom vertellen we Google en Meta welke aanvraag een opdracht werd. Zo
            weet je welke campagne klanten oplevert, en niet alleen klikken.
          </p>
          <p className="m-0 mt-6 text-[15px]">
            <Link
              href="/marketing-intelligence"
              className="text-accent underline underline-offset-4 transition-colors hover:text-accent-dark"
            >
              Meer over marketing intelligence
            </Link>
          </p>
        </div>
      </section>

      <Vragen kop="Vragen over leadopvolging" vragen={VRAGEN} />

      <Kennismaken />
    </main>
  )
}
