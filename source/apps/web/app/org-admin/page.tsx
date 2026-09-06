import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { prisma } from '@samkhya/db'

export default async function OrgAdmin({searchParams}:{searchParams:Promise<{org?:string}>}){
  const user=await requireUser(); const qs=await searchParams
  const eligible=user.memberships.filter((m:any)=>['ORG_OWNER','ORG_ADMIN'].includes(String(m.role)))
  if(!eligible.length && user.platformRole!=='PLATFORM_ADMIN') redirect('/dashboard')
  const organizationId=qs.org || eligible[0]?.organizationId
  if(!organizationId) return <main className="main"><h1>Select an organization</h1></main>
  if(user.platformRole!=='PLATFORM_ADMIN' && !eligible.some((m:any)=>m.organizationId===organizationId)) redirect('/dashboard')
  const org=await prisma.organization.findUnique({where:{id:organizationId},include:{memberships:true,enrollments:true}})
  if(!org) redirect('/dashboard')
  const active=org.enrollments.filter(e=>e.status==='ACTIVE'); const completed=org.enrollments.filter(e=>e.status==='COMPLETED')
  const completion=org.enrollments.length?Math.round(completed.length/org.enrollments.length*100):0
  return <div className="dashboard"><aside className="sidebar"><h3>{org.name}</h3>{['Overview','Learners','Teams','Learning Paths','Assignments','Exams','Certificates','Reports','Billing'].map(x=><a key={x}>{x}</a>)}</aside><main className="main"><h1>Organization dashboard</h1><div className="grid">{[['Learners',org.memberships.length],['Active enrollments',active.length],['Completion',`${completion}%`],['Completed enrollments',completed.length]].map(([a,b])=><div className="card" key={String(a)}><div className="metric">{String(b)}</div><div className="muted">{a}</div></div>)}</div><section><h2>Learner management</h2><p className="muted">Organization admins can invite learners/managers, assign learning, and view progress. They cannot access the internal Content Studio or author courses.</p></section></main></div>
}
