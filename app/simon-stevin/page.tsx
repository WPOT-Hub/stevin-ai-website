import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Simon Stevin — Waarom wij zijn naam dragen',
  description: 'Simon Stevin zag al door de mist in 1585. Wij dragen zijn naam omdat wij zijn werk voortzetten — niet in polders, wel in marketingbudgetten.',
}

export default function SimonStevinPage() {
  return (
    <>
      {/* Hero — navy with portrait */}
      <section className="bg-primary pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            — Waarom wij zijn naam dragen
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] bg-surface rounded-lg overflow-hidden max-w-xs mx-auto lg:mx-0">
                <Image
                  src="/simon-stevin-lineart.svg"
                  alt="Portret van Simon Stevin — lijntekening gebaseerd op historisch portret"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* H1 + intro */}
            <div className="lg:col-span-7">
              <h1 className="font-display font-bold text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}>
                Simon Stevin zag al door de mist in 1585.
              </h1>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                In een tijd dat Europa rekende met breuken op perkament, schreef hij De Thiende — en introduceerde decimalen. Niet omdat het mooier klonk, maar omdat het klopte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body — white */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-base sm:text-lg text-muted leading-relaxed">
            <p>
              Simon Stevin (1548-1620) was ingenieur, wiskundige en adviseur van Prins Maurits. Hij bouwde forten, zeilwagens en waterwerken. Hij bedacht Nederlandse woorden voor wetenschap die nog steeds meegaan — wiskunde, evenaar, middellijn. Hij maakte complex simpel zonder afbreuk te doen aan wat telt.
            </p>

            {/* Quote block */}
            <blockquote className="my-12 py-8 px-4 sm:px-8 bg-surface rounded-lg text-center">
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight italic mb-4">
                &ldquo;Wonder en is gheen wonder.&rdquo;
              </p>
              <cite className="not-italic text-sm text-muted">
                — Simon Stevin, 1586
              </cite>
            </blockquote>

            <p>
              Zijn gedachte: wat op het eerste gezicht een wonder lijkt, is bij nader inzien gewoon logica die nog niet was doorgrond. Zwaartekracht. Valsnelheid. Getijden. Allemaal &ldquo;wonderen&rdquo; tot iemand de getallen erachter rangschikt.
            </p>

            <p>
              Marketing is in 2026 waar natuurkunde was in 1586. We vertrouwen dashboards die elkaar tegenspreken. We noemen het &ldquo;magie&rdquo; als iets werkt. We accepteren black boxes omdat de complexiteit ons afschrikt.
            </p>

            <p>
              Wij dragen zijn naam omdat wij zijn werk voortzetten — niet in polders en zeilwagens, maar in marketingbudgetten en CRM-data. De meetlat leggen waar anderen het bij &ldquo;dat is toch niet te bewijzen&rdquo; laten.
            </p>
          </div>
        </div>
      </section>

      {/* Kicker + CTA — navy */}
      <section className="bg-primary py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-6">
            Het is geen wonder. Het is Stevin.
          </h2>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow mt-4"
          >
            Zie wat je betaalt. Zie wat het oplevert.
          </Link>
          <p className="mt-12 text-xs text-white/30 italic">
            Gedachte uit 1586. Nog steeds bruikbaar.
          </p>
        </div>
      </section>
    </>
  )
}
