// W-078, 13 sep 2026. Klantlogos, met toestemming van alle genoemde bedrijven.
// Label bewust "Bedrijven waarvoor we werken": voor een deel van deze bedrijven
// bouwden wij de website, niet allemaal draaien op het platform. Een onjuist
// label is precies het soort claim dat de site-audit van 12 sep aanwijst.
// Herkomst per bestand staat in de HERKOMST-notities bij de bronbestanden.
// W-416, 1 okt 2026: Hans Schepers, Totaallobby en Autorijschool Bart erbij,
// op Koens verzoek. Dat draait twee eerdere keuzes terug: Bart stond eruit om
// de JPG met zwarte achtergrond, Totaallobby omdat het een boektitel van
// Parrhesia is en als tweede klant kan lezen. Koen wil hem er nu wel bij.
// - hans-schepers.svg: het nieuwe logo, richting "1. Evolutie" uit Stevin-Hub
//   clients/hansschepers/merk/logo-richtingen.html (Koen 1 okt: "hans moet
//   echt het nieuwe logo zijn"). Stoel plus naam, tekst als paden in Plus
//   Jakarta Sans zodat er geen font laadt.
// - autorijschool-bart.png: stevin-sites clients/bart/logo.jpg, zwarte
//   achtergrond omgezet naar transparant, wit en blauw beeld naar donker
//   (het blauw viel in grijstinten weg).
// - totaallobby.svg: de titel zoals op het omslag, gezet in Anton (het
//   lettertype van de Parrhesia-site), als paden zodat er geen font laadt.
// W-567, 17 okt 2026: Rigo Bouw en Sterker Witgoed erbij, op Koens verzoek.
// - rigo-bouw.png: rigobouwbv.nl, /manus-storage/FullLogo_Transparent3, al
//   transparant; alleen de lege rand eraf en verkleind naar 160 hoog.
// - sterker-witgoed.png: sterkerwitgoed.nl, wp-content/uploads/2025/03/
//   logo-sterkerwitgoed.png. Wit beeld op een gekleurd vierkant; dat vierkant
//   wordt in grijstinten een zwaar blok, dus net als bij Bart alleen het witte
//   beeld bewaard en donker gemaakt op transparant.

type Klant = { src: string; naam: string; h: number; o: number }

// Hoogte EN dekking per logo met de hand gezet. Optisch even zwaar is iets
// anders dan even veel pixels: Tonissteiner is zwart en breed en drukt de rij
// plat, Antwerp Drone is lichtgrijs en valt juist weg. Daarom staat het zwarte
// woordmerk lager en lichter, en het grijze beeldmerk hoger en voller.
// mix-blend-mode multiply haalt de witte achtergrond uit de bestanden die er
// een hebben (Parrhesia), zonder de originelen te bewerken.
const KLANTEN: Klant[] = [
  { src: '/logos/klanten/boersma-witgoed.png', naam: 'Boersma Witgoed', h: 42, o: 0.8 },
  { src: '/logos/klanten/antwerp-drone-company.png', naam: 'Antwerp Drone Company', h: 44, o: 1 },
  { src: '/logos/klanten/tonissteiner.svg', naam: 'Tonissteiner', h: 23, o: 0.62 },
  { src: '/logos/klanten/parrhesia.png', naam: 'Parrhesia', h: 40, o: 0.82 },
  { src: '/logos/klanten/totaallobby.svg', naam: 'Totaallobby', h: 36, o: 0.7 },
  { src: '/logos/klanten/hans-schepers.svg', naam: 'Hans Schepers Stoffering', h: 40, o: 0.75 },
  { src: '/logos/klanten/autorijschool-bart.png', naam: 'Autorijschool Bart', h: 40, o: 0.9 },
  { src: '/logos/klanten/rigo-bouw.png', naam: 'Rigo Bouw', h: 50, o: 0.9 },
  { src: '/logos/klanten/sterker-witgoed.png', naam: 'Sterker Witgoed', h: 52, o: 0.8 },
]

const COPY = {
  nl: { label: 'Bedrijven waarvoor we werken' },
  en: { label: 'Companies we work for' },
} as const

export default function KlantLogos({ locale }: { locale: string }) {
  const c = COPY[locale === 'en' ? 'en' : 'nl']

  return (
    <div className="bg-white border-y border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <p className="text-[11px] font-display font-bold text-muted uppercase tracking-[0.08em] text-center mb-6">
          {c.label}
        </p>
        {/* Rijen met de hand gebroken (W-535, 11 okt): de rij liep vrij af en
            liet op 980 en 1024 breed een logo alleen op de tweede regel staan,
            en op een telefoon rijen van twee, drie, een en een. Nu op een
            telefoon 2, 3, 2, op een tablet 4 en 3, en vanaf 900px alles op een
            regel (met kleinere tussenruimte tot 1024). De breuken zijn lege
            elementen van een hele regel breed. Breekpunt tussen (900px) staat
            in app/globals.css.
            W-567, 17 okt: met negen logo's past een regel pas vanaf 1280 breed
            (samen ca. 790px logo plus 8 keer 40px ruimte). Daarom nu op een
            telefoon 2, 3, 2, 2, van tablet tot 1280 5 en 4, en vanaf xl een
            regel. Breekpunt tussen is hier niet meer nodig. */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-8 xl:gap-x-10">
          {KLANTEN.map((k, i) => [
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={k.src}
              src={k.src}
              alt={k.naam}
              loading="lazy"
              decoding="async"
              style={{
                height: `${k.h}px`,
                width: 'auto',
                maxWidth: '170px',
                objectFit: 'contain',
                filter: 'grayscale(1)',
                opacity: k.o,
                mixBlendMode: 'multiply',
              }}
            />,
            (i === 1 || i === 6) && <span key={`breuk-${i}`} aria-hidden="true" className="h-0 basis-full sm:hidden" />,
            i === 4 && <span key="breuk-4" aria-hidden="true" className="h-0 basis-full xl:hidden" />,
          ])}
        </div>
      </div>
    </div>
  )
}
