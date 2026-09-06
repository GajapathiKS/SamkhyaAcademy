import Link from 'next/link'
import { brochureCourses } from '@samkhya/catalog'

export const metadata = { title: 'Programs | SamkhyaAcademy', description: 'Professional, executive and founder programs from SamkhyaAcademy.' }

export default function ProgramsPage() {
  return <main><section className="hero compact"><div className="shell"><span className="pill">GUIDED PROGRAMS</span><h1>Applied programs for engineering, leadership and venture outcomes.</h1><p>Compare format, duration and curriculum before choosing a preview, brochure or enrollment path.</p></div></section><section><div className="shell"><div className="grid">{brochureCourses.map((course) => <Link className="card" href={`/courses/${course.slug}`} key={course.slug}><span className="pill">{course.pricingCategory === 'FREEMIUM' ? 'FREE PREVIEW' : 'PREMIUM'}</span><h3>{course.title}</h3><p className="muted">{course.shortDescription}</p><p><strong>{course.durationText}</strong> · {course.contentType === 'FULL_ONLINE_VIDEOS' ? 'Online' : 'Hybrid'}</p><b>View program →</b></Link>)}</div></div></section></main>
}
