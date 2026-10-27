import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";
import type { ExtractedResource } from "@/lib/resource-extraction";

export async function saveResourceCandidate(
  resource: ExtractedResource,
  sourceUrl: string
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("resource_candidates")
    .insert({
      name: resource.name,
      organization: resource.organization,
      category: resource.category,
      description: resource.service_summary,
      service_summary: resource.service_summary,
      website: resource.website,
      phone: resource.phone,
      zip_code: resource.zip_code,
      why_helpful: resource.why_helpful,
      next_step: resource.next_step,
      source_url: sourceUrl,
      status: "pending",
    })
    .select("id, name, status")
    .single();

  if (error) {
    throw new Error("Failed to save resource candidate.");
  }

  return data;
}