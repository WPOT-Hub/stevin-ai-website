# Subverwerkerslijst Stevin.AI

> **Status: concept, nog niet gepubliceerd.** Vastgesteld op 26 aug 2026 op basis van de code en de omgevingsvariabelen van Stevin-Hub. Publiceer deze lijst op stevin.ai zodra Koen de TODO-KOEN-punten heeft ingevuld en een jurist de lijst heeft gecontroleerd. De lijst is openbaar zodra hij live gaat; hij hoeft nu niet apart versleuteld of afgeschermd te worden.
>
> Hoe deze lijst werkt: subverwerkers zijn partijen die persoonsgegevens verwerken in opdracht van Stevin, in het kader van de diensten die Stevin levert aan haar klanten. Platforms van klanten (Google Ads, Meta, LinkedIn e.d.) zijn geen subverwerkers: die leveren diensten aan de klant zelf en Stevin heeft via OAuth toegang gekregen van de klant. De advertentieplatforms staan daarom niet in deze lijst.
>
> **Externen: alleen bedrijven, geen individuele freelancers** (besluit Koen, 26 aug 2026). Wie onder onze instructie in onze omgeving en op onze accounts werkt, verwerkt onder onze verantwoordelijkheid en is geen subverwerker; die persoon wordt niet bij naam aan klanten gemeld, is gebonden via onze overeenkomst voor freelancers en staat in een intern toegangsregister. Alleen een externe partij die op haar eigen systemen verwerkt komt op deze lijst, met de meld- en bezwaartermijn van dertig dagen. Bepalend is de feitelijke werkwijze, niet de rechtsvorm. Stand 26 aug 2026: er staan geen externe bedrijven op de lijst.

---

## Tabel: subverwerkers per partij

| Partij | Rechtsvorm en land van vestiging | Dienst | Gegevenscategorieën die worden verwerkt | Doorgiftegrondslag | Van toepassing bij |
|---|---|---|---|---|---|
| **Supabase** | Supabase Inc., private company, gevestigd in San Francisco, California, VS | Databasehosting: alle klantdata en platformdata worden opgeslagen in Supabase-database, EU-regio (West) | Alle gegevenscategorieën uit het verwerkingsregister (bijlage 1 bij de Verwerkersovereenkomst) | SCCs (EU 2021/914) en Supabase DPA | Alle modules |
| **Amazon Web Services** | Amazon Web Services EMEA SARL, gevestigd in Luxemburg (EU, lidstaat) | Compute en objectopslag, EU-regio Frankfurt: applicatieservers, datapijplijnen, back-ups | Alle gegevenscategorieën | Binnen EER, geen doorgifte buiten EER | Alle modules |
| **Vercel** | Vercel Inc., private company, gevestigd in San Francisco, California, VS | Hosting van app.stevin.ai (klantportaal) en van gebouwde landingspagina's op domeinen van klanten: verwerkt sessiedata, IP-adressen, formulierinzendingen | Gebruiksdata, technische data (IP, browser, tijdstempel), formulierdata van bezoekers van gebouwde landingspagina's | SCCs (EU 2021/914) en Vercel DPA; EU-regio waar technisch haalbaar | Alle modules; module 3 voor landingspagina's |
| **Cloudflare** | Cloudflare Inc., public company, gevestigd in San Francisco, California, VS | CDN, WAF en DNS-beheer: verkeer naar de Stevin-domeinen loopt via het netwerk van Cloudflare | IP-adressen, verzoekmetadata (URL, methode, tijdstempel) | SCCs (EU 2021/914) en Cloudflare DPA | Alle modules |
| **Anthropic** | Anthropic PBC (public benefit corporation), gevestigd in San Francisco, California, VS | AI-inference (Claude-modellen): prompts die het platform en de systemen van Stevin opstellen kunnen klantgerelateerde data bevatten; geen training op klantdata (vastgelegd in DPA met Anthropic) | Potentieel alle categorieën, afhankelijk van de functie: campagnedata, CRM-data, gesprekstranscripten, signalen en adviezen | SCCs (EU 2021/914) en Anthropic DPA; geen training op klantdata | Alle modules (AI-functies) |
| **OpenAI** | OpenAI LLC, limited liability company, gevestigd in San Francisco, California, VS | AI-inference (GPT-modellen): idem Anthropic; geen training op klantdata | Potentieel alle categorieën | SCCs (EU 2021/914); geen training op klantdata volgens hun voorwaarden en onze accountinstelling. Eigen verwerkerscontract nog niet ingegaan, zie de aantekening hieronder | Alle modules (AI-functies) |
| **Mistral AI** | Mistral AI SAS (societe par actions simplifiee), gevestigd in Parijs, Frankrijk (EU, lidstaat) | AI-inference (Mistral-modellen), specifiek gekozen voor EU-datasoevereiniteit | Potentieel alle categorieën | Binnen EER, geen doorgifte buiten EER; Mistral DPA | Alle modules (AI-functies) |
| **Resend** | Resend Inc., private company, gevestigd in San Francisco, California, VS | Transactionele e-mail: het platform stuurt via Resend automatische berichten (notificaties, rapporten) | E-mailadressen, naam, berichttekst van de notificatie | SCCs (EU 2021/914) en Resend DPA | Alle modules |
| **Slack** | Slack Technologies LLC, limited liability company, gevestigd in San Francisco, California, VS (onderdeel van Salesforce) | Notificaties en interne communicatie: alertberichten vanuit het Stevin-systeem kunnen klantgerelateerde signaaltekst bevatten | Alertdata, potentieel klantidentificatoren en campagnesignalen in berichttekst | SCCs (EU 2021/914) en Slack DPA | Alle modules |
| **Cloudtalk** | CloudTalk a.s., gevestigd in Praag, Tsjechie (EU, lidstaat) | Telefonie en gesprekstranscripten: gespreksmetadata, transcripten en eventuele opnames worden verwerkt via de Cloudtalk-koppeling | Gespreksmetadata (datum, tijdstip, duur, telefoonnummers, agentidentificatie), gesprekstranscripten, geluidsopnames indien ingeschakeld, NAW bellers | Binnen EER, geen doorgifte buiten EER; Cloudtalk DPA | Module 1 en 2, uitsluitend bij klanten waarbij de telefonie-integratie is ingeschakeld |

---

## Toelichting per categorie

### Infrastructuur (Supabase, AWS, Vercel, Cloudflare)
Deze partijen verwerken data vanwege de technische opslag en overdracht. Stevin heeft geen keuze: alle data gaat via deze infrastructuur. De keuze voor EU-regio's bij Supabase en AWS beperkt de feitelijke doorgifte buiten de EER; de SCCs dekken het juridische kader met de moederbedrijven in de VS.

### AI-inference (Anthropic, OpenAI, Mistral AI)
Per API-aanroep kan klantgerelateerde data in de prompt zitten. Met alle drie de leveranciers is vastgelegd dat zij de data niet gebruiken voor het trainen van modellen. Mistral AI is gevestigd in de EU en vereist geen doorgiftegrondslag.

> **Uitgezocht 26 aug 2026, per leverancier:**
>
> - **Anthropic:** het verwerkersaddendum met standaardcontractbepalingen is automatisch onderdeel van hun commerciele voorwaarden. Er valt niets apart te ondertekenen; door hun voorwaarden te aanvaarden geldt het addendum. Zij trainen niet op gegevens van zakelijke klanten.
> - **Mistral:** hun verwerkersaddendum hoort eveneens bij de overeenkomst. Gegevens die via de API gaan worden niet voor modeltraining gebruikt, en er is daarnaast een instelling om er bezwaar tegen te maken.
> - **OpenAI:** dit gaat NIET automatisch. Om het verwerkerscontract te laten ingaan moet hun DPA-formulier worden ingevuld. Zolang dat niet is gebeurd berust de belofte voor OpenAI op hun algemene voorwaarden en op de instelling in ons account, niet op een eigen contract. **Openstaande actie voor Koen.**

### Communicatie (Resend, Slack)
Resend verzorgt systeemberichten. Slack ontvangt alertberichten die kunnen verwijzen naar signalen van een klant. De tekst van Slack-berichten bevat doorgaans geen persoonsgegevens van eindklanten, maar kan campagnenamen of accountidentificatoren bevatten.

### Telefonie (Cloudtalk)
Cloudtalk is alleen van toepassing als de klant de telefonie-integratie heeft ingeschakeld. Gespreksopnames vereisen toestemming van alle gesprekspartijen. De klant is verantwoordelijk voor het regelen van die toestemming aan zijn kant; Stevin verwerkt de data op instructie.

### Externen
Bij inschakeling van een extern die persoonsgegevens van de klant verwerkt, meldt Stevin dat minimaal dertig dagen vooraf aan de klant. De klant kan binnen die termijn schriftelijk bezwaar maken.

---

## Wat niet op deze lijst staat (en waarom)

De volgende diensten staan in de omgevingsvariabelen van Stevin-Hub maar verwerken geen persoonsgegevens van klanten van Stevin als subverwerker:

- **Google Ads, Meta Ads, Google Analytics 4, Google Search Console, LinkedIn, X, Snapchat, Eventbrite**: advertentie- en analyticsplatforms van de klant zelf. Stevin heeft via OAuth toegang gekregen van de klant. Deze platforms leveren diensten aan de klant, niet aan Stevin.
- **HubSpot, GoHighLevel, Mailchimp, Asana, ClickUp, Trello, Reply.io, Apollo.io, Apify, DuxSoup, Maildoso, Reoon**: operationele tools van Stevin voor eigen gebruik (CRM, outbound, project management, e-mailinfrastructuur, data-enrichment voor eigen acquisitie). Deze tools verwerken geen klantpersoonsgegevens namens Stevin als verwerker.
- **Gmail (koen@stevin.ai)**: Stevin-intern e-mailverkeer; geen klantgegensverwerking als subverwerker.

> **TODO-KOEN:** Verifieer of GoHighLevel wordt gebruikt voor het beheren van klantrelaties van Stevin (Stevin als controller) of ook voor het verwerken van persoonsgegevens van eindklanten van die klanten (dan wordt GHL subverwerker). Als dat laatste het geval is, moet GHL aan deze lijst worden toegevoegd.

---

## Wijzigingen in deze lijst

Wijzigingen worden minimaal dertig dagen vooraf aangekondigd aan klanten per e-mail. De klant kan binnen die termijn schriftelijk bezwaar maken. De procedure staat in artikel 6 van de Verwerkersovereenkomst.

*Opgesteld: 26 aug 2026. Volgende geplande review: bij de eerstvolgende versiebump van de juridische set.*
