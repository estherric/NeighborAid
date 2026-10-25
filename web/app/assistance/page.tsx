import Link from 'next/link'
import { AssistanceForm } from '@/components/AssistanceForm'

const categories = [
  ['Housing', 'Rent, shelter, eviction, or a safe place to stay', 'housing'],
  ['Food', 'Groceries, meals, or food for this week', 'food'],
  ['Financial', 'Utilities, bills, or emergency expenses', 'financial'],
  ['Health & safety', 'Crisis support or help finding the right service', 'health-safety'],
]

export default function AssistancePage() {
  return (
    <section className="page-wrap assessment">
      <div className="page-heading"><span className="kicker">01 — Private needs assessment</span><h1>ASK<br /><em>NeighboRaid.</em></h1><p>Describe only what you’re comfortable sharing. Please do not include Social Security numbers, immigration documents, medical records, or account numbers.</p></div>
      <div className="chat-panel">
        <div className="chat-title"><strong>Ask NeighboRaid</strong><span>Uses verified database records only</span></div>
        <div className="bot-message">What’s happening, and what kind of help would make the biggest difference right now?</div>
        <AssistanceForm />
        <p className="guardrail">NeighboRaid does not determine eligibility. Programs make final eligibility decisions using their current rules.</p>
      </div>
      <div className="category-path">
        <span className="kicker">OR CHOOSE A CATEGORY</span>
        <div>{categories.map(([title, detail, value], index) => <Link href={`/results?category=${value}`} key={value}><b>0{index + 1}</b><strong>{title}</strong><span>{detail}</span><i>→</i></Link>)}</div>
      </div>
    </section>
  )
}
