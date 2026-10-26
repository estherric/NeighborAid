"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

const validCategories = [
  "housing",
  "food",
  "financial",
  "health-safety",
] as const;

type Category = (typeof validCategories)[number];

// Fallback if Groq is unavailable or the user chooses not to use AI.
function matchLocally(message: string): Category[] {
  const text = message.toLowerCase();
  const categories: Category[] = [];

  if (/rent|evict|housing|shelter|homeless/.test(text)) {
    categories.push("housing");
  }

  if (/food|hungry|meal|grocer|pantry/.test(text)) {
    categories.push("food");
  }

  if (/bill|utility|electric|money|financial/.test(text)) {
    categories.push("financial");
  }

  if (/health|medical|safety|crisis/.test(text)) {
    categories.push("health-safety");
  }

  return categories;
}

export function AssistanceForm() {
  const router = useRouter();

  const [need, setNeed] = useState("");
  const [zip, setZip] = useState("");
  const [urgent, setUrgent] = useState(false);

  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      let categories: Category[] = matchLocally(need);

      if (useAI) {
        // Only the message is sent to our API endpoint.
        // ZIP code and urgency are not included.
        const response = await fetch("/api/ai-match", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: need,
          }),
        });

        if (!response.ok) {
          throw new Error("AI matching request failed");
        }

        const data: unknown = await response.json();

        if (
          typeof data === "object" &&
          data !== null &&
          "categories" in data &&
          Array.isArray(data.categories)
        ) {
          const returnedCategories: unknown[] = data.categories;

          categories = validCategories.filter((category) =>
            returnedCategories.includes(category),
          );
        }
      }

      const params = new URLSearchParams();

      // Send all matched categories to Results.
      if (categories.length > 0) {
        params.set("category", categories.join(","));
      }

      // Never put the original message in the URL.
      // ZIP code and urgency also stay out of the URL.
      setNeed("");
      setZip("");
      setUrgent(false);

      router.push(`/results${params.size ? `?${params.toString()}` : ""}`);
    } catch {
      setError(
        "We could not complete AI matching. Please try again or uncheck AI-assisted matching to use standard matching.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="assessment-form">
      <label htmlFor="need">Your message</label>

      <textarea
        id="need"
        required
        maxLength={300}
        value={need}
        onChange={(event) => setNeed(event.target.value)}
        placeholder="For example: I'm behind on rent and need help."
        disabled={loading}
      />

      <div className="follow-up">
        <label htmlFor="zip">
          ZIP code <small>Optional — location filtering coming soon</small>
        </label>

        <input
          id="zip"
          name="zip"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          value={zip}
          onChange={(event) => setZip(event.target.value)}
          placeholder="e.g. 92831"
          disabled={loading}
        />

        <label className="urgent">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(event) => setUrgent(event.target.checked)}
            disabled={loading}
          />
          I need help urgently
        </label>

        <label className="urgent">
          <input
            type="checkbox"
            checked={useAI}
            onChange={(event) => setUseAI(event.target.checked)}
            disabled={loading}
          />
          Use AI-assisted resource matching
        </label>

        <small>
          Optional: If selected, your message will be sent to Groq through
          NeighborAid's server to identify assistance categories. Do not enter
          names, addresses, medical details, or other sensitive personal
          information. ZIP code and urgency are not sent to Groq.
        </small>
      </div>

      {error && <p role="alert">{error}</p>}

      <button className="button primary" type="submit" disabled={loading}>
        {loading ? "Finding community support..." : "Find community support →"}
      </button>
    </form>
  );
}
