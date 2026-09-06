import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  Hammer,
  Layers3,
  Rocket,
  Satellite,
  School,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories: Array<[LucideIcon, string, string]> = [
  [BrainCircuit, "Artificial Intelligence", "FDE, applied ML and leadership"],
  [Code2, "Full-Stack Development", "Frontend, backend and delivery"],
  [ChartNoAxesCombined, "Data Analytics", "SQL, Python, BI and decisions"],
  [Cpu, "Applied Machine Learning", "Models, multimodal AI and MLOps"],
  [ShieldCheck, "Cybersecurity", "Identity, apps and response"],
  [Rocket, "Venture Builder", "Validate, build, launch and scale"],
  [Satellite, "Space Technology", "Systems, avionics and missions"],
  [Compass, "Leadership & Strategy", "Priorities, governance and execution"],
];
const paths: Array<[string, string, string, LucideIcon]> = [
  [
    "Forward Deployed AI Engineering",
    "Build reliable AI systems and own real deployment outcomes.",
    "/courses/ai-engineering",
    BrainCircuit,
  ],
  [
    "Full-Stack Developer",
    "Web foundations → frontend → backend → production.",
    "/courses/full-stack",
    Code2,
  ],
  [
    "Applied ML Engineer",
    "Data → ML → deep learning → LLM/SLM → MLOps.",
    "/courses/applied-ml-engineering",
    Cpu,
  ],
  [
    "Data Analytics",
    "Raw data → trusted analysis → decision-ready story.",
    "/courses/data-analytics",
    ChartNoAxesCombined,
  ],
  [
    "Space Technology",
    "Systems, avionics and mission-ready foundations.",
    "/courses/space-tech",
    Satellite,
  ],
];

export default function Home() {
  return (
    <main className="reference-home">
      <section className="reference-hero">
        <div className="shell reference-hero-grid">
          <div className="reference-hero-copy">
            <span className="ref-kicker">
              APPLIED LEARNING FOR ENGINEERS, LEADERS & FOUNDERS
            </span>
            <h1>
              Build Future-Ready Skills.
              <em>For You. For Your Team. For Tomorrow.</em>
            </h1>
            <p>
              One academy for practical courses, guided programs, venture
              building and organization learning - with progress, assessment and
              verification built in.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/courses">
                Explore Courses <b>→</b>
              </Link>
              <Link className="btn" href="/learning-paths">
                View Learning Paths <b>→</b>
              </Link>
            </div>
            <div className="reference-trust">
              <div>
                <i>
                  <UserRoundCheck />
                </i>
                <b>Expert-led</b>
                <span>Role-based guidance</span>
              </div>
              <div>
                <i>
                  <Hammer />
                </i>
                <b>Hands-on</b>
                <span>Learn by building</span>
              </div>
              <div>
                <i>
                  <BadgeCheck />
                </i>
                <b>Verified</b>
                <span>Assessment records</span>
              </div>
              <div>
                <i>
                  <Layers3 />
                </i>
                <b>Flexible</b>
                <span>Online, hybrid, offline</span>
              </div>
            </div>
          </div>
          <div className="reference-hero-image">
            <Image
              src="/reference-assets/academy-home-hero.png"
              alt="Learner working with analytics and code in the approved academy workspace"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div className="reference-data-card">
              <small>LEARNING WORKSPACE</small>
              <strong>Practice → Evidence → Outcome</strong>
              <div>
                <span style={{ width: "78%" }} />
                <span style={{ width: "58%" }} />
                <span style={{ width: "88%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="reference-mosaic">
        <div className="shell">
          <div className="mosaic-grid">
            <div className="mosaic-block categories">
              <div className="compact-head">
                <h2>Explore by Category</h2>
                <Link href="/courses">View all →</Link>
              </div>
              <div className="category-grid">
                {categories.map(([Icon, title, copy]) => (
                  <Link
                    href={
                      title === "Venture Builder"
                        ? "/entrepreneurship"
                        : "/courses"
                    }
                    key={title}
                  >
                    <i>
                      <Icon />
                    </i>
                    <b>{title}</b>
                    <span>{copy}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mosaic-block orgs">
              <h2>Built for Organizations That Train</h2>
              {(
                [
                  [
                    School,
                    "Schools & Universities",
                    "Cohorts, assignments and certificates",
                  ],
                  [
                    BriefcaseBusiness,
                    "Businesses & Teams",
                    "Role paths, progress and reports",
                  ],
                  [
                    GraduationCap,
                    "Bootcamps & Training",
                    "Batches, hybrid delivery and exams",
                  ],
                ] as Array<[LucideIcon, string, string]>
              ).map(([Icon, title, copy]) => (
                <div className="org-row" key={String(title)}>
                  <i>
                    <Icon />
                  </i>
                  <div>
                    <b>{String(title)}</b>
                    <span>✓ {String(copy)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mosaic-block builder">
              <div className="compact-head">
                <h2>Learning Path Builder</h2>
                <span className="micro-badge">GUIDED</span>
              </div>
              <div className="builder-step">
                <i>1</i>
                <div>
                  <b>Choose your goal</b>
                  <span>Engineering · Data · Security · Founder</span>
                </div>
              </div>
              <div className="builder-step">
                <i>2</i>
                <div>
                  <b>Match your starting point</b>
                  <span>Foundation · Intermediate · Advanced</span>
                </div>
              </div>
              <div className="builder-step">
                <i>3</i>
                <div>
                  <b>Generate your practical sequence</b>
                  <span>Foundations → guided labs → portfolio evidence</span>
                </div>
              </div>
              <Link href="/learning-paths" className="btn primary">
                Build a Path →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="reference-paths">
        <div className="shell">
          <div className="compact-head">
            <h2>Featured Learning Paths</h2>
            <Link href="/learning-paths">View all learning paths →</Link>
          </div>
          <div className="path-cards">
            {paths.map(([title, copy, href, Icon]) => (
              <Link href={href} key={title}>
                <i>
                  <Icon />
                </i>
                <div>
                  <b>{title}</b>
                  <span>{copy}</span>
                  <small>Structured modules · Applied work</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="reference-lower">
        <div className="shell reference-lower-grid">
          <div className="mosaic-block">
            <div className="compact-head">
              <h2>Featured Programs</h2>
              <Link href="/programs">View all →</Link>
            </div>
            <div className="program-mini-grid">
              <Link href="/courses/ai-engineering">
                <i><BrainCircuit /></i>
                <div>
                  <b>Forward Deployed AI Engineering</b>
                  <span>AI engineering → production → enterprise outcomes</span>
                </div>
              </Link>
              <Link href="/courses/ai-leadership">
                <i><Compass /></i>
                <div>
                  <b>Forward Deployed AI Leadership</b>
                  <span>
                    Prioritize, govern and execute a practical AI portfolio
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="mosaic-block webinars-mini">
            <div className="compact-head">
              <h2>Upcoming Learning Sessions</h2>
              <Link href="/webinars">View all →</Link>
            </div>
            {[
              ["AI systems: from demo to production", "Engineering briefing"],
              ["Building a trusted analytics workflow", "Practitioner session"],
              ["Venture validation before MVP", "Founder workshop"],
            ].map((x, i) => (
              <div className="webinar-row" key={x[0]}>
                <time>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>SESSION</span>
                </time>
                <div>
                  <b>{x[0]}</b>
                  <span>{x[1]} · Schedule published on registration</span>
                </div>
                <Link href="/webinars">Register</Link>
              </div>
            ))}
          </div>
          <div className="cert-panel">
            <div>
              <span>VERIFIABLE COMPLETION</span>
              <h2>
                Build evidence.
                <br />
                Earn recognition.
              </h2>
              <p>
                Certificates are issued only after the published learning and
                assessment criteria are met.
              </p>
              <Link href="/certificates" className="btn">
                Explore Verification →
              </Link>
            </div>
            <i>◇</i>
          </div>
        </div>
      </section>
      <section className="reference-proof">
        <div className="shell">
          {[
            ["3", "Free foundations"],
            ["8", "Professional programs"],
            ["3", "Delivery modes"],
            ["7", "Venture stages"],
            ["1", "Unified learner record"],
          ].map((x) => (
            <div key={x[1]}>
              <strong>{x[0]}</strong>
              <span>{x[1]}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
