import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  extractResource,
  validateResource,
} from "@/lib/resource-extraction";
import { checkResourceDuplicate } from "@/lib/resource-duplicates";
import { saveResourceCandidate } from "@/lib/resource-candidates";

const redisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = redisConfigured ? Redis.fromEnv() : null;

// Allow 10 discovery requests per day.
const discoveryLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(10, "1 d"),
      prefix: "neighboraid:resource-discovery",
    })
  : null;

export async function POST(request: Request) {
  const expectedToken =
    process.env.RESOURCE_DISCOVERY_ADMIN_TOKEN;

  const providedToken =
    request.headers.get("x-admin-token");

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

  // Fail closed if Redis is unavailable.
  if (!discoveryLimiter) {
    return NextResponse.json(
      { error: "Rate limiting is not configured." },
      { status: 503 }
    );
  }

const contentLength = request.headers.get("content-length");

if (contentLength && Number(contentLength) > 15000) {
  return NextResponse.json(
    { error: "Request body is too large." },
    { status: 413 }
  );
}

let body: unknown;

try {
  body = await request.json();
} catch {
  return NextResponse.json(
    { error: "Invalid JSON request body." },
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
const sourceText = input.sourceText;
const sourceUrl = input.sourceUrl;

const sourceReviewed = input.sourceReviewed;

if (sourceReviewed !== true) {
  return NextResponse.json(
    {
      error:
        "Source must be manually reviewed before candidate storage.",
    },
    { status: 400 }
  );
}

if (
  typeof sourceText !== "string" ||
  sourceText.trim().length < 50 ||
  sourceText.length > 10000 ||
  typeof sourceUrl !== "string" ||
  sourceUrl.length > 2048
) {
  return NextResponse.json(
    { error: "Provide valid sourceText and sourceUrl." },
    { status: 400 }
  );
}

try {
  const url = new URL(sourceUrl);

  if (
    url.protocol !== "https:" ||
    !url.hostname.includes(".") ||
    url.username ||
    url.password
  ) {
    throw new Error("Invalid source URL");
  }
} catch {
  return NextResponse.json(
    { error: "Provide a valid HTTPS source URL." },
    { status: 400 }
  );
}

  try {
    const result = await discoveryLimiter.limit(
      "admin-discovery"
    );

    if (!result.success || result.reason) {
      return NextResponse.json(
        { error: "Discovery rate limit reached." },
        { status: 429 }
      );
    }

const extractedResource = await extractResource(
  sourceText.trim(),
  sourceUrl.trim()
);

const validatedResource = validateResource(extractedResource);

if (!validatedResource) {
  return NextResponse.json(
    { error: "Groq returned invalid or incomplete resource data." },
    { status: 422 }
  );
}

const duplicateCheck = await checkResourceDuplicate(
  validatedResource.name,
  validatedResource.organization
);

if (duplicateCheck.isDuplicate) {
  return NextResponse.json({
    status: "needs_review",
    resource: validatedResource,
    duplicate: duplicateCheck,
    sourceUrl: sourceUrl.trim(),
    remaining: result.remaining,
    message: "Potential duplicate found. Candidate was not saved.",
  });
}

const savedCandidate = await saveResourceCandidate(
  validatedResource,
  sourceUrl.trim()
);

return NextResponse.json({
  status: "pending_review",
  candidate: savedCandidate,
  duplicate: duplicateCheck,
  remaining: result.remaining,
  message: "Resource candidate saved for manual review.",
});
  } catch (error) {
  console.error(
    "Resource discovery failed:",
    error instanceof Error ? error.message : "Unknown error"
  );

  return NextResponse.json(
    { error: "Resource discovery failed. Check server logs." },
    { status: 500 }
  );
}
}