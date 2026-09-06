import Image from "next/image";
import Link from "next/link";
import BrochureGate from "@/components/BrochureGate";
import EnrollButton from "@/components/EnrollButton";
import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Gauge,
  Lightbulb,
  LockKeyhole,
  Orbit,
  Radio,
  Rocket,
  Satellite,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

const visuals: Record<
  string,
  {
    symbol: string;
    image?: string;
    accent: string;
    headline: string;
    dark: boolean;
  }
> = {
  "ai-engineering": {
    symbol: "AI",
    image: "/brochures/assets/ai-engineering-hero.jpg",
    accent: "#55e9bd",
    headline: "From AI user to production AI engineer.",
    dark: true,
  },
  "ai-leadership": {
    symbol: "90",
    image: "/brochures/assets/ai-leadership-hero.jpg",
    accent: "#ca9a37",
    headline: "Turn AI ambition into enterprise outcomes.",
    dark: false,
  },
  "applied-ml-engineering": {
    symbol: "ML",
    accent: "#8b7cff",
    headline:
      "From fundamentals to production ML, CV, NLP and LLM engineering.",
    dark: true,
  },
  "full-stack": {
    symbol: "</>",
    image: "/brochures/assets/full-stack-hero.jpg",
    accent: "#50e4a6",
    headline: "Become a full-stack developer. Build. Ship. Scale.",
    dark: true,
  },
  "data-analytics": {
    symbol: "↗",
    image: "/brochures/assets/data-analytics-hero.jpg",
    accent: "#44dfb1",
    headline: "From raw data to reliable, decision-ready insight.",
    dark: true,
  },
  cybersecurity: {
    symbol: "◇",
    image: "/brochures/assets/cybersecurity-hero.jpg",
    accent: "#53e6be",
    headline: "Build security judgment. Secure what matters.",
    dark: true,
  },
  "space-tech": {
    symbol: "◉",
    image: "/brochures/assets/space-tech-hero.jpg",
    accent: "#a1e85a",
    headline: "From curiosity to flight-ready systems.",
    dark: true,
  },
  entrepreneurship: {
    symbol: "V",
    image: "/brochures/assets/entrepreneurship-hero.jpg",
    accent: "#087f76",
    headline: "From idea to impactful venture. Build. Validate. Scale.",
    dark: false,
  },
};

const programTech: Record<
  string,
  { icons: Array<typeof Code2>; labels: string[] }
> = {
  "ai-engineering": {
    icons: [BrainCircuit, Workflow, ShieldCheck, BriefcaseBusiness],
    labels: ["LLM SYSTEMS", "AGENTS", "EVALUATION", "ENTERPRISE"],
  },
  "ai-leadership": {
    icons: [Target, Users, ShieldCheck, BarChart3],
    labels: ["STRATEGY", "PEOPLE", "GOVERNANCE", "VALUE"],
  },
  "applied-ml-engineering": {
    icons: [Database, BrainCircuit, Sparkles, Gauge],
    labels: ["DATA", "TRAIN", "ADAPT", "MLOPS"],
  },
  "full-stack": {
    icons: [Code2, Server, Database, Workflow],
    labels: ["UI", "API", "DATA", "DEPLOY"],
  },
  "data-analytics": {
    icons: [Database, BarChart3, Workflow, Target],
    labels: ["QUERY", "MODEL", "VISUALIZE", "DECIDE"],
  },
  cybersecurity: {
    icons: [LockKeyhole, ShieldCheck, Workflow, Gauge],
    labels: ["IDENTITY", "PROTECT", "RESPOND", "VERIFY"],
  },
  "space-tech": {
    icons: [Satellite, Orbit, Radio, Gauge],
    labels: ["SYSTEM", "ORBIT", "TELEMETRY", "MISSION"],
  },
  entrepreneurship: {
    icons: [Lightbulb, Users, Rocket, BarChart3],
    labels: ["IDEA", "VALIDATE", "LAUNCH", "SCALE"],
  },
};

export default function ProgramPage({
  course,
  projection,
}: {
  course: any;
  projection: any;
}) {
  const v = visuals[course.slug] || visuals["full-stack"];
  const modules = Array.isArray(projection?.modules) ? projection.modules : [];
  const durationText =
    course.durationText ||
    projection?.durationText ||
    "Current schedule on program page";
  const outcomes = (
    Array.isArray(projection?.outcomes) && projection.outcomes.length
      ? projection.outcomes
      : [
          "Build practical role-ready capability",
          "Apply concepts in realistic projects",
          "Explain decisions and trade-offs",
          "Complete published assessment criteria",
        ]
  ).slice(0, 4);
  const audience = (
    Array.isArray(projection?.audience) && projection.audience.length
      ? projection.audience
      : [
          "Learners building role-ready capability",
          "Professionals strengthening applied skills",
          "Teams developing shared delivery standards",
        ]
  ).slice(0, 4);
  const tools = (
    Array.isArray(projection?.tools) && projection.tools.length
      ? projection.tools
      : [
          "Structured lessons",
          "Applied projects",
          "Assessment",
          "Learner workspace",
          "Review checkpoints",
          "Verification",
        ]
  ).slice(0, 8);
  const tech = programTech[course.slug] || programTech["full-stack"];
  return (
    <main
      className={`program-ref program-${course.slug} ${v.dark ? "program-dark" : "program-light"}`}
      style={{ "--program-accent": v.accent } as React.CSSProperties}
    >
      <section className="program-ref-hero">
        <div className="shell program-ref-hero-grid">
          <div>
            <span className="program-kicker">
              {course.category} · {course.level || "Professional program"}
            </span>
            <h1>{v.headline}</h1>
            <p>{course.shortDescription}</p>
            <div className="program-meta">
              <span>◷ {durationText}</span>
              <span>◎ {String(course.contentType).replaceAll("_", " ")}</span>
              <span>◇ Verified completion criteria</span>
            </div>
            <div className="actions">
              <EnrollButton
                courseId={course.id}
                accessType={course.accessType}
                pricingCategory={course.pricingCategory}
                pricePaise={
                  course.salePricePaise ??
                  course.pricePaise ??
                  course.listPricePaise
                }
                currency={course.currency}
              />
              {course.brochurePath && (
                <BrochureGate
                  slug={course.slug}
                  brochure={course.brochurePath}
                />
              )}
            </div>
          </div>
          <div className="program-ref-art">
            {v.image ? (
              <Image
                src={v.image}
                alt=""
                fill
                priority
                sizes="(max-width:900px) 100vw, 46vw"
              />
            ) : (
              <div className="program-orbit">
                <i>{v.symbol}</i>
                {["DATA", "TRAIN", "EVALUATE", "SERVE"].map((x) => (
                  <b key={x}>{x}</b>
                ))}
              </div>
            )}
            <div className="program-art-label">
              <small>APPLIED PATH</small>
              <b>{v.symbol}</b>
              <span>Learn → Build → Prove</span>
            </div>
            <div className="program-signal-map">
              {tech.icons.slice(0, 3).map((Icon, index) => (
                <div key={tech.labels[index]}>
                  <Icon />
                  <span>{tech.labels[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="shell program-value-strip">
          {outcomes.map((x: string, i: number) => (
            <div key={x}>
              <i>{String(i + 1).padStart(2, "0")}</i>
              <span>{x}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="program-ref-section">
        <div className="shell">
          <div className="program-section-head">
            <span>SHARED FOUNDATION</span>
            <h2>The capabilities the role actually needs.</h2>
            <p>{course.description || course.shortDescription}</p>
          </div>
          <div className="program-capability-grid">
            {outcomes.map((x: string, i: number) => {
              const Icon = tech.icons[i];
              return (
                <article key={x}>
                  <i>
                    <Icon />
                  </i>
                  <div>
                    <b>{x}</b>
                    <span>
                      Concepts, deliberate practice and review are connected in
                      one learning record.
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="program-journey">
            <div>
              <span>START</span>
              <b>Readiness</b>
            </div>
            <i>→</i>
            <div>
              <span>LEARN</span>
              <b>Foundation</b>
            </div>
            <i>→</i>
            <div>
              <span>BUILD</span>
              <b>Applied work</b>
            </div>
            <i>→</i>
            <div>
              <span>PROVE</span>
              <b>Assessment</b>
            </div>
            <i>→</i>
            <div>
              <span>ADVANCE</span>
              <b>Next outcome</b>
            </div>
          </div>
        </div>
      </section>
      <section className="program-ref-section program-curriculum">
        <div className="shell">
          <div className="program-section-head">
            <span>CORE PROGRAM</span>
            <h2>The complete curriculum journey.</h2>
            <p>
              Current BRD-aligned modules, practice checkpoints and
              role-specific tools.
            </p>
          </div>
          <div className="program-curriculum-layout">
            <div className="program-module-list">
              {modules.map((m: any, i: number) => {
                const ModuleIcon = tech.icons[i % tech.icons.length];
                return (
                  <article key={m.id || m.title}>
                    <i>
                      <ModuleIcon />
                      <small>{String(i + 1).padStart(2, "0")}</small>
                    </i>
                    <div>
                      <b>{m.title}</b>
                      <span>
                        {m.description ||
                          `${m.lessons?.length || 0} lessons and applied activities`}
                      </span>
                    </div>
                    <small>{m.lessons?.length || 0} lessons</small>
                  </article>
                );
              })}
            </div>
            <aside className="program-tool-board">
              <span>TOOLS & PRACTICE</span>
              <div>
                {tools.map((x: string, i: number) => (
                  <b key={x}>
                    <i>{v.symbol}</i>
                    {x}
                  </b>
                ))}
              </div>
              <section>
                <small>CAPSTONE DIRECTION</small>
                <h3>
                  Build a role-relevant outcome from problem framing through
                  evidence and review.
                </h3>
                <ul>
                  <li>Realistic problem and constraints</li>
                  <li>Applied implementation or decision artifact</li>
                  <li>Review, iteration and completion record</li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </section>
      <section className="program-ref-section program-outcomes">
        <div className="shell">
          <div className="program-section-head">
            <span>OUTCOMES & BEYOND</span>
            <h2>Build skill. Build confidence. Build evidence.</h2>
          </div>
          <div className="program-outcome-grid">
            <div className="program-audience">
              <h3>Ideal participants</h3>
              {audience.map((x: string, i: number) => (
                <div key={x}>
                  <i>{i + 1}</i>
                  <span>{x}</span>
                </div>
              ))}
            </div>
            <div className="program-projects">
              <h3>What you will demonstrate</h3>
              {outcomes.map((x: string, i: number) => (
                <article key={x}>
                  <div>
                    {v.symbol}
                    <small>{String(i + 1).padStart(2, "0")}</small>
                  </div>
                  <b>{x}</b>
                  <span>
                    Documented, reviewable and connected to the published
                    outcome.
                  </span>
                </article>
              ))}
            </div>
            <div className="program-join">
              <span>NEXT STEP</span>
              <h3>Explore the current schedule and access options.</h3>
              <p>
                No unsupported placement or performance promises. Current fees
                and availability are shown before checkout.
              </p>
              <Link
                href={`/courses/${course.slug}#enroll`}
                className="btn primary"
              >
                View enrollment →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
