'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { pushConversionEvent } from '@/lib/tracking'

/**
 * W-480: de agenda van Cal.com op stevin.ai/kennismaking, in plaats van een
 * kale link naar cal.com.
 *
 * Aanleiding (6 okt 2026): de boekingslink in een WhatsApp aan een lead gaf de
 * preview van Cal.com zelf (hun logo, een raster en een losse avatar). Koen:
 * "wat is die OG lelijk!" Cal.com laat dat plaatje niet vervangen, dus de link
 * wijst nu naar een eigen pagina met een eigen preview, en de agenda staat daar
 * in de pagina.
 *
 * Embed en boekingsmeting zijn overgenomen van de campagnepagina's
 * (components/campaign/CalInline.tsx en CampaignTracking.tsx), die werken,
 * maar zonder de koppeling aan een koud verzenddomein.
 *
 * Herkomst: de links die we sturen dragen utm_source, utm_medium en
 * utm_campaign. GA4 legt die zelf vast als bron van de sessie, dus
 * meeting_booked hoeft ze niet mee te sturen. Het event draagt alleen
 * event_slug, omdat de GTM-webcontainer (v10, tag "GA4 Event - site
 * interacties") precies die parameter doorstuurt; een parameter die GTM niet
 * doorlaat zou hier stil verdwijnen (REGEL #7). De utm-waarden gaan wel mee
 * naar Cal.com, zodat ze ook bij de boeking zelf staan.
 */

const NAMESPACE = 'kennismaking'
const ELEMENT_ID = 'cal-inline-kennismaking'
const HERKOMST_SLEUTELS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const

type CalEvent = {
  detail?: { data?: { uid?: string; startTime?: string; status?: string } }
}

type CalNamespace = (
  instruction: string,
  options: { action: string; callback: (event: CalEvent) => void },
) => void

declare global {
  interface Window {
    stevinKennismakingListener?: boolean
  }
}

// De officiele embed-snippet van Cal.com, zoals in CalInline. De utm-waarden
// worden pas in de browser uit de URL gelezen, zodat deze string statisch blijft.
const EMBED = `
  (function (C, A, L) {
    var push = function (api, args) { api.q.push(args); };
    var doc = C.document;
    C.Cal = C.Cal || function () {
      var cal = C.Cal;
      var args = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        var script = doc.createElement('script');
        script.src = A;
        doc.head.appendChild(script);
        cal.loaded = true;
      }
      if (args[0] === L) {
        var api = function () { push(api, arguments); };
        var ns = args[1];
        api.q = api.q || [];
        if (typeof ns === 'string') {
          cal.ns[ns] = cal.ns[ns] || api;
          push(cal.ns[ns], args);
          push(cal, ['initNamespace', ns]);
        } else {
          push(cal, args);
        }
        return;
      }
      push(cal, args);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');
  (function () {
    var herkomst = {};
    var params = new URLSearchParams(window.location.search);
    ${JSON.stringify(HERKOMST_SLEUTELS)}.forEach(function (k) {
      var v = params.get(k);
      if (v) herkomst[k] = v.slice(0, 80);
    });
    var config = Object.assign({ layout: 'month_view' }, herkomst);
    window.Cal('init', '${NAMESPACE}', { origin: 'https://cal.com' });
    window.Cal.ns['${NAMESPACE}']('inline', {
      elementOrSelector: '#${ELEMENT_ID}',
      calLink: 'koen-hoogenboom/kennismaking',
      config: config
    });
    window.Cal.ns['${NAMESPACE}']('ui', { hideEventTypeDetails: false, layout: 'month_view' });
  })();
`

export function KennismakingAgenda() {
  useEffect(() => {
    const geteld = new Set<string>()
    let pogingen = 0

    const registreer = (): boolean => {
      if (window.stevinKennismakingListener) return true
      const ns = (window.Cal?.ns as Record<string, CalNamespace> | undefined)?.[NAMESPACE]
      if (!ns) return false
      window.stevinKennismakingListener = true
      ns('on', {
        action: 'bookingSuccessfulV2',
        callback: (event) => {
          const boeking = event.detail?.data
          const sleutel = boeking?.uid ?? boeking?.startTime ?? 'zonder-id'
          if (geteld.has(sleutel)) return
          geteld.add(sleutel)
          void pushConversionEvent('meeting_booked', undefined, { event_slug: 'kennismaking' })
        },
      })
      return true
    }

    if (registreer()) return
    const timer = window.setInterval(() => {
      pogingen += 1
      if (registreer() || pogingen >= 240) window.clearInterval(timer)
    }, 250)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <div id={ELEMENT_ID} className="min-h-[720px] w-full overflow-auto rounded-xl bg-white" />
      <Script id="cal-embed-kennismaking" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: EMBED }} />
    </>
  )
}
