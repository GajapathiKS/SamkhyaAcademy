import { prisma } from '@samkhya/db'
import { requireUser } from '@/lib/auth'
import Link from 'next/link'

export default async function CertificatesPage() {
  const user = await requireUser()
  const certificates = await prisma.certificate.findMany({ where: { userId: user.id }, orderBy: { issuedAt: 'desc' } })
  const courses = await prisma.course.findMany({ where: { id: { in: certificates.map((certificate) => certificate.courseId) } }, select: { id: true, title: true } })
  const courseTitles = new Map(courses.map((course) => [course.id, course.title]))
  return <main className="shell" style={{ paddingTop: 44, paddingBottom: 70 }}><span className="pill">VERIFIABLE ACHIEVEMENT</span><h1>Certificates</h1><p className="muted">Certificates are issued only after the configured lesson, assessment and project requirements are met.</p><div className="grid" style={{ marginTop: 24 }}>{certificates.map((certificate) => <Link className="card" href={`/certificates/verify/${certificate.verificationCode}`} key={certificate.id}><span className="pill">{certificate.status}</span><h3>{courseTitles.get(certificate.courseId) || 'SamkhyaAcademy Program'}</h3><p className="muted">Issued {certificate.issuedAt.toLocaleDateString('en-IN')}</p><b>Verify certificate →</b></Link>)}{certificates.length === 0 ? <div className="card"><h3>No certificates yet</h3><p className="muted">Complete an eligible course and its required assessment to unlock a certificate.</p><Link className="btn primary" href="/dashboard">Return to My Learning</Link></div> : null}</div></main>
}
