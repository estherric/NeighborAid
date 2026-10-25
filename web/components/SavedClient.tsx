'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SavedResource } from './SaveButton'

export function SavedClient() {
  const [items, setItems] = useState<SavedResource[]>([])

  // Load saved resources from the browser.
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem('neighboraid-saved') || '[]'
      )

      setItems(Array.isArray(stored) ? stored : [])
    } catch {
      setItems([])
    }
  }, [])

  // Remove one saved resource.
  function removeResource(slug: string) {
    const updated = items.filter((item) => item.slug !== slug)

    localStorage.setItem(
      'neighboraid-saved',
      JSON.stringify(updated)
    )

    setItems(updated)
  }

  // Display this message when there are no saved resources.
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>No saved resources yet.</h2>

        <p>
          Save a program from your results to return
          without repeating your assessment.
        </p>

        <Link className="button primary" href="/results">
          Browse resources →
        </Link>
      </div>
    )
  }

  return (
    <div className="saved-list">
      {items.map((item, index) => (
        <article key={item.slug}>
          <span>0{index + 1}</span>

          <div>
            <small>{item.category.replace('-', ' / ')}</small>

            <h2>{item.name}</h2>

            <p>{item.organization}</p>

            <strong>Next: {item.nextStep}</strong>
          </div>

          <div className="saved-actions">
            <Link href={`/resources/${item.slug}`}>
              Open →
            </Link>

            <button
              type="button"
              className="remove-saved"
              onClick={() => removeResource(item.slug)}
              aria-label={`Remove ${item.name} from saved resources`}
            >
              Remove
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}