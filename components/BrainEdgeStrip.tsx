'use client'

// Mobiele hero-sfeer: geen volledige brein-render maar een dun strookje
// heldere nodes dat langs de rechterrand het beeld in loopt en van het scherm
// af bloedt. Bewust GEEN dichte, vage puntenwolk en GEEN rechthoek: losse,
// scherpe nodes met een spaarzame verbindingslijn. De nodes zweven zacht rond
// hun eigen plek (requestAnimationFrame), en de lijnen + glow bewegen mee zodat
// alles verbonden blijft. SVG blijft bij een achtergrond-tab z'n laatste frame
// tonen, dus nooit een leeg vlak zoals bij canvas.

import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; r: number; tier: 0 | 1 | 2 }

const NODES: Node[] = [
  { x: 96, y: 58, r: 3, tier: 1 },
  { x: 150, y: 44, r: 5, tier: 2 },
  { x: 182, y: 96, r: 3.5, tier: 1 },
  { x: 128, y: 110, r: 2.5, tier: 0 },
  { x: 160, y: 150, r: 4, tier: 1 },
  { x: 198, y: 178, r: 3, tier: 1 },
  { x: 112, y: 190, r: 2.5, tier: 0 },
  { x: 150, y: 214, r: 6, tier: 2 },
  { x: 184, y: 250, r: 3.5, tier: 1 },
  { x: 132, y: 262, r: 2.5, tier: 0 },
  { x: 164, y: 300, r: 3, tier: 1 },
  { x: 200, y: 322, r: 3.5, tier: 1 },
  { x: 120, y: 330, r: 2.5, tier: 0 },
  { x: 152, y: 360, r: 4.5, tier: 2 },
  { x: 180, y: 400, r: 3, tier: 1 },
  { x: 140, y: 420, r: 2.5, tier: 0 },
  { x: 168, y: 458, r: 3.5, tier: 1 },
  { x: 200, y: 486, r: 3, tier: 1 },
  { x: 126, y: 494, r: 2.5, tier: 0 },
  { x: 156, y: 528, r: 5, tier: 2 },
  { x: 188, y: 566, r: 3, tier: 1 },
  { x: 144, y: 582, r: 2.5, tier: 0 },
  { x: 172, y: 616, r: 3.5, tier: 1 },
]

const EDGES: [number, number][] = [
  [1, 0],
  [1, 2],
  [2, 4],
  [4, 7],
  [7, 8],
  [7, 10],
  [10, 13],
  [13, 14],
  [13, 16],
  [16, 19],
  [19, 20],
  [19, 22],
]

const COLOR: Record<0 | 1 | 2, string> = {
  0: '#3D8EFF',
  1: '#5DA3FF',
  2: '#7DB4FF',
}

const TIER2 = NODES.map((n, i) => ({ n, i })).filter((o) => o.n.tier === 2).map((o) => o.i)

export default function BrainEdgeStrip({ className }: { className?: string }) {
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([])
  const haloRefs = useRef<(SVGCircleElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Per-node zweefparameters, index-afgeleid zodat het deterministisch is
    // (geen Math.random -> geen SSR-mismatch) maar toch onregelmatig oogt.
    const P = NODES.map((_, i) => ({
      ax: 5 + (i % 4) * 1.8,
      ay: 6 + (i % 3) * 2.4,
      px: (i * 0.7) % (Math.PI * 2),
      py: (i * 1.3) % (Math.PI * 2),
      sx: 0.32 + (i % 5) * 0.045,
      sy: 0.26 + (i % 4) * 0.05,
    }))

    const start = performance.now()
    let raf = 0
    let running = false

    const frame = (now: number) => {
      const t = (now - start) / 1000
      const xs: number[] = new Array(NODES.length)
      const ys: number[] = new Array(NODES.length)
      for (let i = 0; i < NODES.length; i++) {
        const p = P[i]
        xs[i] = NODES[i].x + Math.sin(t * p.sx + p.px) * p.ax
        ys[i] = NODES[i].y + Math.cos(t * p.sy + p.py) * p.ay
        const c = nodeRefs.current[i]
        if (c) {
          c.setAttribute('cx', xs[i].toFixed(2))
          c.setAttribute('cy', ys[i].toFixed(2))
        }
      }
      for (let k = 0; k < TIER2.length; k++) {
        const idx = TIER2[k]
        const h = haloRefs.current[k]
        if (h) {
          h.setAttribute('cx', xs[idx].toFixed(2))
          h.setAttribute('cy', ys[idx].toFixed(2))
        }
      }
      for (let i = 0; i < EDGES.length; i++) {
        const [a, b] = EDGES[i]
        const l = lineRefs.current[i]
        if (l) {
          l.setAttribute('x1', xs[a].toFixed(2))
          l.setAttribute('y1', ys[a].toFixed(2))
          l.setAttribute('x2', xs[b].toFixed(2))
          l.setAttribute('y2', ys[b].toFixed(2))
        }
      }
      raf = requestAnimationFrame(frame)
    }

    const play = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
    }

    const onVis = () => (document.hidden ? stop() : play())
    document.addEventListener('visibilitychange', onVis)

    // Pauzeer als de hero uit beeld is gescrold (accu-vriendelijk); SVG houdt
    // z'n laatste frame vast, dus geen leeg vlak bij terugkeer.
    let io: IntersectionObserver | null = null
    if (svgRef.current && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => (entries[0].isIntersecting && !document.hidden ? play() : stop()),
        { threshold: 0 },
      )
      io.observe(svgRef.current)
    } else {
      play()
    }

    return () => {
      document.removeEventListener('visibilitychange', onVis)
      if (io) io.disconnect()
      stop()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 640"
      preserveAspectRatio="xMaxYMid slice"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <radialGradient id="brainEdgeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5DA3FF" stopOpacity="0.42" />
          <stop offset="60%" stopColor="#5DA3FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#5DA3FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="#3D8EFF" strokeOpacity="0.28" strokeWidth="1">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el
            }}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      {/* Zachte halo alleen achter de heldere hub-nodes, klein gehouden zodat
          het scherp blijft in plaats van een vage gloed. */}
      {TIER2.map((idx, k) => (
        <circle
          key={`g${k}`}
          ref={(el) => {
            haloRefs.current[k] = el
          }}
          cx={NODES[idx].x}
          cy={NODES[idx].y}
          r={NODES[idx].r * 2.6}
          fill="url(#brainEdgeGlow)"
        />
      ))}

      <g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el
            }}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={COLOR[n.tier]}
            fillOpacity={n.tier === 0 ? 0.75 : 1}
            style={{ animationDelay: `${(i % 6) * 0.9}s` }}
            className={n.tier === 0 ? 'brain-edge-twinkle' : undefined}
          />
        ))}
      </g>

      <style>{`
        .brain-edge-twinkle { animation: brainEdgeTwinkle 5s ease-in-out infinite; }
        @keyframes brainEdgeTwinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.95; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brain-edge-twinkle { animation: none; }
        }
      `}</style>
    </svg>
  )
}
