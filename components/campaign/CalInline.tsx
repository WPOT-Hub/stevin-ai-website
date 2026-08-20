'use client'

import Script from 'next/script'
import {
  getCampaignCalNamespace,
  type CampaignDomain,
} from '@/content/campaign-landings/domains'
import type {
  CalEventSlug,
  CampaignAngleId,
} from '@/content/campaign-landings/types'

interface CalInlineProps {
  domain: CampaignDomain
  angle: CampaignAngleId
  eventSlug: CalEventSlug
}

export function CalInline({ domain, angle, eventSlug }: CalInlineProps) {
  const namespace = getCampaignCalNamespace(domain)
  const elementId = `cal-inline-${namespace}`
  const inlineConfig = {
    elementOrSelector: `#${elementId}`,
    calLink: `stevin/${eventSlug}`,
    config: {
      layout: 'month_view',
      utm_source: 'lp',
      utm_medium: 'cold',
      utm_campaign: domain,
      angle,
    },
  }

  const embedCode = `
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
    window.Cal('init', ${JSON.stringify(namespace)}, { origin: 'https://cal.com' });
    window.Cal.ns[${JSON.stringify(namespace)}]('inline', ${JSON.stringify(inlineConfig)});
    window.Cal.ns[${JSON.stringify(namespace)}]('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view'
    });
  `

  return (
    <>
      <div
        id={elementId}
        className="min-h-[720px] w-full overflow-auto rounded-xl bg-white"
      />
      <Script
        id={`cal-embed-${namespace}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    </>
  )
}
