import type { ResourceView } from "@/components/ResourceCard";
import { supabase } from "@/lib/supabase";

export async function getResources(): Promise<ResourceView[]> {
  const { data, error } = await supabase
    .from("resources")
    .select("*");

  if (error) {
    throw new Error(`Failed to fetch resources: ${error.message}`);
  }

  return (data ?? []).map((resource): ResourceView => ({
    id: resource.legacy_id ?? resource.id,
    slug: resource.slug,
    name: resource.name,
    organization: resource.organization ?? "",
    category: resource.category as ResourceView["category"],
    county: resource.county ?? "Orange County",
    serviceSummary: resource.service_summary ?? "",
    whyHelpful: resource.why_helpful ?? "",
    nextStep: resource.next_step ?? "",
    phone: resource.phone ?? undefined,
    website: resource.website ?? undefined,
    hours: resource.hours ?? undefined,
    accessibility: resource.accessibility ?? undefined,
    verified: resource.verified ?? false,
    lastVerified: resource.last_verified ?? undefined,
  }));
}
