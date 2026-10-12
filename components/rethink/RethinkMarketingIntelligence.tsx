import { Link } from '@/i18n/navigation'
import { DonkerBlok, Kennismaken, PaginaKop, Punten, Vragen, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /marketing-intelligence (W-535), in de stijl van de homepage. Er
// wijzen externe links naar deze pagina: titel, H1 en URL blijven. Titel,
// metabeschrijving en H1 komen nog uit data/seo-landing-pages.ts. De
// definitie in de eerste alinea staat er letterlijk, want die beantwoordt de
// zoekvraag.
//
// Weg: "Wij veranderen niets in je accounts" (spreekt de homepage tegen, waar
// we agents bouwen die het werk doen), "Start de diagnose", "rapportage van
// dagen naar minuten", bureaus als doelgroep, en links naar pagina's die
// verdwijnen.

const PIJN = [
  {
    t: 'Een dashboard kijkt terug',
    d: 'Rapportage vertelt wat er vorige maand gebeurde. Tegen de tijd dat een dip in het maandrapport staat, heeft die al weken budget gekost.',
  },
  {
    t: 'Data leeft in losse tools',
    d: 'Ads, analytics, CRM en formulieren spreken elkaar niet. Niemand ziet het hele plaatje, dus wordt er beslist op halve informatie.',
  },
  {
    t: 'Tracking-gaten blijven onzichtbaar',
    d: 'Kapotte events en ontbrekende consent vallen pas op als de cijfers al niet meer kloppen. Dan stuur je campagnes op ruis.',
  },
]

const STAPPEN = [
  { t: 'Bronnen samen', d: 'Google Ads, GA4, Search Console, Meta, je CRM en je formulieren op een plek.' },
  { t: 'Signaleren', d: 'Stevin vergelijkt wat er gebeurt met wat er hoort te gebeuren, en meldt afwijkingen en kansen.' },
  { t: 'Prioriteren', d: 'Geen honderd meldingen, maar een korte lijst met wat er echt toe doet.' },
  { t: 'Opvolgen', d: 'Elk signaal met de reden en een voorgestelde actie. Wij, je eigen team of jouw agents voeren het uit.' },
]

const WAAR = [
  'Budgetverschuivingen zien voordat het maandrapport ze laat zien',
  'Dalende conversies herleiden naar campagne, pagina of meting',
  'Meerdere merken of vestigingen volgen zonder tien dashboards open',
  'Elke aanvraag volgen tot offerte, opdracht en omzet',
]

const VRAGEN = [
  {
    v: 'Wat is marketing intelligence?',
    a: 'Marketing intelligence is het structureel verzamelen, combineren en interpreteren van marketingdata, zodat je er beslissingen op kunt nemen. Het verschil met rapportage: intelligence kijkt vooruit en signaleert, een rapport kijkt terug en beschrijft.',
  },
  {
    v: 'Hoe verschilt dit van een dashboard of rapportagetool?',
    a: 'Een dashboard toont cijfers en laat de interpretatie aan jou. Marketing intelligence doet die interpretatie: het vergelijkt bronnen, weegt afwijkingen en maakt er een concreet advies van.',
  },
  {
    v: 'Werkt dit met consent en AVG?',
    a: 'Ja. Stevin werkt op geaggregeerde campagne- en analyticsdata en respecteert consent mode. Jouw data wordt nooit gedeeld met andere klanten.',
  },
  {
    v: 'Voor wie is marketing intelligence interessant?',
    a: 'Voor bedrijven met meer dan een kanaal of vestiging, en voor teams die sneller willen schakelen dan hun maandrapportage.',
  },
]

export default function RethinkMarketingIntelligence({ kop, accent }: { kop: string; accent: string }) {
  return (
    <main className="bg-white">
      <PaginaKop
        brein={{ herinnering: 'Hittegolf volgende week' }}
        eyebrow="Marketing intelligence"
        kop={kop}
        accent={accent}
        lede={
          <p className="m-0">
            Marketing intelligence is het samenbrengen van data uit ads, GA4, CRM en tracking in een verhaal waar je op kunt sturen. Geen
            dashboard dat vertelt wat er gebeurd is, maar signalen die zeggen wat er nu aandacht nodig heeft.
          </p>
        }
      />

      <section className="px-6 pb-24 pt-20 sm:pt-24">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Waarom dashboards alleen niet genoeg zijn
          </h2>
          <Punten items={PIJN} kolommen={3} />
        </div>
      </section>

      <DonkerBlok seed={23} label="Wat het betekent">
        <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-white" style={h2Stijl}>
          Wat marketing intelligence bij Stevin betekent
        </h2>
        <p className="m-0 mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
          Al je marketing en sales in één brein. Het weet wat je wilt bereiken, en zegt wat er nu moet gebeuren. Je data blijft van jou.
        </p>
        <Punten items={STAPPEN} donker />
        <p className="m-0 mt-10 text-[15px]">
          <Link href="/platform" className="text-white/70 underline underline-offset-4 transition-colors hover:text-white">
            Zo werkt Stevin
          </Link>
        </p>
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 32 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Waar marketing intelligence direct verschil maakt
          </h2>
          <ul className="m-0 mt-8 max-w-[760px] list-none space-y-4 border-t border-border p-0 pt-6">
            {WAAR.map((w) => (
              <li key={w} className={`flex gap-3 ${tekst}`}>
                <span className="mt-[11px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {w}
              </li>
            ))}
          </ul>
          <p className={`m-0 mt-10 max-w-[680px] ${tekst}`}>
            Geen dashboard erbij, want je hebt er al twee. Je krijgt een melding als iets afwijkt, met de reden en de bron erbij, zodat je het
            kunt nakijken.
          </p>
        </div>
      </section>

      <Vragen kop="Vragen over marketing intelligence" vragen={VRAGEN} />

      <Kennismaken />
    </main>
  )
}
