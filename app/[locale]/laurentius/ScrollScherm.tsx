'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

// W-566: een scherm (laptop of telefoon) met een schermafdruk van de HELE
// voorbeeldsite. Met de muis erover, of met het toetsenbord erop, scrolt de site
// langzaam naar beneden; eraf en hij schiet terug naar boven. Op een
// aanraakscherm bestaat erover bewegen niet, daar start en stopt een tik het.
//
// Het scrollen is een overgang van object-position (boven naar onder) op een
// gewone next/image, dus het beeld wordt per scherm verkleind geserveerd en er
// is geen tweede afbeelding of script per frame nodig.
//
// De vaste bel- en WhatsApp-balk van de telefoonversie staat NIET in de lange
// schermafdruk (die kwam midden op de pagina terecht) maar ligt er als los
// beeld overheen, zodat hij onderaan blijft staan zoals op een echte telefoon.

const FRAME = {
  telefoon: { b: 390, h: 844 },
  laptop: { b: 1440, h: 900 },
} as const

type Props = {
  src: string
  alt: string
  /** Afmetingen van de lange schermafdruk in pixels. */
  breedte: number
  hoogte: number
  soort: keyof typeof FRAME
  /** Losse balk die onderaan het scherm vast blijft staan (alleen telefoon). */
  balk?: string
  sizes: string
  priority?: boolean
}

export function ScrollScherm({ src, alt, breedte, hoogte, soort, balk, sizes, priority }: Props) {
  const [actief, setActief] = useState(false)
  const laatsteAanwijzer = useRef<string>('mouse')

  const frame = FRAME[soort]
  // Hoeveel schermhoogtes er onder de eerste liggen; daar hangt de duur aan,
  // zodat een lange site niet sneller voorbij raast dan een korte.
  const extraSchermen = Math.max(0, hoogte / breedte / (frame.h / frame.b) - 1)
  const duur = Math.min(16, Math.max(3, extraSchermen * 1.4))

  const rustig = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <button
      type="button"
      aria-label={`${alt}. Scrolt door de hele site.`}
      aria-pressed={actief}
      className={`relative block w-full cursor-ns-resize overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
        soort === 'telefoon' ? 'aspect-[390/844] rounded-[20px]' : 'aspect-[1440/900] rounded-[6px]'
      }`}
      onPointerDown={(e) => {
        laatsteAanwijzer.current = e.pointerType
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse' && !rustig()) setActief(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setActief(false)
      }}
      onClick={() => {
        if (laatsteAanwijzer.current !== 'mouse' && !rustig()) setActief((a) => !a)
      }}
      onFocus={(e) => {
        if (e.currentTarget.matches(':focus-visible') && !rustig()) setActief(true)
      }}
      onBlur={() => setActief(false)}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{
          objectPosition: actief ? '50% 100%' : '50% 0%',
          transition: actief
            ? `object-position ${duur}s cubic-bezier(0.45, 0.05, 0.55, 0.95)`
            : 'object-position 0.9s cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />
      {balk && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 block aspect-[390/56]">
          <Image src={balk} alt="" fill sizes={sizes} className="object-cover" />
        </span>
      )}
    </button>
  )
}
