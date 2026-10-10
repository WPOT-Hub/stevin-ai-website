'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { BronId } from './netwerk'
import { BRONNEN, BREIN, ADVISOR } from './netwerk'

/**
 * Het Stevin-brein in 3D (W-535, richting C).
 *
 * Aanleiding: Koen, 10 okt 23:00, "geen wow factor". Nagekeken hoe swoep.ai
 * het doet: geen bibliotheek, een eigen 3D-projectie op SVG met draaien,
 * traagheid, perspectief en een camera. Dat doen wij hier ook, zonder nieuwe
 * afhankelijkheid, maar met ons eigen verhaal: elke grote node is een bron met
 * een naam, kleine nodes zijn wat erin zit (Google Ads in Campagnes, Gemist in
 * Telefonie), en bij een vraag lichten de juiste bronnen op, lopen er pulsen
 * naar het brein, verschijnt er een signaal en licht de Advisor op.
 *
 * Prestaties: React tekent de elementen een keer; de animatielus zet alleen
 * attributen via refs. Buiten beeld stopt de lus (IntersectionObserver). Onder
 * prefers-reduced-motion draait er niets en staat er een stil beeld.
 * Toegankelijkheid: de SVG is decoratie (aria-hidden); de bediening staat in
 * gewone knoppen die de ouder tekent.
 */

export type UniversumFase = 'rust' | 'bronnen' | 'brein' | 'signaal' | 'advies'
type HubId = BronId | 'brein' | 'advisor'

interface Props {
  fase?: UniversumFase
  actieveBronnen?: BronId[]
  focus?: HubId | null
  signaal?: string
  /** Middelpunt van het brein als fractie van de breedte (ruimte voor tekst links). */
  middenX?: number
  middenY?: number
  /** Schaal ten opzichte van de kleinste zijde. */
  schaal?: number
  className?: string
  /** Klik op een bron, het brein of de Advisor in het beeld. */
  onKiesHub?: (id: HubId) => void
}

const SATELLIETEN: Partial<Record<BronId, string[]>> = {
  campagnes: ['Google Ads', 'Meta', 'LinkedIn', 'TikTok', 'YouTube'],
  website: ['Formulieren', 'Bezoek', "Landingspagina's"],
  klantgegevens: ['Klanten', 'Eerdere orders'],
  telefonie: ['Gesprekken', 'Gemist', 'Herkomst'],
  crm: ['Deals', 'Taken', 'Opvolging'],
  offertes: ['Verstuurd', 'Getekend'],
  verkoop: ['Omzet', 'Nieuwe klanten'],
  markt: ['Zoekvraag', 'Seizoen', 'Concurrenten'],
  doelen: ['Omzetdoel', 'Regio'],
  doelgroepen: ['Particulier', 'Zakelijk'],
}

// Wat Stevin onthoudt van het voorbeeldbedrijf (verzonnen installatiebedrijf,
// dezelfde als in de vraagdemo). Koen, 10 okt 23:25: "aan het brein hangt veel
// meer, zie de oude nodes". Het oude brein (StevinBrainVisual) toonde 108
// herinneringen; dit is dezelfde gedachte met het verhaal van deze pagina.
// Een deel heeft een label en licht om de beurt op, de rest is massa.
// Kort label in beeld, de rest op een kaartje als je erop klikt (Koen, 11 okt
// 01:07: "dit is te lang, zoals de eerdere nodes moet je erop kunnen klikken").
interface Herinnering {
  kort: string
  soort: 'Campagne' | 'Resultaat' | 'Afspraak' | 'Kennis' | 'Doel' | 'Marktsignaal'
  wanneer: string
  uitleg: string
  bijVraag?: boolean
}
const HERINNERINGEN: Herinnering[] = [
  { kort: 'Airco zomer 2026', soort: 'Campagne', wanneer: 'jun tot aug 2026', uitleg: '41 aanvragen in zes weken, vooral via Google. Elf werden een offerte, zes een klant.' },
  { kort: 'Warmtepomp najaar', soort: 'Resultaat', wanneer: 'sep 2026', uitleg: 'Van aanvraag tot offerte duurt gemiddeld negen dagen. Het doel is vijf.' },
  { kort: 'Terugbelafspraak', soort: 'Afspraak', wanneer: 'sinds jan 2026', uitleg: 'Elke aanvraag wordt binnen een werkdag teruggebeld. Wie belt, zet het in het CRM.', bijVraag: true },
  { kort: 'Opvolging september', soort: 'Resultaat', wanneer: 'sep 2026', uitleg: 'Twee aanvragen zonder opvolging. Een van die twee koos later voor een ander bedrijf.', bijVraag: true },
  { kort: 'Doel 2026', soort: 'Doel', wanneer: '2026', uitleg: 'Dertig procent meer zakelijke klanten, vooral VvE\'s en kantoren in de eigen regio.' },
  { kort: 'Dakkapellen', soort: 'Kennis', wanneer: 'laatste 12 maanden', uitleg: 'De meeste aanvragen komen uit Zwolle en Kampen.' },
  { kort: 'Drukke maandag', soort: 'Kennis', wanneer: 'laatste 8 weken', uitleg: 'Op maandag komt een derde van de telefoontjes binnen. Dan worden er ook de meeste gemist.', bijVraag: true },
  { kort: 'Zonnepanelen', soort: 'Resultaat', wanneer: '2026', uitleg: 'Minder aanvragen dan vorig jaar. In april is het budget verschoven naar warmtepompen.' },
  { kort: 'Badkamers', soort: 'Resultaat', wanneer: 'laatste 6 maanden', uitleg: 'Een op de drie offertes wordt getekend, gemiddeld voor 11.400 euro.' },
  { kort: 'Jouw bedrijfsnaam', soort: 'Marktsignaal', wanneer: 'sinds sep 2026', uitleg: 'Een concurrent adverteert op zoekopdrachten met jouw bedrijfsnaam.' },
  { kort: 'Herfstvakantie', soort: 'Kennis', wanneer: 'okt 2025', uitleg: 'Meer bezoek op de website, minder aanvragen. Mensen kijken rond, ze kopen nog niet.' },
  { kort: 'Kozijnen voorjaar', soort: 'Campagne', wanneer: 'mrt tot mei 2026', uitleg: 'Veel klikken, weinig offertes. De aanvragen kwamen vooral van huurders.' },
  { kort: 'Wie volgt op', soort: 'Afspraak', wanneer: 'sinds mrt 2026', uitleg: 'Ruud belt de telefoontjes terug, Sanne pakt de aanvragen via de website op.', bijVraag: true },
  { kort: 'Goede klant', soort: 'Kennis', wanneer: '2026', uitleg: 'Eigen woning, budget boven 8.000 euro, binnen 40 kilometer.' },
  { kort: 'Pagina warmtepomp', soort: 'Kennis', wanneer: 'jun 2026', uitleg: 'In juni vernieuwd. Sindsdien vult een groter deel van de bezoekers het formulier in.' },
  { kort: 'Zoeken op je naam', soort: 'Marktsignaal', wanneer: 'laatste 12 maanden', uitleg: 'Het aantal mensen dat op je bedrijfsnaam zoekt, is stabiel.' },
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

function bouwKnopen(): { knopen: Knoop[]; lijnen: [number, number][] } {
  const r = rng(535)
  const knopen: Knoop[] = []
  const lijnen: [number, number][] = []
  knopen.push({ id: 'brein', hub: 'brein', soort: 'brein', label: BREIN.label, x: 0, y: 0, z: 0, r: 26 })
  knopen.push({ id: 'advisor', hub: 'advisor', soort: 'advisor', label: ADVISOR.label, x: 190, y: -30, z: 50, r: 15 })
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
      r: 7.5,
    }
    const hi = knopen.push(hub) - 1
    lijnen.push([hi, 0])

    const sats = SATELLIETEN[b.id] ?? []
    const totaal = sats.length
    for (let s = 0; s < totaal; s++) {
      const a = r() * Math.PI * 2
      const e = (r() - 0.5) * Math.PI
      const d = 46 + r() * 46
      const naar = 1.18
      const k: Knoop = {
        id: `${b.id}-${s}`,
        hub: b.id,
        soort: s < sats.length ? 'sat' : 'stof',
        label: s < sats.length ? sats[s] : undefined,
        x: hub.x * naar + Math.cos(a) * Math.cos(e) * d,
        y: hub.y * naar + Math.sin(e) * d,
        z: hub.z * naar + Math.sin(a) * Math.cos(e) * d,
        r: s < sats.length ? 3.6 : 2,
      }
      const ki = knopen.push(k) - 1
      lijnen.push([ki, hi])
    }
  })

  // Geen dwarsverbanden tussen bronnen: Koen vond het eerste 3D-beeld te druk
  // (10 okt, 23:21). Alles loopt via het brein, en dat is ook het verhaal.

  // De geheugenwolk: dicht om het brein, binnen de bronnen. Labels alleen bij
  // de eerste 16, en die lichten om de beurt op.
  const WOLK = 96
  const wolkStart = knopen.length
  for (let s = 0; s < WOLK; s++) {
    const a = r() * Math.PI * 2
    const e = Math.acos(2 * r() - 1) - Math.PI / 2
    const d = 46 + Math.pow(r(), 0.8) * 120
    const heeftLabel = s < HERINNERINGEN.length
    knopen.push({
      id: `geheugen-${s}`,
      hub: 'brein',
      soort: 'geheugen',
      herinnering: heeftLabel ? s : undefined,
      label: heeftLabel ? HERINNERINGEN[s].kort : undefined,
      x: Math.cos(a) * Math.cos(e) * d,
      y: Math.sin(e) * d * 0.85,
      z: Math.sin(a) * Math.cos(e) * d,
      r: heeftLabel ? 2.8 : 1.6 + r() * 1.2,
    })
  }
  // Dunne verbanden tussen herinneringen die dicht bij elkaar liggen: zo voelt
  // het als een netwerk en niet als een stofwolk.
  for (let i = wolkStart; i < knopen.length; i++) {
    let beste = -1
    let afstand = Infinity
    for (let j = wolkStart; j < knopen.length; j++) {
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
    if (beste > i || r() < 0.35) lijnen.push([i, beste])
    if (r() < 0.22) lijnen.push([i, 0])
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
  return { knopen, lijnen }
}

const F = 760 // brandpuntsafstand van de camera

export default function StevinUniversum({
  fase = 'rust',
  actieveBronnen = [],
  focus = null,
  signaal,
  middenX = 0.5,
  middenY = 0.5,
  schaal = 1,
  className = '',
  onKiesHub,
}: Props) {
  const { knopen, lijnen } = useMemo(bouwKnopen, [])
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const knoopEls = useRef<(SVGGElement | null)[]>([])
  const lijnEls = useRef<(SVGLineElement | null)[]>([])
  const pulsEls = useRef<(SVGCircleElement | null)[]>([])
  const signaalEl = useRef<SVGGElement | null>(null)
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
  // Eigen ids per instantie: er staan er meerdere op de pagina, en een verloop
  // in een verborgen SVG wordt in Chrome niet getekend in een andere.
  const uid = useId().replace(/:/g, '')
  const gloedId = `su-gloed-${uid}`
  const breinId = `su-brein-${uid}`

  // Camera en invoer leven in een ref: de lus mag React niet laten hertekenen.
  const cam = useRef({ yaw: -0.5, pitch: 0.18, vx: 0, vy: 0, doelYaw: null as number | null, doelPitch: null as number | null })
  const stand = useRef({ fase, actieveBronnen, focus })
  stand.current = { fase, actieveBronnen, focus }

  // Camera draait naar de gekozen node.
  useEffect(() => {
    // Bij een vraag: zijaanzicht, zodat brein, signaal en Advisor van links
    // naar rechts staan en elkaar niet bedekken.
    if (!focus && fase !== 'rust') {
      const a = knopen[1]
      cam.current.doelYaw = Math.atan2(a.z, a.x)
      cam.current.doelPitch = 0.12
      return
    }
    const doel = focus ? knopen.find((k) => k.id === focus) : null
    if (!doel || doel.id === 'brein') {
      cam.current.doelYaw = null
      cam.current.doelPitch = null
      return
    }
    const yaw = Math.atan2(doel.x, -doel.z)
    const z1 = -doel.x * Math.sin(yaw) + doel.z * Math.cos(yaw)
    cam.current.doelYaw = yaw
    cam.current.doelPitch = Math.max(-0.6, Math.min(0.6, Math.atan(doel.y / z1)))
  }, [focus, fase, knopen])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setMaat({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const teken = useCallback(
    (tijd: number) => {
      const { yaw, pitch } = cam.current
      const { fase: f, actieveBronnen: actief, focus: fc } = stand.current
      const bezig = f !== 'rust'
      const cx = maat.w * middenX
      const cy = maat.h * middenY
      const k = (Math.min(maat.w, maat.h) / 620) * schaal
      const cy0 = Math.cos(yaw)
      const sy0 = Math.sin(yaw)
      const cp = Math.cos(pitch)
      const sp = Math.sin(pitch)

      const proj = (x: number, y: number, z: number) => {
        const x1 = x * cy0 + z * sy0
        const z1 = -x * sy0 + z * cy0
        const y2 = y * cp - z1 * sp
        const z2 = y * sp + z1 * cp
        const s = F / (F + z2 * 1.0)
        return { X: cx + x1 * s * k, Y: cy + y2 * s * k, s, z: z2 }
      }

      const P = knopen.map((n) => proj(n.x, n.y, n.z))

      const breinFase = f === 'brein' || f === 'signaal' || f === 'advies'
      // Om de 3,2 seconden licht een herinnering op, in rust.
      // In de brein-stand twee tegelijk, anders een.
      const stap = Math.floor(tijd / 3200) % HERINNERINGEN.length
      const uitgelicht = !bezig && (fc == null || fc === 'brein') ? stap : -1
      const uitgelicht2 = !bezig && fc === 'brein' ? (stap + 8) % HERINNERINGEN.length : -1
      const gk = gekozenRef.current
      const isAan = (n: Knoop) =>
        (gk != null && knopen[gk] === n) ||
        (n.soort === 'geheugen' &&
          n.herinnering != null &&
          ((breinFase && HERINNERINGEN[n.herinnering].bijVraag) ||
            n.herinnering === uitgelicht ||
            n.herinnering === uitgelicht2)) ||
        (n.soort === 'brein' && breinFase) ||
        (n.soort === 'advisor' && f === 'advies') ||
        (bezig && n.hub !== 'brein' && n.hub !== 'advisor' && actief.includes(n.hub as BronId) && n.soort !== 'stof') ||
        (fc != null && n.hub === fc && n.soort !== 'stof' && n.soort !== 'geheugen')
      // Kleine nodes (wat er in een bron zit) alleen tonen als die bron meedoet.
      const zichtbaar = (n: Knoop) => n.soort !== 'sat' || isAan(n) || fc === n.hub
      const isStil = (n: Knoop) =>
        (fc != null && n.hub !== fc && n.soort !== 'brein' && n.soort !== 'geheugen') ||
        (fc != null && fc !== 'brein' && n.soort === 'geheugen') ||
        (bezig && fc == null && n.soort !== 'brein' && n.soort !== 'advisor' && !actief.includes(n.hub as BronId))

      // Lijnen
      lijnen.forEach(([a, b], i) => {
        const el = lijnEls.current[i]
        if (!el) return
        const pa = P[a]
        const pb = P[b]
        el.setAttribute('x1', pa.X.toFixed(1))
        el.setAttribute('y1', pa.Y.toFixed(1))
        el.setAttribute('x2', pb.X.toFixed(1))
        el.setAttribute('y2', pb.Y.toFixed(1))
        const diepte = Math.max(0.15, Math.min(1, (pa.s + pb.s) / 2 - 0.35))
        const aan = isAan(knopen[a]) && isAan(knopen[b])
        const stil = isStil(knopen[a]) || isStil(knopen[b])
        el.setAttribute('stroke', aan ? '#5DA3FF' : '#93C5FD')
        const weg = !zichtbaar(knopen[a]) || !zichtbaar(knopen[b])
        const wolk = knopen[a].soort === 'geheugen' || knopen[b].soort === 'geheugen'
        el.setAttribute(
          'stroke-opacity',
          (weg ? 0 : aan ? 0.85 : stil ? 0.04 : wolk ? 0.09 * diepte : 0.13 * diepte).toFixed(3),
        )
        el.setAttribute('stroke-width', aan ? '1.4' : '0.8')
      })

      // Het brein neemt op wat ervoor langs komt: nodes vervagen vlak bij het
      // brein, en hun labels verdwijnen al eerder. Anders bedekt een bron het
      // Stevin-icoon (Koen, 11 okt 01:22: "het Stevin-icoon verdwijnt, zouden
      // moeten mergen").
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
      knopen.forEach((n, i) => {
        const g = knoopEls.current[i]
        if (!g) return
        const p = P[i]
        const aan = isAan(n)
        const stil = isStil(n)
        const diepte = Math.max(0.12, Math.min(1, p.s * 1.25 - 0.35))
        const bijBrein = n.soort === 'brein' ? { zicht: 1, labelWeg: false } : opgenomen(p)
        const extra = n.soort === 'brein' ? 1 + slag : 1
        g.setAttribute('transform', `translate(${p.X.toFixed(1)} ${p.Y.toFixed(1)}) scale(${(p.s * k * extra).toFixed(3)})`)
        if (n.soort === 'brein') {
          const ring = g.querySelector<SVGCircleElement>('.su-hartslag')
          if (ring) {
            const ok = t >= 0 && t <= 1
            ring.setAttribute('r', (n.r * (1 + (ok ? t : 0) * 1.4)).toFixed(1))
            ring.setAttribute('opacity', ok ? (0.7 * (1 - t)).toFixed(2) : '0')
          }
        }
        g.setAttribute(
          'opacity',
          ((!zichtbaar(n)
            ? 0
            : stil
              ? 0.16
              : n.soort === 'stof'
                ? 0.35 * diepte
                : n.soort === 'geheugen' && !aan
                  ? 0.3 + 0.55 * diepte
                  : Math.max(0.3, diepte)
          ) * bijBrein.zicht
          ).toFixed(3),
        )
        g.dataset.aan = aan ? '1' : '0'
        // Labels alleen aan de voorkant van de bol, of als de node meedoet.
        const voor = p.z < 30
        const labelZichtbaar =
          n.soort === 'brein' ||
          (aan && n.soort !== 'sat' && n.soort !== 'geheugen') ||
          (aan && n.soort === 'geheugen' && (!bezig || f === 'brein')) ||
          fc === n.hub ||
          ((n.soort === 'hub' || n.soort === 'advisor') && voor && !stil)
        g.dataset.label = labelZichtbaar && !bijBrein.labelWeg ? '1' : '0'
      })

      // Kaartje bij de gekozen node, binnen het vlak gehouden.
      const kaart = kaartRef.current
      if (kaart) {
        if (gk == null) {
          kaart.style.opacity = '0'
        } else {
          const p = P[gk]
          const kb = kaart.offsetWidth || 260
          const kh = kaart.offsetHeight || 120
          const x = Math.max(8, Math.min(maat.w - kb - 8, p.X + 14))
          const boven = p.Y - kh - 14
          const y = boven > 8 ? boven : Math.min(maat.h - kh - 8, p.Y + 14)
          kaart.style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`
          kaart.style.opacity = '1'
        }
      }

      // Pulsen van actieve bronnen naar het brein
      const loopt = f === 'bronnen' || f === 'brein'
      pulsEls.current.forEach((el, i) => {
        if (!el) return
        const bron = actief[i]
        if (!loopt || !bron) {
          el.setAttribute('opacity', '0')
          return
        }
        const h = knopen.find((n) => n.id === bron)!
        const t = ((tijd / 1100 + i * 0.21) % 1)
        const p = proj(h.x * (1 - t), h.y * (1 - t), h.z * (1 - t))
        el.setAttribute('cx', p.X.toFixed(1))
        el.setAttribute('cy', p.Y.toFixed(1))
        el.setAttribute('r', (3.2 * p.s * k).toFixed(2))
        el.setAttribute('opacity', (Math.sin(t * Math.PI) * 0.95).toFixed(2))
      })

      // Signaal halverwege brein en Advisor
      if (signaalEl.current) {
        const a = knopen[1]
        const p = proj(a.x * 0.5, a.y * 0.5, a.z * 0.5)
        const zichtbaar = f === 'signaal' || f === 'advies'
        signaalEl.current.setAttribute('transform', `translate(${p.X.toFixed(1)} ${p.Y.toFixed(1)}) scale(${(p.s * k).toFixed(3)})`)
        signaalEl.current.setAttribute('opacity', zichtbaar ? '1' : '0')
      }

      // Diepte: dichtbij bovenop. Elke paar frames de volgorde bijwerken.
      const svg = svgRef.current
      if (svg && Math.floor(tijd / 120) % 2 === 0) {
        const laag = svg.querySelector('[data-laag="knopen"]')
        if (laag) {
          const volgorde = knopen.map((_, i) => i).sort((a, b) => P[b].z - P[a].z)
          volgorde.forEach((i) => {
            const g = knoopEls.current[i]
            if (g && i !== 0) laag.appendChild(g)
          })
          // Het brein altijd bovenop, zodat het icoon nooit wordt bedekt.
          const brein = knoopEls.current[0]
          if (brein) laag.appendChild(brein)
        }
      }
    },
    [knopen, lijnen, maat, middenX, middenY, schaal],
  )

  // De lus
  useEffect(() => {
    const stilVoorkeur = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let zichtbaar = true
    let vorige = performance.now()
    const tik = (nu: number) => {
      const dt = Math.min(48, nu - vorige)
      vorige = nu
      const c = cam.current
      if (!stilVoorkeur) {
        if (c.doelYaw != null) {
          let d = c.doelYaw - c.yaw
          d = Math.atan2(Math.sin(d), Math.cos(d))
          c.yaw += d * 0.05
          c.pitch += ((c.doelPitch ?? 0.18) - c.pitch) * 0.05
        } else if (gekozenRef.current == null) {
          c.yaw += 0.00011 * dt
          c.pitch += (0.18 - c.pitch) * 0.01
        }
        c.yaw += c.vx
        c.pitch = Math.max(-0.7, Math.min(0.7, c.pitch + c.vy))
        const wrijving = Math.pow(0.93, dt / 16.7)
        c.vx *= wrijving
        c.vy *= wrijving
      }
      teken(nu)
      if (zichtbaar && !stilVoorkeur) raf = requestAnimationFrame(tik)
    }
    const io = new IntersectionObserver(([e]) => {
      const was = zichtbaar
      zichtbaar = e.isIntersecting
      if (zichtbaar && !was && !stilVoorkeur) {
        vorige = performance.now()
        raf = requestAnimationFrame(tik)
      }
    })
    if (wrapRef.current) io.observe(wrapRef.current)
    raf = requestAnimationFrame(tik)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [teken])

  // Onder reduced motion na elke wijziging een keer tekenen.
  useEffect(() => {
    teken(performance.now())
  }, [fase, actieveBronnen, focus, teken])

  // Slepen met de muis; op een touchscherm niet, daar scrol je. Een korte tik
  // zonder verschuiven is een klik op een node (of ernaast: kaartje dicht).
  const sleep = useRef<{ x: number; y: number } | null>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY }
    if (e.pointerType !== 'mouse') return
    sleep.current = { x: e.clientX, y: e.clientY }
  }
  const onMove = (e: React.PointerEvent) => {
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
    if (!el) {
      setGekozen(null)
      return
    }
    const i = Number(el.getAttribute('data-knoop'))
    const n = knopen[i]
    setGekozen((g) => (g === i ? null : i))
    if (n.soort === 'hub' || n.soort === 'brein' || n.soort === 'advisor') onKiesHub?.(n.hub)
  }
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGekozen(null)
    }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  const kaartInhoud = (() => {
    if (gekozen == null) return null
    const n = knopen[gekozen]
    if (n.soort === 'geheugen' && n.herinnering != null) {
      const h = HERINNERINGEN[n.herinnering]
      return { soort: h.soort, titel: h.kort, wanneer: h.wanneer, tekst: h.uitleg }
    }
    if (n.soort === 'hub') {
      const b = BRONNEN.find((x) => x.id === n.hub)
      return { soort: 'Bron', titel: b?.label ?? '', wanneer: '', tekst: b?.uitleg ?? '' }
    }
    if (n.soort === 'brein') return { soort: 'Stevin', titel: BREIN.label, wanneer: '', tekst: BREIN.uitleg }
    if (n.soort === 'advisor') return { soort: 'Stevin', titel: ADVISOR.label, wanneer: '', tekst: ADVISOR.uitleg }
    if (n.soort === 'sat') {
      const b = BRONNEN.find((x) => x.id === n.hub)
      return { soort: b?.label ?? 'Bron', titel: n.label ?? '', wanneer: '', tekst: `Onderdeel van ${b?.label.toLowerCase() ?? 'deze bron'}.` }
    }
    return null
  })()

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
            <stop offset="0%" stopColor="#5DA3FF" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#3D8EFF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#3D8EFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={breinId}>
            <stop offset="0%" stopColor="#9CC6FF" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#3D8EFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3D8EFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g data-laag="lijnen">
          {lijnen.map((_, i) => (
            <line key={i} ref={(el) => { lijnEls.current[i] = el }} stroke="#93C5FD" strokeOpacity={0} strokeWidth={0.8} />
          ))}
        </g>
        <g data-laag="pulsen">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} ref={(el) => { pulsEls.current[i] = el }} r={0} fill="#BFDBFF" opacity={0} />
          ))}
        </g>
        <g data-laag="knopen">
          {knopen.map((n, i) => (
            <g
              key={n.id}
              ref={(el) => { knoopEls.current[i] = el }}
              className={`su-knoop su-${n.soort}`}
              opacity={0}
              data-knoop={n.soort === 'stof' || (n.soort === 'geheugen' && n.herinnering == null) ? undefined : i}
            >
              {/* Groter raakvlak dan de stip, anders raak je hem op een telefoon niet */}
              {n.soort !== 'stof' && !(n.soort === 'geheugen' && n.herinnering == null) && (
                <circle r={n.soort === 'brein' ? n.r + 6 : Math.max(12, n.r + 8)} fill="transparent" className="cursor-pointer" />
              )}
              {n.soort === 'brein' && <circle r={n.r * 3.4} fill={`url(#${breinId})`} className="su-ademen" />}
              {n.soort === 'brein' && <circle r={n.r} fill="none" stroke="#9CC6FF" strokeWidth={2} opacity={0} className="su-hartslag" />}
              {(n.soort === 'hub' || n.soort === 'advisor' || n.soort === 'sat' || n.soort === 'geheugen') && (
                <circle r={n.r * 3.2} fill={`url(#${gloedId})`} className="su-halo" />
              )}
              <circle r={n.r} className="su-stip" />
              {n.soort === 'brein' && (
                // Het Stevin-icoon uit public/logos/logo-icon.svg (48x48).
                <g transform="scale(0.78) translate(-24 -24)" fill="#3D8EFF">
                  <rect x={6} y={7} width={30} height={14} rx={4} />
                  <rect x={12} y={27} width={30} height={14} rx={4} />
                </g>
              )}
              {n.label && (
                <text
                  className="su-label"
                  x={n.soort === 'brein' ? 0 : n.r + 7}
                  y={n.soort === 'brein' ? n.r + 20 : 4.5}
                  textAnchor={n.soort === 'brein' ? 'middle' : 'start'}
                  fontSize={n.soort === 'sat' ? 11 : n.soort === 'geheugen' ? 12 : 13.5}
                  fontWeight={n.soort === 'sat' || n.soort === 'geheugen' ? 500 : 650}
                >
                  {n.label}
                </text>
              )}
            </g>
          ))}
        </g>
        <g ref={signaalEl} opacity={0} className="su-overgang">
          <circle r={22} fill={`url(#${gloedId})`} className="su-puls" />
          <circle r={6} fill="#5DA3FF" />
          <circle r={2.6} fill="#FFFFFF" />
          <text y={-34} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing="0.1em" fill="#5DA3FF">
            SIGNAAL
          </text>
          {signaal && (
            <text y={-17} textAnchor="middle" fontSize={12.5} fontWeight={600} fill="#FFFFFF" className="su-label">
              {signaal}
            </text>
          )}
        </g>
      </svg>

      {/* Het kaartje bij een aangeklikte node */}
      <div
        ref={kaartRef}
        data-kaart
        role="dialog"
        aria-live="polite"
        aria-label={kaartInhoud?.titel}
        className="su-kaart pointer-events-auto absolute left-0 top-0 w-[260px] rounded-2xl border border-white/15 bg-[#0F1F38]/95 p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur"
        style={{ opacity: 0, visibility: kaartInhoud ? 'visible' : 'hidden' }}
      >
        {kaartInhoud && (
          <>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9CC6FF]">{kaartInhoud.soort}</span>
              <button
                type="button"
                onClick={() => setGekozen(null)}
                className="text-[18px] leading-none text-white/50 hover:text-white"
                aria-label="Sluiten"
              >
                ×
              </button>
            </div>
            <p className="m-0 font-display text-[16px] font-bold leading-snug text-white">{kaartInhoud.titel}</p>
            {kaartInhoud.wanneer && <p className="m-0 mt-0.5 text-[12.5px] text-white/50">{kaartInhoud.wanneer}</p>}
            <p className="m-0 mt-2 text-[14px] leading-snug text-white/80">{kaartInhoud.tekst}</p>
          </>
        )}
      </div>
    </div>
  )
}
