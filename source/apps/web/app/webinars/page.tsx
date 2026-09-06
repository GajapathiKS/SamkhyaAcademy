import { prisma } from '@samkhya/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Webinars | SamkhyaAcademy' }

export default async function WebinarsPage() {
  const webinars = await prisma.webinar.findMany({ where: { active: true }, orderBy: { startsAt: 'asc' } }).catch(() => [])
  return <main><section className="hero compact"><div className="shell"><span className="pill">LIVE LEARNING</span><h1>Webinars that help you make the next learning decision.</h1><p>Join practitioner-led sessions, curriculum briefings and program Q&A without committing to a course first.</p></div></section><section><div className="shell"><div className="grid">{webinars.map((webinar) => <article className="card" key={webinar.id}><span className="pill">{webinar.startsAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span><h3>{webinar.title}</h3><p className="muted">{webinar.durationMin} minutes · Online</p><a className="btn primary" href={`/webinars#${webinar.slug}`}>Register</a></article>)}{webinars.length === 0 ? <div className="card"><span className="pill">UPCOMING</span><h3>New sessions are being scheduled.</h3><p className="muted">Explore a program brochure now and return for the next curriculum briefing.</p><a className="btn" href="/programs">Explore programs</a></div> : null}</div></div></section></main>
}
