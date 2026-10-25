'use client'

import { useEffect, useState } from 'react'
import { ResourceCard, type ResourceView } from './ResourceCard'

export function ResultsClient({ resources }: { resources: ResourceView[] }) {
  const [category, setCategory] = useState('')

  // Read only the category from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const allowedCategories = [
      'housing',
      'food',
      'financial',
      'health-safety',
    ]

    const requestedCategory = params.get('category') || ''

    setCategory(
      allowedCategories.includes(requestedCategory)
        ? requestedCategory
        : ''
    )
  }, [])

  // Filter resources based on the selected category
  const matches = category
    ? resources.filter((item) => item.category === category)
    : resources

  return (
    <>
      <div className="results-summary">
        <div>
          <span className="kicker">
            Orange County · Community resource listings
          </span>

          <h1>
            {category
              ? `${category.replace('-', ' & ')} support`
              : 'LOCAL SUPPORT'}
          </h1>
        </div>

        <p>
          Explore community resources and choose what fits your needs.
        </p>
      </div>

      <div className="filter-row">
        {['', 'housing', 'food', 'financial', 'health-safety'].map(
          (value) => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              className={category === value ? 'active' : ''}
            >
              {value ? value.replace('-', ' & ') : 'All support'}
            </button>
          )
        )}
      </div>

      <div className="results-grid">
        {matches.map((resource, index) => (
          <ResourceCard
            resource={resource}
            index={index}
            key={resource.id}
          />
        ))}
      </div>

      {matches.length === 0 && (
        <div className="empty-state">
          <h2>No exact match yet.</h2>
          <p>
            Call 2-1-1 for a broader referral search, or try another category.
          </p>
        </div>
      )}
    </>
  )
}