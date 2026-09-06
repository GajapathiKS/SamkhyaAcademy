import Link from 'next/link'
import BrochureGate from '@/components/BrochureGate'
import EnrollButton from '@/components/EnrollButton'

const fallbackJourney = [
  ['0','Engineering Readiness','Optional bridge: APIs, databases, Git, testing, backend fundamentals and cloud basics. Experienced engineers can test out.'],
  ['1','AI Engineering','LLMs, prompt/context engineering, structured outputs, RAG, vector search, agents, tools, memory, MCP and skills.'],
  ['2','Production AI Engineering','Docker, cloud, CI/CD, evaluations, guardrails, observability, LLMOps, security, scalability, caching and cost optimization.'],
  ['3','Enterprise Integration','SSO/OIDC, RBAC, enterprise APIs, databases, SharePoint, SAP, CRM/service platforms, permissions and legacy integration.'],
  ['4','Solution Architecture','Choose the right pattern: RAG, fine-tuning, agent, deterministic workflow, data layer, security, resilience and human approval.'],
  ['5','Customer & Business Problem Solving','Discovery, feasibility, constraints, success metrics, stakeholders, workflow redesign and value hypothesis.'],
  ['6','Forward Deployment & Outcome Ownership','Own an enterprise-style engagement from discovery through rollout, adoption and measurable KPI review.'],
]

const fallbackTracks = [
  ['Python','FastAPI / Python AI ecosystem','AI-native services, data-heavy workflows, RAG pipelines and rapid experimentation.'],
  ['C# / .NET','ASP.NET Core / Semantic Kernel / SDKs','Enterprise apps, Azure, Microsoft identity, SharePoint and existing .NET estates.'],
  ['Java','Spring Boot / LangChain4j / SDKs','Large enterprise systems, banking, telecom, JVM platforms and integration-heavy environments.'],
  ['Node.js / TypeScript','NestJS / Express / AI SDKs','Web platforms, event-driven APIs, agent tooling and fast product development.'],
]

export default function FdeEngineeringCourse({course, projection}:{course:any; projection:any}) {
  const journey = Array.isArray(projection?.programJourney) && projection.programJourney.length
    ? projection.programJourney.map((x:any)=>[x.stage,x.title,x.description])
    : fallbackJourney
  const tracks = Array.isArray(projection?.implementationTracks) && projection.implementationTracks.length
    ? projection.implementationTracks.map((x:any)=>[x.name,x.framework,x.bestFor])
    : fallbackTracks
  const outcomes = Array.isArray(projection?.outcomes) && projection.outcomes.length ? projection.outcomes : [
    'Build AI applications using LLMs, RAG, agents, MCP, tools and memory',
    'Productionize AI with evals, guardrails, observability, security and cost controls',
    'Integrate AI with enterprise identity, APIs, databases and systems of record',
    'Translate ambiguous customer problems into secure, scalable architectures and measurable outcomes',
    'Own a forward-deployment capstone from discovery to adoption and KPI review',
  ]
  const framework = projection?.signatureFramework || {name:'AIDLC', tagline:'Discover → Assess → Design → Build → Evaluate → Integrate → Deploy → Adopt → Measure → Improve'}
  return <>
    <section className="fde-hero">
      <div className="shell fde-hero-grid">
        <div>
          <span className="fde-kicker">FORWARD DEPLOYED AI • ENGINEERING TRACK</span>
          <h1>Full-Stack Developer → GenAI Developer → Production AI Engineer → AI FDE.</h1>
          <p className="fde-lead">A technology-agnostic career progression for software engineers. Keep your existing Python, C#/.NET, Java or Node.js foundation, add GenAI engineering, learn production AI, then grow into a Forward Deployed AI Engineer who makes AI work inside real enterprises.</p>
          <div className="fde-chip-row">
            {['Python','C# / .NET','Java','Node.js / TypeScript'].map(x=><span className="fde-chip" key={x}>{x}</span>)}
          </div>
          <div className="actions"><EnrollButton courseId={course.id} accessType={course.accessType} pricingCategory={course.pricingCategory} pricePaise={course.salePricePaise ?? course.pricePaise ?? course.listPricePaise} currency={course.currency}/>{course.brochurePath&&<BrochureGate slug={course.slug} brochure={course.brochurePath}/>}<Link className="btn" href="/ai-academy">Explore AI Academy</Link></div>
          <p className="fde-note">Python is helpful, but not mandatory. Full-stack and backend developers from .NET, Java, Node.js or Python can enter this journey.</p>
        </div>
        <div className="fde-formula-card">
          <span className="fde-mini">THE FDE FORMULA</span>
          <h2>AI FDE =</h2>
          <ul>
            <li>Software Engineering</li><li>AI Engineering</li><li>Production Engineering</li><li>Enterprise Integration</li><li>Solution Architecture</li><li>Customer Problem Solving</li><li><strong>Outcome Ownership</strong></li>
          </ul>
        </div>
      </div>
    </section>

    <section className="fde-section"><div className="shell">
      <div className="fde-section-head"><span className="fde-kicker">THE CAREER PROGRESSION</span><h2>Software Engineer → GenAI Developer → Production AI Engineer → AI FDE.</h2><p>You do not restart your career. You build on your existing full-stack/backend skills, add the GenAI layer, productionize it, then learn enterprise integration, architecture and outcome ownership.</p></div>
      <div className="fde-progression-strip">
        {['Full-Stack / Backend Developer','GenAI Developer','Production AI Engineer','AI Forward Deployed Engineer'].map((x,i)=><div className="fde-progression-step" key={x}><span>{i+1}</span><strong>{x}</strong>{i<3&&<b>→</b>}</div>)}
      </div>
      <div className="fde-entry-note"><strong>Multiple entry points:</strong> experienced GenAI developers can start deeper in the production layer; experienced AI engineers can focus on enterprise integration, architecture and forward deployment.</div>
      <div className="fde-journey">
        {journey.map((x:any)=><article className="fde-stage" key={`${x[0]}-${x[1]}`}><span className="fde-stage-num">{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
      </div>
    </div></section>

    <section className="fde-section fde-dark"><div className="shell">
      <div className="fde-section-head light"><span className="fde-kicker mint">TECHNOLOGY-AGNOSTIC DELIVERY</span><h2>Keep your engineering identity. Add the AI and FDE layers.</h2><p>Core concepts are taught once; labs and reference implementations can be completed in a supported backend stack.</p></div>
      <div className="fde-track-grid">{tracks.map((x:any)=><article className="fde-track" key={x[0]}><h3>{x[0]}</h3><strong>{x[1]}</strong><p>{x[2]}</p></article>)}</div>
    </div></section>

    <section className="fde-section"><div className="shell fde-two-col">
      <div>
        <span className="fde-kicker">SIGNATURE DELIVERY FRAMEWORK</span>
        <h2>{framework.name || 'AIDLC'}</h2>
        <p className="fde-big-quote">{framework.tagline || 'Discover → Assess → Design → Build → Evaluate → Integrate → Deploy → Adopt → Measure → Improve'}</p>
        <p>AIDLC connects the engineering layers into a disciplined delivery lifecycle. It gives learners a repeatable way to move from business problem to production outcome.</p>
      </div>
      <div className="fde-outcome-card"><span className="fde-mini">BY THE END</span>{outcomes.slice(0,5).map((x:string)=><div className="fde-check" key={x}>✓ <span>{x}</span></div>)}</div>
    </div></section>

    <section className="fde-section fde-soft"><div className="shell">
      <div className="fde-section-head"><span className="fde-kicker">FINAL CAPSTONE</span><h2>Forward Deployment Engagement</h2><p>Not “build a chatbot.” Own a customer-style engagement from ambiguity to adoption.</p></div>
      <div className="fde-capstone-grid">
        {['Discovery brief','Feasibility & value case','Solution architecture','AI implementation','Enterprise integration','Identity & RBAC','Evaluation & guardrails','Production deployment','Observability & cost','Adoption & KPI review'].map((x,i)=><div className="fde-capstone" key={x}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>)}
      </div>
    </div></section>
  </>
}
