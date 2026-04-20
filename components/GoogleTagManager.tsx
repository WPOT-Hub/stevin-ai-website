import Script from 'next/script'

const GTM_ID = 'GTM-WHSXRR29'
// sGTM server-side endpoint — first-party script serving
const SGTM_URL = 'https://data.stevin.ai'

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
       * Google Tag Manager — laadt via first-party sGTM endpoint (data.stevin.ai)
       * GA4 property G-WGB40XGYLF is geconfigureerd als tag inside GTM.
       * transport_url in de GA4-tag in sGTM stuurt hits naar data.stevin.ai/g/collect.
       */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            '${SGTM_URL}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
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
