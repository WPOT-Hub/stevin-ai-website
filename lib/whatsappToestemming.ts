// WhatsApp-toestemming op het formulier en in het kennismakingsvenster (8 nov 2026).
// Standaard uit. Alleen als het vinkje aan staat en er een telefoonnummer is,
// gaat whatsapp_toestemming: true mee naar de Hub. Anders laten we het veld weg,
// zodat Simon een nieuwe lead nooit zonder ja appt.
// Tekst letterlijk zoals Koen hem goedkeurde: niet aanpassen zonder zijn akkoord.
export const WHATSAPP_TOESTEMMING_TEKST =
  'Ja, Stevin.AI mag me via WhatsApp antwoord en een herinnering sturen. Stoppen kan altijd met STOP.'

export function whatsappToestemmingVeld(vinkje: boolean, telefoon: string): { whatsapp_toestemming?: true } {
  return vinkje && telefoon.trim() ? { whatsapp_toestemming: true } : {}
}
