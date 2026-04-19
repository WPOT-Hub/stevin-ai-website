import type { Metadata } from 'next'
import Link from 'next/link'
import MeetlatRuler from '@/components/MeetlatRuler'

export const metadata: Metadata = {
  title: 'Stevin voor Artiesten — Filter het signaal uit de ruis',
  description: 'Stevin centraliseert je social kanalen, filtert de ruis en levert concrete actiepunten. Van cross-channel momentum tot fan-engagement.',
}

const features = [
  {
    title: 'Het 03:00 AM Command Center',
    desc: 'Je stapt \'s nachts de booth uit. Je wilt geen complexe dashboards, je wilt weten: hebben we gewonnen? Stevin toont op je mobiel in één oogopslag de reacties, de pieken en de belangrijkste fan-interacties van vanavond.',
  },
  {
    title: 'Cross-Channel Momentum',
    desc: 'Stevin ziet dat een specifieke track organisch ontploft op SoundCloud of TikTok, nog voordat het in je Spotify-cijfers zit. De Advisor geeft direct een seintje om Meta-Ad budget of merch-promo in te zetten op het juiste moment, in de juiste regio.',
  },
  {
    title: 'De Fan-Bridge Filter',
    desc: 'Jouw AI-filter knipt de 95% emoji-ruis weg. Je ziet alleen de verjaardagen, vragen over merchandise en track-ID smeekbedes. Stevin genereert bullet-points voor je antwoord, zodat jij in je eigen woorden in 2 seconden authentiek reageert.',
  },
]

const capabilities = [
  { title: 'Deep Social Listening', desc: 'Organische signalen van al je kanalen gecentraliseerd. Weet wat er over je gezegd wordt, overal.' },
  { title: 'Momentum Detectie', desc: 'Stevin ziet wanneer een track, video of post organisch versnelt — gebaseerd op cross-channel data, niet op gevoel.' },
  { title: 'Owned vs. Rented Audience', desc: 'Zie hoeveel van je bereik van jou is (nieuwsbrief, website) versus gehuurd (TikTok, Instagram).' },
  { title: 'Reactie-tracking', desc: 'Volg hoe fans reageren op een drop, post of optreden. Zie trends over tijd in plaats van momentopnames.' },
  { title: 'Geo-Hype Tracking', desc: 'Zie in welke steden en landen je het hardst groeit. Stuur je booking en merch erop aan.' },
  { title: 'AI Advisor Cards', desc: 'Geen rapporten van 30 pagina\'s. Concrete kaarten met één actie per signaal.' },
]

const useCases = [
  'Je team is uren kwijt aan het filteren van comments en DM\'s',
  'Je weet niet welke content écht impact heeft op je streams',
  'Je mist kansen omdat je te laat reageert op momentum',
  'Je merch-sales lopen achter terwijl je engagement hoog is',
  'Je hebt geen overzicht over je prestaties per regio',
]

const channels = ['Instagram', 'TikTok', 'YouTube', 'SoundCloud', 'Spotify', 'Facebook', 'Website']

export default function VoorArtiestenPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR ARTIESTEN
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '14ch' }}
          >
            Het Signaal<br />
            <span className="text-[#5DA3FF]">in de Ruis.</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            Stop met het doorspitten van duizenden comments. Stevin filtert social chaos en zet het om in momentum, fan loyalty en merch sales.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
            >
              Vraag toegang aan
            </Link>
            <Link
              href="/platform"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              Bekijk het platform
            </Link>
          </div>
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            JOUW DIGITALE BACKSTAGE
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Al je kanalen.<br />Eén cockpit.
          </h2>
          <p className="text-[17px] text-muted leading-[1.6] max-w-2xl mb-12">
            Je leeft op TikTok, Instagram, YouTube en SoundCloud. De data is versnipperd en je team
            is uren kwijt aan het managen van reacties. Stevin centraliseert jouw ecosysteem.
            Geen irrelevante grafieken, maar keiharde actiepunten.
          </p>
          <div className="flex items-center gap-6 sm:gap-10 flex-wrap border-t border-border pt-8">
            {channels.map((ch) => (
              <span key={ch} className="text-xs font-bold text-slate-400 tracking-wide uppercase">{ch}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            WAT STEVIN VOOR JOU DOET
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Drie pijlers
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
            Die van social chaos een gestroomlijnd systeem maken.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
            {features.map((f, i) => (
              <div key={f.title} className="border-b border-border py-10 md:px-10 md:first:pl-0 md:last:pr-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{f.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            ONDER DE MOTORKAP
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            De technologie<br />achter het signaal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {capabilities.map((c) => (
              <div key={c.title} className="border-b border-r border-border py-8 px-0 sm:px-8 sm:first:pl-0 lg:[&:nth-child(3n)]:border-r-0">
                <h3 className="text-[15px] font-display font-bold text-primary mb-2">{c.title}</h3>
                <p className="text-[14px] text-muted leading-[1.6]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + CTA */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                VOOR JOU ALS
              </p>
              <h2
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-10"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Dit herkenbaar is
              </h2>
              <ul className="space-y-0 border-t border-white/10">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-4 py-5 border-b border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0 mt-[9px]" />
                    <span className="text-[15px] text-white/70 leading-[1.6]">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[140px]">
              <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
                Het is geen wonder. Het is Stevin.
              </p>
              <h3
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-3"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
              >
                Op aanvraag
              </h3>
              <p className="text-white/40 text-sm mb-8">Prijs afhankelijk van scope en aantal kanalen</p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
              >
                Vraag toegang aan
              </Link>
              <ul className="mt-8 space-y-0 border-t border-white/10">
                {['Cross-channel monitoring', 'AI Advisor met momentum-detectie', 'Fan-engagement filtering', 'Reactie-tracking over tijd', 'Geo-hype tracking', 'Merch & ticket conversie-inzichten'].map((f) => (
                  <li key={f} className="flex items-center gap-3 py-3 border-b border-white/10">
                    <span className="w-1 h-1 rounded-full bg-[#00D4A0] flex-shrink-0" />
                    <span className="text-[14px] text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
            Het is geen wonder. Het is Stevin.
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', maxWidth: '16ch' }}
          >
            Koppel je kanalen. Zie wat je mist.
          </h2>
          <p className="text-[17px] text-muted mb-10 max-w-lg leading-[1.6]">
            Koppel je kanalen en zie direct wat je de afgelopen maanden hebt gemist.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
          >
            Neem contact op
          </Link>
        </div>
      </section>
    </main>
  )
}
