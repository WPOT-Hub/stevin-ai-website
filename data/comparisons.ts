/**
 * Vendor-vergelijkings-pages, programmatic SEO playbook "X vs Y".
 *
 * Doel: vangen van comparison-zoekers die in vergelijkingsfase zitten.
 * Hoog-intent verkeer ("X vs Y" = bijna-koop), high-conversion potentie.
 *
 * Source-of-truth: dit bestand. Per vergelijking: 1 unieke pagina met
 * Stevin's praktijk-perspectief over wanneer welke vendor beter past.
 *
 * URL-patroon: /vergelijken/<slug-a>-vs-<slug-b>
 * Slug-format: alfabetisch gesorteerd (klaviyo-vs-mailchimp, niet
 * mailchimp-vs-klaviyo), voorkomt duplicate content.
 */

export interface ComparisonSection {
  /** Sectie-titel ("Wanneer kies je Klaviyo", "Wanneer kies je Mailchimp", etc.) */
  heading: string
  /** Body-tekst, 1-3 alinea's. */
  body: string
}

export interface Comparison {
  /** Slug = `${slugA}-vs-${slugB}`, alfabetisch gesorteerd. */
  slug: string
  /** Vendor A slug (matcht data/integrations.ts) */
  slugA: string
  /** Vendor B slug (matcht data/integrations.ts) */
  slugB: string
  /** Display-naam A (bv. "Klaviyo") */
  nameA: string
  /** Display-naam B (bv. "Mailchimp") */
  nameB: string
  /** SERP-titel, pakt comparison-zoekers */
  title: string
  /** Meta-description, max 160 chars */
  dek: string
  /** TL;DR, 1-2 zinnen voor wie te lui is om te scrollen */
  tldr: string
  /** Wanneer kies je A (~120-180 wrd, concrete praktijk) */
  whenA: string
  /** Wanneer kies je B (~120-180 wrd, concrete praktijk) */
  whenB: string
  /** Kosten-vergelijking (~80-120 wrd) */
  costs: string
  /** Stevin's veld-observatie, wat we in de praktijk zien (~120-180 wrd) */
  stevinView: string
  /** Optioneel: 3-5 FAQs voor FAQPage JSON-LD */
  faqs?: { question: string; answer: string }[]
  /** Publicatiedatum (ISO) */
  publishedAt: string
  /** Optioneel: laatst bijgewerkt */
  updatedAt?: string
}

export const comparisons: Comparison[] = [
  {
    slug: 'aizy-vs-stevin',
    slugA: 'aizy',
    slugB: 'stevin',
    nameA: 'Aizy',
    nameB: 'Stevin.AI',
    title: 'Aizy vs Stevin.AI: welke past bij jouw bedrijf?',
    dek: 'Twee AI-marketingbedrijven uit Breda, twee verschillende keuzes. Aizy stuurt op prestatie en automatisering, Stevin.AI op controle en eigenaarschap. Een eerlijke vergelijking.',
    tldr: 'Aizy is gebouwd voor bedrijven die vanaf ongeveer 5.000 euro per maand adverteren en het werk willen uitbesteden aan een systeem dat 24/7 optimaliseert. Stevin.AI is gebouwd voor bedrijven die willen dat het klopt en dat controleerbaar blijft, met een lagere instap en eigenaarschap dat vastligt.',
    whenA: `Kies Aizy als je maandelijkse advertentiebudget richting de 5.000 euro of hoger gaat en je vooral prestatie zoekt. Hun model draait om automatische optimalisatie over Google, Meta en TikTok, met een vaste expert die op de doelen stuurt. Ze omschrijven het zelf als "AI verwerkt de data, mensen geven richting".

Ze zijn opgericht in 2024 in Breda en haalden sindsdien ongeveer 3,5 miljoen euro op. Dat betekent capaciteit: meer mensen, sneller doorontwikkelen, en een langere adem dan een klein bureau. Ze bedienen onder meer retail en e-commerce, automotive, health en B2B.

Wil je alle drie de grote advertentiekanalen in een pakket en past je budget bij hun instapniveau, dan is dat een logische keuze.`,
    whenB: `Kies Stevin.AI als je eerst wilt weten of het klopt voordat je ergens aan vastzit. Het begint niet met een contract maar met een diagnose op je eigen cijfers: telt je meting echte aanvragen, staan je accounts op naam van je eigen bedrijf, en wie staat er geregistreerd als betaler van je advertenties.

Daarna zetten we het fundament goed en beheren we actief, met signalen die dag en nacht meekijken, ook op ons eigen werk. Elke wijziging krijgt een naam, een moment en een reden, in een logboek waar je altijd in kunt kijken. Onder alles ligt een marketinggeheugen dat onthoudt wat werkte per seizoen en kanaal, zodat een volgende campagne niet bij nul begint.

En het belangrijkste verschil: accounts, data en kennis blijven van jou, met een exit die vanaf dag een is ingebouwd.`,
    costs: `Aizy hanteert vaste pakketten (stand juli 2026): 199 euro per maand om zelf te draaien, 850 euro voor Google en Meta onder 2.000 euro advertentiebudget, 1.400 euro tot 5.000 euro budget, 1.850 euro daarboven, en maatwerk boven de 10.000 euro. Beheer begint dus bij 850 euro per maand.

Stevin.AI begint bij 399 euro per maand, en volledig beheer is maatwerk na de diagnose. Geen verborgen marges op je mediabudget en geen instaptarief dat stiekem verdubbelt.

Het praktische verschil zit in de onderkant: zit je onder de 2.000 euro advertentiebudget per maand, dan val je onder Aizy's instapniveau voor beheer. Controleer bij beide partijen de actuele tarieven, want prijzen veranderen.`,
    stevinView: `Wij denken dat dit geen keuze is tussen goed en slecht, maar tussen twee opvattingen over wat je koopt.

Aizy verkoopt prestatie en gemak: zet het aan, het systeem optimaliseert, jij houdt tijd over. Voor een bedrijf met budget en haast is dat een aantrekkelijk aanbod.

Wij verkopen zekerheid: dat de basis klopt, dat je kunt zien wat er gebeurt en waarom, en dat je zonder verlies weg kunt lopen. Dat is trager te verkopen, want een diagnose duurt langer dan een aanmelding.

Een ding is opvallend en het is te controleren: op de publieke pagina's van Aizy staat niets over eigenaarschap van je advertentie-accounts, niets over eigenaarschap van je data, en geen opzegtermijn (gecontroleerd juli 2026). Dat hoeft niets te betekenen, maar het zijn wel de vragen die wij bewust vooraan zetten. Stel ze aan elke partij waarmee je praat, ook aan ons.`,
    faqs: [
      {
        question: 'Zijn Aizy en Stevin.AI concurrenten?',
        answer: 'Deels. Beide combineren AI met menselijke expertise voor advertising, en beide zitten in Breda. Maar de instap verschilt: Aizy richt zich op bedrijven vanaf ongeveer 5.000 euro advertentiebudget per maand, Stevin.AI begint lager en start altijd met een diagnose.',
      },
      {
        question: 'Wie is goedkoper?',
        answer: 'Stevin.AI heeft een lagere instap (vanaf 399 euro per maand tegenover 850 euro voor Aizy\'s eerste beheerpakket). Bij hogere advertentiebudgetten hangt het af van wat je nodig hebt; beide werken dan met maatwerk.',
      },
      {
        question: 'Blijven mijn accounts van mij?',
        answer: 'Bij Stevin.AI ja, dat is vastgelegd: accounts op naam van je eigen bedrijf, exporteerbare data en een overdraagbaar dossier. Vraag dit bij elke partij expliciet na en laat het op papier zetten, wat je ook kiest.',
      },
      {
        question: 'Kan ik overstappen als het niet bevalt?',
        answer: 'Dat hangt af van hoe het geregeld is. Controleer drie dingen: op wiens naam staan de advertentie-accounts, kun je je data exporteren, en wat is de opzegtermijn. Bij Stevin.AI is de exit vanaf dag een ingebouwd.',
      },
    ],
    publishedAt: '2026-07-25',
  },
]

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug)
}
