import Link from 'next/link'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/">NeighborAid<small>THE LOCAL HELP DESK</small></Link>
        <nav aria-label="Main navigation">
          <Link href="/assistance">Ask NeighborAid</Link>
          <Link href="/results">Find support</Link>
          <Link href="/action-plan">Action plan</Link>
          <Link href="/saved">Saved</Link>
        </nav>
        <span className="location">FULLERTON, CA</span>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div><strong>NeighborAid</strong><span>Free to use · Minimal personal information · Verified resources</span></div>
        <p>If you are in immediate danger, call <b>911</b>. For crisis support, call or text <b>988</b>.</p>
      </footer>
    </div>
  )
}
