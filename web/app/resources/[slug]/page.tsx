import { SaveButton } from "@/components/SaveButton";
import { getResources } from "@/lib/resources";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

export async function generateStaticParams() {
  const resources = await getResources();

  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resources = await getResources();

  const resource = resources.find((item) => item.slug === slug);

  if (!resource) {
    notFound();
  }

  return (
    <section className="page-wrap detail-page">
      <Link className="back-link" href="/results">
        ← Back to results
      </Link>

      <div className="detail-heading">
        <span className="kicker">
          {resource.category.replace("-", " / ")} · {resource.county}
        </span>
        <h1>{resource.name}</h1>
        <p>{resource.organization}</p>
      </div>

      <div className="detail-grid">
        <article className="action-card">
          <span className="kicker">
            {resource.verified
              ? "VERIFIED RESOURCE"
              : resource.slug.startsWith("demo-")
                ? "DEMO RESOURCE — NOT VERIFIED"
                : "RESOURCE — DETAILS NOT YET VERIFIED"}
          </span>

          <h2>{resource.nextStep}</h2>

          {resource.slug.startsWith("demo-") ? (
            <p>
              This is a fictional demonstration listing, not a real assistance
              program.
            </p>
          ) : (
            <p>
              Contact the organization to confirm current services, eligibility,
              and availability.
            </p>
          )}

          <div className="contact-actions">
            {resource.phone && (
              <a className="button primary" href={`tel:${resource.phone}`}>
                Call {resource.phone}
              </a>
            )}

            {resource.website && (
              <a
                className="button secondary"
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit official website ↗
              </a>
            )}
          </div>

          <SaveButton resource={resource} />
        </article>

        <article className="detail-copy">
          <h2>What this service does</h2>
          <p>{resource.serviceSummary}</p>

          <h2>Why it may help</h2>
          <p>{resource.whyHelpful}</p>

          <p className="eligibility-note">
            {resource.slug.startsWith("demo-")
              ? "This is fictional demonstration data, not a real assistance program."
              : "Confirm current program eligibility, availability, and requirements directly with the organization."}
          </p>
        </article>

        <aside className="fact-sheet">
          <h2>Before you go</h2>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>Demo data — not verified</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{resource.county}</dd>
            </div>
            <div>
              <dt>Verification</dt>
              <dd>
                {resource.verified ? resource.lastVerified : "Not yet verified"}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
