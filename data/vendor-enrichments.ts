/**
 * Per-vendor unieke content — wordt geconsumeerd door
 * app/[locale]/integraties/[slug]/page.tsx als extra sectie boven
 * de generieke template-content.
 *
 * Doel: pSEO at scale. 245 vendor-pages met identieke template-structuur
 * worden door Google als thin content gezien. Per-vendor unieke
 * unieke vendor-context plus concrete stack-duiding haalt elke
 * pagina ruim boven de duplicate-content drempel.
 *
 * Source-of-truth: data/vendor-enrichments.json. Genereren via
 * `npm run vendor:enrich` (per nacht batch via cron) of in-context door
 * een Claude-sessie.
 *
 * Backwards-compatible: vendor zonder enrichment rendert de pagina exact
 * zoals voorheen.
 */

import enrichmentsData from './vendor-enrichments.json'

export interface VendorEnrichment {
  /** 1-2 alinea's: hoe Stevin deze vendor inzet of interpreteert. */
  stevinAngle: string
  /** 1 alinea: waar je deze bron naast legt, concreet en zonder jargon. */
  stackImpact: string
  /** Optioneel: 2-4 concrete pitfalls of valkuilen bij deze vendor. */
  pitfalls?: string[]
  /** Optioneel: ISO-datum laatst gegenereerd / gereviewed. */
  enrichedAt?: string
}

export type VendorEnrichmentsMap = Record<string, VendorEnrichment>

const enrichments = enrichmentsData as VendorEnrichmentsMap

export function getVendorEnrichment(slug: string): VendorEnrichment | null {
  const e = enrichments[slug]
  if (!e || !e.stevinAngle) return null
  return e
}

export function listEnrichedSlugs(): string[] {
  return Object.keys(enrichments).filter((s) => enrichments[s].stevinAngle)
}
