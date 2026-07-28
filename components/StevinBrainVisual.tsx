'use client'

import { useEffect, useRef, useState } from 'react'
import { getBrainSnapshot, type BrainNode, type BrainNodeType } from '@/data/brainSnapshot'

/**
 * Stevin Brain, sfeervolle merk-visual.
 *
 * Een levend sterrenbeeld van een marketing-brein: elke node is een databron of
 * een uitkomst (campagne, creatie, resultaat, kennis), dunne lijnen knopen ze aan
 * elkaar. Draait op een BEVROREN, volledig fictief snapshot (Lumos-demodata),
 * dus geen API, geen fetch, geen echte klantdata.
 *
 * Bewust een sfeer-asset, geen dashboard: transparante achtergrond zodat het over
 * een donker navy-vlak (#0A1628) valt, zachte physics (thuisveer, lichte repulsie,
 * edge-veerkracht, trage drift en rotatie) en om de circa negen seconden licht
 * een node op met een rustig label. prefers-reduced-motion krijgt een mooi stil
 * frame. Buiten beeld pauzeert de animatie (IntersectionObserver).
 */

// 16:9 en 21:9 toegevoegd 28 jul 2026 voor het bewijsblok op de
// landingspagina's (DeskProof). De bestaande verhoudingen zijn allemaal staand
// of vierkant, want die zijn gemaakt voor de hero-kolom en voor social.
export type BrainAspect = '1:1' | '3:4' | '9:16' | '16:9' | '21:9'

interface StevinBrainVisualProps {
  /** Paginataal: 'en' laadt het vertaalde snapshot, al het andere NL. */
  locale?: string
  /** Verhouding van het vlak. Bepaalt de vorm van het canvas. */
  aspect?: BrainAspect
  /** 'light' voor een wit vlak; standaard donker, zoals in de hero. */
  theme?: BrainTheme
  /** Extra classes op de wrapper (bijvoorbeeld voor breedte). */
  className?: string
  /** Subtiel merk-teken linksonder tonen. */
  brand?: boolean
  /** Claimregel onder de merknaam. Nederlands, geen streepjes of accenten. */
  claim?: string
  /** Toegankelijk label voor screenreaders. */
  ariaLabel?: string
}

const ASPECT_RATIO: Record<BrainAspect, string> = {
  '1:1': '1 / 1',
  '3:4': '3 / 4',
  '9:16': '9 / 16',
  '16:9': '16 / 9',
  '21:9': '21 / 9',
}

// Lichte variant toegevoegd 28 jul 2026. De visual was gemaakt om op navy te
// vallen: additieve halo's, witte lijnen, wit label. Op een licht vlak wast dat
// helemaal weg. De brein-kaart in de Desk staat wel op licht, en dat is de kant
// waar het meeste van de site staat.
//
// Alles wat kleur is zit hierin, zodat er nergens anders in het bestand een
// losse rgba(255,255,255,...) blijft rondslingeren.
export type BrainTheme = 'dark' | 'light'

interface BrainPalet {
  node: Record<BrainNodeType, string>
  /** Kern in het midden van de stip. */
  kern: string
  edge: string
  edgeHot: string
  ring: string
  /** Additief oplichten kan alleen op donker; op licht wordt het grijze soep. */
  halo: GlobalCompositeOperation
  haloAlpha: number
  kaart: { bg: string; rand: string; schaduw: string; titel: string; sub: string }
}

const PALET: Record<BrainTheme, BrainPalet> = {
  dark: {
    node: { campagne: '#5DA3FF', creatie: '#3fd0c9', outcome: '#5fd39a', kennis: '#e0a94a' },
    kern: 'rgba(255,255,255,0.92)',
    edge: 'rgba(255, 255, 255, 0.14)',
    edgeHot: 'rgba(147, 197, 253, 0.42)',
    ring: 'rgba(255, 255, 255, 0.5)',
    halo: 'lighter',
    haloAlpha: 1,
    kaart: {
      bg: 'rgba(9, 20, 38, 0.74)',
      rand: '1px solid rgba(255, 255, 255, 0.12)',
      schaduw: '0 8px 30px rgba(0, 0, 0, 0.35)',
      titel: '#F4F8FF',
      sub: 'rgba(255, 255, 255, 0.62)',
    },
  },
  light: {
    // Verzadigder dan de donkere set: dezelfde tinten zijn op wit te bleek.
    node: { campagne: '#2F7FE8', creatie: '#12a89f', outcome: '#1f9d63', kennis: '#c07f16' },
    kern: 'rgba(255,255,255,0.95)',
    edge: 'rgba(10, 22, 40, 0.16)',
    edgeHot: 'rgba(47, 127, 232, 0.55)',
    ring: 'rgba(10, 22, 40, 0.42)',
    halo: 'source-over',
    haloAlpha: 0.42,
    kaart: {
      bg: 'rgba(255, 255, 255, 0.94)',
      rand: '1px solid rgba(10, 22, 40, 0.10)',
      schaduw: '0 8px 30px rgba(10, 22, 40, 0.16)',
      titel: '#0A1628',
      sub: 'rgba(10, 22, 40, 0.60)',
    },
  },
}

const TYPE_COLOR = PALET.dark.node

interface Rgb {
  r: number
  g: number
  b: number
}

function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function mixToWhite(c: Rgb, amount: number): string {
  const r = Math.round(c.r + (255 - c.r) * amount)
  const g = Math.round(c.g + (255 - c.g) * amount)
  const b = Math.round(c.b + (255 - c.b) * amount)
  return `rgb(${r}, ${g}, ${b})`
}

/** Kort een why-regel netjes in op woordgrens, plain tekst, geen streepjes. */
function shorten(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut
  return `${base.replace(/[.,;:]$/, '')}...`
}

interface Body {
  node: BrainNode
  color: string
  coreColor: string
  x: number
  y: number
  vx: number
  vy: number
  homeNx: number
  homeNy: number
  baseR: number
  phase: number
  driftFx: number
  driftFy: number
  pinned: boolean
  title: string
  sub: string
}

interface GlowSprites {
  size: number
  byType: Record<BrainNodeType, HTMLCanvasElement>
}

function buildGlowSprites(kleuren: Record<BrainNodeType, string>): GlowSprites {
  const size = 128
  const byType = {} as Record<BrainNodeType, HTMLCanvasElement>
  ;(Object.keys(kleuren) as BrainNodeType[]).forEach((type) => {
    const c = document.createElement('canvas')
    c.width = size
    c.height = size
    const g = c.getContext('2d')
    if (g) {
      const rgb = hexToRgb(kleuren[type])
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.55)`)
      grad.addColorStop(0.45, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.14)`)
      grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)
      g.fillStyle = grad
      g.fillRect(0, 0, size, size)
    }
    byType[type] = c
  })
  return { size, byType }
}

export default function StevinBrainVisual({
  locale,
  aspect = '1:1',
  theme = 'dark',
  className,
  brand = true,
  claim = 'Elke bron een ster. Samen een brein.',
  ariaLabel = 'Stevin Brain, een levend sterrenbeeld van campagnes, creaties, resultaten en kennis die samen een marketing-brein vormen.',
}: StevinBrainVisualProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)

  const [hlText, setHlText] = useState<{ title: string; sub: string; type: BrainNodeType } | null>(null)
  const [hlVisible, setHlVisible] = useState(false)
  const [hlPlace, setHlPlace] = useState<'above' | 'below'>('below')

  useEffect(() => {
    const wrapperEl = wrapperRef.current
    const canvasEl = canvasRef.current
    if (!wrapperEl || !canvasEl) return
    const context = canvasEl.getContext('2d')
    if (!context) return
    // Vaste, niet-null typed aliassen: strict null-checks houden de narrowing
    // anders niet vast binnen de geneste physics-functies (closures).
    const wrapper: HTMLDivElement = wrapperEl
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = context
    const pal = PALET[theme]

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const { nodes, edges } = getBrainSnapshot(locale)

    // Graad per node bepaalt de plek: hubs naar het midden, losse sterren naar de rand.
    const degree = new Map<string, number>()
    nodes.forEach((n) => degree.set(n.id, 0))
    edges.forEach(([a, b]) => {
      degree.set(a, (degree.get(a) ?? 0) + 1)
      degree.set(b, (degree.get(b) ?? 0) + 1)
    })

    const order = nodes
      .map((n, i) => ({ i, d: degree.get(n.id) ?? 0 }))
      .sort((p, q) => q.d - p.d)

    const bodies: Body[] = nodes.map((n) => {
      const rgb = hexToRgb(pal.node[n.type])
      const deg = degree.get(n.id) ?? 0
      const title = n.label
      const sub = n.why ? shorten(n.why, 108) : n.period_label ?? ''
      return {
        node: n,
        color: pal.node[n.type],
        coreColor: mixToWhite(rgb, 0.5),
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        homeNx: 0,
        homeNy: 0,
        baseR: 2.4 + Math.min(deg, 9) * 0.34 + (n.type === 'outcome' ? 0.8 : 0),
        phase: Math.random() * Math.PI * 2,
        driftFx: 0.7 + Math.random() * 0.6,
        driftFy: 0.7 + Math.random() * 0.6,
        pinned: false,
        title,
        sub,
      }
    })

    // Phyllotaxis: vult een schijf gelijkmatig en gecentreerd. Rang op graad,
    // zodat het dichte brein-hart uit hubs bestaat en losse kennis-sterren de rand vullen.
    const N = bodies.length
    order.forEach((entry, rank) => {
      const t = (rank + 0.5) / N
      const rr = Math.sqrt(t)
      const a = rank * 2.399963229
      bodies[entry.i].homeNx = rr * Math.cos(a)
      bodies[entry.i].homeNy = rr * Math.sin(a)
    })

    // Snelle lookup voor edges naar body-index.
    const indexById = new Map<string, number>()
    bodies.forEach((b, i) => indexById.set(b.node.id, i))
    const edgePairs: Array<[number, number]> = []
    edges.forEach(([a, b]) => {
      const ia = indexById.get(a)
      const ib = indexById.get(b)
      if (ia !== undefined && ib !== undefined) edgePairs.push([ia, ib])
    })

    // Volgorde voor het uitlichten: nodes met betekenis eerst, licht geschud.
    const highlightOrder = bodies
      .map((b, i) => i)
      .filter((i) => bodies[i].node.why)
      .sort(() => Math.random() - 0.5)
    if (highlightOrder.length === 0) highlightOrder.push(0)

    const glow = buildGlowSprites(pal.node)

    let W = 0
    let H = 0
    let dpr = 1

    function resize() {
      const rect = wrapper.getBoundingClientRect()
      const newW = Math.max(1, Math.round(rect.width))
      const newH = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const first = W === 0
      canvas.width = Math.round(newW * dpr)
      canvas.height = Math.round(newH * dpr)
      canvas.style.width = `${newW}px`
      canvas.style.height = `${newH}px`
      if (first) {
        // Startpositie: leg de bodies op hun thuisplek zodat het meteen gevuld staat.
        placeAtHome(newW, newH, 0)
      } else if (W > 0 && H > 0) {
        // Schaal bestaande posities mee zodat er geen sprong ontstaat bij herschalen.
        const sx = newW / W
        const sy = newH / H
        for (const b of bodies) {
          b.x *= sx
          b.y *= sy
        }
      }
      W = newW
      H = newH
    }

    function homeTarget(b: Body, now: number): { hx: number; hy: number } {
      const cx = W / 2
      const cy = H / 2
      const bx = W / 2 - Math.max(18, W * 0.09)
      const by = H / 2 - Math.max(18, H * 0.09)
      // Zeer trage rotatie van het hele veld, plus zachte ademhaling per node.
      const rot = reduceMotion ? 0 : now * 0.0000065
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      const nx = b.homeNx * cos - b.homeNy * sin
      const ny = b.homeNx * sin + b.homeNy * cos
      const S = Math.min(W, H)
      const amp = reduceMotion ? 0 : S * 0.02
      const driftX = Math.sin(now * 0.00013 * b.driftFx + b.phase) * amp
      const driftY = Math.cos(now * 0.00017 * b.driftFy + b.phase) * amp
      return { hx: cx + nx * bx + driftX, hy: cy + ny * by + driftY }
    }

    function placeAtHome(w: number, h: number, now: number) {
      const prevW = W
      const prevH = H
      W = w
      H = h
      for (const b of bodies) {
        const { hx, hy } = homeTarget(b, now)
        b.x = hx
        b.y = hy
        b.vx = 0
        b.vy = 0
      }
      W = prevW
      H = prevH
    }

    function step(now: number) {
      const S = Math.min(W, H)
      const kHome = 0.018
      const kEdge = 0.006
      const kRep = S * S * 0.010
      const repCut = S * 0.3
      const repCut2 = repCut * repCut
      const restLen = S * 0.1
      const damping = 0.85
      const maxSpeed = S * 0.02
      const maxRepAccel = S * 0.06

      // Thuisveer en drift.
      for (const b of bodies) {
        if (b.pinned) continue
        const { hx, hy } = homeTarget(b, now)
        b.vx += (hx - b.x) * kHome
        b.vy += (hy - b.y) * kHome
      }

      // Lichte repulsie, alleen dichtbij, zodat nodes niet op elkaar plakken.
      for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i]
        for (let j = i + 1; j < bodies.length; j++) {
          const c = bodies[j]
          let dx = a.x - c.x
          let dy = a.y - c.y
          let d2 = dx * dx + dy * dy
          if (d2 > repCut2) continue
          if (d2 < 1) {
            dx = (Math.random() - 0.5) * 0.5
            dy = (Math.random() - 0.5) * 0.5
            d2 = 1
          }
          let f = kRep / d2
          if (f > maxRepAccel) f = maxRepAccel
          const inv = 1 / Math.sqrt(d2)
          const fx = dx * inv * f
          const fy = dy * inv * f
          if (!a.pinned) {
            a.vx += fx
            a.vy += fy
          }
          if (!c.pinned) {
            c.vx -= fx
            c.vy -= fy
          }
        }
      }

      // Edge-veerkracht: verbonden nodes trekken zacht naar elkaar toe.
      for (const [ia, ib] of edgePairs) {
        const a = bodies[ia]
        const c = bodies[ib]
        const dx = c.x - a.x
        const dy = c.y - a.y
        const d = Math.sqrt(dx * dx + dy * dy) || 1
        const f = kEdge * (d - restLen)
        const fx = (dx / d) * f
        const fy = (dy / d) * f
        if (!a.pinned) {
          a.vx += fx
          a.vy += fy
        }
        if (!c.pinned) {
          c.vx -= fx
          c.vy -= fy
        }
      }

      // Integratie met demping en snelheidscap.
      for (const b of bodies) {
        if (b.pinned) continue
        b.vx *= damping
        b.vy *= damping
        const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
        if (sp > maxSpeed) {
          b.vx = (b.vx / sp) * maxSpeed
          b.vy = (b.vy / sp) * maxSpeed
        }
        b.x += b.vx
        b.y += b.vy
      }
    }

    function draw(highlightIdx: number) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      // Edges, dun en licht.
      ctx.lineWidth = 1
      for (const [ia, ib] of edgePairs) {
        const a = bodies[ia]
        const c = bodies[ib]
        const isHot = ia === highlightIdx || ib === highlightIdx
        ctx.strokeStyle = isHot ? pal.edgeHot : pal.edge
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(c.x, c.y)
        ctx.stroke()
      }

      // Glow-halos. Additief op donker zodat overlap oplicht; op licht gewoon
      // overtekenen met minder dekking, anders wordt het grijze soep.
      ctx.globalCompositeOperation = pal.halo
      ctx.globalAlpha = pal.haloAlpha
      for (const b of bodies) {
        const glowD = b.baseR * 7.5
        const sprite = glow.byType[b.node.type]
        ctx.drawImage(sprite, b.x - glowD / 2, b.y - glowD / 2, glowD, glowD)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      // Kernen: gekleurde stip met lichte kern.
      for (const b of bodies) {
        ctx.beginPath()
        ctx.fillStyle = b.color
        ctx.arc(b.x, b.y, b.baseR, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.fillStyle = b.coreColor
        ctx.arc(b.x, b.y, b.baseR * 0.42, 0, Math.PI * 2)
        ctx.fill()
      }

      // Uitgelichte node krijgt een zachte ring en extra halo.
      if (highlightIdx >= 0 && highlightIdx < bodies.length) {
        const b = bodies[highlightIdx]
        ctx.globalCompositeOperation = pal.halo
        ctx.globalAlpha = pal.haloAlpha
        const glowD = b.baseR * 12
        ctx.drawImage(glow.byType[b.node.type], b.x - glowD / 2, b.y - glowD / 2, glowD, glowD)
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
        ctx.beginPath()
        ctx.strokeStyle = pal.ring
        ctx.lineWidth = 1
        ctx.arc(b.x, b.y, b.baseR + 6, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // Uitlicht-cyclus, tijdgestuurd zodat pauzeren netjes meeloopt.
    const HL_PERIOD = 9000
    // Klik-selectie: een aangeklikte node houdt de spotlight vast (forced)
    // en pauzeert de auto-cyclus; klik in de leegte laat de cyclus hervatten.
    const FORCED_HOLD = 14000
    let forced: number | null = null
    let forcedAt = 0
    const hl = { pos: -1, startedAt: 0 }
    let visShown = false

    function positionLabel(idx: number) {
      const el = labelRef.current
      if (!el || idx < 0) return
      const b = bodies[idx]
      const clampX = Math.max(96, Math.min(W - 96, b.x))
      el.style.transform = `translate3d(${clampX}px, ${b.y}px, 0)`
    }

    function updateHighlight(now: number) {
      if (hl.pos < 0 || now - hl.startedAt >= HL_PERIOD) {
        hl.pos = hl.pos < 0 ? 0 : (hl.pos + 1) % highlightOrder.length
        hl.startedAt = now
        const idx = highlightOrder[hl.pos]
        const b = bodies[idx]
        setHlPlace(b.y < H / 2 ? 'below' : 'above')
        setHlText({ title: b.title, sub: b.sub, type: b.node.type })
        visShown = false
        setHlVisible(false)
      }
      const el = now - hl.startedAt
      if (el > 140 && !visShown) {
        visShown = true
        setHlVisible(true)
      }
      if (el > HL_PERIOD - 2000 && visShown) {
        visShown = false
        setHlVisible(false)
      }
    }

    function selectNode(i: number, now: number) {
      forced = i
      forcedAt = now
      const b = bodies[i]
      setHlPlace(b.y < H / 2 ? 'below' : 'above')
      setHlText({ title: b.title, sub: b.sub, type: b.node.type })
      setHlVisible(true)
      visShown = true
    }

    let rafId = 0
    let running = false

    function frame(now: number) {
      step(now)
      if (forced !== null && now - forcedAt >= FORCED_HOLD) {
        forced = null
        hl.startedAt = now - HL_PERIOD // cyclus meteen laten doorschuiven
      }
      const idx = forced !== null ? forced : hl.pos >= 0 ? highlightOrder[hl.pos] : -1
      draw(idx)
      if (forced === null) updateHighlight(now)
      positionLabel(idx)
      rafId = requestAnimationFrame(frame)
    }

    function start() {
      if (running || reduceMotion) return
      running = true
      rafId = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }

    resize()

    const ro = new ResizeObserver(() => resize())
    ro.observe(wrapper)

    // Slepen + selecteren: pak de dichtstbijzijnde node; een tik (nauwelijks
    // beweging) selecteert hem en houdt de spotlight vast, slepen verplaatst.
    let dragging: number | null = null
    let moved = 0
    let lastPX = 0
    let lastPY = 0
    function toLocal(e: PointerEvent): { x: number; y: number } {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onPointerDown(e: PointerEvent) {
      const p = toLocal(e)
      moved = 0
      lastPX = e.clientX
      lastPY = e.clientY
      let best = -1
      let bestD = Infinity
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        const dx = b.x - p.x
        const dy = b.y - p.y
        const d = dx * dx + dy * dy
        const hit = Math.max(16, b.baseR * 3.5)
        if (d < hit * hit && d < bestD) {
          bestD = d
          best = i
        }
      }
      if (best >= 0) {
        dragging = best
        bodies[best].pinned = true
        canvas.setPointerCapture(e.pointerId)
      } else if (forced !== null) {
        // Klik in de leegte: selectie loslaten, cyclus hervat vanzelf.
        forced = null
        hl.startedAt = performance.now() - HL_PERIOD
      }
    }
    function onPointerMove(e: PointerEvent) {
      moved += Math.abs(e.clientX - lastPX) + Math.abs(e.clientY - lastPY)
      lastPX = e.clientX
      lastPY = e.clientY
      if (dragging === null) return
      const p = toLocal(e)
      bodies[dragging].x = p.x
      bodies[dragging].y = p.y
      bodies[dragging].vx = 0
      bodies[dragging].vy = 0
    }
    function onPointerUp(e: PointerEvent) {
      if (dragging === null) return
      bodies[dragging].pinned = false
      if (moved < 6) selectNode(dragging, performance.now())
      dragging = null
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
    }
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)

    let isVisible = true
    let io: IntersectionObserver | null = null

    function onVisibility() {
      if (document.hidden) stop()
      else if (isVisible) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    if (reduceMotion) {
      // Stil, mooi frame: laat de physics een paar honderd stappen inlopen en teken een keer.
      const t0 = performance.now()
      for (let k = 0; k < 420; k++) step(t0)
      const idx = highlightOrder[0]
      hl.pos = 0
      draw(idx)
      const b = bodies[idx]
      setHlPlace(b.y < H / 2 ? 'below' : 'above')
      setHlText({ title: b.title, sub: b.sub, type: b.node.type })
      positionLabel(idx)
      setHlVisible(true)
    } else {
      io = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? true
          if (isVisible && !document.hidden) start()
          else stop()
        },
        { threshold: 0.05 },
      )
      io.observe(wrapper)
    }

    return () => {
      stop()
      ro.disconnect()
      if (io) io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  const pal = PALET[theme]
  const dotColor = hlText ? pal.node[hlText.type] : pal.node.campagne

  return (
    <div
      ref={wrapperRef}
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ASPECT_RATIO[aspect],
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          touchAction: 'pan-y',
          cursor: 'grab',
        }}
      />

      {/* Uitgelicht node-label, zweeft mee op de node. */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            transform:
              hlPlace === 'below'
                ? 'translate(-50%, 18px)'
                : 'translate(-50%, calc(-100% - 18px))',
            opacity: hlVisible ? 1 : 0,
            transition: 'opacity 0.9s ease',
            width: 'max-content',
            maxWidth: 'min(240px, 78vw)',
            padding: '10px 12px',
            borderRadius: '12px',
            background: pal.kaart.bg,
            border: pal.kaart.rand,
            boxShadow: pal.kaart.schaduw,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: hlText?.sub ? '4px' : 0 }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '9999px',
                background: dotColor,
                boxShadow: `0 0 8px ${dotColor}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display, system-ui, sans-serif)',
                fontSize: '13px',
                fontWeight: 700,
                lineHeight: 1.25,
                color: pal.kaart.titel,
                letterSpacing: '-0.01em',
              }}
            >
              {hlText?.title}
            </span>
          </div>
          {hlText?.sub ? (
            <p
              style={{
                margin: 0,
                paddingLeft: '14px',
                fontFamily: 'var(--font-display, system-ui, sans-serif)',
                fontSize: '11.5px',
                lineHeight: 1.4,
                color: pal.kaart.sub,
              }}
            >
              {hlText.sub}
            </p>
          ) : null}
        </div>
      </div>

      {/* Subtiel merk-teken. */}
      {brand ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '16px',
            bottom: '14px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display, system-ui, sans-serif)',
              fontSize: '12.5px',
              fontWeight: 700,
              letterSpacing: '0.01em',
              color: theme === 'light' ? 'rgba(10, 22, 40, 0.80)' : 'rgba(255, 255, 255, 0.85)',
            }}
          >
            Stevin Brain
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display, system-ui, sans-serif)',
              fontSize: '11px',
              lineHeight: 1.4,
              color: theme === 'light' ? 'rgba(10, 22, 40, 0.45)' : 'rgba(255, 255, 255, 0.42)',
              marginTop: '1px',
            }}
          >
            {claim}
          </div>
        </div>
      ) : null}
    </div>
  )
}
