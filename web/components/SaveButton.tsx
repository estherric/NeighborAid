'use client'

import { useEffect, useState } from 'react'

export type SavedResource = { slug: string; name: string; organization: string; category: string; nextStep: string }

export function SaveButton({ resource }: { resource: SavedResource }) {
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    const current: SavedResource[] = JSON.parse(localStorage.getItem('neighboraid-saved') || '[]')
    setSaved(current.some((item) => item.slug === resource.slug))
  }, [resource.slug])
  function toggle() {
    const current: SavedResource[] = JSON.parse(localStorage.getItem('neighboraid-saved') || '[]')
    const next = current.some((item) => item.slug === resource.slug) ? current.filter((item) => item.slug !== resource.slug) : [...current, resource]
    localStorage.setItem('neighboraid-saved', JSON.stringify(next))
    setSaved(!saved)
  }
  return <button className={`save-control ${saved ? 'is-saved' : ''}`} onClick={toggle}>{saved ? '✓ Saved' : '+ Save resource'}</button>
}
