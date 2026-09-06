import config from '../payload.config'
import { getPayload } from 'payload'
import { courseCatalog } from '@samkhya/catalog'
import { rebuildCourseProjectionFromCMS } from '../src/cms/publishCourse'

const payload = await getPayload({ config })
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const cmsAdmins = await payload.find({ collection: 'cms-users', where: { email: { equals: 'content.admin@samkhyaacademy.local' } }, limit: 1, overrideAccess: true })
if (cmsAdmins.docs[0]) {
  await payload.update({ collection: 'cms-users', id: cmsAdmins.docs[0].id, data: { name: 'Local Content Admin', roles: ['platform_admin'], active: true, _verified: true } as any, overrideAccess: true })
} else {
  await payload.create({ collection: 'cms-users', data: { email: 'content.admin@samkhyaacademy.local', password: 'ChangeMe-Immediately-123!', name: 'Local Content Admin', roles: ['platform_admin'], active: true, _verified: true } as any, overrideAccess: true })
}

const upsertBySlug = async (collection: any, slug: string, data: Record<string, unknown>) => {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
  if (existing.docs[0]) {
    return payload.update({ collection, id: existing.docs[0].id, data, overrideAccess: true, context: { seedInternal: true } })
  }
  return payload.create({ collection, data: { ...data, slug }, overrideAccess: true, context: { seedInternal: true } })
}

const faculty = [
  {
    slug: 'prem-chand',
    name: 'Prem Chand',
    title: 'Engineering & AI Faculty',
    company: 'Samkhya Technologies',
    experience: '15+ years teaching software courses with deep engineering delivery experience',
    bio: 'Engineering practitioner and educator focused on practical software, AI and enterprise delivery.',
    expertise: [{ label: 'AI Engineering' }, { label: 'Full-Stack Engineering' }, { label: 'Software Architecture' }],
    featured: true,
  },
  {
    slug: 'cd-raju',
    name: 'C.D. Raju',
    title: 'CEO & Enterprise Transformation Advisor',
    company: 'Samkhya Technologies',
    experience: '20+ years in enterprise technology, transformation and advisory',
    bio: 'Enterprise technology leader focused on transformation strategy, operating models and measurable adoption.',
    expertise: [{ label: 'Enterprise Transformation' }, { label: 'Technology Strategy' }, { label: 'Leadership' }],
    featured: true,
  },
]

for (const item of faculty) await upsertBySlug('faculty', item.slug, item)

const courseOverrides = [
  {
    slug: 'ai-engineering',
    title: 'Forward Deployed AI Engineering',
    shortDescription: 'Full-Stack / Backend Developer → GenAI Developer → Production AI Engineer → AI FDE. Bring your Python, .NET, Java or Node.js background.',
    description: 'A technology-agnostic, practice-first career progression built on the AIDLC framework. Existing software engineers keep their Python, C#/.NET, Java or Node.js foundation, become GenAI developers, learn production AI engineering, then grow into AI Forward Deployed Engineers who integrate and deliver measurable outcomes inside real enterprises.',
    category: 'Artificial Intelligence',
    deliveryMode: 'LIVE_ONLINE',
    pricingCategory: 'PRICING',
    contentType: 'HYBRID_OFFLINE_ONLINE',
    accessType: 'PAID',
    listPricePaise: 3500000,
    salePricePaise: 2999000,
    pricePaise: 2999000,
    freePreviewLessonCount: 0,
    level: 'Advanced',
    durationText: '8–12 weeks',
    brochurePublicPath: '/brochures/ai-engineering.pdf',
    outcomes: [{ text: 'Build AI applications using LLMs, RAG, agents, MCP, tools and memory' }, { text: 'Productionize AI with evaluation, guardrails, observability, security, CI/CD and cost controls' }, { text: 'Integrate AI with enterprise identity, APIs, databases and systems of record' }, { text: 'Translate ambiguous customer problems into secure, scalable architectures and measurable outcomes' }, { text: 'Own a forward-deployment capstone from discovery to adoption and KPI review' }],
    audience: [{ text: 'Python developers' }, { text: 'C# / .NET developers' }, { text: 'Java / Spring developers' }, { text: 'Node.js / TypeScript developers' }, { text: 'Tech leads and architects' }, { text: 'QA, automation and data engineers' }, { text: 'Engineering managers moving closer to AI delivery' }],
    prerequisites: [{ text: 'Programming experience in Python, C#, Java, JavaScript/TypeScript or another modern backend language' }, { text: 'Comfort with APIs, JSON, Git and basic database concepts' }, { text: 'Python is helpful but not mandatory' }],
    tools: [{ name: 'LLM APIs' }, { name: 'RAG & Vector Search' }, { name: 'Agents & Tool Calling' }, { name: 'MCP & Skills' }, { name: 'Docker / Cloud / CI-CD' }, { name: 'SSO / RBAC / Enterprise APIs' }, { name: 'Evaluation & Observability' }],
    implementationTracks: [
      { name: 'Python', framework: 'FastAPI / Python AI ecosystem', bestFor: 'AI-native services, data-heavy workflows, RAG pipelines and rapid experimentation.' },
      { name: 'C# / .NET', framework: 'ASP.NET Core / Semantic Kernel / SDKs', bestFor: 'Enterprise applications, Azure environments, Microsoft identity, SharePoint and existing .NET estates.' },
      { name: 'Java', framework: 'Spring Boot / LangChain4j / SDKs', bestFor: 'Large enterprise systems, banking, telecom, JVM platforms and integration-heavy environments.' },
      { name: 'Node.js / TypeScript', framework: 'NestJS / Express / AI SDKs', bestFor: 'Web platforms, event-driven APIs, agent tooling and fast product development.' },
    ],
    programJourney: [
      { stage: '0', title: 'Engineering Readiness', description: 'Optional bridge or readiness assessment covering APIs, databases, Git, testing, backend fundamentals and basic cloud. Experienced engineers can test out.' },
      { stage: '1', title: 'AI Engineering', description: 'LLMs, prompting, context engineering, structured outputs, RAG, vector databases, agents, tools, memory, MCP, voice AI and multimodal application patterns.' },
      { stage: '2', title: 'Production AI Engineering', description: 'Docker, cloud, CI/CD, evaluations, guardrails, observability, LLMOps, security, scalability, caching and cost optimization.' },
      { stage: '3', title: 'Enterprise Integration', description: 'SSO, OAuth/OIDC, RBAC, enterprise APIs, databases, SharePoint, SAP, CRM/service systems, permissions and legacy integration.' },
      { stage: '4', title: 'Solution Architecture', description: 'Choose between RAG, fine-tuning, SLMs, multimodal/voice, agents and deterministic workflows; design data, identity, security, resilience, operations and human approval.' },
      { stage: '5', title: 'Customer & Business Problem Solving', description: 'Discovery, feasibility, constraints, success metrics, stakeholder alignment, workflow redesign and value hypothesis.' },
      { stage: '6', title: 'Forward Deployment & Outcome Ownership', description: 'Own an enterprise-style engagement from discovery and architecture through implementation, integration, evaluation, rollout, adoption and KPI review.' },
    ],
    signatureFramework: { name: 'AIDLC', tagline: 'Discover → Assess → Design → Build → Evaluate → Integrate → Deploy → Adopt → Measure → Improve', steps: [
      { label: 'Discover' }, { label: 'Assess' }, { label: 'Design' }, { label: 'Build' }, { label: 'Evaluate' }, { label: 'Integrate' }, { label: 'Deploy' }, { label: 'Adopt' }, { label: 'Measure' }, { label: 'Improve' }
    ] },
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: true, minExamPercent: 70 },
    _status: 'published',
  },
  {
    slug: 'ai-leadership',
    title: 'Forward Deployed AI Leadership',
    shortDescription: 'Turn AI ambition into governed, measurable enterprise outcomes.',
    description: 'Executive program that gives leaders enough fluency to sponsor, challenge and govern the full FDE delivery chain—from AI engineering and production readiness through enterprise integration, architecture, adoption and measurable business outcomes.',
    category: 'Artificial Intelligence',
    deliveryMode: 'LIVE_ONLINE',
    pricingCategory: 'PRICING',
    contentType: 'HYBRID_OFFLINE_ONLINE',
    accessType: 'PAID',
    listPricePaise: 2500000,
    salePricePaise: 1999000,
    pricePaise: 1999000,
    freePreviewLessonCount: 0,
    level: 'Executive',
    durationText: '1–2 day executive program + workshop',
    brochurePublicPath: '/brochures/ai-leadership.pdf',
    outcomes: [{ text: 'Prioritize AI investments' }, { text: 'Challenge AI proposals' }, { text: 'Design governance and human accountability' }, { text: 'Create a 90-day AI execution blueprint' }],
    audience: [{ text: 'CXOs' }, { text: 'CIO/CTO' }, { text: 'VPs and Directors' }, { text: 'Transformation leaders' }],
    tools: [{ name: 'AI portfolio framework' }, { name: 'RAG vs fine-tuning vs SLM decision matrix' }, { name: 'Voice / multimodal opportunity canvas' }, { name: 'ROI model' }, { name: 'Governance checkpoints' }, { name: 'FDE delivery-chain map' }, { name: '90-day execution blueprint' }],
    programJourney: [
      { stage: '1', title: 'Understand the AI Delivery Chain', description: 'AI engineering, production engineering, enterprise integration and solution architecture—including hosted LLMs, RAG, fine-tuning, SLMs, voice, computer vision and multimodal AI—at executive decision depth, not coding depth.' },
      { stage: '2', title: 'Prioritize', description: 'Select initiatives using value, feasibility, data readiness, risk and organizational readiness.' },
      { stage: '3', title: 'Govern', description: 'Define human accountability, identity/data boundaries, approvals, auditability and risk controls.' },
      { stage: '4', title: 'Fund & Partner', description: 'Build-vs-buy decisions, vendor evaluation, cost drivers, platform strategy and role of forward-deployed teams.' },
      { stage: '5', title: 'Adopt & Scale', description: 'Operating model, workflow change, adoption mechanisms, KPI ownership and scale criteria.' },
      { stage: '6', title: '90-Day Execution Blueprint', description: 'Leave with a prioritized portfolio, pilot definition, governance checkpoints, success metrics and execution roadmap.' },
    ],
    signatureFramework: { name: 'Executive FDE Lens', tagline: 'Prioritize → Govern → Fund → Pilot → Adopt → Scale', steps: [
      { label: 'Prioritize' }, { label: 'Govern' }, { label: 'Fund' }, { label: 'Pilot' }, { label: 'Adopt' }, { label: 'Scale' }
    ] },
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: false, minExamPercent: 70 },
    _status: 'published',
  },
  {
    slug: 'applied-ml-engineering',
    title: 'Applied Machine Learning Engineer Path',
    shortDescription: 'Data → ML → Deep Learning → CV/NLP → LLM/SLM Engineering → MLOps.',
    description: 'A production-oriented machine learning path for students, analysts and developers. Covers classical ML, deep learning, computer vision, NLP, transformers, fine-tuning, LoRA/QLoRA, quantization, distillation, small language models, model serving and MLOps.',
    category: 'Artificial Intelligence',
    deliveryMode: 'HYBRID',
    pricingCategory: 'FREEMIUM',
    contentType: 'HYBRID_OFFLINE_ONLINE',
    accessType: 'PAID',
    listPricePaise: 3500000,
    salePricePaise: 2999000,
    pricePaise: 2999000,
    freePreviewLessonCount: 4,
    level: 'Multi-level',
    durationText: '20–28 weeks',
    brochurePublicPath: '/brochures/applied-ml-engineering.pdf',
    prerequisites: [{ text: 'Basic programming; Python bridge provided for learners from other stacks' }, { text: 'Math foundations are taught as part of the path' }],
    outcomes: [{ text: 'Build and evaluate classical ML models' }, { text: 'Develop deep learning systems for computer vision and NLP' }, { text: 'Fine-tune LLMs using PEFT, LoRA and QLoRA' }, { text: 'Build and train a small educational transformer/SLM' }, { text: 'Optimize models using quantization and distillation' }, { text: 'Deploy and operate models with MLOps practices' }],
    audience: [{ text: 'B.Tech / AI & DS / MCA / BCA students' }, { text: 'Data analysts moving into ML' }, { text: 'Software developers entering ML engineering' }, { text: 'AI students needing hands-on production skills' }],
    tools: [{ name: 'Python / NumPy / Pandas' }, { name: 'scikit-learn' }, { name: 'PyTorch / TensorFlow' }, { name: 'OpenCV / YOLO' }, { name: 'Transformers / Hugging Face' }, { name: 'LoRA / QLoRA / PEFT' }, { name: 'Model Serving / MLOps' }],
    programJourney: [
      { stage: '1', title: 'Data & ML Foundations', description: 'Python bridge, statistics, data preparation, classical supervised and unsupervised learning.' },
      { stage: '2', title: 'Deep Learning', description: 'Neural networks, optimization, CNNs, sequence models and transformer foundations.' },
      { stage: '3', title: 'Computer Vision, NLP & Multimodal AI', description: 'Object detection, OCR/document AI, NLP, speech-to-text, text-to-speech and multimodal applications.' },
      { stage: '4', title: 'LLM / SLM Engineering', description: 'Fine-tuning, PEFT, LoRA/QLoRA, quantization, distillation and building a small educational transformer/SLM.' },
      { stage: '5', title: 'Production ML / MLOps', description: 'Model serving, pipelines, monitoring, drift, deployment, security, performance and cost optimization.' },
    ],
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: true, minExamPercent: 70 },
    _status: 'published',
  },
  {
    slug: 'full-stack',
    title: 'Full-Stack Developer Path',
    shortDescription: 'Frontend foundations to MERN, MEAN, .NET or Java backend specialization.',
    description: 'A structured full-stack pathway covering HTML, CSS, JavaScript, TypeScript, React/Angular, APIs, databases, testing, Git and cloud-ready delivery.',
    category: 'Full-Stack Development',
    deliveryMode: 'HYBRID',
    pricingCategory: 'FREEMIUM',
    contentType: 'HYBRID_OFFLINE_ONLINE',
    accessType: 'PAID',
    listPricePaise: 3000000,
    salePricePaise: 2499000,
    pricePaise: 2499000,
    freePreviewLessonCount: 5,
    level: 'Multi-level',
    durationText: '16–24 weeks',
    brochurePublicPath: '/brochures/full-stack.pdf',
    outcomes: [{ text: 'Build responsive web applications' }, { text: 'Develop production APIs' }, { text: 'Work with SQL/NoSQL data' }, { text: 'Ship a portfolio-grade capstone' }],
    audience: [{ text: 'Students' }, { text: 'Developers switching stacks' }, { text: 'Career returners' }],
    tools: [{ name: 'HTML/CSS/JS' }, { name: 'React or Angular' }, { name: 'Node/.NET/Java' }, { name: 'SQL/MongoDB' }],
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: true, minExamPercent: 70 },
    _status: 'published',
  },
  {
    slug: 'space-tech',
    title: 'Space Tech Program',
    shortDescription: 'Foundation to CubeSat/CanSat-style industry project.',
    description: 'Four-level path across orbital mechanics, embedded systems, satellite architecture, RF, avionics, AI/autonomy, mission design and a team mission project.',
    category: 'Space Tech',
    deliveryMode: 'COHORT',
    pricingCategory: 'PRICING',
    contentType: 'HYBRID_OFFLINE_ONLINE',
    accessType: 'PAID',
    listPricePaise: 4500000,
    salePricePaise: 3999000,
    pricePaise: 3999000,
    freePreviewLessonCount: 0,
    level: 'Multi-level',
    durationText: '24+ weeks',
    brochurePublicPath: '/brochures/space-tech.pdf',
    outcomes: [{ text: 'Understand spacecraft systems engineering' }, { text: 'Build embedded and communication subsystems' }, { text: 'Use simulation and mission tools' }, { text: 'Complete a CubeSat/CanSat-type team project' }],
    audience: [{ text: 'Engineering students' }, { text: 'Embedded developers' }, { text: 'Space-tech aspirants' }],
    tools: [{ name: 'Python/Linux/Git' }, { name: 'Embedded C/C++' }, { name: 'MATLAB/Simulink' }, { name: 'CAD/PCB/FPGA' }],
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: true, minExamPercent: 70 },
    _status: 'published',
  },
  {
    slug: 'entrepreneurship',
    title: 'Entrepreneurship & Venture Builder',
    shortDescription: 'Build a real venture from idea to validation, MVP, launch and scale with practitioner-led mentor checkpoints.',
    description: 'Practice-driven, practitioner-led venture-building program. Participants work on a real venture from opportunity discovery and customer validation through business model, MVP, launch, traction review and scale readiness. Each stage produces a tangible artifact and can require mentor approval before progression.',
    category: 'Entrepreneurship',
    deliveryMode: 'COHORT',
    pricingCategory: 'PRICING',
    contentType: 'HYBRID_OFFLINE_ONLINE',
    accessType: 'PAID',
    listPricePaise: 5000000,
    salePricePaise: 3999000,
    pricePaise: 3999000,
    freePreviewLessonCount: 0,
    level: 'Intermediate',
    durationText: '10–16 weeks / cohort-led',
    brochurePublicPath: '/brochures/entrepreneurship.pdf',
    outcomes: [{ text: 'Validate a real customer problem with evidence' }, { text: 'Design a viable business model and pricing' }, { text: 'Scope and build an MVP or prototype' }, { text: 'Launch a pilot and measure traction' }, { text: 'Complete a scale / investor-readiness plan' }],
    audience: [{ text: 'Dreamers with an idea to explore' }, { text: 'Early-stage experimenters / tinkerers' }, { text: 'Founders working toward launch or scale' }, { text: 'Professionals transitioning into entrepreneurship' }],
    tools: [{ name: 'Opportunity brief' }, { name: 'Customer interviews' }, { name: 'Business model & pricing' }, { name: 'MVP scope / prototype' }, { name: 'Launch & traction metrics' }, { name: 'Scale / investor narrative' }],
    ventureBuilder: { enabled: true, mentorLed: true, workflowLabel: 'Idea → Validate → Model → MVP → Launch → Measure → Scale', stageGateApprovalRequired: true, stageArtifacts: [
      { stageKey: 'IDEA', artifactName: 'Opportunity Brief' }, { stageKey: 'VALIDATE', artifactName: 'Validation Report' }, { stageKey: 'MODEL', artifactName: 'Business Model & Pricing' }, { stageKey: 'MVP', artifactName: 'MVP Scope / Prototype' }, { stageKey: 'LAUNCH', artifactName: 'Launch Plan' }, { stageKey: 'MEASURE', artifactName: 'Metrics & Feedback Review' }, { stageKey: 'SCALE', artifactName: 'Scale / Investor Readiness Deck' }
    ] },
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: false, minExamPercent: 70 },
    _status: 'published',
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics Path',
    shortDescription: 'Turn raw data into trustworthy analysis and decision-ready stories.',
    description: 'Hands-on path covering Excel/SQL, Python, data cleaning, visualization, BI, statistics and stakeholder communication.',
    category: 'Data Analytics',
    deliveryMode: 'SELF_PACED',
    pricingCategory: 'FREEMIUM',
    contentType: 'FULL_ONLINE_VIDEOS',
    accessType: 'PAID',
    listPricePaise: 2000000,
    salePricePaise: 1499000,
    pricePaise: 1499000,
    freePreviewLessonCount: 4,
    level: 'Intermediate',
    durationText: '10–16 weeks',
    brochurePublicPath: '/brochures/data-analytics.pdf',
    outcomes: [{ text: 'Query and prepare data' }, { text: 'Build dashboards and visual stories' }, { text: 'Apply practical statistics' }, { text: 'Communicate insights to stakeholders' }],
    audience: [{ text: 'Analysts' }, { text: 'Developers moving into data' }, { text: 'Business professionals' }],
    tools: [{ name: 'SQL' }, { name: 'Python' }, { name: 'Power BI/Tableau' }, { name: 'Excel' }],
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: true, minExamPercent: 70 },
    _status: 'published',
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity Foundations',
    shortDescription: 'Practical security foundations across identity, networks, applications and incident response.',
    description: 'Applied path through security principles, threat modeling, authentication, web/API security, cloud basics, monitoring and response.',
    category: 'Cybersecurity',
    deliveryMode: 'SELF_PACED',
    pricingCategory: 'PRICING',
    contentType: 'FULL_ONLINE_VIDEOS',
    accessType: 'PAID',
    listPricePaise: 2000000,
    salePricePaise: 1499000,
    pricePaise: 1499000,
    freePreviewLessonCount: 0,
    level: 'Foundation',
    durationText: '8–12 weeks',
    brochurePublicPath: '/brochures/cybersecurity.pdf',
    outcomes: [{ text: 'Understand common attack surfaces' }, { text: 'Apply secure development practices' }, { text: 'Identify identity/network risks' }, { text: 'Practice incident response thinking' }],
    audience: [{ text: 'Developers' }, { text: 'QA engineers' }, { text: 'IT professionals' }, { text: 'Security beginners' }],
    tools: [{ name: 'OWASP' }, { name: 'Threat modeling' }, { name: 'IAM' }, { name: 'Security logging' }],
    certificateEnabled: true,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: true, minExamPercent: 70 },
    _status: 'published',
  },
]

const courses = courseCatalog.map((course) => {
  const override = courseOverrides.find((item) => item.slug === course.slug) || {}
  return {
    ...override,
    slug: course.slug,
    title: course.title,
    shortDescription: course.shortDescription,
    description: course.description,
    category: course.category,
    deliveryMode: course.deliveryMode,
    pricingCategory: course.pricingCategory,
    contentType: course.contentType,
    accessType: course.accessType,
    listPricePaise: course.listPricePaise,
    salePricePaise: course.salePricePaise,
    pricePaise: course.salePricePaise,
    freePreviewLessonCount: course.freePreviewLessonCount,
    level: course.level,
    durationText: course.durationText,
    brochurePublicPath: course.brochurePublicPath,
    outcomes: course.outcomes.map((text) => ({ text })),
    audience: course.audience.map((text) => ({ text })),
    prerequisites: course.prerequisites.map((text) => ({ text })),
    tools: course.tools.map((name) => ({ name })),
    certificateEnabled: course.certificateEnabled,
    completionRules: { minLessonCompletionPct: 100, requiresPassingExam: course.requiresPassingExam, minExamPercent: 70 },
    _status: 'published',
  }
})

const seededCourses = new Map<string, any>()
for (const course of courses) seededCourses.set(course.slug, await upsertBySlug('courses', course.slug, course))

for (const catalogCourse of courseCatalog) {
  const courseDoc = seededCourses.get(catalogCourse.slug)
  if (!courseDoc) continue
  let lessonOffset = 0
  for (const [moduleIndex, module] of catalogCourse.modules.entries()) {
    const existingModules = await payload.find({ collection: 'course-modules', where: { and: [{ course: { equals: String(courseDoc.id) } }, { position: { equals: moduleIndex + 1 } }] }, limit: 1, overrideAccess: true })
    const moduleData = { course: courseDoc.id, title: module.title, description: module.description, position: moduleIndex + 1, estimatedMinutes: module.lessons.length * 18, learningObjective: catalogCourse.outcomes[Math.min(moduleIndex, catalogCourse.outcomes.length - 1)], _status: 'published' as const }
    const moduleDoc = existingModules.docs[0]
      ? await payload.update({ collection: 'course-modules', id: existingModules.docs[0].id, data: moduleData, overrideAccess: true, context: { seedInternal: true } })
      : await payload.create({ collection: 'course-modules', data: moduleData, overrideAccess: true, context: { seedInternal: true } })
    for (const [lessonIndex, title] of module.lessons.entries()) {
      const existingLessons = await payload.find({ collection: 'lessons', where: { and: [{ module: { equals: String(moduleDoc.id) } }, { position: { equals: lessonIndex + 1 } }] }, limit: 1, overrideAccess: true })
      const lessonData = { module: moduleDoc.id, title, slug: `${slugify(title)}-${moduleIndex + 1}-${lessonIndex + 1}`, type: 'VIDEO' as const, position: lessonIndex + 1, durationSec: 900 + lessonIndex * 180, isFreePreview: catalogCourse.pricingCategory === 'FREE' || (catalogCourse.pricingCategory === 'FREEMIUM' && lessonOffset < catalogCourse.freePreviewLessonCount), resources: [{ label: 'Lesson workbook', url: `/resources/${catalogCourse.slug}/${moduleIndex + 1}-${lessonIndex + 1}` }], allowComments: true, allowReactions: true, completionMode: 'MANUAL_OR_90_PERCENT_VIDEO' as const, _status: 'published' as const }
      if (existingLessons.docs[0]) await payload.update({ collection: 'lessons', id: existingLessons.docs[0].id, data: lessonData, overrideAccess: true, context: { seedInternal: true } })
      else await payload.create({ collection: 'lessons', data: lessonData, overrideAccess: true, context: { seedInternal: true } })
      lessonOffset += 1
    }
  }
  await rebuildCourseProjectionFromCMS(payload, String(courseDoc.id))
}

const retiredSap = await payload.find({ collection: 'courses', where: { slug: { equals: 'sap-enterprise-consulting' } }, limit: 1, overrideAccess: true })
if (retiredSap.docs[0]) {
  await payload.update({ collection: 'courses', id: retiredSap.docs[0].id, data: { _status: 'draft' }, overrideAccess: true, context: { seedInternal: true } })
}

console.log(`Seeded one internal CMS administrator, ${faculty.length} faculty profiles and ${courses.length} courses.`)
process.exit(0)
