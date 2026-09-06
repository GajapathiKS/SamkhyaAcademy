import Link from 'next/link'
import { prisma } from '@samkhya/db'
import { requireUser } from '@/lib/auth'
import { ensureVentureWorkspace, calculateWorkspaceReadiness } from '@/lib/venture-builder'

export const dynamic='force-dynamic'
export default async function VentureBuilderPage(){
  const user=await requireUser()
  const [enrollment,ideas]=await Promise.all([
    prisma.enrollment.findFirst({where:{userId:user.id,course:{slug:'entrepreneurship'},status:{in:['ACTIVE','COMPLETED']}},include:{course:true}}),
    prisma.ventureIdeaSubmission.findMany({where:{userId:user.id},orderBy:{updatedAt:'desc'},take:5}),
  ])
  if(!enrollment)return <main className="venture-page"><section className="venture-hero"><div className="venture-shell"><div className="venture-kicker">Venture Builder</div><h1>Build a venture, not just a certificate.</h1><p>Submit an idea for review or enroll in the Entrepreneurship & Venture Builder program to unlock the full workspace.</p><div className="actions"><Link className="btn primary" href="/venture-builder/idea">Submit an Idea</Link><Link className="btn" href="/entrepreneurship">Explore Program</Link></div>{ideas.length>0&&<div className="venture-panel" style={{marginTop:22,maxWidth:720}}><h3>Your idea submissions</h3>{ideas.map(i=><div key={i.id} className="artifact-row"><span className="artifact-icon">✦</span><div><strong>{i.ventureName}</strong><div className="muted">{i.status.replaceAll('_',' ')} · {new Date(i.updatedAt).toLocaleDateString('en-IN')}</div></div></div>)}</div>}</div></section></main>

  const idea=ideas.find(i=>i.status==='SHORTLISTED'||i.status==='SUBMITTED'||i.status==='CONVERTED_TO_WORKSPACE')
  const workspace=await ensureVentureWorkspace(user.id,enrollment.id,idea?.ventureName||'My Venture',idea?.id)
  const readiness=calculateWorkspaceReadiness(workspace)
  const current=workspace.stages.find((s:any)=>s.stageKey===workspace.currentStageKey)||workspace.stages[0]
  return <main className="venture-page"><section className="venture-hero"><div className="venture-shell"><div className="venture-kicker">Venture Builder Workspace</div><h1>{workspace.ventureName}</h1><p>Move your venture from idea to market through evidence, stage artifacts, mentor checkpoints and measurable progress.</p><div className="actions"><Link className="btn primary" href={`/venture-builder/workspaces/${workspace.id}/workflow`}>Open Venture Workflow →</Link><Link className="btn" href={`/venture-builder/workspaces/${workspace.id}/artifacts`}>Artifacts & Readiness</Link></div></div></section><section><div className="venture-shell"><div className="venture-grid-4"><div className="venture-metric"><span className="muted">Current Stage</span><strong style={{fontSize:18}}>{current.title}</strong></div><div className="venture-metric"><span className="muted">Readiness</span><strong>{readiness}%</strong></div><div className="venture-metric"><span className="muted">Artifacts</span><strong>{workspace.artifacts.length}</strong></div><div className="venture-metric"><span className="muted">Mentor Reviews</span><strong>{workspace.reviews.length}</strong></div></div><h2 className="section-title" style={{marginTop:28}}>Your 7-stage journey</h2><div className="venture-stagebar">{workspace.stages.map((s:any,i:number)=><div key={s.id} className={`venture-stage ${s.stageKey===workspace.currentStageKey?'current':''} ${s.status==='APPROVED'?'approved':''}`}><div className="num">{s.status==='APPROVED'?'✓':i+1}</div><h4>{s.title}</h4><p>{s.status.replaceAll('_',' ')}</p></div>)}</div></div></section></main>
}
