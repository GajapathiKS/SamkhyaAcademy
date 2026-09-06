import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Box,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Code2,
  CreditCard,
  Download,
  FileCheck2,
  FileCode2,
  FileText,
  Filter,
  FolderKanban,
  Gauge,
  GraduationCap,
  Image,
  Inbox,
  Layers3,
  LayoutDashboard,
  Library,
  ListChecks,
  LockKeyhole,
  Mail,
  Megaphone,
  MessageCircle,
  MonitorPlay,
  MoreHorizontal,
  Network,
  NotebookPen,
  PanelLeft,
  PencilRuler,
  Play,
  Plus,
  Rocket,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
  Upload,
  UserCheck,
  UserPlus,
  Users,
  Video,
  WandSparkles,
  Workflow,
} from "lucide-react";

type ScreenProps = { screen: number };
type Metric = { label: string; value: string; note: string; icon: LucideIcon; tone?: string };

const learnerNav = [
  ["Overview", LayoutDashboard],
  ["My learning", BookOpen],
  ["Practice labs", Code2],
  ["Assessments", ClipboardCheck],
  ["Projects", FolderKanban],
  ["Discussions", MessageCircle],
  ["Certificates", BadgeCheck],
] as const;

const adminNav = [
  ["Command center", LayoutDashboard],
  ["Course studio", Layers3],
  ["Assessments", ClipboardCheck],
  ["People & roles", Users],
  ["Organizations", BriefcaseBusiness],
  ["Venture Builder", Rocket],
  ["CRM & campaigns", Megaphone],
  ["Settings", Settings2],
] as const;

function IconButton({ icon: Icon, children, primary = false }: { icon: LucideIcon; children: React.ReactNode; primary?: boolean }) {
  return <button className={`rx-button${primary ? " primary" : ""}`}><Icon />{children}</button>;
}

function MetricCards({ items }: { items: Metric[] }) {
  return <section className="rx-metrics">{items.map(({ label, value, note, icon: Icon, tone }) => <article key={label} className={tone || ""}>
    <span className="rx-metric-icon"><Icon /></span><div><small>{label}</small><strong>{value}</strong><p>{note}</p></div><ChartNoAxesCombined className="rx-spark" />
  </article>)}</section>;
}

function SideRail({ items, active, eyebrow = "LEARNING SPACE" }: { items: readonly (readonly [string, LucideIcon])[]; active: string; eyebrow?: string }) {
  return <aside className="rx-side">
    <div className="rx-space"><span><Sparkles /></span><div><small>{eyebrow}</small><b>Samkhya Workspace</b></div></div>
    <nav>{items.map(([label, Icon]) => <div className={label === active ? "active" : ""} key={label}><Icon /><span>{label}</span>{label === "Assessments" && <i>3</i>}</div>)}</nav>
    <section className="rx-help"><span><MessageCircle /></span><b>Need guidance?</b><p>Connect with a mentor or program advisor.</p><button>Book a session <ArrowRight /></button></section>
  </aside>;
}

function Toolbar({ title, subtitle, action = "Export report", icon = Download }: { title: string; subtitle: string; action?: string; icon?: LucideIcon }) {
  return <header className="rx-toolbar"><div><div className="rx-crumb">Home <ChevronRight /> Workspace <ChevronRight /> <b>{title}</b></div><h1>{title}</h1><p>{subtitle}</p></div><div className="rx-toolbar-actions"><button className="rx-icon-only" aria-label="Notifications"><Bell /></button><IconButton icon={Filter}>Filters</IconButton><IconButton icon={icon} primary>{action}</IconButton></div></header>;
}

function LearnerScreen({ screen }: ScreenProps) {
  if (screen >= 21) return <AssessmentScreen screen={screen} />;
  const progress = screen === 19;
  const resources = screen === 20;
  return <main className="rx-screen"><div className="rx-shell">
    <SideRail items={learnerNav} active={resources ? "My learning" : progress ? "My learning" : "Overview"} />
    <section className="rx-main">
      <Toolbar title={resources ? "HTML Structure" : progress ? "Learning Progress" : "Welcome back, Priya"} subtitle={resources ? "Module 1 · Lesson 3 · Full-Stack Development Bootcamp" : progress ? "Track mastery, consistency and project readiness across your learning." : "Continue where you left off and keep your weekly momentum moving."} action={resources ? "Download resources" : "View study plan"} icon={resources ? Download : CalendarDays} />
      {!resources && <MetricCards items={progress ? [
        { label: "Overall mastery", value: "68%", note: "+9% this month", icon: Gauge },
        { label: "Lessons complete", value: "42 / 64", note: "8 completed this week", icon: CheckCircle2 },
        { label: "Practice accuracy", value: "84%", note: "Strongest: JavaScript", icon: Target, tone: "green" },
        { label: "Learning streak", value: "12 days", note: "Personal best", icon: Activity, tone: "gold" },
      ] : [
        { label: "In progress", value: "3", note: "Across two learning paths", icon: BookOpen },
        { label: "Hours learned", value: "28.5", note: "+4.2 hours this week", icon: Clock3 },
        { label: "Practice solved", value: "47", note: "82% first-try accuracy", icon: Code2, tone: "green" },
        { label: "Certificates", value: "2", note: "1 nearly eligible", icon: Trophy, tone: "gold" },
      ]} />}
      {resources ? <LessonResourceView /> : progress ? <ProgressView /> : <DashboardView />}
    </section>
  </div></main>;
}

function DashboardView() {
  return <div className="rx-dashboard-grid">
    <section className="rx-panel rx-continue"><div className="rx-section-head"><div><small>CONTINUE LEARNING</small><h2>Full-Stack Development Bootcamp</h2></div><span className="rx-pill">32% complete</span></div>
      <div className="rx-feature-course"><div className="rx-visual"><MonitorPlay /><span>VIDEO + LIVE CODE</span><b>Build a responsive navigation system</b><button><Play /> Resume 14:18</button></div><div className="rx-course-detail"><span>MODULE 3 · CSS SYSTEMS</span><h3>3.4 Responsive Layout Patterns</h3><p>Use grid, flexbox and fluid spacing to create interfaces that adapt cleanly.</p><div className="rx-progress"><i style={{ width: "32%" }} /></div><div className="rx-mini-stats"><span><CheckCircle2 /> 18 lessons</span><span><Code2 /> 6 labs</span><span><MessageCircle /> 12 discussions</span></div></div></div>
      <div className="rx-next-row"><span><CalendarDays /> <b>Today</b> Live mentor lab · 6:30 PM</span><span><FileCode2 /> Next project: Product landing page</span><IconButton icon={ArrowRight} primary>Continue</IconButton></div>
    </section>
    <aside className="rx-panel rx-today"><div className="rx-section-head"><h2>Today&apos;s plan</h2><button><MoreHorizontal /></button></div>{[
      ["Finish CSS lesson", "14 min", BookOpen], ["Complete layout lab", "25 min", Code2], ["Join mentor session", "6:30 PM", Video]
    ].map(([a,b,I]: any, i) => <div className="rx-task" key={a}><i className={i === 0 ? "done" : ""}>{i === 0 ? <Check /> : i + 1}</i><span><b>{a}</b><small>{b}</small></span><I /></div>)}<div className="rx-week"><b>Weekly goal</b><span>4h 15m / 6h</span><div><i /></div><small>1h 45m to target</small></div></aside>
    <section className="rx-panel rx-courses"><div className="rx-section-head"><div><small>YOUR PROGRAMS</small><h2>Active learning</h2></div><button>View all <ArrowRight /></button></div>{[
      ["Applied ML Engineering", "Feature pipelines", "61%", Bot], ["C Programming Fundamentals", "Pointers & memory", "78%", FileCode2], ["Data Structures & Algorithms", "Graph traversal", "24%", Network]
    ].map(([a,b,c,I]: any) => <article key={a}><span><I /></span><div><b>{a}</b><small>Next: {b}</small><div><i style={{ width: c }} /></div></div><strong>{c}</strong><ChevronRight /></article>)}</section>
    <aside className="rx-panel rx-feed"><div className="rx-section-head"><h2>Learning activity</h2><Activity /></div>{[
      ["Lab passed", "CSS Grid Gallery", CheckCircle2], ["Mentor replied", "Your API question", MessageCircle], ["Badge earned", "7-day consistency", Trophy], ["New resource", "Frontend checklist", Download]
    ].map(([a,b,I]: any) => <div key={a}><span><I /></span><p><b>{a}</b><small>{b}</small></p><time>Today</time></div>)}</aside>
  </div>;
}

function ProgressView() {
  return <div className="rx-progress-layout"><section className="rx-panel rx-path-progress"><div className="rx-section-head"><div><small>LEARNING PATH</small><h2>Full-Stack Developer Journey</h2></div><span className="rx-pill">On track</span></div>
    <div className="rx-pathline">{["Web foundations", "JavaScript", "React", "Backend", "Deployment"].map((x,i)=><div className={i < 2 ? "done" : i === 2 ? "current" : ""} key={x}><i>{i < 2 ? <Check /> : i + 1}</i><b>{x}</b><small>{i < 2 ? "Complete" : i === 2 ? "In progress" : "Locked"}</small></div>)}</div>
    <h3>Module performance</h3>{[
      ["HTML & CSS Foundations", "12 / 12", "92%", "Complete"], ["JavaScript Essentials", "14 / 16", "84%", "Strong"], ["React Fundamentals", "7 / 18", "76%", "In progress"], ["Backend with Node.js", "0 / 15", "—", "Upcoming"]
    ].map((x,i)=><div className="rx-module-row" key={x[0]}><span className={`rx-module-icon m${i}`}><Layers3 /></span><div><b>{x[0]}</b><small>{x[1]} lessons</small></div><div className="rx-progress"><i style={{width: i===0?"100%":i===1?"88%":i===2?"39%":"0%"}} /></div><strong>{x[2]}</strong><span className="rx-pill">{x[3]}</span><ChevronRight /></div>)}</section>
    <aside><section className="rx-panel rx-radar"><div className="rx-section-head"><h2>Skill profile</h2><BarChart3 /></div><div className="rx-radar-visual"><span>HTML<strong>92</strong></span><span>CSS<strong>86</strong></span><span>JS<strong>84</strong></span><span>React<strong>72</strong></span><span>Git<strong>78</strong></span><i /></div></section><section className="rx-panel"><div className="rx-section-head"><h2>Next milestones</h2><Target /></div>{["React assessment", "Portfolio project", "Path checkpoint"].map((x,i)=><div className="rx-milestone" key={x}><i>{i+1}</i><span><b>{x}</b><small>{["May 28", "June 04", "June 12"][i]}</small></span><ChevronRight /></div>)}</section></aside></div>;
}

function LessonResourceView() {
  const tabs = [["Overview", BookOpen],["Resources", Library],["Notes", NotebookPen],["Discussion", MessageCircle],["Assignments", ClipboardCheck]] as const;
  return <div className="rx-lesson-layout"><section className="rx-panel"><div className="rx-lesson-tabs">{tabs.map(([x,I],i)=><div className={i===1?"active":""} key={x}><I />{x}{i===1&&<span>6</span>}</div>)}</div>
    <div className="rx-resource-hero"><div><span>LESSON RESOURCE KIT</span><h2>Everything for HTML Structure</h2><p>Download, annotate, discuss and use the starter files inside the browser code lab.</p></div><span><FolderKanban /></span></div>
    <div className="rx-resource-grid">{[
      ["HTML Elements Cheat Sheet", "PDF · 12 pages", FileText, "Read"], ["Semantic Starter Project", "ZIP · 1.8 MB", FileCode2, "Open in lab"], ["Lesson Slides", "PPTX · 24 slides", MonitorPlay, "Preview"], ["Accessible Markup Checklist", "PDF · 8 pages", FileCheck2, "Download"], ["Page Structure Snippets", "12 reusable snippets", Code2, "Copy"], ["Project Folder Architecture", "Interactive file tree", FolderKanban, "Explore"]
    ].map(([a,b,I,c]: any)=><article key={a}><span><I /></span><div><b>{a}</b><small>{b}</small></div><button>{c}<ArrowRight /></button></article>)}</div>
    <div className="rx-discussion"><div className="rx-section-head"><div><small>LESSON DISCUSSION</small><h2>Questions & insights</h2></div><span className="rx-pill">8 threads</span></div><div className="rx-compose"><span>PS</span><p>Ask a question or share what you discovered…</p><button><Send /></button></div><article><span>AR</span><div><b>Aarav Rao <i>Top contributor</i></b><small>2 hours ago</small><p>Using semantic sections made the page outline much easier to reason about. Is there a recommended nesting depth?</p><button>Reply</button><button>Helpful · 12</button></div></article></div>
  </section><aside><section className="rx-panel rx-lesson-next"><span>NEXT UP</span><h3>1.4 CSS Styling Fundamentals</h3><p>Learn how visual rules cascade across a page.</p><div><Clock3 />14:18</div><IconButton icon={Play} primary>Preview lesson</IconButton></section><section className="rx-panel"><h3>Resource progress</h3>{["Cheat sheet", "Starter files", "Checklist"].map((x,i)=><div className="rx-check-row" key={x}><i className={i<2?"done":""}>{i<2?<Check />:""}</i><span>{x}</span></div>)}</section></aside></div>;
}

function AssessmentScreen({ screen }: ScreenProps) {
  const result = screen === 23;
  const taking = screen === 22;
  const certificate = screen === 24;
  if (certificate) return <CertificateScreen />;
  return <main className="rx-screen"><div className="rx-shell"><SideRail items={learnerNav} active="Assessments" /><section className="rx-main"><Toolbar title={result ? "Assessment Result" : taking ? "JavaScript Foundations Assessment" : "Ready for your assessment?"} subtitle={result ? "Your attempt has been graded. Review mastery and the next recommended actions." : taking ? "Question 8 of 20 · Single-answer question" : "JavaScript Foundations · Module checkpoint"} action={result ? "Download result" : taking ? "Save & exit" : "View syllabus"} icon={result ? Download : BookOpen} />
    {taking ? <QuestionView /> : result ? <ResultView /> : <ExamStartView />}</section></div></main>;
}

function ExamStartView() {
  return <div className="rx-exam-start"><section className="rx-panel rx-exam-hero"><div><span className="rx-kicker"><ClipboardCheck /> KNOWLEDGE CHECK</span><h2>JavaScript Foundations</h2><p>Demonstrate your understanding of variables, functions, arrays, objects and asynchronous programming.</p><div className="rx-exam-stats">{[["20 questions", ListChecks],["35 minutes", Clock3],["75% to pass", Target],["2 attempts", Activity]].map(([x,I]: any)=><span key={x}><I /><b>{x}</b></span>)}</div></div><div className="rx-score-ring"><strong>75%</strong><span>Passing score</span></div></section>
    <section className="rx-panel rx-instructions"><div className="rx-section-head"><div><small>BEFORE YOU BEGIN</small><h2>Assessment instructions</h2></div><ShieldCheck /></div><div className="rx-instruction-grid">{[
      ["Focused attempt", "Complete the assessment in one sitting. Your timer begins after confirmation.", Clock3], ["Navigate freely", "Move between questions and flag anything you want to revisit.", Workflow], ["Automatic saving", "Every answer is saved so a brief connection issue will not lose progress.", ShieldCheck], ["Instant feedback", "See mastery by topic and recommended lessons after submission.", BarChart3]
    ].map(([a,b,I]: any,i)=><article key={a}><i>{i+1}</i><span><I /></span><div><b>{a}</b><p>{b}</p></div></article>)}</div><label className="rx-consent"><span><Check /></span><p><b>I understand the assessment rules</b><small>I am ready to begin a timed attempt.</small></p></label><div className="rx-exam-actions"><span><LockKeyhole /> Answers and attempt data are securely stored.</span><IconButton icon={Play} primary>Start assessment</IconButton></div></section>
    <aside className="rx-panel rx-readiness"><div className="rx-section-head"><h2>Readiness check</h2><Gauge /></div>{[["Lessons complete","12 / 12"],["Practice accuracy","84%"],["Previous best","—"],["Attempts available","2"]].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<div className="rx-ready"><CheckCircle2 /><span><b>You&apos;re ready</b><small>All prerequisites complete</small></span></div></aside></div>;
}

function QuestionView() {
  return <div className="rx-question-layout"><section className="rx-panel rx-question-nav"><div className="rx-section-head"><h2>Question map</h2><span>8 / 20</span></div><div className="rx-q-grid">{Array.from({length:20},(_,i)=><i key={i} className={i<7?"done":i===7?"current":i===11?"flag":""}>{i+1}</i>)}</div><div className="rx-q-legend"><span><i className="done" />Answered</span><span><i className="current" />Current</span><span><i className="flag" />Flagged</span></div><div className="rx-timer"><Clock3 /><span><small>TIME REMAINING</small><b>24:38</b></span></div></section>
    <section className="rx-panel rx-question"><div className="rx-question-meta"><span>FUNCTIONS & SCOPE</span><button><Target /> Flag for review</button></div><h2>What will the following JavaScript code output?</h2><pre>{`const score = 8;\nfunction update() {\n  const score = 12;\n  return score + 3;\n}\nconsole.log(update(), score);`}</pre><div className="rx-options">{["15 8", "11 12", "15 12", "8 15"].map((x,i)=><label className={i===0?"selected":""} key={x}><i>{String.fromCharCode(65+i)}</i><span>{x}</span>{i===0&&<CheckCircle2 />}</label>)}</div><footer><IconButton icon={ArrowRight}>Previous</IconButton><span>Autosaved just now <ShieldCheck /></span><IconButton icon={ArrowRight} primary>Next question</IconButton></footer></section>
    <aside className="rx-panel rx-exam-context"><h3>Assessment progress</h3><div className="rx-score-ring mini"><strong>40%</strong><span>8 of 20</span></div><div className="rx-progress"><i style={{width:"40%"}} /></div><h3>Topic coverage</h3>{[["Syntax", "4 / 4"],["Functions", "2 / 5"],["Arrays", "2 / 4"],["Async", "0 / 4"]].map(x=><div className="rx-topic" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<button className="rx-submit">Submit assessment <ArrowRight /></button></aside></div>;
}

function ResultView() {
  return <div className="rx-result-layout"><section className="rx-panel rx-result-hero"><div className="rx-result-badge"><Trophy /></div><div><span className="rx-kicker">ASSESSMENT PASSED</span><h2>Excellent work, Priya!</h2><p>You demonstrated strong mastery of JavaScript foundations and unlocked your module certificate.</p><div className="rx-result-actions"><IconButton icon={FileText}>Review answers</IconButton><IconButton icon={BadgeCheck} primary>View certificate</IconButton></div></div><div className="rx-score-ring"><strong>86%</strong><span>17 / 20 correct</span></div></section>
    <MetricCards items={[{label:"Score",value:"86%",note:"11% above pass mark",icon:Target,tone:"green"},{label:"Time used",value:"26:42",note:"8m 18s remaining",icon:Clock3},{label:"Correct",value:"17 / 20",note:"3 to review",icon:CheckCircle2},{label:"Percentile",value:"Top 18%",note:"Within this cohort",icon:Trophy,tone:"gold"}]} />
    <section className="rx-panel rx-mastery"><div className="rx-section-head"><div><small>TOPIC MASTERY</small><h2>Performance breakdown</h2></div><BarChart3 /></div>{[["Syntax & variables",95,"Strong"],["Functions & scope",88,"Strong"],["Arrays & objects",82,"Proficient"],["Asynchronous JavaScript",68,"Review"]].map(([a,b,c]: any)=><div key={a}><span><b>{a}</b><small>{c}</small></span><div className="rx-progress"><i style={{width:`${b}%`}} /></div><strong>{b}%</strong></div>)}</section>
    <aside className="rx-panel rx-recommend"><div className="rx-section-head"><h2>Recommended next</h2><WandSparkles /></div><article><span><BookOpen /></span><div><b>Async JavaScript recap</b><small>8 min · Text + examples</small></div><ArrowRight /></article><article><span><Code2 /></span><div><b>Promises practice lab</b><small>15 min · Browser lab</small></div><ArrowRight /></article><article><span><Rocket /></span><div><b>Start React Fundamentals</b><small>Next module unlocked</small></div><ArrowRight /></article></aside></div>;
}

function CertificateScreen() {
  return <main className="rx-screen"><div className="rx-shell"><SideRail items={learnerNav} active="Certificates" /><section className="rx-main"><Toolbar title="Certificates & Credentials" subtitle="View, verify and share evidence of your learning outcomes." action="Share profile" icon={Send} />
    <div className="rx-cert-layout"><section className="rx-certificate"><div className="rx-cert-border"><header><span><Sparkles /></span><div><b>Samkhya<span>Academy</span></b><small>A Samkhya Technologies Initiative</small></div><BadgeCheck /></header><div className="rx-cert-body"><span>CERTIFICATE OF COMPLETION</span><p>This credential is proudly awarded to</p><h2>Priya Sharma</h2><p>for successfully completing the assessed learning program</p><h3>JavaScript Foundations</h3><div className="rx-cert-evidence"><span><b>86%</b>Final assessment</span><span><b>24</b>Practice exercises</span><span><b>3</b>Applied projects</span></div></div><footer><span><i>RG</i><b>Dr. Raghu Gupta</b><small>Program Director</small></span><span><i>✓</i><b>Verified credential</b><small>SA-JSF-2026-01842</small></span></footer></div></section>
    <aside><section className="rx-panel rx-credential"><div className="rx-section-head"><h2>Credential details</h2><ShieldCheck /></div>{[["Issued","18 August 2026"],["Credential ID","SA-JSF-2026-01842"],["Course version","v3.2"],["Status","Verified · Active"]].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<IconButton icon={Download} primary>Download PDF</IconButton><div className="rx-share"><button><Send />Share</button><button><BadgeCheck />Add to profile</button></div></section><section className="rx-panel rx-verify"><span><ShieldCheck /></span><div><b>Publicly verifiable</b><p>Anyone can confirm this credential without seeing private learner data.</p><button>Open verification page <ArrowRight /></button></div></section></aside></div>
    <section className="rx-panel rx-credential-evidence"><div className="rx-section-head"><div><small>VERIFIED EVIDENCE</small><h2>What this credential represents</h2></div><span className="rx-pill">Immutable course version v3.2</span></div><div>{[["Learning completed","12 lessons · 6.4 hours",BookOpen],["Practice demonstrated","24 exercises · 82% accuracy",Code2],["Assessment passed","86% · first attempt",ClipboardCheck],["Projects reviewed","3 applied submissions",FolderKanban]].map(([a,b,I]: any)=><article key={a}><span><I /></span><div><b>{a}</b><small>{b}</small></div><CheckCircle2 /></article>)}</div></section>
  </section></div></main>;
}

const opsConfig: Record<number, { title: string; sub: string; active: string; action: string; entity: string; icon: LucideIcon }> = {
  29:{title:"Venture Cohort Command Center",sub:"Monitor founder progress, mentor capacity and stage-review risk across active cohorts.",active:"Venture Builder",action:"Create cohort",entity:"Venture",icon:Rocket},
  30:{title:"Platform Command Center",sub:"A live operational view of learning, commerce, organizations and publishing.",active:"Command center",action:"Create workspace",entity:"Platform",icon:LayoutDashboard},
  31:{title:"Course Management",sub:"Create, govern and publish versioned learning experiences across every delivery format.",active:"Course studio",action:"Create course",entity:"Course",icon:Layers3},
  32:{title:"Create Course",sub:"Build commercial settings, delivery metadata and the learner-facing course identity.",active:"Course studio",action:"Save draft",entity:"Builder",icon:PencilRuler},
  33:{title:"Pricing & Access Models",sub:"Govern free, freemium, paid, private and organization access consistently.",active:"Course studio",action:"Add pricing rule",entity:"Pricing",icon:CircleDollarSign},
  34:{title:"Learning Experience Types",sub:"Configure video, text, code labs, live, hybrid and offline delivery patterns.",active:"Course studio",action:"Add experience",entity:"Experience",icon:MonitorPlay},
  35:{title:"Curriculum Builder",sub:"Compose modules, lessons, resources, practice and projects in one structured workflow.",active:"Course studio",action:"Add module",entity:"Curriculum",icon:Workflow},
  36:{title:"Assessment Studio",sub:"Manage question banks, exam blueprints, scoring rules and certificate eligibility.",active:"Assessments",action:"Create assessment",entity:"Assessment",icon:ClipboardCheck},
  37:{title:"Insights Publishing Studio",sub:"Draft discussion-led articles, technical explainers and program resources.",active:"Course studio",action:"New article",entity:"Article",icon:NotebookPen},
  38:{title:"Webinar Operations",sub:"Schedule sessions, manage speakers and convert registrations into qualified leads.",active:"Course studio",action:"Schedule webinar",entity:"Webinar",icon:Video},
  39:{title:"Faculty & Media Library",sub:"Manage expert profiles and reusable, rights-aware visual learning assets.",active:"Course studio",action:"Upload media",entity:"Asset",icon:Image},
  45:{title:"CRM Lead Command Center",sub:"Prioritize interest, consent, follow-ups and conversion across every acquisition channel.",active:"CRM & campaigns",action:"Export leads",entity:"Lead",icon:Inbox},
  46:{title:"Lead 360° & Follow-up",sub:"Understand intent, timeline, consent and every interaction before the next action.",active:"CRM & campaigns",action:"Create offer",entity:"Lead detail",icon:UserCheck},
  47:{title:"Campaign Command Center",sub:"Plan governed email and WhatsApp communication with suppression controls.",active:"CRM & campaigns",action:"Create campaign",entity:"Campaign",icon:Megaphone},
  48:{title:"WhatsApp Campaign Builder",sub:"Compose an approved template, choose a consented audience and stage delivery.",active:"CRM & campaigns",action:"Save campaign",entity:"WhatsApp",icon:MessageCircle},
  49:{title:"Email Campaign Builder",sub:"Design a focused learning message, segment recipients and schedule delivery.",active:"CRM & campaigns",action:"Schedule email",entity:"Email",icon:Mail},
};

function OperationsScreen({ screen }: ScreenProps) {
  const c = opsConfig[screen] || opsConfig[30];
  return <main className="rx-screen rx-ops"><div className="rx-shell"><SideRail items={adminNav} active={c.active} eyebrow="INTERNAL OPERATIONS" /><section className="rx-main"><Toolbar title={c.title} subtitle={c.sub} action={c.action} icon={screen===39?Upload:screen===45?Download:Plus} />
    {screen===32 ? <CourseBuilder /> : screen>=33&&screen<=39 ? <ContentStudio screen={screen} /> : screen===46 ? <LeadDetail /> : screen===48||screen===49 ? <CampaignBuilder email={screen===49} /> : <OpsDashboard screen={screen} entity={c.entity} icon={c.icon} />}
  </section></div></main>;
}

function OpsDashboard({screen,entity,icon:EntityIcon}:{screen:number;entity:string;icon:LucideIcon}) {
  const venture=screen===29, crm=screen===45, campaign=screen===47;
  return <><MetricCards items={venture?[
    {label:"Active ventures",value:"42",note:"Across 4 cohorts",icon:Rocket},{label:"Reviews due",value:"11",note:"3 need attention",icon:ClipboardCheck,tone:"gold"},{label:"Stage completion",value:"68%",note:"+7% this month",icon:Gauge,tone:"green"},{label:"Mentor capacity",value:"76%",note:"18 active mentors",icon:Users}
  ]:crm?[
    {label:"Qualified leads",value:"286",note:"+18 this week",icon:Target},{label:"Follow-ups due",value:"34",note:"9 high intent",icon:Clock3,tone:"gold"},{label:"Offer conversion",value:"18.6%",note:"+2.4% this month",icon:CircleDollarSign,tone:"green"},{label:"Consent coverage",value:"94%",note:"Suppression enforced",icon:ShieldCheck}
  ]:campaign?[
    {label:"Active campaigns",value:"6",note:"2 scheduled today",icon:Megaphone},{label:"Audience reached",value:"12.8K",note:"Consented contacts",icon:Users},{label:"Engagement",value:"38.4%",note:"+5.1% vs average",icon:Activity,tone:"green"},{label:"Conversions",value:"184",note:"Attributed enrollments",icon:Target,tone:"gold"}
  ]:[
    {label:"Active learners",value:"8,426",note:"+12.4% this quarter",icon:Users},{label:"Published courses",value:"38",note:"7 awaiting approval",icon:Layers3},{label:"Organizations",value:"46",note:"82% seat utilization",icon:BriefcaseBusiness,tone:"green"},{label:"Revenue pipeline",value:"₹18.4L",note:"Test-mode reporting",icon:BarChart3,tone:"gold"}
  ]} />
  <div className="rx-ops-grid"><section className="rx-panel rx-data"><div className="rx-section-head"><div><small>LIVE WORKSPACE</small><h2>{venture?"Cohort review queue":crm?"Priority lead pipeline":campaign?"Campaign portfolio":"Operational priorities"}</h2></div><div className="rx-table-tools"><button><Search />Search</button><button><Filter />Filter</button><button><SlidersHorizontal />Sort</button></div></div>
    <div className="rx-table-head"><span>{entity}</span><span>Owner / channel</span><span>Progress / status</span><span>Next action</span><span /></div>{[
      venture?["StellaCare · Cohort 7","Meera Iyer","MVP Build · 60%","Review May 23"]:crm?["Aarav Menon · FDE","Organic brochure","Qualified · 84","Call today"]:campaign?["Applied ML Webinar","Email + WhatsApp","Running · 42%","Review funnel"]:["Course publish queue","Content team","7 awaiting","Approve versions"],
      venture?["AgriPulse · Cohort 7","Raghav Bansal","Customer Validation · 85%","Mentor review"]:crm?["Nisha Kapoor · DSA","Webinar","High intent · 91","Send offer"]:campaign?["C++ Free Acquisition","Email","Scheduled","Starts 5 PM"]:["Organization onboarding","Success team","4 in progress","Resolve seats"],
      venture?["FinNest · Cohort 6","Ananya Rao","Pilot Launch · 72%","Artifact feedback"]:crm?["Vikram Shah · Leadership","Advisor referral","Nurture · 64","Share cohort plan"]:campaign?["Venture Builder Cohort","WhatsApp","Draft · 78%","Approval needed"]:["Assessment health","Learning ops","3 flagged","Review questions"],
      venture?["CareBridge · Cohort 8","Kabir Mehta","Idea Intake · 32%","Assign mentor"]:crm?["Meera Das · Analytics","Corporate form","Qualified · 78","Org discovery"]:campaign?["Data Analytics Guide","Email","Completed","Analyze results"]:["Payment reconciliation","Finance ops","12 pending","Verify events"]
    ].map((x,i)=><div className="rx-table-row" key={x[0]}><span><i className={`entity e${i}`}><EntityIcon /></i><b>{x[0]}</b><small>ID · 00{184+i}</small></span><span><b>{x[1]}</b><small>{i%2?"Updated yesterday":"Updated 18m ago"}</small></span><span><b>{x[2]}</b><div className="rx-progress"><i style={{width:`${[72,86,58,34][i]}%`}} /></div></span><span><b>{x[3]}</b><small>{i===0?"High priority":"On track"}</small></span><button><MoreHorizontal /></button></div>)}</section>
    <aside><section className="rx-panel rx-ops-chart"><div className="rx-section-head"><h2>{venture?"Stage distribution":crm?"Lead source quality":campaign?"Channel performance":"Platform activity"}</h2><BarChart3 /></div><div className="rx-bars">{[["Learning",82],["Practice",64],["Review",74],["Conversion",51],["Completion",69]].map(([x,v]:any)=><div key={x}><span>{x}</span><i><b style={{height:`${v}%`}} /></i><strong>{v}%</strong></div>)}</div></section><section className="rx-panel rx-attention"><div className="rx-section-head"><h2>Needs attention</h2><Bell /></div>{[["3 reviews overdue","Resolve today",Clock3],["2 approval conflicts","Compare versions",Workflow],["1 consent exception","Inspect record",ShieldCheck]].map(([a,b,I]:any)=><article key={a}><span><I /></span><div><b>{a}</b><small>{b}</small></div><ChevronRight /></article>)}</section></aside></div></>;
}

function CourseBuilder() {
  return <div className="rx-builder-layout"><section className="rx-builder-steps">{[["Identity",Sparkles],["Audience",Users],["Commercial",CircleDollarSign],["Delivery",MonitorPlay],["Curriculum",Layers3],["Governance",ShieldCheck]].map(([x,I]:any,i)=><div className={i===0?"active":i<0?"done":""} key={x}><i>{i+1}</i><I /><span><b>{x}</b><small>{i===0?"In progress":"Not started"}</small></span></div>)}</section><section className="rx-panel rx-form"><div className="rx-section-head"><div><small>STEP 1 OF 6</small><h2>Course identity</h2></div><span className="rx-pill">Draft auto-saved</span></div><div className="rx-form-grid"><label className="wide"><span>Course title *</span><div>e.g. Applied Machine Learning Engineering</div></label><label><span>Public slug *</span><div>applied-ml-engineering</div></label><label><span>Program family *</span><div>Engineering <ChevronRight /></div></label><label className="wide"><span>Positioning statement *</span><div className="textarea">Describe the learner outcome and practical value in one focused sentence.</div></label><label><span>Primary level *</span><div>Intermediate <ChevronRight /></div></label><label><span>Estimated duration *</span><div>16 weeks</div></label></div><div className="rx-objectives"><div className="rx-section-head"><h3>Learning outcomes</h3><IconButton icon={Plus}>Add outcome</IconButton></div>{["Design reliable ML workflows from data to deployment","Build observable model services for real product constraints","Communicate trade-offs with product and business stakeholders"].map((x,i)=><div key={x}><i>{i+1}</i><span>{x}</span><button><MoreHorizontal /></button></div>)}</div><footer><span><ShieldCheck /> Content admins can draft; Super Admin approval is required to publish.</span><IconButton icon={ArrowRight} primary>Continue to audience</IconButton></footer></section><aside className="rx-panel rx-live-preview"><div className="rx-section-head"><h2>Live card preview</h2><MonitorPlay /></div><div className="rx-preview-card"><span><Bot /></span><small>ENGINEERING PROGRAM</small><h3>Applied Machine Learning Engineering</h3><p>Build production-aware ML systems through guided projects.</p><div><i>16 weeks</i><i>Intermediate</i></div><button>Explore program <ArrowRight /></button></div><div className="rx-quality"><b>Content quality</b><span>72%</span><div><i /></div><small>Complete audience and delivery details.</small></div></aside></div>;
}

const contentModes: Record<number,{heading:string;icon:LucideIcon;items:string[]}>={
  33:{heading:"Access model library",icon:CircleDollarSign,items:["Free acquisition","Freemium preview","Paid individual","Private offer","Organization entitlement","Cohort sponsored"]},
  34:{heading:"Learning experience library",icon:MonitorPlay,items:["Instructor video","Text-first article","Browser code lab","Interactive simulation","Live cohort session","Hybrid classroom"]},
  35:{heading:"Full-Stack Development Bootcamp",icon:Workflow,items:["Web Development Basics","HTML & CSS Deep Dive","JavaScript Essentials","React Fundamentals","Backend with Node.js","Capstone Project"]},
  36:{heading:"Assessment & question bank",icon:ClipboardCheck,items:["JavaScript module checkpoint","HTML & CSS practical","React concepts assessment","Backend architecture exam","Capstone evaluation rubric","Certificate eligibility rule"]},
  37:{heading:"Insights & discussion articles",icon:NotebookPen,items:["Building Reliable AI Systems","A Practical Guide to RAG","Designing Useful Code Labs","Responsible Model Evaluation","Founder Validation Playbook","Learning Through Deliberate Practice"]},
  38:{heading:"Upcoming webinar calendar",icon:Video,items:["Reliable RAG Systems","From Tasks to Agents","Graph Algorithms Visually","Building Your First MVP","AI Leadership Roundtable","Modern C++ Foundations"]},
  39:{heading:"Faculty & reusable media",icon:Image,items:["Dr. Raghu Gupta","Meera Iyer","Raghav Bansal","AI systems classroom","Browser coding studio","Venture workshop"]}
};

function ContentStudio({screen}:{screen:number}) {
  const c=contentModes[screen];
  return <><MetricCards items={[{label:"Active",value:screen===39?"184":"24",note:"Available to editors",icon:c.icon},{label:"Draft",value:"7",note:"Work in progress",icon:PencilRuler},{label:"Awaiting approval",value:"4",note:"Super Admin queue",icon:Clock3,tone:"gold"},{label:"Published",value:"32",note:"Version governed",icon:BadgeCheck,tone:"green"}]} /><div className="rx-content-layout"><section className="rx-panel"><div className="rx-section-head"><div><small>CONTENT OPERATIONS</small><h2>{c.heading}</h2></div><div className="rx-table-tools"><button><Search />Search</button><button><Filter />Filter</button><button><SlidersHorizontal />Sort</button></div></div><div className="rx-content-cards">{c.items.map((x,i)=><article key={x}><span className={`content-icon c${i}`}><c.icon /></span><div><small>{screen===35?`MODULE ${i+1}`:screen===38?["MAY 22","MAY 29","JUN 05","JUN 12","JUN 19","JUN 26"][i]:"SAMKHYA ACADEMY"}</small><b>{x}</b><p>{screen===33?"Policy-based access with explicit learner entitlement states.":screen===34?"Reusable lesson capability with completion and evidence rules.":screen===39?"Profile, rights, crops and program usage are centrally governed.":"Rich content, evidence and publishing metadata are ready for review."}</p></div><div className="rx-card-status"><span className="rx-pill">{i%3===0?"Published":i%3===1?"Draft":"Review"}</span><button><MoreHorizontal /></button></div></article>)}</div></section><aside><section className="rx-panel"><div className="rx-section-head"><h2>Publishing workflow</h2><Workflow /></div>{[["Content draft","Content Admin",CheckCircle2],["Quality review","Reviewer",Activity],["Protected settings","Super Admin",ShieldCheck],["Immutable publish","Super Admin",BadgeCheck]].map(([a,b,I]:any,i)=><div className="rx-publish-step" key={a}><i className={i===0?"done":""}>{i+1}</i><I /><span><b>{a}</b><small>{b}</small></span></div>)}</section><section className="rx-panel rx-governance"><span><ShieldCheck /></span><div><b>Two-person governance</b><p>Editors can create everything. Publishing and protected settings always require Super Admin approval.</p></div></section></aside></div></>;
}

function LeadDetail() { return <div className="rx-lead-layout"><section className="rx-panel rx-lead-profile"><div className="rx-lead-head"><span>AM</span><div><small>QUALIFIED LEAD · SCORE 91</small><h2>Aarav Menon</h2><p>Senior Engineer · Bengaluru · Interested in FDE Engineering</p></div><span className="rx-pill">High intent</span></div><div className="rx-lead-stats">{[["Email consent","Granted",Mail],["WhatsApp consent","Granted",MessageCircle],["Last engagement","18m ago",Activity],["Expected cohort","October 2026",CalendarDays]].map(([a,b,I]:any)=><div key={a}><I /><span><small>{a}</small><b>{b}</b></span></div>)}</div><div className="rx-section-head"><div><small>CONVERSATION TIMELINE</small><h2>Activity & follow-up</h2></div><IconButton icon={Plus}>Log activity</IconButton></div>{[["Brochure downloaded","FDE Engineering · Website","18m ago",Download],["Webinar attended","Building Responsible AI Systems","2 days ago",Video],["Advisor note","Exploring a team-sponsored enrollment.","2 days ago",NotebookPen],["Email opened","FDE curriculum and cohort plan","4 days ago",Mail]].map(([a,b,c,I]:any)=><article className="rx-timeline" key={a}><span><I /></span><div><b>{a}</b><p>{b}</p><small>{c}</small></div><button><MoreHorizontal /></button></article>)}</section><aside><section className="rx-panel rx-next-action"><span><Target /></span><small>RECOMMENDED NEXT ACTION</small><h3>Schedule a 20-minute advisor call</h3><p>Interest and engagement indicate a high likelihood to enroll within this cohort window.</p><IconButton icon={CalendarDays} primary>Schedule call</IconButton></section><section className="rx-panel"><h3>Opportunity</h3>{[["Program","FDE Engineering"],["List price","₹69,900"],["Suggested offer","₹62,900"],["Owner","Meera Iyer"]].map(x=><div className="rx-detail-row" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<button className="rx-full-button"><CircleDollarSign />Create private offer</button></section><section className="rx-panel"><h3>Internal note</h3><div className="rx-note-box">Add a private note for the sales and learner-success team…</div><IconButton icon={Send}>Save note</IconButton></section></aside></div> }

function CampaignBuilder({email}:{email:boolean}) { return <div className="rx-campaign-layout"><section className="rx-builder-steps">{[["Audience",Users],["Message",email?Mail:MessageCircle],["Consent",ShieldCheck],["Schedule",CalendarDays],["Review",ClipboardCheck]].map(([x,I]:any,i)=><div className={i===1?"active":i===0?"done":""} key={x}><i>{i===0?<Check />:i+1}</i><I /><span><b>{x}</b><small>{i===0?"1,842 recipients":i===1?"In progress":"Not started"}</small></span></div>)}</section><section className="rx-panel rx-campaign-editor"><div className="rx-section-head"><div><small>{email?"EMAIL":"WHATSAPP"} CAMPAIGN</small><h2>Compose the message</h2></div><span className="rx-pill">Draft</span></div><label><span>Campaign name</span><div>Applied ML · October Cohort</div></label><label><span>{email?"Subject line":"Approved template"}</span><div>{email?"Build production-aware ML systems this October":"program_cohort_invitation_v4"}<ChevronRight /></div></label><label><span>{email?"Preview text":"Template language"}</span><div>{email?"Projects, mentor guidance and practical deployment experience.":"English (India)"}<ChevronRight /></div></label><div className="rx-message-editor"><div><button><b>B</b></button><button><i>I</i></button><button><ListChecks /></button><button><FileText /></button><button><Sparkles /></button></div><p>Hi <strong>{`{{first_name}}`}</strong>,</p><p>Move from ML concepts to reliable product delivery with the Applied ML Engineering cohort.</p><ul><li>Production-aware projects</li><li>Expert mentor reviews</li><li>Deployment and observability practice</li></ul><p><b>Applications close 24 September.</b></p><button>Explore the program <ArrowRight /></button></div><footer><span><ShieldCheck /> Only consented, non-suppressed contacts will be eligible.</span><IconButton icon={ArrowRight} primary>Continue to consent</IconButton></footer></section><aside className="rx-panel rx-message-preview"><div className="rx-section-head"><h2>Live preview</h2><MonitorPlay /></div><div className={email?"rx-email-preview":"rx-phone-preview"}><header>{email?<><Sparkles /><span><b>SamkhyaAcademy</b><small>to Priya</small></span></>:<><MessageCircle /><b>SamkhyaAcademy</b></>}</header><main><span>Hi Priya,</span><h3>Build production-aware ML systems.</h3><p>Join an applied cohort built around projects, mentor reviews and deployment practice.</p><div><Bot /></div><button>Explore the program</button><small>SamkhyaAcademy · Consent preferences</small></main></div><div className="rx-delivery-health"><b>Delivery readiness</b><span>82%</span><div><i /></div><small>Complete consent review and send a test.</small></div></aside></div> }

function OrganizationScreen({screen}:{screen:number}) {
 const onboarding=screen===41, assignments=screen===42;
 const orgNav=[["Overview",LayoutDashboard],["People",Users],["Learning plans",Workflow],["Assignments",ClipboardCheck],["Progress & reports",BarChart3],["Certificates",BadgeCheck],["Organization settings",Settings2]] as const;
 return <main className="rx-screen"><div className="rx-shell"><SideRail items={orgNav} active={onboarding?"People":assignments?"Assignments":"Overview"} eyebrow="ORGANIZATION PORTAL" /><section className="rx-main"><Toolbar title={onboarding?"Learner Onboarding":assignments?"Assignments & Progress":"Acme Digital Learning Hub"} subtitle={onboarding?"Invite employees, organize cohorts and securely manage seat allocation.":assignments?"Assign governed course versions and monitor learning outcomes by team.":"A practical view of participation, capability growth and organization learning impact."} action={onboarding?"Invite learners":assignments?"Create assignment":"Export report"} icon={onboarding?UserPlus:assignments?Plus:Download}/>{onboarding?<OrgOnboarding/>:assignments?<OrgAssignments/>:<OrgDashboard/>}</section></div></main>
}

function OrgDashboard(){return <><MetricCards items={[{label:"Active learners",value:"284",note:"89% of allocated seats",icon:Users},{label:"Course completion",value:"76%",note:"+8% this quarter",icon:CheckCircle2,tone:"green"},{label:"Learning hours",value:"1,842",note:"6.5h per learner",icon:Clock3},{label:"Certificates earned",value:"126",note:"32 this month",icon:Trophy,tone:"gold"}]}/><div className="rx-org-grid"><section className="rx-panel rx-org-progress"><div className="rx-section-head"><div><small>CAPABILITY PORTFOLIO</small><h2>Learning plan performance</h2></div><div className="rx-table-tools"><button><Filter/>Teams</button><button><Download/>Export</button></div></div>{[["AI Engineering Foundations","Engineering","86%","148 / 172"],["Data Analytics for Decisions","Business Ops","74%","68 / 92"],["AI Leadership Program","Leadership","62%","18 / 29"],["Cybersecurity Essentials","Technology","81%","44 / 54"]].map((x,i)=><article key={x[0]}><span className={`org-icon o${i}`}><BookOpen /></span><div><b>{x[0]}</b><small>{x[1]} · {x[3]} learners</small></div><div className="rx-progress"><i style={{width:x[2]}}/></div><strong>{x[2]}</strong><ChevronRight/></article>)}</section><aside className="rx-panel rx-skill-chart"><div className="rx-section-head"><h2>Capability growth</h2><BarChart3/></div>{[["AI fluency",84],["Data reasoning",76],["Software delivery",69],["Responsible AI",81],["Leadership",64]].map(([x,v]:any)=><div key={x}><span>{x}</span><div className="rx-progress"><i style={{width:`${v}%`}}/></div><b>{v}%</b></div>)}</aside><section className="rx-panel rx-team-table"><div className="rx-section-head"><div><small>TEAM VIEW</small><h2>Engagement by function</h2></div><button>View people <ArrowRight/></button></div>{[["Engineering","112 learners","82% active","7.2h / month"],["Business Operations","74 learners","78% active","5.8h / month"],["Product","54 learners","91% active","8.1h / month"],["Leadership","29 learners","69% active","4.4h / month"]].map((x,i)=><div key={x[0]}><i><Users/></i><b>{x[0]}</b><span>{x[1]}</span><span>{x[2]}</span><span>{x[3]}</span><ChevronRight/></div>)}</section><aside className="rx-panel rx-org-actions"><div className="rx-section-head"><h2>Recommended actions</h2><WandSparkles/></div>{[["12 learners falling behind","Send a reminder",Bell],["8 seats available","Invite learners",UserPlus],["Quarterly report ready","Review outcomes",FileText]].map(([a,b,I]:any)=><article key={a}><span><I/></span><div><b>{a}</b><small>{b}</small></div><ArrowRight/></article>)}</aside></div></>}

function OrgOnboarding(){return <div className="rx-onboard-layout"><section className="rx-panel"><div className="rx-section-head"><div><small>PEOPLE DIRECTORY</small><h2>284 organization learners</h2></div><div className="rx-table-tools"><button><Search/>Search</button><button><Filter/>Filter</button><button><Upload/>Bulk import</button></div></div><div className="rx-onboard-banner"><span><UserPlus/></span><div><b>Onboard a team in minutes</b><p>Invite individuals, upload a validated CSV or connect an approved identity source.</p></div><IconButton icon={UserPlus} primary>Invite learners</IconButton></div><div className="rx-people-head"><span>Learner</span><span>Team / role</span><span>Seat & status</span><span>Learning plan</span><span/></div>{[["Priya Sharma","Engineering · Senior Engineer","Active","AI Engineering Foundations"],["Aarav Rao","Product · Product Manager","Invite pending","AI Product & Leadership"],["Nisha Kapoor","Business Ops · Analyst","Active","Data Analytics for Decisions"],["Vikram Shah","Technology · Architect","Active","Cybersecurity Essentials"],["Meera Das","Leadership · Director","Active","AI Leadership Program"]].map((x,i)=><div className="rx-person-row" key={x[0]}><span><i>{x[0].split(" ").map(s=>s[0]).join("")}</i><b>{x[0]}</b><small>{`learner${i+18}@acme.io`}</small></span><span><b>{x[1].split(" · ")[0]}</b><small>{x[1].split(" · ")[1]}</small></span><span><b className={i===1?"pending":"active"}>{x[2]}</b><small>Seat {i+118}</small></span><span><b>{x[3]}</b><small>{i===1?"Not started":`${[68,0,82,54,39][i]}% complete`}</small></span><button><MoreHorizontal/></button></div>)}</section><aside><section className="rx-panel rx-seat-card"><div className="rx-section-head"><h2>Seat allocation</h2><Users/></div><div className="rx-seat-ring"><strong>284</strong><span>of 320 used</span></div><div className="rx-progress"><i style={{width:"89%"}}/></div><div><span>Available</span><b>36 seats</b></div><div><span>Invites pending</span><b>8</b></div></section><section className="rx-panel"><h3>Onboarding methods</h3>{[["Invite by email",Mail],["Upload CSV",Upload],["Identity connection",ShieldCheck]].map(([x,I]:any)=><div className="rx-action-row" key={x}><I/><span><b>{x}</b><small>Secure, validated workflow</small></span><ChevronRight/></div>)}</section></aside></div>}

function OrgAssignments(){return <><MetricCards items={[{label:"Active assignments",value:"8",note:"Across 5 teams",icon:ClipboardCheck},{label:"Assigned learners",value:"267",note:"94% activated",icon:Users},{label:"On-time progress",value:"81%",note:"+6% this month",icon:Gauge,tone:"green"},{label:"At-risk learners",value:"19",note:"Need intervention",icon:Bell,tone:"gold"}]}/><div className="rx-assignment-layout"><section className="rx-panel"><div className="rx-section-head"><div><small>ACTIVE LEARNING PLANS</small><h2>Assignments</h2></div><div className="rx-table-tools"><button><Search/>Search</button><button><Filter/>Filter</button><button><SlidersHorizontal/>Sort</button></div></div>{[["AI Engineering Foundations","Engineering","172 learners",86,"Sep 30"],["Data Analytics for Decisions","Business Operations","92 learners",74,"Oct 12"],["AI Leadership Program","Leadership","29 learners",62,"Nov 04"],["Cybersecurity Essentials","Technology","54 learners",81,"Oct 28"]].map((x,i)=><article className="rx-assignment" key={x[0]}><span className={`org-icon o${i}`}><ClipboardCheck/></span><div><b>{x[0]}</b><small>{x[1]} · {x[2]} · Version {3+i}.1</small></div><div><small>COMPLETION</small><div className="rx-progress"><i style={{width:`${x[3]}%`}}/></div><b>{x[3]}%</b></div><span><small>DUE DATE</small><b>{x[4]}</b></span><span className="rx-pill">{i===2?"Needs attention":"On track"}</span><button><MoreHorizontal/></button></article>)}</section><aside><section className="rx-panel"><div className="rx-section-head"><h2>Progress distribution</h2><BarChart3/></div><div className="rx-donut"><strong>81%</strong><span>On schedule</span></div>{[["Completed","126", "green"],["On track","91","blue"],["At risk","19","gold"],["Not started","31","gray"]].map(x=><div className="rx-detail-row" key={x[0]}><span><i className={x[2]}/>{x[0]}</span><b>{x[1]}</b></div>)}</section><section className="rx-panel"><h3>Intervention queue</h3>{[["React cohort","7 learners"],["Analytics cohort","5 learners"],["Leadership cohort","7 learners"]].map(x=><div className="rx-action-row" key={x[0]}><Bell/><span><b>{x[0]}</b><small>{x[1]} behind plan</small></span><ArrowRight/></div>)}</section></aside></div></>}

function CommercialScreen({screen}:{screen:number}) {
  if(screen===43) return <LeadGate/>;
  if(screen===44) return <WebinarRegistration/>;
  if(screen===50) return <OfferScreen/>;
  if(screen===51) return <CheckoutScreen/>;
  if(screen===52) return <PaymentSuccess/>;
  const paid=screen===17, freemium=screen===16;
  return <main className="rx-commercial"><section className="rx-commercial-hero"><div><span>{paid?"PAID · ENGINEERING PROGRAM":freemium?"FREEMIUM · APPLIED PROGRAM":"FREE · FOUNDATION COURSE"}</span><h1>{paid?"Forward-Deployed AI Engineering":freemium?"Applied Machine Learning Engineering":"JavaScript Foundations"}</h1><p>{paid?"Build responsible AI systems that integrate with real workflows, users and enterprise constraints.":freemium?"Preview foundational lessons free, then unlock projects, mentor reviews and production practice.":"Learn modern JavaScript through text, video, examples and browser-based practice—at no cost."}</p><div><IconButton icon={Play} primary>{paid?"Enroll in the program":freemium?"Start free preview":"Enroll free"}</IconButton><IconButton icon={Download}>Download curriculum</IconButton></div><div className="rx-commercial-meta">{[[paid?"16 weeks":freemium?"12 weeks":"6 weeks",Clock3],[paid?"8 projects":freemium?"6 projects":"42 exercises",Code2],["Verified certificate",BadgeCheck],[paid?"Mentor-led":"Self-paced",Users]].map(([a,I]:any)=><span key={a}><I/><b>{a}</b></span>)}</div></div><aside><span><Sparkles/></span><small>{paid?"PROGRAM INVESTMENT":freemium?"START FREE":"COMPLETELY FREE"}</small><strong>{paid?"₹69,900":freemium?"₹0 preview":"₹0"}</strong><p>{paid?"One-time payment · cohort access":freemium?"Upgrade only when ready":"No card required"}</p><IconButton icon={ArrowRight} primary>{paid?"Secure your seat":freemium?"Unlock free lessons":"Begin learning"}</IconButton><div><ShieldCheck/>Secure access · Version-pinned enrollment</div></aside></section><section className="rx-commercial-body"><article><span><MonitorPlay/></span><h2>Multi-format learning</h2><p>Text explanations, instructor video, code examples, practice and applied projects work together.</p></article><article><span><Code2/></span><h2>Practice inside the browser</h2><p>Write code, run it, inspect the output and learn through immediate feedback.</p></article><article><span><MessageCircle/></span><h2>Discuss and get help</h2><p>Lesson discussions, mentor feedback and notes stay connected to the learning context.</p></article><article><span><BadgeCheck/></span><h2>Evidence, not promises</h2><p>Progress, assessment results and reviewed work support every completion credential.</p></article></section></main>
}

function LeadGate(){return <main className="rx-conversion"><section className="rx-conversion-card"><div className="rx-conversion-art"><span><Bot/></span><small>PROGRAM GUIDE · 2026</small><h1>Forward-Deployed AI Engineering</h1><p>A clear view of curriculum, applied projects, delivery, mentor support and enrollment.</p><div className="rx-guide-mock"><span>FDE</span><b>ENGINEERING</b><small>From AI concepts to responsible systems in production.</small></div><ul><li><Check/>Complete 16-week curriculum</li><li><Check/>Project and integration journey</li><li><Check/>Delivery and certification model</li></ul></div><div className="rx-gate-form"><span className="rx-kicker">DOWNLOAD THE PROGRAM GUIDE</span><h2>Where should we send it?</h2><p>Share your details to access the high-resolution, searchable PDF.</p><label><span>Full name *</span><div>Priya Sharma</div></label><label><span>Work email *</span><div>priya@company.com</div></label><label><span>Mobile number *</span><div><i>+91</i>98765 43210</div></label><label className="rx-check"><i><Check/></i><span><b>Email updates (optional)</b><small>Program and webinar information.</small></span></label><label className="rx-check"><i/><span><b>WhatsApp updates (optional)</b><small>Advisor and cohort reminders.</small></span></label><IconButton icon={Download} primary>Download high-resolution guide</IconButton><small className="rx-privacy"><ShieldCheck/>Your details are used only as described in our privacy notice.</small></div></section></main>}

function WebinarRegistration(){return <main className="rx-conversion"><section className="rx-webinar"><div className="rx-webinar-main"><span className="rx-kicker"><Video/>LIVE EXPERT WEBINAR</span><h1>Building Reliable RAG Systems at Enterprise Scale</h1><p>Move beyond demos. Learn how retrieval, evaluation, observability and human review fit into a responsible production system.</p><div className="rx-speaker"><span>RG</span><div><small>HOSTED BY</small><b>Dr. Raghu Gupta</b><p>Director of AI · Microsoft (Former)</p></div></div><div className="rx-webinar-stats">{[["22 May 2026",CalendarDays],["4:00 PM IST",Clock3],["60 minutes",Video],["Live Q&A",MessageCircle]].map(([x,I]:any)=><span key={x}><I/><b>{x}</b></span>)}</div><div className="rx-agenda"><h2>What you will learn</h2>{["Design retrieval around real user intent","Evaluate answer quality beyond a single metric","Add observability and governed human review","Recognize common production failure modes"].map((x,i)=><article key={x}><i>{i+1}</i><span>{x}</span></article>)}</div></div><aside><span className="rx-pill">Limited live seats</span><h2>Reserve your seat</h2><p>Register free and receive the joining link by email.</p>{["Full name","Work email","Mobile number","Role / experience"].map((x,i)=><label key={x}><span>{x} *</span><div>{["Priya Sharma","priya@company.com","+91 98765 43210","Senior Engineer"][i]}</div></label>)}<label className="rx-check"><i><Check/></i><span><b>Email registration updates</b><small>Required for the joining link.</small></span></label><IconButton icon={CalendarDays} primary>Register for webinar</IconButton><small className="rx-privacy"><ShieldCheck/>Your registration is secure.</small></aside></section></main>}

function OfferScreen(){return <main className="rx-conversion"><section className="rx-offer"><div className="rx-offer-head"><span><Sparkles/></span><div><small>PRIVATE ENROLLMENT OFFER</small><h1>Your FDE Engineering cohort seat</h1><p>Prepared for Aarav Menon · Valid until 24 September 2026</p></div><span className="rx-pill">Verified offer</span></div><div className="rx-offer-grid"><section><div className="rx-price"><span><small>PROGRAM PRICE</small><s>₹69,900</s></span><strong>₹62,900</strong><i>Save ₹7,000</i></div><h2>Everything included</h2>{[["16-week applied curriculum","Version-pinned course access",Layers3],["Eight delivery projects","Guided review and feedback",FolderKanban],["Weekly mentor sessions","Cohort and expert support",Users],["Assessment & certificate","Verifiable evidence of outcomes",BadgeCheck]].map(([a,b,I]:any)=><article key={a}><span><I/></span><div><b>{a}</b><small>{b}</small></div><CheckCircle2/></article>)}<div className="rx-offer-note"><ShieldCheck/><p><b>This offer is personal to you.</b><br/>The link is signed, time-bound and cannot be transferred.</p></div></section><aside><small>ENROLLMENT SUMMARY</small><h3>Forward-Deployed AI Engineering</h3>{[["Cohort","October 2026"],["Delivery","Live + online learning"],["Duration","16 weeks"],["Access","18 months"]].map(x=><div className="rx-detail-row" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<div className="rx-offer-total"><span>Total investment</span><strong>₹62,900</strong><small>Inclusive of applicable taxes</small></div><IconButton icon={CreditCard} primary>Proceed to secure payment</IconButton><p className="rx-expire"><Clock3/>Offer expires in <b>2 days 08 hours</b></p></aside></div></section></main>}

function CheckoutScreen(){return <main className="rx-conversion"><section className="rx-checkout"><header><span><ShieldCheck/></span><div><small>SECURE CHECKOUT</small><h2>Complete your enrollment</h2></div><span className="rx-pill">Razorpay test mode</span></header><div className="rx-checkout-grid"><section><div className="rx-checkout-course"><span><Bot/></span><div><small>ENGINEERING PROGRAM</small><h1>Forward-Deployed AI Engineering</h1><p>October 2026 cohort · 16 weeks · Live + online</p></div></div><h3>Your details</h3><div className="rx-form-grid"><label><span>Full name</span><div>Aarav Menon</div></label><label><span>Email</span><div>aarav@company.com</div></label><label><span>Mobile number</span><div>+91 98765 43210</div></label><label><span>Billing location</span><div>Karnataka, India</div></label></div><div className="rx-payment-trust">{[["Secure handoff",ShieldCheck],["Signed payment event",FileCheck2],["Instant enrollment",GraduationCap]].map(([x,I]:any)=><span key={x}><I/><b>{x}</b></span>)}</div></section><aside><small>ORDER SUMMARY</small><div className="rx-detail-row"><span>Program price</span><b>₹69,900</b></div><div className="rx-detail-row green"><span>Private offer</span><b>− ₹7,000</b></div><div className="rx-detail-row"><span>Taxes</span><b>Included</b></div><div className="rx-checkout-total"><span>Total payable</span><strong>₹62,900</strong></div><IconButton icon={LockKeyhole} primary>Pay securely with Razorpay</IconButton><p><ShieldCheck/>Your enrollment is created only after a verified, idempotent payment event.</p><div className="rx-payment-methods"><CreditCard/><span>Cards</span><span>UPI</span><span>Net banking</span></div></aside></div></section></main>}

function PaymentSuccess(){return <main className="rx-conversion"><section className="rx-success"><div className="rx-success-icon"><Check/></div><span className="rx-kicker">PAYMENT VERIFIED · ENROLLMENT ACTIVE</span><h1>You&apos;re in, Aarav!</h1><p>Your seat in Forward-Deployed AI Engineering is confirmed. Your version-pinned learning workspace is ready.</p><div className="rx-success-grid"><section><small>YOUR PROGRAM</small><div className="rx-success-course"><span><Bot/></span><div><h2>Forward-Deployed AI Engineering</h2><p>October 2026 cohort · Starts 05 October</p></div></div><div className="rx-success-steps">{[["Enrollment created","Course version v4.2 pinned",CheckCircle2],["Welcome email sent","Cohort and calendar details",Mail],["Learning workspace ready","Orientation module unlocked",BookOpen]].map(([a,b,I]:any)=><article key={a}><span><I/></span><div><b>{a}</b><small>{b}</small></div><CheckCircle2/></article>)}</div></section><aside><small>PAYMENT RECEIPT</small>{[["Order ID","SA-2026-88421"],["Payment ID","pay_test_R4K82"],["Amount","₹62,900"],["Status","Verified"]].map(x=><div className="rx-detail-row" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<IconButton icon={Download}>Download receipt</IconButton></aside></div><div className="rx-success-next">{[["01","Complete orientation","Meet your cohort, set goals and confirm your learning setup.",MonitorPlay],["02","Join the kickoff","05 October · 6:30 PM IST · Live cohort room",CalendarDays],["03","Meet your support team","Program advisor, mentor and peer cohort are ready.",Users]].map(([n,a,b,I]:any)=><article key={a}><i>{n}</i><span><I/></span><div><b>{a}</b><small>{b}</small></div><ChevronRight/></article>)}</div><div className="rx-success-actions"><IconButton icon={Play} primary>Start orientation</IconButton><IconButton icon={CalendarDays}>View cohort calendar</IconButton></div><small className="rx-privacy"><ShieldCheck/>A receipt and enrollment confirmation were sent to aarav@company.com.</small></section></main>}

export function RedesignScreen({screen}:ScreenProps){
  if(screen>=18&&screen<=24) return <LearnerScreen screen={screen}/>;
  if((screen>=29&&screen<=39)||(screen>=45&&screen<=49)) return <OperationsScreen screen={screen}/>;
  if(screen>=40&&screen<=42) return <OrganizationScreen screen={screen}/>;
  return <CommercialScreen screen={screen}/>;
}
