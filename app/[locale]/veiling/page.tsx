import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Bied op een website voor jouw bedrijf of vereniging',
  description: 'Stevin veilt een website voor het schoolreisje. Maximaal vijf pagina’s, een revisieronde en een jaar hosting. Bekijk twee fictieve voorbeelden.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://stevin.ai/veiling' },
  openGraph: {
    title: 'Jij een nieuwe website. De kinderen op schoolreisje.',
    description: 'Bied op een website van Stevin. Inclusief een jaar hosting. Bekijk de twee voorbeelden.',
    url: 'https://stevin.ai/veiling',
  },
}

const css = `
.auction{--ink:#0A1628;--blue:#3D8EFF;--paper:#F7F9FC;background:var(--paper);color:var(--ink);font-family:var(--font-body-inter),Arial,sans-serif;line-height:1.6}
.auction *{box-sizing:border-box}.auction a{color:inherit}.auction a:focus-visible,.auction summary:focus-visible{outline:3px solid var(--blue);outline-offset:5px}.auction .wrap{max-width:1160px;margin:auto;padding:0 24px}.auction .hero{background:var(--ink);color:white;padding:80px 0 70px}.auction .eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin:0 0 22px}.auction h1{font-family:var(--font-display-inter),Arial,sans-serif;font-size:clamp(40px,6.5vw,82px);line-height:1.04;letter-spacing:-.045em;max-width:940px;margin:0 0 28px;font-weight:800}.auction h1 span{color:var(--blue)}.auction .intro{font-size:20px;max-width:640px;color:#d6dfed}.auction .button{display:inline-block;background:var(--blue);color:var(--ink);padding:14px 22px;border-radius:6px;text-decoration:none;font-weight:700}.auction .button:hover{filter:brightness(1.08)}.auction .facts{display:flex;flex-wrap:wrap;gap:14px 30px;padding-top:34px;color:#d6dfed;font-size:14px}.auction .section{padding:68px 0}.auction h2{font-size:clamp(28px,4vw,42px);line-height:1.15;letter-spacing:-.03em;margin:0 0 18px;font-weight:700}.auction .lede{max-width:690px;color:#526176;margin-bottom:30px}.auction .examples{display:grid;grid-template-columns:1fr 1fr;gap:24px}.auction details{background:white;border:1px solid #d8e1ed;border-radius:12px;overflow:hidden;align-self:start}.auction summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:20px;padding:24px}.auction summary::-webkit-details-marker{display:none}.auction summary:after{content:'+';font-size:26px;line-height:1}.auction details[open] summary:after{content:'−'}.auction summary h3{font-size:20px;margin:0;font-weight:700}.auction summary p{font-size:13px;color:#526176;margin:5px 0 0}.auction .demo{margin:0 14px 14px;border:1px solid #d8e1ed;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif}.auction .demo-bar{padding:8px 16px;background:#edf1f6;font-size:11px;color:#526176}.auction .demo-nav{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;font-size:12px;gap:15px}.auction .demo-nav b{font-size:18px}.auction .demo-nav a{text-decoration:underline;text-underline-offset:4px}.auction .demo-hero{padding:38px 24px}.auction .demo h4{font-size:clamp(30px,3.5vw,43px);line-height:1.08;letter-spacing:-.04em;margin:14px 0;font-weight:700}.auction .demo p{font-size:14px}.auction .demo-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.auction .demo-link{display:inline-block;font-size:12px;font-weight:700;text-decoration:none;padding:11px 15px;margin:14px 0}.auction .services{padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:18px}.auction .services b{font-size:14px}.auction .services p{font-size:12px;margin:6px 0}.auction .demo-bottom{padding:24px;border-top:1px solid #0002}.auction .demo-bottom h5{font-size:21px;line-height:1.2;margin:0 0 10px;font-weight:700}.auction .demo-bottom p{font-size:13px}.auction .garden{background:#f3f0e8;color:#233d2e}.auction .garden .demo-nav{background:#f3f0e8}.auction .garden .demo-hero{background:#dce5d2}.auction .garden .demo-link{background:#233d2e;color:white}.auction .club{background:#fffcf6;color:#312717}.auction .club .demo-hero{background:#f8cc59}.auction .club .demo-link{background:#312717;color:white}.auction .club .demo-nav{background:#fffcf6}.auction .demo-art{width:100%;height:112px;display:block;margin-top:24px}.auction .fine{color:#526176;font-size:13px}.auction .scope{display:grid;grid-template-columns:1fr 1fr;gap:48px;border-top:1px solid #d8e1ed;padding-top:44px}.auction .scope h3{font-size:23px;font-weight:700;margin:0 0 16px}.auction .scope ul{padding-left:20px;margin:0}.auction .scope li{padding-bottom:12px}.auction .scope li::marker{color:#2673d8}.auction .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:30px}.auction .step{border-top:2px solid var(--blue);padding-top:16px}.auction .step b{font-size:18px}.auction .step p{font-size:15px;color:#526176}.auction .closing{padding:48px 0;background:#e7eef8}.auction .closing p{max-width:680px}.auction section[id],.auction div[id]{scroll-margin-top:100px}@media(max-width:720px){.auction .hero{padding:48px 0}.auction .section{padding:44px 0}.auction .examples,.auction .scope,.auction .steps{grid-template-columns:1fr}.auction .scope{gap:28px}.auction .wrap{padding:0 20px}.auction .intro{font-size:18px}.auction .demo h4{font-size:36px}.auction .demo-nav{padding:16px}.auction .facts{gap:10px 20px}}
`

function GardenExample() {
  return (
    <div className="demo garden" aria-label="Fictief voorbeeld voor een hoveniersbedrijf">
      <div className="demo-bar">Fictief voorbeeld · Bedrijf</div>
      <div className="demo-nav"><b>Buitenwerk.</b><a href="#tuin-diensten">Wat we doen</a></div>
      <div className="demo-hero">
        <span className="demo-label">Hovenier voor jouw tuin</span>
        <h4>Meer buiten.<br />Minder moeten.</h4>
        <p>Een tuin om in te zitten, te spelen en tot rust te komen. We helpen je met het ontwerp, de aanleg en het onderhoud.</p>
        <a className="demo-link" href="#tuin-contact">Vertel over je tuin</a>
        <svg className="demo-art" viewBox="0 0 420 112" role="img" aria-label="Illustratie van een tuin met bomen en een terras">
          <rect width="420" height="112" fill="#dce5d2" /><path d="M0 82 Q100 20 220 80 T420 55 V112 H0Z" fill="#a5bb92" /><path d="M200 112 L265 60 H320 L290 112" fill="#eee4cc" /><path d="M62 96 V30 M114 94 V43 M356 96 V26" stroke="#486348" strokeWidth="5" /><circle cx="62" cy="29" r="27" fill="#436947" /><circle cx="114" cy="43" r="20" fill="#66885b" /><circle cx="356" cy="27" r="25" fill="#436947" />
        </svg>
      </div>
      <div className="services" id="tuin-diensten">
        <div><b>Van plan naar tuin</b><p>We bekijken je wensen en maken een plan voor de aanleg.</p></div>
        <div><b>Het hele jaar verzorgd</b><p>Snoeien, planten en onderhoud dat past bij het seizoen.</p></div>
      </div>
      <div className="demo-bottom" id="tuin-contact"><h5>Wat wil jij met je tuin?</h5><p>Hier kan een bezoeker contact opnemen voor een kennismaking.</p><p className="fine">Dit is een ontwerpvoorbeeld. Er wordt geen aanvraag verstuurd.</p></div>
    </div>
  )
}

function ClubExample() {
  return (
    <div className="demo club" aria-label="Fictief voorbeeld voor een vereniging">
      <div className="demo-bar">Fictief voorbeeld · Vereniging</div>
      <div className="demo-nav"><b>De Buurtmakers</b><a href="#club-agenda">De agenda</a></div>
      <div className="demo-hero">
        <span className="demo-label">Voor iedereen uit de buurt</span>
        <h4>Een goede buurt<br />maak je samen.</h4>
        <p>Koffie met de buren, een middag voor de kinderen of samen iets organiseren. Bij De Buurtmakers kun je meedoen.</p>
        <a className="demo-link" href="#club-meedoen">Ontdek hoe je meedoet</a>
        <svg className="demo-art" viewBox="0 0 420 112" role="img" aria-label="Illustratie van gekleurde huizen in een buurt">
          <rect width="420" height="112" fill="#f8cc59" /><path d="M30 54 L76 18 L122 54 V112 H30Z" fill="#e77551" /><path d="M150 42 L197 4 L244 42 V112 H150Z" fill="#f6f0dc" /><path d="M273 58 L319 22 L365 58 V112 H273Z" fill="#618c77" /><path d="M62 112 V78 H91 V112 M183 112 V75 H211 V112 M305 112 V82 H334 V112" fill="#312717" /><path d="M51 60 H67 V76 H51Z M91 60 H107 V76 H91Z M170 46 H186 V62 H170Z M210 46 H226 V62 H210Z M291 63 H307 V79 H291Z M334 63 H350 V79 H334Z" fill="#f8cc59" />
        </svg>
      </div>
      <div className="services" id="club-agenda">
        <div><b>Koffie op zondagochtend</b><p>Even bijpraten en nieuwe buurtgenoten leren kennen.</p></div>
        <div><b>Samen aan de slag</b><p>Van een spelletjesmiddag tot meer groen in de straat.</p></div>
      </div>
      <div className="demo-bottom" id="club-meedoen"><h5>Jouw idee is welkom.</h5><p>Hier kunnen bezoekers lid worden of vragen hoe ze kunnen helpen.</p><p className="fine">Dit is een ontwerpvoorbeeld. Je kunt je hier niet aanmelden.</p></div>
    </div>
  )
}

export default async function VeilingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="auction">
      <style>{css}</style>
      <section className="hero" aria-labelledby="veiling-titel">
        <div className="wrap">
          <p className="eyebrow">Stevin voor het schoolreisje</p>
          <h1 id="veiling-titel">Jij een nieuwe website.<br /><span>De kinderen op schoolreisje.</span></h1>
          <p className="intro">Staat jouw bedrijf, startup of vereniging nog steeds op dat ene lijstje? Tussen de administratie en die lamp die je nog moet ophangen?</p>
          <p className="intro">Bied op een website van Stevin. Dan kun je straks iets van je lijstje afstrepen en help je het schoolreisje mogelijk maken.</p>
          <a className="button" href="#voorbeelden">Bekijk de twee voorbeelden</a>
          <div className="facts"><span>Maximaal 5 pagina’s</span><span>1 revisieronde</span><span>1 jaar hosting</span></div>
        </div>
      </section>
      <section className="section" id="voorbeelden" aria-labelledby="voorbeelden-titel">
        <div className="wrap">
          <p className="eyebrow">Wat kun je verwachten?</p>
          <h2 id="voorbeelden-titel">Twee voorbeelden. Jouw eigen verhaal.</h2>
          <p className="lede">Een bedrijf heeft iets anders te vertellen dan een vereniging. Hieronder zie je twee fictieve ontwerpen. De website voor de winnaar stemmen we af op diens eigen naam, aanbod en uitstraling.</p>
          <div className="examples">
            <details open><summary><div><h3>Voor je bedrijf of startup</h3><p>Laat zien wat je doet en maak contact makkelijk.</p></div></summary><GardenExample /></details>
            <details open><summary><div><h3>Voor je vereniging</h3><p>Breng activiteiten, leden en vrijwilligers samen.</p></div></summary><ClubExample /></details>
          </div>
          <p className="fine">De namen en inhoud zijn verzonnen. Deze voorbeelden laten de stijl en opbouw zien. Het zijn geen bestaande klanten of volledige websites.</p>
        </div>
      </section>
      <section className="section" aria-labelledby="pakket-titel">
        <div className="wrap">
          <h2 id="pakket-titel">Dit zit in het veilingpakket.</h2>
          <div className="scope">
            <div><h3>Wat Stevin maakt</h3><ul>
              <li>Een informatieve website met maximaal vijf pagina’s. Bijvoorbeeld home, over ons, aanbod, veelgestelde vragen en contact.</li>
              <li>Een ontwerp dat werkt op je telefoon, tablet en computer.</li>
              <li>Eén revisieronde. Je geeft je feedback in één keer door. Wij verwerken die binnen de afgesproken opzet.</li>
              <li>Eén jaar hosting vanaf de oplevering.</li>
            </ul></div>
            <div><h3>Wat we vooraf afspreken</h3><ul>
              <li>Jij levert de teksten, het logo en de foto’s aan die je wilt gebruiken.</li>
              <li>We spreken samen de inhoud en planning af voordat we beginnen.</li>
              <li>Een webshop, betalingen, een boekingssysteem of andere maatwerkfuncties vallen buiten dit pakket.</li>
              <li>We spreken vooraf af hoe we je domeinnaam regelen en wat hosting na het eerste jaar kost. Extra werk voeren we alleen uit na overleg.</li>
            </ul></div>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="werkwijze-titel">
        <div className="wrap">
          <h2 id="werkwijze-titel">Het hoogste bod? Dan gaan we aan de slag.</h2>
          <div className="steps">
            <div className="step"><b>01. Even kennismaken</b><p>Wat doe je, voor wie is je website en wat moeten bezoekers kunnen vinden?</p></div>
            <div className="step"><b>02. Bouwen en bekijken</b><p>Met jouw materiaal maken we de website. Jij bekijkt het eerste voorstel en verzamelt je feedback.</p></div>
            <div className="step"><b>03. Aanpassen en online</b><p>We verwerken je revisieronde en zetten de website na jouw akkoord online.</p></div>
          </div>
        </div>
      </section>
      <section className="closing" aria-labelledby="bieden-titel"><div className="wrap">
        <h2 id="bieden-titel">Iets voor jou? Bied mee via de schoolveiling.</h2>
        <p>Op deze pagina zie je wat Stevin aanbiedt. Je bod breng je uit bij de schoolveiling.</p>
        <p>Een vraag over het pakket? <a href="mailto:koen@stevin.ai?subject=Vraag%20over%20de%20websiteveiling">Mail Koen op koen@stevin.ai</a>.</p>
      </div></section>
    </div>
  )
}
