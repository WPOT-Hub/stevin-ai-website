// Decoratief meetlat-motief — horizontale lijn met tick marks.
// Signatuur-element van het Stevin design system.
interface MeetlatRulerProps {
  color?: string
  className?: string
}

const ticks = [
  true, false, false, false,
  true, false, false, false,
  true, false, false, false,
  true, false, false, false,
  true,
]

export default function MeetlatRuler({ color = 'currentColor', className = '' }: MeetlatRulerProps) {
  return (
    <div className={`relative w-full ${className}`} style={{ height: '24px' }} aria-hidden="true">
      {/* Horizontale lijn */}
      <div
        className="absolute left-0 right-0 top-0 h-0.5 opacity-90"
        style={{ background: color }}
      />
      {/* Tick marks */}
      <div className="absolute inset-0 flex justify-between items-center">
        {ticks.map((major, i) => (
          <div
            key={i}
            className="w-0.5 opacity-90"
            style={{ height: major ? '22px' : '12px', background: color, flexShrink: 0 }}
          />
        ))}
      </div>
    </div>
  )
}
