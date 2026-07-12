import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ReadingProgress from '@/components/blog/ReadingProgress'

// ─────────────────────────────────────────────────────────────────────────────
// Standalone English editorial for outreach (French-speaking Belgian and
// international prospects). This is deliberately NOT part of the Journal:
// the Journal is NL-only by decision, so this page lives on its own route,
// is not listed in data/articles.ts, the blog index or the journal feed.
// Visual structure mirrors the Journal editorial layout for consistency.
// English source: editorial 020 'wie-is-eigenaar-van-je-advertentiedata'.
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_PATH = '/who-owns-your-advertising-data'
const CANONICAL = `https://stevin.ai/en${PAGE_PATH}`
const PUBLISHED_AT = '2026-07-07'

const TITLE = 'Who owns your advertising data? Check it in two minutes'
const DESCRIPTION =
  'If an agency runs your ads, the accounts and the data they build up often sit in the agency’s name. Check who pays for your ads in the public ad libraries of Google, Meta, LinkedIn and TikTok, in two minutes, no login needed.'

export async function generateMetadata(): Promise<Metadata> {
  // Content is English on both locale variants of this route, so both
  // canonicalise to the /en URL: one indexable page, no duplicate signal.
  return {
    // De layout-template voegt al '| Stevin.AI' toe, dus hier geen merk-suffix.
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: CANONICAL,
      languages: { en: CANONICAL, 'x-default': CANONICAL },
    },
    openGraph: {
      type: 'article',
      url: CANONICAL,
      siteName: 'Stevin.AI',
      locale: 'en_GB',
      title: TITLE,
      description: DESCRIPTION,
      publishedTime: PUBLISHED_AT,
      images: [{ url: 'https://stevin.ai/en/opengraph-image', width: 1200, height: 630, alt: TITLE }],
    },
    twitter: {
      card: 'summary_large_image',
      title: TITLE,
      description: DESCRIPTION,
      images: ['https://stevin.ai/en/opengraph-image'],
    },
  }
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Your agency runs your ads. But who is training the AI on your data?',
  description: DESCRIPTION,
  datePublished: PUBLISHED_AT,
  dateModified: PUBLISHED_AT,
  inLanguage: 'en',
  author: { '@type': 'Organization', name: 'Stevin' },
  publisher: {
    '@type': 'Organization',
    name: 'Stevin',
    logo: { '@type': 'ImageObject', url: 'https://stevin.ai/icon.png' },
  },
  mainEntityOfPage: CANONICAL,
}

export default async function WhoOwnsYourAdvertisingDataPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgress />

      {/* ── ARTICLE HEADER (text-only, editorial) ── */}
      <header className="bg-[var(--navy)] text-white" style={{ padding: '64px 24px 56px' }}>
        <div className="mx-auto" style={{ maxWidth: '880px' }}>
          {/* Trail */}
          <nav
            className="flex items-center gap-3 mb-7"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            <Link
              href="/"
              className="text-white/55 hover:text-white transition-colors no-underline"
            >
              Stevin
            </Link>
            <span className="opacity-40">/</span>
            <span style={{ color: 'var(--accent-light)' }}>Data ownership</span>
          </nav>

          {/* H1 */}
          <h1
            className="font-display font-extrabold text-white m-0 mb-6"
            style={{
              fontSize: 'clamp(36px, 4.6vw, 60px)',
              lineHeight: '1.06',
              letterSpacing: '-0.03em',
              textWrap: 'balance',
              maxWidth: '22ch',
            }}
          >
            Your agency runs your ads. But who is training the AI on your data?
          </h1>

          {/* Dek */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '19px',
              lineHeight: '1.5',
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '56ch',
              margin: '0 0 32px',
              fontWeight: 300,
              textWrap: 'pretty' as const,
            }}
          >
            If your advertising runs through an agency, the accounts and the data they build up
            often sit in the agency&apos;s name, not yours. Now that AI learns from that data, you
            want to know who owns it. In two minutes you can check the public ad libraries of
            Google, Meta, LinkedIn, TikTok and more to see who pays for your ads.
          </p>

          {/* Byline */}
          <div
            className="flex items-center gap-3.5 pt-5 flex-wrap"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          >
            <span
              className="font-display"
              style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '-0.005em' }}
            >
              <strong className="font-extrabold">Stevin</strong>{' '}
              <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>· Editorial</span>
            </span>
            <div
              className="ml-auto flex gap-3.5"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              <span>JULY 7, 2026</span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.4)',
                  alignSelf: 'center',
                }}
              />
              <span>9 MIN READ</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <article className="bg-white" style={{ padding: '80px 24px 96px' }}>
        <div className="mx-auto journal-body" style={{ maxWidth: '680px' }}>
          <ArticleBody />
        </div>
      </article>

      {/* ── PRODUCT CTA ── */}
      <section className="bg-white" style={{ padding: '0 24px 80px' }}>
        <div className="mx-auto" style={{ maxWidth: '680px' }}>
          <div
            className="rounded-2xl"
            style={{
              background: 'var(--navy, #0A1628)',
              padding: '36px 32px',
            }}
          >
            <p
              className="m-0 mb-2"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              Stevin
            </p>
            <h3
              className="font-display font-bold text-white m-0"
              style={{ fontSize: '22px', lineHeight: 1.3, letterSpacing: '-0.015em' }}
            >
              Know what your campaigns are doing, while it happens
            </h3>
            <p
              className="m-0 mt-3"
              style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}
            >
              Stevin connects your advertising data, signals and results into your own marketing
              brain. Your data stays yours, and it works on the stack you already have. More at{' '}
              <a
                href="https://stevin.ai/en"
                style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}
              >
                stevin.ai
              </a>
              .
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center mt-6 px-6 py-3 font-semibold no-underline rounded-xl transition-colors"
              style={{ fontSize: '15px', background: 'var(--accent, #3D8EFF)', color: '#fff' }}
            >
              Book an intro call
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ArticleBody() {
  const extLink = {
    color: 'var(--accent)',
    fontWeight: 600,
    textDecoration: 'none',
  }
  return (
    <>
      <p className="lead-para">
        If your advertising runs through an external agency, there is a fair chance that the
        accounts, the pixels and the accumulated data are registered in that agency&apos;s name,
        not in yours. You pay for the media, but the memory (the data and the learning curve)
        builds up outside your company. That matters more now that marketing increasingly runs on
        AI: an AI layer can only make good decisions for you if it learns from your own data. If
        that data is not yours, you are not building a marketing brain of your own. Since the
        European Digital Services Act, Google, Meta, LinkedIn, TikTok and Microsoft publicly show
        who pays for an advertisement.{' '}
        <a href="#platforms" style={extLink}>
          In two minutes you can check the public ad library
        </a>{' '}
        to see whether that is your own name, or your agency&apos;s.
      </p>

      <Callout
        big="2 min"
        label={'That is how long it takes to look up who pays for your ads. Go to the platform’s ad library, type in your company name, open an ad and look at the field marked "Paid for by". No account needed, no cost.'}
      />

      <H2 num="01">Why can you publicly see who pays for your ads?</H2>

      <p>
        The European Digital Services Act requires large platforms to maintain a public ad
        repository. For every advertisement it shows who advertises, who pays, in which period the
        ad ran and in which countries. The obligation applies to ads shown to users in the
        European Union. A campaign that only runs outside the EU will not appear.
      </p>

      <p>
        The field that matters is usually called &quot;Paid for by&quot;. The platform fills it
        with the verified payer behind the advertisement. For a company that advertises itself, it
        shows the company&apos;s own name. For a company that advertises through an agency, it
        sometimes shows the name of that agency.
      </p>

      <H2 num="02" id="platforms">
        Where can you look it up?
      </H2>

      <p>
        The platforms where most companies advertise have a public library you can search without
        logging in. Click one of the four below, type in your company name and set the country to
        Belgium, the Netherlands, or wherever your ads run. Then check the payer field. The full
        list of libraries follows below.
      </p>

      <div
        style={{
          margin: '40px 0',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 24px',
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          The ad libraries
        </div>
        {[
          {
            logo: 'google-ads',
            alt: 'Google Ads',
            url: 'https://adstransparency.google.com',
            label: 'adstransparency.google.com',
            desc: (
              <>
                The Ads Transparency Center. Covers Search, YouTube, Display and Shopping. Field:
                &quot;Paid for by&quot;.
              </>
            ),
          },
          {
            logo: 'meta',
            alt: 'Meta',
            url: 'https://www.facebook.com/ads/library',
            label: 'facebook.com/ads/library',
            desc: (
              <>
                The Meta Ad Library, for Facebook and Instagram. Field: &quot;Advertiser and
                payer&quot;.
              </>
            ),
          },
          {
            logo: 'linkedin',
            alt: 'LinkedIn',
            url: 'https://www.linkedin.com/ad-library',
            label: 'linkedin.com/ad-library',
            desc: (
              <>
                The LinkedIn Ad Library, with all ads since June 2023. Field: &quot;Paid for
                by&quot;.
              </>
            ),
          },
          {
            logo: 'tiktok',
            alt: 'TikTok',
            url: 'https://library.tiktok.com/ads',
            label: 'library.tiktok.com/ads',
            desc: (
              <>
                The TikTok ad library for the EU. Field: &quot;Ad paid for by&quot;.
              </>
            ),
          },
        ].map((p, i) => (
          <div
            key={p.logo}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '20px 24px',
              borderTop: i === 0 ? 'none' : '1px solid var(--border)',
            }}
          >
            <span style={{ width: '104px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/tools/${p.logo}.svg`}
                alt={p.alt}
                style={{ height: '26px', width: 'auto', maxWidth: '104px' }}
              />
            </span>
            <span style={{ fontSize: '15px', lineHeight: 1.5 }}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" style={extLink}>
                {p.label}
              </a>{' '}
              {p.desc}
            </span>
          </div>
        ))}
      </div>

      <p>
        The Digital Services Act requires every designated very large platform and search engine
        to keep such a public ad repository. The European Commission maintains the{' '}
        <a
          href="https://digital-strategy.ec.europa.eu/en/policies/list-designated-vlops-and-slops"
          target="_blank"
          rel="noopener noreferrer"
          style={extLink}
        >
          current list
        </a>
        . Beyond the four above, these are the other places you can search. Quality varies: some
        only work through an API, only show EU ads, or load slowly.
      </p>

      <p style={{ marginBottom: '8px' }}>
        <b>Ad platforms</b>
      </p>
      <ul style={{ margin: '0 0 24px', paddingLeft: '20px', lineHeight: 1.55 }}>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://ads.twitter.com/ads-repository"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            X Ads Repository
          </a>{' '}
          EU ads with advertiser, funding party, targeting, impressions and reach.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://adlibrary.ads.microsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            Microsoft Ad Library
          </a>{' '}
          Search ads on Bing in the EU and EEA.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://ads.pinterest.com/ads-repository/"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            Pinterest Ads Repository
          </a>{' '}
          EU ads, public but heavily dependent on JavaScript.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://adsgallery.snap.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            Snap Ads Gallery
          </a>{' '}
          EU ads from the last twelve months.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://adrepository.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            Apple App Store Ad Repository
          </a>{' '}
          Ads shown in the App Store in EU countries.
        </li>
      </ul>

      <p style={{ marginBottom: '8px' }}>
        <b>Marketplaces and retail media</b>
      </p>
      <ul style={{ margin: '0 0 8px', paddingLeft: '20px', lineHeight: 1.55 }}>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://www.booking.com/ad-repository.html"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            Booking.com Ad Repository
          </a>{' '}
          Ads shown on Booking.com in Europe.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://www.amazon.de/adlibrary"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            Amazon EU Store Ad Library
          </a>{' '}
          Ads and affiliate content from the past year. Runs through Amazon.de and can load
          slowly.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://www.aliexpress.com/p/ad-search-page/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            AliExpress
          </a>{' '}
          Designated as a very large platform under the DSA.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="https://www.zalando.nl/ads-repository/"
            target="_blank"
            rel="noopener noreferrer"
            style={extLink}
          >
            Zalando Ads Repository
          </a>{' '}
          Public repository, also reachable through the local stores.
        </li>
      </ul>

      <H2 num="03">How do you look it up, step by step?</H2>

      <Takeaways
        label="IN FOUR STEPS"
        title="Finding the payer yourself"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>Open the platform&apos;s ad library.</b> No login or account needed. It works in
                any browser, including on your phone.
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>Type your own company name in the search bar.</b> If several entities or
                locations appear, pick the right one. Set the country to where your ads run.
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Open one of your active ads.</b> Click the ad, or the menu next to it, to see
                the details.
              </>
            ),
          },
          {
            pct: '04',
            text: (
              <>
                <b>Look at the payer field.</b> Does it show your own company name, or someone
                else&apos;s?
              </>
            ),
          },
        ]}
      />

      <p>
        If you first want to see what it looks like without your own numbers involved, search for
        a large brand you know, a national retailer for example. You will see their running ads,
        and the payer field shows their own name. That is how it should be: the brand that
        advertises is also the payer. The question is whether the same is true for you.
      </p>

      <H2 num="04">What does it mean if the payer is your agency?</H2>

      <p>
        If the payer field shows your agency&apos;s name, your ads run in that agency&apos;s ad
        account, not in yours. That is not wrong by definition. Many agencies work this way, and
        for some clients it is perfectly fine. But it has consequences you rarely see yourself.
      </p>

      <Takeaways
        label="THE CONSEQUENCES"
        title="What it means when your agency is the payer"
        items={[
          {
            pct: 'DATA',
            text: (
              <>
                <b>The history lives in their account.</b> The accumulated campaign data and
                learning curve are registered to the agency. If you switch agencies or launch a
                new website, you often start from scratch.
              </>
            ),
          },
          {
            pct: 'ALGO',
            text: (
              <>
                <b>The algorithm learns at account level.</b> The platforms optimise within the
                account where the campaigns run. That learning curve does not move with you when
                you leave.
              </>
            ),
          },
          {
            pct: 'KPI',
            text: (
              <>
                <b>Whoever manages the data decides what you measure.</b> For reporting you depend
                on what the agency shares from their account. Connecting ad results to your own
                revenue and customer value becomes difficult.
              </>
            ),
          },
          {
            pct: 'AI',
            text: (
              <>
                <b>Your own AI cannot learn from it.</b> An AI layer needs your spend, leads,
                margin and customer value, connected. If that data stays in your agency&apos;s
                account, a system that learns for you cannot reach it.
              </>
            ),
          },
        ]}
      />

      <p>
        This is not proof that anything is wrong. It is the start of a conversation. The only way
        to know for sure how things are set up for you is to ask your agency.
      </p>

      <H2 num="05">What does a healthy setup look like?</H2>

      <p>
        The clean route is simple: you own the accounts, the agency gets access. Not the other way
        around. Both Google and Meta have built this in.
      </p>

      <p>
        At Google, an agency can manage your account through a manager account (MCC). The owner of
        that manager account has full access, including personal data attached to the account. The
        client account remains the owner of its data and can break the link at any time. Make sure
        your company owns the account and the agency is linked as a manager.
      </p>

      <p>
        At Meta, it works through partner access in your own Business Portfolio. You assign the
        agency specific assets, such as your ad account, page and pixel, without the agency
        becoming their owner. According to Meta, your Business Portfolio remains the owner of the
        assets, even while the agency manages them.
      </p>

      <Takeaways
        label="THE RIGHT SETUP"
        title="You own it, the agency gets access"
        items={[
          {
            pct: 'YOU',
            text: (
              <>
                <b>Registered to your company.</b> Ad accounts, Meta Business Portfolio, pixel and
                conversions API, GA4, Tag Manager, Merchant Center and your CRM. This is your
                property.
              </>
            ),
          },
          {
            pct: 'THEM',
            text: (
              <>
                <b>The agency gets access.</b> Through manager access at Google or partner access
                at Meta. They manage, you own. If the relationship ends, you revoke the access and
                keep the history.
              </>
            ),
          },
          {
            pct: 'BILL',
            text: (
              <>
                <b>Billing on your own payment method.</b> That way you keep sight of the real
                media cost, and your spend is not hidden inside an agency account.
              </>
            ),
          },
        ]}
      />

      <H2 num="06">What does this mean for your AI position?</H2>

      <p>
        Marketing is shifting to AI. The ad platforms push in that direction themselves: Google
        and Meta optimise on the data inside the account where your campaigns run. And more and
        more companies build their own AI layer on top of their marketing, to steer on revenue and
        customer value instead of clicks.
      </p>

      <p>
        Both depend on data. Whoever owns their own data can feed that AI and carry the advantage
        forward. Whoever leaves the data with the agency starts over after a switch, or stays
        dependent on what the agency chooses to share. The advantage is cumulative: every month of
        your own data makes a model better and a benchmark sharper. That time cannot be bought
        back later.
      </p>

      <p>
        None of this is a reason to cancel your agency contract tomorrow. It is a reason to make
        sure, today, that the accounts and the data belong to you. Then the choice stays yours,
        not with the account your campaigns happen to run in.
      </p>

      <H2 num="07">Which questions do you ask your agency?</H2>

      <p>
        Three questions are enough to know where you stand. They are reasonable questions, and a
        good agency answers them without hesitation.
      </p>

      <Takeaways
        label="THE CONVERSATION"
        title="Three questions for your agency"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>In whose name are the accounts and the pixel?</b> Are they registered to our
                company or to yours, and can we get admin access?
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>What happens if we stop working together?</b> Do we keep the accumulated
                history and the data, or does it stay with you?
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Where does our lead data end up?</b> Is there a data processing agreement, and
                do we know which systems handle our customer data?
              </>
            ),
          },
        ]}
      />

      <p>
        The point is not that agencies are untrustworthy. The point is that ownership of your own
        marketing data should be a choice you make deliberately, not something that happens to you
        because you never looked at that one field. Two minutes in the ad library, and you know
        where you stand.
      </p>

      <EndRule />
      <EndSig>&quot;Wonder en is gheen wonder.&quot; · Stevin</EndSig>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Editorial atoms (local copies of the Journal atoms, which are
   private to app/[locale]/blog/[slug]/page.tsx)
   ──────────────────────────────────────────────────────────── */
function H2({ num, children, id }: { num: string; children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} style={id ? { scrollMarginTop: '90px' } : undefined}>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--accent)',
          display: 'block',
          marginBottom: '8px',
          letterSpacing: '0.04em',
        }}
      >
        {num}
      </span>
      {children}
    </h2>
  )
}

function Takeaways({
  label,
  title,
  items,
}: {
  label: string
  title: string
  items: { pct: string; text: React.ReactNode }[]
}) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        color: '#fff',
        borderRadius: '14px',
        padding: '32px 36px',
        margin: '48px 0',
      }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--neon)',
          margin: '0 0 14px',
        }}
      >
        {label}
      </p>
      <h3
        className="font-display"
        style={{
          fontWeight: 700,
          fontSize: '22px',
          letterSpacing: '-0.015em',
          color: '#fff',
          margin: '0 0 24px',
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li
            key={i}
            className="grid items-baseline"
            style={{
              gridTemplateColumns: '88px 1fr',
              gap: '24px',
              padding: '18px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span
              className="font-display font-bold"
              style={{
                fontSize: '28px',
                letterSpacing: '-0.02em',
                color: 'var(--neon)',
                lineHeight: 1,
              }}
            >
              {item.pct}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: '1.55',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Callout({ big, label }: { big: string; label: string }) {
  return (
    <div
      className="grid items-center"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '32px',
        margin: '40px 0',
        gridTemplateColumns: '120px 1fr',
        gap: '28px',
      }}
    >
      <div
        className="font-display font-extrabold"
        style={{
          fontSize: '56px',
          lineHeight: 1,
          color: 'var(--accent)',
          letterSpacing: '-0.04em',
        }}
      >
        {big}
      </div>
      <p
        className="font-display"
        style={{
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '1.45',
          color: 'var(--navy)',
          margin: 0,
        }}
      >
        {label}
      </p>
    </div>
  )
}

function EndRule() {
  return (
    <div
      className="flex gap-1 items-center"
      style={{
        margin: '48px 0 32px',
        color: 'var(--accent)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      <span style={{ padding: '0 14px', color: 'var(--muted)' }}>•••</span>
      <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )
}

function EndSig({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'italic',
        fontSize: '14px',
        color: 'var(--muted)',
        textAlign: 'center',
        margin: '0 0 56px',
      }}
    >
      {children}
    </p>
  )
}
