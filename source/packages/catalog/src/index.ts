export type CatalogModule = {
  title: string;
  description: string;
  lessons: string[];
};

export type CatalogCourse = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  deliveryMode: "SELF_PACED" | "LIVE_ONLINE" | "OFFLINE" | "HYBRID" | "COHORT";
  contentType: "FULL_ONLINE_VIDEOS" | "HYBRID_OFFLINE_ONLINE" | "FULL_OFFLINE";
  pricingCategory: "FREE" | "FREEMIUM" | "PRICING";
  accessType: "FREE" | "PAID" | "PRIVATE" | "ORGANIZATION_ONLY";
  level:
    | "Foundation"
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Executive"
    | "Multi-level";
  durationText: string;
  listPricePaise: number | null;
  salePricePaise: number | null;
  freePreviewLessonCount: number;
  brochurePublicPath?: string;
  outcomes: string[];
  audience: string[];
  prerequisites: string[];
  tools: string[];
  modules: CatalogModule[];
  certificateEnabled: boolean;
  requiresPassingExam: boolean;
};

const freeFoundations: CatalogCourse[] = [
  {
    slug: "c-programming-fundamentals",
    title: "C Programming Fundamentals",
    shortDescription:
      "A free, practical foundation in structured programming with C.",
    description:
      "Learn syntax, control flow, functions, arrays, pointers, structures and file handling through focused exercises and a small terminal project.",
    category: "Programming",
    deliveryMode: "SELF_PACED",
    contentType: "FULL_ONLINE_VIDEOS",
    pricingCategory: "FREE",
    accessType: "FREE",
    level: "Beginner",
    durationText: "6-8 weeks",
    listPricePaise: null,
    salePricePaise: null,
    freePreviewLessonCount: 0,
    outcomes: [
      "Write and debug structured C programs",
      "Use functions, arrays, pointers and structures",
      "Work safely with files and memory",
      "Complete a command-line capstone",
    ],
    audience: [
      "Programming beginners",
      "Engineering students",
      "Learners preparing for C++ or embedded systems",
    ],
    prerequisites: ["No prior programming experience required"],
    tools: ["C compiler", "VS Code", "Git"],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Programming and C Foundations",
        description: "Tooling, syntax, variables and program flow.",
        lessons: [
          "Set up the C toolchain",
          "Variables and data types",
          "Operators and expressions",
          "Input and output",
        ],
      },
      {
        title: "Control Flow and Functions",
        description: "Decisions, loops and reusable program structure.",
        lessons: [
          "Conditions",
          "Loops",
          "Functions and scope",
          "Debugging fundamentals",
        ],
      },
      {
        title: "Arrays, Strings and Pointers",
        description: "Core memory and collection concepts.",
        lessons: [
          "Arrays",
          "Strings",
          "Pointer foundations",
          "Pointers with arrays",
        ],
      },
      {
        title: "Structures, Files and Capstone",
        description: "Model data and persist it safely.",
        lessons: [
          "Structures and enums",
          "File handling",
          "Memory safety review",
          "Terminal application capstone",
        ],
      },
    ],
  },
  {
    slug: "cpp-essentials",
    title: "C++ Essentials",
    shortDescription:
      "Free C++ foundations covering modern syntax, OOP, STL and practical problem solving.",
    description:
      "Progress from C++ language fundamentals into classes, containers, algorithms, memory ownership and a portfolio-ready console application.",
    category: "Programming",
    deliveryMode: "SELF_PACED",
    contentType: "FULL_ONLINE_VIDEOS",
    pricingCategory: "FREE",
    accessType: "FREE",
    level: "Beginner",
    durationText: "6-8 weeks",
    listPricePaise: null,
    salePricePaise: null,
    freePreviewLessonCount: 0,
    outcomes: [
      "Write modern C++ programs",
      "Apply object-oriented design",
      "Use STL containers and algorithms",
      "Understand memory and ownership basics",
    ],
    audience: [
      "C learners progressing to C++",
      "Engineering students",
      "Aspiring systems developers",
    ],
    prerequisites: ["Basic programming familiarity is helpful"],
    tools: ["C++20 compiler", "VS Code", "Git"],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Modern C++ Foundations",
        description:
          "Types, functions, references and clean program structure.",
        lessons: [
          "Toolchain and first program",
          "Types and control flow",
          "Functions and references",
          "Namespaces and headers",
        ],
      },
      {
        title: "Object-Oriented C++",
        description: "Classes, encapsulation and polymorphism.",
        lessons: [
          "Classes and objects",
          "Constructors",
          "Inheritance",
          "Interfaces and polymorphism",
        ],
      },
      {
        title: "STL and Problem Solving",
        description: "Containers, iterators and algorithms.",
        lessons: ["Vectors and maps", "Iterators", "Algorithms", "Exceptions"],
      },
      {
        title: "Ownership and Capstone",
        description: "Memory, RAII and a complete application.",
        lessons: [
          "Stack and heap",
          "Smart pointers",
          "RAII",
          "Console application capstone",
        ],
      },
    ],
  },
  {
    slug: "javascript-foundations",
    title: "JavaScript Foundations",
    shortDescription:
      "A free path from JavaScript fundamentals to browser applications and asynchronous code.",
    description:
      "Learn language fundamentals, DOM interaction, modules, asynchronous programming and modern browser development through practical mini-projects.",
    category: "Programming",
    deliveryMode: "SELF_PACED",
    contentType: "FULL_ONLINE_VIDEOS",
    pricingCategory: "FREE",
    accessType: "FREE",
    level: "Beginner",
    durationText: "6-8 weeks",
    listPricePaise: null,
    salePricePaise: null,
    freePreviewLessonCount: 0,
    outcomes: [
      "Write modern JavaScript",
      "Build interactive browser interfaces",
      "Use promises and async/await",
      "Structure code with modules",
    ],
    audience: [
      "Web development beginners",
      "Designers moving into code",
      "Learners preparing for React or Node.js",
    ],
    prerequisites: ["Basic HTML and CSS are helpful"],
    tools: ["Browser DevTools", "VS Code", "Git"],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "JavaScript Language Foundations",
        description: "Values, functions, control flow and data structures.",
        lessons: [
          "Values and variables",
          "Functions",
          "Arrays and objects",
          "Errors and debugging",
        ],
      },
      {
        title: "Browser and DOM",
        description: "Events, forms and accessible interaction.",
        lessons: [
          "DOM selection",
          "Events",
          "Forms and validation",
          "Accessible UI state",
        ],
      },
      {
        title: "Asynchronous JavaScript",
        description: "APIs, promises and resilient data loading.",
        lessons: [
          "Promises",
          "Async and await",
          "Fetch and JSON",
          "Loading and error states",
        ],
      },
      {
        title: "Modules and Capstone",
        description: "Organize and ship a small browser product.",
        lessons: [
          "ES modules",
          "Tooling basics",
          "Testing concepts",
          "Interactive web app capstone",
        ],
      },
    ],
  },
];

const professionalPrograms: CatalogCourse[] = [
  {
    slug: "data-structures-algorithms",
    title: "Data Structures & Algorithms",
    shortDescription:
      "A visual, practice-first path through data structures, algorithms and interview-grade problem solving.",
    description:
      "Learn by manipulating live arrays, linked nodes, trees and graphs; step through algorithms; inspect state and complexity; and solve progressively harder coding challenges.",
    category: "Programming",
    deliveryMode: "SELF_PACED",
    contentType: "FULL_ONLINE_VIDEOS",
    pricingCategory: "PRICING",
    accessType: "PAID",
    level: "Intermediate",
    durationText: "12-16 weeks",
    listPricePaise: 1800000,
    salePricePaise: 1499000,
    freePreviewLessonCount: 3,
    outcomes: [
      "Choose the right data structure for a constraint",
      "Trace and implement common algorithms",
      "Explain time and space complexity",
      "Solve interview-grade problems with tested code",
    ],
    audience: [
      "C and C++ learners",
      "Software engineering students",
      "Developers preparing for technical interviews",
    ],
    prerequisites: [
      "Programming fundamentals in C, C++, Java, Python or JavaScript",
    ],
    tools: [
      "Interactive SVG simulations",
      "Code editor and test runner",
      "Complexity visualizer",
      "Practice judge",
    ],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Complexity, Arrays and Strings",
        description: "Reason about cost and contiguous structures.",
        lessons: [
          "Big O with live traces",
          "Array memory visualizer",
          "Two pointers and sliding windows",
          "Searching and sorting",
        ],
      },
      {
        title: "Linked Structures",
        description: "See nodes, references and mutations.",
        lessons: [
          "Singly linked list simulation",
          "Doubly linked lists",
          "Stacks and queues",
          "Hash tables",
        ],
      },
      {
        title: "Trees and Heaps",
        description: "Traverse hierarchical structures.",
        lessons: [
          "Binary tree explorer",
          "BST operations",
          "DFS and BFS",
          "Heaps and priority queues",
        ],
      },
      {
        title: "Graphs and Dynamic Programming",
        description: "Model relationships and optimize repeated work.",
        lessons: [
          "Graph builder",
          "BFS and DFS simulation",
          "Shortest paths",
          "Dynamic programming patterns",
        ],
      },
      {
        title: "Problem Solving and Capstone",
        description: "Integrate analysis, implementation and testing.",
        lessons: [
          "Pattern selection",
          "Constraint-driven design",
          "Timed problem sets",
          "Algorithm visualizer capstone",
        ],
      },
    ],
  },
  {
    slug: "ai-engineering",
    title: "Forward Deployed AI Engineering",
    shortDescription:
      "Full-Stack / Backend Developer -> GenAI Developer -> Production AI Engineer -> AI FDE.",
    description:
      "A technology-agnostic, practice-first progression for engineers who build AI applications, productionize them, integrate enterprise systems and own measurable outcomes.",
    category: "Artificial Intelligence",
    deliveryMode: "HYBRID",
    contentType: "HYBRID_OFFLINE_ONLINE",
    pricingCategory: "PRICING",
    accessType: "PAID",
    level: "Advanced",
    durationText: "8-12 weeks",
    listPricePaise: 3500000,
    salePricePaise: 2999000,
    freePreviewLessonCount: 0,
    brochurePublicPath: "/brochures/ai-engineering.pdf",
    outcomes: [
      "Build LLM, RAG, agent, voice and multimodal applications",
      "Operate AI with evaluation, guardrails, security and observability",
      "Integrate identity, APIs, databases and enterprise systems",
      "Own discovery, adoption and measurable business outcomes",
    ],
    audience: [
      "Python developers",
      "C#/.NET developers",
      "Java/Spring developers",
      "Node.js/TypeScript developers",
      "Tech leads and architects",
    ],
    prerequisites: [
      "Backend programming experience",
      "Working knowledge of APIs, JSON, Git and databases",
      "Python is helpful but not mandatory",
    ],
    tools: [
      "LLM APIs",
      "Vector search and RAG",
      "Agents, MCP and skills",
      "Docker and cloud",
      "Evaluation and observability",
    ],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Engineering Readiness Bridge",
        description: "Optional readiness assessment and bridge.",
        lessons: [
          "Backend/API readiness",
          "Data and database readiness",
          "Testing and Git",
          "Cloud foundations",
        ],
      },
      {
        title: "AI Engineering",
        description: "LLMs, context, structured outputs, embeddings and RAG.",
        lessons: [
          "LLM foundations",
          "Prompt and context engineering",
          "Structured output and tools",
          "Embeddings, vector databases and RAG",
        ],
      },
      {
        title: "Agents, Voice and Multimodal AI",
        description: "Agentic and multimodal application patterns.",
        lessons: [
          "Agents, tasks and memory",
          "MCP, skills and multi-agent patterns",
          "STT, TTS and realtime agents",
          "Vision and document AI",
        ],
      },
      {
        title: "Production AI Engineering",
        description: "Reliable, secure and observable AI delivery.",
        lessons: [
          "Evaluations and guardrails",
          "Docker, CI/CD and cloud",
          "LLMOps and observability",
          "Security, scale and cost",
        ],
      },
      {
        title: "Enterprise Integration",
        description: "Identity and systems-of-record integration.",
        lessons: [
          "SSO, OAuth/OIDC and RBAC",
          "Enterprise APIs and databases",
          "SharePoint, SAP and CRM integration",
          "Service platforms and legacy systems",
        ],
      },
      {
        title: "Solution Architecture and Forward Deployment",
        description: "Choose the right pattern and own outcomes.",
        lessons: [
          "RAG vs fine-tuning vs SLM",
          "Agent vs deterministic workflow",
          "Customer discovery and value case",
          "Forward-deployment capstone",
        ],
      },
    ],
  },
  {
    slug: "ai-leadership",
    title: "Forward Deployed AI Leadership",
    shortDescription:
      "Turn AI ambition into governed, measurable enterprise outcomes.",
    description:
      "An executive program for prioritizing AI investments, challenging delivery proposals, governing risk and leaving with a practical 90-day execution blueprint.",
    category: "Artificial Intelligence",
    deliveryMode: "HYBRID",
    contentType: "HYBRID_OFFLINE_ONLINE",
    pricingCategory: "PRICING",
    accessType: "PAID",
    level: "Executive",
    durationText: "1-2 day executive program + workshop",
    listPricePaise: 2500000,
    salePricePaise: 1999000,
    freePreviewLessonCount: 0,
    brochurePublicPath: "/brochures/ai-leadership.pdf",
    outcomes: [
      "Prioritize AI investments",
      "Challenge architecture and vendor proposals",
      "Define governance and human accountability",
      "Create a 90-day execution blueprint",
    ],
    audience: [
      "CXOs",
      "CIOs and CTOs",
      "VPs and directors",
      "Transformation leaders",
    ],
    prerequisites: ["No coding required"],
    tools: [
      "Opportunity portfolio",
      "Architecture decision matrix",
      "ROI model",
      "Governance checkpoints",
      "90-day blueprint",
    ],
    certificateEnabled: true,
    requiresPassingExam: false,
    modules: [
      {
        title: "AI Reality for Leaders",
        description: "Capabilities, limits and production readiness.",
        lessons: [
          "LLM capability and limitations",
          "RAG, fine-tuning and SLMs",
          "Agents and autonomous workflows",
          "Voice, vision and multimodal opportunities",
        ],
      },
      {
        title: "Prioritize and Fund",
        description: "Value, feasibility and economics.",
        lessons: [
          "Opportunity discovery",
          "Data and permission readiness",
          "Build vs buy vs partner",
          "AI economics and ROI",
        ],
      },
      {
        title: "Govern and Operate",
        description: "Accountability, security and adoption.",
        lessons: [
          "Risk and human control",
          "Security and auditability",
          "Operating model",
          "Adoption and change",
        ],
      },
      {
        title: "90-Day Execution Blueprint",
        description: "Turn decisions into an executable portfolio.",
        lessons: [
          "Select priority use cases",
          "Define pilot and metrics",
          "Set governance checkpoints",
          "Present the 90-day plan",
        ],
      },
    ],
  },
  {
    slug: "applied-ml-engineering",
    title: "Applied Machine Learning Engineer Path",
    shortDescription:
      "Data -> ML -> Deep Learning -> CV/NLP -> LLM/SLM Engineering -> MLOps.",
    description:
      "A production-oriented machine learning path spanning classical ML, deep learning, computer vision, NLP, voice, multimodal AI, model adaptation and MLOps.",
    category: "Artificial Intelligence",
    deliveryMode: "HYBRID",
    contentType: "HYBRID_OFFLINE_ONLINE",
    pricingCategory: "FREEMIUM",
    accessType: "PAID",
    level: "Multi-level",
    durationText: "20-28 weeks",
    listPricePaise: 3500000,
    salePricePaise: 2999000,
    freePreviewLessonCount: 4,
    brochurePublicPath: "/brochures/applied-ml-engineering.pdf",
    outcomes: [
      "Build and evaluate classical ML systems",
      "Develop deep learning solutions for CV and NLP",
      "Fine-tune models with PEFT, LoRA and QLoRA",
      "Train a small educational transformer",
      "Deploy and monitor models with MLOps",
    ],
    audience: [
      "AI and data students",
      "Data analysts",
      "Software developers entering ML",
      "Career switchers",
    ],
    prerequisites: [
      "Basic programming",
      "Python and math bridges are included",
    ],
    tools: [
      "Python and Pandas",
      "scikit-learn",
      "PyTorch",
      "OpenCV and YOLO concepts",
      "Transformers and PEFT",
      "Model serving and MLOps",
    ],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Data, Math and Python Bridge",
        description: "Practical foundations for ML work.",
        lessons: [
          "Python for data",
          "Statistics essentials",
          "Data preparation",
          "SQL and visualization",
        ],
      },
      {
        title: "Classical Machine Learning",
        description: "Supervised, unsupervised and evaluation workflows.",
        lessons: [
          "Regression and classification",
          "Feature engineering",
          "Clustering",
          "Metrics and model selection",
        ],
      },
      {
        title: "Deep Learning",
        description: "Neural networks and practical training.",
        lessons: [
          "Neural network foundations",
          "Optimization",
          "CNNs",
          "Sequence and transformer foundations",
        ],
      },
      {
        title: "Computer Vision, NLP and Multimodal",
        description: "Modern perception and language systems.",
        lessons: [
          "Classification and detection",
          "Segmentation, tracking and OCR",
          "NLP and transformers",
          "Voice and multimodal workflows",
        ],
      },
      {
        title: "LLM and SLM Engineering",
        description: "Adapt, compress and understand language models.",
        lessons: [
          "Dataset preparation and evaluation",
          "Supervised fine-tuning",
          "PEFT, LoRA and QLoRA",
          "Quantization and distillation",
        ],
      },
      {
        title: "Educational Transformer and MLOps",
        description: "Understand internals and operate models.",
        lessons: [
          "Tokenizer and embeddings",
          "Transformer blocks and training loop",
          "Model serving",
          "Monitoring, drift and capstone",
        ],
      },
    ],
  },
  {
    slug: "full-stack",
    title: "Full-Stack Developer Path",
    shortDescription:
      "Frontend foundations to MERN, MEAN, .NET or Java backend specialization.",
    description:
      "Build accessible web interfaces, secure APIs, data-backed applications, automated tests and a production-ready capstone.",
    category: "Full-Stack Development",
    deliveryMode: "HYBRID",
    contentType: "HYBRID_OFFLINE_ONLINE",
    pricingCategory: "FREEMIUM",
    accessType: "PAID",
    level: "Multi-level",
    durationText: "16-24 weeks",
    listPricePaise: 3000000,
    salePricePaise: 2499000,
    freePreviewLessonCount: 5,
    brochurePublicPath: "/brochures/full-stack.pdf",
    outcomes: [
      "Build responsive web applications",
      "Develop secure production APIs",
      "Work with SQL and NoSQL data",
      "Ship a portfolio-grade capstone",
    ],
    audience: ["Students", "Developers switching stacks", "Career returners"],
    prerequisites: ["No framework experience required"],
    tools: [
      "HTML, CSS and TypeScript",
      "React or Angular",
      "Node.js, .NET or Java",
      "SQL and MongoDB",
      "Git, testing and cloud",
    ],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Web Foundations",
        description: "Accessible browser experiences.",
        lessons: [
          "Semantic HTML",
          "Modern CSS",
          "JavaScript and TypeScript",
          "Accessibility and responsive design",
        ],
      },
      {
        title: "Frontend Engineering",
        description: "Component-driven web applications.",
        lessons: [
          "React or Angular foundations",
          "State and forms",
          "Data fetching",
          "Frontend testing",
        ],
      },
      {
        title: "Backend Specialization",
        description: "Choose Node.js, .NET or Java.",
        lessons: [
          "API design",
          "Authentication and authorization",
          "Validation and errors",
          "Backend testing",
        ],
      },
      {
        title: "Data and Production",
        description: "Persist, deploy and operate.",
        lessons: [
          "SQL modeling",
          "NoSQL patterns",
          "Docker and CI/CD",
          "Full-stack capstone",
        ],
      },
    ],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics Path",
    shortDescription:
      "Turn raw data into trustworthy analysis and decision-ready stories.",
    description:
      "A hands-on path through Excel, SQL, Python, practical statistics, visualization, BI dashboards and stakeholder communication.",
    category: "Data Analytics",
    deliveryMode: "SELF_PACED",
    contentType: "FULL_ONLINE_VIDEOS",
    pricingCategory: "FREEMIUM",
    accessType: "PAID",
    level: "Intermediate",
    durationText: "10-16 weeks",
    listPricePaise: 2000000,
    salePricePaise: 1499000,
    freePreviewLessonCount: 4,
    brochurePublicPath: "/brochures/data-analytics.pdf",
    outcomes: [
      "Query and prepare data",
      "Build trustworthy dashboards",
      "Apply practical statistics",
      "Communicate decision-ready insights",
    ],
    audience: [
      "Analysts",
      "Developers moving into data",
      "Business professionals",
    ],
    prerequisites: ["Basic spreadsheet familiarity"],
    tools: ["Excel", "SQL", "Python and Pandas", "Power BI or Tableau"],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Analytics Foundations",
        description: "Questions, metrics and data quality.",
        lessons: [
          "Business questions and KPIs",
          "Excel analysis",
          "Data quality",
          "Analytical thinking",
        ],
      },
      {
        title: "SQL and Data Preparation",
        description: "Query and shape data.",
        lessons: [
          "SQL foundations",
          "Joins and aggregation",
          "Cleaning workflows",
          "Reusable analysis datasets",
        ],
      },
      {
        title: "Python and Statistics",
        description: "Programmatic analysis and evidence.",
        lessons: [
          "Pandas workflows",
          "Exploratory analysis",
          "Practical statistics",
          "Experiment interpretation",
        ],
      },
      {
        title: "BI and Storytelling",
        description: "Dashboards and decisions.",
        lessons: [
          "Visualization principles",
          "Dashboard design",
          "Stakeholder narrative",
          "Analytics capstone",
        ],
      },
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity Foundations",
    shortDescription:
      "Practical security foundations across identity, networks, applications and incident response.",
    description:
      "Develop security judgment through threat modeling, IAM, network and application security, cloud concepts, monitoring and incident response exercises.",
    category: "Cybersecurity",
    deliveryMode: "SELF_PACED",
    contentType: "FULL_ONLINE_VIDEOS",
    pricingCategory: "PRICING",
    accessType: "PAID",
    level: "Foundation",
    durationText: "8-12 weeks",
    listPricePaise: 2000000,
    salePricePaise: 1499000,
    freePreviewLessonCount: 0,
    brochurePublicPath: "/brochures/cybersecurity.pdf",
    outcomes: [
      "Understand common attack surfaces",
      "Apply secure development practices",
      "Identify identity and network risks",
      "Practice incident response thinking",
    ],
    audience: [
      "Developers",
      "QA engineers",
      "IT professionals",
      "Security beginners",
    ],
    prerequisites: ["Basic IT or software familiarity"],
    tools: ["OWASP", "Threat modeling", "IAM", "Security logging"],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Security Foundations",
        description: "Risk, threats and defensive thinking.",
        lessons: [
          "Security principles",
          "Threat actors and attack surfaces",
          "Threat modeling",
          "Security controls",
        ],
      },
      {
        title: "Identity and Networks",
        description: "Secure access and communication.",
        lessons: [
          "Authentication and authorization",
          "IAM and least privilege",
          "Network security",
          "Cloud security basics",
        ],
      },
      {
        title: "Application Security",
        description: "Build and test safer software.",
        lessons: [
          "OWASP risks",
          "Web and API security",
          "Secrets and data protection",
          "Secure development lifecycle",
        ],
      },
      {
        title: "Monitoring and Response",
        description: "Detect, investigate and learn.",
        lessons: [
          "Security logging",
          "Detection concepts",
          "Incident response",
          "Security review capstone",
        ],
      },
    ],
  },
  {
    slug: "space-tech",
    title: "Space Tech Program",
    shortDescription: "Foundation to CubeSat/CanSat-style industry project.",
    description:
      "A deep-tech path through orbital foundations, embedded systems, spacecraft architecture, communications, avionics, AI/autonomy and mission delivery.",
    category: "Space Tech",
    deliveryMode: "COHORT",
    contentType: "HYBRID_OFFLINE_ONLINE",
    pricingCategory: "PRICING",
    accessType: "PAID",
    level: "Multi-level",
    durationText: "24+ weeks",
    listPricePaise: 4500000,
    salePricePaise: 3999000,
    freePreviewLessonCount: 0,
    brochurePublicPath: "/brochures/space-tech.pdf",
    outcomes: [
      "Understand spacecraft systems engineering",
      "Build embedded and communication subsystems",
      "Use simulation and mission tools",
      "Complete a CubeSat/CanSat-style team project",
    ],
    audience: [
      "Engineering students",
      "Embedded developers",
      "Space-tech aspirants",
    ],
    prerequisites: ["Engineering or strong STEM foundation"],
    tools: [
      "Python and Linux",
      "Embedded C/C++",
      "Simulation tools",
      "CAD, PCB and FPGA concepts",
    ],
    certificateEnabled: true,
    requiresPassingExam: true,
    modules: [
      {
        title: "Space Systems Foundations",
        description: "Mission context and orbital foundations.",
        lessons: [
          "Space mission lifecycle",
          "Orbital mechanics",
          "Space environment",
          "Systems engineering",
        ],
      },
      {
        title: "Spacecraft Subsystems",
        description: "Power, thermal, structures and attitude control.",
        lessons: [
          "Power systems",
          "Thermal and structures",
          "ADCS",
          "Subsystem interfaces",
        ],
      },
      {
        title: "Avionics and Communications",
        description: "Embedded flight and ground communication.",
        lessons: [
          "Embedded systems",
          "Sensors and telemetry",
          "RF and ground stations",
          "Flight software concepts",
        ],
      },
      {
        title: "Autonomy and Mission Project",
        description: "Integrate and demonstrate a mission.",
        lessons: [
          "AI and autonomy",
          "Simulation and testing",
          "Mission operations",
          "CubeSat/CanSat-style capstone",
        ],
      },
    ],
  },
  {
    slug: "entrepreneurship",
    title: "Entrepreneurship & Venture Builder",
    shortDescription:
      "Build a real venture from idea to validation, MVP, pilot, traction and scale readiness.",
    description:
      "A mentor-led execution program with persisted stage gates, evidence, versioned artifacts and measurable launch readiness.",
    category: "Entrepreneurship",
    deliveryMode: "COHORT",
    contentType: "HYBRID_OFFLINE_ONLINE",
    pricingCategory: "PRICING",
    accessType: "PAID",
    level: "Intermediate",
    durationText: "10-16 weeks",
    listPricePaise: 5000000,
    salePricePaise: 3999000,
    freePreviewLessonCount: 0,
    brochurePublicPath: "/brochures/entrepreneurship.pdf",
    outcomes: [
      "Validate a customer problem with evidence",
      "Design a viable business model and pricing",
      "Build and test an MVP",
      "Launch a pilot and measure traction",
      "Prepare a credible scale plan",
    ],
    audience: [
      "Aspiring founders",
      "Early-stage experimenters",
      "Professionals transitioning into entrepreneurship",
      "Founder teams preparing to launch",
    ],
    prerequisites: ["A problem or opportunity worth exploring"],
    tools: [
      "Opportunity brief",
      "Customer interviews",
      "Business model and unit economics",
      "MVP scope",
      "Launch and traction metrics",
    ],
    certificateEnabled: true,
    requiresPassingExam: false,
    modules: [
      {
        title: "Idea and Opportunity",
        description: "Frame the problem, customer and why now.",
        lessons: [
          "Opportunity framing",
          "Problem clarity",
          "Target customer",
          "Mentor selection review",
        ],
      },
      {
        title: "Customer Validation",
        description: "Test assumptions with evidence.",
        lessons: [
          "Interview planning",
          "Customer discovery",
          "Validation evidence",
          "Mentor validation gate",
        ],
      },
      {
        title: "Business Model",
        description: "Value, pricing and commercial logic.",
        lessons: [
          "Value proposition",
          "Revenue and pricing",
          "Unit economics",
          "Business model review",
        ],
      },
      {
        title: "MVP Build",
        description: "Scope, build and test the smallest useful product.",
        lessons: [
          "MVP scope",
          "Prototype and architecture",
          "Test plan",
          "MVP readiness review",
        ],
      },
      {
        title: "Pilot Launch",
        description: "Operate a controlled market test.",
        lessons: [
          "Pilot design",
          "Go-to-market experiment",
          "Launch checklist",
          "Launch gate",
        ],
      },
      {
        title: "Traction and Learning",
        description: "Measure behavior and improve.",
        lessons: [
          "Metrics",
          "Feedback loops",
          "Experiment results",
          "Traction review",
        ],
      },
      {
        title: "Scale and Production",
        description: "Prepare systems, team and narrative.",
        lessons: [
          "Operating model",
          "Security and compliance readiness",
          "Scale plan",
          "Final showcase",
        ],
      },
    ],
  },
];

export const courseCatalog: CatalogCourse[] = [
  ...freeFoundations,
  ...professionalPrograms,
];
export const brochureCourses = professionalPrograms;
export const activeCourseSlugs = new Set(
  courseCatalog.map((course) => course.slug),
);
export const retiredCourseSlugs = new Set(["sap-enterprise-consulting"]);

export function courseBySlug(slug: string) {
  return courseCatalog.find((course) => course.slug === slug);
}
