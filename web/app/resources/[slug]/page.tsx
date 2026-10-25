import { SaveButton } from '@/components/SaveButton'
import { getResources } from '@/lib/resources'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const instant = false

export async function generateStaticParams() {
  return [
    { slug: 'demo-housing-assistance' },
    { slug: 'demo-food-assistance' },
    { slug: 'demo-financial-assistance' },
    { slug: 'demo-health-safety' },
  ]
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resources = await getResources()

  const resource = resources.find(
    (item) => item.slug === slug
  )

  if (!resource) {
    notFound()
  }

  return (
    <section className="page-wrap detail-page">
      <Link className="back-link" href="/results">
        ← Back to results
      </Link>

      <div className="detail-heading">
        <span className="kicker">
          {resource.category.replace('-', ' / ')} · {resource.county}
        </span>
        <h1>{resource.name}</h1>
        <p>{resource.organization}</p>
      </div>

      <div className="detail-grid">
        <article className="action-card">
          <span className="kicker">DEMO RESOURCE — NOT VERIFIED</span>
          <h2>{resource.nextStep}</h2>
          <p>
            This is a fictional demonstration listing,
            not a verified assistance program.
          </p>
          <SaveButton resource={resource} />
        </article>

        <article className="detail-copy">
          <h2>What this service does</h2>
          <p>{resource.serviceSummary}</p>

          <h2>Why it may help</h2>
          <p>{resource.whyHelpful}</p>

          <p className="eligibility-note">
            This listing is for demonstration purposes only.
            Real program availability and eligibility must
            be confirmed before providing recommendations.
          </p>
        </article>

        <aside className="fact-sheet">
          <h2>Before you go</h2>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>Demo data — not verified</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{resource.county}</dd>
            </div>
            <div>
              <dt>Verification</dt>
              <dd>Not yet verified</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}