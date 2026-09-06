"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Clock3,
  CloudUpload,
  Code2,
  FileCheck2,
  FileText,
  Gauge,
  Lightbulb,
  MessageSquareText,
  Rocket,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Upload,
  Users,
  WandSparkles,
} from "lucide-react";

type View =
  | "intake"
  | "intake-error"
  | "submitted"
  | "workflow"
  | "artifact"
  | "review-pending"
  | "changes"
  | "resubmit"
  | "unlocked";

const stages = [
  ["Idea & Opportunity", Lightbulb],
  ["Customer Validation", Users],
  ["Business Model", Boxes],
  ["MVP Build", Code2],
  ["Pilot Launch", Rocket],
  ["Traction & Learning", TrendingUp],
  ["Scale & Production", BarChart3],
] as const;

const artifacts = [
  ["Problem statement", "Approved", FileCheck2],
  ["Customer interview synthesis", "Approved", Users],
  ["Business model canvas", "Submitted", Boxes],
  ["MVP clickable prototype", "In review", Code2],
  ["Pilot success metrics", "Draft", Gauge],
  ["Pitch narrative", "Draft", FileText],
];

export function VentureExperiencePreview({ view }: { view: View }) {
  const changes = view === "changes" || view === "resubmit";
  const unlocked = view === "unlocked";
  const pending = view === "review-pending";
  if (view === "intake") return <Intake />;
  if (view === "intake-error") return <Intake errorState />;
  if (view === "submitted") return <Submitted />;
  return (
    <main className="vx-page">
      <div className="vx-shell">
        <VentureRail
          active={
            view === "artifact"
              ? "artifacts"
              : changes || pending || unlocked
                ? "review"
                : "workflow"
          }
        />
        <section className="vx-main">
          <div className="vx-breadcrumb">
            Home <ArrowRight /> Venture Builder <ArrowRight />{" "}
            <b>{viewLabel(view)}</b>
          </div>
          <header className="vx-titlebar">
            <div>
              <span>VENTURE BUILDER · COHORT 7</span>
              <h1>
                {view === "artifact"
                  ? "Artifacts & Launch Readiness"
                  : changes || pending || unlocked
                    ? "Mentor Review & Feedback"
                    : "Venture Workflow & Stage Progress"}
              </h1>
              <p>
                Build evidence, complete stage requirements and move forward
                through accountable mentor review.
              </p>
            </div>
            <button className="btn">
              <Upload /> Export progress
            </button>
          </header>
          <VentureIdentity
            status={
              unlocked
                ? "Stage 5 unlocked"
                : changes
                  ? "Changes requested"
                  : pending
                    ? "Under review"
                    : "MVP build · in progress"
            }
          />
          {view === "workflow" && <Workflow />}
          {view === "artifact" && <Artifacts />}
          {pending && <ReviewPending />}
          {view === "changes" && <Changes />}
          {view === "resubmit" && <Resubmit />}
          {unlocked && <Unlocked />}
        </section>
        <RightRail view={view} />
      </div>
    </main>
  );
}

function viewLabel(view: View) {
  return (
    (
      {
        workflow: "Workflow",
        artifact: "Artifacts",
        "review-pending": "Review pending",
        changes: "Changes requested",
        resubmit: "Resubmission",
        unlocked: "Stage unlocked",
      } as Record<string, string>
    )[view] || "Idea intake"
  );
}

function VentureRail({ active }: { active: string }) {
  const links = [
    ["overview", "Overview", Gauge],
    ["workflow", "Venture workflow", TrendingUp],
    ["tasks", "My tasks", ClipboardCheck],
    ["artifacts", "Artifacts & library", BriefcaseBusiness],
    ["review", "Mentor review", MessageSquareText],
    ["resources", "Learning resources", BookOpen],
  ] as const;
  return (
    <aside className="vx-rail">
      <div className="vx-program">
        <Rocket />
        <div>
          <b>
            Entrepreneurship
            <br />
            Venture Builder
          </b>
          <span>Cohort 7 · Active</span>
        </div>
      </div>
      <nav>
        {links.map(([k, label, Icon]) => (
          <div className={active === k ? "active" : ""} key={k}>
            <Icon />
            <span>{label}</span>
            {k === "tasks" && <em>4</em>}
          </div>
        ))}
      </nav>
      <div className="vx-help">
        <MessageSquareText />
        <b>Need help?</b>
        <span>Book time with your mentor or program advisor.</span>
        <button className="btn">
          Book a session <ArrowRight />
        </button>
      </div>
    </aside>
  );
}

function VentureIdentity({ status }: { status: string }) {
  return (
    <div className="vx-identity">
      <div className="vx-monogram">
        <Sparkles />
      </div>
      <div>
        <h2>StellaCare</h2>
        <p>AI-assisted early screening for women’s health</p>
      </div>
      <div className="vx-idmeta">
        <span>
          <Users /> Team of 4
        </span>
        <span>
          <MessageSquareText /> Mentor: Meera Iyer
        </span>
        <span>
          <Clock3 /> Updated today
        </span>
      </div>
      <b className="vx-status">{status}</b>
    </div>
  );
}

function StageTrack({ active = 3 }: { active?: number }) {
  return (
    <div className="vx-stage-track">
      {stages.map(([label, Icon], i) => (
        <div
          key={label}
          className={i < active ? "done" : i === active ? "active" : ""}
        >
          <i>{i < active ? <Check /> : <Icon />}</i>
          <b>{label}</b>
          <span>{i < active ? "100%" : i === active ? "60%" : "0%"}</span>
        </div>
      ))}
    </div>
  );
}

function Workflow() {
  return (
    <>
      <StageTrack />
      <div className="vx-three">
        <Card title="Current tasks">
          <Task done text="Define MVP core features" />
          <Task done text="Approve user flow" />
          <Task text="Build clickable prototype" tag="In progress" />
          <Task text="Prepare demo video" />
          <Task text="Define success metrics" />
        </Card>
        <Card title="Required submissions">
          <Artifact text="MVP prototype" state="Submitted" />
          <Artifact text="MVP demo video" state="Not submitted" />
          <Artifact text="Technical architecture" state="Not submitted" />
          <Artifact text="Test plan & success metrics" state="Not submitted" />
        </Card>
        <Card title="Stage checklist">
          <Task done text="Problem and solution fit validated" />
          <Task done text="MVP scope finalized" />
          <Task text="Prototype tested with 5 users" />
          <Task text="Metrics baseline captured" />
          <div className="vx-progress">
            <span style={{ width: "60%" }} />
          </div>
          <strong className="mint">60% complete</strong>
        </Card>
      </div>
      <div className="vx-review-strip">
        <div>
          <WandSparkles />
          <span>
            <b>Ready for mentor review?</b>
            <small>
              Complete the remaining evidence and submit the stage as one
              reviewable package.
            </small>
          </span>
        </div>
        <button className="btn primary">
          Submit stage for review <ArrowRight />
        </button>
      </div>
    </>
  );
}

function Artifacts() {
  return (
    <>
      <div className="vx-metrics">
        {[
          ["Overall completion", "72%"],
          ["Submitted", "16"],
          ["Approved", "8"],
          ["In review", "5"],
          ["Draft", "7"],
        ].map((x) => (
          <div key={x[0]}>
            <span>{x[0]}</span>
            <b>{x[1]}</b>
          </div>
        ))}
      </div>
      <Card title="Artifact library" action="Filter & search">
        <div className="vx-artifact-grid">
          {artifacts.map(([t, s, I]: any) => (
            <article key={t}>
              <I />
              <div>
                <b>{t}</b>
                <span
                  className={`vx-pill ${String(s).replace(" ", "-").toLowerCase()}`}
                >
                  {s}
                </span>
                <small>Version 1.2 · updated today</small>
              </div>
              <strong>•••</strong>
            </article>
          ))}
        </div>
        <div className="vx-drop">
          <CloudUpload />
          <span>
            <b>Upload a new artifact</b>
            <small>PDF, PPT, DOCX, XLSX, ZIP or MP4 · up to 25 MB</small>
          </span>
          <button className="btn">Browse files</button>
        </div>
      </Card>
      <div className="vx-review-strip">
        <div>
          <FileCheck2 />
          <span>
            <b>Package ready for review</b>
            <small>
              Required artifacts are complete. You can edit until final
              submission.
            </small>
          </span>
        </div>
        <button className="btn primary">
          Submit for launch review <ArrowRight />
        </button>
      </div>
    </>
  );
}

function ReviewPending() {
  return (
    <>
      <StageTrack />
      <div className="vx-pending">
        <div className="vx-pending-orbit">
          <Clock3 />
        </div>
        <span>STAGE SUBMITTED</span>
        <h2>Your evidence is with Meera.</h2>
        <p>
          The stage package was locked at 11:42 AM. Your mentor will review the
          rubric, artifacts and comments within 2–3 business days.
        </p>
        <div>
          <b>
            <Check /> 4 required artifacts
          </b>
          <b>
            <Check /> Checklist complete
          </b>
          <b>
            <Check /> Version history preserved
          </b>
        </div>
        <button className="btn">View submitted package</button>
      </div>
    </>
  );
}

function Changes() {
  return (
    <>
      <div className="vx-score-head">
        <div>
          <span>MENTOR DECISION</span>
          <h2>Promising direction. Three corrections required.</h2>
          <p>
            Address the evidence gaps below, upload revised artifacts, and
            resubmit the same stage version.
          </p>
        </div>
        <div className="vx-score">
          <b>72</b>
          <span>/100</span>
          <small>Good potential</small>
        </div>
      </div>
      <div className="vx-feedback-grid">
        <Card title="Rubric feedback">
          {[
            ["Problem clarity", 16, "Strong and specific"],
            ["Customer validation", 14, "Add quantified evidence"],
            ["Business model", 12, "Clarify unit economics"],
            ["MVP readiness", 15, "Tighten success criteria"],
            ["Go-to-market", 15, "Prioritise pilot channel"],
          ].map(([t, n, d]: any) => (
            <div className="vx-rubric" key={t}>
              <b>{t}</b>
              <span>{"★".repeat(Math.round(n / 4))}</span>
              <p>{d}</p>
              <strong>{n}/20</strong>
            </div>
          ))}
        </Card>
        <Card title="Required corrections">
          <Correction
            priority="High"
            text="Add 10 more customer interviews with pains quantified."
          />
          <Correction
            priority="High"
            text="Include pricing logic, cost structure and unit economics."
          />
          <Correction
            priority="Medium"
            text="Define core MVP features and measurable success signals."
          />
        </Card>
      </div>
      <div className="vx-review-strip warning">
        <div>
          <RotateCcw />
          <span>
            <b>Revision window is open</b>
            <small>
              Artifacts remain editable. Your original submission and mentor
              decision stay in history.
            </small>
          </span>
        </div>
        <button className="btn primary">
          Respond and revise <ArrowRight />
        </button>
      </div>
    </>
  );
}

function Resubmit() {
  return (
    <>
      <div className="vx-resubmit-head">
        <RotateCcw />
        <div>
          <span>REVISION 2 · DRAFT</span>
          <h2>Respond to mentor feedback</h2>
          <p>Resolve each correction and connect it to the revised evidence.</p>
        </div>
        <b>2 of 3 resolved</b>
      </div>
      <div className="vx-feedback-grid">
        <Card title="Corrections checklist">
          <Correction
            priority="Resolved"
            text="Customer interview sample expanded to 18 participants."
          />
          <Correction
            priority="Resolved"
            text="Unit economics added to business model canvas v1.3."
          />
          <Correction
            priority="Open"
            text="Define measurable MVP success criteria."
          />
        </Card>
        <Card title="Revision package">
          <Artifact text="Interview synthesis v1.4" state="Updated" />
          <Artifact text="Business model canvas v1.3" state="Updated" />
          <Artifact text="MVP test plan v0.8" state="Draft" />
          <div className="vx-drop compact">
            <CloudUpload />
            <span>
              <b>Attach revised evidence</b>
              <small>Files inherit the stage version history.</small>
            </span>
          </div>
        </Card>
      </div>
      <label className="vx-response">
        <b>Response to mentor</b>
        <textarea defaultValue="We expanded the validation sample and added contribution-margin assumptions. The revised MVP test plan will include activation and repeat-use thresholds." />
      </label>
      <div className="vx-review-strip">
        <div>
          <FileCheck2 />
          <span>
            <b>One correction remains</b>
            <small>
              Complete the MVP success criteria before resubmitting.
            </small>
          </span>
        </div>
        <button className="btn primary">
          Resubmit revision <ArrowRight />
        </button>
      </div>
    </>
  );
}

function Unlocked() {
  return (
    <>
      <div className="vx-celebrate">
        <div className="vx-trophy">
          <Trophy />
        </div>
        <span>STAGE 4 APPROVED</span>
        <h2>Pilot Launch is now unlocked.</h2>
        <p>
          Your mentor approved MVP Build with a final score of 86/100. The
          complete review record has been preserved.
        </p>
        <div className="vx-unlock-track">
          <b>
            <CheckCircle2 /> MVP Build approved
          </b>
          <ArrowRight />
          <b>
            <Rocket /> Pilot Launch unlocked
          </b>
        </div>
        <div className="actions">
          <button className="btn primary">
            Open the next stage <ArrowRight />
          </button>
          <button className="btn">Download review report</button>
        </div>
      </div>
      <StageTrack active={4} />
      <div className="vx-three">
        <Card title="Next milestone">
          <b className="vx-big">Pilot cohort live</b>
          <p>Recruit 20 target users and start the controlled launch.</p>
          <span className="vx-pill approved">Due in 14 days</span>
        </Card>
        <Card title="New stage tasks">
          <Task text="Confirm pilot cohort" />
          <Task text="Prepare onboarding sequence" />
          <Task text="Instrument success metrics" />
        </Card>
        <Card title="Mentor note">
          <p>
            “Strong revision. Keep the pilot narrow and optimise for learning
            velocity before reach.”
          </p>
          <b>Meera Iyer · Product & Growth</b>
        </Card>
      </div>
    </>
  );
}

function RightRail({ view }: { view: View }) {
  return (
    <aside className="vx-right">
      <Card title="Stage health">
        <div className="vx-gauge">
          <Gauge />
          <b>{view === "unlocked" ? "86" : "68"}</b>
          <span>/100</span>
        </div>
        {[
          ["Evidence", 82],
          ["Execution", 68],
          ["Team", 90],
          ["Readiness", 72],
        ].map((x) => (
          <div className="vx-mini" key={x[0]}>
            <span>{x[0]}</span>
            <i>
              <em style={{ width: `${x[1]}%` }} />
            </i>
            <b>{x[1]}%</b>
          </div>
        ))}
      </Card>
      <Card title="Your mentor">
        <div className="vx-mentor">
          <div>MI</div>
          <span>
            <b>Meera Iyer</b>
            <small>Product & Growth Advisor</small>
          </span>
        </div>
        <button className="btn">
          Send message <ArrowRight />
        </button>
      </Card>
      <Card title="Upcoming">
        <Task done={view === "unlocked"} text="MVP stage review" />
        <Task text="Pilot feedback session" />
        <Task text="Go-to-market readiness" />
      </Card>
    </aside>
  );
}

function Intake({ errorState = false }: { errorState?: boolean }) {
  return (
    <main className="vx-intake">
      <div className="vx-breadcrumb">
        Home <ArrowRight /> Venture Builder <ArrowRight />{" "}
        <b>Idea submission</b>
      </div>
      <div className="vx-intake-head">
        <div>
          <span>PRACTICAL · MENTOR-LED · OUTCOMES-DRIVEN</span>
          <h1>Idea Submission & Opportunity Intake</h1>
          <p>
            Share the problem, the people affected and your earliest solution
            thinking.
          </p>
        </div>
        <button className="btn">Save draft</button>
      </div>
      <div className="vx-intake-layout">
        <aside className="vx-intake-steps">
          {["Problem", "Audience", "Solution", "Market", "Team", "Review"].map(
            (x, i) => (
              <div className={i === 0 ? "active" : ""} key={x}>
                <i>{i + 1}</i>
                <span>
                  <b>{x}</b>
                  <small>
                    {
                      [
                        "Define the problem",
                        "Who you serve",
                        "Proposed solution",
                        "Opportunity size",
                        "Founder readiness",
                        "Confirm & submit",
                      ][i]
                    }
                  </small>
                </span>
              </div>
            ),
          )}
        </aside>
        <section className="vx-form-card">
          <div className="vx-form-title">
            <div>
              <span>STEP 1 OF 6</span>
              <h2>Define the problem</h2>
              <p>
                Help us understand what you are solving and why it matters now.
              </p>
            </div>
            {errorState && (
              <b>
                <AlertTriangle /> 4 fields need attention
              </b>
            )}
          </div>
          <div className="vx-form-grid">
            <Field label="Venture / idea name" value="StellaCare" />
            <Field
              label="One-line idea summary"
              error={
                errorState
                  ? "Keep the summary between 10 and 100 characters."
                  : undefined
              }
            />
            <Field
              label="Problem statement"
              area
              error={
                errorState
                  ? "Explain who faces this problem and how it affects them."
                  : undefined
              }
            />
            <Field
              label="Why is this a real problem now?"
              value="Delayed access to early screening creates preventable risk."
              area
            />
            <Field label="Business category" value="HealthTech" />
            <Field
              label="Problem severity"
              error={errorState ? "Select a severity." : undefined}
            />
            <Field
              label="Geographic scope"
              value="Tier 1 and Tier 2 Indian cities"
            />
            <Field
              label="Target customer / user"
              error={errorState ? "Describe the primary user." : undefined}
            />
          </div>
          <div className="vx-form-actions">
            <span>
              {errorState ? (
                <>
                  <AlertTriangle /> Please correct the highlighted fields
                  before continuing.
                </>
              ) : (
                <>All fields marked with * are required.</>
              )}
            </span>
            <button className="btn primary">
              Continue to audience <ArrowRight />
            </button>
          </div>
        </section>
        <aside className="vx-intake-aside">
          <Card title="Evaluation criteria">
            {[
              "Problem clarity",
              "Customer relevance",
              "Solution approach",
              "Founder readiness",
              "Scalability potential",
            ].map((x) => (
              <div className="vx-criterion" key={x}>
                <Target />
                <b>{x}</b>
                <strong>20%</strong>
              </div>
            ))}
          </Card>
          <Card title="What happens next?">
            <Task done text="Idea is reviewed in 5–7 days" />
            <Task done text="You receive structured feedback" />
            <Task done text="Shortlisted ideas enter Stage 1" />
          </Card>
        </aside>
      </div>
    </main>
  );
}

function Submitted() {
  return (
    <main className="vx-submitted">
      <div className="vx-receipt">
        <div className="vx-success-icon">
          <Check />
        </div>
        <span>IDEA SUBMITTED SUCCESSFULLY</span>
        <h1>Your venture is now in review.</h1>
        <p>
          We have received the StellaCare opportunity brief. The review team
          will evaluate it against the five published criteria.
        </p>
        <div className="vx-receipt-id">
          <span>Submission ID</span>
          <b>VB-2026-0148</b>
          <span>Submitted</span>
          <b>02 Sep 2026 · 11:42 AM</b>
        </div>
        <div className="vx-journey">
          {[
            ["Submitted", CheckCircle2],
            ["Program review", ClipboardCheck],
            ["Mentor feedback", MessageSquareText],
            ["Stage 1 decision", Trophy],
          ].map(([x, I]: any, i) => (
            <div className={i === 0 ? "active" : ""} key={x}>
              <I />
              <b>{x}</b>
              <small>
                {i === 0
                  ? "Complete"
                  : i === 1
                    ? "5–7 business days"
                    : "Upcoming"}
              </small>
            </div>
          ))}
        </div>
        <div className="actions">
          <Link
            className="btn primary"
            href="/venture-builder/experience/review-pending?preview=1"
          >
            Track submission <ArrowRight />
          </Link>
          <Link className="btn" href="/entrepreneurship">
            Back to program
          </Link>
        </div>
      </div>
      <aside>
        <Card title="What you can do now">
          <Task done text="Download a copy of your submission" />
          <Task done text="Continue the founder readiness modules" />
          <Task done text="Prepare customer interview questions" />
        </Card>
        <Card title="Need to change something?">
          <p>
            Your submission is locked for review. Contact the program team to
            withdraw and edit it.
          </p>
          <button className="btn">Contact support</button>
        </Card>
      </aside>
    </main>
  );
}

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: any;
}) {
  return (
    <section className="vx-card">
      <header>
        <h3>{title}</h3>
        {action && <button>{action}</button>}
      </header>
      {children}
    </section>
  );
}
function Task({
  text,
  done = false,
  tag,
}: {
  text: string;
  done?: boolean;
  tag?: string;
}) {
  return (
    <div className="vx-task">
      <i className={done ? "done" : ""}>{done ? <Check /> : <Circle />}</i>
      <span>
        <b>{text}</b>
        {tag && <small>{tag}</small>}
      </span>
    </div>
  );
}
function Artifact({ text, state }: { text: string; state: string }) {
  return (
    <div className="vx-artifact">
      <FileText />
      <span>
        <b>{text}</b>
        <small>{state}</small>
      </span>
      <strong className={state === "Not submitted" ? "red" : "mint"}>
        {state === "Not submitted" ? "Missing" : "Ready"}
      </strong>
    </div>
  );
}
function Correction({ priority, text }: { priority: string; text: string }) {
  return (
    <div className="vx-correction">
      <i
        className={
          priority === "Resolved"
            ? "resolved"
            : priority === "Open"
              ? "open"
              : ""
        }
      >
        {priority === "Resolved" ? <Check /> : <AlertTriangle />}
      </i>
      <span>
        <b>{text}</b>
        <small>{priority} priority</small>
      </span>
    </div>
  );
}
function Field({
  label,
  value,
  error,
  area,
}: {
  label: string;
  value?: string;
  error?: string;
  area?: boolean;
}) {
  return (
    <label className={error ? "error" : ""}>
      <b>{label} *</b>
      {area ? (
        <textarea
          defaultValue={value}
          placeholder="Tell us what you have learned so far…"
        />
      ) : (
        <input
          defaultValue={value}
          placeholder="Enter a clear, specific response"
        />
      )}
      {error && (
        <small>
          <AlertTriangle />
          {error}
        </small>
      )}
    </label>
  );
}
