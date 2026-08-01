# Journal-contentaudit, 2 augustus 2026

## Uitkomst

- Startpunt: 375 artikelrecords, waarvan 352 daadwerkelijk publiceerbaar waren.
- Geconsolideerd: 10 dubbele records binnen 9 inhoudelijke clusters.
- Over: 365 actieve records, waarvan 343 publiceerbare artikelen en 22 oude records zonder body die door de bestaande publicatievangrail al 404 geven en niet in index, sitemap of Journal-overzicht staan.
- Linknetwerk: alle 343 publiceerbare artikelen hebben exact drie expliciete vervolglinks en minimaal één inkomende Journal-link. Totaal: 1.029 interne artikel-links.
- Negen canonieke dossiers zijn inhoudelijk samengevoegd of gecorrigeerd, voorzien van een echte bron, `updatedAt` en drie informatieve H2's.
- Toekomstige dispatches krijgen via de Hub-gate drie informatieve H2's en bij publicatie meteen wederkerige links vanaf hun drie verwante artikelen.

## Geconsolideerde URL's

| Oude slug | Canonieke slug |
|---|---|
| `github-ai-agent-lekt-privatie-repos` | `github-ai-agent-lekt-priv-repos-door-vriendelijke-prompt` |
| `rocket-lab-koopt-iridium-satellietnetwerk` | `rocket-lab-krijgt-toegang-tot-globale-satellietmarkt-met-8-miljard-deal` |
| `apple-siri-ai-toegang-en-privacy-centraal-in-update` | `apple-siri-ai-update-2026` |
| `tiktok-shop-nederland-logistieke-uitdagingen` | `tiktok-shop-lanceert-in-nederland-op-15-juni` |
| `nasa-kiest-relativity-space-voor-marsmissie-tegen-spacex` | `mars-2028-relativity-space-nasa-partnerschap` |
| `mistral-ai-breidt-uit-naar-fysieke-wereld` | `mistral-breidt-uit-naar-industrie-en-infrastructuur` |
| `waymo-lanceert-premium-abonnement-voor-autonoom-vervoer` | `waymo-lanceert-loyalty-program-met-cashback-en-gratis-annuleringen` |
| `google-ads-lanceert-video-campagnegroepen-wereldwijd` | `google-lanceert-video-campaign-groups-voor-betere-reach-en-frequency` |
| `zuid-koreaanse-techgiganten-investeren-meer-dan-550-miljard-in-geheugenfabrieken` | `zuid-korea-investeert-1-biljoen-in-chipproductie-en-humanoide-robots` |
| `zuid-korea-investeert-900-miljard-in-ai-en-semiconductor-plan` | `zuid-korea-investeert-1-biljoen-in-chipproductie-en-humanoide-robots` |

Iedere oude slug krijgt voor zowel het standaardpad als de taalvariant een permanente Next.js-redirect. De bronrecords blijven in git staan voor controle en herstel, maar worden niet meer als artikel geëxporteerd.

## Bewust behouden als vervolg of verdieping

Onder meer deze paren zijn geen duplicaten en blijven apart, met wederzijdse verwijzingen waar relevant:

- LeCun-nieuwsbericht en de langere editorial over JEPA versus taalmodellen.
- Alexa for Shopping en de latere lancering van Alexa+ Agentic Ads.
- Twee ASML/Europa-opinies met een verschillende aanleiding en these.
- De maandelijkse e-commercetool-overzichten van mei en juni.
- Afzonderlijke Demand Gen-updates over commerce-data, creator-tools en doelgroepbeleid.

## Prestatiecheck voor URL-keuze

Search Console-data over 1 mei tot en met 29 juli bevatte 128 Journal-URL's, 428 impressies en 8 klikken. Waar een overlapcluster al impressies had, is dat meegenomen in de canonieke keuze. Voorbeeld: de TikTok-lancerings-URL stond gemiddeld rond positie 3,5; de logistieke variant rond positie 19,2 en verwijst nu permanent naar het lanceringsdossier.

Voor de 22 oude bodyloze records waren in deze periode geen impressies en geen klikken zichtbaar. Er is geen externe backlinkdatabase beschikbaar; daarom zijn samengevoegde URLs niet hard verwijderd maar permanent omgeleid.

## Openstaande kwaliteitsachterstand

De audit markeert 312 publiceerbare oude artikelen zonder een echte artikelbron in de metadata en 108 bodies onder 120 woorden. Dat is te groot om stilzwijgend als SEO-goud te bestempelen. Ze zijn in deze ronde niet massaal verwijderd: thematische overlap is geen duplicaat en bronherstel vereist controle per artikel.

Aanbevolen vervolgfase: rangschik deze 312 op Search Console-impressies, marketingrelevantie en bronherstelbaarheid. Werk eerst winnaars met aantoonbare vraag bij; consolideer of retireer daarna bronloze, dunne stukken zonder bereik. Nieuwe publicaties kunnen niet meer met een ontbrekende primaire bron of zonder de huidige kwaliteitsgate live.

## Herhaalbare controles

- `npm run journal:audit -- --out docs/audits/journal-content-audit.json`
- `npm run related:generate`
- `npm run build`
- `npm run verify:production -- --all`

De machineleesbare audit staat in `docs/audits/journal-content-audit.json`; consolidaties staan centraal in `data/retired-articles.json`.
