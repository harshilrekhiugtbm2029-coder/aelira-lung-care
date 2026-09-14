import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  HeartPulse,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Stethoscope,
  Wind,
  X,
} from "lucide-react";

const logoUrl = `${import.meta.env.BASE_URL}aelira-logo-v2.png`;
const phone = "+919667117222";
const whatsapp = "https://wa.me/919667117222";

const diagnostics = [
  {
    id: "pft",
    short: "01",
    label: "PFT + DLCO",
    title: "Measure how your lungs move air — and oxygen.",
    body: "Comprehensive pulmonary function testing for airflow, lung volumes and gas exchange. Detailed interpretation, same-day reporting.",
    meta: "15–60 min · Same-day reports",
    accent: "sage",
  },
  {
    id: "fot",
    short: "02",
    label: "FOT / OSCILLOMETRY",
    title: "Small airway insight, without the hard blowing.",
    body: "An effortless sound-wave test for children, older adults, smokers and anyone who cannot perform traditional spirometry.",
    meta: "Up to 10 min · Normal breathing",
    accent: "deep",
  },
  {
    id: "feno",
    short: "03",
    label: "FeNO",
    title: "See airway inflammation before it gets louder.",
    body: "A quick, non-invasive breath test that helps clinicians understand allergic inflammation, asthma control and treatment response.",
    meta: "2–5 min · Immediate results",
    accent: "mint",
  },
];

const conditions = [
  "Asthma",
  "COPD",
  "Interstitial lung disease",
  "Post-COVID breathlessness",
  "Bronchiectasis",
  "Chronic cough",
];

function BreathingLungs() {
  return (
    <div className="lung-study" aria-label="Animated lung study showing Aelira's breathing care approach" role="img">
      <div className="lung-study__field" />
      <div className="lung-study__orbit lung-study__orbit--outer" />
      <div className="lung-study__orbit lung-study__orbit--inner" />
      <div className="lung-study__scanline" />
      <img className="lung-study__image" src={`${import.meta.env.BASE_URL}aelira-lungs-feathered.png`} alt="" />
      <div className="lung-study__dot lung-study__dot--one" />
      <div className="lung-study__dot lung-study__dot--two" />
      <div className="lung-study__axis"><span>R</span><i /><span>L</span></div>
      <div className="study-card study-card--flow"><span>01 / PFT + DLCO</span><strong>PFT + DLCO</strong><small>flow + gas transfer</small></div>
      <div className="study-card study-card--air"><span>02 / FOT TEST</span><strong>FOT / oscillometry</strong><small>small airway scan</small></div>
      <div className="study-card study-card--care"><span>03 / FeNO</span><strong>FeNO</strong><small>airway inflammation</small></div>
      <div className="lung-study__footnote"><span className="readout-dot" /> Aelira / Green Park / 28° 33′ N</div>
    </div>
  );
}

const diagnosticWavePaths: Record<string, string> = {
  pft: "M0 39H44C63 39 70 38 88 38L108 38L123 38L137 12L151 62L166 33L181 39H221C245 39 251 37 267 37L286 37L301 15L315 58L328 34L343 39H420",
  fot: "M0 40C34 40 36 24 62 24S92 56 121 56S154 18 184 18S214 60 244 60S274 27 300 27S329 51 354 51S384 35 420 35",
  feno: "M0 40C26 40 37 40 57 40C78 40 87 22 107 22C126 22 137 59 157 59C177 59 188 40 207 40C226 40 237 31 256 31C275 31 286 49 305 49C324 49 342 40 360 40H420",
};

const detailWavePaths: Record<string, string> = {
  pft: "M0 122C27 122 30 119 53 119S77 109 95 107C117 104 123 149 144 149C165 149 165 74 183 74C202 74 203 130 226 130C248 130 245 53 266 53C286 53 285 117 307 117C330 117 328 90 346 90C367 90 369 121 420 121",
  fot: "M0 130C33 130 31 91 68 91S101 153 139 153S172 55 208 55S243 126 279 126S312 80 349 80S382 111 420 111",
  feno: "M0 126C28 126 45 126 66 126S96 78 122 78S151 145 178 145S204 110 230 110S259 64 286 64S313 121 341 121S376 96 420 96",
};

const diagnosticGraphicLabels: Record<string, [string, string, string]> = {
  pft: ["flow", "volume", "gas transfer"],
  fot: ["resistance", "reactance", "frequency"],
  feno: ["NO", "airway", "inflammation"],
};

function PulseLine({ mode = "pft" }: { mode?: string }) {
  return (
    <svg className={`pulse-line pulse-line--${mode}`} viewBox="0 0 420 72" preserveAspectRatio="none" aria-hidden="true">
      <path d={diagnosticWavePaths[mode] ?? diagnosticWavePaths.pft} />
    </svg>
  );
}

function BreathMeter() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const phases: Array<"inhale" | "hold" | "exhale"> = ["inhale", "hold", "exhale"];
    const timer = window.setInterval(() => {
      setPhase((current) => phases[(phases.indexOf(current) + 1) % phases.length]);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [running]);

  const copy = {
    inhale: "Breathe in",
    hold: "Stay soft",
    exhale: "Let it go",
  }[phase];

  return (
    <div className="breath-meter">
      <div className={`breath-orb breath-orb--${phase}`}>
        <div className="breath-orb__inner">
          <span>{copy}</span>
          <strong>{phase === "hold" ? "4" : "4s"}</strong>
        </div>
      </div>
      <div className="breath-meter__details">
        <div className="eyebrow">A 4–4 reset</div>
        <h3>Give your breath a little room.</h3>
        <p>Follow the circle for one quiet minute. A small reminder that breathing can be trained.</p>
        <button className="text-button" onClick={() => setRunning((value) => !value)} type="button">
          <span>{running ? "Pause rhythm" : "Start rhythm"}</span>
          {running ? <span className="pause-icon" aria-hidden="true">Ⅱ</span> : <ArrowUpRight size={16} />}
        </button>
      </div>
      <div className="breath-meter__ticks" aria-hidden="true">
        <span className={phase === "inhale" ? "is-active" : ""}>IN</span>
        <span className={phase === "hold" ? "is-active" : ""}>HOLD</span>
        <span className={phase === "exhale" ? "is-active" : ""}>OUT</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeDiagnostic, setActiveDiagnostic] = useState("pft");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = diagnostics.find((item) => item.id === activeDiagnostic) ?? diagnostics[0];

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header ${menuOpen ? "site-header--open" : ""}`}>
        <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="Aelira Lung Care home">
          <img src={logoUrl} alt="Aelira Lung Care" />
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#care" onClick={closeMenu}>Care paths</a>
          <a href="#diagnostics" onClick={closeMenu}>Diagnostics</a>
          <a href="#rehab" onClick={closeMenu}>Rehab</a>
          <a href="#visit" onClick={closeMenu}>Visit us</a>
        </nav>
        <div className="header-actions">
          <a className="header-call" href={`tel:${phone}`} aria-label="Call Aelira Lung Care">
            <Phone size={15} />
            <span>+91 966 711 7222</span>
          </a>
          <a className="button button--small button--dark" href="#book" onClick={closeMenu}>Book assessment <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="announcement-bar"><span className="announcement-pulse" /> Lung care for adults, children and everyone in between <span className="announcement-separator">·</span> Green Park, New Delhi</div>

      <section className="hero hero--light" id="top">
        <div className="hero-grid" />
        <div className="hero-copy" id="main-content">
          <div className="eyebrow" data-reveal><span className="eyebrow-mark">01</span> Lung health, made personal</div>
          <h1 data-reveal><span>Care that</span><em>changes how</em><strong>you breathe.</strong></h1>
          <p className="hero-intro" data-reveal>Specialist lung diagnostics and pulmonary rehabilitation for people who want clearer answers — and more room for life.</p>
          <div className="hero-actions" data-reveal>
            <a className="button button--dark" href="#book">Start your lung check <ArrowUpRight size={17} /></a>
            <a className="button button--ghost-dark" href="#care">See how we care <ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-footnote" data-reveal><span className="hero-footnote__line" /> One centre for tests, insight and the next breath.</div>
        </div>
        <div className="hero-visual" data-reveal>
          <BreathingLungs />
        </div>
        <div className="hero-scroll hero-scroll--dark">Scroll to explore <ArrowDownRight size={15} /></div>
      </section>

      <section className="marquee" aria-label="Aelira services">
        <div className="marquee-track"><span>LUNG HEALTH</span><i>✳</i><span>CLINICAL CLARITY</span><i>✳</i><span>BETTER BREATHING</span><i>✳</i><span>LUNG HEALTH</span><i>✳</i><span>CLINICAL CLARITY</span><i>✳</i><span>BETTER BREATHING</span><i>✳</i></div>
      </section>

      <section className="intro-section section-pad" id="care">
        <div className="section-index" data-reveal>02 <span>Why Aelira</span></div>
        <div className="intro-layout">
          <div className="intro-lead" data-reveal>
            <p className="eyebrow">One roof. A clearer picture.</p>
            <h2>Lungs don’t just breathe.<br /><em>They shape how you live.</em></h2>
          </div>
          <div className="intro-copy" data-reveal>
            <p>From a first unexplained cough to long-term respiratory care, Aelira brings specialist consultations, advanced testing and pulmonary rehabilitation together in one calm, coordinated place.</p>
            <a className="inline-link" href="#diagnostics">See how we can help <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="principle-grid" data-reveal>
          <div className="principle-card"><span className="principle-number">01</span><Activity size={25} strokeWidth={1.5} /><h3>Measure properly</h3><p>More than a pulse oximeter. We look at the full mechanics of your breathing.</p></div>
          <div className="principle-card"><span className="principle-number">02</span><HeartPulse size={25} strokeWidth={1.5} /><h3>Make it personal</h3><p>Your results, symptoms and everyday life belong in the same conversation.</p></div>
          <div className="principle-card"><span className="principle-number">03</span><Wind size={25} strokeWidth={1.5} /><h3>Move forward</h3><p>Care that helps you understand your lungs — and use them with confidence.</p></div>
        </div>
      </section>

      <section className="diagnostics-section section-pad" id="diagnostics">
        <div className="section-index section-index--light" data-reveal>03 <span>Diagnostics</span></div>
        <div className="diagnostics-heading" data-reveal>
          <div><p className="eyebrow eyebrow--light">The breath check</p><h2>Less guessing.<br /><em>More knowing.</em></h2></div>
          <div className="heading-sidecopy"><PulseLine mode={activeDiagnostic} /><p>Advanced lung tests for adults, children, athletes, smokers, post-COVID recovery and anyone who wants a clearer baseline.</p></div>
        </div>
        <div className="diagnostics-workbench" data-reveal>
          <div className="diagnostics-list" role="tablist" aria-label="Diagnostic tests">
            {diagnostics.map((item) => (
              <button key={item.id} className={`diagnostic-tab ${activeDiagnostic === item.id ? "is-active" : ""}`} type="button" role="tab" aria-selected={activeDiagnostic === item.id} onClick={() => setActiveDiagnostic(item.id)}>
                <span className="diagnostic-tab__num">{item.short}</span><span>{item.label}</span><ArrowUpRight size={18} />
              </button>
            ))}
            <div className="diagnostics-list__foot"><span>All tests are clinically interpreted.</span><Check size={16} /></div>
          </div>
          <div className={`diagnostic-detail diagnostic-detail--${active.accent}`} role="tabpanel">
            <div className="diagnostic-detail__top"><span>{active.short} / {active.label}</span><span className="detail-status"><i /> Available in Green Park</span></div>
            <div className="diagnostic-detail__body"><h3>{active.title}</h3><p>{active.body}</p><div className="diagnostic-meta"><span>{active.meta}</span><a href="#book">Book this test <ArrowUpRight size={15} /></a></div></div>
            <div className="diagnostic-detail__graphic"><div className="graphic-grid" /><span className="graphic-label graphic-label--one">{diagnosticGraphicLabels[active.id][0]}</span><span className="graphic-label graphic-label--two">{diagnosticGraphicLabels[active.id][1]}</span><span className="graphic-label graphic-label--three">{diagnosticGraphicLabels[active.id][2]}</span><svg viewBox="0 0 420 190" preserveAspectRatio="none" aria-hidden="true"><path d={detailWavePaths[active.id]} /></svg></div>
          </div>
        </div>
      </section>

      <section className="care-section section-pad">
        <div className="section-index" data-reveal>04 <span>Who we help</span></div>
        <div className="care-layout">
          <div className="care-copy" data-reveal><p className="eyebrow">A better starting point</p><h2>When your lungs ask for <em>attention.</em></h2><p>Whether you live in a polluted city, smoke or have a diagnosed lung condition, the right first step is an honest look at what your lungs are doing.</p><a className="inline-link" href="#book">Talk to our team <ArrowUpRight size={16} /></a></div>
          <div className="condition-cloud" data-reveal>{conditions.map((condition, index) => <span key={condition} className={`condition-chip condition-chip--${index % 3}`}>{condition}</span>)}<div className="condition-cloud__note"><Stethoscope size={18} /><span>Specialist-led<br />care plans</span></div></div>
        </div>
      </section>

      <section className="rehab-section" id="rehab">
        <div className="rehab-visual" data-reveal>
          <div className="rehab-visual__grid" />
          <div className="rehab-progress"><span>PROGRAM / RESPIRATORY CAPACITY</span><strong>week 03 <small>of 08</small></strong><div className="rehab-progress__track"><i /></div><em>the aim is not to push harder.<br />it is to make more possible.</em></div>
          <svg className="rehab-path" viewBox="0 0 500 330" preserveAspectRatio="none" aria-hidden="true"><path d="M18 285C82 284 67 226 121 226S149 286 205 286S234 155 290 155S322 231 369 231S399 84 482 84" /><circle cx="121" cy="226" r="5" /><circle cx="290" cy="155" r="5" /><circle cx="482" cy="84" r="5" /></svg>
          <div className="rehab-breathe"><span className="rehab-breathe__number">04</span><Wind size={42} strokeWidth={1.2} /><strong>+24%</strong><span className="rehab-breathe__caption">walking<br />capacity</span></div>
          <div className="rehab-metric rehab-metric--one"><span>01</span><strong>breathing</strong><small>retrained</small></div><div className="rehab-metric rehab-metric--two"><span>02</span><strong>strength</strong><small>rebuilt</small></div><div className="rehab-metric rehab-metric--three"><span>03</span><strong>confidence</strong><small>returned</small></div>
        </div>
        <div className="rehab-copy" data-reveal><p className="eyebrow">Pulmonary rehabilitation</p><h2>Make everyday<br /><em>feel easier.</em></h2><p className="rehab-lead">Breathlessness can make life smaller. Our structured, personalised programme helps you break that cycle — safely, gradually and with a clinical team beside you.</p><div className="rehab-points"><div><Check size={16} /><span>Supervised exercise + breathing retraining</span></div><div><Check size={16} /><span>Airway clearance + inhaler technique</span></div><div><Check size={16} /><span>Nutrition, education and confidence</span></div></div><a className="button button--dark" href="#book">Explore pulmonary rehab <ArrowUpRight size={17} /></a></div>
      </section>

      <section className="breath-section section-pad">
        <div className="section-index" data-reveal>05 <span>A minute for you</span></div>
        <div className="breath-layout"><div className="breath-heading" data-reveal><p className="eyebrow">A little practice</p><h2>Your next breath<br /><em>starts here.</em></h2><p>Use this as a reset before a test, after a long day, or whenever your body needs a quieter signal.</p></div><div data-reveal><BreathMeter /></div></div>
      </section>

      <section className="proof-section section-pad">
        <div className="section-index" data-reveal>06 <span>Patient notes</span></div>
        <div className="proof-layout"><div className="proof-heading" data-reveal><p className="eyebrow">Trusted & loved</p><h2>Good care should<br /><em>feel human.</em></h2><div className="proof-score"><strong>4.9</strong><span><span className="stars">★★★★★</span><br />Patient experience, Green Park</span></div></div><div className="testimonial-stack" data-reveal><blockquote>“The centre is clean and calming. The test was done in a very professional manner and I was given my report immediately.”<cite>Reena <span>·</span> PFT patient</cite></blockquote><blockquote>“The report clearly laid out over 50 metrics. Excited to take my friends and family there for evaluations soon.”<cite>Ankit <span>·</span> Diagnostic patient</cite></blockquote></div></div>
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-map" aria-hidden="true"><div className="map-grid" /><div className="map-route map-route--one" /><div className="map-route map-route--two" /><div className="map-pin"><MapPin size={24} /><span>AELIRA</span></div><span className="map-label map-label--one">GREEN PARK</span><span className="map-label map-label--two">SOUTH DELHI</span></div>
        <div className="visit-copy" data-reveal><p className="eyebrow">Come in, take a breath</p><h2>Good care is<br /><em>close to home.</em></h2><p>Ground Floor, C-4, Block C<br />Green Park Extension, New Delhi<br />Delhi 110016</p><div className="visit-details"><div><Clock3 size={18} /><span>Mon–Sat<br /><strong>9:30 AM – 7:30 PM</strong></span></div><div><Phone size={18} /><span>Call us<br /><strong>+91 966 711 7222</strong></span></div></div><a className="button button--dark" href={`https://www.google.com/maps/search/?api=1&query=Aelira+Lung+Care+Green+Park+Delhi`} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17} /></a></div>
      </section>

      <section className="book-section section-pad" id="book">
        <div className="book-glow" aria-hidden="true" /><div className="book-copy" data-reveal><p className="eyebrow eyebrow--light">07 / Your next step</p><h2>Start your lung<br /><em>care journey.</em></h2><p>Call, WhatsApp or email us to book a consultation, diagnostic test or pulmonary rehabilitation assessment.</p></div><div className="book-actions" data-reveal><a className="button button--light" href={`tel:${phone}`}><Phone size={17} /> Call Aelira <ArrowUpRight size={17} /></a><a className="button button--outline-light" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp the team <ArrowUpRight size={17} /></a><a className="book-email" href="mailto:info@thelung.co"><Mail size={16} /> info@thelung.co</a></div></section>

      <footer className="site-footer"><div className="footer-top"><a className="brand-lockup brand-lockup--footer" href="#top"><img src={logoUrl} alt="Aelira Lung Care" /></a><p>Advanced lung care.<br />Made personal.</p><div className="footer-social"><a href="https://www.instagram.com/aeliralungcare/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href="https://in.linkedin.com/company/aelira" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a></div></div><div className="footer-bottom"><span>© 2026 Aelira Health Private Limited</span><span>Privacy · Terms</span><span>Designed for easier breathing</span></div></footer>
    </main>
  );
}
