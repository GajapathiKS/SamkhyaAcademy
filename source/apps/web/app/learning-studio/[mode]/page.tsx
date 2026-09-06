import { requireUser } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { LearningStudio } from '../LearningStudio'

const modes = new Set([
  'text-lesson', 'code-lab', 'practice', 'snippets', 'project-library', 'project-detail',
  'code-lab-hint', 'practice-failed', 'practice-passed', 'code-lab-mobile',
  'code-lab-notes', 'code-lab-discussion', 'code-lab-resource', 'practice-hint',
])

export default async function LearningStudioPage({ params, searchParams }: { params: Promise<{ mode: string }>; searchParams: Promise<{ preview?: string }> }) {
  const preview = await searchParams
  if (!(process.env.UX_CAPTURE_MODE === '1' && preview.preview === '1')) await requireUser()
  const { mode } = await params
  if (!modes.has(mode)) notFound()
  return <LearningStudio mode={mode} />
}
