// W-078, 13 sep 2026. Klantlogos, met toestemming van alle genoemde bedrijven.
// Label bewust "Bedrijven waarvoor we werken": voor een deel van deze bedrijven
// bouwden wij de website, niet allemaal draaien op het platform. Een onjuist
// label is precies het soort claim dat de site-audit van 12 sep aanwijst.
// Herkomst per bestand staat in de HERKOMST-notities bij de bronbestanden.
// Autorijschool Bart eruit gelaten: het enige bestand is een JPG met een eigen
// donkere achtergrond, en dat breekt de rij. Koen noemde hem sowieso optioneel.
// Totaallobby staat er bewust NIET bij: dat is een boektitel van Parrhesia,
// geen apart bedrijf, en twee logo's zou als twee klanten lezen.

type Klant = { src: string; naam: string; h: number }

// Hoogte per logo met de hand gezet, want optisch even groot is iets anders dan
// even veel pixels: een woordmerk mag hoger dan een rond beeldmerk.
const KLANTEN: Klant[] = [
  { src: '/logos/klanten/boersma-witgoed.png', naam: 'Boersma Witgoed', h: 36 },
  { src: '/logos/klanten/antwerp-drone-company.png', naam: 'Antwerp Drone Company', h: 40 },
  { src: '/logos/klanten/tonissteiner.svg', naam: 'Tonissteiner', h: 26 },
  { src: '/logos/klanten/parrhesia.png', naam: 'Parrhesia', h: 44 },
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
        <div className="flex items-center justify-center gap-10 sm:gap-14 flex-wrap">
          {KLANTEN.map((k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={k.src}
              src={k.src}
              alt={k.naam}
              loading="lazy"
              style={{
                height: `${k.h}px`,
                width: 'auto',
                maxWidth: '160px',
                objectFit: 'contain',
                filter: 'grayscale(1)',
                opacity: 0.72,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
