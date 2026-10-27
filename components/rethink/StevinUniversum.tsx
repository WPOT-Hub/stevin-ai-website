'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { BronId, Meting } from './netwerk'
import { BRONNEN, BREIN, ADVISOR, KETEN, METINGEN } from './netwerk'

/**
 * Het Stevin-brein in 3D (W-535, richting C).
 *
 * Aanleiding: Koen, 10 okt 23:00, "geen wow factor". Nagekeken hoe swoep.ai
 * het doet: geen bibliotheek, een eigen 3D-projectie op SVG met draaien,
 * traagheid, perspectief en een camera. Dat doen wij hier ook, zonder nieuwe
 * afhankelijkheid, maar met ons eigen verhaal: elke grote node is een bron met
 * een naam, kleine nodes zijn wat erin zit (Zoeken in Google Ads, Gemist in
 * Telefonie), en om het brein hangt wat Stevin onthoudt.
 *
 * Prestaties: React tekent de elementen een keer; de animatielus zet alleen
 * attributen via refs, hoogstens 30 keer per seconde, en raakt onzichtbare
 * knopen en lijnen niet aan (display:none). De lus start pas als de browser
 * na het laden tijd over heeft. Buiten beeld stopt de lus (IntersectionObserver).
 * Onder prefers-reduced-motion, of met data-beweging="uit" op html (de knop
 * Beweging uit), draait er niets en staat er een stil beeld.
 * Labels (11 okt): bronnen houden hun label; een herinnering niet. Om de
 * beurt licht er een herinnering op die naar voren staat (stip klopt, label
 * fadet in, staat 3,6 seconden, fadet uit), en alleen als het label niets
 * raakt: geen ander label, het logo of het kaartje. Dat wordt getoetst in
 * schermcoordinaten. Geen enkel label loopt over de rand van het vlak. Muis
 * of tik op een herinnering toont zijn label.
 *
 * Versie 2 (Koen, 11 okt 20:12: "lettertype wat minder", "grote bollen wat
 * simpel"; 20:21: de vraag uit de hero; 20:22: externe context erbij):
 *   - Labels klein in mono, hoofdletters met letterafstand, altijd even groot
 *     op het scherm. Ze staan in een eigen laag zonder schaal; diepte toont
 *     alleen de opacity.
 *   - Bronnen zijn kleine glazen rondjes met het echte logo of een dunne
 *     lijn-glyph (BEELD).
 *   - In rust lopen er een paar lichtpuntjes langs de lijnen van bron naar
 *     brein, niet onder reduced motion of Beweging uit.
 *   - Geen vraag, geen antwoord en geen signaal meer in het beeld: dat laat
 *     de vraagdemo verderop zien.
 *   - Rond Marktsignalen hangt context van buiten (kermis, subsidie):
 *     herinneringen van de soort Context, met een kaartje dat zegt wat er
 *     speelt en wat we ermee doen. Ze wisselen mee met de herinneringen.
 *
 * Toegankelijkheid: de SVG is decoratie (aria-hidden); de bediening staat in
 * gewone knoppen die de ouder tekent, ook voor de herinneringen (prop
 * herinnering, een index in HERINNERINGEN). Het kaartje bij een aangetikte
 * node is een statusregel, geen dialoog.
 */

type HubId = BronId | 'brein' | 'advisor'

interface Props {
  focus?: HubId | null
  /** Middelpunt van het brein als fractie van de breedte (ruimte voor tekst links). */
  middenX?: number
  middenY?: number
  /** Schaal ten opzichte van de kleinste zijde. */
  schaal?: number
  className?: string
  /** Klik op een bron, het brein of de Advisor in het beeld. */
  onKiesHub?: (id: HubId) => void
  /** Kaartje dicht (lege tik, Esc of sluitknop): de ouder zet zijn focus terug. */
  onSluit?: () => void
  /** Herinnering die de ouder via een knop koos (index in HERINNERINGEN): die
   * licht op met zijn label, de camera draait hem in beeld, en het brein
   * draait zolang niet door. */
  herinnering?: number | null
  /** Tik op een herinnering in het beeld (null: kaartje weer dicht). De ouder
   * laat zijn herinnering meelopen, zodat knoppen, statusregel en beeld
   * hetzelfde zeggen. */
  onKiesHerinnering?: (i: number | null) => void
  /** Strook bovenin het vlak (px) waar geen label mag staan, bijvoorbeeld
   * onder de kopbalk. */
  vrijBoven?: number
  /** Strook links (px) waar geen wisselend herinneringslabel begint, omdat
   * daar de tekst van de hero over het beeld ligt. */
  vrijLinks?: number
}

// Een wisselend herinneringslabel staat zo lang in beeld (ms), en na het
// uitfaden duurt het zo lang tot de volgende (Koen, 11 okt: "label fadet in,
// staat 3 tot 4 seconden, fadet uit, dan een volgende").
const WISSEL_DUUR = 3600
const WISSEL_PAUZE = 900
// Afstand tot de rand van het vlak en tussen twee labels (px).
const RAND = 6
const TUSSEN = 6

type Vak = { l: number; t: number; r: number; b: number }
// Een vak plus waar de tekst staat: ankerpunt x en grondlijn y (px).
type Plek = Vak & { ax: number; by: number }
// Waar een label staat: rechts of links van de stip, eronder, of (het brein)
// gecentreerd eronder.
type Kant = 'r' | 'l' | 'o' | 'm'
const raakt = (a: Vak, b: Vak) =>
  a.l < b.r + TUSSEN && a.r + TUSSEN > b.l && a.t < b.b + TUSSEN && a.b + TUSSEN > b.t
// Ligt een vak over een rondje (middelpunt x, y, straal r, in px)?
const overRondje = (v: Vak, x: number, y: number, r: number) => {
  const dx = x - Math.max(v.l, Math.min(x, v.r))
  const dy = y - Math.max(v.t, Math.min(y, v.b))
  return dx * dx + dy * dy < r * r
}
// Hoeveel van een rondje (als vierkant gerekend) onder een vak valt, in px².
const bedekt = (v: Vak, x: number, y: number, r: number) =>
  Math.max(0, Math.min(v.r, x + r) - Math.max(v.l, x - r)) * Math.max(0, Math.min(v.b, y + r) - Math.max(v.t, y - r))

// Rust in het beeld (W-535, Koen 12 okt 19:42: "soms zit er een clinch in,
// dan hapert hij"). Gemeten op 1440 breed: tijdens het draaien naar een
// gekozen bron wisselden labels tot tien keer in twee seconden van kant, lag
// het rondje van Google Ads 93 procent van de tijd over dat van Telefonie, en
// lag het kaartje bij Website en Bedrijfsdoelen vrijwel altijd over een
// rondje van de keten. De frametijden waren niet het probleem (geen frame
// boven 32 ms), wel las elk beeld de maat van het kaartje terug na het
// schrijven van de SVG, wat een extra layout afdwong.
//   - Een label dat net van kant wisselde, verscheen of verdween, blijft zo
//     lang (ms) zoals het is, tenzij het dan over een ander label, het logo of
//     de rand gaat.
//   - Rond de gekozen node houden de andere rondjes zoveel ruimte (px) tussen
//     hun randen; ze schuiven er zacht opzij voor.
//   - Het kaartje wisselt hoogstens zo vaak (ms) van plek.
const LABEL_RUST = 700
const RUIMTE = 16
const KAART_RUST = 600

const SATELLIETEN: Partial<Record<BronId, string[]>> = {
  google_ads: ['Search', 'YouTube', 'Kosten'],
  meta: ['Facebook', 'Instagram'],
  chatgpt_ads: ['Gesprekken', 'Kosten'],
  bol: ['Bestellingen', 'Advertenties'],
  website: ['Formulieren', 'Bezoek', "Landingspagina's"],
  klantgegevens: ['Klanten', 'Eerdere orders'],
  telefonie: ['Gesprekken', 'Gemist', 'Herkomst'],
  crm: ['Deals', 'Taken', 'Opvolging'],
  offertes: ['Verstuurd', 'Getekend'],
  verkoop: ['Facturen', 'Omzet'],
  doelen: ['Omzetdoel', 'Regio'],
  doelgroepen: ['Particulier', 'Zakelijk'],
  // Marktsignalen heeft geen satellieten meer: daar hangt nu de context
  // (herinneringen van de soort Context).
}

// Het beeld in elk glazen rondje: het echte logo waar een bron een merk heeft,
// anders een eigen dunne lijn-glyph (Koen, 11 okt 20:12). Logo's uit
// public/logos/merken (herkomst in docs/MERKLOGOS_W535.md). WordPress staat
// in wit: het grijze logo verdwijnt op het donkere glas. CRM toont HubSpot en
// Verkoop toont Exact Online, systemen die ook in de logoband staan.
type Glyph = 'doel' | 'mensen' | 'kaart' | 'telefoon' | 'offerte' | 'signaal' | 'advies'
const BEELD: Record<BronId | 'advisor', { logo: string } | { glyph: Glyph }> = {
  doelen: { glyph: 'doel' },
  doelgroepen: { glyph: 'mensen' },
  google_ads: { logo: '/logos/merken/google-ads.svg' },
  meta: { logo: '/logos/merken/meta.svg' },
  chatgpt_ads: { logo: '/logos/merken/chatgpt-wit.svg' },
  bol: { logo: '/logos/merken/bol-wit.svg' },
  website: { logo: '/logos/merken/wordpress-wit.svg' },
  klantgegevens: { glyph: 'kaart' },
  telefonie: { glyph: 'telefoon' },
  crm: { logo: '/logos/merken/hubspot.svg' },
  offertes: { glyph: 'offerte' },
  verkoop: { logo: '/logos/merken/exact-online.svg' },
  markt: { glyph: 'signaal' },
  advisor: { glyph: 'advies' },
}

// Lijn-glyphs op een raster van 24 bij 24, getekend met een haarlijn die op
// elke diepte even dik blijft (vector-effect in de CSS).
function GlyphPaden({ glyph }: { glyph: Glyph }) {
  switch (glyph) {
    case 'doel':
      return (
        <>
          <circle cx={12} cy={12} r={8.5} />
          <circle cx={12} cy={12} r={4.5} />
          <circle cx={12} cy={12} r={1} className="su-glyph-vol" />
        </>
      )
    case 'mensen':
      return (
        <>
          <circle cx={9} cy={8.5} r={3} />
          <path d="M3.5 19.5c0-3.2 2.4-5.5 5.5-5.5s5.5 2.3 5.5 5.5" />
          <circle cx={16.5} cy={9} r={2.5} />
          <path d="M16 13.6c2.8 0 4.8 2 4.8 4.9" />
        </>
      )
    case 'kaart':
      return (
        <>
          <rect x={3} y={5.5} width={18} height={13} rx={2.5} />
          <circle cx={8.5} cy={11} r={2} />
          <path d="M5.6 16c.6-1.3 1.6-2 2.9-2s2.3.7 2.9 2M14 10h4.5M14 13.5h3" />
        </>
      )
    case 'telefoon':
      return (
        <path d="M20 16.2v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 2.3 4.9 1.8 1.8 0 0 1 4.1 3h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.4 1.7.7 2.5a1.8 1.8 0 0 1-.4 1.9L7.7 10a14.3 14.3 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.6 2.5.7a1.8 1.8 0 0 1 1.5 1.7z" />
      )
    case 'offerte':
      return <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 11.5h6M9 15h6M9 18.5h3.5" />
    case 'signaal':
      return (
        <>
          <circle cx={12} cy={12} r={1.6} className="su-glyph-vol" />
          <path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
        </>
      )
    case 'advies':
      return <path d="M4.5 5h15A1.5 1.5 0 0 1 21 6.5v9a1.5 1.5 0 0 1-1.5 1.5H11l-4.5 3.5V17h-2A1.5 1.5 0 0 1 3 15.5v-9A1.5 1.5 0 0 1 4.5 5zM7.5 9.5h9M7.5 12.5h5.5" />
  }
}

// Straal van een glazen rondje (eigen eenheden; het oude stipje was 7,5).
const GLAS_R = 14
// Afstand tussen de rand van een stip en zijn label, op het scherm (px).
const GAP = 7
// Lichtpuntjes die in rust tegelijk van een bron naar het brein lopen.
const STROOM = 3
// Lichtpuntjes langs de keten van een gekozen bron: een per lijn (W-535,
// Koen 11 okt 21:51). Zo lang duurt een rondje van bron naar meetpunt (ms).
const KETEN_MAX = Math.max(0, ...Object.values(KETEN).map((k) => k?.length ?? 0))
const KETEN_DUUR = 2400

// Wat Stevin onthoudt van het voorbeeldbedrijf (verzonnen installatiebedrijf
// rond Breda, hetzelfde als in de vraagdemo). Koen, 10 okt 23:25: "aan het
// brein hangt veel meer, zie de oude nodes". Een deel heeft een label en licht
// om de beurt op, de rest is massa. Alles is verzonnen en staat op het kaartje
// als Voorbeeld. Geen herinnering spreekt de bezoeker aan, anders leest hij
// het als iets over zijn eigen bedrijf. Kort label in beeld, de rest op een
// kaartje als je erop klikt (Koen, 11 okt 01:07).
// Context (Koen, 11 okt 20:22): wat er buiten speelt, met op het kaartje wat
// er speelt en wat we ermee doen. Die hangen rond Marktsignalen, niet in de
// wolk om het brein.
export interface Herinnering {
  kort: string
  soort: 'Campagne' | 'Resultaat' | 'Afspraak' | 'Kennis' | 'Doel' | 'Context'
  /** Leeg bij context: die speelt nu. */
  wanneer?: string
  /** Wat Stevin weet, of bij context: wat er speelt. */
  uitleg: string
  /** Alleen bij context: wat we ermee doen. */
  actie?: string
}
export const HERINNERINGEN: Herinnering[] = [
  { kort: 'Airco zomer 2026', soort: 'Campagne', wanneer: 'jun tot aug 2026', uitleg: '41 aanvragen in zes weken, vooral via Google. Elf werden een offerte, zes een klant.' },
  // W-677: was "Hittegolf volgende week" (een weersverwachting) en "Komend
  // weekend vriest het". Stevin volgt het weer niet; wat het wel onthoudt is
  // wat er eerder bij hitte en vorst gebeurde.
  { kort: 'Hittegolf', soort: 'Kennis', wanneer: 'zomer 2026', uitleg: 'Bij hitte kwamen er binnen een dag drie keer zoveel aanvragen voor airco.' },
  { kort: 'Warmtepomp najaar', soort: 'Resultaat', wanneer: 'sep 2026', uitleg: 'Van aanvraag tot offerte duurt gemiddeld negen dagen. Het doel is vijf.' },
  { kort: 'Terugbelafspraak', soort: 'Afspraak', wanneer: 'sinds jan 2026', uitleg: 'Elke aanvraag wordt binnen een werkdag teruggebeld. Wie belt, zet het in het CRM.' },
  { kort: 'Kermis in Prinsenbeek', soort: 'Context', uitleg: 'Vier dagen kermis, het hele dorp is op de been.', actie: 'Meta rond Prinsenbeek dat weekend lager: veel klikken, weinig aanvragen.' },
  { kort: 'Opvolging september', soort: 'Resultaat', wanneer: 'sep 2026', uitleg: 'Twee aanvragen zonder opvolging. Een van die twee koos later voor een ander bedrijf.' },
  { kort: 'Doel 2026', soort: 'Doel', wanneer: '2026', uitleg: 'Dertig procent meer zakelijke klanten, vooral VvE\'s en kantoren in de eigen regio.' },
  { kort: 'Subsidieronde Breda open', soort: 'Context', uitleg: 'De gemeente opent een nieuwe ronde voor verduurzaming van woningen.', actie: 'Advertentieteksten aanpassen op de subsidie.' },
  { kort: 'Dakkapellen', soort: 'Kennis', wanneer: 'laatste 12 maanden', uitleg: 'De meeste aanvragen komen uit Breda en Etten-Leur.' },
  { kort: 'Drukke maandag', soort: 'Kennis', wanneer: 'laatste 8 weken', uitleg: 'Op maandag komt een derde van de telefoontjes binnen. Dan worden er ook de meeste gemist.' },
  { kort: 'Eerste nachtvorst', soort: 'Kennis', wanneer: 'nov 2025', uitleg: 'Na de eerste vorst kwamen er twee keer zoveel storingsmeldingen voor de cv-ketel binnen.' },
  { kort: 'Zonnepanelen', soort: 'Resultaat', wanneer: '2026', uitleg: 'Minder aanvragen dan vorig jaar. In april is het budget verschoven naar warmtepompen.' },
  { kort: 'Badkamers', soort: 'Resultaat', wanneer: 'laatste 6 maanden', uitleg: 'Een op de drie offertes wordt getekend, gemiddeld voor 11.400 euro.' },
  { kort: 'Herfstvakantie', soort: 'Context', uitleg: 'Een week lang zijn veel gezinnen weg. Vorig jaar kwam er die week meer bezoek en minder aanvragen.', actie: 'Budget die week omlaag, daarna weer op.' },
  { kort: 'Wie belt terug', soort: 'Afspraak', wanneer: 'sinds mrt 2026', uitleg: 'Ruud belt terug wie heeft gebeld, Sanne pakt de aanvragen via de website op.' },
  { kort: 'Concurrent op de merknaam', soort: 'Context', uitleg: 'Een concurrent adverteert sinds kort op zoekopdrachten met de bedrijfsnaam.', actie: 'Een kleine campagne op de eigen naam.' },
  { kort: 'Goede klant', soort: 'Kennis', wanneer: '2026', uitleg: 'Eigen woning, budget boven 8.000 euro, binnen 40 kilometer.' },
  { kort: 'Pagina warmtepomp', soort: 'Kennis', wanneer: 'jun 2026', uitleg: 'In juni vernieuwd. Sindsdien vult een groter deel van de bezoekers het formulier in.' },
]

interface Knoop {
  id: string
  hub: HubId
  soort: 'brein' | 'advisor' | 'hub' | 'sat' | 'stof' | 'geheugen'
  herinnering?: number
  label?: string
  x: number
  y: number
  z: number
  r: number
}

// Vaste willekeur, zodat server en browser hetzelfde beeld tekenen.
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function bouwKnopen(): { knopen: Knoop[]; lijnen: [number, number][]; ketenVan: (BronId | null)[] } {
  const r = rng(535)
  const knopen: Knoop[] = []
  const lijnen: [number, number][] = []
  knopen.push({ id: 'brein', hub: 'brein', soort: 'brein', label: BREIN.label, x: 0, y: 0, z: 0, r: 26 })
  knopen.push({ id: 'advisor', hub: 'advisor', soort: 'advisor', label: ADVISOR.label, x: 190, y: -30, z: 50, r: GLAS_R + 1 })
  lijnen.push([0, 1])

  // Bronnen op een bol (Fibonacci), zodat ze gelijkmatig rondom het brein staan.
  const n = BRONNEN.length
  const R = 240
  BRONNEN.forEach((b, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const straal = Math.sqrt(1 - y * y)
    const theta = i * Math.PI * (3 - Math.sqrt(5)) + 0.6
    const hub: Knoop = {
      id: b.id,
      hub: b.id,
      soort: 'hub',
      label: b.label,
      x: Math.cos(theta) * straal * R,
      y: y * R * 0.82,
      z: Math.sin(theta) * straal * R,
      r: GLAS_R,
    }
    const hi = knopen.push(hub) - 1
    lijnen.push([hi, 0])

    const sats = SATELLIETEN[b.id] ?? []
    for (let s = 0; s < sats.length; s++) {
      const a = r() * Math.PI * 2
      const e = (r() - 0.5) * Math.PI
      const d = 46 + r() * 46
      const naar = 1.18
      const ki =
        knopen.push({
          id: `${b.id}-${s}`,
          hub: b.id,
          soort: 'sat',
          label: sats[s],
          x: hub.x * naar + Math.cos(a) * Math.cos(e) * d,
          y: hub.y * naar + Math.sin(e) * d,
          z: hub.z * naar + Math.sin(a) * Math.cos(e) * d,
          r: 3.6,
        }) - 1
      lijnen.push([ki, hi])
    }
  })

  // Geen vaste dwarsverbanden tussen bronnen: Koen vond het eerste 3D-beeld
  // te druk (10 okt, 23:21). Alles loopt via het brein, en dat is ook het
  // verhaal. Wel de keten van een bron (KETEN): die lijnen staan er alleen
  // zolang je die bron kiest. ketenVan zegt per lijn bij welke bron hij hoort.
  const ketenVan: (BronId | null)[] = lijnen.map(() => null)
  const hubVan = (id: BronId) => knopen.findIndex((k) => k.soort === 'hub' && k.id === id)
  for (const b of BRONNEN) {
    for (const naar of KETEN[b.id] ?? []) {
      const a = hubVan(b.id)
      const z = hubVan(naar)
      if (a < 0 || z < 0) continue
      lijnen.push([a, z])
      ketenVan.push(b.id)
    }
  }

  // De geheugenwolk: dicht om het brein, binnen de bronnen. Labels alleen bij
  // de herinneringen, en die lichten om de beurt op. Context hangt rond
  // Marktsignalen, met een dunne lijn naar die bron.
  const markt = knopen.findIndex((k) => k.id === 'markt')
  const WOLK = 92
  const wolk: number[] = []
  for (let s = 0; s < WOLK; s++) {
    const a = r() * Math.PI * 2
    const e = Math.acos(2 * r() - 1) - Math.PI / 2
    const d = 46 + Math.pow(r(), 0.8) * 120
    const h = s < HERINNERINGEN.length ? HERINNERINGEN[s] : undefined
    if (h?.soort === 'Context' && markt >= 0) {
      const m = knopen[markt]
      const dd = 38 + (d - 46) * 0.3
      const ci =
        knopen.push({
          id: `context-${s}`,
          hub: 'markt',
          soort: 'geheugen',
          herinnering: s,
          label: h.kort,
          x: m.x * 1.18 + Math.cos(a) * Math.cos(e) * dd,
          y: m.y * 1.18 + Math.sin(e) * dd * 0.6,
          z: m.z * 1.18 + Math.sin(a) * Math.cos(e) * dd,
          r: 2.8,
        }) - 1
      lijnen.push([ci, markt])
      ketenVan.push(null)
      continue
    }
    wolk.push(
      knopen.push({
        id: `geheugen-${s}`,
        hub: 'brein',
        soort: 'geheugen',
        herinnering: h ? s : undefined,
        label: h?.kort,
        x: Math.cos(a) * Math.cos(e) * d,
        y: Math.sin(e) * d * 0.85,
        z: Math.sin(a) * Math.cos(e) * d,
        r: h ? 2.8 : 1.6 + r() * 1.2,
      }) - 1,
    )
  }
  // Dunne verbanden tussen herinneringen die dicht bij elkaar liggen: zo voelt
  // het als een netwerk en niet als een stofwolk.
  for (const i of wolk) {
    let beste = -1
    let afstand = Infinity
    for (const j of wolk) {
      if (i === j) continue
      const dx = knopen[i].x - knopen[j].x
      const dy = knopen[i].y - knopen[j].y
      const dz = knopen[i].z - knopen[j].z
      const d = dx * dx + dy * dy + dz * dz
      if (d < afstand) {
        afstand = d
        beste = j
      }
    }
    if (beste > i || r() < 0.35) {
      lijnen.push([i, beste])
      ketenVan.push(null)
    }
    if (r() < 0.22) {
      lijnen.push([i, 0])
      ketenVan.push(null)
    }
  }

  // Losse stofjes ver weg, voor diepte.
  for (let s = 0; s < 16; s++) {
    const a = r() * Math.PI * 2
    const e = (r() - 0.5) * Math.PI
    const d = 330 + r() * 170
    knopen.push({
      id: `ver-${s}`,
      hub: 'brein',
      soort: 'stof',
      x: Math.cos(a) * Math.cos(e) * d,
      y: Math.sin(e) * d * 0.7,
      z: Math.sin(a) * Math.cos(e) * d,
      r: 1.4,
    })
  }
  return { knopen, lijnen, ketenVan }
}

const F = 760 // brandpuntsafstand van de camera

function SluitKnop({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="-mr-1 -mt-0.5 px-1 text-[18px] leading-none text-white/50 hover:text-white" aria-label="Sluiten">
      ×
    </button>
  )
}

// Wat we meten bij een bron, met voorbeeldcijfers (METINGEN in netwerk.ts).
// Een keten leest van links naar rechts met een pijl ertussen; een lijst
// (omzet per bron, doel tegenover stand) regel voor regel. Cijfers in mono,
// de stap waar het om draait in accent. Voor een schermlezer een gewone lijst;
// de pijlen zijn decoratie.
function MetingBlok({ meting }: { meting: Meting }) {
  return (
    <div className="mt-3 border-t border-white/10 pt-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="m-0 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#3D8EFF]">Wat we meten</p>
        <span className="rounded-full border border-white/20 px-1.5 py-px text-[10.5px] leading-snug text-white/60">Voorbeeld</span>
      </div>
      {meting.vorm === 'keten' ? (
        <ol className="m-0 mt-1.5 flex list-none flex-wrap items-center gap-x-1 gap-y-1 p-0 text-[12.5px] leading-snug">
          {meting.stappen.map((st, i) => (
            <li key={st.label} className="inline-flex items-center gap-1 whitespace-nowrap">
              {i > 0 && <ChevronRight size={12} strokeWidth={2} aria-hidden="true" className="shrink-0 text-white/35" />}
              <span className={st.nadruk ? 'font-semibold text-[#3D8EFF]' : 'text-white/70'}>{st.label}</span>
              <span className={`font-mono ${st.nadruk ? 'font-bold text-[#3D8EFF]' : 'text-white'}`}>{st.waarde}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="m-0 mt-1.5 list-none space-y-0.5 p-0 text-[12.5px] leading-snug">
          {meting.stappen.map((st) => (
            <li key={st.label} className="flex items-baseline justify-between gap-3">
              <span className={st.nadruk ? 'font-semibold text-[#3D8EFF]' : 'text-white/70'}>{st.label}</span>
              <span className={`whitespace-nowrap font-mono ${st.nadruk ? 'font-bold text-[#3D8EFF]' : 'text-white'}`}>{st.waarde}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Labels in hoofdletters, ook voor een schermlezer niet van belang: de SVG is
// decoratie.
const hoofd = (s: string) => s.toLocaleUpperCase('nl-NL')

export default function StevinUniversum({
  focus = null,
  middenX = 0.5,
  middenY = 0.5,
  schaal = 1,
  className = '',
  onKiesHub,
  onSluit,
  herinnering = null,
  onKiesHerinnering,
  vrijBoven = 0,
  vrijLinks = 0,
}: Props) {
  const { knopen, lijnen, ketenVan } = useMemo(bouwKnopen, [])
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const knoopEls = useRef<(SVGGElement | null)[]>([])
  // Labels: maat gemeten in de browser (breedte, bovenkant en hoogte in px),
  // en aan welke kant van de stip het label nu staat.
  const labelEls = useRef<(SVGTextElement | null)[]>([])
  // Elk label staat in een eigen laag zonder schaal, in een groep die de lus
  // verplaatst en (voor diepte) doorzichtiger maakt. Wanneer ging een label
  // uit: zo lang het uitfadet, loopt het nog mee met zijn knoop.
  const labelWrapEls = useRef<(SVGGElement | null)[]>([])
  const labelUit = useRef<number[]>([])
  const labelZicht = useRef<number[]>([])
  // De stand (aan, puls) staat ook op de stip, de gloed en het label zelf, en
  // de CSS kijkt daar. Een selector via de ouder werd in Chrome na moveBefore
  // soms niet bijgewerkt (gemeten 11 okt).
  const stipEls = useRef<(SVGCircleElement | null)[]>([])
  const haloEls = useRef<(SVGCircleElement | null)[]>([])
  const labelMaat = useRef<({ w: number; y: number; h: number } | null)[]>([])
  const labelKant = useRef<Kant[]>([])
  // Per label: stond het vorige beeld aan, en wanneer wisselde het voor het
  // laatst van kant of van aan naar uit (LABEL_RUST).
  const labelAanVorig = useRef<boolean[]>([])
  const labelWissel = useRef<number[]>([])
  // Hoe ver een rondje (met wat erbij hoort) opzij staat voor de gekozen node,
  // in px. Loopt zacht naar zijn doel, en terug naar nul als niets gekozen is.
  const opzij = useRef<{ x: number; y: number }[]>([])
  const opzijTijd = useRef(0)
  // Het kaartje: bij welke knoop, de gekozen plek (ox, oy ten opzichte van
  // de knoop), sinds wanneer, wanneer er voor het laatst gezocht is, en de
  // verschuiving die er zacht naartoe loopt.
  const kaartPlek = useRef({ gk: -1, ox: 0, oy: 0, sinds: -1e9, zocht: -1e9, dx: 0, dy: 0, tijd: 0 })
  // Maat van het kaartje, bijgehouden door een ResizeObserver: elk beeld
  // offsetWidth lezen na het schrijven van de SVG dwong een layout af.
  const kaartMaat = useRef({ w: 0, h: 0 })
  // De labels die het vorige beeld stonden: het kaartje legt zich er liefst
  // niet overheen.
  const labelVakVorig = useRef<Vak[]>([])
  // Waar de naam van de gekozen node het vorige beeld stond: de rondjes
  // eromheen schuiven daar ook voor opzij.
  const ankerLabel = useRef<{ i: number; v: Vak } | null>(null)
  const ringEl = useRef<SVGCircleElement | null>(null)
  // De lichtpuntjes: welke bron, sinds wanneer, hoe lang, en wanneer de
  // volgende mag.
  const stroomEls = useRef<(SVGGElement | null)[]>([])
  const stroom = useRef(Array.from({ length: STROOM }, () => ({ hub: -1, start: 0, duur: 0, volgende: Infinity })))
  // De lichtpuntjes langs de keten van de gekozen bron, en sinds wanneer die
  // bron gekozen is (dan begint elk puntje bij de bron).
  const ketenEls = useRef<(SVGGElement | null)[]>([])
  const ketenStart = useRef({ fc: null as HubId | null, tijd: 0 })
  // De herinneringslabels van het vorige beeld: een bronlabel kiest liever een
  // kant waar het die niet raakt.
  const geheugenVorig = useRef<Vak[]>([])
  // Het wisselende herinneringslabel: welke knoop, tot wanneer, wanneer de
  // volgende mag, en wanneer elke knoop voor het laatst aan de beurt was.
  const wissel = useRef({ i: -1, eind: 0, volgende: Infinity, laatst: new Map<number, number>() })
  // Herinnering onder de muis: die toont zijn label.
  const zweef = useRef<number | null>(null)
  const stilVoorkeur = useRef(false)
  // De tekenfunctie voor wie hem eerder nodig heeft dan hij gedefinieerd is (ResizeObserver van het kaartje).
  const tekenRef = useRef<((t: number) => void) | null>(null)
  const lijnEls = useRef<(SVGLineElement | null)[]>([])
  // Onzichtbare raakcirkel per knoop; de straal volgt de schermmaat (24px).
  const raakEls = useRef<(SVGCircleElement | null)[]>([])
  const raakR = useRef<string[]>([])
  const laatsteSortering = useRef(-1e9)
  const onSluitRef = useRef(onSluit)
  onSluitRef.current = onSluit
  const [maat, setMaat] = useState({ w: 1200, h: 800 })
  // Het aangeklikte knooppunt; het kaartje volgt het in de animatielus.
  const [gekozen, setGekozen] = useState<number | null>(null)
  const gekozenRef = useRef<number | null>(null)
  // Hartslag: als een bron of herinnering het brein binnengaat, klopt het logo
  // twee keer kort (Koen, 11 okt 01:23: "dat het samensmelt met het logo en
  // even een soort heartbeat geeft").
  const hartslag = useRef({ start: -1e9, binnen: [] as boolean[] })
  gekozenRef.current = gekozen
  const kaartRef = useRef<HTMLDivElement>(null)
  // De bron die bij het openen al gekozen is; zie het kaartje hieronder (W-513).
  const beginFocus = useRef(focus)
  // Of de bezoeker sindsdien iets anders koos; pas dan schuift het kaartje.
  const afgeweken = useRef(false)
  // Eigen ids per instantie: een verloop in een verborgen SVG wordt in Chrome
  // niet getekend in een andere.
  const uid = useId().replace(/:/g, '')
  const gloedId = `su-gloed-${uid}`
  const breinId = `su-brein-${uid}`
  const glasVulId = `su-glasvul-${uid}`
  const glasGlansId = `su-glasglans-${uid}`
  const glasGloedId = `su-glasgloed-${uid}`
  const stroomId = `su-stroom-${uid}`

  // Camera en invoer leven in een ref: de lus mag React niet laten hertekenen.
  const cam = useRef({ yaw: -0.5, pitch: 0.18, vx: 0, vy: 0, doelYaw: null as number | null, doelPitch: null as number | null })
  const stand = useRef({ focus, herinnering })
  stand.current = { focus, herinnering }

  // Camera draait naar de gekozen node.
  useEffect(() => {
    // Herinnering via een knop: schuin voor het brein, rechts ervan (60 graden
    // van de kijkrichting), zodat hij met label in beeld staat. Recht ervoor,
    // zoals bij een bron, zou hem in het brein laten opgaan. Zelf aangetikt:
    // dan stond hij al in beeld en blijft de camera staan. Draait er niets
    // (reduced motion, Beweging uit), dan springt de camera er meteen heen.
    if (!focus && herinnering != null) {
      const doel = knopen.find((k) => k.soort === 'geheugen' && k.herinnering === herinnering)
      const getikt = gekozen != null && knopen[gekozen] === doel
      if (!doel || getikt) {
        cam.current.doelYaw = null
        cam.current.doelPitch = null
        return
      }
      const yaw = Math.atan2(doel.z, doel.x) + Math.PI / 6
      cam.current.doelYaw = yaw
      cam.current.doelPitch = 0.18
      const stil =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.beweging === 'uit'
      if (stil) {
        cam.current.yaw = yaw
        cam.current.pitch = 0.18
      }
      return
    }
    const doel = focus ? knopen.find((k) => k.id === focus) : null
    if (!doel || doel.id === 'brein') {
      cam.current.doelYaw = null
      cam.current.doelPitch = null
      return
    }
    // Niet recht voor het brein: daar ging de bron op in het logo op en was hij
    // weg, met alle ketenlijnen in een punt (gemeten 11 okt). Schuin ervoor,
    // rechts ervan, op ongeveer 80 eenheden van het midden: dan staat de bron
    // met zijn label naast het brein en lopen de lijnen naar zijn keten uit
    // elkaar. Het kaartje komt erboven.
    const rho = Math.hypot(doel.x, doel.z)
    const opzij = rho > 1 ? Math.asin(Math.min(1, 80 / rho)) : 0
    const yaw = Math.atan2(doel.x, -doel.z) - opzij
    const z1 = -doel.x * Math.sin(yaw) + doel.z * Math.cos(yaw)
    cam.current.doelYaw = yaw
    cam.current.doelPitch = Math.max(-0.6, Math.min(0.6, Math.atan(doel.y / z1)))
    // Draait er niets (reduced motion, Beweging uit), dan staat de bron meteen
    // vooraan, net als bij een herinnering.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.beweging === 'uit') {
      cam.current.yaw = yaw
      cam.current.pitch = cam.current.doelPitch
    }
  }, [focus, herinnering, gekozen, knopen])

  // Een bron met een keten gekozen met een knop (toetsenbord, schermlezer):
  // dan opent ook het kaartje bij die bron, met wat we meten. Zo zegt elke
  // weg naar een bron hetzelfde. Het kaartje is een statusregel en wordt dus
  // voorgelezen; op een telefoon schuift het in beeld als het erbuiten valt.
  //
  // W-513 (15 okt 2026): niet schuiven voor de bron die de pagina bij het
  // openen al gekozen heeft (start in HeroUniversum). Dan schoof /tarieven op
  // een telefoon vanzelf 427 px omlaag, de kop uit beeld, en vond PageSpeed
  // geen grootste weergave meer (NO_LCP, score 0). Pas bij een keuze van de
  // bezoeker schuift het kaartje in beeld.
  useEffect(() => {
    // Idempotent: in de ontwikkelmodus draait React elk effect twee keer.
    if (focus !== beginFocus.current) afgeweken.current = true
    if (!focus || !(focus in METINGEN)) return
    const i = knopen.findIndex((k) => k.soort === 'hub' && k.hub === focus)
    if (i < 0 || gekozenRef.current === i) return
    setGekozen(i)
    if (!afgeweken.current) return
    const id = window.setTimeout(() => kaartRef.current?.scrollIntoView({ block: 'nearest' }), 80)
    return () => window.clearTimeout(id)
  }, [focus, knopen])

  // Kiest de ouder iets anders (een knop), dan gaat een open kaartje dat daar
  // niet bij hoort dicht. Anders lichten er twee nodes op en zeggen kaartje en
  // statusregel iets anders.
  useEffect(() => {
    const g = gekozenRef.current
    if (g == null) return
    const n = knopen[g]
    const hoortErbij =
      (herinnering != null && n.soort === 'geheugen' && n.herinnering === herinnering) ||
      (focus != null && n.hub === focus && n.soort !== 'geheugen' && n.soort !== 'stof')
    if (!hoortErbij) setGekozen(null)
  }, [focus, herinnering, knopen])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setMaat({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = kaartRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      kaartMaat.current = { w: el.offsetWidth, h: el.offsetHeight }
      // Zonder beweging volgt er geen volgend beeld dat de nieuwe maat oppakt
      // (Codex op #152): dan hier zelf opnieuw tekenen.
      if (stilVoorkeur.current || document.documentElement.dataset.beweging === 'uit') {
        requestAnimationFrame(() => tekenRef.current?.(performance.now()))
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Knopen met een herinnering, alle knopen met een label, en de bronnen.
  const geheugenIdx = useMemo(
    () => knopen.map((n, i) => (n.soort === 'geheugen' && n.herinnering != null ? i : -1)).filter((i) => i >= 0),
    [knopen],
  )
  const labelIdx = useMemo(() => knopen.map((n, i) => (n.label ? i : -1)).filter((i) => i >= 0), [knopen])
  const hubIdx = useMemo(() => knopen.map((n, i) => (n.soort === 'hub' ? i : -1)).filter((i) => i >= 0), [knopen])
  // Alle glazen rondjes: de bronnen en de Advisor.
  const rondIdx = useMemo(
    () => knopen.map((n, i) => (n.soort === 'hub' || n.soort === 'advisor' ? i : -1)).filter((i) => i >= 0),
    [knopen],
  )

  // Maat van een label in px (de labellaag heeft geen schaal), een keer
  // gemeten. Een tekst die nog niet getekend is geeft nul; dan de volgende
  // keer opnieuw. De grondlijn ligt op 0, dus y is de bovenkant ten opzichte
  // daarvan.
  const maatVan = useCallback((i: number) => {
    const m = labelMaat.current[i]
    if (m) return m
    const el = labelEls.current[i]
    if (!el) return null
    try {
      const b = el.getBBox()
      if (!b.width) return null
      const nieuw = { w: b.width, y: b.y, h: b.height }
      labelMaat.current[i] = nieuw
      return nieuw
    } catch {
      return null
    }
  }, [])

  const teken = useCallback(
    (tijd: number) => {
      const c = cam.current
      const { focus: fc, herinnering: hr } = stand.current
      const W = maat.w
      const H = maat.h
      const cx = W * middenX
      const cy = H * middenY
      const k = (Math.min(W, H) / 620) * schaal
      const stilNu = stilVoorkeur.current || document.documentElement.dataset.beweging === 'uit'

      type Pt = { X: number; Y: number; s: number; z: number }
      const maakProj = (yaw: number, pitch: number) => {
        const cy0 = Math.cos(yaw)
        const sy0 = Math.sin(yaw)
        const cp = Math.cos(pitch)
        const sp = Math.sin(pitch)
        return (x: number, y: number, z: number): Pt => {
          const x1 = x * cy0 + z * sy0
          const z1 = -x * sy0 + z * cy0
          const y2 = y * cp - z1 * sp
          const z2 = y * sp + z1 * cp
          const s = F / (F + z2 * 1.0)
          return { X: cx + x1 * s * k, Y: cy + y2 * s * k, s, z: z2 }
        }
      }
      const proj = maakProj(c.yaw, c.pitch)
      const P = knopen.map((n) => proj(n.x, n.y, n.z))

      const gk = gekozenRef.current
      // Het wisselende label van de vorige keer; zijn stip licht op.
      const wi = wissel.current.i
      const zw = zweef.current
      // De bronnen in de keten van de gekozen bron lichten mee op en dimmen
      // niet (wat erin zit, hun satellieten, blijft verborgen).
      const keten = fc != null && fc !== 'brein' && fc !== 'advisor' ? (KETEN[fc] ?? []) : []
      const inKeten = (i: number) => knopen[i].soort === 'hub' && keten.includes(knopen[i].hub as BronId)
      const isAan = (i: number) => {
        const n = knopen[i]
        return (
          gk === i ||
          wi === i ||
          zw === i ||
          inKeten(i) ||
          (hr != null && n.soort === 'geheugen' && n.herinnering === hr) ||
          (fc != null && n.hub === fc && n.soort !== 'stof' && n.soort !== 'geheugen')
        )
      }
      // Kleine nodes (wat er in een bron zit) alleen tonen als die bron gekozen is.
      const zichtbaar = (i: number) => knopen[i].soort !== 'sat' || isAan(i) || fc === knopen[i].hub
      // Met een gekozen bron dimt de rest. De context rond Marktsignalen hoort
      // bij die bron en dimt dan niet.
      const isStil = (i: number) => {
        const n = knopen[i]
        return (
          (fc != null && n.hub !== fc && n.soort !== 'brein' && n.soort !== 'geheugen' && !inKeten(i)) ||
          (fc != null && fc !== 'brein' && n.soort === 'geheugen' && n.hub !== fc)
        )
      }

      // Ruimte rond de gekozen node. De camera zet hem vooraan en groot neer,
      // en dan schoof hij over de rondjes van zijn keten heen (Google Ads over
      // Telefonie of CRM). Elk ander rondje dat te dichtbij komt, schuift op
      // het scherm opzij tot er RUIMTE tussen de randen zit, met wat erbij
      // hoort (wat erin zit, de context rond Marktsignalen) en zijn lijnen.
      // Rondjes in de keten houden ook onderling ruimte. Zonder keuze staat
      // alles waar het hoort: de homepage in rust verandert niet.
      const anker =
        gk != null && (knopen[gk].soort === 'hub' || knopen[gk].soort === 'advisor')
          ? gk
          : fc != null && fc !== 'brein'
            ? knopen.findIndex((n) => (n.soort === 'hub' || n.soort === 'advisor') && n.hub === fc)
            : -1
      const doel: { x: number; y: number }[] = []
      if (anker >= 0) {
        const A = P[anker]
        const ra = knopen[anker].r * A.s * k
        for (const j of rondIdx) {
          if (j === anker) continue
          const Q = P[j]
          let dx = Q.X - A.X
          let dy = Q.Y - A.Y
          let d = Math.hypot(dx, dy)
          const min = ra + knopen[j].r * Q.s * k + RUIMTE
          if (d >= min) continue
          if (d < 0.5) {
            dx = j % 2 ? 1 : -1
            dy = 0
            d = 1
          }
          doel[j] = { x: (dx / d) * (min - d), y: (dy / d) * (min - d) }
        }
        // Ook niet over de naam van de gekozen node: anders valt die over het
        // rondje ernaast (Google Ads over Telefonie).
        const al = ankerLabel.current
        if (al && al.i === anker) {
          const v = al.v
          for (const j of rondIdx) {
            if (j === anker) continue
            const o = doel[j] ?? { x: 0, y: 0 }
            const qx = P[j].X + o.x
            const qy = P[j].Y + o.y
            const r = knopen[j].r * P[j].s * k + RUIMTE / 2
            const dx = qx - Math.max(v.l, Math.min(qx, v.r))
            const dy = qy - Math.max(v.t, Math.min(qy, v.b))
            const d = Math.hypot(dx, dy)
            if (d >= r) continue
            if (d < 0.5) {
              // Middelpunt in het vak: langs de kortste weg eruit.
              const uit = [
                { x: v.l - r - qx, y: 0 },
                { x: v.r + r - qx, y: 0 },
                { x: 0, y: v.t - r - qy },
                { x: 0, y: v.b + r - qy },
              ].sort((a, b) => Math.abs(a.x + a.y) - Math.abs(b.x + b.y))[0]
              doel[j] = { x: o.x + uit.x, y: o.y + uit.y }
              continue
            }
            doel[j] = { x: o.x + (dx / d) * (r - d), y: o.y + (dy / d) * (r - d) }
          }
        }
        const ketenR = rondIdx.filter((j) => j !== anker && inKeten(j))
        for (let a = 0; a < ketenR.length; a++) {
          for (let b = a + 1; b < ketenR.length; b++) {
            const i = ketenR[a]
            const j = ketenR[b]
            const oi = doel[i] ?? { x: 0, y: 0 }
            const oj = doel[j] ?? { x: 0, y: 0 }
            let dx = P[j].X + oj.x - (P[i].X + oi.x)
            let dy = P[j].Y + oj.y - (P[i].Y + oi.y)
            let d = Math.hypot(dx, dy)
            const min = (knopen[i].r * P[i].s + knopen[j].r * P[j].s) * k + RUIMTE
            if (d >= min) continue
            if (d < 0.5) {
              dx = 1
              dy = 0
              d = 1
            }
            const h = (min - d) / 2
            doel[i] = { x: oi.x - (dx / d) * h, y: oi.y - (dy / d) * h }
            doel[j] = { x: oj.x + (dx / d) * h, y: oj.y + (dy / d) * h }
          }
        }
      }
      // Zacht naar het doel (in ongeveer een kwart seconde); draait er niets,
      // dan meteen.
      const dtOpzij = Math.min(100, Math.max(0, tijd - opzijTijd.current))
      opzijTijd.current = tijd
      const mee = stilNu ? 1 : 1 - Math.pow(0.7, dtOpzij / 33)
      const opzijVan = new Map<HubId, { x: number; y: number }>()
      for (const j of rondIdx) {
        const nu = opzij.current[j] ?? { x: 0, y: 0 }
        const dl = doel[j] ?? { x: 0, y: 0 }
        nu.x += (dl.x - nu.x) * mee
        nu.y += (dl.y - nu.y) * mee
        if (Math.abs(nu.x) < 0.05 && Math.abs(nu.y) < 0.05) {
          nu.x = 0
          nu.y = 0
        }
        opzij.current[j] = nu
        if (nu.x || nu.y) opzijVan.set(knopen[j].hub, nu)
      }
      if (opzijVan.size) {
        knopen.forEach((n, i) => {
          if (n.hub === 'brein' || n.soort === 'stof') return
          const o = opzijVan.get(n.hub)
          if (o) P[i] = { ...P[i], X: P[i].X + o.x, Y: P[i].Y + o.y }
        })
      }

      // Lijnen
      lijnen.forEach(([a, b], i) => {
        const el = lijnEls.current[i]
        if (!el) return
        // Een ketenlijn staat er alleen als zijn bron gekozen is, en dan
        // helder: een rustig licht van de bron naar elk meetpunt.
        const eigen = ketenVan[i]
        if (eigen) {
          if (fc !== eigen) {
            if (el.style.display !== 'none') el.style.display = 'none'
            return
          }
          if (el.style.display === 'none') el.style.display = ''
          const pa = P[a]
          const pb = P[b]
          el.setAttribute('x1', pa.X.toFixed(1))
          el.setAttribute('y1', pa.Y.toFixed(1))
          el.setAttribute('x2', pb.X.toFixed(1))
          el.setAttribute('y2', pb.Y.toFixed(1))
          const diepte = Math.max(0.35, Math.min(1, (pa.s + pb.s) / 2 - 0.2))
          el.setAttribute('stroke', '#3D8EFF')
          el.setAttribute('stroke-opacity', (0.6 * diepte).toFixed(3))
          el.setAttribute('stroke-width', '1.2')
          return
        }
        // Onzichtbaar (een satelliet van een bron die niet gekozen is): een
        // keer display:none, en geen coordinaten meer schrijven tot hij terugkomt.
        if (!zichtbaar(a) || !zichtbaar(b)) {
          if (el.style.display !== 'none') el.style.display = 'none'
          return
        }
        if (el.style.display === 'none') el.style.display = ''
        const pa = P[a]
        const pb = P[b]
        el.setAttribute('x1', pa.X.toFixed(1))
        el.setAttribute('y1', pa.Y.toFixed(1))
        el.setAttribute('x2', pb.X.toFixed(1))
        el.setAttribute('y2', pb.Y.toFixed(1))
        const diepte = Math.max(0.15, Math.min(1, (pa.s + pb.s) / 2 - 0.35))
        const aan = isAan(a) && isAan(b)
        const stil = isStil(a) || isStil(b)
        el.setAttribute('stroke', aan ? '#3D8EFF' : '#3D8EFF')
        const wolk = knopen[a].soort === 'geheugen' || knopen[b].soort === 'geheugen'
        el.setAttribute('stroke-opacity', (aan ? 0.85 : stil ? 0.04 : wolk ? 0.09 * diepte : 0.13 * diepte).toFixed(3))
        el.setAttribute('stroke-width', aan ? '1.4' : '0.8')
      })

      // Het brein neemt op wat ervoor langs komt: nodes vervagen vlak bij het
      // brein, en hun labels verdwijnen al eerder. Anders bedekt een bron het
      // Stevin-icoon (Koen, 11 okt 01:22). Het brein staat in de oorsprong,
      // dus op elk moment op dezelfde plek.
      const B = P[0]
      const rBrein = knopen[0].r * B.s * k
      const opgenomen = (p: { X: number; Y: number }) => {
        const d = Math.hypot(p.X - B.X, p.Y - B.Y)
        return {
          zicht: Math.min(1, Math.max(0, (d - rBrein * 0.95) / (rBrein * 1.1))),
          labelWeg: d < rBrein * 2.6,
        }
      }

      // Wie gaat er net het brein in? Dan een hartslag (hoogstens om de 1,5 s).
      const hs = hartslag.current
      knopen.forEach((n, i) => {
        if (n.soort !== 'hub' && !(n.soort === 'geheugen' && n.herinnering != null)) return
        const p = P[i]
        const binnen = Math.hypot(p.X - B.X, p.Y - B.Y) < rBrein * 1.1 && p.z > B.z - 400
        if (binnen && !hs.binnen[i] && tijd - hs.start > 1500) hs.start = tijd
        hs.binnen[i] = binnen
      })
      const t = (tijd - hs.start) / 700
      // Tik-tik: twee bulten, de tweede kleiner.
      const bult = (x: number, mid: number, b: number) => Math.max(0, 1 - Math.abs(x - mid) / b)
      const slag = t >= 0 && t <= 1 ? 0.13 * bult(t, 0.15, 0.15) + 0.08 * bult(t, 0.45, 0.15) : 0

      // Knopen
      const stilL: boolean[] = []
      const zichtL: number[] = []
      knopen.forEach((n, i) => {
        const g = knoopEls.current[i]
        if (!g) return
        if (!zichtbaar(i)) {
          if (g.style.display !== 'none') g.style.display = 'none'
          return
        }
        if (g.style.display === 'none') g.style.display = ''
        const p = P[i]
        const aan = isAan(i)
        const stil = isStil(i)
        const diepte = Math.max(0.12, Math.min(1, p.s * 1.25 - 0.35))
        // Een herinnering die je koos (knop, tik of muis) blijft altijd
        // zichtbaar, ook vlak bij het brein.
        const uitgekozen = n.soort === 'geheugen' && ((hr != null && n.herinnering === hr) || zw === i || gk === i)
        const bijBrein = n.soort === 'brein' || uitgekozen ? { zicht: 1, labelWeg: false } : opgenomen(p)
        const extra = n.soort === 'brein' ? 1 + slag : 1
        g.setAttribute('transform', `translate(${p.X.toFixed(1)} ${p.Y.toFixed(1)}) scale(${(p.s * k * extra).toFixed(3)})`)
        if (n.soort === 'brein') {
          const ring = ringEl.current
          if (ring) {
            const ok = t >= 0 && t <= 1
            ring.setAttribute('r', (n.r * (1 + (ok ? t : 0) * 1.4)).toFixed(1))
            ring.setAttribute('opacity', ok ? (0.7 * (1 - t)).toFixed(2) : '0')
          }
        }
        const zicht =
          (stil
            ? 0.16
            : n.soort === 'stof'
              ? 0.35 * diepte
              : n.soort === 'geheugen' && !aan
                ? 0.3 + 0.55 * diepte
                : Math.max(0.3, diepte)) * bijBrein.zicht
        g.setAttribute('opacity', zicht.toFixed(3))
        // Een knoop die je (bijna) niet ziet, vangt ook geen tik of cursor;
        // zijn label ook niet.
        const pe = zicht > 0.05 ? '' : 'none'
        if (g.style.pointerEvents !== pe) {
          g.style.pointerEvents = pe
          const lw = labelWrapEls.current[i]
          if (lw) lw.style.pointerEvents = pe
        }
        // Raakvlak minstens 24px doorsnee op het scherm (WCAG 2.5.8), ook als
        // de knoop achteraan klein wordt getekend.
        const raak = raakEls.current[i]
        if (raak && n.soort !== 'brein') {
          const r = Math.max(12 / (p.s * k), n.r + (n.soort === 'hub' || n.soort === 'advisor' ? 4 : 8)).toFixed(1)
          if (raakR.current[i] !== r) {
            raakR.current[i] = r
            raak.setAttribute('r', r)
          }
        }
        const a = aan ? '1' : '0'
        if (g.dataset.aan !== a) {
          g.dataset.aan = a
          stipEls.current[i]?.setAttribute('data-aan', a)
          haloEls.current[i]?.setAttribute('data-aan', a)
          labelEls.current[i]?.setAttribute('data-aan', a)
        }
        stilL[i] = stil
        zichtL[i] = zicht
      })

      // Kaartje bij de gekozen node, binnen het vlak gehouden.
      let kaartVak: Vak | null = null
      const kaart = kaartRef.current
      if (kaart) {
        if (gk == null) {
          kaart.style.opacity = '0'
          kaartPlek.current.gk = -1
        } else {
          const p = P[gk]
          // De maat komt van de ResizeObserver; alleen het allereerste beeld
          // meet zelf.
          if (!kaartMaat.current.w) kaartMaat.current = { w: kaart.offsetWidth, h: kaart.offsetHeight }
          const kb = kaartMaat.current.w || 260
          const kh = kaartMaat.current.h || 120
          // Niet over de tekst links en niet onder de kopbalk, als het
          // vlak daar ruimte voor laat.
          const links = Math.min(Math.max(8, vrijLinks), Math.max(8, W - kb - 8))
          const hoog = Math.max(8, vrijBoven)
          const klem = (x: number, y: number) => ({
            x: Math.max(links, Math.min(W - kb - 8, x)),
            y: Math.max(hoog, Math.min(H - kh - 8, y)),
          })
          // Boven of onder het rondje zelf, niet over de rand ervan (een bron
          // vooraan is op het scherm groter dan 14 px).
          const rr = Math.max(4, knopen[gk].r * p.s * k)
          const boven = p.Y - rr - kh - 8
          // De oude plek: rechtsboven, of eronder als er boven geen ruimte is.
          // Ligt die over een rondje dat je ziet (bij Website lag het kaartje
          // bijna altijd over het Website-rondje), dan zoekt het kaartje boven,
          // onder of naast de node een plek die minder bedekt, zo dicht
          // mogelijk bij de node.
          const oud = klem(p.X + 14, boven > hoog ? boven : p.Y + rr + 8)
          const opties = [oud]
          for (const y of [boven, p.Y + rr + 8, p.Y - kh / 2]) opties.push(klem(p.X + 14, y), klem(p.X - 14 - kb, y))
          for (let y = hoog; y <= H - kh - 8; y += 24) for (let x = links; x <= W - kb - 8; x += 24) opties.push({ x, y })
          const kosten = (o: { x: number; y: number }) => {
            const v = { l: o.x, t: o.y, r: o.x + kb, b: o.y + kh }
            // De gekozen node zelf telt zwaar, het brein (met zijn naam
            // eronder) en de keten dubbel.
            let s = 8 * bedekt(v, p.X, p.Y, rr + 6) + 3 * bedekt(v, B.X, B.Y + rBrein * 0.5, rBrein * 1.5)
            for (const j of rondIdx) {
              if (j === gk || (zichtL[j] ?? 1) < 0.2) continue
              const q = P[j]
              s += (inKeten(j) ? 4 : 2) * bedekt(v, q.X, q.Y, knopen[j].r * q.s * k + 6)
            }
            for (const x of labelVakVorig.current)
              s += Math.max(0, Math.min(v.r, x.r + 3) - Math.max(v.l, x.l - 3)) * Math.max(0, Math.min(v.b, x.b + 3) - Math.max(v.t, x.t - 3))
            // Liefst vlak bij de node: elke px tussen node en kaartje telt mee.
            const dx = p.X - Math.max(v.l, Math.min(p.X, v.r))
            const dy = p.Y - Math.max(v.t, Math.min(p.Y, v.b))
            return s + 4 * Math.max(0, Math.hypot(dx, dy) - rr - 12)
          }
          const kp = kaartPlek.current
          const nieuw = kp.gk !== gk
          // De plek van nu: dezelfde verschuiving ten opzichte van de node.
          let doelPlek = nieuw ? oud : klem(p.X + kp.ox, p.Y + kp.oy)
          const nuKost = kosten(doelPlek)
          // Zoeken kost wat (een raster van plekken), dus hoogstens eens per
          // KAART_RUST, en alleen als de plek van nu iets bedekt.
          if (nuKost > 0 && (nieuw || stilNu || (tijd - kp.sinds >= KAART_RUST && tijd - kp.zocht >= KAART_RUST))) {
            kp.zocht = tijd
            let beste = doelPlek
            let besteKost = nuKost
            for (const o of opties) {
              const c = kosten(o)
              if (c < besteKost) {
                beste = o
                besteKost = c
              }
            }
            // Alleen wisselen als het duidelijk beter is: anders springt het
            // kaartje heen en weer.
            if (beste !== doelPlek && (nieuw || stilNu || besteKost < nuKost * 0.7 - 200)) {
              doelPlek = beste
              if (!nieuw) kp.sinds = tijd
            }
          }
          kp.ox = doelPlek.x - p.X
          kp.oy = doelPlek.y - p.Y
          // Wisselt de plek, dan schuift het kaartje er zacht heen; bij een
          // nieuwe node, of als er niets draait, staat het er meteen.
          const dt = Math.min(100, Math.max(0, tijd - kp.tijd))
          const mee = nieuw || stilNu ? 1 : 1 - Math.pow(0.6, dt / 33)
          kp.dx += (kp.ox - kp.dx) * mee
          kp.dy += (kp.oy - kp.dy) * mee
          kp.gk = gk
          kp.tijd = tijd
          if (nieuw) kp.sinds = tijd
          const x = Math.max(links, Math.min(W - kb - 8, p.X + kp.dx))
          const y = Math.max(hoog, Math.min(H - kh - 8, p.Y + kp.dy))
          kaart.style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`
          kaart.style.opacity = '1'
          kaartVak = { l: x, t: y, r: x + kb, b: y + kh }
        }
      }

      // Labels (W-535, 11 okt). Alles in px: de labels hebben op elke diepte
      // dezelfde maat. Geen label over de rand van het vlak: past het rechts
      // van de stip niet, dan links of eronder, anders niet. Eerst wat
      // vaststaat (logo, brein, kaartje, bronnen), dan de herinneringen. Een
      // herinnering krijgt geen vast label: om de beurt licht er een op die
      // naar voren staat en niets raakt.
      const boven = Math.max(RAND, vrijBoven)
      const binnen = (v: Vak) => v.l >= RAND && v.r <= W - RAND && v.t >= boven && v.b <= H - RAND
      const vakVan = (i: number, p: Pt, kant: Kant): Plek | null => {
        const m = maatVan(i)
        if (!m) return null
        const rr = knopen[i].r * p.s * k
        const ax = kant === 'r' ? p.X + rr + GAP : kant === 'l' ? p.X - rr - GAP : p.X
        const l = kant === 'r' ? ax : kant === 'l' ? ax - m.w : ax - m.w / 2
        // Naast de stip: verticaal gecentreerd. Eronder: net onder de rand.
        // Het brein: onder het icoon (dat is kleiner dan zijn straal).
        const top = kant === 'o' ? p.Y + rr + GAP - 2 : kant === 'm' ? p.Y + 19 * p.s * k + 4 : p.Y - m.h / 2
        return { l, t: top, r: l + m.w, b: top + m.h, ax, by: top - m.y }
      }
      // De eerste kant waar het label binnen het vlak past en (als gevraagd)
      // niets raakt. Het brein heeft alleen zijn eigen plek.
      const plaats = (i: number, p: Pt, kanten: Kant[] = ['r', 'l'], ok: (v: Vak) => boolean = () => true) => {
        for (const kant of knopen[i].soort === 'brein' ? (['m'] as Kant[]) : kanten) {
          const v = vakVan(i, p, kant)
          if (v && binnen(v) && ok(v)) return { v, kant }
        }
        return null
      }
      // Wil deze knoop (geen herinnering) een label?
      const wilVast = (i: number, p: Pt) => {
        const n = knopen[i]
        if (!n.label || n.soort === 'geheugen' || n.soort === 'stof' || !zichtbaar(i)) return false
        if (n.soort === 'brein') return true
        if (opgenomen(p).labelWeg) return false
        return (isAan(i) && n.soort !== 'sat') || fc === n.hub || ((n.soort === 'hub' || n.soort === 'advisor') && p.z < 30 && !isStil(i))
      }
      const logo: Vak = { l: B.X - rBrein, t: B.Y - rBrein, r: B.X + rBrein, b: B.Y + rBrein }
      // Volgorde: brein, Advisor, gekozen bronnen, de andere bronnen, dan wat
      // erin zit. Een bronlabel staat rechts van de stip, of links, of
      // eronder: waar het geen ander label of het logo raakt. Liefst ook niet
      // over het rondje van een andere bron of de Advisor, of over een
      // herinneringslabel. Lukt dat nergens, dan wacht het tot het er voorbij
      // is; een gekozen bron mag dan wel over een rondje, maar nooit over een
      // ander label of het logo (een stapel labels leest niemand).
      // De gekozen node eerst: zijn naam gaat voor die van zijn keten.
      const vasteVolgorde = [0, 1, ...(gk != null && knopen[gk].soort === 'hub' ? [gk] : []),
        ...labelIdx.filter((i) => knopen[i].soort === 'hub' && isAan(i) && i !== gk),
        ...labelIdx.filter((i) => knopen[i].soort === 'hub' && !isAan(i)),
        ...labelIdx.filter((i) => knopen[i].soort === 'sat')]
      const stipIdx = labelIdx.filter((i) => knopen[i].soort === 'hub' || knopen[i].soort === 'advisor')
      const vasteVakken = (Pn: Pt[], metToon: boolean) => {
        const bezet: Vak[] = [logo]
        const labels: Vak[] = []
        // De rondjes van de bronnen en de Advisor (met wat ruimte eromheen).
        const stippen = stipIdx
          .filter((i) => (zichtL[i] ?? 0) > 0.2)
          .map((i) => {
            const rr = (knopen[i].r + 2) * Pn[i].s * k
            return { i, v: { l: Pn[i].X - rr, t: Pn[i].Y - rr, r: Pn[i].X + rr, b: Pn[i].Y + rr } }
          })
        // De rondjes zelf zijn ook bezet voor een herinneringslabel.
        for (const x of stippen) bezet.push(x.v)
        for (const i of vasteVolgorde) {
          const n = knopen[i]
          if (!wilVast(i, Pn[i])) continue
          const vastWeg = (v: Vak) => raakt(v, logo)
          // Liefst ook niet in de tekstkolom van de hero (daar stond CRM tegen
          // de kop aan, gemeten 11 okt).
          const stipWeg = (v: Vak) =>
            (n.soort !== 'brein' && v.l < vrijLinks) ||
            stippen.some((x) => x.i !== i && raakt(v, x.v)) ||
            (metToon && kaartVak != null && raakt(v, kaartVak)) ||
            (metToon && geheugenVorig.current.some((x) => raakt(v, x)))
          const labelWeg = (v: Vak) => labels.some((x) => raakt(v, x))
          // Eerst de kant waar het label al staat: dan springt het niet heen
          // en weer.
          const nu = metToon ? labelKant.current[i] : undefined
          const kanten: Kant[] = nu && nu !== 'm' ? [nu, ...(['r', 'l', 'o'] as Kant[]).filter((x) => x !== nu)] : ['r', 'l', 'o']
          const moet = isAan(i) || fc === n.hub
          // Net gewisseld, verschenen of verdwenen (LABEL_RUST): dan blijft
          // het label zoals het was, zolang het niet over een ander label, het
          // logo of de rand gaat. Anders sprong het tijdens het draaien heen en
          // weer en knipperde het aan en uit.
          const was = metToon && labelAanVorig.current[i] === true
          const rustig = metToon && n.soort !== 'brein' && tijd - (labelWissel.current[i] ?? -1e9) < LABEL_RUST
          // Een label dat over een rondje zou vallen dat dichterbij staat dan
          // zijn eigen knoop, zoekt een andere kant of verdwijnt erachter, in
          // plaats van erdoorheen te lopen. Niet bij de gekozen node zelf: die
          // staat vooraan.
          const achter = (v: Vak) =>
            i !== gk &&
            stippen.some((x) => x.i !== i && Pn[x.i].z < Pn[i].z - 4 && overRondje(v, Pn[x.i].X, Pn[x.i].Y, knopen[x.i].r * Pn[x.i].s * k))
          let pl: { v: Plek; kant: Kant } | null = null
          // Het brein houdt altijd zijn naam; de rest moet ruimte vinden.
          if (n.soort === 'brein') pl = plaats(i, Pn[i])
          else {
            if (rustig && was && nu && nu !== 'm') pl = plaats(i, Pn[i], [nu], (v) => !vastWeg(v) && !labelWeg(v) && !achter(v))
            // Net verdwenen: dan nog even niet terug (behalve de gekozen node).
            const wacht = rustig && !was && i !== gk
            if (!pl && !wacht) pl = plaats(i, Pn[i], kanten, (v) => !vastWeg(v) && !stipWeg(v) && !labelWeg(v))
            // Een label onder het kaartje leest niemand: dan liever een
            // andere kant.
            const onderKaart = (v: Vak) => metToon && kaartVak != null && raakt(v, kaartVak)
            // Eerst een kant die geen enkel rondje raakt (de strenge toets
            // houdt ook ruimte en de vorige herinneringslabels vrij), dan een
            // die hoogstens over een verder weg gelegen rondje valt.
            const overRondjes = (v: Vak) =>
              stippen.some((x) => x.i !== i && overRondje(v, Pn[x.i].X, Pn[x.i].Y, knopen[x.i].r * Pn[x.i].s * k))
            if (!pl && moet && !wacht) pl = plaats(i, Pn[i], kanten, (v) => !vastWeg(v) && !labelWeg(v) && !overRondjes(v) && !onderKaart(v))
            if (!pl && moet && !wacht) pl = plaats(i, Pn[i], kanten, (v) => !vastWeg(v) && !labelWeg(v) && !achter(v) && !onderKaart(v))
            if (!pl && moet && !wacht) pl = plaats(i, Pn[i], kanten, (v) => !vastWeg(v) && !labelWeg(v) && !achter(v))
          }
          if (!pl) continue
          bezet.push(pl.v)
          labels.push(pl.v)
          if (metToon) {
            toon[i] = true
            kantNu[i] = pl.kant
          }
        }
        return bezet
      }
      const toon: boolean[] = []
      const kantNu: Kant[] = []
      const bezet = vasteVakken(P, true)
      if (kaartVak) bezet.push(kaartVak)

      // Een gekozen herinnering (tik, knop of muis) toont altijd zijn label.
      for (const i of geheugenIdx) {
        const n = knopen[i]
        if (!(gk === i || zw === i || (hr != null && n.herinnering === hr))) continue
        const nu = labelKant.current[i] ?? 'r'
        const pl = plaats(i, P[i], [nu, ...(['r', 'l', 'o'] as Kant[]).filter((x) => x !== nu)])
        if (!pl) continue
        toon[i] = true
        kantNu[i] = pl.kant
        bezet.push(pl.v)
      }
      // Een herinnering is vrij voor een label als hij naar voren staat, niet
      // in het brein opgaat, niet achter de hero-tekst valt en niets raakt.
      const vrij = (i: number, p: Pt, ruimte: Vak[], zMax: number, marge: number, kanten: Kant[] = ['r', 'l']) => {
        if (p.z > zMax || opgenomen(p).labelWeg) return null
        return plaats(i, p, kanten, (v) => {
          if (v.l < vrijLinks) return false
          const ruim = { l: v.l - marge, t: v.t - marge, r: v.r + marge, b: v.b + marge }
          return !ruimte.some((x) => raakt(ruim, x))
        })
      }

      // Het wisselende label. Niet onder reduced motion of Beweging uit, niet
      // tijdens slepen, en niet als je zelf een bron of herinnering koos.
      const w = wissel.current
      const sleept = Math.abs(c.vx) + Math.abs(c.vy) > 0.004
      const magWissel = !stilNu && !sleept && hr == null && (fc == null || fc === 'brein')
      if (!magWissel && w.i >= 0) {
        w.laatst.set(w.i, tijd)
        w.i = -1
        w.volgende = tijd + WISSEL_PAUZE
      }
      if (magWissel && w.i >= 0 && w.i !== zw) {
        const i = w.i
        // Met een marge, zodat het label weg is voordat iets het raakt (bij het
        // kiezen is de marge groter, anders gaat een net gekozen label meteen
        // weer uit). Het label blijft aan zijn kant: niet springen tijdens het
        // lezen.
        const pl = tijd < w.eind && !stilL[i] ? vrij(i, P[i], bezet, 5, 4, [labelKant.current[i] ?? 'r']) : null
        if (pl) {
          toon[i] = true
          kantNu[i] = pl.kant
          bezet.push(pl.v)
        } else {
          w.laatst.set(i, tijd)
          w.i = -1
          w.volgende = tijd + WISSEL_PAUZE
        }
      }
      if (magWissel && w.i < 0 && tijd >= w.volgende) {
        // Ook over WISSEL_DUUR nog vrij? Alleen na te rekenen als het brein
        // vanzelf draait; staat de camera stil, dan is nu gelijk aan straks.
        let straks: { P: Pt[]; bezet: Vak[] } | null = null
        if (c.doelYaw == null && gk == null) {
          const projT = maakProj(c.yaw + 0.00011 * WISSEL_DUUR, c.pitch)
          const PT = knopen.map((n) => projT(n.x, n.y, n.z))
          straks = { P: PT, bezet: vasteVakken(PT, false) }
        }
        let beste = -1
        let besteTijd = Infinity
        let bestePl: { v: Vak; kant: Kant } | null = null
        for (const i of geheugenIdx) {
          if (toon[i] || stilL[i] || (zichtL[i] ?? 0) < 0.3) continue
          const pl = vrij(i, P[i], bezet, -15, 8)
          if (!pl) continue
          if (straks && !vrij(i, straks.P[i], straks.bezet, -5, 4, [pl.kant])) continue
          const vorige = w.laatst.get(i) ?? -Infinity
          if (vorige < besteTijd) {
            besteTijd = vorige
            beste = i
            bestePl = pl
          }
        }
        if (beste >= 0 && bestePl) {
          w.i = beste
          w.eind = tijd + WISSEL_DUUR
          toon[beste] = true
          kantNu[beste] = bestePl.kant
          bezet.push(bestePl.v)
        } else {
          w.volgende = tijd + 400
        }
      }

      geheugenVorig.current = geheugenIdx
        .filter((i) => toon[i] && kantNu[i])
        .map((i) => vakVan(i, P[i], kantNu[i]))
        .filter((v): v is Plek => v != null)

      // Labels in hun eigen laag: plek, kant en diepte (alleen opacity). Een
      // label dat net uitging loopt nog mee tot het weg is.
      const labelVakNu: Vak[] = []
      for (const i of labelIdx) {
        const g = knoopEls.current[i]
        const lw = labelWrapEls.current[i]
        const el = labelEls.current[i]
        if (!g || !lw || !el) continue
        const n = knopen[i]
        const vorig = labelKant.current[i] ?? (n.soort === 'brein' ? 'm' : 'r')
        const kant = toon[i] && kantNu[i] ? kantNu[i] : vorig
        if (kant !== labelKant.current[i]) {
          el.setAttribute('text-anchor', kant === 'r' ? 'start' : kant === 'l' ? 'end' : 'middle')
          labelKant.current[i] = kant
          labelWissel.current[i] = tijd
        }
        const label = toon[i] ? '1' : '0'
        if (el.getAttribute('data-label') !== label) {
          el.setAttribute('data-label', label)
          if (!toon[i]) labelUit.current[i] = tijd
          labelWissel.current[i] = tijd
        }
        labelAanVorig.current[i] = !!toon[i]
        const puls = i === w.i ? '1' : '0'
        if (g.dataset.puls !== puls) {
          g.dataset.puls = puls
          stipEls.current[i]?.setAttribute('data-puls', puls)
          haloEls.current[i]?.setAttribute('data-puls', puls)
        }
        if (!zichtbaar(i) || (!toon[i] && tijd - (labelUit.current[i] ?? -1e9) > 700)) continue
        const pl = vakVan(i, P[i], kant)
        if (!pl) continue
        if (toon[i]) labelVakNu.push(pl)
        if (i === gk) ankerLabel.current = toon[i] ? { i, v: pl } : null
        lw.setAttribute('transform', `translate(${pl.ax.toFixed(1)} ${pl.by.toFixed(1)})`)
        const o = n.soort === 'brein' ? 1 : Math.min(1, 0.35 + 0.8 * (zichtL[i] ?? 1))
        if (Math.abs((labelZicht.current[i] ?? -1) - o) > 0.02) {
          labelZicht.current[i] = o
          lw.setAttribute('opacity', o.toFixed(2))
        }
      }

      labelVakVorig.current = labelVakNu

      // Data stroomt: een paar lichtpuntjes lopen rustig langs de lijn van een
      // bron naar het brein en gaan erin op. Alleen als er iets draait, en
      // alleen vanaf bronnen die je goed ziet (met een gekozen bron: alleen
      // die).
      const st = stroom.current
      stroomEls.current.forEach((el, s) => {
        if (!el) return
        const d = st[s]
        const verberg = () => {
          if (el.getAttribute('opacity') !== '0') el.setAttribute('opacity', '0')
        }
        if (stilNu || hr != null) {
          d.hub = -1
          verberg()
          return
        }
        if (d.hub >= 0 && tijd > d.start + d.duur) {
          d.hub = -1
          d.volgende = tijd + 600 + Math.random() * 1600
        }
        if (d.hub < 0) {
          if (tijd < d.volgende) return verberg()
          const kandidaten = hubIdx.filter(
            (i) =>
              !stilL[i] &&
              (zichtL[i] ?? 0) > 0.4 &&
              !opgenomen(P[i]).labelWeg &&
              (fc == null || fc === 'brein' || knopen[i].hub === fc) &&
              !st.some((x) => x.hub === i),
          )
          if (!kandidaten.length) {
            d.volgende = tijd + 500
            return verberg()
          }
          d.hub = kandidaten[Math.floor(Math.random() * kandidaten.length)]
          d.start = tijd
          d.duur = 2800 + Math.random() * 1000
        }
        const h = knopen[d.hub]
        const u = Math.min(1, (tijd - d.start) / d.duur)
        // Vanaf de rand van het glas, en zacht versnellend naar het brein.
        const e = 0.06 + 0.94 * u * u * (3 - 2 * u)
        const p = proj(h.x * (1 - e), h.y * (1 - e), h.z * (1 - e))
        const o = Math.min(1, u / 0.15) * opgenomen(p).zicht * Math.max(0.35, Math.min(1, p.s * 1.25 - 0.3))
        el.setAttribute('transform', `translate(${p.X.toFixed(1)} ${p.Y.toFixed(1)}) scale(${(p.s * k).toFixed(3)})`)
        el.setAttribute('opacity', o.toFixed(2))
      })

      // Langs de keten van een gekozen bron loopt per lijn een lichtpuntje van
      // de bron naar het meetpunt, om de beurt, steeds opnieuw. Onder reduced
      // motion of Beweging uit niet: dan staan alleen de lijnen stil te lichten.
      if (ketenStart.current.fc !== fc) ketenStart.current = { fc, tijd }
      const bronI = keten.length ? knopen.findIndex((n) => n.soort === 'hub' && n.hub === fc) : -1
      ketenEls.current.forEach((el, s) => {
        if (!el) return
        const naar = s < keten.length ? knopen.findIndex((n) => n.soort === 'hub' && n.hub === keten[s]) : -1
        if (stilNu || bronI < 0 || naar < 0) {
          if (el.getAttribute('opacity') !== '0') el.setAttribute('opacity', '0')
          return
        }
        // Op het scherm van rondje naar rondje, zodat het puntje ook aankomt
        // bij een rondje dat opzij is geschoven.
        const a = P[bronI]
        const b = P[naar]
        const loop = (tijd - ketenStart.current.tijd) / KETEN_DUUR - s * 0.16
        const u = loop < 0 ? 0 : loop % 1
        const e = u * u * (3 - 2 * u)
        const p = { X: a.X + (b.X - a.X) * e, Y: a.Y + (b.Y - a.Y) * e, s: a.s + (b.s - a.s) * e }
        const o = loop < 0 ? 0 : Math.sin(Math.PI * u) * Math.max(0.4, Math.min(1, p.s * 1.25 - 0.3))
        el.setAttribute('transform', `translate(${p.X.toFixed(1)} ${p.Y.toFixed(1)}) scale(${(p.s * k).toFixed(3)})`)
        el.setAttribute('opacity', o.toFixed(2))
      })

      // Diepte: dichtbij bovenop. Hoogstens om de 250 ms, en alleen de knopen
      // die echt van plek wisselen. Elke verplaatsing in de DOM breekt lopende
      // CSS-overgangen af; moveBefore (waar de browser het kent) niet. Het brein
      // staat in een eigen laag erboven en wordt nooit verplaatst.
      const svg = svgRef.current
      if (svg && tijd - laatsteSortering.current >= 250) {
        laatsteSortering.current = tijd
        const laag = svg.querySelector('[data-laag="knopen"]')
        if (laag) {
          const volgorde = knopen.map((_, i) => i).filter((i) => i !== 0).sort((a, b) => P[b].z - P[a].z)
          // moveBefore staat in de typen, maar nog niet in elke browser.
          const verplaats = laag as unknown as { moveBefore?: (n: Node, ref: Node | null) => void }
          let plek: ChildNode | null = laag.firstChild
          for (const i of volgorde) {
            const g = knoopEls.current[i]
            if (!g) continue
            if (g === plek) {
              plek = plek.nextSibling
              continue
            }
            if (typeof verplaats.moveBefore === 'function') {
              try {
                verplaats.moveBefore(g, plek)
                continue
              } catch {
                /* terugval hieronder */
              }
            }
            laag.insertBefore(g, plek)
          }
        }
      }
    },
    [knopen, lijnen, ketenVan, maat, middenX, middenY, schaal, vrijBoven, vrijLinks, geheugenIdx, labelIdx, hubIdx, rondIdx, maatVan],
  )

  // De lus. Hoogstens 30 beelden per seconde: bij deze draaisnelheid zie je
  // het verschil niet, en de hoofdthread houdt ruimte voor tikken. Camera en
  // traagheid rekenen met de verstreken tijd, niet per beeld. De lus start pas
  // als de browser na het laden tijd over heeft (requestIdleCallback).
  useEffect(() => {
    stilVoorkeur.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const html = document.documentElement
    const stil = () => stilVoorkeur.current || html.dataset.beweging === 'uit'
    let raf = 0
    let zichtbaar = true
    let gestart = false
    let vorige = performance.now()
    const tik = (nu: number) => {
      raf = 0
      if (!zichtbaar || stil()) return
      raf = requestAnimationFrame(tik)
      if (nu - vorige < 30) return
      const dt = Math.min(48, nu - vorige)
      vorige = nu
      const f = dt / 16.7
      const c = cam.current
      if (c.doelYaw != null) {
        let d = c.doelYaw - c.yaw
        d = Math.atan2(Math.sin(d), Math.cos(d))
        const naar = 1 - Math.pow(0.95, f)
        c.yaw += d * naar
        c.pitch += ((c.doelPitch ?? 0.18) - c.pitch) * naar
      } else if (gekozenRef.current == null && stand.current.herinnering == null && zweef.current == null) {
        c.yaw += 0.00011 * dt
        c.pitch += (0.18 - c.pitch) * (1 - Math.pow(0.99, f))
      }
      c.yaw += c.vx * f
      c.pitch = Math.max(-0.7, Math.min(0.7, c.pitch + c.vy * f))
      const wrijving = Math.pow(0.93, f)
      c.vx *= wrijving
      c.vy *= wrijving
      teken(nu)
    }
    const draai = () => {
      if (!gestart || raf || !zichtbaar || stil()) return
      vorige = performance.now() - 34
      raf = requestAnimationFrame(tik)
    }
    const io = new IntersectionObserver(([e]) => {
      zichtbaar = e.isIntersecting
      draai()
    })
    if (wrapRef.current) io.observe(wrapRef.current)
    // Knop Beweging uit of aan: stilzetten met een laatste stil beeld, of door.
    const mo = new MutationObserver(() => {
      if (stil()) teken(performance.now())
      else draai()
    })
    mo.observe(html, { attributes: true, attributeFilter: ['data-beweging'] })
    // requestIdleCallback staat in de typen, maar Safari kent hem nog niet.
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const begin = () => {
      gestart = true
      const nu = performance.now()
      // Het eerste wisselende label even na de start, niet meteen; de
      // lichtpuntjes een voor een.
      if (wissel.current.volgende === Infinity) wissel.current.volgende = nu + 1800
      stroom.current.forEach((d, s) => {
        if (d.volgende === Infinity) d.volgende = nu + 900 + s * 1300
      })
      draai()
    }
    const idle = w.requestIdleCallback ? w.requestIdleCallback(begin, { timeout: 1500 }) : 0
    const later = w.requestIdleCallback ? 0 : window.setTimeout(begin, 200)
    return () => {
      if (idle) w.cancelIdleCallback?.(idle)
      if (later) window.clearTimeout(later)
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
    }
  }, [teken])

  // Labels zijn gemeten in de lettervorm die er op dat moment was. Is het
  // webfont binnen, dan opnieuw meten.
  useEffect(() => {
    let weg = false
    document.fonts?.ready.then(() => {
      if (weg) return
      labelMaat.current = []
    })
    return () => {
      weg = true
    }
  }, [])

  useEffect(() => {
    tekenRef.current = teken
  }, [teken])

  // Onder reduced motion na elke wijziging een keer tekenen.
  // Ook bij een gekozen knoop, anders verschijnt het kaartje niet.
  // Zonder beweging twee keer: de plek van het label van de gekozen node
  // ontstaat pas in de eerste tekenbeurt, en de rondjes kunnen er pas in de
  // tweede voor uitwijken (Codex op #152).
  useEffect(() => {
    const t = performance.now()
    teken(t)
    if (stilVoorkeur.current || document.documentElement.dataset.beweging === 'uit') teken(t)
  }, [focus, gekozen, herinnering, teken])

  // Slepen met de muis; op een touchscherm niet, daar scrol je. Een korte tik
  // zonder verschuiven is een klik op een node (of ernaast: kaartje dicht).
  const sleep = useRef<{ x: number; y: number } | null>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY }
    if (e.pointerType !== 'mouse') return
    sleep.current = { x: e.clientX, y: e.clientY }
  }
  // Muis boven een herinnering: die toont zijn label. Draait er niets
  // (reduced motion, Beweging uit), dan hier zelf tekenen.
  const zetZweef = (i: number | null) => {
    if (zweef.current === i) return
    zweef.current = i
    if (stilVoorkeur.current || document.documentElement.dataset.beweging === 'uit') teken(performance.now())
  }
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && !sleep.current) {
      const el = (e.target as Element).closest('[data-knoop]')
      const i = el && (el as SVGElement).style.pointerEvents !== 'none' ? Number(el.getAttribute('data-knoop')) : null
      zetZweef(i != null && knopen[i]?.soort === 'geheugen' ? i : null)
      return
    }
    if (!sleep.current) return
    const dx = e.clientX - sleep.current.x
    const dy = e.clientY - sleep.current.y
    sleep.current = { x: e.clientX, y: e.clientY }
    cam.current.vx = dx * 0.0016
    cam.current.vy = dy * 0.0012
    cam.current.doelYaw = null
  }
  const onUp = (e: React.PointerEvent) => {
    sleep.current = null
    const s0 = start.current
    start.current = null
    if (!s0 || Math.hypot(e.clientX - s0.x, e.clientY - s0.y) > 6) return
    if ((e.target as Element).closest('[data-kaart]')) return
    const el = (e.target as Element).closest('[data-knoop]')
    if (!el || (el as SVGElement).style.pointerEvents === 'none') {
      setGekozen(null)
      onSluitRef.current?.()
      return
    }
    const i = Number(el.getAttribute('data-knoop'))
    const n = knopen[i]
    const volgende = gekozenRef.current === i ? null : i
    setGekozen(volgende)
    if (n.soort === 'hub' || n.soort === 'brein' || n.soort === 'advisor') onKiesHub?.(n.hub)
    else if (n.soort === 'geheugen' && n.herinnering != null) onKiesHerinnering?.(volgende == null ? null : n.herinnering)
  }
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGekozen(null)
        onSluitRef.current?.()
      }
    }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  const kaartInhoud = (() => {
    if (gekozen == null) return null
    const n = knopen[gekozen]
    if (n.soort === 'geheugen' && n.herinnering != null) {
      const h = HERINNERINGEN[n.herinnering]
      return { soort: `Voorbeeld, ${h.soort.toLowerCase()}`, titel: h.kort, wanneer: h.wanneer ?? '', tekst: h.uitleg, actie: h.actie }
    }
    if (n.soort === 'hub') {
      const b = BRONNEN.find((x) => x.id === n.hub)
      const meting = METINGEN[n.hub as BronId]
      return { soort: 'Bron', titel: b?.label ?? '', wanneer: '', tekst: b?.uitleg ?? '', meting }
    }
    if (n.soort === 'brein') return { soort: 'Stevin', titel: BREIN.label, wanneer: '', tekst: BREIN.uitleg }
    if (n.soort === 'advisor') return { soort: 'Stevin', titel: ADVISOR.label, wanneer: '', tekst: ADVISOR.uitleg }
    if (n.soort === 'sat') {
      const b = BRONNEN.find((x) => x.id === n.hub)
      return { soort: b?.label ?? 'Bron', titel: n.label ?? '', wanneer: '', tekst: '' }
    }
    return null
  })()

  // Een bron of de Advisor: een klein glazen rondje met donkere, doorzichtige
  // vulling, een glans bovenin, een zachte gloed en een dunne lichte rand,
  // met het logo of de glyph erin.
  const tekenGlas = (n: Knoop, i: number) => {
    const beeld = BEELD[n.hub as BronId | 'advisor']
    const b = n.r * 1.15
    return (
      <>
        {/* Alleen de raakcirkel vangt een tik: de gloed (bijna twee keer zo
            groot) ving anders tikken op de context rond Marktsignalen. */}
        <circle r={n.r * 1.8} fill={`url(#${glasGloedId})`} pointerEvents="none" />
        <circle r={n.r} fill={`url(#${glasVulId})`} pointerEvents="none" />
        <circle r={n.r} fill={`url(#${glasGlansId})`} pointerEvents="none" />
        {beeld && 'logo' in beeld ? (
          <image href={beeld.logo} x={-b / 2} y={-b / 2} width={b} height={b} preserveAspectRatio="xMidYMid meet" pointerEvents="none" />
        ) : beeld ? (
          <g className="su-glyph" pointerEvents="none" transform={`scale(${(n.r * 1.1) / 24}) translate(-12 -12)`}>
            <GlyphPaden glyph={beeld.glyph} />
          </g>
        ) : null}
        <circle
          ref={(el) => {
            stipEls.current[i] = el
          }}
          r={n.r}
          className="su-glas"
          pointerEvents="none"
        />
      </>
    )
  }

  const tekenKnoop = (n: Knoop, i: number) => {
    const glas = n.soort === 'hub' || n.soort === 'advisor'
    return (
      <g
        key={n.id}
        ref={(el) => {
          knoopEls.current[i] = el
        }}
        className={`su-knoop su-${n.soort}`}
        opacity={0}
        data-knoop={n.soort === 'stof' || (n.soort === 'geheugen' && n.herinnering == null) ? undefined : i}
      >
        {/* Groter raakvlak dan de stip, anders raak je hem op een telefoon niet */}
        {n.soort !== 'stof' && !(n.soort === 'geheugen' && n.herinnering == null) && (
          <circle
            ref={(el) => {
              raakEls.current[i] = el
            }}
            r={n.soort === 'brein' ? n.r + 6 : Math.max(12, n.r + 8)}
            fill="transparent"
            className="cursor-pointer"
          />
        )}
        {n.soort === 'brein' && <circle r={n.r * 3.4} fill={`url(#${breinId})`} className="su-ademen" />}
        {n.soort === 'brein' && (
          <circle
            ref={(el) => {
              ringEl.current = el
            }}
            r={n.r}
            fill="none"
            stroke="#3D8EFF"
            strokeWidth={2}
            opacity={0}
            className="su-hartslag"
          />
        )}
        {(glas || n.soort === 'sat' || n.soort === 'geheugen') && (
          <circle
            ref={(el) => {
              haloEls.current[i] = el
            }}
            r={n.r * (glas ? 2.2 : 3.2)}
            fill={`url(#${gloedId})`}
            className="su-halo"
            pointerEvents="none"
          />
        )}
        {glas && tekenGlas(n, i)}
        {/* Het brein heeft geen stip: het Stevin-icoon staat los op het donkere
            vlak, nooit in een gekleurd rondje. */}
        {!glas && n.soort !== 'brein' && (
          <circle
            ref={(el) => {
              stipEls.current[i] = el
            }}
            r={n.r}
            className="su-stip"
          />
        )}
        {n.soort === 'brein' && (
          // Het Stevin-icoon uit public/logos/logo-icon.svg (48x48), wit op donker.
          <g transform="scale(0.78) translate(-24 -24)" fill="#FFFFFF">
            <rect x={6} y={7} width={30} height={14} rx={4} />
            <rect x={12} y={27} width={30} height={14} rx={4} />
          </g>
        )}
      </g>
    )
  }

  return (
    <div
      ref={wrapRef}
      className={`su-wrap relative h-full w-full select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={() => {
        sleep.current = null
        start.current = null
      }}
      onPointerLeave={() => zetZweef(null)}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${maat.w} ${maat.h}`}
        className="block cursor-grab active:cursor-grabbing"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={gloedId}>
            <stop offset="0%" stopColor="#3D8EFF" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#3D8EFF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#3D8EFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={breinId}>
            <stop offset="0%" stopColor="#3D8EFF" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#3D8EFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3D8EFF" stopOpacity="0" />
          </radialGradient>
          {/* Glas: donker en doorzichtig, iets lichter bovenin. */}
          <radialGradient id={glasVulId} cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#1E3A66" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#0A1628" stopOpacity="0.86" />
          </radialGradient>
          <linearGradient id={glasGlansId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={glasGloedId}>
            <stop offset="50%" stopColor="#3D8EFF" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#3D8EFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={stroomId}>
            <stop offset="0%" stopColor="#CFE4FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3D8EFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g data-laag="lijnen">
          {lijnen.map((_, i) => (
            <line key={i} ref={(el) => { lijnEls.current[i] = el }} stroke="#3D8EFF" strokeOpacity={0} strokeWidth={0.8} />
          ))}
        </g>
        {/* Lichtpuntjes van bron naar brein; een vaste gloed, geen filter. */}
        <g data-laag="stroom">
          {Array.from({ length: STROOM }, (_, i) => (
            <g key={i} ref={(el) => { stroomEls.current[i] = el }} opacity={0}>
              <circle r={5} fill={`url(#${stroomId})`} />
              <circle r={1.5} fill="#EAF3FF" />
            </g>
          ))}
        </g>
        {/* Lichtpuntjes langs de keten van een gekozen bron. */}
        <g data-laag="keten">
          {Array.from({ length: KETEN_MAX }, (_, i) => (
            <g key={i} ref={(el) => { ketenEls.current[i] = el }} opacity={0}>
              <circle r={6} fill={`url(#${stroomId})`} />
              <circle r={1.8} fill="#EAF3FF" />
            </g>
          ))}
        </g>
        <g data-laag="knopen">{knopen.map((n, i) => (n.soort === 'brein' ? null : tekenKnoop(n, i)))}</g>
        {/* Het brein in een eigen laag boven de knopen: altijd bovenop, en de
            dieptesortering verplaatst het nooit (dan blijft het ademen lopen). */}
        <g data-laag="brein">{tekenKnoop(knopen[0], 0)}</g>
        {/* Labels boven alles, zonder schaal: altijd even groot. */}
        <g data-laag="labels">
          {labelIdx.map((i) => {
            const n = knopen[i]
            return (
              <g
                key={n.id}
                ref={(el) => {
                  labelWrapEls.current[i] = el
                }}
                className={`su-lw su-lw-${n.soort}`}
                data-knoop={i}
              >
                <text
                  ref={(el) => {
                    labelEls.current[i] = el
                  }}
                  className="su-label"
                  // Bij het begin staat elk label uit; anders flitsen ze bij het laden op.
                  data-label="0"
                  textAnchor={n.soort === 'brein' ? 'middle' : 'start'}
                >
                  {hoofd(n.label ?? '')}
                </text>
              </g>
            )
          })}
        </g>
      </svg>

      {/* Het kaartje bij een aangeklikte node: een statusregel (leest voor
          wat er verschijnt), geen dialoog, want de focus gaat er niet heen. */}
      <div
        ref={kaartRef}
        data-kaart
        role="status"
        className="su-kaart pointer-events-auto absolute left-0 top-0 w-[min(288px,calc(100%-16px))] rounded-2xl border border-white/15 bg-[#0F1F38]/95 p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur"
        style={{ opacity: 0, visibility: kaartInhoud ? 'visible' : 'hidden' }}
      >
        {kaartInhoud && 'meting' in kaartInhoud && kaartInhoud.meting ? (
          // Een bron met een keten: naam, een regel wat het is, en wat we meten
          // (Koen, 11 okt 21:51). Geen soortregel erboven: hoogstens drie
          // regels plus de keten.
          <>
            <div className="flex items-start justify-between gap-3">
              <p className="m-0 font-display text-[16px] font-bold leading-snug text-white">{kaartInhoud.titel}</p>
              <SluitKnop
                onClick={() => {
                  setGekozen(null)
                  onSluitRef.current?.()
                }}
              />
            </div>
            <p className="m-0 mt-1 text-[13.5px] leading-snug text-white/75">{kaartInhoud.tekst}</p>
            <MetingBlok meting={kaartInhoud.meting} />
          </>
        ) : kaartInhoud && (
          <>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#3D8EFF]">{kaartInhoud.soort}</span>
              <SluitKnop
                onClick={() => {
                  setGekozen(null)
                  onSluitRef.current?.()
                }}
              />
            </div>
            <p className="m-0 font-display text-[16px] font-bold leading-snug text-white">{kaartInhoud.titel}</p>
            {kaartInhoud.wanneer && <p className="m-0 mt-0.5 text-[12.5px] text-white/50">{kaartInhoud.wanneer}</p>}
            {kaartInhoud.tekst && <p className="m-0 mt-2 text-[14px] leading-snug text-white/80">{kaartInhoud.tekst}</p>}
            {'actie' in kaartInhoud && kaartInhoud.actie && (
              <p className="m-0 mt-1.5 text-[14px] leading-snug text-[#3D8EFF]">
                <span className="sr-only">Wat we doen: </span>
                {kaartInhoud.actie}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
