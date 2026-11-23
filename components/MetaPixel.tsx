'use client'

/**
 * Meta-pixel (W-861): paginaweergaven naar Meta, alleen na toestemming voor
 * marketing. De aanvraag zelf (Lead) gaat mee in pushConversionEvent
 * (lib/tracking.ts). Mount in de root layout.
 *
 * W-879: elk bezoek aan de actiepagina gaat daarnaast, ook zonder cookiekeuze,
 * naar de Hub (meldBezoek). Die telt het en meldt het als PageView aan Meta met
 * hetzelfde event-ID als de pixel hier, zodat Meta het een keer telt. Het ID is
 * per pagina vast, ook als de toestemming pas na het laden komt.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { META_PIXEL_ID, MEET_PAD, meldBezoek, metaPaginaweergave, werkMetaPixelBij } from '@/lib/metaPixel'
import { generateEventId } from '@/lib/tracking'

export function MetaPixel() {
  const pathname = usePathname()
  const gemeld = useRef<string | null>(null)
  const bezoekGemeld = useRef<string | null>(null)
  const eventId = useRef<{ pad: string; id: string } | null>(null)
  const laatstePad = useRef<string | null>(null)

  useEffect(() => {
    // Een nieuwe navigatie is een nieuw bezoek, ook als je terugkomt op een pagina die je eerder meldde
    // (terug via de browser of een link): zonder reset telt het tweede bezoek niet.
    if (laatstePad.current !== pathname) {
      laatstePad.current = pathname
      bezoekGemeld.current = null
      gemeld.current = null
      eventId.current = null
    }
    if (eventId.current?.pad !== pathname) eventId.current = { pad: pathname, id: generateEventId() }
    const id = eventId.current.id
    // Eerst het bezoek zelf: onafhankelijk van de cookiekeuze en van of de pixel een ID heeft.
    if (MEET_PAD.test(pathname) && bezoekGemeld.current !== pathname) {
      bezoekGemeld.current = pathname
      meldBezoek(id)
    }
    if (!META_PIXEL_ID) return
    const meld = () => {
      // Een pagina een keer, ook als de toestemming pas na het laden komt.
      if (gemeld.current === pathname) {
        werkMetaPixelBij()
        return
      }
      if (!werkMetaPixelBij()) return
      gemeld.current = pathname
      // Alleen op de gemeten pagina's hetzelfde ID als de Hub; elders blijft de pixel zoals hij was.
      metaPaginaweergave(MEET_PAD.test(pathname) ? id : undefined)
    }
    meld()
    window.addEventListener('stevin:consent-updated', meld)
    return () => window.removeEventListener('stevin:consent-updated', meld)
  }, [pathname])

  return null
}
