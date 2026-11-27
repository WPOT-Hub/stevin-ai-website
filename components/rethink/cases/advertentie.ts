import type { Case } from '@/components/rethink/RethinkCase'
import { CASE as ecomy, META as ecomyMeta } from './ecomy-energie'
import { CASE as hans, META as hansMeta } from './hans-schepers'
import { CASE as sterker, META as sterkerMeta } from './sterker-witgoed'

// W-912. De advertentieversie van een klantcase (/lp/case/<case>/<zin>).
// Wie op een LinkedIn-beeld van de lokale campagne klikt (W-907), ziet de zin
// uit dat beeld terug boven de casekop, met een zin die de stap naar de case
// maakt. Zelfde opzet als /lp/marketingbureau-breda (W-860): zonder menu,
// noindex, niet in de sitemap, canonical naar de gewone casepagina.
//
// De zinnen zijn letterlijk die uit de beelden (a = richting A, de stelling op
// het donkerblauwe vlak; c = richting C, het gezegde op het blauwe vlak). De
// brug is het feit uit de introtekst van de advertentie en staat ook op de
// casepagina zelf. Verander je een beeld of een introtekst, verander dan ook
// deze regel, en andersom. Geen bewering die niet op de casepagina staat.
export type Zin = { zin: string; brug: string }

export type AdvertentieCase = {
  c: Case
  meta: { path: string; title: string; description: string }
  zinnen: Record<string, Zin>
}

export const ADVERTENTIE_CASES: Record<string, AdvertentieCase> = {
  'sterker-witgoed': {
    c: sterker,
    meta: sterkerMeta,
    zinnen: {
      a: {
        zin: 'Wat Google telt, is niet altijd wat je verkoopt.',
        brug: 'Bij Sterker Witgoed telde Google Ads in een week een kwart minder aankopen dan de winkel zelf.',
      },
      c: {
        zin: 'Google keurt zijn eigen vlees.',
        brug: 'Google rapporteert over zichzelf. Bij Sterker Witgoed kijken we elke dag wat er in de winkel besteld is.',
      },
    },
  },
  'hans-schepers': {
    c: hans,
    meta: hansMeta,
    zinnen: {
      a: {
        zin: 'Adverteer je voor wat je kunt, of voor wat je wilt?',
        brug: 'Het advertentiegeld van Hans Schepers ging naar alle klussen tegelijk. Nu naar herstofferen en reparatie.',
      },
      c: {
        zin: 'Niet alles in de spam is spam.',
        brug: 'Bij Hans Schepers Stoffering zaten 2 echte aanvragen tussen 605 spaminzendingen.',
      },
    },
  },
  'ecomy-energie': {
    c: ecomy,
    meta: ecomyMeta,
    zinnen: {
      a: {
        zin: 'Een aanvraag die je niet ziet, bel je niet.',
        brug: 'Bij Ecomy Energie verdwenen aanvragen in een volle mailbox. Nu komt elke aanvraag op de telefoon.',
      },
      c: {
        zin: 'Uit het oog, klant kwijt.',
        brug: 'Raakt een aanvraag weleens zoek in je mail? Zo pakte Ecomy Energie dat aan.',
      },
    },
  },
}

/** Alle combinaties van case en zin, voor generateStaticParams. */
export function advertentieParams(): { slug: string; zin: string }[] {
  return Object.entries(ADVERTENTIE_CASES).flatMap(([slug, a]) => Object.keys(a.zinnen).map((zin) => ({ slug, zin })))
}
