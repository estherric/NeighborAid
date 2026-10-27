import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function checkResourceDuplicate(
  name: string,
  organization: string | null
) {
  const supabase = createAdminClient();

  const [resourcesResult, candidatesResult] = await Promise.all([
    supabase.from("resources").select("id, name, organization"),
    supabase.from("resource_candidates").select("id, name, organization"),
  ]);

  if (resourcesResult.error) {
    throw new Error("Failed to check existing resources.");
  }

  if (candidatesResult.error) {
    throw new Error("Failed to check resource candidates.");
  }

  const namesToCheck = [name, organization]
    .filter((value): value is string => Boolean(value?.trim()))
    .map(normalizeName);

  const matchesName = (value: string | null | undefined) => {
    if (!value) return false;

    const normalizedValue = normalizeName(value);

    return namesToCheck.some((name) => {
      // Exact name match
      if (name === normalizedValue) return true;

      // Detect potential matches with longer organization names
      if (name.length < 8 || normalizedValue.length < 8) {
        return false;
      }

      return (
        normalizedValue.startsWith(name + " ") ||
        name.startsWith(normalizedValue + " ")
      );
    });
  };

  const existingResource = (resourcesResult.data ?? []).find(
    (resource) =>
      matchesName(resource.name) ||
      matchesName(resource.organization)
  );

  const existingCandidate = (candidatesResult.data ?? []).find(
    (candidate) =>
      matchesName(candidate.name) ||
      matchesName(candidate.organization)
  );

const allRecords = [
  ...(resourcesResult.data ?? []),
  ...(candidatesResult.data ?? []),
];

const exactNameMatch = allRecords.some(
  (record) => normalizeName(record.name) === normalizeName(name)
);

const matchedRecord = existingResource ?? existingCandidate;

return {
  isDuplicate: Boolean(matchedRecord),
  matchType: !matchedRecord
    ? "none"
    : exactNameMatch
      ? "exact"
      : "potential",
  existingTable: existingResource
    ? "resources"
    : existingCandidate
      ? "resource_candidates"
      : null,
};
}