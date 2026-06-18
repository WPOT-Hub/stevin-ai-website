/**
 * Engelse vertaling van de vendor-pagina-content (basisvelden + enrichment),
 * per slug. Gebruikt door app/[locale]/integraties/[slug]/page.tsx wanneer
 * locale === 'en', zodat de /en vendor-pagina volledig Engels rendert in plaats
 * van de Nederlandse data te tonen.
 *
 * De canonical van die pagina's blijft naar de NL-URL wijzen (zie page.tsx),
 * dus dit is taalcoherentie voor /en-bezoekers, geen aparte EN-indexatie.
 *
 * Source: gegenereerd vertaald uit data/integrations.ts + vendor-enrichments.json.
 */

import enData from './vendor-content-en.json'

export interface VendorContentEn {
  shortDescription: string
  description: string
  useCase: string
  howWeUseIt: string
  problemsSolved: string[]
  stevinAngle: string
  stackImpact: string
  pitfalls: string[]
  faqs?: { question: string; answer: string }[]
}

const content = enData as Record<string, VendorContentEn>

export function getVendorContentEn(slug: string): VendorContentEn | null {
  return content[slug] ?? null
}
