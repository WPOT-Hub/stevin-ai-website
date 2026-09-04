# Stevin Journal — Schrijfgids

Dit document is de canonieke stem-gids voor alles wat onder Stevin Journal wordt
gepubliceerd. Twee formats, één toon.

## Formats

### Editorial — lange stukken (8-14 min)

- 1.500-3.500 woorden
- Drop-cap, body-figure, takeaways, pull-quote, callout, end-rule
- Stevin-mening expliciet — wij vinden hier iets van
- Eindigt met een praktische conclusie of een vraag
- Frequentie: wekelijks

### Dispatch — kort nieuws (2-4 min)

- 300-500 woorden
- Geen drop-cap, geen poster — tekst-only
- Externe gebeurtenis + één paragraaf Stevin-duiding ("Wat dit betekent voor jou")
- Bron-attributie verplicht (via NU.nl, Tweakers, Emerce, etc.)
- Frequentie: dagelijks tijdens werkdagen

## Acht regels (gelden voor beide formats)

### 1. News-lead in zin 1-3

De eerste alinea bevat: wie, wat, wanneer. Geen warm-up, geen
context-vooraf. De lezer weet binnen drie zinnen waar het over gaat.

> **Wel:** "Spotify werkt aan een verplichte verificatieprocedure voor uploads.
> Labels en distributeurs moeten gaan aantonen dat de uitvoerder van een track
> een echte persoon is."
>
> **Niet:** "Iedereen heeft het tegenwoordig over AI-muziek. Maar wat als
> Spotify er nu eindelijk iets aan ging doen?"

### 2. Specifieke getallen, geen zachte kwantificeringen

"Tienduizenden uploads per maand", "94,7%", "drie maanden lang", "€50.000 per
maand". Niet: "veel", "een hoop", "flink wat", "groot aantal".

Als een getal er niet is — laat het weg. Verzin niets.

### 3. Korte alinea's, één gedachte per stuk

Maximaal 3-4 regels per alinea op desktop. Een nieuwe alinea = een nieuwe
beweging. Lange alinea's lezen niet, ze schreeuwen.

### 4. Geattribueerde quotes, geen anonieme claims

Wie zegt dit? Een rapport van MIT? Een woordvoerder van Spotify? De Academy?
Altijd herleidbaar. "Volgens X" of "Y bevestigt" boven elke claim die niet
zelf-evident is.

### 5. Letterlijke termen tussen aanhalingstekens

Als een organisatie zelf een term gebruikt — "AI-first leger",
"eerste-lijns-advies", "performance" — citeer letterlijk met
aanhalingstekens. De lezer hoort dat het hun woord is, niet het onze.

### 6. Geen em-dash, geen en-dash, geen enkele uitzondering

Stevin gebruikt geen `—` of `–` in tekst. Dat is een AI-tell. Gebruik in plaats
daarvan: een punt, dubbele punt, komma, of haakjes.

> **Wel:** "Het probleem zit niet in het model. Het zit eronder."
>
> **Niet:** "Het probleem zit niet in het model — het zit eronder."

Geen uitzondering, ook niet in citaten of samengestelde namen: dat gold hier
eerder wel (zie git-historie), maar is per 4 sep 2026 gelijkgetrokken met de
canonieke regel in `Stevin-Hub/docs/copy/VERBODEN_WOORDEN.json` (`gedachtestreepje`,
hardheid blok, "geen enkele uitzondering"). Kom je een samengestelde naam met een
streepje tegen, schrijf het om (spatie, of aan elkaar) in plaats van een dash te
gebruiken.

### 7. Neutrale toon, geen activistisch register

Wij rapporteren wat er gebeurt en duiden vervolgens. Geen "schokkend",
"baanbrekend", "controversieel". Ook geen "natuurlijk weet je al dat...". De
lezer trekt zelf de conclusie. Onze toon = accountant die toevallig kan
designen.

### 8. Nederlandse zinsbouw, geen letterlijk-vertaald-uit-Engels

- "Zoals dit" → niet "in een manier zoals deze"
- "Daarom" → niet "om die reden"
- "We weten dat" → niet "het is bekend dat"
- "Niemand weet of het werkt" → niet "het is niet bekend of het functioneert"

Als een zin met "het is bekend dat" of "men kan stellen dat" begint — herschrijven.

## Vocabulaire — NOOIT gebruiken

Bewust niet-elitair. Stevin-doelgroep is breed MKB: installateur 50+ DGA,
D2C-founder 30-45, bureau-eigenaar, freelancer. Academisch
marketing-jargon breekt het leesritme.

| Niet                          | Wel                                                 |
| ----------------------------- | --------------------------------------------------- |
| causale data                  | meetdata / de cijfers waarop het rust               |
| causaliteit                   | oorzaak en gevolg / wat er werkelijk gebeurt        |
| incrementaliteit              | uplift / wat een kanaal extra oplevert              |
| incrementaliteitsmeting       | uplift-meting / het verschil meten                  |
| incrementaliteitsanalyse      | uplift-analyse                                      |
| attribution gap               | meetlat-discrepantie (Stevin-eigen term)            |
| holdout-groep / geo-test      | alleen als context het ondersteunt                  |

## Wat dit betekent voor jou — de Stevin-paragraaf

Elke dispatch eindigt met een box "Wat dit betekent voor jou". Eén alinea.
Geen conclusie van het nieuws — een toepassing voor de lezer. Antwoord op
één van deze vier vragen:

1. Wat verandert hier voor jouw budget of pijplijn?
2. Welke vraag moet je stellen aan je vendor of bureau?
3. Welk meetpatroon wordt hierdoor zichtbaar?
4. Wat zou een Stevin-consultant op maandagochtend doen met dit nieuws?

Niet alle vier — kies er één. Maximaal 4 zinnen.

## Tone-of-voice samenvatting

> Accountant die toevallig kan designen. Brabander van geboorte: direct, warm,
> niet uit op gelijk hebben. Schrijft alsof hij een collega aan tafel uitlegt
> wat er aan de hand is. Geen verkooppraat. Geen meningen waar feiten kunnen.
> Als de feiten een mening uitlokken — ja dan, maar pas op het einde.

## Source of truth

- Memory: `feedback_journal_writing_style.md`
- Memory: `feedback_no_academic_jargon.md`
- Code: `data/articles.ts` (format-veld bepaalt render-mode)
- Verboden woorden en AI-buzzwoorden (em-dash, "weglekt", "state-of-the-art", zelf-ondermijnende hedges, etc): `Stevin-Hub/docs/copy/VERBODEN_WOORDEN.json`, canoniek voor alle Stevin-kanalen (mail, LinkedIn, journal). Niet los bijhouden, daar toevoegen (W-041, 3 sep 2026).
