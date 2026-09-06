import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Boxes,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  Compass,
  Download,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  Users,
} from "lucide-react";
import BrochureGate from "@/components/BrochureGate";

const stages = [
  [
    Lightbulb,
    "Idea & Opportunity",
    "Explore problems worth solving and identify high-potential opportunities.",
  ],
  [
    Users,
    "Customer Validation",
    "Validate the problem, solution and customer with research and conversations.",
  ],
  [
    Boxes,
    "Business Model",
    "Craft the value proposition, revenue model and go-to-market logic.",
  ],
  [
    Code2,
    "MVP Build",
    "Build a lean MVP and test core assumptions with real users.",
  ],
  [
    Rocket,
    "Pilot Launch",
    "Run a pilot, gather feedback and iterate for product-market fit.",
  ],
  [
    BarChart3,
    "Traction & Learning",
    "Measure signals, objections and repeat behaviour.",
  ],
  [
    TrendingUp,
    "Scale & Production",
    "Prepare operations, finance and growth systems.",
  ],
] as const;
const benefits = [
  [Compass, "Real venture projects"],
  [Users, "Mentor review gates"],
  [BookOpenCheck, "Tools and frameworks"],
  [Sparkles, "Peer feedback"],
  [BadgeCheck, "Versioned evidence"],
] as const;

export default function EntrepreneurshipLanding() {
  return (
    <main className="venture-golden">
      <section className="vg-hero shell">
        <div className="vg-copy">
          <div className="vg-crumb">
            Home <ArrowRight /> Programs <ArrowRight /> Venture Builder
          </div>
          <span className="vg-pill">
            PRACTICAL · MENTOR-LED · OUTCOMES-DRIVEN
          </span>
          <h1>
            Entrepreneurship
            <br />
            <em>Venture Builder</em>
          </h1>
          <h2>From idea to validation, MVP, launch and scale.</h2>
          <p>
            A hands-on venture building program that helps founders turn
            meaningful problems into validated, investable and scalable
            businesses with structured mentor support.
          </p>
          <div className="actions">
            <Link href="/venture-builder/idea" className="btn primary">
              Apply for next cohort <ArrowRight />
            </Link>
            <BrochureGate
              slug="entrepreneurship"
              brochure="/brochures/entrepreneurship.pdf"
            />
          </div>
          <div className="vg-signals">
            <div>
              <BriefcaseBusiness />
              <span>
                <b>Applied program</b>
                <small>Real venture evidence</small>
              </span>
            </div>
            <div>
              <Users />
              <span>
                <b>Mentor-led</b>
                <small>Structured checkpoints</small>
              </span>
            </div>
            <div>
              <Trophy />
              <span>
                <b>Outcome-driven</b>
                <small>Seven review gates</small>
              </span>
            </div>
            <div>
              <BadgeCheck />
              <span>
                <b>Auditable</b>
                <small>Versioned history</small>
              </span>
            </div>
          </div>
        </div>
        <div className="vg-photo">
          <Image
            src="/reference-assets/venture-builder-workshop-v2.png"
            alt="Founder workshop led by a venture mentor"
            fill
            priority
            sizes="60vw"
          />
        </div>
        <aside className="vg-promise">
          <h3>
            Build. Validate.
            <br />
            Launch. Scale.
          </h3>
          <p>A proven seven-stage system from idea to sustainable growth.</p>
          {benefits.map(([Icon, label]) => (
            <div key={label}>
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </aside>
      </section>
      <section className="vg-journey shell">
        <header>
          <h2>The 7-Stage Venture Building Journey</h2>
          <p>A structured path from idea to scalable impact.</p>
        </header>
        <div className="vg-stage-row">
          {stages.map(([Icon, title, description], i) => (
            <article key={title}>
              <i>{i + 1}</i>
              <Icon />
              <h3>{title}</h3>
              <p>{description}</p>
              <span />
            </article>
          ))}
        </div>
      </section>
      <section className="vg-value shell">
        <div className="vg-mentors">
          <header>
            <div>
              <h2>Learn from experienced mentors & founders</h2>
              <p>
                Review-led guidance across product, growth, finance and
                execution.
              </p>
            </div>
            <Link href="/about">
              View all mentors <ArrowRight />
            </Link>
          </header>
          <div className="vg-mentor-grid">
            {[
              [
                "RG",
                "Venture strategy",
                "Business model and founder readiness",
              ],
              ["MI", "Product & growth", "Customer evidence and GTM"],
              ["AN", "Investment readiness", "Finance and pitch narrative"],
              ["SK", "Brand & storytelling", "Positioning and market clarity"],
            ].map((x) => (
              <article key={x[0]}>
                <i>{x[0]}</i>
                <b>{x[1]}</b>
                <span>{x[2]}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="vg-audience">
          <h2>Who is this program for?</h2>
          {[
            ["Aspiring founders with a meaningful problem", Lightbulb],
            ["Professionals planning a new venture", BriefcaseBusiness],
            ["Early-stage teams preparing to validate", Users],
            ["Students and innovators building evidence", Sparkles],
          ].map(([t, I]: any) => (
            <p key={t}>
              <I />
              {t}
            </p>
          ))}
        </div>
        <div className="vg-outcomes">
          <h2>What you will walk away with</h2>
          {[
            "Validated problem–solution fit",
            "A clear business model and GTM plan",
            "A working MVP or prototype",
            "Early traction metrics and learning loop",
            "A pitch-ready evidence record",
          ].map((x) => (
            <p key={x}>
              <CheckCircle2 />
              {x}
            </p>
          ))}
          <Target />
        </div>
      </section>
      <section className="vg-lower shell">
        <div className="vg-brochure">
          <Download />
          <div>
            <h2>Everything you need to build an impactful venture</h2>
            <p>Explore curriculum, mentor review gates, tools and outcomes.</p>
            <BrochureGate
              slug="entrepreneurship"
              brochure="/brochures/entrepreneurship.pdf"
            />
          </div>
        </div>
        <div className="vg-highlights">
          <h2>Cohort highlights</h2>
          {[
            [Clock3, "Structured cadence"],
            [Users, "Project-based learning"],
            [Target, "1:1 mentor guidance"],
            [Trophy, "Founder showcase"],
          ].map(([I, t]: any) => (
            <div key={t}>
              <I />
              <b>{t}</b>
            </div>
          ))}
        </div>
        <div className="vg-next">
          <h2>Next cohort starts soon</h2>
          <p>Submit your idea to begin the review process.</p>
          <Link href="/venture-builder/idea" className="btn primary">
            Apply for next cohort <ArrowRight />
          </Link>
        </div>
      </section>
      <section className="vg-trust shell">
        <span>Built for founders integrating with real business systems</span>
        <div>CRM</div>
        <div>SharePoint</div>
        <div>Jira</div>
        <div>ServiceNow</div>
        <div>Analytics</div>
        <div>Legacy platforms</div>
      </section>
      <section className="vg-cta shell">
        <div>
          <h2>Start your entrepreneurial journey with SamkhyaAcademy</h2>
          <p>
            Hands-on learning. Real-world tools. Mentor support. Reviewable
            outcomes.
          </p>
        </div>
        <Link href="/venture-builder/idea" className="btn">
          Talk to a program advisor <ArrowRight />
        </Link>
      </section>
    </main>
  );
}
