'use client'

/**
 * Meta-pixel (W-861): paginaweergaven naar Meta, alleen na toestemming voor
 * marketing. De aanvraag zelf (Lead) gaat mee in pushConversionEvent
 * (lib/tracking.ts). Mount in de root layout.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { META_PIXEL_ID, metaPaginaweergave, werkMetaPixelBij } from '@/lib/metaPixel'

export function MetaPixel() {
  const pathname = usePathname()
  const gemeld = useRef<string | null>(null)

  useEffect(() => {
    if (!META_PIXEL_ID) return
    const meld = () => {
      // Een pagina een keer, ook als de toestemming pas na het laden komt.
      if (gemeld.current === pathname) {
        werkMetaPixelBij()
        return
      }
      if (!werkMetaPixelBij()) return
      gemeld.current = pathname
      metaPaginaweergave()
    }
    meld()
    window.addEventListener('stevin:consent-updated', meld)
    return () => window.removeEventListener('stevin:consent-updated', meld)
  }, [pathname])

  return null
}
