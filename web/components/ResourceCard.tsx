import Link from 'next/link'
import { SaveButton, type SavedResource } from './SaveButton'

export type ResourceView = SavedResource & {
  id: string
  serviceSummary: string
  whyHelpful: string
  county: string
  verified?: boolean | null
  lastVerified: string
}

export function ResourceCard({ resource, index }: { resource: ResourceView; index: number }) {
  return (
    <article className="result-card">
      <span className="card-index">0{index + 1}</span>
      <div className="card-label">{resource.category.replace('-', ' / ')} · {resource.county}</div>
      <h2>{resource.name}</h2>
      <p className="organization">{resource.organization}</p>
      <dl>
        <div><dt>What it is</dt><dd>{resource.serviceSummary}</dd></div>
        <div><dt>Why it may help</dt><dd>{resource.whyHelpful}</dd></div>
        <div><dt>What to do next</dt><dd>{resource.nextStep}</dd></div>
      </dl>
      <div className="card-footer">
        <Link href={`/resources/${resource.slug}`}>
          View resource details →
        </Link>
        <SaveButton resource={resource} />
      </div>
    </article>
  )
}
