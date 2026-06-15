'use client'

/**
 * Custom GA4 events, push naar dataLayer zodat GTM ze als events doorzet
 * naar GA4 (en eventueel andere destinations).
 *
 * Drie soorten events:
 *   1. Scroll-depth (25/50/75/100%): engagement-meting per page
 *   2. External-link clicks: uitgaande clicks (vooral naar bron-URLs in
 *      blog/dispatches en naar /integraties van vendors die we beschrijven)
 *   3. Outbound contact-clicks (mailto:, tel:, plan-een-gesprek)
 *
 * Geen impact op consent: events gaan via dataLayer, GTM respecteert de
 * consent-mode v2-state. Bij denied-state worden events gequeued maar
 * niet naar GA4 verzonden.
 *
 * Mount in root layout, niet per-page (dan loopt scroll-state niet door).
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100]

export function AnalyticsEvents() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Reset scroll-state bij pathname-change
    const reachedThresholds = new Set<number>()

    const pushEvent = (event: string, params: Record<string, unknown>) => {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event, ...params })
    }

    // ── Scroll depth tracking ────────────────────────────────
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)
      for (const threshold of SCROLL_THRESHOLDS) {
        if (pct >= threshold && !reachedThresholds.has(threshold)) {
          reachedThresholds.add(threshold)
          pushEvent('scroll_depth', {
            scroll_depth_threshold: threshold,
            page_path: pathname,
          })
        }
      }
    }

    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    const debouncedScroll = () => {
      if (scrollTimer) return
      scrollTimer = setTimeout(() => {
        onScroll()
        scrollTimer = null
      }, 250)
    }
    window.addEventListener('scroll', debouncedScroll, { passive: true })

    // ── Click tracking (external links + contact clicks) ─────
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null
      if (!target) return

      const href = target.getAttribute('href') ?? ''
      if (!href) return

      // Mailto / Tel: contact-conversies
      if (href.startsWith('mailto:')) {
        pushEvent('contact_click', {
          contact_method: 'email',
          contact_value: href.replace('mailto:', ''),
          page_path: pathname,
        })
        return
      }
      if (href.startsWith('tel:')) {
        pushEvent('contact_click', {
          contact_method: 'phone',
          contact_value: href.replace('tel:', ''),
          page_path: pathname,
        })
        return
      }

      // External http(s) links die naar een ander host gaan
      if (href.startsWith('http://') || href.startsWith('https://')) {
        try {
          const url = new URL(href)
          if (url.hostname !== window.location.hostname) {
            pushEvent('external_link_click', {
              outbound_url: href,
              outbound_host: url.hostname,
              page_path: pathname,
            })
          }
        } catch {
          /* invalid URL, skip */
        }
      }

      // Plan-een-gesprek button click (heeft geen href naar mailto/tel,
      // maar wel naar /contact route, track als demo-intent signal)
      if (href === '/contact' || href === '/nl/contact' || href === '/en/contact') {
        pushEvent('demo_intent', {
          source_page: pathname,
        })
      }
    }
    document.addEventListener('click', onClick, { passive: true })

    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      document.removeEventListener('click', onClick)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [pathname])

  return null
}
