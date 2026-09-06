import Link from 'next/link'
import { requirePlatformAdmin } from '@/lib/auth'
import { prisma } from '@samkhya/db'

export default async function Admin(){
  await requirePlatformAdmin()
  const [users,organizations,courses,enrollments,pendingOutbox]=await Promise.all([
    prisma.user.count(),prisma.organization.count(),prisma.course.count({where:{status:'PUBLISHED'}}),prisma.enrollment.count({where:{status:'ACTIVE'}}),prisma.outboxEvent.count({where:{status:'PENDING'}})
  ])
  return <div className="dashboard"><aside className="sidebar"><h3>Platform Admin</h3>{['Dashboard','Users','Organizations','Courses','Exams','Certificates','Webinars','Audit Logs','Settings'].map(x=><a key={x}>{x}</a>)}<Link href="/platform-admin/crm">Mini CRM</Link><Link href="/platform-admin/content">Content Operations</Link><Link href="/content-studio">Payload Content Studio</Link></aside><main className="main"><h1>Platform administration</h1><div className="grid">{[['Users',users],['Organizations',organizations],['Published courses',courses],['Active enrollments',enrollments]].map(([a,b])=><div className="card" key={String(a)}><div className="metric">{String(b)}</div><div className="muted">{a}</div></div>)}</div><section><h2>Content & integration health</h2><div className="grid"><div className="card"><h3>Content Studio</h3><p className="muted">Courses, modules, lessons, exams, question bank, blogs, webinars, media and faculty.</p><Link className="btn primary" href="/platform-admin/content">Manage content</Link></div><div className="card"><h3>CQRS projections</h3><p className="muted">Learners read immutable published snapshots generated from Payload publishing.</p><div className="metric">{pendingOutbox}</div><div className="muted">pending outbox events</div></div></div></section></main></div>
}
