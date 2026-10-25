import type { ResourceView } from '@/components/ResourceCard'

export const sampleResources: ResourceView[] = [
  {
    id: 'demo-housing-1',
    slug: 'demo-housing-assistance',
    name: 'Housing Assistance Example',
    organization: 'Demo Community Organization',
    category: 'housing',
    county: 'Orange County',
    serviceSummary: 'Example rental assistance resource.',
    whyHelpful: 'Demonstrates how NeighborAid matches housing needs.',
    nextStep: 'Review the provider information before applying.',
    verified: false,
    lastVerified: 'Not verified',
  },
  {
    id: 'demo-food-1',
    slug: 'demo-food-assistance',
    name: 'Food Assistance Example',
    organization: 'Demo Food Network',
    category: 'food',
    county: 'Orange County',
    serviceSummary: 'Example food assistance resource.',
    whyHelpful: 'Demonstrates how NeighborAid displays food support.',
    nextStep: 'Check official provider details for current availability.',
    verified: false,
    lastVerified: 'Not verified',
  },
  {
    id: 'demo-financial-1',
    slug: 'demo-financial-assistance',
    name: 'Financial Assistance Example',
    organization: 'Demo Support Center',
    category: 'financial',
    county: 'Orange County',
    serviceSummary: 'Example financial assistance resource.',
    whyHelpful: 'Demonstrates matching for financial hardship.',
    nextStep: 'Confirm requirements before applying.',
    verified: false,
    lastVerified: 'Not verified',
  },
  {
    id: 'demo-health-1',
    slug: 'demo-health-safety',
    name: 'Health and Safety Support Example',
    organization: 'Demo Community Services',
    category: 'health-safety',
    county: 'Orange County',
    serviceSummary: 'Example health and safety support resource.',
    whyHelpful: 'Demonstrates the health and safety category.',
    nextStep: 'Contact an appropriate verified provider.',
    verified: false,
    lastVerified: 'Not verified',
  },
]

export async function getResources(): Promise<ResourceView[]> {
  return sampleResources
}