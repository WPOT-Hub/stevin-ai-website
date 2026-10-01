// W-078, 13 sep 2026. Klantlogos, met toestemming van alle genoemde bedrijven.
// Label bewust "Bedrijven waarvoor we werken": voor een deel van deze bedrijven
// bouwden wij de website, niet allemaal draaien op het platform. Een onjuist
// label is precies het soort claim dat de site-audit van 12 sep aanwijst.
// Herkomst per bestand staat in de HERKOMST-notities bij de bronbestanden.
// W-416, 1 okt 2026: Hans Schepers, Totaallobby en Autorijschool Bart erbij,
// op Koens verzoek. Dat draait twee eerdere keuzes terug: Bart stond eruit om
// de JPG met zwarte achtergrond, Totaallobby omdat het een boektitel van
// Parrhesia is en als tweede klant kan lezen. Koen wil hem er nu wel bij.
// - hans-schepers.png: het nieuwe icoon van 24 sep (Stevin-Hub
//   clients/hansschepers/merk/icoon-hansschepers-2026-09.png), verkleind.
// - autorijschool-bart.png: stevin-sites clients/bart/logo.jpg, zwarte
//   achtergrond omgezet naar transparant, wit en blauw beeld naar donker
//   (het blauw viel in grijstinten weg).
// - totaallobby.svg: de titel zoals op het omslag, gezet in Anton (het
//   lettertype van de Parrhesia-site), als paden zodat er geen font laadt.

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
  { src: '/logos/klanten/hans-schepers.png', naam: 'Hans Schepers Stoffering', h: 44, o: 0.72 },
  { src: '/logos/klanten/autorijschool-bart.png', naam: 'Autorijschool Bart', h: 40, o: 0.9 },
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
        <div className="flex items-center justify-center gap-12 sm:gap-16 flex-wrap">
          {KLANTEN.map((k) => (
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}
