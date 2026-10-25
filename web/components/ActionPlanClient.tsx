'use client'

import { useEffect, useState } from 'react'

const defaults = [
  'Review the contact details for my first resource',
  'Call or visit the official website to confirm current requirements',
  'Write down any documents the program asks me to bring',
]

export function ActionPlanClient() {
  const [items, setItems] = useState(defaults.map((text) => ({ text, done: false })))
  useEffect(() => {
    const stored = localStorage.getItem('neighboraid-plan')
    if (stored) setItems(JSON.parse(stored))
  }, [])
  function toggle(index: number) {
    const next = items.map((item, itemIndex) => itemIndex === index ? { ...item, done: !item.done } : item)
    setItems(next)
    localStorage.setItem('neighboraid-plan', JSON.stringify(next))
  }
  return <div className="plan-list">{items.map((item, index) => <label key={item.text} className={item.done ? 'done' : ''}><input type="checkbox" checked={item.done} onChange={() => toggle(index)} /><span>0{index + 1}</span><strong>{item.text}</strong></label>)}</div>
}
