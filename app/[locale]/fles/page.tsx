import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Caveat } from 'next/font/google'
import { Link } from '@/i18n/navigation'
import FlesPlaylist from '@/components/FlesPlaylist'
import { FLES_COOKIE, flesCookieGeldig } from '@/lib/flesToegang'
import NodeWatermerk from '@/components/rethink/NodeWatermerk'
import { DonkerBlok, Punten, h2Stijl, tekst } from '@/components/rethink/RethinkBlokken'

/**
 * De bestemming van de QR-code op de gegraveerde relatiefles (W-918,
 * 28 nov 2026). Koen: "Moeten we niet gewoon een webpagina hiervan aanmaken?
 * En kort verhaaltje hoe stevin is ontstaan, mijn dankwoord voor het
 * vertrouwen en de playlist erin imbedden met uitleg."
 *
 * De bestemming van een code die wij zelf uitdelen, dus noindex en niet in de
 * sitemap, net als /koen. Anders dan /koen staat er wel een code op (Koen,
 * 28 nov: "Zet online met een code die je enkel vanuit de QR code op kunt").
 * De QR wijst naar /f/<code>; de middleware zet de cookie, en deze pagina kijkt
 * zelf of die klopt. Daardoor wordt hij per verzoek gemaakt en bestaat er geen
 * vooraf gebouwde versie die om de poort heen op te halen is.
 *
 * Het adres is in metaal gebrand en kan dus niet meer veranderen. De inhoud
 * wel: dat is de reden dat de code hierheen wijst en niet naar Spotify.
 *
 * Bronnen: het ontstaan komt uit /simon-stevin (Koens eigen woorden), de
 * feiten over Simon Stevin uit diezelfde pagina en uit nl.wikipedia.org
 * (gelezen 28 nov 2026). "Spiegheling en daet" staat letterlijk in Stevins
 * eigen lijst met verbeteringen in de Wisconstighe Ghedachtenissen, deel 5.
 */

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ fout?: string }> }

async function heeftToegang(): Promise<boolean> {
  return flesCookieGeldig((await cookies()).get(FLES_COOKIE)?.value)
}

// Zonder code zegt ook de titel niets over wat erachter staat.
export async function generateMetadata(): Promise<Metadata> {
  if (!(await heeftToegang())) return { title: { absolute: 'Stevin.AI' }, robots: 'noindex, nofollow' }
  return {
    title: 'Spiegheling en daet',
    description:
      'Bij de fles die je van Stevin.AI kreeg: waarom je hem kreeg, wat erop staat, wie Simon Stevin was en de playlist die erbij hoort.',
    robots: 'noindex, nofollow',
  }
}

// Alleen op deze pagina geladen, voor het handgeschreven dankwoord. next/font
// haalt het bestand bij het bouwen op en serveert het daarna zelf.
const handschrift = Caveat({ subsets: ['latin'], weight: ['600'], display: 'swap' })

const VERWIJZINGEN = [
  {
    t: 'Visions, Stevie Wonder',
    d: 'Het openingsnummer. Stevin en Stevie schelen maar een letter, en het wonder zit er meteen in.',
  },
  {
    t: 'Fly Me To The Moon, Frank Sinatra',
    d: 'De Thiende droeg Stevin op aan onder meer de sterrenkijkers.',
  },
  {
    t: 'Gravity, John Mayer',
    d: 'Voor de valproef vanaf de toren van de Nieuwe Kerk in Delft.',
  },
  {
    t: 'Summer Wind, Frank Sinatra',
    d: 'Voor de zeilwagen waarmee hij met prins Maurits over het strand reed.',
  },
  {
    t: 'Under Pressure, Queen en David Bowie',
    d: 'Voor wat Stevin liet zien over de druk van water.',
  },
  {
    t: 'Chicken Fried, Zac Brown Band',
    d: 'Het slot. Als het werk gedaan is, is er weer tijd voor wat er echt toe doet.',
  },
]

function Kop({ children, licht = false }: { children: ReactNode; licht?: boolean }) {
  return (
    <h2
      className={`m-0 max-w-[22ch] text-balance font-display font-extrabold ${licht ? 'text-white' : 'text-primary'}`}
      style={h2Stijl}
    >
      {children}
    </h2>
  )
}

/** Het codescherm, naar het voorbeeld van /ps5-actie-toegang. Bewust neutraal. */
function CodeScherm({ fout }: { fout: boolean }) {
  return (
    <main className="-mt-[72px] flex min-h-screen items-center justify-center bg-primary px-5">
      <form method="get" action="/fles" className="w-full max-w-[360px] text-center">
        <h1 className="m-0 font-display text-[24px] font-extrabold leading-tight text-white">Alleen met de code</h1>
        <p className="m-0 mt-2 text-[14px] leading-relaxed text-white/70">
          Scan de code op je fles, of vul hem hier in.
        </p>
        <label htmlFor="fles-code" className="sr-only">
          Code
        </label>
        <input
          id="fles-code"
          name="code"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={16}
          placeholder="Code"
          className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-center text-[17px] tracking-[0.2em] text-white outline-none placeholder:tracking-normal placeholder:text-white/40 focus:border-accent"
        />
        {fout ? <p className="m-0 mt-3 text-[13px] text-[var(--color-pink)]">Die code klopt niet.</p> : null}
        <button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-xl bg-accent px-5 py-3.5 font-display text-[16px] font-bold text-white transition-[filter] hover:brightness-110"
        >
          Verder
        </button>
      </form>
    </main>
  )
}

export default async function FlesPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)
  if (!(await heeftToegang())) {
    const { fout } = await searchParams
    return <CodeScherm fout={fout === '1'} />
  }

  return (
    <main className="-mt-[72px] bg-white">
      {/* Donkere kop zoals op de andere nieuwe pagina's (php-lek-check). */}
      <section className="relative overflow-hidden bg-primary px-6 pb-24 pt-[184px] text-white sm:pt-[200px]">
        <NodeWatermerk seed={18} thema="donker" />
        <div className="relative mx-auto max-w-[1152px]">
          <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">Voor jou</p>
          <h1
            className="m-0 text-balance font-display font-extrabold italic text-white"
            style={{ ...h2Stijl, fontSize: 'clamp(44px, 6.4vw, 92px)', lineHeight: 1 }}
          >
            Spiegheling <span className="text-accent">en daet.</span>
          </h1>
          <p className="m-0 mt-7 max-w-[640px] text-[18px] leading-[1.55] text-white/75">
            Je hebt een fles van ons gekregen. Hier lees je waarom, wat erop staat en welke muziek erbij hoort.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1152px] items-center gap-10 sm:grid-cols-[auto_1fr] sm:gap-14">
          <img
            src="/images/oprichter.png"
            alt="Koen Hoogenboom"
            width={320}
            height={320}
            className="h-[168px] w-[168px] sm:h-[208px] sm:w-[208px]"
          />
          <div>
            <p className={`m-0 max-w-[620px] ${tekst}`}>
              Je werkt met Stevin.AI, en dat is niet vanzelfsprekend. We zijn een jong bedrijf, en je geeft ons
              toegang tot je cijfers en je accounts. Dat vertrouwen nemen we serieus. Deze fles is ons bedankje.
            </p>
            <p
              className={`${handschrift.className} m-0 mt-7 text-primary`}
              style={{ fontSize: 'clamp(30px, 3.2vw, 40px)', lineHeight: 1.15 }}
            >
              Dank je wel voor je vertrouwen.
            </p>
            <p
              className={`${handschrift.className} m-0 mt-2 inline-block text-accent`}
              style={{ fontSize: 'clamp(40px, 4.4vw, 56px)', lineHeight: 1, transform: 'rotate(-4deg)' }}
            >
              Koen
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-[1152px]">
          <Kop>Hoe Stevin.AI is ontstaan</Kop>
          <div className={`mt-7 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            {/* Koens eigen woorden, 28 nov 2026. De naam van het derde blad staat
                hier zoals hij hem typte en is nog niet bevestigd: navragen voor
                de pagina live gaat. */}
            <p className="m-0">
              Mijn vader gaf bladen uit: De Nieuwe Drogist, Marketing Results en Hones & More, waar ik later zelf
              ook werkte. Het ondernemerschap heeft me altijd getrokken.
            </p>
            <p className="m-0">
              Ik werk twintig jaar in online marketing. Het eerste idee voor Stevin.AI ontstond bij mijn eigen bureau
              in België. Ik zocht geen nieuw systeem, want alles was er al: de campagnecijfers, het CRM, de agenda, de
              offertes. Wat ontbrak was iets dat het aan elkaar knoopte en op tijd iets zei. De juiste informatie kwam
              bijna altijd te laat bij de juiste persoon.
            </p>
            <p className="m-0">
              Wat begon als een oplossing voor ons eigen bureau, is vanuit Breda uitgebouwd tot wat het nu is. Stevin.AI
              kijkt elke dag mee op je marketing en onthoudt wat er gebeurde.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-[1152px]">
          <Kop>Waarom ik je soms gek zeur</Kop>
          <div className={`mt-7 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Ik verwonder me oprecht over alle mooie bedrijven waar wij deel van mogen uitmaken. Samen groeien, daar
              word ik blij van.
            </p>
            <p className="m-0">
              Voor details is er vaak weinig tijd. Juist daar gaan wij lekker op. Soms zit het in een kleine, wat
              ingewikkelde oplossing die ervoor zorgt dat het net iets beter loopt.
            </p>
            <p className="m-0">
              En ja, soms zeur ik je gek over de kleinste dingen. Allemaal uit liefde, en altijd met je bedrijf voorop.
            </p>
          </div>
        </div>
      </section>

      <DonkerBlok seed={48} label="Simon Stevin">
        <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
          Onze naamgever
        </p>
        <Kop licht>Een eigenwijze Bruggeling die in Holland groot werd</Kop>
        <div className="mt-7 max-w-[680px] flex flex-col gap-5 text-[18px] leading-[1.6] text-white/75">
          <p className="m-0">
            Simon Stevin werd in 1548 geboren in Brugge. Hij werkte als boekhouder in Antwerpen en vertrok in 1581 naar
            Leiden, toen hij al in de dertig was, om alsnog te gaan studeren. Daarna hield hij niet meer op. Hij leerde
            kooplieden rekenen met tienden, liet zien hoe hard water op de bodem van een vat drukt, ontwierp vestingen
            en een zeilwagen die over het strand sneller ging dan een paard.
          </p>
          <p className="m-0">
            Hij schreef het allemaal op in het Nederlands, voor mensen die er iets mee moesten doen. Ontbrak er een
            Nederlands woord, dan zocht hij er een. Woorden als wiskunde, natuurkunde en middellijn danken we aan hem.
          </p>
        </div>
        <p
          className="m-0 mt-12 max-w-[18ch] font-display font-extrabold italic text-white"
          style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.08 }}
        >
          Wonder en is gheen wonder.
        </p>
        <p className="m-0 mt-3 text-[15px] text-white/60">Simon Stevin, 1586</p>
        <div className="mt-10 max-w-[680px] flex flex-col gap-5 text-[18px] leading-[1.6] text-white/75">
          <p className="m-0">
            Een Vlaming die in Nederland groot werd: dat stuk herkennen we. Maar de naam past vooral om wat hij deed.
            Stevin maakte kennis bruikbaar voor mensen die ermee moesten werken. Dat proberen wij met je cijfers.
          </p>
          <p className="m-0">
            En zijn lijfspreuk zegt het al. Wat een wonder lijkt, kun je verklaren als je goed genoeg kijkt. Wij zeggen
            het zo: uiteindelijk is alles te verklaren, als je er maar de juiste data op loslaat.
          </p>
          <p className="m-0">
            <Link
              href="/simon-stevin"
              className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4"
            >
              Lees meer over de naam
            </Link>
          </p>
        </div>
      </DonkerBlok>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1152px]">
          <Kop>Wat er op je fles staat</Kop>
          <p className={`m-0 mt-7 max-w-[680px] ${tekst}`}>
            Op de ene kant staat Spiegheling, op de andere en daet. Zo noemde Stevin theorie en praktijk. Wij lezen
            het als: eerst denken, dan doen.
          </p>
          <div className="mt-10 grid max-w-[760px] gap-4 sm:grid-cols-2">
            {[
              { kant: 'De ene kant', woord: 'Spiegheling', uitleg: 'Denken' },
              { kant: 'De andere kant', woord: 'en daet.', uitleg: 'Doen' },
            ].map((k) => (
              <div key={k.woord} className="rounded-xl bg-primary px-7 py-8 text-white">
                <p className="m-0 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
                  {k.kant}
                </p>
                <p
                  className="m-0 mt-4 font-display font-extrabold italic"
                  style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
                >
                  {k.woord}
                </p>
                <p className="m-0 mt-3 text-[15px] text-white/60">{k.uitleg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-[1152px]">
          <Kop>De playlist</Kop>
          <div className={`mt-7 max-w-[680px] flex flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Bij de fles hoort een playlist in twee helften. De eerste helft is Spiegheling: rustige muziek om bij na
              te denken. De tweede is Daet: muziek om bij aan de slag te gaan.
            </p>
            <p className="m-0">Er zitten een paar verwijzingen in. Dit zijn er zes.</p>
          </div>
          <Punten items={VERWIJZINGEN} kolommen={3} />
          <FlesPlaylist />
        </div>
      </section>
    </main>
  )
}
