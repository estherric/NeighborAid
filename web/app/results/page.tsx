import { ResultsClient } from '@/components/ResultsClient'
import { getResources } from '@/lib/resources'

export default async function ResultsPage() {
  const resources = await getResources()
  return <section className="page-wrap"><ResultsClient resources={resources} /></section>
}
