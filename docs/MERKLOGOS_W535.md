# Merklogo's (W-535)

Kleurlogo's voor het koppelingenblok op de nieuwe homepage, opgehaald op
10 okt 2026 via de Iconify API (https://api.iconify.design), sets `logos`
(Gil Barbara, CC0), `skill-icons` (Instagram, MIT) en `simple-icons`
(HubSpot, CC0; ingekleurd met HubSpot-oranje #FF7A59). Elk bestand is
nagekeken op scripts, externe verwijzingen en foreignObject: geen gevonden.

Niet nagekeken: of elk logo exact gelijk is aan de nieuwste versie op de
merkpagina van het platform, en de merkrichtlijnen per platform voor gebruik
als "werkt met". Voor livegang alsnog langs de merkpagina's.

## Boekhoudpakketten (11 okt 2026)

Koen wil de twee meest gebruikte boekhoudpakketten van het Nederlandse mkb in
de logoband. Gekozen: **Exact Online** en **Moneybird**.

### Bronnen voor de keuze

| Bron | Soort | Wat er staat | Zelf gezien |
|---|---|---|---|
| Accountancy Vanmorgen, 19 sep 2019, over onderzoek van Capterra onder zzp'ers en mkb'ers (https://www.accountancyvanmorgen.nl/2019/09/19/mobiele-boekhoudingapps-in-de-lift-excel-blijft-populair-bij-zzpers/) | onafhankelijk onderzoek, vakpers | meest gebruikt: 1 Exact, 2 e-Boekhouden.nl, 3 SnelStart, 4 Moneybird, 5 AFAS, AccountView en Jortt. Steekproef niet genoemd | ja, artikel; het rapport zelf niet |
| Chift, "The accounting software landscape in the Netherlands, a 2026 guide" (https://www.chift.eu/blog/the-accounting-software-landscape-in-the-netherlands-a-2026-guide-for-saas-vendors), en Accountancy Vanmorgen, 26 mei 2026 | onderzoek door een koppelplatform, geen verkoper van boekhoudsoftware | 100 Nederlandse respondenten, bedrijven met 3 tot 200 medewerkers: Exact Online en AFAS dominant; e-Boekhouden en Moneybird als pakketten voor wie zelf boekhoudt. Geen percentages; AFAS volgens Chift zelf overschat door de steekproef | ja |
| exact.com/nl/over-ons, gelezen 11 okt 2026 | leverancier over zichzelf | "ruim 675.000 andere bedrijven, die vooral actief zijn in Nederland, Belgie en Duitsland" (alle producten, drie landen) | ja |
| moneybird.nl en moneybird.nl/over-ons, gelezen 11 okt 2026 | leverancier over zichzelf | "Het boekhoudpakket van ruim 400.000 ondernemers"; op Over ons "bijna 400.000 zzp'ers en mkb'ers" | ja |
| e-boekhouden.nl en /over-ons, gelezen 11 okt 2026 | leverancier over zichzelf | "Al ruim 500.000 ondernemers hebben kennis gemaakt met ons online boekhoudprogramma": opgeteld over 25 jaar, geen huidig aantal | ja |
| snelstart.nl en /over-ons, gelezen 11 okt 2026 | leverancier over zichzelf | "175.000+ ondernemers" (homepage), "Tevreden ondernemers 165.000" (Over ons) | ja |

**Waarom deze twee.** Exact staat in elke bron bovenaan. Voor de tweede plek
spreken de bronnen elkaar tegen: in het onafhankelijke onderzoek van 2019 staat
e-Boekhouden.nl tweede en Moneybird vierde, maar dat is zeven jaar oud en
zonder steekproefgrootte. Van de huidige aantallen is dat van Moneybird (ongeveer
400.000, in de tegenwoordige tijd) het hoogste na Exact; het getal van
e-Boekhouden.nl telt iedereen die het ooit probeerde en is dus niet te
vergelijken. Die tweede plek is daarmee de zwakste schakel: wisselen naar
e-Boekhouden.nl of SnelStart is een regel in `LOGOS` in
`components/rethink/RethinkHome.tsx` plus een logo.

**Niet gevonden:** een recent onafhankelijk onderzoek met percentages per
pakket, alleen voor het mkb (alle aantallen hierboven tellen zzp'ers mee). Het
volledige Chift-rapport en het rapport van Capterra zelf heb ik niet gelezen.

### Herkomst van de logo's

- `public/logos/merken/exact-online.svg`: het icoon van Exact, uit
  https://www.exact.com/media/templates/site/exact/images/favicon/favicon.svg
  (opgehaald 11 okt 2026, sha256 01429de2...). Pad en kleur (#e1141d)
  ongewijzigd; alleen de dubbele svg-wrapper en een regel CSS voor licht en
  donker eraf, zodat het in een `img` schaalt. Een perskit of merkpagina met
  downloads vond ik niet: exact.com/partners/guide en
  exact.com/corporate-identity geven 404.
- `public/logos/merken/moneybird.svg`: het merkteken van Moneybird, uit
  https://www.moneybird.nl/assets/images/moneybird-logo-mark-blue.svg
  (opgehaald 11 okt 2026, sha256 953f5de5...). Pad en kleur (#0073E6)
  ongewijzigd; alleen een viewBox erbij, zodat het schaalt. Een perspagina van
  Moneybird vond ik niet (moneybird.nl/pers geeft 404); dit is het bestand dat
  hun eigen site gebruikt.

Beide bestanden nagekeken op scripts, externe verwijzingen en foreignObject:
geen gevonden. Niet nagekeken: de merkrichtlijnen van Exact en Moneybird voor
gebruik als "werkt met". Voor livegang alsnog navragen (Exact: media@exact.com).

## Logo's in het 3D-brein van de hero (11 okt 2026, brein v2)

Koen (11 okt 20:12): de bronnen in het brein worden kleine glazen rondjes met
het echte logo erin. Keuze per bron, in `BEELD` in
`components/rethink/StevinUniversum.tsx`:

| Bron | Beeld | Waarom |
|---|---|---|
| Google Ads | `google-ads.svg` | was onderdeel van Campagnes; Campagnes is gesplitst zodat het logo zichtbaar is |
| Meta | `meta.svg` | idem; Facebook en Instagram hangen eronder als kleine nodes |
| Website | `wordpress-wit.svg` | het meest gebruikte CMS bij het mkb; in wit, want het grijze logo (#464342) verdwijnt op het donkere glas |
| CRM | `hubspot.svg` | HubSpot is een CRM; een losse HubSpot-node naast een CRM-node zou dubbel zijn |
| Verkoop | `exact-online.svg` | facturen en omzet komen uit de boekhouding; Exact staat ook in de logoband |
| Bedrijfsdoelen, Doelgroepen, Klantgegevens, Telefonie, Offertes, Marktsignalen, Advisor | eigen lijn-glyph | geen merk; dunne haarlijn in dezelfde stijl als het glas |

`public/logos/merken/wordpress-wit.svg` is `wordpress.svg` met de vulling op
#FFFFFF gezet, verder ongewijzigd. Nagekeken op scripts, externe verwijzingen
en foreignObject: geen gevonden. Niet nagekeken: of de merkrichtlijnen van
WordPress een wit logo op donker toestaan in deze vorm (de WordPress
Foundation biedt zelf witte varianten aan, maar die pagina heb ik niet
geopend).
