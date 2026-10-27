import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkResourceDuplicate } from "@/lib/resource-duplicates";

function createSlug(name: string, candidateId: string) {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .replace(/-$/g, "");

  return `${base || "resource"}-${candidateId.slice(0, 8)}`;
}

export async function publishResourceCandidate(candidateId: string) {
  const supabase = createAdminClient();

  const { data: candidate, error: candidateError } = await supabase
    .from("resource_candidates")
    .select("*")
    .eq("id", candidateId)
    .eq("status", "approved")
    .single();

  if (candidateError || !candidate) {
    throw new Error("Candidate not found or not approved.");
  }

  const { data: existing, error: lookupError } = await supabase
    .from("resources")
    .select("id, slug")
    .eq("source_candidate_id", candidateId)
    .maybeSingle();

  if (lookupError) {
    throw new Error("Failed to check publication status.");
  }

  if (existing) {
    return {
      status: "already_published",
      resource: existing,
    };
  }

  const duplicate = await checkResourceDuplicate(
  candidate.name,
  candidate.organization
);

if (
  duplicate.isDuplicate &&
  duplicate.existingTable === "resources"
) {
  throw new Error(
    "A potentially duplicate resource already exists. Manual review required."
  );
}

  const { data: resource, error: publishError } = await supabase
    .from("resources")
    .insert({
      source_candidate_id: candidate.id,
      slug: createSlug(candidate.name, candidate.id),
      name: candidate.name,
      organization: candidate.organization,
      category: candidate.category,
      description: candidate.description,
      service_summary: candidate.service_summary,
      website: candidate.website,
      phone: candidate.phone,
      zip_code: candidate.zip_code,
      why_helpful: candidate.why_helpful,
      next_step: candidate.next_step,
      verified: false,
    })
    .select("id, slug, name")
    .single();

  if (publishError) {
    // A simultaneous request may have published this candidate first.
    if (publishError.code === "23505") {
      const { data: published } = await supabase
        .from("resources")
        .select("id, slug")
        .eq("source_candidate_id", candidateId)
        .maybeSingle();

      if (published) {
        return {
          status: "already_published",
          resource: published,
        };
      }
    }

    throw new Error("Failed to publish resource.");
  }

  return {
    status: "published",
    resource,
  };
}