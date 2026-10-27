import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export type ReviewDecision = "approved" | "rejected";

export async function reviewResourceCandidate(
  candidateId: string,
  decision: ReviewDecision
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("resource_candidates")
    .update({
      status: decision,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", candidateId)
    .eq("status", "pending")
    .select("id, name, status, reviewed_at")
    .single();

  if (error) {
    throw new Error("Failed to review resource candidate.");
  }

  return data;
}