// WhatsApp-toestemming op het formulier en in het kennismakingsvenster.
// 9 nov 2026 (Koen): geen vinkje meer. Onder het telefoonveld staat deze regel.
// Wie zijn nummer invult, ziet de regel en geeft daarmee toestemming. Alleen met
// een ingevuld nummer gaat whatsapp_toestemming: true mee naar de Hub.
// Tekst niet aanpassen zonder akkoord van Koen: de Hub bewaart hem als bewijs.
export const WHATSAPP_TOESTEMMING_TEKST =
  'Vul je je nummer in, dan krijg je ons antwoord en een herinnering via WhatsApp. Stoppen kan met STOP.'

export function whatsappToestemmingVeld(telefoon: string): { whatsapp_toestemming?: true } {
  return telefoon.trim() ? { whatsapp_toestemming: true } : {}
}
