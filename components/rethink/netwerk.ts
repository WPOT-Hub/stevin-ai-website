// Gedeelde data voor de nodevisual van de nieuwe homepage (W-535).
//
// Twaalf nodes met een betekenis, geen sfeerstippen. Swoep zet 105 nodes
// zonder naam neer; dat oogt rijk maar zegt niets, en op mobiel lopen de
// labels door elkaar. Hier heeft elke node een naam en een zin uitleg, zodat
// de visual ook zonder animatie leesbaar is en met het toetsenbord te
// bedienen.

export type NodeId =
  | 'doelen'
  | 'doelgroepen'
  | 'campagnes'
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
  { id: 'campagnes', label: 'Campagnes', uitleg: 'Google, Meta, LinkedIn en de rest: wat je uitgeeft en wat het oplevert.' },
  { id: 'website', label: 'Website', uitleg: 'Bezoek, formulieren en contactaanvragen.' },
  { id: 'klantgegevens', label: 'Klantgegevens', uitleg: 'Wie je klanten zijn en wat ze eerder kochten.' },
  { id: 'telefonie', label: 'Telefonie', uitleg: 'Wie er belt, waarvandaan, en of er iemand opnam.' },
  { id: 'crm', label: 'CRM', uitleg: 'Wat er met een aanvraag gebeurde en wie hem oppakte.' },
  { id: 'offertes', label: 'Offertes', uitleg: 'Welke aanvragen een offerte werden, en voor welk bedrag.' },
  { id: 'verkoop', label: 'Verkoop', uitleg: 'Welke offertes een klant werden.' },
  { id: 'markt', label: 'Marktsignalen', uitleg: 'Zoekgedrag, seizoen, concurrenten en regelingen.' },
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
  ['campagnes', 'website'],
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
