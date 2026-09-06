import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  Braces,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Lightbulb,
  LockKeyhole,
  Orbit,
  Rocket,
  Radio,
  Satellite,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";

const paths = [
  {
    title: "Forward Deployed AI Engineer",
    icon: Bot,
    level: "Advanced",
    duration: "24 weeks",
    projects: "6 applied projects",
    route: "/courses/ai-engineering",
    skills: [
      "LLM systems",
      "RAG & agents",
      "Evaluation",
      "Enterprise integration",
    ],
  },
  {
    title: "Applied ML Engineer",
    icon: Sparkles,
    level: "Multi-level",
    duration: "28 weeks",
    projects: "6 applied projects",
    route: "/courses/applied-ml-engineering",
    skills: ["Classical ML", "Deep learning", "CV & NLP", "MLOps"],
  },
  {
    title: "Full-Stack Developer",
    icon: Code2,
    level: "Multi-level",
    duration: "24 weeks",
    projects: "6 portfolio builds",
    route: "/courses/full-stack",
    skills: [
      "Web foundations",
      "Frontend",
      "Backend APIs",
      "Data & deployment",
    ],
  },
  {
    title: "Data Analyst",
    icon: BarChart3,
    level: "Intermediate",
    duration: "18 weeks",
    projects: "5 business cases",
    route: "/courses/data-analytics",
    skills: ["SQL", "Python", "BI dashboards", "Decision stories"],
  },
  {
    title: "Cybersecurity Analyst",
    icon: ShieldCheck,
    level: "Foundation",
    duration: "16 weeks",
    projects: "5 security labs",
    route: "/courses/cybersecurity",
    skills: [
      "Identity",
      "Networks",
      "Application security",
      "Incident response",
    ],
  },
  {
    title: "Space Systems Engineer",
    icon: Orbit,
    level: "Multi-level",
    duration: "20 weeks",
    projects: "4 systems projects",
    route: "/courses/space-tech",
    skills: ["Systems thinking", "Avionics", "Mission design", "Verification"],
  },
  {
    title: "Entrepreneurship Venture Builder",
    icon: Rocket,
    level: "Mentor-led",
    duration: "7 stages",
    projects: "Evidence at every gate",
    route: "/entrepreneurship",
    skills: ["Idea validation", "Business model", "MVP", "Launch & traction"],
  },
];

const pathTech = [
  {
    theme: "ai",
    icons: [BrainCircuit, Workflow, Bot],
    labels: ["LLM", "RAG", "AGENT"],
  },
  {
    theme: "ml",
    icons: [Database, Sparkles, Cpu],
    labels: ["DATA", "TRAIN", "MLOPS"],
  },
  {
    theme: "fullstack",
    icons: [Code2, Server, Database],
    labels: ["UI", "API", "DATA"],
  },
  {
    theme: "data",
    icons: [Database, BarChart3, Workflow],
    labels: ["SQL", "MODEL", "STORY"],
  },
  {
    theme: "security",
    icons: [LockKeyhole, ShieldCheck, Workflow],
    labels: ["IDENTITY", "DEFEND", "RESPOND"],
  },
  {
    theme: "space",
    icons: [Satellite, Orbit, Radio],
    labels: ["SYSTEM", "ORBIT", "MISSION"],
  },
  {
    theme: "venture",
    icons: [Lightbulb, Boxes, Rocket],
    labels: ["IDEA", "MVP", "SCALE"],
  },
];

export default function LearningPathsPage() {
  return (
    <main className="paths-master">
      <section className="paths-hero">
        <div className="shell paths-hero-grid">
          <div>
            <span className="ref-kicker">
              ROLE-BASED · OUTCOME-LED · FLEXIBLE DELIVERY
            </span>
            <h1>
              Choose an outcome.
              <br />
              <em>Follow a complete path.</em>
            </h1>
            <p>
              Each path connects foundational learning, guided practice,
              realistic projects, assessment and verifiable completion—without
              forcing every learner into the same format.
            </p>
            <div className="actions">
              <Link className="btn primary" href="#paths">
                Explore learning paths <ArrowRight />
              </Link>
              <Link className="btn" href="/courses">
                Compare all courses <Braces />
              </Link>
            </div>
          </div>
          <div className="paths-map">
            <div className="paths-map-core">
              <Target />
              <b>Your role goal</b>
              <span>Start from your current level</span>
            </div>
            {[
              ["Learn", BriefcaseBusiness],
              ["Practice", Code2],
              ["Prove", Trophy],
              ["Advance", Rocket],
            ].map(([label, Icon]: any) => (
              <div className="paths-map-step" key={label}>
                <Icon />
                <b>{label}</b>
                <CheckCircle2 />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="paths-proof">
        <div className="shell">
          {[
            ["7", "complete role paths", Target],
            ["3", "delivery modes", Users],
            ["1", "unified learner record", BriefcaseBusiness],
            ["100%", "published completion criteria", Trophy],
          ].map(([value, label, Icon]: any) => (
            <div key={label}>
              <Icon />
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="paths-section" id="paths">
        <div className="shell">
          <header className="paths-section-head">
            <div>
              <span>EXPLORE BY OUTCOME</span>
              <h2>Structured enough to guide. Flexible enough to fit.</h2>
            </div>
            <p>
              Start with a free foundation, enter at your assessed level, or
              follow the complete professional journey.
            </p>
          </header>
          <div className="paths-grid">
            {paths.map((path, index) => {
              const tech = pathTech[index];
              const [Primary, Secondary, Tertiary] = tech.icons;
              return (
                <Link
                  href={path.route}
                  className={`path-master-card path-theme-${tech.theme}`}
                  key={path.title}
                >
                  <div className="path-visual">
                    <header>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <em>{path.level}</em>
                    </header>
                    <div>
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
                    <footer>
                      {tech.labels.map((label) => (
                        <small key={label}>{label}</small>
                      ))}
                    </footer>
                  </div>
                  <h3>{path.title}</h3>
                  <div className="path-meta">
                    <span>
                      <BriefcaseBusiness />
                      {path.duration}
                    </span>
                    <span>
                      <Trophy />
                      {path.projects}
                    </span>
                  </div>
                  <div className="path-skills">
                    {path.skills.map((skill) => (
                      <span key={skill}>
                        <CheckCircle2 />
                        {skill}
                      </span>
                    ))}
                  </div>
                  <footer>
                    <b>Explore path</b>
                    <ChevronRight />
                  </footer>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="paths-cta">
        <div className="shell">
          <div>
            <Sparkles />
            <span>
              <b>Not sure where to begin?</b>
              <small>
                Compare access, format, level and evidence across every course.
              </small>
            </span>
          </div>
          <Link className="btn primary" href="/courses">
            Open course catalog <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
