'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SavedResource } from './SaveButton'

export function SavedClient() {
  const [items, setItems] = useState<SavedResource[]>([])
  useEffect(() => setItems(JSON.parse(localStorage.getItem('neighboraid-saved') || '[]')), [])
  if (!items.length) return <div className="empty-state"><h2>No saved resources yet.</h2><p>Save a program from your results to return without repeating your assessment.</p><Link className="button primary" href="/results">Browse resources →</Link></div>
  return <div className="saved-list">{items.map((item, index) => <article key={item.slug}><span>0{index + 1}</span><div><small>{item.category}</small><h2>{item.name}</h2><p>{item.organization}</p><strong>Next: {item.nextStep}</strong></div><Link href={`/resources/${item.slug}`}>Open →</Link></article>)}</div>
}
