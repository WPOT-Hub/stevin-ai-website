import type { ReactNode } from 'react'

const FF = 'system-ui,sans-serif'
const C1 = 'rgba(255,255,255,0.80)'
const C2 = 'rgba(255,255,255,0.60)'
const C3 = 'rgba(255,255,255,0.50)'

function Badge({ label, children, small }: { label: string; children: ReactNode; small?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={small
        ? 'w-[44px] h-[44px] flex-shrink-0'
        : 'w-[68px] h-[68px] sm:w-[88px] sm:h-[88px] lg:w-[104px] lg:h-[104px] flex-shrink-0'
      }
      aria-label={label}
      role="img"
    >
      <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
      {children}
    </svg>
  )
}

function Lbl({ text }: { text: string }) {
  return (
    <text x="50" y="84" textAnchor="middle" fontSize="7" fontWeight="700"
      fill={C3} letterSpacing="1.3" fontFamily={FF}>{text}</text>
  )
}

const round = (n: number) => Number(n.toFixed(3))

const EU_STARS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30 - 90) * (Math.PI / 180)
  // Afgerond op drie decimalen. Onafgerond serialiseert Node de float anders
  // dan de browser (19.61731409782016 tegen 19.617314097820163), en dat gaf op
  // elke pagina een hydration-mismatch in de console. 4 sep 2026.
  return { x: round(50 + 27 * Math.cos(a)), y: round(43 + 27 * Math.sin(a)), key: i }
})

const AI_STARS = Array.from({ length: 8 }, (_, i) => {
  const a = ((i * 25) - 87.5 - 90) * (Math.PI / 180)
  return { x: round(50 + 31 * Math.cos(a)), y: round(44 + 31 * Math.sin(a)), key: i }
})

export default function TrustBadges({ className = '', small = false }: { className?: string; small?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>

      {/* 1: COMPLIANT */}
      <Badge label="GDPR Compliant" small={small}>
        <path d="M50 23 L65 31 L65 47 C65 57 58 63 50 66 C42 63 35 57 35 47 L35 31 Z"
          stroke={C1} strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points="43,46 48,52 59,40"
          stroke={C1} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Lbl text="COMPLIANT" />
      </Badge>

      {/* 2: EU HOSTED */}
      <Badge label="EU Hosted" small={small}>
        {EU_STARS.map(({ x, y, key }) => (
          <text key={key} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fontSize="5.5" fill={C1} fontFamily={FF}>&#9733;</text>
        ))}
        <text x="50" y="43" textAnchor="middle" dominantBaseline="central"
          fontSize="12" fontWeight="800" fill={C1} fontFamily={FF}>EU</text>
        <Lbl text="HOSTED" />
      </Badge>

      {/* 3: AI ACT READY */}
      <Badge label="AI Act Ready" small={small}>
        {AI_STARS.map(({ x, y, key }) => (
          <text key={key} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fontSize="4.5" fill={C1} fontFamily={FF}>&#9733;</text>
        ))}
        <rect x="38" y="31" width="24" height="20" rx="3" stroke={C1} strokeWidth="1.3" fill="none" />
        <line x1="43" y1="31" x2="43" y2="26" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="31" x2="50" y2="26" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="57" y1="31" x2="57" y2="26" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="43" y1="51" x2="43" y2="56" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="51" x2="50" y2="56" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="57" y1="51" x2="57" y2="56" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="38" y1="37" x2="33" y2="37" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="38" y1="44" x2="33" y2="44" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="62" y1="37" x2="67" y2="37" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="62" y1="44" x2="67" y2="44" stroke={C2} strokeWidth="1.2" strokeLinecap="round" />
        <text x="50" y="42" textAnchor="middle" dominantBaseline="central"
          fontSize="9" fontWeight="800" fill={C1} fontFamily={FF}>AI</text>
        <text x="50" y="79" textAnchor="middle" fontSize="6.8" fontWeight="700"
          fill={C3} letterSpacing="0.8" fontFamily={FF}>AI ACT READY</text>
      </Badge>

      {/* 4: JIJ BESLIST. Stond hier als "READ ONLY", maar dat is een absolute
          belofte en wij voeren voor beheerklanten wel wijzigingen door. Wat wel
          altijd waar is: er verandert niets zonder akkoord van de klant. */}
      <Badge label="Jij beslist" small={small}>
        <path d="M22 42 Q36 27 50 27 Q64 27 78 42 Q64 57 50 57 Q36 57 22 42 Z"
          stroke={C1} strokeWidth="1.4" fill="none" strokeLinejoin="round" />
        <circle cx="50" cy="42" r="7.5" stroke={C1} strokeWidth="1.3" fill="none" />
        <circle cx="50" cy="42" r="3" fill={C2} />
        <rect x="59" y="49" width="14" height="11" rx="2" stroke={C1} strokeWidth="1.3" fill="none" />
        <path d="M62 49 L62 45 Q62 41 66 41 Q70 41 70 45 L70 49"
          stroke={C1} strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <circle cx="66" cy="55.5" r="1.8" fill={C2} />
        <Lbl text="JIJ BESLIST" />
      </Badge>

      {/* 5: API ACCESS */}
      <Badge label="API Access" small={small}>
        <path d="M43 26 Q37 26 37 32 L37 39 Q37 44 31 44 Q37 44 37 49 L37 56 Q37 62 43 62"
          stroke={C1} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M57 26 Q63 26 63 32 L63 39 Q63 44 69 44 Q63 44 63 49 L63 56 Q63 62 57 62"
          stroke={C1} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="44" cy="44" r="2.5" fill={C2} />
        <circle cx="50" cy="44" r="2.5" fill={C2} />
        <circle cx="56" cy="44" r="2.5" fill={C2} />
        <Lbl text="API ACCESS" />
      </Badge>

    </div>
  )
}
