'use client'

import { useEffect, useState } from 'react'
import { ResourceCard, type ResourceView } from './ResourceCard'

function inferCategory(text: string) {
  const value = text.toLowerCase()
  if (/rent|evict|shelter|housing|homeless|stay/.test(value)) return 'housing'
  if (/food|meal|grocer|hungry|pantry/.test(value)) return 'food'
  if (/bill|utility|money|financial|electric|water/.test(value)) return 'financial'
  return ''
}

export function ResultsClient({ resources }: { resources: ResourceView[] }) {
  const [category, setCategory] = useState('')
  const [context, setContext] = useState('')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const need = params.get('need') || ''
    const direct = params.get('category') || ''
    setCategory(direct || inferCategory(need))
    setContext(need)
  }, [])
  const matches = category ? resources.filter((item) => item.category === category || item.category === 'health-safety') : resources
  return (
    <>
      <div className="results-summary">
        <div><span className="kicker">Orange County · Verified records</span><h1>{category ? `${category.replace('-', ' & ')} support` : 'LOCAL SUPPORT'}</h1></div>
        <p>{context ? 'Based on the circumstances you described, these categories may be relevant.' : 'Browse verified services and choose the support that fits your next step.'} This is not an eligibility decision.</p>
      </div>
      <div className="filter-row">
        {['', 'housing', 'food', 'financial', 'health-safety'].map((value) => <button key={value} onClick={() => setCategory(value)} className={category === value ? 'active' : ''}>{value ? value.replace('-', ' & ') : 'All support'}</button>)}
      </div>
      <div className="results-grid">{matches.map((resource, index) => <ResourceCard resource={resource} index={index} key={resource.id} />)}</div>
      {matches.length === 0 && <div className="empty-state"><h2>No exact match yet.</h2><p>Call 2-1-1 for a broader referral search, or try another category.</p></div>}
    </>
  )
}
