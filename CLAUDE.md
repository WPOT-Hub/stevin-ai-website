# stevin.ai

Deze repo bevat een website. **De regels, de skills en de controles staan in de
Hub-repo**, niet hier.

## Werk vanuit de Hub

Begin een sessie in `~/Scripts/Stevin-Hub` en voeg deze map toe als tweede
werkmap. Dan laadt `CLAUDE.md` van de Hub, vuren de regels, en kun je de skills
aanroepen. Begin je hier, dan krijg je niets van dat alles mee.

## Wat er op deze repo van toepassing is

| Wanneer | Wat |
|---|---|
| Voor je een pagina bouwt | skill `livegang`, deel "VOORDAT je bouwt". `docs/zoekintentie/stevin.ai.md` in de Hub moet bestaan en kloppen; `scripts/livegang_check.sh stevin.ai` weigert zonder dat bestand |
| Nieuwe site of andere URL's | daarna pas `marketing-skills:site-architecture` voor de structuur |
| Elke wijziging aan de meting | skill `sitecheck` (REGEL #7). Een 200 of een groene tag is geen bewijs; aantonen dat het event in GA4 aankomt |
| Elke Nederlandse tekst die iemand leest | skill `schrijfregels`. `check.sh` kijkt alleen naar tekens; de terugleesstap is het werk |
| Elke merge of uitrol | skill `vercel-uitrol` (REGEL #9). Uitrollen met `scripts/vercel_deploy.sh`, en een merge is geen uitrol |
| Na livegang | zelf indexering aanvragen per pagina via URL-inspectie; dat kan niet via een API en wordt daarom vergeten |

## Drie dingen die hier al een keer zijn misgegaan

1. Een sitemap ingediend terwijl het domein nog ergens anders heen wees. Google
   meldde achttien dagen "Kan niet ophalen" en probeerde het nooit opnieuw.
2. Een servercontainer live met een tag die alleen paginaweergaven doorstuurde.
   Weken geen klikken, geen aanvragen, en alles stond op groen.
3. Vercel weigerde uitrollen zonder dat iemand het zag. Veertien dagen geen
   geslaagde uitrol, terwijl merges slaagden en tests groen waren.

Ze hebben alle drie dezelfde vorm: het werkte, en het kwam nergens aan.
