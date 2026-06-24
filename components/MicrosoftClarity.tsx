/**
 * Microsoft Clarity: gratis heatmaps + session recordings.
 *
 * Geen event-limiet (anders dan GA4's 10M/maand). Geen aparte cookie-consent
 * nodig wanneer je Clarity in "consent-pending" mode draait. Clarity
 * registreert dan alleen als de gebruiker analytics-cookies heeft toegestaan.
 *
 * Project-ID is GEEN secret (staat sowieso client-side in de HTML), dus de
 * waarde van het live "Stevin.AI"-project staat hardcoded als default. De
 * env-var NEXT_PUBLIC_CLARITY_PROJECT_ID kan dit overschrijven (bijv. voor een
 * staging-project), maar een lege of ontbrekende env-var kan Clarity nooit
 * meer per ongeluk uitzetten. Live project: clarity.microsoft.com, "Stevin.AI".
 */
import Script from 'next/script'

// Default = het live Stevin.AI Clarity-project. Env-var overschrijft indien gezet.
const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'wmggc0voks'

export function MicrosoftClarity() {
  if (!PROJECT_ID) return null
  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${PROJECT_ID}");
        `,
      }}
    />
  )
}
