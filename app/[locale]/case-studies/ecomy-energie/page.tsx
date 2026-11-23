import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import RethinkCase, { type Case } from '@/components/rethink/RethinkCase'
import { BeeldKader, Insluiting, TelefoonMelding, Tijdlijn } from '@/components/rethink/CaseVisuals'

// W-860. NIET LIVE ZETTEN ZONDER AKKOORD VAN MARCEL (ECOMY). Staat op noindex
// en niet in de sitemap, zonder citaat tot Marcel akkoord geeft. Bron:
// Stevin-company/legal/klanten/mbe-ecomy (LOGBOEK.md, 29 okt tot 22 nov 2026).
// Geen bedragen en geen resultaten: hoeveel aanvragen de check opleverde is niet nagekeken.
type Props = { params: Promise<{ locale: string }> }

const CASE: Case = {
  eyebrow: 'Klantcase: Ecomy Energie',
  kop: 'Nieuw logo, nieuwe site,',
  accent: 'en een check die je dak tekent.',
  knop: 'case_ecomy_kop',
  lede: 'Marcel installeert al ruim dertig jaar zonnepanelen, thuisbatterijen en laadpalen in Wijchen. Zijn website was vijf pagina’s uit een ander tijdperk en aanvragen verdwenen in een volle mailbox. Wij hebben het hele merk opnieuw neergezet, in een paar weken.',
  beeld: (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex items-center justify-center rounded-xl border border-border bg-[#F7F8FA] px-8 py-14">
        <Image src="/logos/klanten/ecomy.webp" alt="Het nieuwe logo van Ecomy Energie, een aan-knop" width={698} height={160} className="h-auto w-full max-w-[280px]" />
      </div>
      <p className="m-0 max-w-[520px] text-[18px] leading-[1.6] text-[#2A3A54]">
        Het nieuwe logo is een aan-knop. Je herkent hem op een bus, op een shirt en als icoontje in je browser.
      </p>
    </div>
  ),
  probleemKop: 'Waar Marcel mee zat.',
  problemen: [
    { t: 'Een site uit een ander tijdperk', d: 'WordPress, vijf pagina’s, alleen Google Analytics en geen enkele conversie ingesteld (gemeten op 29 oktober).' },
    { t: 'Aanvragen in een volle mailbox', d: 'Een aanvraag die tussen de andere mail verdween, was een aanvraag die Marcel niet belde.' },
    { t: 'Geen eigen gezicht', d: 'Een installateur met dertig jaar vakwerk en een merk dat dat niet liet zien.' },
  ],
  aanpakKop: 'Alles in een keer neergezet.',
  aanpakZin: 'Logo, site, check en meldingen horen bij elkaar. We bouwden ze samen.',
  aanpak: [
    { t: 'Een nieuw logo', d: 'De aan-knop, in vlakke kleuren, samen met Marcel afgestemd op 2 november.' },
    { t: 'Een nieuwe website op ecomy.nl', d: 'Een eigen pagina voor zonnepanelen, thuisbatterij en laadpaal, en een pagina per gemeente met de regelingen die daar gelden.' },
    { t: 'De check: wat kan jouw huis opwekken?', d: 'Je vult je postcode en huisnummer in. De check zoekt je huis op, tekent je dak van bovenaf en legt de panelen er vlak voor vlak op, ook op de garage. Daarna zie je of een thuisbatterij past en welke lening jouw gemeente heeft, voor alle 342 gemeenten.' },
    { t: 'Elke aanvraag direct op zijn telefoon', d: 'Een bericht met naam en nummer, een knop om te appen en knoppen voor Gebeld, Afspraak gemaakt en Niet bereikt.' },
  ],
  aanpakBeeld: (
    <div className="grid gap-12">
      <Insluiting
        src="https://ecomy.nl/check/"
        titel="De check van Ecomy: wat kan jouw huis opwekken?"
        bijschrift="Dit is de echte check van ecomy.nl. Vul een adres in en je ziet je dak."
      />
      <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
        <BeeldKader
          src="/images/cases/ecomy-check.webp"
          alt="De check van Ecomy: een dak van bovenaf met de panelen erop, het aantal panelen dat past en de opbrengst per jaar"
          breedte={1200}
          hoogte={619}
          donker
          bijschrift="De uitkomst voor een voorbeeldadres: de panelen op elk dakvlak. Het rekent met de regels van Marcel zelf en geeft een indicatie, geen offerte."
        />
        <TelefoonMelding
          kop="Nieuwe aanvraag"
          regels={['Voorbeeld Klant', '06 12 34 56 78', 'Zonnepanelen en thuisbatterij']}
          knoppen={['Stuur een appje', 'Gebeld', 'Afspraak gemaakt', 'Niet bereikt']}
          donker
          bijschrift="Zo ziet een aanvraag eruit op Marcels telefoon (voorbeeld)."
        />
      </div>
    </div>
  ),
  uitkomstKop: 'In drie weken van oud naar compleet.',
  uitkomstBeeld: (
    <Tijdlijn
      stappen={[
        { datum: '29 oktober', t: 'Oude site gemeten', d: 'Vijf pagina’s, geen conversies.' },
        { datum: '2 november', t: 'Nieuw logo', d: 'De aan-knop, afgestemd met Marcel.' },
        { datum: '21 november', t: 'Site, check en meldingen live', d: 'ecomy.nl wijst naar de nieuwe site, de check werkt en aanvragen komen op Marcels telefoon.' },
        { datum: '22 november', t: 'Pagina per gemeente', d: 'Wijchen, Nijmegen, Beuningen en Heumen met hun eigen regelingen.' },
      ]}
    />
  ),
  cijfers: [
    { getal: '342 gemeenten', uitleg: 'met hun eigen leningregeling in de check' },
    { getal: '4 gemeentepagina’s', uitleg: 'live op 22 november, meer volgen' },
    { getal: '1 telefoon', uitleg: 'waar elke aanvraag direct binnenkomt' },
  ],
  bron: 'Bron: logboek Ecomy Energie, 29 oktober tot en met 22 november 2026. Hoeveel aanvragen de check en de site sinds 21 november opleverden is nog niet nagekeken.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    ...localizedMetadata({
      path: '/case-studies/ecomy-energie',
      locale,
      title: 'Klantcase Ecomy Energie',
      description: 'Een installateur kreeg in een paar weken een nieuw logo, een nieuwe site en een check die het dak van je huis tekent.',
      translated: false,
    }),
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RethinkCase c={CASE} />
}
