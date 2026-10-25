import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="kicker">01 — Orange County support desk</span>
          <h1>REAL HELP.<br /><em>RIGHT HERE.</em></h1>
          <p>NeighborAid helps Orange County residents find clear, verified next steps for housing, food, bills, and urgent needs.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/assistance">Tell us what’s happening <span>→</span></Link>
            <Link className="button secondary" href="/results">I know what I need <span>→</span></Link>
          </div>
          <small className="privacy-line">No account required · Share only what you’re comfortable sharing</small>
        </div>
        <figure className="hero-visual">
          <img src="https://images.unsplash.com/photo-1552703091-2f86cb7415c0?auto=format&fit=crop&w=1200&q=85" alt="Community volunteers working together" />
          <figcaption>NEIGHBORS / HELPING / NEIGHBORS</figcaption>
          <div className="visual-stamp">FULLERTON<br />CA — 2026</div>
        </figure>
      </section>

      <section className="mission">
        <span className="kicker">02 — Our mission</span>
        <blockquote>To ensure that asking for help is never harder than the crisis itself.</blockquote>
      </section>

      <section className="how-grid">
        <article><span>01</span><h2>Tell us what’s going on</h2><p>Use your own words. NeighborAid identifies likely support categories without asking for sensitive personal details.</p></article>
        <article><span>02</span><h2>Review verified matches</h2><p>See real Orange County programs, why they may help, and the clearest next action.</p></article>
        <article><span>03</span><h2>Make a simple plan</h2><p>Save useful services and turn them into a practical checklist you can return to.</p></article>
      </section>

      <section className="home-band">
        <div><span className="kicker">03 — Start where you are</span><h2>YOU DON’T NEED<br />THE RIGHT WORDS.</h2></div>
        <Link className="button light" href="/assistance">Ask NeighborAid <span>→</span></Link>
      </section>
    </>
  )
}
