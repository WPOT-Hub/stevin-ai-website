'use client'

import { useEffect, useRef } from 'react'

/**
 * Het vinkje tegen robots (Cloudflare Turnstile). Verhuisd uit
 * KennismakingVenster.tsx (W-752) zodat de vraagbot hetzelfde vinkje
 * gebruikt; de werking is ongewijzigd.
 */

// Cloudflare Turnstile, zoals Swoep (Koen, 11 okt 01:28). De server moet het
// token controleren bij Cloudflare; zonder sitekey wordt er niets getoond.
export const TURNSTILE_SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ?? ''

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id: string) => void
    }
  }
}

// Een token is maar een keer geldig: de ouder reset het widget na elke
// verzending via widgetRef, en een nieuw widget erft nooit een oud token.
// Het script laadt zodra het formulier verschijnt, niet al bij het openen van
// het venster. Eerder pas bij de eerste focus: wie met automatisch invullen
// meteen verstuurde, kreeg een melding over een vinkje dat er nog niet was.
//
// Lukt de controle niet (script geblokkeerd, netwerk, een hostnaam die niet
// in het widget staat), dan is er geen token en gaat het formulier zonder weg.
// Geen melding meer en geen uitweg naar de mail: de server bewaart de
// aanvraag en markeert hem (11 okt 09:17).
export function Turnstile({
  onToken,
  onMislukt,
  widgetRef,
  actiefRef,
}: {
  onToken: (t: string) => void
  onMislukt: () => void
  widgetRef: React.RefObject<string>
  // Staat er een widget op het scherm (ook als het script nog laadt)?
  actiefRef: React.RefObject<boolean>
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!TURNSTILE_SITEKEY || !ref.current) return
    let id = ''
    let weg = false
    actiefRef.current = true
    const mislukt = () => {
      if (!weg) onMislukt()
    }
    const teken = () => {
      if (weg || !window.turnstile || !ref.current || id) return
      try {
        id = window.turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITEKEY,
          language: 'nl',
          // Alleen zichtbaar als Cloudflare een handeling vraagt; anders ziet de
          // bezoeker niets (CRO-synthese 11 okt, A3).
          appearance: 'interaction-only',
          callback: (t: string) => onToken(t),
          'expired-callback': () => onToken(''),
          // Met een error-callback gooit Turnstile zelf geen fout; true zegt
          // dat hij is afgehandeld (Cloudflare, Client-side errors). Turnstile
          // probeert het daarna zelf opnieuw.
          // Het formulier wacht dan niet meer op een token.
          'error-callback': () => {
            mislukt()
            return true
          },
        })
      } catch {
        mislukt()
        return
      }
      widgetRef.current = id
    }
    let sc: Element | null = null
    if (window.turnstile) teken()
    else {
      const bestaand = document.querySelector('script[data-turnstile]')
      sc = bestaand ?? Object.assign(document.createElement('script'), {
        src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        async: true,
      })
      sc.setAttribute('data-turnstile', '')
      sc.addEventListener('load', teken)
      // Script geblokkeerd of geen netwerk: niet wachten op een token.
      sc.addEventListener('error', mislukt)
      if (!bestaand) document.head.appendChild(sc)
    }
    return () => {
      weg = true
      sc?.removeEventListener('load', teken)
      sc?.removeEventListener('error', mislukt)
      actiefRef.current = false
      if (id && window.turnstile) window.turnstile.remove(id)
      widgetRef.current = ''
      onToken('')
    }
  }, [onToken, onMislukt, widgetRef, actiefRef])
  if (!TURNSTILE_SITEKEY) return null
  return <div ref={ref} />
}
