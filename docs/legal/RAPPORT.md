# Rapport: juridische set afgerond, september 2026

Opgesteld bij het afsluiten van de werksessie op branch `legal/afmaken-set`.

---

## 1. Wat er is gedaan

### 1.1 Bijlage bij de Verwerkersovereenkomst

**Nieuw document:** `CONCEPT_VERWERKERSOVEREENKOMST_BIJLAGE.md`

De live Verwerkersovereenkomst beschreef alleen "het platform" als dienst, terwijl Stevin feitelijk acht verschillende soorten verwerkingen uitvoert. De bijlage beschrijft per dienst het doel, de verwerkingshandelingen, de gegevenscategorieën, de betrokkenen, de bewaartermijn en de toegestane actiebevoegdheid:

- B-1: Het platform (signalering, analyse, rapportage)
- B-2: Campagnebeheer
- B-3: Acties door medewerkers en AI-agents in klantaccounts
- B-4: Bouw en hosting van landingspagina's
- B-5: Meetinrichting
- B-6: CRM- en e-mailkoppelingen
- B-7: Telefonie en gesprekstranscripten
- B-8: Werk door ingeschakelde externen

Sectie 0 bevat het bewaarschema woordelijk gelijk aan artikel A11 van de Algemene Voorwaarden.

**Wat bij publicatie moet worden meegenomen:** Artikel 4 van de live DPA zegt "60 dagen" (zie de inconsistentietabel in sectie 4 van dit rapport). Dat moet worden bijgewerkt naar het schema in sectie 0 van de bijlage. De bijlage vervangt ook de subverwerkersopsomming in artikel 5 van de live DPA (die wordt vervangen door CONCEPT_SUBVERWERKERS.md).

---

### 1.2 Rollen gescheiden in de Privacyverklaring

**Nieuw document:** `CONCEPT_PRIVACYVERKLARING.md`

De huidige live privacyverklaring mengt de rol van verwerker (voor klantdata) en verwerkingsverantwoordelijke (voor eigen verwerkingen) door elkaar. Het concept heeft twee duidelijk gescheiden delen:

**Deel A: Stevin als verwerker.** Klantdata, eindklanten van de klant, leads in het CRM van de klant. Betrokkenen moeten hun rechten uitoefenen bij de klant, niet bij Stevin. Rechtsgrond: de verwerkersovereenkomst.

**Deel B: Stevin als verwerkingsverantwoordelijke.** Zes verwerkingsdoelen met per doel de rechtsgrond:
- B-1: Websiteleads en contactverzoeken (gerechtvaardigd belang)
- B-2: Contractadministratie en facturatie (uitvoering overeenkomst + wettelijke verplichting)
- B-3: Gebruikersbeheer en platformtoegang (uitvoering overeenkomst)
- B-4: Beveiligingslogging (gerechtvaardigd belang)
- B-5: Eigen marketing en prospecting (gerechtvaardigd belang)
- B-6: Website-analytics en cookies (toestemming voor statistieken/marketing, noodzaak voor essentieel)

Het bewaarschema is verbatim gelijk aan A11.

**Twee TODO-KOEN-punten (zie sectie 2):** de bewaartermijnen voor websiteleads (B-1) en prospects (B-5) zijn nog niet ingevuld. Zonder die termijnen is de verklaring onvolledig voor AVG-doeleinden.

---

### 1.3 Eén subverwerkerslijst

**Nieuw document:** `CONCEPT_SUBVERWERKERS.md`

Eén gezaghebbende lijst in twee delen:

**Deel A (subverwerkers voor klantdata):** Supabase, AWS, Vercel, Cloudflare, Anthropic, OpenAI Ireland, Mistral AI, Resend, Slack, CloudTalk, Google Ireland en ingeschakelde externen. Per partij: rechtsvorm, land, dienst, gegevenscategorieën, doorgiftegrondslag.

**Deel B (verwerkers voor Stevin's eigen verwerkingen):** Supabase, Resend, Google Ireland, Microsoft, Apollo.io, Apify, Reoon, Cloudflare. Per partij dezelfde kolommen.

Wat er was: de live DPA noemde Mistral, Google en Slack; de live Privacy noemde ze niet. Freelancers en externe leveranciers stonden in geen van beide. De nieuwe lijst dekt alles.

---

### 1.4 Bewaartermijnen woordelijk gelijk

Het bewaarschema uit A11 van de Algemene Voorwaarden staat nu verbatim in:
- Sectie 0 van CONCEPT_VERWERKERSOVEREENKOMST_BIJLAGE.md
- Sectie "Bewaarschema na beeindiging" van CONCEPT_PRIVACYVERKLARING.md
- Artikel 6 van CONCEPT_NDA.md

Zie de inconsistentietabel in sectie 4 voor de afwijkingen in de live versies.

---

### 1.5 Acceptatie- en wijzigingsprocedure Module 3

**Toegevoegd aan CONCEPT_ALGEMENE_VOORWAARDEN.md:**

- M3.6 Acceptatieprocedure: vijf werkdagen beoordeling, schriftelijke acceptatie of stilzwijgende acceptatie na de termijn, herstellevering opent nieuwe beoordelingstermijn
- M3.7 Wijzigingen tijdens het project: schriftelijk verzoek, beoordeling binnen vijf werkdagen, schriftelijk akkoord vereist voor elk scopewijziging, vastlegging in de opdrachtbevestiging

Tevens bijgewerkt: de "Wat nog niet in dit concept is verwerkt"-sectie onderaan de AV. Punten 6, 7, 8 en 10 zijn nu afgevinkt met verwijzingen naar de conceptdocumenten. Punt 9 (commerciële modules) staat er nog open.

---

### 1.6 NDA bewaartermijnen

**Nieuw document:** `CONCEPT_NDA.md`

Identieke inhoud als de live NDA (bijgewerkt 24 augustus 2026), met uitzondering van artikel 6 (Teruggave, verwijdering en bewaarschema). De live NDA vermeldde alleen "maximaal 90 dagen voor backups". Het concept bevat nu het volledige schema woordelijk gelijk aan A11.

---

### 1.7 Consistentiecontrole

Zie sectie 4 voor een volledige tabel. Samenvatting: alle bekende inconsistenties in de conceptdocumenten zijn opgelost. De live pagina's (app/[locale]/*/page.tsx) zijn niet aangepast; die worden bij publicatie in één keer bijgewerkt.

---

## 2. TODO-KOEN: openstaande vragen

De onderstaande punten zijn bewust leeggelaten. Vul ze in voordat dit pakket live gaat.

---

### Commercieel

**T-01. Wat omvat het maandtarief van 399 euro precies?**
De aanbodpagina doet harde beloften over beheer en optimalisatie. De AV verwijst voor de inhoud naar de opdrachtbevestiging. Zolang er geen opdrachtbevestigingstemplate is, weet een klant niet vooraf wat 399 euro inhoudt. Voor Boersma is dit al gefactureerd; bij de volgende klant moet het vooraf vast staan.

**T-02. Wie is bevoegd scopewijzigingen te autoriseren bij Boersma?**
M3.7 vraagt per klant om schriftelijke vastlegging. Is dat altijd Boersma zelf, of ook iemand anders?

**T-03. Bewaartermijn websiteleads (Deel B-1 van de Privacyverklaring).**
Hoe lang bewaren wij naam, e-mail en context van iemand die via stevin.ai contact opneemt maar geen klant wordt? Zes maanden? Twee jaar? Dit is een keuze die Koen moet maken; de AVG vereist dat die keuze in de verklaring staat.

**T-04. Bewaartermijn prospects (Deel B-5 van de Privacyverklaring).**
Hoe lang bewaren wij contactgegevens van mensen aan wie wij een zakelijke benadering hebben gestuurd maar die niet hebben gereageerd?

**T-05. Eén overeenkomst of twee (openstaand punt 1 uit AV).**
Dit concept behandelt platform en uitvoerend werk als één overeenkomst. Dat is de keuze die D-030 stelde. Bevestig of dit de juiste structuur is.

**T-06. Jaarbetaling (openstaand punt 2 uit AV).**
Voorstel: terugbetaling onder aftrek van de korting. Alternatief: vaste looptijd van twaalf maanden. Maak een keuze zodat A10 definitief kan worden vastgesteld.

**T-07. Beschikbaarheidsbelofte van 99,5 procent (openstaand punt 4 uit AV).**
Dit is een keuze, geen meting. Koppel je een vergoeding aan het niet halen ervan, of niet?

---

### Juridisch en operationeel

**T-08. Zijn de verwerkersaddenda met Anthropic, OpenAI en Mistral getekend?**
A8 van de AV stelt dat met hen is vastgelegd dat zij niet op klantdata trainen. Dat is een belofte namens een ander. Controleer of de DPA's met deze partijen daadwerkelijk getekend zijn en of ze de no-training-belofte bevatten.

**T-09. Is de verwerkersovereenkomst met Cloudflare afgesloten?**
Cloudflare verwerkt IP-adressen van alle bezoekers van Stevin-domeinen. Deel A van CONCEPT_SUBVERWERKERS.md neemt Cloudflare op als subverwerker. Bevestig dat de VOK is getekend.

**T-10. Telefonie: is het actief en hoe is het ingericht?**
CloudTalk heeft API-credentials in de omgevingsvariabelen van Stevin-Hub. Is telefonieverwerking actief voor een of meer klanten? Zo ja:
a) Is de verwerkersovereenkomst met CloudTalk getekend?
b) Worden bellers voorafgaand geïnformeerd dat het gesprek wordt opgenomen?
c) In Belgie geldt dat alle deelnemers toestemming moeten geven; klanten met Belgische eindklanten moeten dit borgen.
d) Wat is de bewaartermijn voor opnamen?

**T-11. Ingeschakelde externen: omgeving bepalen.**
Per actieve freelancer of externe leverancier vastleggen of zij in Stevin's omgeving werken (persoon onder Stevin's gezag, geen subverwerker) of in hun eigen omgeving (subverwerker, dan aan klanten melden met 30-dagenperiode). Zie B-8 van CONCEPT_VERWERKERSOVEREENKOMST_BIJLAGE.md.

**T-12. GoHighLevel: is het een actieve klantintegratie?**
GoHighLevel (CRM met telefoniefunctionaliteit) heeft API-credentials in de omgevingsvariabelen. Als Stevin GoHighLevel-data van een klant benadert of beheert, is GoHighLevel subverwerker en moet het op de lijst. Bevestig per klant.

**T-13. Apollo.io rechtsgrond en DPA.**
Voor de eigen prospecting van Stevin: op welke rechtsgrond worden Apollo-gegevens verwerkt? Is Apollo een verwerker (verwerkersovereenkomst nodig) of een databroker waarvan Stevin zelf verwerkingsverantwoordelijke is voor de data die zij ontvangt? Dit bepaalt wat er in de privacyverklaring moet staan.

**T-14. Reoon: rechtsvorm en land.**
De subverwerkerslijst mist deze gegevens voor Reoon Technology. Nodig voor de volledigheid van de lijst.

**T-15. DECISIONS.md bestaat niet in Stevin-Hub.**
D-030 en D-031 worden in de conceptdocumenten aangehaald maar zijn nergens als document terug te vinden. De besluiten die daarin zouden moeten staan (wel/geen twee aparte overeenkomsten, IP-structuur) zijn impliciet in de tekst verwerkt maar missen een formele grondslag. Overweeg een DECISIONS.md aan te leggen.

---

## 3. Wat nog open staat en niet door dit pakket wordt gedekt

**Commerciële invulling (T-01, T-06):** De opdrachtbevestigingstemplate per module ontbreekt nog. Klanten kunnen nu niet vooraf zien wat een module precies inhoudt.

**AI Act artikel 50 verificatie:** De plicht om bij de eerste interactie zichtbaar te maken dat je met een AI-systeem communiceert (van kracht per 2 augustus 2026) is gedeeltelijk geregeld voor de portal-chat. Verifieer waar dit nog ontbreekt. Dit is productwerk, geen tekstwerk.

**Verwerkersaddenda AI-leveranciers bevestigen (T-08).**

**Belgisch recht (aansprakelijkheid):** A12 van de AV breidt de aansprakelijkheidsbeperking uit ten opzichte van de live versie (12 maanden i.p.v. 3 maanden, 2x voor zware categorieën). Toetsen op houdbaarheid voor Belgische zakelijke klanten, waar bedingen die aansprakelijkheid bij zware fout uitsluiten onder strengere toets staan (Boek 5 BW-B).

**Schijnzelfstandigheid freelancers:** CONCEPT_LEVERANCIER_EN_FREELANCER.md bevat een noot bij artikel 12 over de Waadi en de aangescherpte handhaving. Dit is productiewerkingsrisico als er actieve freelancers zijn die grotendeels op instructie werken.

---

## 4. Gevonden inconsistenties

### 4.1 Bewaartermijnen

| Document | Wat het nu zegt | Wat het moet zeggen |
|----------|-----------------|---------------------|
| Live DPA (art. 4) | 60 dagen na einde overeenkomst | Schema uit A11: 30 dagen export, dag 37 verwijdering, 90 dagen backups, 12 maanden auditlogs |
| Live Privacy (bewaarduur) | Campagnedata: 30 dagen; accountdata: 12 maanden na beeindiging | Schema uit A11 (compleet) |
| Live NDA (art. 6) | Backups maximaal 90 dagen | Schema uit A11 (compleet), zie CONCEPT_NDA.md art. 6 |
| Concept AV (A11) | Volledig schema | Basis; alle andere documenten kopiëren dit |

**Conclusie:** De concepten zijn nu consistent. Bij publicatie moeten alle vier de live pagina's tegelijk worden bijgewerkt.

---

### 4.2 Aansprakelijkheidsplafonds

| Document | Plafond | Categorieën |
|----------|---------|-------------|
| Live Terms / live DPA (verwijzing) | 3 maanden betaalde vergoedingen, absoluut max EUR 5.000 | Geen onderscheid |
| Concept AV A12 | 12 maanden betaalde vergoedingen | 2x voor data, beveiliging, IP, geheimhouding |
| Live NDA (art. 8) | Verwijst naar AV | n.v.t. |

**Conclusie:** De concept-AV verhoogt het plafond aanzienlijk. Dit is een bewuste keuze (zie de toelichting bij A12 van het concept). Toetsen op houdbaarheid voor Belgische klanten (zie sectie 3).

---

### 4.3 Subverwerkers

| Partij | Live DPA | Live Privacy | Concept SUBVERWERKERS.md |
|--------|----------|--------------|--------------------------|
| Supabase | Ja | Ja | Ja (Deel A) |
| AWS | Ja | Ja | Ja (Deel A) |
| Vercel | Ja | Ja | Ja (Deel A) |
| Anthropic | Ja | Ja | Ja (Deel A) |
| OpenAI | Ja | Ja | Ja (Deel A) |
| Mistral | Ja | Nee | Ja (Deel A) |
| Google | Ja | Nee | Ja (Deel A, Google Ireland) |
| Resend | Ja | Ja | Ja (Deel A en B) |
| Slack | Ja | Nee | Ja (Deel A) |
| Cloudflare | Nee | Nee | Ja (Deel A en B) |
| CloudTalk | Nee | Nee | Ja (Deel A, indien telefonie actief) |
| Ingeschakelde externen | Nee | Nee | Ja (Deel A, met TODO) |

---

### 4.4 Opzegtermijnen

| Document | Opzegtermijn klant | Opzegtermijn Stevin |
|----------|--------------------|---------------------|
| Live Terms | Maandelijks, einde lopende maand | Niet vermeld |
| Concept AV A11 | Maandelijks, einde lopende maand | Twee maanden |

**Conclusie:** Het concept vult de ontbrekende opzegtermijn voor Stevin in. Dat is een verbetering.

---

### 4.5 Geheimhoudingsduur

| Document | Duur |
|----------|------|
| Concept AV A20 | 5 jaar, bedrijfsgeheimen onbepaald |
| Live NDA art. 5 / Concept NDA art. 5 | 5 jaar, bedrijfsgeheimen onbepaald |
| Freelancer contract art. 3 | 5 jaar, bedrijfsgeheimen onbepaald |
| Intern art. 1.1 | 5 jaar, bedrijfsgeheimen onbepaald |

**Conclusie:** consistent.

---

### 4.6 Engels vs. Nederlands (live pagina's)

Gecontroleerd voor de live pagina's die niet zijn aangepast:

| Punt | Bevinding |
|------|-----------|
| Aansprakelijkheidsplafond Terms | NL en EN beide: 3 maanden, EUR 5.000. Consistent. |
| Opzegtermijn Terms | NL en EN beide: maandelijks. Consistent. |
| Bewaartermijn DPA art. 4 | NL en EN beide: 60 dagen. Consistent maar onjuist t.o.v. het schema. |
| Bewaartermijn Privacy | NL en EN beide: 30 dagen campagnedata, 12 maanden accountdata. Consistent. |
| NDA duur | NL en EN beide: 5 jaar. Consistent. |
| NDA backups | NL en EN beide: 90 dagen. Consistent. |
| Subverwerkers DPA | NL en EN bevatten dezelfde lijst. Consistent (maar lijst is onvolledig t.o.v. CONCEPT_SUBVERWERKERS.md). |
| Subverwerkers Privacy | NL en EN bevatten dezelfde kortere lijst. Consistent onderling maar inconsistent met DPA. |

**Conclusie:** De live NL en EN versies zijn onderling consistent. De inconsistenties zitten tussen NL DPA en NL Privacy (en hun EN-tegenhangers). De concepten lossen dat op.

---

## 5. Niet aangepaste bestanden

De volgende bestanden zijn ongewijzigd gebleven conform de opdracht:

- `app/[locale]/terms/page.tsx`
- `app/[locale]/dpa/page.tsx`
- `app/[locale]/privacy/page.tsx`
- `app/[locale]/nda/page.tsx`

Al het werk staat in `docs/legal/`. Publiceren alleen na akkoord van Koen op de TODO-KOEN-punten en na juridische toetsing van de gemarkeerde onderdelen.

---

## 6. Volgorde voor publicatie

Wanneer de TODO-KOEN-punten zijn ingevuld en een jurist de gemarkeerde onderdelen heeft beoordeeld, is de aanbevolen volgorde:

1. Verzamel alle wijzigingen in de vier live pagina's in één commit (bewaartermijnen gelijkrekken, subverwerkerslijst bijwerken, rollen splitsen in Privacy, DPA bijlage toevoegen)
2. Bump alle versienummers tegelijk
3. Laat bestaande klanten opnieuw akkoord geven
4. Pas de opdrachtbevestigingstemplate aan zodat de open commerciële punten zijn ingevuld
5. Leg vast dat de verwerkersaddenda met AI-leveranciers getekend zijn
