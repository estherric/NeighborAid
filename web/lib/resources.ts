import type { ResourceView } from "@/components/ResourceCard";

export const sampleResources: ResourceView[] = [
  {
    id: "oc-housing-1",
    slug: "211-orange-county",
    name: "Housing and Rental Assistance Referrals",
    organization: "211 Orange County",
    category: "housing",
    county: "Orange County",

    serviceSummary:
      "Free information and referrals to local housing, rental assistance, emergency shelter, and eviction prevention services.",

    whyHelpful:
      "Connects Orange County residents with organizations that may provide housing support based on their needs.",

    nextStep:
      "Call 2-1-1 or visit the official 211 Orange County website to find available services.",

    phone: "211",
    website: "https://211oc.org/get-help/",
    hours: "Phone assistance available 24/7",

    verified: false,
    lastVerified: "2026-10-24",
  },
  {
    id: "oc-food-1",
    slug: "second-harvest-food-bank-oc",
    name: "Find Free Food Near You",
    organization: "Second Harvest Food Bank of Orange County",
    category: "food",
    county: "Orange County",

    serviceSummary:
      "Connects Orange County residents with free food distributions through a network of community food pantries and partner organizations.",

    whyHelpful:
      "Helps individuals and families locate nearby food assistance using a searchable map of food distribution sites.",

    nextStep:
      "Visit the official Need Food page and search by ZIP code or city to find a nearby pantry. Check the distribution hours before visiting.",

    website: "https://feedoc.org/need-food/",

    hours: "Varies by partner food distribution location",

    accessibility:
      "Contact the selected pantry to confirm accessibility and accommodations.",

    verified: false,
    lastVerified: "2026-10-24",
  },
  {
    id: "oc-financial-1",
    slug: "capoc-utility-assistance",
    name: "Utility Bill Assistance",
    organization: "Community Action Partnership of Orange County",
    category: "financial",
    county: "Orange County",

    serviceSummary:
      "Provides assistance with gas and electric utility bills for eligible Orange County households experiencing financial difficulties.",

    whyHelpful:
      "May help qualifying households manage energy costs and reduce the financial burden of utility payments.",

    nextStep:
      "Visit the official CAP OC website to review application instructions, or call (714) 839-6199 for assistance.",

    phone: "7148396199",
    website: "https://www.capoc.org/addressing-immediate-needs/",

    hours: "Contact CAP OC to confirm current assistance hours.",

    accessibility:
      "Contact CAP OC to ask about application assistance and accommodations.",

    verified: false,
    lastVerified: "2026-10-24",
  },
  {
    id: "oc-health-1",
    slug: "oc-links-behavioral-health",
    name: "Mental Health and Behavioral Health Support",
    organization: "OC Links - Orange County Health Care Agency",
    category: "health-safety",
    county: "Orange County",

    serviceSummary:
      "Connects Orange County residents with mental health, substance-use, and behavioral health services through information and referrals.",

    whyHelpful:
      "Helps individuals and families identify appropriate behavioral health programs and find support for emotional or mental health concerns.",

    nextStep:
      "Call (855) 625-4657 or visit the official Orange County Health Care Agency website for information and referrals.",

    phone: "8556254657",
    website:
      "https://www.ochealthinfo.com/page/behavioral-health-resources-links",

    hours: "Contact OC Links to confirm current service hours.",

    accessibility:
      "TDD: (714) 834-2332. Ask OC Links about additional accommodations.",

    verified: false,
    lastVerified: "2026-10-24",
  },
];

export async function getResources(): Promise<ResourceView[]> {
  return sampleResources;
}
