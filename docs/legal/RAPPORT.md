# Rapport: juridische set afgemaakt, 26 aug 2026

Dit rapport beschrijft wat er is gedaan in de ronde van 26 aug, welke vragen open staan (de TODO-KOEN-punten), en wat er niet klopte in de bestaande documenten.

---

## 1. Wat er is gedaan

### Nieuwe bestanden

**CONCEPT_VERWERKERSOVEREENKOMST.md**
Een volledige verwerkersovereenkomst ter vervanging van de beperkte live versie op dpa/page.tsx. De live versie beschreef alleen het platform; de nieuwe versie dekt alle diensten die Stevin levert. Toegevoegd:
- Artikelen 1 tot en met 13: de overeenkomst zelf, met instructieplicht, subverwerkersbepaling, beveiliging, datalekmeldplicht (24 uur), auditrecht en bewaartermijnschema.
- Bijlage 1: verwerkingsregister per dienst (acht diensten: platform, campagnebeheer, acties door mensen en agents, bouw en hosting landingspagina's, meetinrichting, CRM- en e-mailkoppelingen, telefonie en gesprekstranscripten, werk door externen). Per dienst: doel, verwerkingshandelingen, gegevenscategorieën, betrokkenen, bewaartermijn en actiebevoegdheid.
- Bijlage 2: verwijzing naar SUBVERWERKERS.md.

**CONCEPT_PRIVACYVERKLARING.md**
Een nieuwe privacyverklaring met twee duidelijk gescheiden rollen:
- Deel A (Stevin als verwerkingsverantwoordelijke): zes doeleinden met per doel de rechtsgrond en bewaartermijn. Doeleinden: websiteaanvragen, gebruikersbeheer, contractadministratie en facturatie, beveiligingslogging, cookies, e-mailcommunicatie.
- Deel B (Stevin als verwerker): uitleg dat betrokkenen voor klantdata naar de klant moeten, niet naar Stevin.

**SUBVERWERKERS.md**
Uniforme subverwerkerslijst afgeleid uit code en omgevingsvariabelen van Stevin-Hub. Elf partijen (waarvan een categorie voor externen). Per partij: rechtsvorm, land van vestiging, dienst, gegevenscategorieën, doorgiftegrondslag. Met toelichting waarom advertentieplatforms en eigen operationele tools (Apollo, Reply.io e.d.) niet op de lijst staan.

### Bijgewerkt bestand

**CONCEPT_ALGEMENE_VOORWAARDEN.md**
- M3.6 toegevoegd: acceptatieprocedure voor opgeleverd werk (vijf werkdagen reactietermijn, stilzwijgende aanvaarding, kosteloos herstel van gebreken van Stevin).
- M3.7 toegevoegd: wijzigingsprocedure tijdens een project (wijzigingsverzoek, voorstel binnen vijf werkdagen, uitvoering pas na akkoord, uitzondering voor redactionele correcties).
- "Wat nog niet in dit concept is verwerkt" bijgewerkt: punten 6, 7, 8 en 10 zijn KLAAR, punt 9 staat NOG OPEN.

---

## 2. TODO-KOEN: open vragen

Dit zijn de vragen die niet konden worden ingevuld zonder commercieel feit te verzinnen. Elke vraag blokkeert het publiceren van een specifiek onderdeel.

### Blokkeert publicatie

**TODO-KOEN-1 (CONCEPT_PRIVACYVERKLARING.md, A1)**
Hoeveel maanden bewaren wij leads die een aanvraag hebben gedaan maar geen klant zijn geworden?
*Waarom dit nodig is:* de privacyverklaring moet een concrete bewaartermijn noemen voor websiteleads. Zonder die termijn is het doel-opslagkoppeling onvolledig en kan een betrokkene geen zinvol verwijderingsverzoek indienen.

**TODO-KOEN-2 (CONCEPT_VERWERKERSOVEREENKOMST.md, bijlage 1G)**
Hoeveel maanden bewaren wij gesprekstranscripten?
*Waarom dit nodig is:* de bewaartermijn in het verwerkingsregister voor telefonie is een wettelijke verplichting (artikel 5 AVG). Zolang dit leeg is, is de verwerkersovereenkomst op dit punt niet compliant.

**TODO-KOEN-3 (CONCEPT_VERWERKERSOVEREENKOMST.md, bijlage 1G)**
Bewaren wij geluidsopnames zelf, of alleen de transcripten? En als wij opnames bewaren: welke bewaartermijn hanteren wij?
*Waarom dit nodig is:* opnames zijn bijzonder gevoelig (geluidsopnames kunnen leiden tot biometrische verwerking), en de bewaartermijn moet apart worden vastgesteld.

**TODO-KOEN-4 (CONCEPT_ALGEMENE_VOORWAARDEN.md, M3.6 en M3.7)**
Is vijf werkdagen de termijn die wij in de praktijk kunnen waarmaken voor (a) de klant om een oplevering te beoordelen en (b) Stevin om een wijzigingsvoorstel te sturen?
*Waarom dit nodig is:* een te korte termijn is nadelig voor de klant bij beoordeling; een te lange termijn voor het wijzigingsvoorstel vertraagt projecten. Pas de termijnen aan als een andere periode beter past.

### Niet blokkerend maar urgent

**TODO-KOEN-5 (SUBVERWERKERS.md, noot onderaan)**
Wordt GoHighLevel (GHL) gebruikt voor het verwerken van persoonsgegevens van eindklanten van Stevin-klanten? Of alleen voor Stevin's eigen CRM?
*Waarom dit nodig is:* als GHL eindklantdata verwerkt, moet GHL op de subverwerkerslijst worden toegevoegd met de bijbehorende doorgiftegrondslag.

**TODO-KOEN-6 (SUBVERWERKERS.md, noot bij AI-providers)**
Zijn de verwerkersaddenda met Anthropic, OpenAI en Mistral daadwerkelijk ondertekend en actueel?
*Waarom dit nodig is:* artikel A8 van de Algemene Voorwaarden belooft klanten dat deze leveranciers geen klantdata gebruiken voor training. Als de addenda er niet zijn, belooft Stevin iets namens een ander zonder contractuele grondslag.

### Niet blokkerend, aanbevolen voor de komende sprint

**TODO-KOEN-7 (CONCEPT_ALGEMENE_VOORWAARDEN.md, "Nog te beslissen" punt 1)**
Bewust vastleggen: behandelen wij platform en uitvoerend werk als één overeenkomst (voorstel in het concept) of als twee aparte overeenkomsten? Dit bepaalt hoe het aansprakelijkheidsplafond in A12 wordt berekend.

**TODO-KOEN-8 ("Nog te beslissen" punt 2)**
Keuze jaarbetalingsartikel: terugbetaling onder verrekening van de korting (voorstel), of vaste looptijd van twaalf maanden?

**TODO-KOEN-9 ("Nog te beslissen" punt 4)**
99,5 procent beschikbaarheid in M1.3: is dit realistisch, en koppelen wij er een vergoeding aan bij het niet halen?

**TODO-KOEN-10 (CONCEPT_VERWERKERSOVEREENKOMST.md, artikel 6)**
Een formele beveiligingsbeoordeling (security audit, DPIA voor de hogere risicoactiviteiten zoals telefonie en AI-inference) is nog niet uitgevoerd. Wanneer is dit gepland?

---

## 3. Wat er niet klopte in de bestaande documenten

### Bewaartermijnen: vijf verschillende schema's naast elkaar

In de live documenten stonden vijf inconsistente termijnen:

| Document | Wat er stond |
|---|---|
| live terms (article 11) | 30 dagen voor export, daarna verwijderd |
| live dpa (artikel 4) | verwijdering binnen 60 dagen |
| live dpa (artikel 7, beveiliging) | back-ups 7 tot 30 dagen retentie |
| live privacy (bewaarduur) | 30 dagen voor campagnedata; 12 maanden voor accountdata na beeindiging |
| live nda (artikel 6) | back-ups maximaal 90 dagen |

Het concept AV A11 had al het correcte schema vastgelegd (30 dagen export, dag 37 actieve verwijdering, 90 dagen back-ups, 12 maanden auditlogs). De nieuwe conceptdocumenten sluiten hier allemaal op aan. De live pagina's (terms/dpa/privacy/nda) moeten worden bijgewerkt zodra de nieuwe set geldig is; de pagina's zijn in dit stadium niet aangeraakt.

### De DPA dekte alleen het platform

De live verwerkersovereenkomst beschreef uitsluitend het platform (lezen van campagnedata, opslaan, presenteren). Alle andere diensten, inclusief campagnebeheer, bouwwerk, telefonie en de inzet van externen, vallen buiten de beschreven verwerking. Voor die diensten had Stevin geen rechtsgeldige grondslag als verwerker. CONCEPT_VERWERKERSOVEREENKOMST.md repareert dit.

### Rollen door elkaar in de privacyverklaring

De live privacyverklaring behandelt Stevin als verwerkingsverantwoordelijke voor alles, inclusief klantdata van eindklanten in CRM en advertentiedata. Dat klopt niet: voor die data is de klant de verwerkingsverantwoordelijke en Stevin de verwerker. Betrokkenen die hun rechten willen uitoefenen worden daarmee op het verkeerde spoor gezet. CONCEPT_PRIVACYVERKLARING.md repareert dit met twee duidelijk gescheiden delen.

### Subverwerkerslijsten kwamen niet overeen

De live DPA vermeldde Slack en Mistral; de live privacyverklaring niet. Externe leveranciers stonden in geen van beide. SUBVERWERKERS.md is nu de enige bron van waarheid.

### Aansprakelijkheidsplafond: live versus concept

De live terms vermelden een plafond van drie maanden vergoeding met een absoluut maximum van EUR 5.000. Het concept AV A12 verhoogt dit naar twaalf maanden, en tweemaal dat bedrag voor geheimhouding, gegevensbescherming en beveiliging. Dit is bewust verhoogd omdat drie maanden in de eerste maanden vrijwel nul oplevert. De live tekst geldt zolang de nieuwe set niet is aanvaard; dat is geen probleem zolang de versiebump voor de eerste klant plaatsvindt voordat de eerste factuur valt.

### Geen procedure voor oplevering en wijzigingen (Module 3)

Er bestond geen acceptatie- of wijzigingsprocedure voor projectwerk. Dat is gerepareerd met M3.6 en M3.7.

### Kennisgeving bij wijziging: 14 versus 30 dagen

De live privacyverklaring meldde materiële wijzigingen minimaal 14 dagen vooraf; de live terms en het concept AV A16 gebruiken 30 dagen. De nieuwe privacyverklaring gebruikt 30 dagen, consistent met de rest.

---

## 4. Hoe de set live gaat

1. Koen vult de TODO-KOEN-1 tot en met -3 in (blokkerend voor publicatie).
2. Een jurist kijkt naar de gemarkeerde onderdelen (alle "Voor de jurist" blokken in de conceptdocumenten).
3. Na akkoord: versiebump voor het hele pakket. Alle vier de klantdocumenten krijgen dezelfde versiedatum.
4. Opdrachtbevestiging voor Boersma Witgoed (en daarna voor iedere nieuwe klant) verwijst naar die versiedatum.
5. Bestaande klanten (De Avenue, Alona) hoeven bij heractivatie alleen de nieuwe set te ondertekenen; zij zijn slapend en hebben nooit de oude set ondertekend op een manier die de nieuwe versie blokkeert.
6. De pagina's op stevin.ai bijwerken (app/[locale]/terms, dpa, privacy, nda/page.tsx).

---

## 5. Wat een jurist moet controleren

De "Voor de jurist" blokken staan in de conceptdocumenten zelf. Kort overzicht:

- **Verwerkersovereenkomst:** artikel 28-conformiteit voor de volledige dienstenbeschrijving, inclusief de bijlage; doorgiftegrondslag per subverwerker; aansprakelijkheid verwerker tegenover betrokkenen (artikel 82 AVG).
- **Privacyverklaring:** invulling gerechtvaardigd belang voor websiteaanvragen (deel A1); bewaarperiode leads (TODO-KOEN-1); e-mailmarketing aan prospects zonder expliciete toestemming.
- **Module 3 acceptatie:** de gevolgen van stilzwijgende aanvaarding na vijf werkdagen; of dit bij consumentenklanten anders ligt (dit zijn zakelijke klanten, maar verifieer).
- **Telefonie Belgie:** opnamenorm voor Belgische klanten; aanvullende clausules mogelijk nodig.
- **Aansprakelijkheidsplafond:** houdbaarheid voor Belgische zakelijke klanten (zware fout, buitensporige risicoverschuiving).
- **Freelancer overeenkomst (CONCEPT_LEVERANCIER_EN_FREELANCER.md):** Waadi-toets voor het non-solicitatiebeding; schijnzelfstandigheid bij de instructiebevoegdheid in artikel 2.
- **IP-vennootschap (M3.3):** vastleggen dat Stevin.AI B.V. bevoegd is licenties te verlenen als de rechten bij WPOT B.V. liggen.

*Opgesteld: 26 aug 2026.*
