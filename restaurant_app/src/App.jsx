import { useState, useEffect, useRef } from 'react'
import './App.css'
const NAV_LINKS = ['Menu', 'About', 'Reservations', 'Contact']







const MENU = [
  {
    category: 'Starters',
    items: [
      { name: 'Burrata & Heirloom Tomato', desc: 'Aged balsamic, basil oil, fleur de sel', price: '$18' },
      { name: 'Seared Foie Gras', desc: 'Brioche, fig compote, aged port reduction', price: '$28' },
      { name: 'Oysters Rockefeller', desc: 'Spinach, parmesan, tarragon cream, half dozen', price: '$24' },
    ]
  },
  {
    category: 'Mains',
    items: [
      { name: 'Dry-Aged Côte de Bœuf', desc: '45-day dry aged, bone marrow butter, truffle frites', price: '$72' },
      { name: 'Pan-Seared Halibut', desc: 'Cauliflower purée, capers, lemon beurre blanc', price: '$48' },
      { name: 'Wild Mushroom Risotto', desc: 'Porcini, chanterelle, aged parmesan, black truffle', price: '$38' },
    ]
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Valrhona Chocolate Soufflé', desc: 'Tahitian vanilla crème anglaise', price: '$16' },
      { name: 'Seasonal Tarte Tatin', desc: 'Calvados caramel, crème fraîche', price: '$14' },
      { name: 'Cheese Trolley', desc: 'Selection of 5 artisan cheeses, quince, honey', price: '$22' },
    ]
  }
]

function useIntersection(ref, options = {}) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.15, ...options })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const visible = useIntersection(ref)
  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-main">Ember & Oak</span>
          <span className="logo-sub">Est. 2014</span>
        </div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <button key={link} className="nav-link" onClick={() => scrollTo(link)}>
              {link}
            </button>
          ))}
          <button className="nav-cta" onClick={() => scrollTo('Reservations')}>Reserve a Table</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-content">
        <p className="hero-eyebrow">Fine Dining · Wood Fire · Seasonal</p>
        <h1 className="hero-title">
          <span>Where Flame</span>
          <em> Meets Flavor</em>
        </h1>
        <p className="hero-subtitle">
          An intimate dining experience celebrating the ancient art of live-fire cooking,
          paired with the finest seasonal ingredients and an extraordinary wine cellar.
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}>
            Reserve Your Evening
          </button>
          <button className="btn-ghost" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Menu
          </button>
        </div>
        <div className="hero-hours">
          <span>Tue – Thu: 6pm – 10pm</span>
          <span className="sep">·</span>
          <span>Fri – Sat: 5:30pm – 11pm</span>
          <span className="sep">·</span>
          <span>Sun: 5pm – 9pm</span>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <FadeIn className="about-text">
          <p className="section-label">Our Story</p>
          <h2 className="section-title">A Devotion to the Craft</h2>
          <p>
            Born from a simple conviction — that fire is the oldest and finest of all cooking techniques —
            Ember & Oak was founded in 2014 by Chef Marcus Veil. Trained in Lyon and Tokyo, Marcus
            returned home with a singular vision: to honour local producers through the transformative
            power of live-fire cookery.
          </p>
          <p style={{ marginTop: '1.2rem' }}>
            Every night, our kitchen burns red oak and apple wood, coaxing flavour and depth from
            ingredients sourced within 150 miles of our door. We change our menu with the seasons —
            and sometimes with the week — because truly great food is never the same twice.
          </p>
          <div className="about-stats">
            {[['10+', 'Years of Excellence'], ['150mi', 'Sourcing Radius'], ['800+', 'Wine Labels'], ['3', 'Michelin Stars']].map(([n, l]) => (
              <div key={l} className="stat">
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={150} className="about-image">
          <div className="img-frame">
            <div className="img-placeholder">
              <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="500" fill="#2d2820"/>
                <circle cx="200" cy="180" r="60" fill="#c8a96e" opacity="0.15"/>
                <path d="M160 200 Q200 120 240 200 Q260 240 200 280 Q140 240 160 200Z" fill="#c8a96e" opacity="0.4"/>
                <path d="M185 210 Q200 160 215 210 Q225 235 200 255 Q175 235 185 210Z" fill="#c8a96e" opacity="0.7"/>
                <path d="M195 220 Q200 190 205 220 Q208 235 200 245 Q192 235 195 220Z" fill="#e2c99a"/>
                <line x1="200" y1="280" x2="200" y2="420" stroke="#c8a96e" strokeWidth="2" opacity="0.5"/>
                <ellipse cx="200" cy="420" rx="40" ry="8" fill="#c8a96e" opacity="0.3"/>
                <text x="200" y="460" textAnchor="middle" fill="#c8a96e" fontSize="14" fontFamily="serif" opacity="0.6">Chef Marcus Veil</text>
              </svg>
            </div>
            <div className="img-tag">Head Chef & Founder</div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Menu() {
  const [active, setActive] = useState(0)

  return (
    <section id="menu" className="menu-section">
      <div className="menu-inner">
        <FadeIn>
          <p className="section-label light">Seasonal Menu</p>
          <h2 className="section-title light">Tonight's Selection</h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="menu-tabs">
            {MENU.map((cat, i) => (
              <button
                key={cat.category}
                className={`menu-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </FadeIn>
        <div className="menu-items">
          {MENU[active].items.map((item, i) => (
            <FadeIn key={item.name} delay={i * 80} className="menu-item-wrap">
              <div className="menu-item">
                <div className="menu-item-info">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <p className="menu-item-desc">{item.desc}</p>
                </div>
                <span className="menu-item-price">{item.price}</span>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={200}>
          <p className="menu-note">
            Menu changes seasonally. Dietary accommodations available upon request.
            Please inform your server of any allergies.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function Reservations() {
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '', guests: '2', note: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="reservations" className="reservations">
      <div className="res-inner">
        <FadeIn className="res-text">
          <p className="section-label">Book a Table</p>
          <h2 className="section-title">Reservations</h2>
          <p className="res-desc">
            We recommend reserving at least two weeks in advance, especially for weekends.
            For parties of 8 or more, please call us directly.
          </p>
          <div className="res-contact">
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
            <a href="mailto:reservations@emberandoak.com">reservations@emberandoak.com</a>
          </div>
        </FadeIn>
        <FadeIn delay={150} className="res-form-wrap">
          {sent ? (
            <div className="res-success">
              <div className="success-icon">✦</div>
              <h3>Reservation Received</h3>
              <p>We'll confirm your table within 24 hours. We look forward to welcoming you.</p>
              <button className="btn-primary" onClick={() => setSent(false)}>Make Another</button>
            </div>
          ) : (
            <form className="res-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  <span>Full Name</span>
                  <input name="name" value={form.name} onChange={handle} required placeholder="Your name" />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="your@email.com" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span>Date</span>
                  <input name="date" type="date" value={form.date} onChange={handle} required />
                </label>
                <label>
                  <span>Time</span>
                  <select name="time" value={form.time} onChange={handle} required>
                    <option value="">Select time</option>
                    {['5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span>Guests</span>
                <select name="guests" value={form.guests} onChange={handle}>
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
                </select>
              </label>
              <label>
                <span>Special Requests</span>
                <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="Dietary requirements, celebrations, allergies…" />
              </label>
              <button type="submit" className="btn-primary full">Request Reservation</button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <FadeIn className="contact-col">
          <p className="section-label">Find Us</p>
          <h2 className="section-title">Location & Hours</h2>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">◎</span>
              <div>
                <strong>Address</strong>
                <p>42 Ashwood Lane<br />Portland, OR 97201</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">◷</span>
              <div>
                <strong>Hours</strong>
                <p>Tue – Thu: 6:00 PM – 10:00 PM<br />Fri – Sat: 5:30 PM – 11:00 PM<br />Sun: 5:00 PM – 9:00 PM<br /><em>Monday: Closed</em></p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✆</span>
              <div>
                <strong>Phone</strong>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={150} className="contact-map">
          <div className="map-placeholder">
            <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="500" height="350" fill="#2d2820"/>
              <rect x="0" y="160" width="500" height="2" stroke="#c8a96e" strokeWidth="0.5" fill="#c8a96e" opacity="0.3"/>
              <rect x="240" y="0" width="2" height="350" stroke="#c8a96e" strokeWidth="0.5" fill="#c8a96e" opacity="0.3"/>
              {[60,120,180,300,360,420].map(x=><rect key={x} x={x} y="0" width="1" height="350" fill="#c8a96e" opacity="0.1"/>)}
              {[40,80,120,200,240,280,320].map(y=><rect key={y} x="0" y={y} width="500" height="1" fill="#c8a96e" opacity="0.1"/>)}
              <circle cx="250" cy="175" r="12" fill="#c8a96e"/>
              <circle cx="250" cy="175" r="20" stroke="#c8a96e" strokeWidth="1" fill="none" opacity="0.5"/>
              <circle cx="250" cy="175" r="30" stroke="#c8a96e" strokeWidth="1" fill="none" opacity="0.2"/>
              <text x="250" y="220" textAnchor="middle" fill="#c8a96e" fontSize="12" fontFamily="serif">42 Ashwood Lane, Portland</text>
            </svg>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="logo-main">Ember & Oak</span>
          <span className="logo-sub">Est. 2014</span>
        </div>
        <div className="footer-links">
          {NAV_LINKS.map(l => (
            <button key={l} className="footer-link"
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
              {l}
            </button>
          ))}
        </div>
        <p className="footer-copy">© 2026 Ember & Oak. All rights reserved.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Reservations />
      <Contact />
      <Footer />
    </>
  )
}

export default App
