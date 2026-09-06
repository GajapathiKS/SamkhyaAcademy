"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Boxes,
  Braces,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  FileCode2,
  FolderKanban,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers3,
  Lock,
  MessageCircle,
  PackageOpen,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  StepForward,
  Target,
  TerminalSquare,
  Users,
} from "lucide-react";
type Mode =
  | "catalog"
  | "c-course"
  | "cpp-course"
  | "dsa-course"
  | "dsa-graph"
  | "dsa-list";
export function ProgrammingShowcase({ mode }: { mode: Mode }) {
  if (mode === "catalog") return <Catalog />;
  if (mode === "dsa-graph" || mode === "dsa-list")
    return <Simulation mode={mode} />;
  return <Course mode={mode} />;
}
function Catalog() {
  return (
    <main className="ps">
      <header>
        <span>PROGRAMMING FOUNDATIONS</span>
        <h1>
          Start free. Build strong foundations.
          <br />
          <em>Advance when you are ready.</em>
        </h1>
        <p>
          Learn C and C++ at no cost with structured lessons, code examples,
          practice and verified completion.
        </p>
      </header>
      <div className="ps-filter">
        <Search />
        <span>Search programming courses</span>
        <button>All levels</button>
        <button>Free first</button>
      </div>
      <section className="ps-cards">
        <Card
          title="C Programming Fundamentals"
          tag="FREE"
          icon={TerminalSquare}
          copy="Structured programming, arrays, pointers, files and a terminal capstone."
          href="/programming/c-course"
        />
        <Card
          title="C++ Essentials"
          tag="FREE"
          icon={Code2}
          copy="Modern C++, OOP, STL, ownership and a portfolio-ready console application."
          href="/programming/cpp-course"
        />
        <Card
          title="Data Structures & Algorithms"
          tag="PAID"
          icon={GitBranch}
          copy="Interactive arrays, nodes, trees, graphs, simulations and interview problem solving."
          href="/programming/dsa-course"
        />
      </section>
      <section className="ps-path">
        <h2>A connected programming pathway</h2>
        {[
          ["C foundations", "Free"],
          ["Modern C++", "Free"],
          ["Data Structures & Algorithms", "Paid"],
          ["Systems / Full-Stack / AI", "Specialize"],
        ].map((x, i) => (
          <div key={x[0]}>
            <i>{i + 1}</i>
            <b>{x[0]}</b>
            <span>{x[1]}</span>
            {i < 3 && <ArrowRight />}
          </div>
        ))}
      </section>
    </main>
  );
}
function Card({
  title,
  tag,
  icon: Icon,
  copy,
  href,
}: {
  title: string;
  tag: string;
  icon: any;
  copy: string;
  href: string;
}) {
  return (
    <article>
      <div className="ps-cardtop">
        <Icon />
        <span className={tag === "FREE" ? "free" : "paid"}>{tag}</span>
      </div>
      <h2>{title}</h2>
      <p>{copy}</p>
      <div className="ps-meta">
        <span>
          <Clock3 />
          6–8 weeks
        </span>
        <span>
          <GraduationCap />
          Certificate
        </span>
        <span>
          <Code2 />
          Practice-first
        </span>
      </div>
      <ul>
        <li>Text and video lessons</li>
        <li>Runnable examples and exercises</li>
        <li>Downloadable starter projects</li>
      </ul>
      <Link className="btn primary" href={href}>
        {tag === "FREE" ? "Enroll free" : "Explore paid program"} <ArrowRight />
      </Link>
    </article>
  );
}
function Course({ mode }: { mode: "c-course" | "cpp-course" | "dsa-course" }) {
  const dsa = mode === "dsa-course",
    cpp = mode === "cpp-course";
  const title = dsa
    ? "Data Structures & Algorithms"
    : cpp
      ? "C++ Essentials"
      : "C Programming Fundamentals";
  const modules = dsa
    ? [
        "Complexity, arrays and strings",
        "Linked structures",
        "Trees and heaps",
        "Graphs and dynamic programming",
        "Problem-solving capstone",
      ]
    : cpp
      ? [
          "Modern C++ foundations",
          "Object-oriented C++",
          "STL and algorithms",
          "Ownership and capstone",
        ]
      : [
          "Programming and C foundations",
          "Control flow and functions",
          "Arrays, strings and pointers",
          "Structures, files and capstone",
        ];
  return (
    <main className="ps-course">
      <section className="ps-coursehero">
        <div>
          <span>{dsa ? "PAID · INTERACTIVE · INTERMEDIATE" : "FREE · PRACTICE-FIRST · BEGINNER"}</span>
          <h1>{title}</h1>
          <p>
            {dsa
              ? "See every algorithm move. Manipulate structures, inspect state, and connect visual reasoning to tested code."
              : cpp
                ? "Learn modern syntax, object-oriented design, STL, memory ownership and practical problem solving."
                : "Build a strong programming foundation through C syntax, control flow, functions, arrays, pointers, structures and files."}
          </p>
          <div className="actions">
            <Link
              className="btn primary"
              href={dsa ? "/programming/dsa-graph" : "/course-experience/text"}
            >
              {dsa ? "Preview graph simulation" : "Start learning free"}{" "}
              <ArrowRight />
            </Link>
            <button className="btn">View curriculum</button>
          </div>
          <div className="ps-coursemeta">
            <span>
              <Clock3 /> {dsa ? "12–16" : "6–8"} weeks
            </span>
            <span>
              <Layers3 /> {modules.length} modules
            </span>
            <span>
              <BadgeCheck /> Certificate
            </span>
            <span>
              <MessageCircle /> Lesson discussions
            </span>
          </div>
        </div>
        <aside className={dsa ? "dsa" : cpp ? "cpp" : "c"}>
          <div className="ps-code-art">
            <span>{dsa ? <GitBranch /> : cpp ? <Braces /> : <TerminalSquare />}</span>
            <pre>{dsa ? "queue.push(start);\nwhile (queue.length) {\n  visit(queue.shift());\n}" : cpp ? "class Portfolio {\n public:\n  void build();\n};" : "int main(void) {\n  printf(\"Hello\");\n  return 0;\n}"}</pre>
          </div>
          <div className="ps-price"><small>{dsa ? "PROGRAM ACCESS" : "FULL COURSE ACCESS"}</small><b>{dsa ? "₹14,990" : "₹0"}</b><span>{dsa ? "One-time payment" : "No payment required"}</span></div>
          {dsa ? (
            <button className="btn primary">Enroll in DSA</button>
          ) : (
            <button className="btn primary">Enroll free</button>
          )}
          <small className="ps-secure"><Lock /> Version-pinned, secure enrollment</small>
        </aside>
      </section>
      <section className="ps-proofbar">
        {[
          [dsa ? "42" : "36", "Concept lessons", BookOpen],
          [dsa ? "28" : "24", "Runnable examples", Code2],
          [dsa ? "18" : "16", "Practice challenges", Target],
          [dsa ? "9" : "6", "Visual explainers", Sparkles],
          [dsa ? "4" : "3", "Applied projects", PackageOpen],
        ].map(([value, label, Icon]: any) => <div key={label}><span><Icon /></span><b>{value}</b><small>{label}</small></div>)}
      </section>
      <section className="ps-coursebody">
        <div className="ps-outcomes">
          <h2>What you will learn</h2>
          {(dsa
            ? [
                "Trace algorithms step by step",
                "Manipulate arrays, nodes, trees and graphs",
                "Measure time and space complexity",
                "Solve interview-grade challenges",
              ]
            : cpp
              ? [
                  "Write modern C++ programs",
                  "Design classes and interfaces",
                  "Use STL containers and algorithms",
                  "Apply RAII and smart pointers",
                ]
              : [
                  "Write and debug C programs",
                  "Use functions, arrays and pointers",
                  "Work safely with files and memory",
                  "Complete a terminal capstone",
                ]
          ).map((x) => (
            <p key={x}>
              <Check />
              {x}
            </p>
          ))}
        </div>
        <div className="ps-curriculum">
          <div className="ps-section-title"><div><small>STRUCTURED PATH</small><h2>Curriculum journey</h2></div><span>{modules.length} modules</span></div>
          {modules.map((x, i) => (
            <article key={x}>
              <i>{i + 1}</i>
              <span>
                <b>{x}</b>
                <small>
                  {dsa && i === 3
                    ? "Includes SVG / HTML simulation"
                    : "4 lessons · examples · practice"}
                </small>
              </span>
              <ChevronRight />
            </article>
          ))}
        </div>
        <aside className="ps-formats">
          <h2>Learning formats</h2>
          {[
            ["Text lessons", BookOpen],
            ["Instructor video", Play],
            ["Runnable examples", Code2],
            ["Practice checks", Gauge],
            ...(dsa ? [["Interactive simulations", GitBranch] as any] : []),
          ].map(([x, I]: any) => (
            <p key={x}>
              <I />
              {x}
            </p>
          ))}
          <div className="ps-format-note"><MessageCircle /><span><b>Questions stay in context</b><small>Discuss each lesson with peers and mentors.</small></span></div>
        </aside>
      </section>
      <section className="ps-experience">
        <div className="ps-experience-head"><div><small>ONE CONNECTED EXPERIENCE</small><h2>Read it. Watch it. Run it. Understand it.</h2><p>Every concept moves from explanation to code, feedback and a useful artifact.</p></div><Link href={dsa ? "/programming/dsa-graph" : "/learning-studio/code-lab?preview=1"}>Preview the learning studio <ArrowRight /></Link></div>
        <div className="ps-experience-grid">
          {[
            ["01", "Concept article", "Clear text, diagrams and copy-ready snippets build the mental model.", BookOpen],
            ["02", "Instructor walkthrough", "Short video explains the reasoning behind each implementation choice.", Play],
            ["03", dsa ? "Visual simulation" : "Browser code lab", dsa ? "Manipulate nodes, edges and state while the algorithm advances." : "Edit code on the left and inspect output or preview on the right.", dsa ? GitBranch : Code2],
            ["04", "Practice & project", "Check understanding, download the starter folder and build evidence.", PackageOpen],
          ].map(([n, a, b, I]: any) => <article key={a}><i>{n}</i><span><I /></span><h3>{a}</h3><p>{b}</p><button>Explore <ArrowRight /></button></article>)}
        </div>
      </section>
      <section className="ps-projects">
        <div><small>BUILD AS YOU LEARN</small><h2>{dsa ? "Algorithms you can see and manipulate" : cpp ? "A modern C++ project portfolio" : "Practical C projects from terminal to files"}</h2><p>{dsa ? "Inspect state, predict the next step, compare complexity and synchronize every visual movement with executable code." : "Each project includes a visual preview, folder architecture, starter files, checkpoints and an exportable ZIP."}</p><div className="ps-project-tags">{(dsa ? ["Array operations","Linked nodes","Tree traversals","Graph search","Sorting race"] : cpp ? ["CLI task manager","Inventory system","STL data explorer","RAII file tool"] : ["Number toolkit","Student records","Text analyzer","File-backed inventory"]).map(x=><span key={x}>{x}</span>)}</div></div>
        <aside>{dsa ? <div className="ps-node-map"><i>A</i><i>B</i><i>C</i><i>D</i><i>E</i><svg viewBox="0 0 300 170"><path d="M50 80L145 35M50 80l95 60m0-105 95 45m-95 60 95-60" /></svg></div> : <div className="ps-file-tree"><header><Boxes /> project/{dsa ? "dsa" : cpp ? "cpp-app" : "c-inventory"}</header>{["src/","  main."+(cpp?"cpp":"c"),"  modules/","include/","tests/","README.md"].map((x,i)=><p key={x}><span>{i===1?<FileCode2 />:i===5?<BookOpen />:<FolderKanban />}</span>{x}</p>)}</div>}</aside>
      </section>
    </main>
  );
}
function Simulation({ mode }: { mode: "dsa-graph" | "dsa-list" }) {
  const [step, setStep] = useState(2);
  const graph = mode === "dsa-graph";
  return (
    <main className="sim">
      <aside>
        <span>DATA STRUCTURES & ALGORITHMS</span>
        <h2>{graph ? "Graph Traversal" : "Linked List Operations"}</h2>
        {[
          "Concept",
          "Build structure",
          "Step through",
          "Inspect state",
          "Practice",
          "Challenge",
        ].map((x, i) => (
          <div className={i === 2 ? "active" : ""} key={x}>
            <i>{i + 1}</i>
            {x}
          </div>
        ))}
        <section>
          <Lock />
          <b>Paid course</b>
          <p>Your progress and simulation state are saved.</p>
        </section>
      </aside>
      <section className="sim-main">
        <header>
          <div>
            <span>MODULE 4 · INTERACTIVE SIMULATION</span>
            <h1>
              {graph
                ? "Explore breadth-first search"
                : "Insert and remove linked-list nodes"}
            </h1>
            <p>
              {graph
                ? "Watch the frontier, visited set and queue change at every step."
                : "See pointer updates, head/tail changes and memory state."}
            </p>
          </div>
          <b>Step {step} of 7</b>
        </header>
        <div className="sim-work">
          <section className="sim-canvas">
            <header>
              <b>{graph ? "Graph canvas" : "Memory canvas"}</b>
              <div>
                <button>
                  <RotateCcw />
                  Reset
                </button>
                <button onClick={() => setStep((s) => Math.min(7, s + 1))}>
                  <StepForward />
                  Next step
                </button>
              </div>
            </header>
            {graph ? <Graph step={step} /> : <List step={step} />}
            <div className="sim-controls">
              <button>
                <Play />
                Auto play
              </button>
              <input
                type="range"
                min="1"
                max="7"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
              />
              <span>Speed 1×</span>
            </div>
          </section>
          <aside className="sim-state">
            <h3>Live algorithm state</h3>
            <div>
              <span>Current node</span>
              <b>{graph ? "B" : "node_03"}</b>
            </div>
            <div>
              <span>{graph ? "Queue" : "Head pointer"}</span>
              <code>{graph ? "[C, D, E]" : "0x00A1"}</code>
            </div>
            <div>
              <span>{graph ? "Visited" : "Tail pointer"}</span>
              <code>{graph ? "{A, B}" : "0x00F4"}</code>
            </div>
            <div>
              <span>Complexity</span>
              <b>{graph ? "O(V + E)" : "O(1)"}</b>
            </div>
            <h3>What changed?</h3>
            <p>
              {graph
                ? "B was dequeued, marked visited, and its unvisited neighbours were added to the frontier."
                : "The previous next pointer now references the new node; tail remains unchanged."}
            </p>
          </aside>
        </div>
        <div className="sim-bottom">
          <section>
            <h3>Explanation</h3>
            <p>
              {graph
                ? "Breadth-first search visits nodes level by level using a queue. It finds the shortest path in an unweighted graph."
                : "A linked list stores values in independent nodes connected by references rather than contiguous memory."}
            </p>
          </section>
          <section>
            <h3>Code synchronized to this step</h3>
            <pre>
              {graph
                ? "current = queue.shift();\\nvisited.add(current);\\nqueue.push(...unvisitedNeighbors);"
                : "newNode.next = current.next;\\ncurrent.next = newNode;"}
            </pre>
          </section>
          <section>
            <h3>Checkpoint</h3>
            <p>Which item changes next?</p>
            <button className="btn primary">Check prediction</button>
          </section>
        </div>
      </section>
    </main>
  );
}
function Graph({ step }: { step: number }) {
  return (
    <svg
      className="sim-svg"
      viewBox="0 0 700 380"
      role="img"
      aria-label="Breadth-first search graph"
    >
      <g stroke="#9baad0" strokeWidth="3">
        {[
          [130, 190, 280, 90],
          [130, 190, 280, 280],
          [280, 90, 450, 80],
          [280, 90, 450, 190],
          [280, 280, 450, 190],
          [280, 280, 450, 300],
          [450, 190, 610, 190],
        ].map((x, i) => (
          <line key={i} x1={x[0]} y1={x[1]} x2={x[2]} y2={x[3]} />
        ))}
      </g>
      {[
        ["A", 130, 190],
        ["B", 280, 90],
        ["C", 280, 280],
        ["D", 450, 80],
        ["E", 450, 190],
        ["F", 450, 300],
        ["G", 610, 190],
      ].map(([n, x, y], i) => (
        <g key={String(n)}>
          <circle
            cx={Number(x)}
            cy={Number(y)}
            r="34"
            fill={i < step ? "#087867" : i === step ? "#4438df" : "#fff"}
            stroke={i <= step ? "#087867" : "#8da0c7"}
            strokeWidth="3"
          />
          <text
            x={Number(x)}
            y={Number(y) + 6}
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fill={i <= step ? "#fff" : "#0b214c"}
          >
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}
function List({ step }: { step: number }) {
  return (
    <svg
      className="sim-svg"
      viewBox="0 0 700 380"
      role="img"
      aria-label="Linked list node insertion"
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 z" fill="#677ca8" />
        </marker>
      </defs>
      {[
        ["12", 70],
        ["24", 240],
        ["31", 410],
        ["48", 580],
      ].map(([v, x], i) => (
        <g key={v}>
          <rect
            x={Number(x) - 45}
            y="145"
            width="100"
            height="70"
            rx="10"
            fill={i === step - 1 ? "#eeedff" : "#fff"}
            stroke={i === step - 1 ? "#4438df" : "#8da0c7"}
            strokeWidth="3"
          />
          <line
            x1={Number(x) + 15}
            y1="145"
            x2={Number(x) + 15}
            y2="215"
            stroke="#8da0c7"
          />
          <text
            x={Number(x) - 15}
            y="187"
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
          >
            {v}
          </text>
          {i < 3 && (
            <line
              x1={Number(x) + 55}
              y1="180"
              x2={Number(x) + 115}
              y2="180"
              stroke="#677ca8"
              strokeWidth="3"
              markerEnd="url(#arrow)"
            />
          )}
          <text
            x={Number(x)}
            y="245"
            textAnchor="middle"
            fontSize="11"
            fill="#65738d"
          >
            node_{i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
