import Link from "next/link";
import {
  ArrowUpDown,
  BookOpen,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Columns3,
  ExternalLink,
  FileCheck2,
  Filter,
  Layers3,
  ListChecks,
  MoreHorizontal,
  Newspaper,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UsersRound,
} from "lucide-react";
import { requireContentManager } from "@/lib/auth";
const views: Record<
  string,
  {
    title: string;
    kicker: string;
    columns: string[];
    rows: string[][];
    action: string;
  }
> = {
  courses: {
    title: "Course Management",
    kicker: "LEARNING CATALOG",
    columns: ["Course", "Access", "Delivery", "Status", "Updated"],
    rows: [
      [
        "Forward Deployed AI Engineering",
        "PRICING",
        "HYBRID",
        "Published",
        "Today",
      ],
      [
        "Applied Machine Learning Engineer Path",
        "FREEMIUM",
        "HYBRID",
        "Published",
        "Today",
      ],
      ["Full-Stack Developer Path", "FREEMIUM", "HYBRID", "Published", "Today"],
      ["JavaScript Foundations", "FREE", "ONLINE", "Published", "Today"],
    ],
    action: "Create course",
  },
  create: {
    title: "Create / Edit Course",
    kicker: "COURSE AUTHORING",
    columns: [],
    rows: [],
    action: "Save draft",
  },
  pricing: {
    title: "Pricing Category & Access",
    kicker: "COMMERCIAL SETTINGS",
    columns: [],
    rows: [],
    action: "Save commercial settings",
  },
  type: {
    title: "Content Type & Delivery",
    kicker: "DELIVERY SETTINGS",
    columns: [],
    rows: [],
    action: "Save delivery settings",
  },
  modules: {
    title: "Module & Lesson Builder",
    kicker: "CURRICULUM AUTHORING",
    columns: ["Position", "Module", "Lessons", "Required", "Status"],
    rows: [
      ["01", "Web Foundations", "4", "Yes", "Published"],
      ["02", "Frontend Engineering", "4", "Yes", "Published"],
      ["03", "Backend Specialization", "4", "Yes", "Published"],
      ["04", "Data and Production", "4", "Yes", "Published"],
    ],
    action: "Add module",
  },
  exams: {
    title: "Exam & Question Bank",
    kicker: "ASSESSMENT AUTHORING",
    columns: ["Assessment", "Questions", "Pass mark", "Attempts", "Status"],
    rows: [
      ["JavaScript Final Assessment", "30", "70%", "1", "Published"],
      ["Full-Stack Module Check", "20", "70%", "2", "Draft"],
      ["FDE Certification Assessment", "45", "75%", "1", "Review"],
    ],
    action: "Create assessment",
  },
  posts: {
    title: "Blog & Resource Editor",
    kicker: "EDITORIAL CONTENT",
    columns: ["Post", "Author", "Status", "Updated"],
    rows: [
      [
        "From AI demo to production system",
        "Academy Editorial",
        "Published",
        "Today",
      ],
      [
        "A practical guide to venture validation",
        "Founder Faculty",
        "Draft",
        "Yesterday",
      ],
      [
        "What makes analytics trustworthy",
        "Data Faculty",
        "Review",
        "Yesterday",
      ],
    ],
    action: "Create post",
  },
  webinars: {
    title: "Webinar Management",
    kicker: "LIVE LEARNING",
    columns: ["Session", "Format", "Registrations", "Status"],
    rows: [
      ["AI systems: from demo to production", "Online", "24", "Open"],
      ["Venture validation before MVP", "Workshop", "18", "Open"],
      ["Analytics workflow briefing", "Online", "12", "Draft"],
    ],
    action: "Create webinar",
  },
  faculty: {
    title: "Faculty & Media Library",
    kicker: "PEOPLE & ASSETS",
    columns: ["Asset / profile", "Type", "Used in", "Status"],
    rows: [
      ["Engineering faculty profile", "Faculty", "3 programs", "Active"],
      ["FDE program hero", "Image", "2 pages", "Approved"],
      ["Venture Builder visual set", "Image", "4 pages", "Approved"],
      ["Course reference guide", "PDF", "1 lesson", "Draft"],
    ],
    action: "Add asset",
  },
  lessonTypes: {
    title: "Lesson Type & Experience",
    kicker: "MULTI-FORMAT LEARNING",
    columns: [],
    rows: [],
    action: "Save lesson type",
  },
  articleEditor: {
    title: "Text Lesson Editor",
    kicker: "ARTICLE AUTHORING",
    columns: [],
    rows: [],
    action: "Save lesson draft",
  },
  labEditor: {
    title: "Interactive Code Lab",
    kicker: "PRACTICE AUTHORING",
    columns: [],
    rows: [],
    action: "Save lab draft",
  },
  projectPackage: {
    title: "Project Package Builder",
    kicker: "PROJECT AUTHORING",
    columns: [],
    rows: [],
    action: "Save project package",
  },
  changeRequests: {
    title: "Protected Setting Approvals",
    kicker: "SEPARATION OF DUTIES",
    columns: ["Request", "Course", "Requested by", "Change", "Status"],
    rows: [
      [
        "CR-1042",
        "Data Structures & Algorithms",
        "Content Admin · Priya",
        "Access: PRIVATE → PAID",
        "Pending",
      ],
      [
        "CR-1041",
        "C++ Essentials",
        "Content Admin · Naveen",
        "Preview lessons: 0 → 2",
        "Pending",
      ],
      [
        "CR-1039",
        "Full-Stack Developer Path",
        "Content Admin · Priya",
        "Sale price update",
        "Approved",
      ],
    ],
    action: "Review request",
  },
  publishing: {
    title: "Publishing Queue",
    kicker: "SUPER ADMIN ONLY",
    columns: [
      "Course version",
      "Submitted by",
      "Quality checks",
      "Projection",
      "Status",
    ],
    rows: [
      [
        "Data Structures & Algorithms · v1",
        "Content Admin · Naveen",
        "18 / 18",
        "Checksum ready",
        "Awaiting approval",
      ],
      [
        "C Programming Fundamentals · v3",
        "Content Admin · Priya",
        "18 / 18",
        "Unchanged",
        "Awaiting approval",
      ],
      [
        "C++ Essentials · v2",
        "Content Admin · Naveen",
        "17 / 18",
        "Blocked",
        "Changes required",
      ],
    ],
    action: "Publish approved version",
  },
};
function AuthoringWorkbench({ view }: { view: string }) {
  if (view === "lessonTypes")
    return (
      <div className="author-workbench">
        <section className="author-main">
          <div className="author-path">
            <span>Data Structures & Algorithms</span>
            <b>›</b>
            <span>Module 4 · Graphs</span>
            <b>›</b>
            <strong>New lesson</strong>
          </div>
          <h2>Choose the learning experience</h2>
          <p className="author-lead">
            All lesson formats share access rules, progress, resources, notes,
            discussion and completion settings.
          </p>
          <div className="lesson-type-grid">
            {[
              [
                "▶",
                "Video lesson",
                "Hosted or external video with resume position.",
              ],
              [
                "¶",
                "Text lesson",
                "Long-form structured learning with rich blocks.",
              ],
              [
                "◫",
                "Mixed example",
                "Synchronized explanation, code and rendered result.",
              ],
              [
                "</>",
                "Interactive code lab",
                "Editor, isolated preview, hints and checks.",
              ],
              [
                "◎",
                "SVG / HTML simulation",
                "Nodes, graphs, algorithm steps, state and controls.",
              ],
              [
                "✓",
                "Practice exercise",
                "Task brief, starter state and expected result.",
              ],
              [
                "▣",
                "Project package",
                "Brief, assets, GIF, file tree and ZIP download.",
              ],
              [
                "?",
                "Quiz / assessment",
                "Question bank, scoring and attempt rules.",
              ],
            ].map((x, i) => (
              <article className={i === 4 ? "selected" : ""} key={x[1]}>
                <i>{x[0]}</i>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
                <button>{i === 4 ? "Selected" : "Choose"}</button>
              </article>
            ))}
          </div>
          <div className="author-settings">
            <h3>Shared lesson settings</h3>
            <div>
              <label>
                Lesson title
                <input defaultValue="Explore breadth-first search" />
              </label>
              <label>
                Estimated duration
                <input defaultValue="24 minutes" />
              </label>
              <label>
                Completion rule
                <select defaultValue="LAB_COMPLETE">
                  <option>LAB_COMPLETE</option>
                  <option>MANUAL</option>
                  <option>RESOURCE_OPEN</option>
                </select>
              </label>
            </div>
          </div>
        </section>
        <AuthorReview
          items={[
            "Experience selected",
            "Title and slug complete",
            "Completion rule configured",
            "Preview access confirmed",
          ]}
        />
      </div>
    );
  if (view === "articleEditor")
    return (
      <div className="author-workbench">
        <section className="author-main">
          <div className="author-toolbar">
            <b>Text lesson blocks</b>
            {[
              "H1",
              "H2",
              "¶",
              "List",
              "Quote",
              "Code",
              "Callout",
              "Image",
              "Try it",
            ].map((x) => (
              <button key={x}>{x}</button>
            ))}
          </div>
          <div className="article-author-canvas">
            <small>JAVASCRIPT ESSENTIALS · TEXT LESSON</small>
            <input
              className="author-title"
              defaultValue="Store information with variables"
            />
            <textarea
              className="author-intro"
              defaultValue="Variables give meaningful names to values so programs can remember, transform and reuse information."
            />
            <div className="author-block">
              <span>LEARNING OBJECTIVES</span>
              <p>✓ Declare values with const and let</p>
              <p>✓ Choose names that explain intent</p>
              <p>✓ Recognise strings, numbers and booleans</p>
            </div>
            <h2>Start with the value that should not change</h2>
            <p>
              Use const by default. It communicates that the binding should stay
              stable and makes code easier to reason about.
            </p>
            <pre>
              <code>{`const courseName = "JavaScript Foundations";\nconst lessonCount = 33;`}</code>
            </pre>
            <div className="author-insert">＋ Insert block</div>
          </div>
        </section>
        <AuthorReview
          items={[
            "Heading hierarchy valid",
            "Code language selected",
            "Reading time estimated",
            "Accessibility labels complete",
          ]}
        />
      </div>
    );
  if (view === "labEditor")
    return (
      <div className="author-workbench">
        <section className="author-main">
          <div className="lab-author-tabs">
            <b>Lab configuration</b>
            <span className="active">Instructions</span>
            <span>Starter files</span>
            <span>Preview</span>
            <span>Hints</span>
            <span>Checks</span>
            <span>Expected result</span>
          </div>
          <div className="lab-author-grid">
            <section>
              <label>
                Lab title
                <input defaultValue="Build a profile card" />
              </label>
              <label>
                Instructions
                <textarea defaultValue="Create an accessible profile card with a heading, descriptive image alternative, supporting copy and keyboard-operable action." />
              </label>
              <h3>Starter file tree</h3>
              {["index.html", "styles.css", "app.js", "assets/avatar.jpg"].map(
                (x, i) => (
                  <div className="file-author" key={x}>
                    <i>{i === 3 ? "IMG" : "CODE"}</i>
                    <span>{x}</span>
                    <button>•••</button>
                  </div>
                ),
              )}
              <button className="author-add">＋ Add file</button>
            </section>
            <section>
              <h3>Success checks</h3>
              {[
                ["HTML_STRUCTURE", "One h1 heading is present"],
                ["IMAGE_ALT", "Image has descriptive alt text"],
                ["FOCUS_STYLE", "Button has visible keyboard focus"],
              ].map((x, i) => (
                <article className="check-author" key={x[0]}>
                  <i>{i + 1}</i>
                  <div>
                    <b>{x[0]}</b>
                    <span>{x[1]}</span>
                  </div>
                  <button>Configure</button>
                </article>
              ))}
              <h3>Execution policy</h3>
              <div className="policy-card">
                <b>Browser sandbox</b>
                <p>
                  HTML, CSS and JavaScript only. Scripts execute in an isolated
                  preview frame with no same-origin access.
                </p>
                <span>
                  Python · Java · .NET · Node use future runner adapter
                </span>
              </div>
            </section>
          </div>
        </section>
        <AuthorReview
          items={[
            "Starter files valid",
            "Sandbox policy safe",
            "Three checks configured",
            "Expected result attached",
          ]}
        />
      </div>
    );
  return (
    <div className="author-workbench">
      <section className="author-main">
        <div className="author-path">
          <span>Full-Stack Developer</span>
          <b>›</b>
          <span>Projects</span>
          <b>›</b>
          <strong>Course explorer</strong>
        </div>
        <h2>Project package</h2>
        <div className="package-grid">
          <section>
            <label>
              Project title
              <input defaultValue="Responsive course explorer" />
            </label>
            <label>
              Project brief
              <textarea defaultValue="Build a searchable, accessible and responsive course explorer from the supplied design and content fixtures." />
            </label>
            <div className="package-upload">
              <b>Drop a file package or browse</b>
              <span>ZIP up to 250 MB · malware scan required</span>
            </div>
            <h3>Package inventory</h3>
            {[
              "starter-project.zip · 1.4 MB",
              "project-brief.pdf · 2.1 MB",
              "expected-result.gif · 4.8 MB",
              "assets.zip · 12.2 MB",
            ].map((x) => (
              <div className="package-file" key={x}>
                <i>✓</i>
                <span>{x}</span>
                <button>Replace</button>
              </div>
            ))}
          </section>
          <section>
            <h3>Published file tree</h3>
            <div className="package-tree">
              {[
                "▾ starter/",
                "  ▾ src/",
                "    ◇ index.html",
                "    ◇ styles.css",
                "    ◇ app.js",
                "  ▾ assets/",
                "    ◇ course-data.json",
                "◇ README.md",
              ].map((x) => (
                <div key={x}>{x}</div>
              ))}
            </div>
            <h3>Milestones & rubric</h3>
            {[
              "Structure",
              "Responsive styling",
              "Interaction",
              "Review & documentation",
            ].map((x, i) => (
              <div className="package-milestone" key={x}>
                <i>{i + 1}</i>
                <span>
                  <b>{x}</b>
                  <small>
                    {i === 0
                      ? "Semantic, accessible foundation"
                      : "Configured review criteria"}
                  </small>
                </span>
                <button>Edit</button>
              </div>
            ))}
          </section>
        </div>
      </section>
      <AuthorReview
        items={[
          "ZIP scanned",
          "Brief attached",
          "Expected GIF attached",
          "File tree indexed",
          "Four milestones configured",
        ]}
      />
    </div>
  );
}
function AuthorReview({ items }: { items: string[] }) {
  return (
    <aside className="author-review">
      <span>DRAFT QUALITY</span>
      <h3>Ready for review</h3>
      <div className="admin-meter">
        <i style={{ width: "88%" }} />
      </div>
      {items.map((x) => (
        <p key={x}>✓ {x}</p>
      ))}
      <button className="btn primary">Save draft</button>
      <button className="btn">Preview learner view</button>
      <hr />
      <small>
        Publishing creates a new immutable course version. Existing enrollments
        remain pinned to their assigned version.
      </small>
    </aside>
  );
}
export default async function ContentOperationsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; preview?: string }>;
}) {
  const q = await searchParams;
  const capture = process.env.UX_CAPTURE_MODE === "1" && q.preview === "1";
  const manager = capture ? null : await requireContentManager();
  const isSuperAdmin = capture || manager?.platformRole === "PLATFORM_ADMIN";
  const key = q.view || "courses";
  const v = views[key] || views.courses;
  const isForm = ["create", "pricing", "type"].includes(key);
  const isAuthor = [
    "lessonTypes",
    "articleEditor",
    "labEditor",
    "projectPackage",
  ].includes(key);
  return (
    <main className="admin-ref">
      <aside className="admin-ref-side">
        <div className="admin-ref-brand">
          <i><Sparkles /></i>
          <b>Content Studio</b>
          <span>Internal authoring</span>
        </div>
        {[
          ["courses", BookOpen, "Courses"],
          ["modules", Layers3, "Modules & Lessons"],
          ["lessonTypes", Boxes, "Lesson Experiences"],
          ["exams", ClipboardCheck, "Exams & Questions"],
          ["posts", Newspaper, "Blog & Resources"],
          ["webinars", CalendarDays, "Webinars"],
          ["faculty", UsersRound, "Faculty & Media"],
          ["changeRequests", Settings2, "Setting approvals"],
          ["publishing", UploadCloud, "Publishing queue"],
        ].map(([id, Icon, label]: any[]) => (
          <Link
            className={key === id ? "active" : ""}
            href={`/platform-admin/content?view=${id}`}
            key={id}
          >
            <i><Icon /></i>
            {label}
          </Link>
        ))}
        <div className="admin-ref-help">
          <b>
            {isSuperAdmin
              ? "Super Admin permissions"
              : "Content Admin permissions"}
          </b>
          <span>
            {isSuperAdmin
              ? "Review protected settings and publish immutable learner versions."
              : "Author all course content and submit versions or protected settings for Super Admin approval. Publishing is disabled."}
          </span>
        </div>
      </aside>
      <section className="admin-ref-main">
        <header>
          <div>
            <span>{v.kicker}</span>
            <h1>{v.title}</h1>
          </div>
          <div>
            <Link className="btn" href="/content-studio">
              <ExternalLink /> Open Payload Studio
            </Link>
            <Link
              className="btn primary"
              href={
                key === "courses"
                  ? "/platform-admin/content?view=create"
                  : "#action"
              }
            >
              {key === "publishing" ? <UploadCloud /> : key === "changeRequests" ? <ShieldCheck /> : <FileCheck2 />} {v.action}
            </Link>
          </div>
        </header>
        {isAuthor ? (
          <AuthoringWorkbench view={key} />
        ) : (
          <>
            <div className="admin-stat-row">
              {[
                ["12", "Active courses", BookOpen],
                ["47", "Published modules", Layers3],
                ["3", "Items in review", ListChecks],
                ["0", "Projection errors", CheckCircle2],
              ].map(([value, label, Icon]: any[]) => (
                <div key={label}>
                  <i><Icon /></i>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            {isForm ? (
              <div className="admin-form-layout">
                <section className="admin-form">
                  <div className="admin-form-tabs">
                    <span className="active">Basics</span>
                    <span>Commercial</span>
                    <span>Delivery</span>
                    <span>Outcomes</span>
                    <span>Media</span>
                    <span>Completion</span>
                  </div>
                  <label>
                    Course title
                    <input defaultValue="Forward Deployed AI Engineering" />
                  </label>
                  <div className="admin-form-grid">
                    <label>
                      Slug
                      <input defaultValue="ai-engineering" />
                    </label>
                    <label>
                      Category
                      <select defaultValue="Artificial Intelligence">
                        <option>Artificial Intelligence</option>
                      </select>
                    </label>
                    <label>
                      Pricing category
                      <select defaultValue="PRICING">
                        <option>FREE</option>
                        <option>FREEMIUM</option>
                        <option>PRICING</option>
                      </select>
                    </label>
                    <label>
                      Access type
                      <select defaultValue="PAID">
                        <option>FREE</option>
                        <option>PAID</option>
                        <option>PRIVATE</option>
                        <option>ORGANIZATION_ONLY</option>
                      </select>
                    </label>
                    <label>
                      Content type
                      <select defaultValue="HYBRID_OFFLINE_ONLINE">
                        <option>FULL_ONLINE_VIDEOS</option>
                        <option>HYBRID_OFFLINE_ONLINE</option>
                        <option>FULL_OFFLINE</option>
                      </select>
                    </label>
                    <label>
                      List price
                      <input defaultValue="₹35,000" />
                    </label>
                    <label>
                      Current price
                      <input defaultValue="₹29,990" />
                    </label>
                  </div>
                  <label>
                    Short description
                    <textarea defaultValue="A practice-first path from AI engineering to production delivery and enterprise outcomes." />
                  </label>
                  <div className="admin-toggle-row">
                    <span>
                      <i className="on" />
                      Publicly discoverable
                    </span>
                    <span>
                      <i className="on" />
                      Certificate enabled
                    </span>
                    <span>
                      <i />
                      Private enrollment only
                    </span>
                  </div>
                </section>
                <aside className="admin-publish">
                  <span>DRAFT STATUS</span>
                  <h3>Ready for internal review</h3>
                  <div>
                    <b>Content completeness</b>
                    <em>92%</em>
                  </div>
                  <div className="admin-meter">
                    <i style={{ width: "92%" }} />
                  </div>
                  {[
                    "Required metadata complete",
                    "Pricing normalized",
                    "Delivery type valid",
                    "Brochure path verified",
                  ].map((x) => (
                    <p key={x}>✓ {x}</p>
                  ))}
                  <button className="btn primary">
                    {isSuperAdmin ? v.action : "Submit for approval"}
                  </button>
                  <button className="btn">Preview</button>
                </aside>
              </div>
            ) : (
              <div className="admin-queue-stack">
              <section className="admin-table-panel">
                <div className="admin-table-tools">
                  <div><Search /> Search {v.title.toLowerCase()}</div>
                  <button><Filter /> Filter</button>
                  <button><ArrowUpDown /> Sort</button>
                  <button><Columns3 /> Columns</button>
                  <button><UploadCloud /> Export</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      {v.columns.map((x) => (
                        <th key={x}><span>{x}</span><ArrowUpDown /></th>
                      ))}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {v.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((x, j) => (
                          <td key={j}>
                            {j === 0 ? (
                              <strong>{x}</strong>
                            ) : j === row.length - 1 ? (
                              <span className="admin-status">{x}</span>
                            ) : (
                              x
                            )}
                          </td>
                        ))}
                        <td>
                          <button aria-label="More actions"><MoreHorizontal /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <footer>
                  <span>Showing {v.rows.length} records</span>
                  <div>← 1 →</div>
                </footer>
              </section>
              {(key === "changeRequests" || key === "publishing") && (
                <section className="admin-decision-grid">
                  <article>
                    <span><FileCheck2 /> {key === "publishing" ? "SELECTED VERSION" : "SELECTED REQUEST"}</span>
                    <h3>{key === "publishing" ? "Data Structures & Algorithms · v1" : "CR-1042 · Data Structures & Algorithms"}</h3>
                    <p>{key === "publishing" ? "Submitted by Naveen after all 18 release checks passed." : "Priya requested a protected access change from PRIVATE to PAID."}</p>
                    <button className="btn primary"><ExternalLink /> Open full review</button>
                  </article>
                  <article>
                    <span><ListChecks /> REVIEW EVIDENCE</span>
                    <h3>{key === "publishing" ? "Projection and entitlement checks" : "Before and proposed values"}</h3>
                    <ul>
                      <li>Author identity and audit trail verified</li>
                      <li>Commercial and preview rules normalized</li>
                      <li>Brochure, curriculum and learner projection checked</li>
                      <li>Requester is not the approving Super Admin</li>
                    </ul>
                  </article>
                  <article>
                    <span><ShieldCheck /> DECISION</span>
                    <h3>{key === "publishing" ? "Publish immutable version" : "Approve protected change"}</h3>
                    <p>Add a decision note so the employee, reason and final values remain auditable.</p>
                    <textarea aria-label="Decision note" placeholder="Add review note…" />
                    <div><button className="btn"><RotateCcw /> Request changes</button><button className="btn primary"><ShieldCheck /> Approve</button></div>
                  </article>
                </section>
              )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
