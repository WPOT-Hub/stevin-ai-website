// Mobiele hero-sfeer: geen volledige brein-render maar een dun strookje
// heldere nodes dat langs de rechterrand het beeld in loopt en van het scherm
// af bloedt. Bewust GEEN dichte, vage puntenwolk en GEEN rechthoek: losse,
// scherpe nodes met een spaarzame verbindingslijn, zodat de koptekst leesbaar
// blijft en het natuurlijk aanvoelt. Pure SVG (server component), dus altijd
// gerenderd, geen canvas, geen hydration-gedoe.

type Node = { x: number; y: number; r: number; tier: 0 | 1 | 2 }

// Losse verticale constellatie, dichter naar rechts, een paar nodes bloeden
// voorbij x=200 zodat de rechterkant van het scherm valt (geen harde rand).
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

// Spaarzame ruggengraat met een paar zijtakken, indices verwijzen naar NODES.
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

export default function BrainEdgeStrip({ className }: { className?: string }) {
  return (
    <svg
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
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
        ))}
      </g>

      {/* Zachte halo alleen achter de heldere hub-nodes, klein gehouden zodat
          het scherp blijft in plaats van een vage gloed. */}
      {NODES.filter((n) => n.tier === 2).map((n, i) => (
        <circle key={`g${i}`} cx={n.x} cy={n.y} r={n.r * 2.6} fill="url(#brainEdgeGlow)" />
      ))}

      <g className="brain-edge-nodes">
        {NODES.map((n, i) => (
          <circle
            key={i}
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
        .brain-edge-nodes { animation: brainEdgeDrift 14s ease-in-out infinite; }
        .brain-edge-twinkle { animation: brainEdgeTwinkle 5s ease-in-out infinite; }
        @keyframes brainEdgeDrift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes brainEdgeTwinkle {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.95; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brain-edge-nodes, .brain-edge-twinkle { animation: none; }
        }
      `}</style>
    </svg>
  )
}
