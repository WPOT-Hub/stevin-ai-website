import { CalendarClock, Mail, Unlock } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { Knop, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /contact (W-535). Koen, 12 okt: een gewone contactpagina, het
// aanbod van een gratis diagnoserapport verdwijnt, net als op de homepage.
// Links de kennismaking, rechts een kort formulier voor wie liever eerst iets
// op de mail wil (in 7 van de 12 verkoopgesprekken vroeg de klant daar om,
// zie de oude kop van app/[locale]/contact/page.tsx). Het formulier gaat naar
// de Hub (/api/demo-request), dus elk bericht komt in het CRM.

const FEITEN = [
  {
    icoon: CalendarClock,
    t: 'Een half uur, online',
    d: 'Je hoort wat wij bij jou als eerste zouden doen. Past het niet, dan zeggen we dat ook.',
  },
  {
    icoon: Mail,
    t: 'Liever eerst op de mail?',
    d: 'Stuur je vraag via het formulier. We reageren binnen een werkdag.',
  },
  {
    icoon: Unlock,
    t: 'Je zit nergens aan vast',
    d: 'Een kennismaking is geen contract. Je beslist daarna zelf of je verder wilt.',
  },
]

export default function RethinkContact() {
  // Trekt zichzelf onder de kopbalk door (-mt-[72px], met 72px extra
  // bovenruimte), net als de donkere hero's. Anders zat achter de witte
  // glasbalk de navy van <html>: een grijze balk met een donkere streep
  // eronder, de enige pagina waar dat zo was (gezien 17 okt 2026).
  return (
    <main className="-mt-[72px] bg-white">
      <section className="px-6 pb-24 pt-[184px] sm:pt-[200px]">
        <div className="mx-auto grid max-w-[1152px] gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">Contact</p>
            <h1 className="m-0 text-balance font-display font-extrabold text-primary" style={{ ...h2Stijl, fontSize: 'clamp(34px, 4vw, 56px)' }}>
              Wat zouden wij bij jou als eerste doen?
            </h1>
            <p className={`m-0 mt-6 max-w-[560px] ${tekst}`}>
              Plan een kennismaking van een half uur, of stel je vraag via het formulier.
            </p>
            <div className="mt-9">
              <Knop cta="contact_kennismaking" />
            </div>
            <ul className="m-0 mt-12 list-none space-y-6 border-t border-border p-0 pt-8">
              {FEITEN.map(({ icoon: Icoon, t, d }) => (
                <li key={t} className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface">
                    <Icoon size={19} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-[16px] font-bold text-primary">{t}</span>
                    <span className="mt-1 block max-w-[46ch] text-[15px] leading-relaxed text-[#2A3A54]">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="lg:sticky lg:top-28">
              <h2 className="m-0 font-display text-[20px] font-bold text-primary">Stel je vraag</h2>
              <p className="m-0 mb-6 mt-2 max-w-[42ch] text-[15px] leading-relaxed text-[#2A3A54]">
                Je naam en mailadres zijn genoeg. We reageren binnen een werkdag.
              </p>
              <ContactForm
                subject="Contactvraag"
                websiteField
                submitLabel="Verstuur je vraag"
                messageLabel="Je vraag"
                messagePlaceholder="Bijvoorbeeld: wie doet nu je advertenties, of waar loop je tegenaan."
                doneTitle="Je vraag is binnen"
                doneBody="Dank je. We reageren binnen een werkdag."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
