/**
 * Microsoft Clarity: gratis heatmaps + session recordings.
 *
 * Geen event-limiet (anders dan GA4's 10M/maand). Geen aparte cookie-consent
 * nodig wanneer je Clarity in "consent-pending" mode draait. Clarity
 * registreert dan alleen als de gebruiker analytics-cookies heeft toegestaan.
 *
 * Gated op NEXT_PUBLIC_CLARITY_PROJECT_ID env var. Wanneer niet gezet,
 * rendert het component niets, geen fail bij deploy zonder credentials.
 *
 * Setup:
 *   1. clarity.microsoft.com → New project → naam "Stevin.AI"
 *   2. Kopieer de project-ID (10 chars, bv. abc123de4f)
 *   3. Vercel → Project → Settings → Environment Variables:
 *      NEXT_PUBLIC_CLARITY_PROJECT_ID = <id>
 *   4. Re-deploy
 */
import Script from 'next/script'

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

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
