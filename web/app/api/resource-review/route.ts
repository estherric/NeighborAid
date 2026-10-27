import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  reviewResourceCandidate,
  type ReviewDecision,
} from "@/lib/resource-review";

export async function POST(request: Request) {
  const expectedToken = process.env.RESOURCE_DISCOVERY_ADMIN_TOKEN;
  const providedToken = request.headers.get("x-admin-token");

  if (!expectedToken || !providedToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const expected = Buffer.from(expectedToken);
  const provided = Buffer.from(providedToken);

  if (
    expected.length !== provided.length ||
    !timingSafeEqual(expected, provided)
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Expected a JSON object." },
      { status: 400 }
    );
  }

  const input = body as Record<string, unknown>;
  const candidateId = input.candidateId;
  const decision = input.decision;

  if (
    typeof candidateId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(candidateId) ||
    (decision !== "approved" && decision !== "rejected")
  ) {
    return NextResponse.json(
      { error: "Invalid candidate ID or review decision." },
      { status: 400 }
    );
  }

  try {
    const reviewed = await reviewResourceCandidate(
      candidateId,
      decision as ReviewDecision
    );

    return NextResponse.json({
      status: "reviewed",
      candidate: reviewed,
    });
  } catch {
    return NextResponse.json(
      { error: "Review failed or candidate is not pending." },
      { status: 409 }
    );
  }
}