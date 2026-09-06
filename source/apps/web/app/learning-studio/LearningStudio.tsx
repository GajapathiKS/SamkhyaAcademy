"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Archive,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Code2,
  Download,
  ExternalLink,
  FileArchive,
  FileCode2,
  FileImage,
  FileText,
  Lightbulb,
  Maximize2,
  MessageSquareText,
  Monitor,
  NotebookPen,
  Play,
  RotateCcw,
  Smartphone,
  Tablet,
  XCircle,
} from "lucide-react";

const starter = `<main class="profile-card">
  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160" alt="Profile" />
  <h1>Arjun Rao</h1>
  <p>Full-stack learner building accessible web experiences.</p>
  <button>View projects</button>
</main>`;

const styles = `body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Arial; background: #eef2ff; }
.profile-card { width: 320px; padding: 32px; border-radius: 24px; background: white; text-align: center; box-shadow: 0 24px 70px #3045a522; }
.profile-card img { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; }
.profile-card h1 { margin: 18px 0 8px; color: #101b3c; }
.profile-card p { color: #68718b; line-height: 1.55; }
.profile-card button { border: 0; border-radius: 9px; padding: 12px 18px; color: white; background: #4f46e5; font-weight: 700; }`;

const outline = [
  ["01", "HTML foundations", "5 / 5"],
  ["02", "CSS layouts", "4 / 6"],
  ["03", "JavaScript essentials", "2 / 7"],
  ["04", "DOM & events", "0 / 6"],
  ["05", "APIs & async work", "0 / 5"],
  ["06", "Capstone project", "0 / 4"],
];

const resources = [
  ["HTML", "Starter workspace", "Editable project files"],
  ["ZIP", "Profile card starter", "18 files · 1.4 MB"],
  ["GIF", "Expected interaction demo", "00:18 preview"],
  ["PDF", "Project brief & rubric", "12 pages"],
];

const resourceIcons = {
  HTML: FileCode2,
  ZIP: FileArchive,
  GIF: FileImage,
  PDF: FileText,
} as const;

function ResourceIcon({ type }: { type: keyof typeof resourceIcons }) {
  const Icon = resourceIcons[type];
  return <Icon aria-hidden="true" />;
}

function SideOutline({ mode }: { mode: string }) {
  return (
    <aside className="studio-outline">
      <div className="studio-course">
        <small>FREE LEARNING PATH</small>
        <h2>JavaScript Foundations</h2>
        <div className="studio-progress">
          <i />
        </div>
        <span>38% complete · 12 of 33 lessons</span>
      </div>
      {outline.map(([n, title, count], index) => (
        <section key={n} className={index === 2 ? "active" : ""}>
          <header>
            <i>{n}</i>
            <b>{title}</b>
            <span>{count}</span>
          </header>
          {index === 2 && (
            <div className="studio-lessons">
              <Link
                className={mode === "text-lesson" ? "active" : ""}
                href="/learning-studio/text-lesson"
              >
                3.1 Variables and values <span>12m</span>
              </Link>
              <Link
                className={mode.startsWith("code-lab") ? "active" : ""}
                href="/learning-studio/code-lab"
              >
                3.2 Build a profile card <span>Lab</span>
              </Link>
              <Link
                className={mode.startsWith("practice") ? "active" : ""}
                href="/learning-studio/practice"
              >
                3.3 Practice checkpoint <span>8m</span>
              </Link>
              <Link
                className={mode === "snippets" ? "active" : ""}
                href="/learning-studio/snippets"
              >
                3.4 Reusable snippets <span>10m</span>
              </Link>
            </div>
          )}
        </section>
      ))}
      <div className="studio-help">
        <b>Need a hand?</b>
        <span>Ask a focused question and attach your current code.</span>
        <button>Ask a mentor →</button>
      </div>
    </aside>
  );
}

function StudioHeader({ label, title }: { label: string; title: string }) {
  return (
    <header className="studio-top">
      <div>
        <span>JavaScript Foundations · Module 3</span>
        <b>
          {label} · {title}
        </b>
      </div>
      <nav>
        <button>
          <BookOpen aria-hidden="true" /> Resources <i>4</i>
        </button>
        <button>
          <NotebookPen aria-hidden="true" /> My notes
        </button>
        <button>
          <MessageSquareText aria-hidden="true" /> Discussion <i>12</i>
        </button>
      </nav>
    </header>
  );
}

function RightRail({
  next = "Practice: variables and values",
}: {
  next?: string;
}) {
  return (
    <aside className="studio-rail">
      <section>
        <div className="studio-rail-title">
          <b>Your progress</b>
          <span>38%</span>
        </div>
        <div className="studio-progress">
          <i />
        </div>
      </section>
      <section>
        <small>LEARNING CHECKLIST</small>
        {[
          "Read the explanation",
          "Run the example",
          "Complete the practice",
          "Save one useful note",
        ].map((item, i) => (
          <div className="rail-check" key={item}>
            <i className={i < 2 ? "done" : ""}>
              {i < 2 ? <Check aria-hidden="true" /> : i + 1}
            </i>
            <span>{item}</span>
          </div>
        ))}
        <button className="studio-primary">Mark complete</button>
      </section>
      <section>
        <small>UP NEXT</small>
        <h3>{next}</h3>
        <p>Continue while the idea is fresh.</p>
        <button className="studio-secondary">
          Preview next lesson <ChevronRight aria-hidden="true" />
        </button>
      </section>
      <section>
        <small>LESSON RESOURCES</small>
        {resources.slice(1).map(([type, title, meta]) => (
          <div className="rail-resource" key={title}>
            <i>
              <ResourceIcon type={type as keyof typeof resourceIcons} />
            </i>
            <span>
              <b>{title}</b>
              <small>{meta}</small>
            </span>
            <b>
              <Download aria-hidden="true" />
            </b>
          </div>
        ))}
      </section>
    </aside>
  );
}

function TextLesson() {
  return (
    <>
      <StudioHeader label="3.1" title="Variables, values and clear naming" />
      <div className="studio-body">
        <article className="text-lesson">
          <div className="lesson-crumb">
            JAVASCRIPT ESSENTIALS <span>12 MIN READ</span>
          </div>
          <h1>Store information with variables</h1>
          <p className="lesson-lead">
            Variables give meaningful names to values so programs can remember,
            transform and reuse information.
          </p>
          <div className="lesson-objectives">
            <b>In this lesson</b>
            <span>
              Declare values with <code>const</code> and <code>let</code>
            </span>
            <span>Choose names that explain intent</span>
            <span>Recognise strings, numbers and booleans</span>
          </div>
          <h2>Start with the value that should not change</h2>
          <p>
            Use <code>const</code> by default. It communicates that the binding
            should stay stable and makes code easier to reason about.
          </p>
          <pre>
            <header>
              <span>JavaScript</span>
              <button>Copy code</button>
            </header>
            <code>{`const courseName = "JavaScript Foundations";\nconst lessonCount = 33;\nconst hasCertificate = true;`}</code>
          </pre>
          <div className="lesson-callout">
            <i>✓</i>
            <div>
              <b>Good naming is part of the design</b>
              <p>
                <code>lessonCount</code> tells another developer more than{" "}
                <code>x</code>. Prefer clarity over short names.
              </p>
            </div>
          </div>
          <h2>
            Use <code>let</code> for a value that changes
          </h2>
          <p>
            Progress changes as the learner completes work. That makes{" "}
            <code>let</code> an honest choice.
          </p>
          <pre>
            <header>
              <span>JavaScript</span>
              <button>Copy code</button>
            </header>
            <code>{`let completedLessons = 11;\ncompletedLessons = completedLessons + 1;\nconsole.log(completedLessons); // 12`}</code>
          </pre>
          <div className="try-card">
            <div>
              <span>TRY IT YOURSELF</span>
              <h3>Change the learner progress</h3>
              <p>
                Open the practice workspace with this example already loaded.
              </p>
            </div>
            <Link href="/learning-studio/code-lab">
              Open interactive example →
            </Link>
          </div>
          <div className="lesson-discussion">
            <h3>
              Discussion <span>12</span>
            </h3>
            <input placeholder="Ask a question or share an implementation insight…" />
            <article>
              <i>AR</i>
              <div>
                <b>
                  Aarav Rao <em>Top contributor</em>
                </b>
                <span>2 hours ago</span>
                <p>
                  Using const first made it much easier to see which values are
                  intentionally changing.
                </p>
                <button>Reply</button>
                <button>Helpful · 8</button>
              </div>
            </article>
          </div>
        </article>
        <RightRail />
      </div>
    </>
  );
}

type LabState =
  | "default"
  | "hint"
  | "failed"
  | "passed"
  | "mobile"
  | "notes"
  | "discussion"
  | "resource";

function LabContinuation({ state }: { state: LabState }) {
  if (state === "default" || state === "mobile") return null;
  if (state === "hint")
    return (
      <aside className="experience-drawer hint-drawer">
        <header>
          <span>
            <Lightbulb aria-hidden="true" />
          </span>
          <div>
            <small>HINT 1 OF 3</small>
            <h2>Start with the keyboard state</h2>
          </div>
          <button aria-label="Close hint">×</button>
        </header>
        <p>
          The button already has a hover style. Add a separate{" "}
          <code>:focus-visible</code> rule so keyboard users can see where they
          are without changing pointer behaviour.
        </p>
        <pre>
          <code>
            {
              ".profile-card button:focus-visible {\n  outline: 3px solid ____;\n  outline-offset: 3px;\n}"
            }
          </code>
        </pre>
        <footer>
          <button>Previous hint</button>
          <button className="studio-primary">
            Apply this idea <ChevronRight aria-hidden="true" />
          </button>
        </footer>
      </aside>
    );
  if (state === "failed")
    return (
      <aside className="experience-result failed-result">
        <header>
          <XCircle aria-hidden="true" />
          <div>
            <small>SOLUTION CHECK</small>
            <h2>Two requirements still need attention</h2>
          </div>
          <b>1 / 3 passed</b>
        </header>
        <div className="result-check passed">
          <CheckCircle2 />
          <span>
            <b>Heading structure</b>
            <small>One clear h1 is present.</small>
          </span>
        </div>
        <div className="result-check failed">
          <XCircle />
          <span>
            <b>Image alternative</b>
            <small>Replace “Profile” with a description of the image.</small>
          </span>
          <button>Show location</button>
        </div>
        <div className="result-check failed">
          <XCircle />
          <span>
            <b>Keyboard focus</b>
            <small>Add a visible :focus-visible style to the action.</small>
          </span>
          <button>Open CSS</button>
        </div>
        <footer>
          <button>View expected result</button>
          <button className="studio-primary">Return to editor</button>
        </footer>
      </aside>
    );
  if (state === "passed")
    return (
      <aside className="experience-result success-result">
        <div className="success-orbit">
          <CheckCircle2 aria-hidden="true" />
        </div>
        <small>PRACTICE COMPLETE</small>
        <h2>Accessible profile card completed</h2>
        <p>
          All automated checks passed. Your solution and completion evidence
          have been saved to this course version.
        </p>
        <div className="success-metrics">
          <span>
            <b>3/3</b>Checks passed
          </span>
          <span>
            <b>08:42</b>Time used
          </span>
          <span>
            <b>+120</b>Practice XP
          </span>
        </div>
        <footer>
          <button>Review solution</button>
          <button className="studio-primary">
            Continue to snippets <ChevronRight />
          </button>
        </footer>
      </aside>
    );
  if (state === "notes")
    return (
      <aside className="experience-drawer notes-drawer">
        <header>
          <span>
            <NotebookPen />
          </span>
          <div>
            <small>MY LESSON NOTES</small>
            <h2>Build a profile card</h2>
          </div>
          <button aria-label="Close notes">×</button>
        </header>
        <textarea
          defaultValue={
            "Remember: use :focus-visible instead of removing the browser outline.\n\nAlt text should explain the purpose of the image in this card."
          }
        />
        <div className="note-context">
          <Code2 />
          <span>
            <b>Linked to styles.css · line 7</b>
            <small>.profile-card button</small>
          </span>
        </div>
        <footer>
          <span>Saved automatically</span>
          <button className="studio-primary">Done</button>
        </footer>
      </aside>
    );
  if (state === "discussion")
    return (
      <aside className="experience-drawer discussion-drawer">
        <header>
          <span>
            <MessageSquareText />
          </span>
          <div>
            <small>LESSON DISCUSSION · 12</small>
            <h2>Ask, explain and compare approaches</h2>
          </div>
          <button aria-label="Close discussion">×</button>
        </header>
        <div className="discussion-compose">
          <div>PS</div>
          <textarea placeholder="Ask a focused question and include what you tried…" />
          <button className="studio-primary">Post</button>
        </div>
        {[
          [
            "AR",
            "Aarav Rao",
            "Why prefer focus-visible over focus?",
            "It avoids showing the focus ring after a mouse click while preserving it for keyboard navigation.",
          ],
          [
            "MK",
            "Meera Kumar",
            "Useful testing shortcut",
            "Press Tab from the address bar and confirm every interactive control receives a visible state.",
          ],
        ].map((x) => (
          <article key={x[1]}>
            <i>{x[0]}</i>
            <div>
              <b>{x[1]}</b>
              <small>2 hours ago</small>
              <h3>{x[2]}</h3>
              <p>{x[3]}</p>
              <button>Reply</button>
              <button>Helpful · 8</button>
            </div>
          </article>
        ))}
      </aside>
    );
  return (
    <aside className="experience-drawer resource-drawer">
      <header>
        <span>
          <FileText />
        </span>
        <div>
          <small>LESSON RESOURCE</small>
          <h2>Accessible component checklist</h2>
        </div>
        <button aria-label="Close resource">×</button>
      </header>
      <div className="resource-preview">
        <div>
          <b>01</b>
          <span>Semantic structure</span>
          <CheckCircle2 />
        </div>
        <div>
          <b>02</b>
          <span>Meaningful alternatives</span>
          <CheckCircle2 />
        </div>
        <div>
          <b>03</b>
          <span>Visible keyboard focus</span>
          <CheckCircle2 />
        </div>
        <div>
          <b>04</b>
          <span>Readable contrast</span>
          <CheckCircle2 />
        </div>
      </div>
      <p>PDF · 12 pages · Updated for this published course version</p>
      <footer>
        <button>
          <ExternalLink /> Open full screen
        </button>
        <button className="studio-primary">
          <Download /> Download PDF
        </button>
      </footer>
    </aside>
  );
}

function CodeLab({
  practice = false,
  state = "default",
}: {
  practice?: boolean;
  state?: LabState;
}) {
  const [html, setHtml] = useState(starter);
  const [css, setCss] = useState(styles);
  const [tab, setTab] = useState<"html" | "css">("html");
  const srcDoc = useMemo(
    () => `<!doctype html><style>${css}</style>${html}`,
    [html, css],
  );
  return (
    <>
      <StudioHeader
        label={practice ? "3.3" : "3.2"}
        title={
          practice
            ? "Practice checkpoint: complete the card"
            : "Build a profile card"
        }
      />
      <div className="lab-shell">
        <header className="lab-brief">
          <div>
            <small>
              {practice ? "PRACTICE CHECKPOINT" : "GUIDED CODE LAB"} · 20 MIN
            </small>
            <h1>
              {practice
                ? "Make the profile card accessible"
                : "Build, run and refine in one workspace"}
            </h1>
            <p>
              {practice
                ? "Add a descriptive heading, useful image alternative and keyboard-visible action."
                : "Edit the files on the left and see the result update in the isolated preview."}
            </p>
          </div>
          <div className="lab-actions">
            <button>
              <RotateCcw aria-hidden="true" /> Reset
            </button>
            <button>
              <Archive aria-hidden="true" /> Download ZIP
            </button>
            <button className="run">
              <Play aria-hidden="true" /> Run
            </button>
          </div>
        </header>
        {practice && (
          <div className="practice-requirements">
            {[
              "Use one h1 heading",
              "Keep meaningful alt text",
              "Add :focus-visible styling",
            ].map((x, i) => (
              <span key={x}>
                <i>{i === 0 ? "✓" : i + 1}</i>
                {x}
              </span>
            ))}
            <b>1 / 3 checks complete</b>
          </div>
        )}
        <div className="lab-workspace">
          <section className="lab-editor">
            <nav>
              <button
                className={tab === "html" ? "active" : ""}
                onClick={() => setTab("html")}
              >
                index.html
              </button>
              <button
                className={tab === "css" ? "active" : ""}
                onClick={() => setTab("css")}
              >
                styles.css
              </button>
              <span>Saved</span>
            </nav>
            <div className="code-area">
              <div className="line-numbers">
                {Array.from({ length: 18 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <textarea
                spellCheck={false}
                value={tab === "html" ? html : css}
                onChange={(e) =>
                  tab === "html"
                    ? setHtml(e.target.value)
                    : setCss(e.target.value)
                }
              />
            </div>
            <footer>
              <span>JavaScript browser sandbox</span>
              <span>UTF-8 · Spaces: 2</span>
            </footer>
          </section>
          <section
            className={`lab-preview ${state === "mobile" ? "mobile-preview" : ""}`}
          >
            <header>
              <b>Live preview</b>
              <div>
                <button>
                  <Monitor aria-label="Desktop preview" />
                </button>
                <button>
                  <Tablet aria-label="Tablet preview" />
                </button>
                <button className={state === "mobile" ? "active" : ""}>
                  <Smartphone aria-label="Mobile preview" />
                </button>
                <button>
                  <Maximize2 aria-label="Open preview" />
                </button>
              </div>
            </header>
            <iframe
              title="Code result"
              sandbox="allow-scripts"
              srcDoc={srcDoc}
            />
            <footer>
              <span className="success-dot" /> Preview updated successfully{" "}
              <b>Console 0</b>
            </footer>
          </section>
        </div>
        <footer className="lab-footer">
          <div>
            <b>Need a hint?</b>
            <span>
              Hints explain the next idea without revealing the full solution.
            </span>
          </div>
          <button>Show hint</button>
          <button>View expected result</button>
          <button className="studio-primary">
            {practice ? "Check solution" : "Complete lab"} →
          </button>
        </footer>
        <LabContinuation state={state} />
      </div>
    </>
  );
}

function Snippets() {
  const snippets = [
    ["Declare an immutable value", 'const academy = "SamkhyaAcademy";'],
    [
      "Transform a list",
      "const titles = lessons.map((lesson) => lesson.title);",
    ],
    [
      "Filter completed work",
      "const done = lessons.filter((lesson) => lesson.complete);",
    ],
    [
      "Render a reusable card",
      "function CourseCard({ title, level }) {\n  return `<article><h2>${title}</h2><span>${level}</span></article>`;\n}",
    ],
  ];
  return (
    <>
      <StudioHeader label="3.4" title="Reusable JavaScript snippets" />
      <div className="studio-body">
        <main className="snippet-page">
          <div className="snippet-head">
            <div>
              <small>CODE REFERENCE</small>
              <h1>Useful patterns, ready to understand and reuse</h1>
              <p>
                Every snippet includes context, a copy action and an editable
                practice handoff.
              </p>
            </div>
            <input placeholder="Search this lesson…" />
          </div>
          <div className="snippet-grid">
            {snippets.map(([title, code], i) => (
              <article key={title}>
                <header>
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  <div>
                    <h2>{title}</h2>
                    <span>JavaScript · ES2024</span>
                  </div>
                  <button>Copy</button>
                </header>
                <pre>
                  <code>{code}</code>
                </pre>
                <p>
                  {i < 3
                    ? "Use this pattern when the intent matches; rename values so the code explains your domain."
                    : "Keep UI rendering small, predictable and easy to test."}
                </p>
                <footer>
                  <button>Open in lab →</button>
                  <button>Download .js</button>
                </footer>
              </article>
            ))}
          </div>
        </main>
        <RightRail next="Project: course explorer" />
      </div>
    </>
  );
}

function ProjectLibrary({ detail = false }: { detail?: boolean }) {
  if (detail)
    return (
      <>
        <StudioHeader label="PROJECT 02" title="Responsive course explorer" />
        <div className="studio-body">
          <main className="project-detail">
            <div className="project-detail-head">
              <div>
                <small>GUIDED PROJECT · INTERMEDIATE</small>
                <h1>Build a responsive course explorer</h1>
                <p>
                  Turn a supplied design brief into a searchable, accessible and
                  responsive interface.
                </p>
                <div>
                  <span>Estimated 6–8 hours</span>
                  <span>18 starter files</span>
                  <span>4 milestones</span>
                </div>
              </div>
              <button className="studio-primary">Download project ZIP ↓</button>
            </div>
            <div className="project-showcase">
              <div className="demo-window">
                <header>
                  <i />
                  <i />
                  <i />
                  <span>expected-result.gif</span>
                </header>
                <div className="demo-scene">
                  <aside />
                  <main>
                    <b />
                    <b />
                    <section>
                      <i />
                      <i />
                      <i />
                    </section>
                    <section>
                      <i />
                      <i />
                      <i />
                    </section>
                  </main>
                </div>
                <footer>Animated interaction reference · 00:18</footer>
              </div>
              <aside>
                <h2>Package contents</h2>
                {[
                  "project-brief.pdf",
                  "starter/",
                  "assets/",
                  "src/index.html",
                  "src/styles.css",
                  "src/app.js",
                  "expected-result.gif",
                  "README.md",
                ].map((x, i) => (
                  <div key={x}>
                    <i>{i === 1 || i === 2 ? "▾" : "◇"}</i>
                    {x}
                  </div>
                ))}
                <button>Preview all 18 files</button>
              </aside>
            </div>
            <section className="milestones">
              <h2>Project milestones</h2>
              {[
                [
                  "01",
                  "Structure",
                  "Build semantic navigation and card markup.",
                ],
                [
                  "02",
                  "Style",
                  "Match the responsive design tokens and layout.",
                ],
                ["03", "Interact", "Add filtering, search and saved courses."],
                ["04", "Review", "Run the checklist and document decisions."],
              ].map((x) => (
                <article key={x[0]}>
                  <i>{x[0]}</i>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                  <span>{x[0] === "01" ? "Ready" : "Locked"}</span>
                </article>
              ))}
            </section>
            <section className="project-rubric">
              <div>
                <h2>Definition of done</h2>
                {[
                  "Keyboard-operable search and filters",
                  "Responsive at mobile, tablet and desktop",
                  "No console errors",
                  "README explains trade-offs",
                ].map((x) => (
                  <p key={x}>✓ {x}</p>
                ))}
              </div>
              <div>
                <h2>Need help?</h2>
                <p>
                  Use the hints, discussion and mentor review without losing
                  ownership of the work.
                </p>
                <button>Open project discussion →</button>
              </div>
            </section>
          </main>
          <RightRail next="Project milestone 1" />
        </div>
      </>
    );
  const cards = [
    ["01", "Profile card", "HTML & CSS", "Beginner", "4 files"],
    ["02", "Course explorer", "HTML · CSS · JS", "Intermediate", "18 files"],
    ["03", "Learning dashboard", "React · API", "Intermediate", "26 files"],
    ["04", "Team task board", "Full stack", "Advanced", "42 files"],
  ];
  return (
    <>
      <StudioHeader label="PROJECTS" title="Downloadable project library" />
      <div className="studio-body">
        <main className="project-library">
          <div className="snippet-head">
            <div>
              <small>BUILD EVIDENCE</small>
              <h1>Projects with briefs, assets, code and expected results</h1>
              <p>
                Start from a clean package, inspect the folder architecture and
                build toward transparent review criteria.
              </p>
            </div>
            <div className="library-filter">
              <button className="active">All projects</button>
              <button>Frontend</button>
              <button>JavaScript</button>
              <button>Full stack</button>
            </div>
          </div>
          <div className="project-grid-rich">
            {cards.map(([n, title, stack, level, files], i) => (
              <article key={n}>
                <div className={`project-thumb p${i}`}>
                  <span>PROJECT {n}</span>
                  <div>
                    <i />
                    <i />
                    <i />
                  </div>
                  <b>{title}</b>
                </div>
                <section>
                  <div>
                    <span>{level}</span>
                    <span>{stack}</span>
                  </div>
                  <h2>{title}</h2>
                  <p>
                    {i === 0
                      ? "Create a polished, accessible personal profile component."
                      : i === 1
                        ? "Build search, filters and saved-course interactions."
                        : i === 2
                          ? "Turn progress data into a clear learner dashboard."
                          : "Design a collaborative workflow with roles and updates."}
                  </p>
                  <footer>
                    <span>↓ ZIP · {files}</span>
                    <span>▣ GIF preview</span>
                    <span>◇ File tree</span>
                  </footer>
                  <Link
                    href={i === 1 ? "/learning-studio/project-detail" : "#"}
                  >
                    View project package →
                  </Link>
                </section>
              </article>
            ))}
          </div>
        </main>
        <RightRail next="Choose a project" />
      </div>
    </>
  );
}

export function LearningStudio({ mode }: { mode: string }) {
  return (
    <main className="learning-studio">
      <div className="studio-layout">
        <SideOutline mode={mode} />
        <section className="studio-main">
          {mode === "text-lesson" ? (
            <TextLesson />
          ) : mode.startsWith("code-lab") ? (
            <CodeLab
              state={
                (mode.replace("code-lab-", "") === "code-lab"
                  ? "default"
                  : mode.replace("code-lab-", "")) as LabState
              }
            />
          ) : mode.startsWith("practice") ? (
            <CodeLab
              practice
              state={
                (mode.replace("practice-", "") === "practice"
                  ? "default"
                  : mode.replace("practice-", "")) as LabState
              }
            />
          ) : mode === "snippets" ? (
            <Snippets />
          ) : mode === "project-detail" ? (
            <ProjectLibrary detail />
          ) : (
            <ProjectLibrary />
          )}
        </section>
      </div>
    </main>
  );
}
