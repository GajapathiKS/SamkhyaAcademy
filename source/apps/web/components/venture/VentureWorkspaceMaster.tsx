import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Circle,
  FileText,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Rocket,
  Send,
  Settings,
  Target,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";

const tasks = [
  ["Define customer segments and hypotheses", "May 10", true],
  ["Draft interview guide", "May 12", true],
  ["Conduct at least 15 customer interviews", "May 20", true],
  ["Synthesise insights and update key assumptions", "May 24", false],
  ["Create persona sheet", "May 24", false],
  ["Summarise validation findings", "May 26", false],
] as const;
const artifacts = [
  ["Problem Statement", "Clarify the top farmer problem", "Completed"],
  [
    "15 Customer Interviews",
    "Interview evidence and key takeaways",
    "Completed",
  ],
  ["Persona Sheet", "Represent target user groups", "Completed"],
  ["Validation Summary", "Insights and updated assumptions", "In progress"],
] as const;
export function VentureWorkspaceMaster() {
  return (
    <main className="vwm">
      <aside className="vwm-nav">
        <span>VENTURE BUILDER</span>
        {[
          ["Overview", Target],
          ["Journey", Rocket],
          ["Artifacts", FileText],
          ["Mentors", Users],
          ["Community", MessageSquare],
          ["Pitch Room", Trophy],
          ["Settings", Settings],
        ].map(([t, I]: any) => (
          <div className={t === "Overview" ? "active" : ""} key={t}>
            <I />
            {t}
          </div>
        ))}
        <section>
          <HelpCircle />
          <b>Need help?</b>
          <p>Talk to your program advisor</p>
          <button className="btn">
            Chat now <ArrowRight />
          </button>
        </section>
        <section>
          <Lightbulb />
          <b>7-Stage Venture Builder</b>
          <p>Cohort May 2025</p>
          <i>
            <em />
          </i>
          <small>Stage 2 of 7</small>
        </section>
      </aside>
      <section className="vwm-main">
        <div className="vwm-crumb">
          Venture Builder <ArrowRight /> My Venture Workspace
        </div>
        <header className="vwm-head">
          <div className="vwm-logo">🌱</div>
          <div>
            <h1>AgriPulse</h1>
            <p>Smart crop advisory for small farmers.</p>
            <span>Team Agripreneurs</span>
            <span>Cohort May 2025</span>
          </div>
          <div className="vwm-team">
            <i>AR</i>
            <i>NS</i>
            <i>MI</i>
            <i>RB</i>
            <b>+2</b>
          </div>
          <button className="btn">
            <UserPlus /> Invite teammates
          </button>
        </header>
        <div className="vwm-stages">
          {[
            "Idea & Opportunity",
            "Customer Validation",
            "Business Model",
            "MVP Build",
            "Pilot Launch",
            "Traction & Learning",
            "Scale & Production",
          ].map((x, i) => (
            <div className={i === 1 ? "active" : i === 0 ? "done" : ""} key={x}>
              <i>{i === 0 ? <Check /> : i + 1}</i>
              <b>{x}</b>
            </div>
          ))}
        </div>
        <div className="vwm-content">
          <section className="vwm-panel">
            <h3>
              <i>1</i> Current Stage Tasks
            </h3>
            {tasks.map(([t, d, done]) => (
              <div className="vwm-task" key={t}>
                <i>{done ? <Check /> : <Circle />}</i>
                <b>{t}</b>
                <span>{d}</span>
              </div>
            ))}
            <footer>
              All tasks <b>3 / 6 completed</b>
              <a>
                View full checklist <ArrowRight />
              </a>
            </footer>
            <div className="vwm-submit">
              <h3>Ready for mentor review?</h3>
              <p>
                Make sure required artifacts are complete and tasks are up to
                date.
              </p>
              <button className="btn primary">
                Submit for mentor review <ArrowRight />
              </button>
            </div>
          </section>
          <section className="vwm-panel">
            <h3>
              <i>2</i> Required Artifacts{" "}
              <a>
                View all <ArrowRight />
              </a>
            </h3>
            {artifacts.map(([t, d, s], i) => (
              <article className="vwm-artifact" key={t}>
                {i === 3 ? <BarChart3 /> : <FileText />}
                <div>
                  <b>{t}</b>
                  <p>{d}</p>
                </div>
                <span>{s}</span>
              </article>
            ))}
          </section>
          <section className="vwm-panel">
            <h3>
              <i>3</i> Mentor Feedback
            </h3>
            <div className="vwm-mentor">
              <i>RB</i>
              <span>
                <b>Raghav Bansal</b>
                <small>Venture Mentor · Active</small>
              </span>
            </div>
            <article className="vwm-message">
              <small>May 20, 2025 · 10:30 AM</small>
              <p>
                Great progress on the interviews. To strengthen validation,
                capture specific pain points, willingness to pay, and patterns
                across user groups.
              </p>
              <button>Like</button>
              <button>Reply</button>
            </article>
            <div className="vwm-mentor">
              <i>MI</i>
              <span>
                <b>Meera Iyer (You)</b>
                <small>Team Lead</small>
              </span>
            </div>
            <article className="vwm-message">
              <p>
                Thanks Raghav. We’ll incorporate these insights into the
                validation summary.
              </p>
            </article>
            <label>
              <input placeholder="Write a message…" />
              <Send />
            </label>
          </section>
        </div>
        <div className="vwm-resources">
          <b>Stage 2 Resources</b>
          {[
            ["Interview Guide Template", FileText],
            ["Validation Playbook", BookOpen],
            ["Top 10 Questions to Ask", HelpCircle],
            ["Customer Discovery 101", Rocket],
          ].map(([t, I]: any) => (
            <div key={t}>
              <I />
              {t}
            </div>
          ))}
        </div>
      </section>
      <aside className="vwm-right">
        <section>
          <h3>What happens next</h3>
          {[
            ["Submit", FileText],
            ["Mentor Review", Target],
            ["Approved or changes", Trophy],
            ["Move to next stage", Rocket],
          ].map(([t, I]: any) => (
            <div key={t}>
              <I />
              <span>
                <b>{t}</b>
                <small>Stage evidence and decision</small>
              </span>
            </div>
          ))}
        </section>
        <section>
          <h3>Your Progress at a Glance</h3>
          {[
            ["15 / 15", "Interviews completed", Users],
            ["7 / 10", "Assumptions validated", Target],
            ["May 28", "Next review date", FileText],
            ["On Track", "Stage status", BarChart3],
          ].map(([n, t, I]: any) => (
            <div key={t}>
              <I />
              <span>
                <b>{n}</b>
                <small>{t}</small>
              </span>
            </div>
          ))}
        </section>
      </aside>
    </main>
  );
}
