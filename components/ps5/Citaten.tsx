'use client'

import { useEffect, useRef, useState } from 'react'

type Citaat = { q: string; a: string }

/* Koen, 22 nov 23:51: op de telefoon een rij die van rechts naar links schuift.
   Schuift elke 4 seconden een kaart door, stopt zodra iemand zelf veegt.
   Vanaf sm een gewone rij (2 kolommen, lg 4), zonder automatisch schuiven. */
export default function Citaten({ items }: { items: Citaat[] }) {
  const rij = useRef<HTMLUListElement>(null)
  const [actief, setActief] = useState(0)
  const [gestopt, setGestopt] = useState(false)

  useEffect(() => {
    const el = rij.current
    if (!el || gestopt) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => {
      // Per tik controleren, zodat draaien van de telefoon (liggend naar staand) ook werkt.
      if (window.matchMedia('(min-width: 640px)').matches) return
      const volgende = (actief + 1) % items.length
      const kaart = el.children[volgende] as HTMLElement | undefined
      if (kaart) el.scrollTo({ left: kaart.offsetLeft - el.offsetLeft - 24, behavior: 'smooth' })
      setActief(volgende)
    }, 4000)
    return () => window.clearInterval(t)
  }, [actief, gestopt, items.length])

  const bijScroll = () => {
    const el = rij.current
    if (!el) return
    const breedte = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1
    setActief(Math.round(el.scrollLeft / (breedte + 12)))
  }

  return (
    <>
      <ul
        ref={rij}
        onScroll={bijScroll}
        onTouchStart={() => setGestopt(true)}
        className="m-0 flex list-none snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ q, a }) => (
          <li key={a} className="w-[85%] shrink-0 snap-start rounded-[12px] border border-[#D6DDE8] bg-white p-4 sm:w-auto">
            <figure className="m-0">
              <blockquote className="m-0 text-[15px] font-semibold leading-[1.4] text-primary">&ldquo;{q}&rdquo;</blockquote>
              <figcaption className="mt-2 text-[13px] text-[#2A3A54]">{a}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
        {items.map(({ a }, i) => (
          <span key={a} className={`h-1.5 rounded-full transition-all ${i === actief ? 'w-4 bg-[#3C8EFF]' : 'w-1.5 bg-[#D6DDE8]'}`} />
        ))}
      </div>
    </>
  )
}
