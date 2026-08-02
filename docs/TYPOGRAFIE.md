# Typografie stevin.ai: de heading-ladder

Datum: 2 augustus 2026. Status: stap 1 live, stap 2 en 3 open.
Dit is de bron van waarheid voor koppen op de hele site. Wie aan headings
werkt (mens, Claude of Codex) volgt dit document; afwijken = eerst dit
document aanpassen.

## Het principe

In een brede kolom maak je hierarchie met massa. In een smalle leeskolom
maak je hierarchie met ruimte. De Journal-leeskolom is 680px; daar gaat
een kop een stap omlaag in formaat en twee stappen in gewicht, en
compenseert hij met witruimte erboven.

Tweede principe: **de ruimte boven een kop is ongeveer 3x de ruimte
eronder.** Dat bindt een kop aan de tekst die hij aankondigt.

Aanleiding: de Journal-H2 stond op 32/800, hetzelfde gewicht als de H1.
In de smalle kolom las elke tussenkop daardoor als een tweede titel.

## De letter

**InterDisplay voor alle koppen, InterVariable voor alle lopende tekst.**
Zelf-gehost via next/font in `app/[locale]/layout.tsx`, bestanden in
`public/fonts/`. Beschikbare display-gewichten: 500, 600, 700, 800, 900.

Besluit 2 aug 2026 (Koen): geen nieuwe letter. Kandidaten (Schibsted
Grotesk, Cabinet Grotesk, General Sans, Bricolage Grotesque) zijn
bekeken en afgewezen ten gunste van de al gehoste InterDisplay.
Het onderscheid komt uit de ladder, niet uit de familie.

De oude situatie (Plus Jakarta Sans via een blokkerende Google-import op
regel 1 van `globals.css`, terwijl InterDisplay wel geladen maar nergens
gebruikt werd) is opgeruimd in commit `1cdb242`. Voeg NOOIT opnieuw een
Google Fonts-import toe.

## De ladder (desktop)

| Niveau | Context | Grootte | Gewicht | Line-height | Tracking | Marge boven/onder |
|---|---|---|---|---|---|---|
| H1 | hero | 64px | 700 | 1.05 | -0.035em | 0 / 24px |
| H1 | pagina zonder hero | 48px | 700 | 1.08 | -0.03em | 0 / 20px |
| H1 | Journal-titel | clamp(36,4.6vw,56) | 700 | 1.06 | -0.03em | 0 / 24px |
| H2 | landing, dienst, product | 34px | 600 | 1.15 | -0.025em | 96px / 20px |
| H2 | Journal-body | 27px | 600 | 1.25 | -0.02em | 48px / 16px |
| H3 | subsectie, kaart | 21px | 600 | 1.30 | -0.01em | 32px / 8px |
| H3 | Journal-body | 21px | 600 | 1.35 | -0.01em | 32px / 8px |

## Mobiel (onder 640px)

| Niveau | Grootte | Line-height | Tracking | Marge boven |
|---|---|---|---|---|
| H1 hero | 40px | 1.08 | -0.03em | 0 |
| H1 pagina | 34px | 1.10 | -0.028em | 0 |
| H2 landing | 28px | 1.18 | -0.022em | 64px |
| H2 Journal | 24px | 1.28 | -0.018em | 40px |
| H3 | 19px | 1.35 | -0.005em | 28px |

## Bron van waarheid in de code

1. **`app/globals.css`** is de enige plek waar heading-waarden staan.
   - `.journal-body h2 / h3`: bestaat, draagt de Journal-waarden. LIVE.
   - `@theme`-tokens plus drie semantische klassen `.h-hero`,
     `.h-section`, `.h-sub`: NOG TE BOUWEN (stap 2).
2. De globale regel `h1, h2, h3` blijft een vangnet: alleen font-family
   en een neutrale tracking, geen maten.
3. Landingspagina's gebruiken nu ~200 losse Tailwind-declaraties met
   negen verschillende tracking-waarden. Die worden in stap 3 pagina
   voor pagina vervangen door de drie klassen. Tot die tijd: geen nieuwe
   losse heading-stijlen toevoegen; nieuw werk gebruikt de klassen zodra
   ze bestaan.

## Harde randvoorwaarden

- **Geen enkele heading-TAG wijzigen.** Dit is presentatie. De regels
  van de release-audit (precies een H1, drie H2's per Journal-dispatch,
  Article/Breadcrumb-schema) staan los hiervan en blijven gelden.
- Gewicht 800/900 is voorbehouden aan de hero-H1 als daar ooit bewust
  voor gekozen wordt; standaard is de ladder hierboven. H2 is nooit
  zwaarder dan 600.
- Overshoot, optische correcties en per-pagina uitzonderingen: eerst
  hier vastleggen, dan bouwen.

## Status

| Stap | Wat | Status |
|---|---|---|
| 1 | Font-swap naar InterDisplay + Journal-H2/H3-waarden | LIVE, commit `1cdb242`, 2 aug 2026 |
| 2 | Tokens + `.h-hero` / `.h-section` / `.h-sub` in globals.css | open |
| 3 | Pagina voor pagina omzetten, beginnend bij home en /tarieven | open, per pagina reviewen |
