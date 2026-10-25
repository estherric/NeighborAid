import { ActionPlanClient } from '@/components/ActionPlanClient'
import Link from 'next/link'

export default function ActionPlanPage() {
  return <section className="page-wrap narrow-page"><span className="kicker">Your private checklist</span><h1>MY ACTION<br /><em>PLAN.</em></h1><p>Small steps make the process more manageable. Your progress is stored only in this browser.</p><ActionPlanClient /><Link className="button primary" href="/saved">Review saved resources →</Link></section>
}
