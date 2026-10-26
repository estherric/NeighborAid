
'use client'

import { useEffect, useState } from 'react'
import { ResourceCard, type ResourceView } from './ResourceCard'

const allowedCategories = [
  'housing',
  'food',
  'financial',
  'health-safety',
] as const

type Category = (typeof allowedCategories)[number]

function isCategory(value: string): value is Category {
  return allowedCategories.some((category) => category === value)
}

function formatCategory(category: string) {
  return category === 'health-safety'
    ? 'Health & Safety'
    : category.charAt(0).toUpperCase() + category.slice(1)
}

export function ResultsClient({
  resources,
}: {
  resources: ResourceView[]
}) {
  const [categories, setCategories] = useState<Category[]>([])

  // Read requested categories from the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requested = params.get('category') || ''

    const selected = requested
      .split(',')
      .map((value) => value.trim())
      .filter(isCategory)

    // Remove duplicates.
    setCategories([...new Set(selected)])
  }, [])

  // Show resources belonging to ANY selected category.
  // If none are selected, show all resources.
  const matches =
    categories.length > 0
      ? resources.filter((item) =>
          categories.includes(item.category as Category)
        )
      : resources

  function selectCategory(value: string) {
    if (!value || !isCategory(value)) {
      setCategories([])
      return
    }

    setCategories([value])
  }

  return (
    <>
      <div className="results-summary">
        <div>
          <span className="kicker">
            Orange County · Community resource listings
          </span>

          <h1>
            {categories.length === 0
              ? 'LOCAL SUPPORT'
              : categories.length === 1
                ? `${formatCategory(categories[0])} support`
                : 'YOUR MATCHED SUPPORT'}
          </h1>
        </div>

        <p>
          {categories.length > 1
            ? `Showing resources for ${categories
                .map(formatCategory)
                .join(', ')}.`
            : 'Explore community resources and choose what fits your needs.'}
        </p>
      </div>

      <div className="filter-row">
        <button
          type="button"
          onClick={() => selectCategory('')}
          className={categories.length === 0 ? 'active' : ''}
        >
          All support
        </button>

        {allowedCategories.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => selectCategory(value)}
            className={
              categories.length === 1 && categories[0] === value
                ? 'active'
                : ''
            }
          >
            {formatCategory(value)}
          </button>
        ))}
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
            Call 2-1-1 for a broader referral search,
            or try another category.
          </p>
        </div>
      )}
    </>
  )
}
