import Image from "next/image";
import {
  Bookmark,
  Check,
  ChevronDown,
  Circle,
  Clock3,
  Code2,
  Download,
  FileArchive,
  FileText,
  Globe2,
  HelpCircle,
  Maximize,
  MessageSquare,
  MonitorPlay,
  Play,
  RotateCcw,
  Settings,
  Share2,
  Star,
  Volume2,
} from "lucide-react";
type Mode = "video" | "text" | "example";
type Track = "fullstack" | "c" | "cpp";
const fullstackModules = [
  "Web Development Basics",
  "HTML & CSS Deep Dive",
  "JavaScript Essentials",
  "Advanced JavaScript",
  "Git & GitHub",
  "React Fundamentals",
  "Backend with Node.js",
  "Databases with MongoDB",
  "REST APIs & Authentication",
  "Deployment & DevOps",
  "Capstone Project",
];
const cModules = [
  "Programming and C Foundations",
  "Control Flow and Functions",
  "Arrays, Strings and Pointers",
  "Structures, Files and Capstone",
];
const cppModules = [
  "Modern C++ Foundations",
  "Object-oriented C++",
  "STL and Algorithms",
  "Ownership and Capstone",
];
const code =
  '<!DOCTYPE html>\\n<html lang="en">\\n<head>\\n  <meta charset="UTF-8">\\n  <meta name="viewport" content="width=device-width">\\n  <title>My First Page</title>\\n</head>\\n<body>\\n  <header><h1>Welcome</h1></header>\\n  <main><p>This is my first page.</p></main>\\n</body>\\n</html>';
const example =
  '<article class="profile">\\n  <img src="avatar.jpg" alt="Aarav Rao">\\n  <div>\\n    <h1>Aarav Rao</h1>\\n    <p>Full-stack developer</p>\\n    <button>View projects</button>\\n  </div>\\n</article>';
export function CourseExperienceMaster({
  mode,
  track = "fullstack",
}: {
  mode: Mode;
  track?: Track;
}) {
  const courseTitle =
    track === "c"
      ? "C Programming Fundamentals"
      : track === "cpp"
        ? "C++ Essentials"
        : "Full-Stack Development Bootcamp";
  const currentTitle =
    track === "c"
      ? "Pointers and Array Memory"
      : track === "cpp"
        ? "Classes, Objects and Constructors"
        : mode === "video"
          ? "HTML Structure"
          : mode === "text"
            ? "Semantic HTML and Accessible Structure"
            : "Build a Responsive Profile Card";
  const moduleList = track === "c" ? cModules : track === "cpp" ? cppModules : fullstackModules;
  const courseDescription = track === "c"
    ? "Learn C through precise explanations, runnable examples, memory diagrams and practice."
    : track === "cpp"
      ? "Master modern C++, object-oriented design, STL and safe ownership through practice."
      : "Build real-world projects and master modern web technologies.";
  const lessons: Array<[string, string, boolean]> = track === "c"
    ? [["Memory and addresses", "08:12", true], ["Arrays decay to pointers", "10:34", true], ["Pointers and array memory", "12:34", true], ["Pointer arithmetic practice", "14:18", false], ["Memory safety checkpoint", "10 Questions", false]]
    : track === "cpp"
      ? [["Classes and objects", "07:48", true], ["Constructors and invariants", "09:42", true], ["Classes, objects and constructors", "12:34", true], ["Encapsulation and methods", "14:18", false], ["Object design checkpoint", "10 Questions", false]]
      : [["Welcome to the Bootcamp", "05:02", true], ["How the Web Works", "08:47", true], ["HTML Structure", "12:34", true], ["CSS Styling Fundamentals", "14:18", false], ["Module 1 Quiz", "10 Questions", false]];
  return (
    <main className="cem">
      <header className="cem-title">
        <div>
          <span>My Courses · {courseTitle}</span>
          <h1>{courseTitle}</h1>
          <p>{courseDescription}</p>
        </div>
        <div>
          Leave a rating <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </header>
      <div className="cem-grid">
        <aside className="cem-modules">
          <div>
            <b>Overall Progress</b>
            <strong>32%</strong>
            <i>
              <em />
            </i>
          </div>
          {moduleList.map((m, i) => (
            <section className={i === 0 ? "open" : ""} key={m}>
              <header>
                <ChevronDown />
                <b>
                  Module {i + 1}: {m}
                </b>
                <span>{i === 0 ? "4 / 5" : "0 / " + ((i % 3) + 4)}</span>
              </header>
              {i === 0 && (
                <div className="cem-lessons">
                  {lessons.map(([t, d, done], j) => (
                    <div className={j === 2 ? "active" : ""} key={String(t)}>
                      <i>{done ? <Check /> : <Circle />}</i>
                      <span>1.{j + 1}</span>
                      <b>{t}</b>
                      <small>{d}</small>
                      {j === 2 && <Play />}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
          <div className="cem-help">
            <HelpCircle />
            <b>Need help?</b>
            <p>Our mentors are here to support you.</p>
            <button className="btn">Ask a mentor</button>
          </div>
        </aside>
        <section className="cem-center">
          <LessonRenderer mode={mode} track={track} />
          <div className="cem-lessonhead">
            <span>1.3</span>
            <div>
              <h2>{currentTitle}</h2>
              <p>
                {mode === "example"
                  ? "Edit the example, run checks and compare the rendered result."
                  : track === "c"
                    ? "Trace addresses, pointer movement and array access safely."
                    : track === "cpp"
                      ? "Design a class with clear invariants, ownership and encapsulation."
                      : "Learn the structure of an HTML document and understand essential tags."}
              </p>
            </div>
            <button className="btn">
              <Bookmark />
            </button>
            <button className="btn">
              <Check /> Mark complete
            </button>
          </div>
          <nav className="cem-tabs">
            <b>Overview</b>
            <span>Resources 3</span>
            <span>Notes</span>
            <span>Q&A 12</span>
            <span>Assignments 1</span>
          </nav>
          <article className="cem-copy">
            {mode === "example" ? (
              <>
                <h3>Practice brief</h3>
                <p>
                  Build a profile card using semantic markup, a flexible layout,
                  and keyboard-visible actions.
                </p>
                <ul>
                  <li>Use a meaningful heading hierarchy.</li>
                  <li>Keep the card responsive down to 320px.</li>
                  <li>Pass accessibility checks before continuing.</li>
                </ul>
              </>
            ) : (
              <>
                <h3>Lesson Overview</h3>
                <p>{track === "c" ? "In this lesson, you’ll connect arrays, addresses and pointer arithmetic, then verify each access with runnable C examples." : track === "cpp" ? "In this lesson, you’ll model a dependable class, initialize valid state and keep implementation details behind a clear interface." : "In this lesson, you’ll learn the structure of an HTML document and the purpose of essential tags, headings, paragraphs, links and images."}</p>
                <h4>You’ll be able to:</h4>
                <p>{track === "c" ? <>✓ Explain array-to-pointer decay<br />✓ Trace pointer arithmetic safely<br />✓ Debug invalid memory access</> : track === "cpp" ? <>✓ Define a class invariant<br />✓ Use constructors intentionally<br />✓ Separate interface from implementation</> : <>✓ Understand the skeleton of an HTML page<br />✓ Use common HTML tags correctly<br />✓ Build a simple webpage from scratch</>}</p>
              </>
            )}
            <h3>Discussion (8)</h3>
            <label>
              <i>PS</i>
              <input placeholder="Write your question or share your thoughts…" />
              <button>Post</button>
            </label>
            <div className="cem-comment">
              <i>AR</i>
              <p>
                <b>Aarav Rao</b>
                <small>2 hours ago · Top contributor</small>Great explanation!
                {track === "c"
                  ? " The pointer trace finally makes sense now."
                  : track === "cpp"
                    ? " The constructor example finally makes sense now."
                    : " The HTML structure finally makes sense now."}
              </p>
            </div>
          </article>
        </section>
        <RightRail track={track} />
      </div>
    </main>
  );
}
function LessonRenderer({ mode, track }: { mode: Mode; track: Track }) {
  const lessonCode =
    track === "c"
      ? '#include <stdio.h>\\n\\nint main(void) {\\n  int values[] = {4, 8, 15, 16};\\n  int *cursor = values;\\n  printf("%d\\\\n", *(cursor + 2));\\n  return 0;\\n}'
      : track === "cpp"
        ? "#include <iostream>\\n#include <string>\\n\\nclass Course {\\n public:\\n  Course(std::string title)\\n    : title_(std::move(title)) {}\\n private:\\n  std::string title_;\\n};"
        : code;
  if (mode === "video")
    return (
      <div className="cem-player">
        <div className="cem-person">
          <Image
            src="/reference-assets/full-stack-instructor-v2.png"
            alt="Full-stack instructor explaining HTML"
            fill
            sizes="35vw"
          />
        </div>
        <pre>{lessonCode}</pre>
        <div className="cem-controls">
          <Play />
          <RotateCcw />
          <Volume2 />
          <i>
            <em />
          </i>
          <span>04:28 / 12:34</span>
          <Settings />
          <Maximize />
        </div>
      </div>
    );
  if (mode === "example")
    return (
      <div className="cem-example">
        <section>
          <header>
            <b>index.html</b>
            <button>
              Run <Play />
            </button>
          </header>
          <pre>{example}</pre>
        </section>
        <section>
          <header>
            <b>Live preview</b>
            <span>Desktop</span>
          </header>
          <div className="cem-card">
            <i>AR</i>
            <h2>Aarav Rao</h2>
            <p>Full-stack developer</p>
            <button>View projects</button>
          </div>
        </section>
      </div>
    );
  return (
    <article className="cem-reader">
      <span>LESSON 1.3 · 12 MIN READ</span>
      <h2>{track === "c" ? "Pointers make memory relationships visible and controllable." : track === "cpp" ? "Classes protect valid state behind intentional interfaces." : "Semantic HTML creates structure people and machines can understand."}</h2>
      <p>{track === "c" ? "An array name can provide the address of its first element. Pointer arithmetic advances in element-sized steps, so every expression must remain inside valid storage." : track === "cpp" ? "A constructor establishes valid state. Encapsulation keeps representation details private so callers interact through stable behavior." : "Good markup describes the purpose of content before presentation is applied. That improves accessibility, search, maintainability and team communication."}</p>
      <div>
        <HelpCircle />
        <p>
          <b>{track === "c" ? "Think in addresses and bounds." : track === "cpp" ? "Think in invariants." : "Think in landmarks."}</b> {track === "c" ? "Trace the base address, offset and resulting element before dereferencing." : track === "cpp" ? "Decide what must always be true, then make the constructor establish it." : "Use header, nav, main, article, aside and footer to express the page’s structure."}
        </p>
      </div>
      <h3>{track === "c" ? "Trace one pointer expression at a time" : track === "cpp" ? "Start from a valid object state" : "Start with the document outline"}</h3>
      <p>{track === "c" ? "Write down the element type, base address and offset. Confirm the resulting pointer remains within the same array object." : track === "cpp" ? "Keep data private, accept construction inputs explicitly and expose behavior rather than writable internal state." : "Every page needs one clear primary heading and a logical sequence of section headings. Avoid choosing heading levels for visual size."}</p>
      <pre>{lessonCode}</pre>
    </article>
  );
}
function RightRail({ track }: { track: Track }) {
  const next =
    track === "c"
      ? "Pointer arithmetic practice"
      : track === "cpp"
        ? "Encapsulation and methods"
        : "CSS Styling Fundamentals";
  const resources = track === "c"
    ? [["C Memory & Pointer Sheet", "PDF · 380 KB", FileText], ["Pointer Practice Starter", "ZIP · 18 KB", FileArchive], ["Memory Trace Diagrams", "PDF · 1.1 MB", MonitorPlay]]
    : track === "cpp"
      ? [["Modern C++ Class Guide", "PDF · 420 KB", FileText], ["Class Design Starter", "ZIP · 22 KB", FileArchive], ["Ownership Diagrams", "PDF · 1.3 MB", MonitorPlay]]
      : [["Cheat Sheet: HTML Tags", "PDF · 450 KB", FileText], ["HTML Boilerplate Code", "ZIP · 12 KB", FileArchive], ["Lesson Slides", "PPTX · 1.2 MB", MonitorPlay]];
  return (
    <aside className="cem-right">
      <section>
        <header>
          <b>Your Progress</b>
          <span>32%</span>
        </header>
        <i>
          <em />
        </i>
      </section>
      <section>
        <h3>Continue Learning</h3>
        <p>
          1.4 {next} <span>14:18</span>
        </p>
        <button className="btn primary">
          Continue <Play />
        </button>
      </section>
      <section>
        <h3>Course Resources</h3>
        {resources.map(([t, d, I]: any) => (
          <div className="cem-resource" key={t}>
            <I />
            <span>
              <b>{t}</b>
              <small>{d}</small>
            </span>
            <Download />
          </div>
        ))}
      </section>
      <section>
        <h3>Next Up</h3>
        <b>1.4 {next}</b>
        <p>{track === "c" ? "Practice pointer movement with immediate memory feedback." : track === "cpp" ? "Protect object state through focused methods and access control." : "Learn how to style your HTML using CSS."}</p>
        <small>
          <Clock3 />
          14:18
        </small>
        <button className="btn">Preview</button>
      </section>
      <section>
        <h3>Course Details</h3>
        {[
          ["Duration", "48 hours", Clock3],
          ["Level", "Beginner to Advanced", Code2],
          ["Certificate", "Yes", Check],
          ["Projects", "6 real-world projects", FileArchive],
          ["Language", "English", Globe2],
          ["Mentor Support", "Yes", MessageSquare],
        ].map(([t, d, I]: any) => (
          <div className="cem-detail" key={t}>
            <I />
            <span>{t}</span>
            <b>{d}</b>
          </div>
        ))}
        <button className="btn">
          <Share2 /> Share this course
        </button>
      </section>
    </aside>
  );
}
