import Script from 'next/script'

const GTM_ID = 'GTM-WHSXRR29'
// Web container gtm.js is loaded from Google's CDN.
// The server-side container at https://data.stevin.ai handles tracking hits
// (GA4 transport_url, Meta CAPI) — configured inside GTM tags, not via script loading.

export function GoogleTagManagerHead() {
  return (
    <>
      {/*
       * Consent Mode v2 — MOET vóór GTM staan (strategy="beforeInteractive")
       * Alle signalen default denied. wait_for_update geeft CMP 500ms om te laden.
       * ads_data_redaction: IP + gclid worden geredigeerd bij denied ad_storage.
       * url_passthrough: consent-context via URL ipv cookies bij denied.
       */}
      <Script
        id="consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage':              'denied',
              'analytics_storage':       'denied',
              'ad_user_data':            'denied',
              'ad_personalization':      'denied',
              'functionality_storage':   'denied',
              'personalization_storage': 'denied',
              'security_storage':        'granted',
              'wait_for_update':         500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `,
        }}
      />
      {/*
       * Google Tag Manager web container.
       * Script laadt van www.googletagmanager.com (standard loading).
       * Tracking hits (GA4, Meta CAPI) gaan via data.stevin.ai — dat is geconfigureerd
       * in de GTM tags zelf (transport_url / server_container_url), niet hier.
       */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  )
}

export function GoogleTagManagerBody() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
