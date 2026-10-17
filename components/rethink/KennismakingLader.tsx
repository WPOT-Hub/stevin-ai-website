'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { usePathname } from '@/i18n/navigation'

/**
 * Laadt het kennismakingsvenster pas als iemand het nodig heeft (17 okt 2026).
 *
 * Waarom. Het venster stond per pagina (home, tarieven, contact, blokken).
 * Op elke andere pagina ving niemand de klik op "Kennismaken" in de header op,
 * dus stuurde de link je naar /kennismaking, de oude pagina met Cal.com
 * (Koen, iPhone, 17 okt). Nu staat deze lader een keer in de layout: overal
 * opent de knop hetzelfde nieuwe venster.
 *
 * Snelheid. Het venster is ruim 1.000 regels code. Die laadt nu niet meer
 * mee met elke pagina. Bij aanraken of hover van een knop halen we de code
 * alvast op, en anders in een rustig moment na het laden, zodat het venster
 * bij de klik direct open is.
 *
 * Op /kennismaking (de link die we in mails en WhatsApp sturen) opent het
 * venster meteen.
 */

const laadVenster = () => import('./KennismakingVenster')
const Venster = dynamic(laadVenster, { ssr: false })

export default function KennismakingLader() {
  const pathname = usePathname()
  const direct = pathname === '/kennismaking'
  const [laad, setLaad] = useState(direct)
  const [bron, setBron] = useState<string | undefined>(direct ? 'pagina_kennismaking' : undefined)

  useEffect(() => {
    if (direct) {
      setBron('pagina_kennismaking')
      setLaad(true)
    }
  }, [direct])

  useEffect(() => {
    if (laad) return
    const knop = (e: Event) => (e.target as Element | null)?.closest?.('[data-open-kennismaking]')
    const klik = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const el = knop(e)
      if (!el) return
      e.preventDefault()
      setBron(el.getAttribute('data-cta') ?? '')
      setLaad(true)
    }
    const vooraf = (e: Event) => {
      if (knop(e)) void laadVenster()
    }
    document.addEventListener('click', klik, true)
    document.addEventListener('pointerover', vooraf, { passive: true })
    document.addEventListener('touchstart', vooraf, { passive: true })

    // In een rustig moment na het laden de code alvast ophalen.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    let rust = 0
    const naLaden = () => {
      rust = w.requestIdleCallback ? w.requestIdleCallback(() => void laadVenster(), { timeout: 4000 }) : window.setTimeout(() => void laadVenster(), 3000)
    }
    if (document.readyState === 'complete') naLaden()
    else window.addEventListener('load', naLaden, { once: true })

    return () => {
      document.removeEventListener('click', klik, true)
      document.removeEventListener('pointerover', vooraf)
      document.removeEventListener('touchstart', vooraf)
      window.removeEventListener('load', naLaden)
      if (rust && !w.requestIdleCallback) window.clearTimeout(rust)
    }
  }, [laad])

  return laad ? <Venster startOpen bron={bron} /> : null
}
