'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FormEvent } from 'react'

export function AssistanceForm() {
  const router = useRouter()

  const [need, setNeed] = useState('')
  const [zip, setZip] = useState('')
  const [urgent, setUrgent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const message = need.toLowerCase()

    let category = ''

    if (/rent|evict|housing|shelter|homeless/.test(message)) {
      category = 'housing'
    } else if (/food|hungry|meal|grocer|pantry/.test(message)) {
      category = 'food'
    } else if (/bill|utility|money|financial/.test(message)) {
      category = 'financial'
    } else if (/health|medical|safety|crisis/.test(message)) {
      category = 'health-safety'
    }

    const params = new URLSearchParams()

    if (category) {
      params.set('category', category)
    }

    // Never put the user's original message into the URL.
    // For this MVP, we also keep ZIP code and urgency out of the URL.

    // Avoid leaving sensitive messages in React state after submission.
    setNeed('')
    setZip('')
    setUrgent(false)

    router.push(`/results${params.size ? `?${params}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="assessment-form">
      <label htmlFor="need">Your message</label>

      <textarea
        id="need"
        required
        value={need}
        onChange={(event) => setNeed(event.target.value)}
        placeholder="For example: I'm behind on rent and need help."
      />

      <div className="follow-up">
        <label htmlFor="zip">
          ZIP code <small>Optional — location filtering coming soon</small>
        </label>

        <input
          id="zip"
          name="zip"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          value={zip}
          onChange={(event) => setZip(event.target.value)}
          placeholder="e.g. 92831"
        />

        <label className="urgent">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(event) => setUrgent(event.target.checked)}
          />
          I need help urgently
        </label>
      </div>

      <button className="button primary" type="submit">
        Find community support →
      </button>
    </form>
  )
}