import { prisma } from "@samkhya/db";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Braces,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Cpu,
  Database,
  Filter,
  GraduationCap,
  Lightbulb,
  LockKeyhole,
  Layers3,
  Orbit,
  Radio,
  Rocket,
  Satellite,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";
import { uxCourses } from "@/lib/uxCatalog";

export const dynamic = "force-dynamic";

const categoryIcons: Record<string, typeof Bot> = {
  "Artificial Intelligence": Bot,
  "Full-Stack Development": Code2,
  "Data Analytics": BarChart3,
  Cybersecurity: ShieldCheck,
  "Space Technology": Orbit,
  Entrepreneurship: Sparkles,
  Programming: Code2,
};

const categoryVisuals: Record<
  string,
  { theme: string; icons: Array<typeof Bot>; labels: string[] }
> = {
  Programming: {
    theme: "code",
    icons: [TerminalSquare, Braces, Cpu],
    labels: ["SYNTAX", "LOGIC", "BUILD"],
  },
  "Artificial Intelligence": {
    theme: "ai",
    icons: [BrainCircuit, Workflow, Bot],
    labels: ["DATA", "MODEL", "AGENT"],
  },
  "Full-Stack Development": {
    theme: "fullstack",
    icons: [Code2, Server, Database],
    labels: ["UI", "API", "DATA"],
  },
  "Data Analytics": {
    theme: "data",
    icons: [Database, BarChart3, Workflow],
    labels: ["QUERY", "MODEL", "INSIGHT"],
  },
  Cybersecurity: {
    theme: "security",
    icons: [LockKeyhole, ShieldCheck, Workflow],
    labels: ["IDENTITY", "DEFEND", "RESPOND"],
  },
  "Space Technology": {
    theme: "space",
    icons: [Satellite, Orbit, Radio],
    labels: ["SYSTEM", "ORBIT", "MISSION"],
  },
  Entrepreneurship: {
    theme: "venture",
    icons: [Lightbulb, Boxes, Rocket],
    labels: ["IDEA", "MVP", "SCALE"],
  },
};

export default async function Courses() {
  const courses =
    process.env.UX_CAPTURE_MODE === "1"
      ? uxCourses
      : await prisma.course.findMany({
          where: { status: "PUBLISHED" },
          orderBy: [{ pricingCategory: "asc" }, { title: "asc" }],
        });
  const groups = [...new Set(courses.map((course) => course.category))];
  return (
    <main className="catalog-ref catalog-master">
      <section className="catalog-ref-hero">
        <div className="shell catalog-hero-grid">
          <div>
            <span className="ref-kicker">EXPLORE THE ACADEMY</span>
            <h1>One catalog. Multiple ways to learn.</h1>
            <p>
              Compare free foundations, preview-led professional programs and
              mentor-guided pathways by outcome, format and evidence.
            </p>
            <div className="catalog-hero-actions">
              <div className="catalog-search">
                <Search />
                <span>Search by course, role or skill</span>
                <kbd>⌘ K</kbd>
              </div>
              <button className="btn primary">
                <SlidersHorizontal /> Find my path
              </button>
            </div>
          </div>
          <div className="catalog-hero-board">
            {[
              [BookOpen, "Free foundations", "C, C++ and JavaScript"],
              [
                Layers3,
                "Professional programs",
                "Engineering, data and deep tech",
              ],
              [
                Users,
                "Mentor-guided journeys",
                "Leadership and venture building",
              ],
              [
                Trophy,
                "Verifiable outcomes",
                "Projects, assessments and certificates",
              ],
            ].map(([Icon, title, copy]: any) => (
              <div key={title}>
                <i>
                  <Icon />
                </i>
                <span>
                  <b>{title}</b>
                  <small>{copy}</small>
                </span>
                <ArrowRight />
              </div>
            ))}
          </div>
        </div>
        <div className="shell catalog-tabs">
          <span className="active">All learning</span>
          {groups.slice(0, 6).map((group) => (
            <span key={group}>{group}</span>
          ))}
        </div>
      </section>
      <section className="catalog-proof">
        <div className="shell">
          {[
            [courses.length, "published choices", GraduationCap],
            [3, "access models", Layers3],
            [3, "delivery modes", Users],
            [1, "unified learning record", Trophy],
          ].map(([value, label, Icon]: any) => (
            <div key={label}>
              <Icon />
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="catalog-ref-section">
        <div className="shell">
          <aside className="catalog-filter">
            <header>
              <Filter />
              <h3>Filter learning</h3>
              <button>Reset</button>
            </header>
            <label>
              SEARCH
              <span>
                <Search />
                Course title or skill
              </span>
            </label>
            <h4>Access</h4>
            {[
              "Free foundations",
              "Preview available",
              "Professional programs",
            ].map((item, index) => (
              <div key={item}>
                <i className={index === 0 ? "selected" : ""} />
                {item}
                <small>{index === 0 ? 3 : index === 1 ? 4 : 8}</small>
              </div>
            ))}
            <h4>Delivery</h4>
            {["Online", "Hybrid guided", "Instructor-led"].map((item) => (
              <div key={item}>
                <i />
                {item}
              </div>
            ))}
            <h4>Level</h4>
            {["Foundation", "Intermediate", "Advanced", "Executive"].map(
              (item) => (
                <div key={item}>
                  <i />
                  {item}
                </div>
              ),
            )}
          </aside>
          <div className="catalog-results">
            <div className="catalog-result-head">
              <div>
                <span>CURATED LEARNING CATALOG</span>
                <h2>{courses.length} current courses and programs</h2>
              </div>
              <div>
                <button>
                  <SlidersHorizontal /> Filters
                </button>
                <button>
                  Recommended <ChevronDown />
                </button>
              </div>
            </div>
            <div className="catalog-card-grid">
              {courses.map((course, index) => {
                const price =
                  course.salePricePaise ??
                  course.pricePaise ??
                  course.listPricePaise;
                const visual = categoryVisuals[course.category] || {
                  theme: "default",
                  icons: [
                    categoryIcons[course.category] || GraduationCap,
                    Layers3,
                    Trophy,
                  ],
                  labels: ["LEARN", "BUILD", "PROVE"],
                };
                const [Primary, Secondary, Tertiary] = visual.icons;
                const access =
                  course.pricingCategory === "FREE"
                    ? "FREE"
                    : course.pricingCategory === "FREEMIUM"
                      ? "PREVIEW"
                      : "PROFESSIONAL";
                return (
                  <Link
                    href={`/courses/${course.slug}`}
                    key={course.id}
                    className={`catalog-card catalog-theme-${visual.theme}`}
                  >
                    <div className="catalog-card-art">
                      <div className="catalog-art-top">
                        <span>{course.category}</span>
                        <b>{access}</b>
                        <em>{String(index + 1).padStart(2, "0")}</em>
                      </div>
                      <div className="catalog-tech-map">
                        <i className="primary">
                          <Primary />
                        </i>
                        <span />
                        <i>
                          <Secondary />
                        </i>
                        <span />
                        <i>
                          <Tertiary />
                        </i>
                      </div>
                      <div className="catalog-tech-labels">
                        {visual.labels.map((label) => (
                          <small key={label}>{label}</small>
                        ))}
                      </div>
                    </div>
                    <div className="catalog-card-body">
                      <div className="catalog-badges">
                        <span>{course.level}</span>
                        <span>
                          {String(course.contentType).replaceAll("_", " ")}
                        </span>
                      </div>
                      <h3>{course.title}</h3>
                      <p>{course.shortDescription}</p>
                      <div className="catalog-skill-row">
                        <span>
                          <CheckCircle2 />
                          Guided curriculum
                        </span>
                        <span>
                          <Trophy />
                          Published criteria
                        </span>
                      </div>
                      <div className="catalog-meta">
                        <span>
                          <Clock3 />
                          {String(course.contentType).replaceAll("_", " ")}
                        </span>
                        <span>
                          <BookOpen />
                          Projects & practice
                        </span>
                      </div>
                      <footer>
                        <strong>
                          {course.pricingCategory === "FREE"
                            ? "Free access"
                            : price
                              ? new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: course.currency,
                                  maximumFractionDigits: 0,
                                }).format(price / 100)
                              : "View access"}
                        </strong>
                        <b>
                          {course.pricingCategory === "FREE"
                            ? "Start learning"
                            : course.pricingCategory === "FREEMIUM"
                              ? "Start preview"
                              : "View program"}
                          <ArrowRight />
                        </b>
                      </footer>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
