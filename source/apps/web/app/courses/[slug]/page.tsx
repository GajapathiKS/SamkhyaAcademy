import { prisma } from "@samkhya/db";
import { notFound } from "next/navigation";
import EnrollButton from "@/components/EnrollButton";
import ProgramPage from "@/components/academy/ProgramPage";
import { uxCourseBySlug } from "@/lib/uxCatalog";
export const dynamic = "force-dynamic";

function CheckoutState({ course }: { course: any }) {
  const price =
    course.salePricePaise ?? course.pricePaise ?? course.listPricePaise ?? 0;
  return (
    <main className="checkout-ref">
      <div className="checkout-card">
        <header>
          <div className="brand">
            <span className="brand-mark">⌁</span>
            <span className="brand-word">
              Samkhya<span>Academy</span>
            </span>
          </div>
          <span>SECURE TEST CHECKOUT</span>
        </header>
        <div className="checkout-grid">
          <section>
            <span className="dash-kicker">ORDER SUMMARY</span>
            <h1>Complete your enrollment.</h1>
            <div className="checkout-course">
              <i>AI</i>
              <div>
                <b>{course.title}</b>
                <span>
                  Full program access · Learner workspace · Published completion
                  criteria
                </span>
              </div>
            </div>
            <div className="checkout-price">
              <span>Program fee</span>
              <b>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: course.currency,
                  maximumFractionDigits: 0,
                }).format(price / 100)}
              </b>
            </div>
            <div className="checkout-price">
              <span>Taxes</span>
              <b>Calculated by payment provider</b>
            </div>
            <div className="checkout-total">
              <span>Amount due</span>
              <strong>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: course.currency,
                  maximumFractionDigits: 0,
                }).format(price / 100)}
              </strong>
            </div>
          </section>
          <aside>
            <span>RAZORPAY TEST MODE</span>
            <h2>Payment handoff</h2>
            <p>
              The academy creates an idempotent payment order, then opens the
              signed Razorpay test checkout. No live charge occurs in this
              environment.
            </p>
            <label>
              Email
              <input defaultValue="learner@samkhyaacademy.local" />
            </label>
            <label>
              Mobile
              <input defaultValue="+91 90000 00000" />
            </label>
            <button className="btn primary">
              Continue to secure payment →
            </button>
            <small>
              🔒 Signed checkout · Idempotent webhook · Enrollment after
              verified payment
            </small>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { slug } = await params;
  const q = await searchParams;
  const c = process.env.UX_CAPTURE_MODE === "1"
    ? uxCourseBySlug(slug)
    : await prisma.course.findUnique({
        where: { slug },
        include: { publishedProjection: true },
      });
  if (!c) notFound();
  if (q.checkout === "1") return <CheckoutState course={c} />;
  const p = (c.publishedProjection?.projection || {}) as any;
  const professional = [
    "ai-engineering",
    "ai-leadership",
    "applied-ml-engineering",
    "full-stack",
    "data-analytics",
    "cybersecurity",
    "space-tech",
    "entrepreneurship",
  ];
  if (professional.includes(c.slug))
    return <ProgramPage course={c} projection={p} />;
  const modules = Array.isArray(p.modules) ? p.modules : [];
  return (
    <>
      <section className="catalog-hero compact">
        <div className="shell">
          <span className="ref-kicker">FREE PROGRAMMING FOUNDATION</span>
          <h1>{c.title}</h1>
          <p>{c.shortDescription}</p>
          <div className="actions">
            <EnrollButton
              courseId={c.id}
              accessType={c.accessType}
              pricingCategory={c.pricingCategory}
              pricePaise={c.salePricePaise ?? c.pricePaise ?? c.listPricePaise}
              currency={c.currency}
            />
          </div>
        </div>
      </section>
      <section className="catalog-section">
        <div className="shell">
          <div className="program-section-head">
            <span>COURSE JOURNEY</span>
            <h2>Learn the foundations by building.</h2>
          </div>
          <div className="catalog-course-grid">
            {modules.map((m: any, i: number) => (
              <article key={m.id || `${m.title}-${i}`}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <small>{m.lessons?.length || 0} lessons</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
