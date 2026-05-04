import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { editorials, dispatches } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Stevin Journal — Marketing-intelligence redactie',
  description:
    'Redactionele stukken over marketing-attribution, AI-tooling en meetstructuur. Geen hype, geen jargon, alleen wat herleidbaar is.',
  alternates: { canonical: 'https://stevin.ai/blog' },
}

const dateNL = (iso: string) => {
  const d = new Date(iso)
  return d
    .toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase()
}

export default function BlogIndex() {
  const allEditorials = editorials()
  const allDispatches = dispatches()
  const [featured, ...restEditorials] = allEditorials

  return (
    <>
      {/* Header — navy, editorial */}
      <header className="bg-[var(--navy)] text-white" style={{ padding: '96px 24px 64px' }}>
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '16px',
            }}
          >
            JOURNAL · 2026
          </p>
          <h1
            className="font-display font-extrabold text-white m-0"
            style={{
              fontSize: 'clamp(40px, 5vw, 76px)',
              lineHeight: '1.04',
              letterSpacing: '-0.03em',
              maxWidth: '18ch',
            }}
          >
            Wat we lezen, meten en uitschrijven.
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              lineHeight: '1.55',
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '60ch',
              marginTop: '24px',
              fontWeight: 300,
            }}
          >
            Onderzoek, methode en kritische lezingen. Voor wie zijn marketing serieus neemt en geen
            genoegen meer neemt met een dashboard dat alleen zichzelf bevestigt.
          </p>
        </div>
      </header>

      {/* Featured editorial */}
      {featured && (
        <section className="bg-white" style={{ padding: '80px 24px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: '1200px' }}>
            <Link
              href={`/blog/${featured.slug}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-underline text-inherit group items-center"
            >
              <div
                className="overflow-hidden"
                style={{ aspectRatio: '4 / 3', borderRadius: '14px' }}
              >
                <FeaturedPoster
                  tag={featured.posterTag}
                  topic={featured.posterTopic}
                  style={featured.posterStyle}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: '14px',
                  }}
                >
                  Editie {featured.edition} · {featured.category} · {featured.readMinutes} min
                </p>
                <h2
                  className="font-display font-bold text-[var(--navy)] m-0 group-hover:text-[var(--accent)] transition-colors"
                  style={{
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.025em',
                    textWrap: 'balance' as const,
                    marginBottom: '20px',
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '17px',
                    lineHeight: '1.55',
                    color: 'var(--muted)',
                    textWrap: 'pretty' as const,
                    marginBottom: '20px',
                  }}
                >
                  {featured.dek}
                </p>
                <span
                  className="font-display font-semibold text-[var(--accent)] inline-flex items-center gap-2"
                  style={{ fontSize: '15px' }}
                >
                  Lees editie {featured.edition} →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Kort — dispatches */}
      {allDispatches.length > 0 && (
        <section className="bg-white" style={{ padding: '40px 24px 64px' }}>
          <div className="mx-auto" style={{ maxWidth: '1200px' }}>
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '6px',
                  }}
                >
                  KORT · DAGELIJKS
                </p>
                <h3
                  className="font-display font-bold text-[var(--navy)] m-0"
                  style={{ fontSize: '24px', letterSpacing: '-0.02em' }}
                >
                  Wat er deze week gebeurde
                </h3>
              </div>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {allDispatches.length} berichten
              </span>
            </div>
            <ul
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {allDispatches.map((d, i) => (
                <li
                  key={d.slug}
                  style={{
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === allDispatches.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <Link
                    href={`/blog/${d.slug}`}
                    className="block no-underline text-inherit group"
                    style={{ padding: '20px 0' }}
                  >
                    <div
                      className="flex items-center gap-3 mb-2"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '10px',
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)' }}>{d.posterTag}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{dateNL(d.publishedAt)}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{d.readMinutes} MIN</span>
                    </div>
                    <h4
                      className="font-display font-semibold text-[var(--navy)] m-0 group-hover:text-[var(--accent)] transition-colors"
                      style={{
                        fontSize: '18px',
                        lineHeight: '1.3',
                        letterSpacing: '-0.015em',
                        textWrap: 'balance' as const,
                      }}
                    >
                      {d.title}
                    </h4>
                    {d.source && (
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: 'var(--muted)',
                          margin: '6px 0 0',
                          fontStyle: 'italic',
                        }}
                      >
                        via {d.source.name}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Edities — remaining editorials */}
      {restEditorials.length > 0 && (
        <section className="bg-[var(--surface)]" style={{ padding: '64px 24px 96px' }}>
          <div className="mx-auto" style={{ maxWidth: '1200px' }}>
            <div className="flex justify-between items-baseline mb-10">
              <div>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: '6px',
                  }}
                >
                  EDITIES · WEKELIJKS
                </p>
                <h3
                  className="font-display font-bold text-[var(--navy)] m-0"
                  style={{ fontSize: '24px', letterSpacing: '-0.02em' }}
                >
                  Lange stukken
                </h3>
              </div>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {allEditorials.length} edities
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restEditorials.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="block no-underline text-inherit group"
                >
                  <div
                    className="overflow-hidden mb-[18px]"
                    style={{ aspectRatio: '16 / 10', borderRadius: '10px' }}
                  >
                    <FeaturedPoster
                      tag={a.posterTag}
                      topic={a.posterTopic}
                      style={a.posterStyle}
                    />
                  </div>
                  <div
                    className="mb-2.5"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                    }}
                  >
                    EDITIE {a.edition} · {a.readMinutes} MIN · {dateNL(a.publishedAt)}
                  </div>
                  <h4
                    className="font-display font-bold text-[var(--navy)] m-0 group-hover:text-[var(--accent)] transition-colors"
                    style={{
                      fontSize: '20px',
                      lineHeight: '1.25',
                      letterSpacing: '-0.015em',
                      textWrap: 'balance' as const,
                    }}
                  >
                    {a.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function FeaturedPoster({
  tag,
  topic,
  style,
}: {
  tag: string
  topic: string
  style: 'solid' | 'gradient' | 'surface'
}) {
  const bgStyle =
    style === 'gradient'
      ? 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)'
      : style === 'surface'
      ? 'var(--surface-alt, #E8EFF7)'
      : 'var(--navy)'
  const txtColor = style === 'surface' ? 'var(--navy)' : '#fff'
  const tagBg = style === 'surface' ? 'var(--navy)' : 'rgba(255,255,255,0.94)'
  const tagColor = style === 'surface' ? '#fff' : 'var(--navy)'
  const border = style === 'surface' ? '1px solid var(--border)' : 'none'
  return (
    <div
      className="w-full h-full flex flex-col justify-between"
      style={{
        background: bgStyle,
        color: txtColor,
        border,
        padding: 'clamp(22px, 4vw, 36px)',
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          background: tagBg,
          color: tagColor,
          padding: '6px 10px',
          borderRadius: '4px',
          alignSelf: 'flex-start',
        }}
      >
        {tag}
      </span>
      <span
        className="font-display font-extrabold"
        style={{
          fontSize: 'clamp(24px, 3vw, 36px)',
          lineHeight: '1.05',
          letterSpacing: '-0.025em',
          maxWidth: '14ch',
        }}
      >
        {topic}
      </span>
    </div>
  )
}
