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
    clarity?: (...args: unknown[]) => void
  }
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100]

// Clarity custom tags. Maakt sessies in het Clarity-dashboard filterbaar op
// kanaal, taal en intentie, zodat de heatmaps en recordings te segmenteren
// zijn (bijv. "recordings van betaald verkeer dat demo-intentie toonde maar
// niet converteerde"). Clarity laadt via strategy afterInteractive, dus
// window.clarity kan vlak na mount nog niet bestaan: kort pollen.
function tagClarity(key: string, value: string) {
  if (typeof window.clarity === 'function') {
    window.clarity('set', key, value)
    return
  }
  let tries = 0
  const iv = setInterval(() => {
    if (typeof window.clarity === 'function') {
      window.clarity('set', key, value)
      clearInterval(iv)
    } else if (++tries > 20) {
      clearInterval(iv)
    }
  }, 300)
}

// Entry-kanaal afleiden uit UTM of referrer. Een grove indeling is genoeg om
// recordings per kanaal terug te kijken; de exacte attributie zit in GA4.
function deriveChannel(): string {
  try {
    const utm = new URLSearchParams(window.location.search).get('utm_source')
    if (utm) return utm.toLowerCase().slice(0, 40)
    const ref = document.referrer
    if (!ref) return 'direct'
    const host = new URL(ref).hostname.replace(/^www\./, '')
    if (host === window.location.hostname) return 'internal'
    if (/google\.|bing\.|duckduckgo|ecosia|yahoo/.test(host)) return 'organic'
    if (/linkedin|t\.co|twitter|x\.com|facebook|instagram|reddit/.test(host)) return 'social'
    return 'referral'
  } catch {
    return 'direct'
  }
}

function pageType(pathname: string): string {
  const p = pathname.replace(/^\/en/, '') || '/'
  if (p === '/') return 'home'
  if (p.startsWith('/integraties/')) return 'integration'
  if (p.startsWith('/blog/')) return 'blog'
  if (p.startsWith('/producten')) return 'product'
  if (p.startsWith('/woordenboek/') || p.startsWith('/vergelijken/') || p.startsWith('/alternatief/')) return 'longtail'
  return 'page'
}

export function AnalyticsEvents() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Clarity-segmentatie. Taal en page-type per pagina, kanaal alleen op de
    // eerste sessie-load (de echte entry-bron, niet een interne navigatie).
    tagClarity('locale', pathname.startsWith('/en') ? 'en' : 'nl')
    tagClarity('page_type', pageType(pathname))
    try {
      if (!sessionStorage.getItem('clarity_channel')) {
        const channel = deriveChannel()
        sessionStorage.setItem('clarity_channel', channel)
        tagClarity('channel', channel)
      }
    } catch {
      /* sessionStorage geblokkeerd (private mode), kanaal-tag overslaan */
    }

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
        // Clarity: markeer de sessie als demo-intentie, zodat je later kunt
        // filteren op wie wel intentie toonde maar het formulier niet afrondde.
        tagClarity('demo_intent', 'yes')
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
