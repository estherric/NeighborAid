import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { publishResourceCandidate } from "@/lib/resource-publishing";

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
      { error: "Invalid JSON." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Expected a JSON object." },
      { status: 400 }
    );
  }

  const candidateId = (body as Record<string, unknown>).candidateId;

  if (
    typeof candidateId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(candidateId)
  ) {
    return NextResponse.json(
      { error: "Invalid candidate ID." },
      { status: 400 }
    );
  }

  try {
    const result = await publishResourceCandidate(candidateId);

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "Resource publication failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Resource could not be published." },
      { status: 409 }
    );
  }
}