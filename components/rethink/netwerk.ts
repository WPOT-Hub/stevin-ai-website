// Gedeelde data voor de nodevisual van de nieuwe homepage (W-535).
//
// Dertien nodes met een betekenis, geen sfeerstippen. Swoep zet 105 nodes
// zonder naam neer; dat oogt rijk maar zegt niets, en op mobiel lopen de
// labels door elkaar. Hier heeft elke node een naam en een zin uitleg, zodat
// de visual ook zonder animatie leesbaar is en met het toetsenbord te
// bedienen.

export type NodeId =
  | 'doelen'
  | 'doelgroepen'
  | 'google_ads'
  | 'meta'
  | 'chatgpt_ads'
  | 'website'
  | 'klantgegevens'
  | 'telefonie'
  | 'crm'
  | 'offertes'
  | 'verkoop'
  | 'markt'
  | 'brein'
  | 'advisor'

export type BronId = Exclude<NodeId, 'brein' | 'advisor'>

export type Fase = 'rust' | 'bronnen' | 'brein' | 'signaal' | 'advies'

export interface NetwerkNode<Id extends NodeId = NodeId> {
  id: Id
  label: string
  uitleg: string
}

// Volgorde = volgorde op de boog, van boven naar beneden: eerst wat je wilt,
// dan wat er gebeurt, dan wat het oplevert, en onderaan de markt.
export const BRONNEN: NetwerkNode<BronId>[] = [
  { id: 'doelen', label: 'Bedrijfsdoelen', uitleg: 'Wat je dit jaar wilt bereiken: omzet, regio, soort klant.' },
  { id: 'doelgroepen', label: 'Doelgroepen', uitleg: 'Voor wie je werkt en wat die klant belangrijk vindt.' },
  // Campagnes is gesplitst in Google Ads en Meta, zodat het brein de echte
  // logo's toont (Koen, 11 okt 20:12).
  { id: 'google_ads', label: 'Google Ads', uitleg: 'Wat je bij Google uitgeeft en wat het oplevert.' },
  { id: 'meta', label: 'Meta', uitleg: 'Wat je op Facebook en Instagram uitgeeft en wat het oplevert.' },
  // Adverteren in ChatGPT kan in Nederland sinds eind augustus 2026 (Koen,
  // 11 okt 23:04). Nagekeken op help.openai.com, "Ads Manager Availability",
  // 11 okt 2026: Netherlands staat op Available.
  { id: 'chatgpt_ads', label: 'ChatGPT Ads', uitleg: 'Wat je in ChatGPT uitgeeft en wat het oplevert.' },
  { id: 'website', label: 'Website', uitleg: 'Bezoek, formulieren en contactaanvragen.' },
  { id: 'klantgegevens', label: 'Klantgegevens', uitleg: 'Wie jouw klanten zijn en wat ze eerder kochten.' },
  { id: 'telefonie', label: 'Telefonie', uitleg: 'Telefoontjes die uit je marketing komen.' },
  { id: 'crm', label: 'CRM', uitleg: 'Wat er met een aanvraag gebeurde en wie hem oppakte.' },
  { id: 'offertes', label: 'Offertes', uitleg: 'Welke aanvragen een offerte werden, en voor welk bedrag.' },
  { id: 'verkoop', label: 'Verkoop', uitleg: 'Welke offertes een klant werden.' },
  { id: 'markt', label: 'Marktsignalen', uitleg: 'Wat er buiten speelt: weer, seizoen, feestdagen, de regio en concurrenten.' },
]

export const BREIN: NetwerkNode = {
  id: 'brein',
  label: 'Stevin-brein',
  uitleg: 'Legt de bronnen naast elkaar en naast wat je wilt bereiken.',
}

export const ADVISOR: NetwerkNode = {
  id: 'advisor',
  label: 'Advisor',
  uitleg: 'Zegt wat er aandacht vraagt en wat de volgende stap is.',
}

// Dunne verbanden tussen buren op de boog. Alleen korte lijnen: lange
// diagonalen door het netwerk maakten het eerste ontwerp onrustig.
export const DWARS: [BronId, BronId][] = [
  ['doelen', 'doelgroepen'],
  ['chatgpt_ads', 'website'],
  ['website', 'klantgegevens'],
  ['klantgegevens', 'telefonie'],
  ['telefonie', 'crm'],
  ['crm', 'offertes'],
  ['offertes', 'verkoop'],
  ['verkoop', 'markt'],
]

export interface Scenario {
  id: string
  vraag: string
  /** Bronnen die oplichten bij deze vraag. */
  bronnen: BronId[]
}

export const SCENARIO_WEEK: Scenario = {
  id: 'resultaten_week',
  vraag: 'Resultaten deze week?',
  bronnen: ['website', 'telefonie', 'crm', 'offertes', 'verkoop'],
}

// Posities op desktop: een C rond het brein, open naar rechts, waar de
// Advisor staat. Zo lees je van links naar rechts: bronnen, brein, advies.
export const VIEW_W = 640
export const VIEW_H = 440
export const MIDDEN = { x: 318, y: 220 }
export const ADVISOR_POS = { x: 560, y: 220 }
export const SIGNAAL_POS = { x: 445, y: 220 }

export function bronPositie(index: number, totaal: number) {
  const van = 100
  const tot = 260
  const hoek = ((van + ((tot - van) * index) / (totaal - 1)) * Math.PI) / 180
  return {
    x: Math.round(MIDDEN.x + 205 * Math.cos(hoek)),
    y: Math.round(MIDDEN.y - 188 * Math.sin(hoek)),
    cos: Math.cos(hoek),
    sin: Math.sin(hoek),
  }
}

// Wat we per bron meten (W-535, Koen 11 okt 21:51: "als je op de google node
// klikt moet gelijk alles wat we doormeten om die campagne succesvol te maken
// erbij komen"). Een klik op een bron laat de lijnen oplichten naar de bronnen
// in KETEN, en het kaartje toont de keten met voorbeeldcijfers.
//
// Een verzonnen installatiebedrijf rond Breda, een maand. De cijfers kloppen
// onderling:
//   - 71 aanvragen via de website (Google 38, Meta 14, ChatGPT 4, de rest 15)
//     en 52 telefoontjes (Google 24, Meta 5, ChatGPT 1, de rest 22): samen
//     123 in het CRM.
//   - 31 offertes (Google 12, Meta 4, ChatGPT 2, de rest 13), 11 getekend:
//     5 opdrachten uit een aanvraag op de website, 6 uit een telefoontje.
//     Google 4, Meta 1, ChatGPT 1, vindbaar in Google 2, bestaande klanten 3.
//   - Omzet 52.800 euro, gemiddeld 4.800 per opdracht; per bron opgeteld
//     18.400 + 3.900 + 4.200 + 8.400 + 17.900.
//   - 11 nieuwe opdrachten: 8 particulier, 3 zakelijk, 3 van eerdere klanten.
//   - Het jaar: 468.000 van 600.000 euro begin oktober, op schema.
export interface MeetStap {
  label: string
  waarde: string
  /** De stap waar het om draait (opdrachten, omzet): in accent. */
  nadruk?: boolean
}

export interface Meting {
  /** keten: stappen na elkaar, met een pijl. lijst: regels onder elkaar. */
  vorm: 'keten' | 'lijst'
  stappen: MeetStap[]
}

const EUR = (n: string) => `€ ${n}`

export const METINGEN: Partial<Record<BronId, Meting>> = {
  google_ads: {
    vorm: 'keten',
    stappen: [
      { label: 'Klikken', waarde: '1.240' },
      { label: 'Aanvragen', waarde: '38' },
      { label: 'Telefoontjes', waarde: '24' },
      { label: 'Offertes', waarde: '12' },
      { label: 'Opdrachten', waarde: '4', nadruk: true },
      { label: 'Omzet', waarde: EUR('18.400'), nadruk: true },
    ],
  },
  meta: {
    vorm: 'keten',
    stappen: [
      { label: 'Klikken', waarde: '860' },
      { label: 'Aanvragen', waarde: '14' },
      { label: 'Telefoontjes', waarde: '5' },
      { label: 'Offertes', waarde: '4' },
      { label: 'Opdrachten', waarde: '1', nadruk: true },
      { label: 'Omzet', waarde: EUR('3.900'), nadruk: true },
    ],
  },
  chatgpt_ads: {
    vorm: 'keten',
    stappen: [
      { label: 'Klikken', waarde: '210' },
      { label: 'Aanvragen', waarde: '4' },
      { label: 'Telefoontjes', waarde: '1' },
      { label: 'Offertes', waarde: '2' },
      { label: 'Opdrachten', waarde: '1', nadruk: true },
      { label: 'Omzet', waarde: EUR('4.200'), nadruk: true },
    ],
  },
  website: {
    vorm: 'keten',
    stappen: [
      { label: 'Bezoekers', waarde: '4.300' },
      { label: 'Aanvragen', waarde: '71' },
      { label: 'Opdrachten', waarde: '5', nadruk: true },
    ],
  },
  telefonie: {
    vorm: 'keten',
    stappen: [
      { label: 'Gesprekken', waarde: '52' },
      { label: 'Gemist', waarde: '9' },
      { label: 'Teruggebeld', waarde: '7' },
      { label: 'Opdrachten', waarde: '6', nadruk: true },
    ],
  },
  offertes: {
    vorm: 'keten',
    stappen: [
      { label: 'Verstuurd', waarde: '31' },
      { label: 'Getekend', waarde: '11', nadruk: true },
      { label: 'Omzet', waarde: EUR('52.800'), nadruk: true },
    ],
  },
  crm: {
    vorm: 'keten',
    stappen: [
      { label: 'Aanvragen en telefoontjes', waarde: '123' },
      { label: 'Opgevolgd binnen een werkdag', waarde: '104' },
      { label: 'Opdrachten', waarde: '11', nadruk: true },
    ],
  },
  verkoop: {
    vorm: 'lijst',
    stappen: [
      { label: 'Google Ads', waarde: EUR('18.400') },
      { label: 'Meta', waarde: EUR('3.900') },
      { label: 'ChatGPT Ads', waarde: EUR('4.200') },
      { label: 'Vindbaar in Google', waarde: EUR('8.400') },
      { label: 'Bestaande klanten', waarde: EUR('17.900') },
      { label: 'Omzet deze maand', waarde: EUR('52.800'), nadruk: true },
    ],
  },
  doelen: {
    vorm: 'lijst',
    stappen: [
      { label: 'Omzet 2026', waarde: `${EUR('468.000')} van ${EUR('600.000')}`, nadruk: true },
      { label: 'Zakelijke klanten', waarde: '19 van 26', nadruk: true },
    ],
  },
  klantgegevens: {
    vorm: 'lijst',
    stappen: [
      { label: 'Nieuwe opdrachten', waarde: '11' },
      { label: 'Was al eerder klant', waarde: '3' },
      { label: 'Gemiddelde opdracht', waarde: EUR('4.800'), nadruk: true },
    ],
  },
  doelgroepen: {
    vorm: 'lijst',
    stappen: [
      { label: 'Particulier, eigen woning', waarde: '8' },
      { label: 'Zakelijk, VvE of kantoor', waarde: '3' },
      { label: 'Binnen 40 kilometer', waarde: '10 van 11', nadruk: true },
    ],
  },
}

// Bij een klik op een bron lichten de lijnen op naar deze bronnen: waar zijn
// keten verder wordt gemeten. Marktsignalen heeft geen keten; daar hangt de
// context omheen.
export const KETEN: Partial<Record<BronId, BronId[]>> = {
  google_ads: ['website', 'telefonie', 'offertes', 'crm', 'verkoop'],
  meta: ['website', 'telefonie', 'offertes', 'crm', 'verkoop'],
  chatgpt_ads: ['website', 'telefonie', 'offertes', 'crm', 'verkoop'],
  website: ['crm', 'offertes', 'verkoop'],
  telefonie: ['crm', 'offertes', 'verkoop'],
  offertes: ['crm', 'verkoop'],
  crm: ['website', 'telefonie', 'offertes', 'verkoop'],
  verkoop: ['google_ads', 'meta', 'chatgpt_ads', 'website', 'klantgegevens'],
  doelen: ['verkoop', 'klantgegevens', 'doelgroepen'],
  klantgegevens: ['crm', 'verkoop', 'doelgroepen'],
  doelgroepen: ['klantgegevens', 'google_ads', 'meta', 'chatgpt_ads'],
}
