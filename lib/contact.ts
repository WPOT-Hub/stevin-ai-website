// W-748: het vaste nummer van Stevin.AI (076 201 0000).
// Een plek voor nummer en WhatsApp-schakelaar, zodat footer, kennismaking,
// JSON-LD en straks de vraagbot hetzelfde tonen.
//
// whatsappActief blijft false tot WhatsApp de beoordeling van de 076 heeft
// afgerond (stand 6 nov 2026: "Account wordt beoordeeld"). Zolang dit false
// is, toont de site nergens een WhatsApp-link.
export const CONTACT = {
  telefoon: '+31762010000',
  whatsappActief: false,
} as const

// Zo staat het nummer op de site: rustig, in Nederlandse notatie.
export const TELEFOON_WEERGAVE = '076 201 0000'

export const TELEFOON_HREF = `tel:${CONTACT.telefoon}`
