/**
 * Een event in de dataLayer zetten zonder dat zijn parameters blijven hangen.
 *
 * W-346 (12 okt 2026): GTM voegt elke push samen in een datamodel en een
 * dataLayer-variabele leest dat model, niet alleen de laatste push. Daardoor
 * ging een parameter van een eerder event mee met elk later event: na een klik
 * op een hero-knop droeg elke scroll_depth nog demo_node en demo_vraag, en na
 * een cta_click droeg elke scroll_depth op de volgende pagina cta_label,
 * cta_href, cta_id en bron (gemeten op stevin.ai, 12 okt). Ook een cta_click
 * zonder data-cta kreeg het cta_id van de vorige klik.
 *
 * Daarom zet deze helper direct na het event dezelfde sleutels terug op
 * undefined. GTM verwerkt de pushes op volgorde, dus de tags van het event
 * zien zijn eigen waarden en het volgende event ziet ze niet meer. Een
 * GA4-eventtag laat een parameter zonder waarde weg. Getest met een
 * werkruimte-voorbeeld van de webcontainer: elk event droeg daarna alleen zijn
 * eigen parameters.
 *
 * Gebruik deze helper voor elk eigen event; een losse dataLayer.push met
 * parameters brengt het lek terug.
 */
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] }

export function pushDataLayerEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...params })
  const sleutels = Object.keys(params)
  if (!sleutels.length) return
  const leeg: Record<string, unknown> = {}
  for (const k of sleutels) leeg[k] = undefined
  w.dataLayer.push(leeg)
}
