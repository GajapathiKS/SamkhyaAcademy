import config from '@payload-config'
import { getPayload } from 'payload'
import { requirePlatformAdmin } from '@/lib/auth'
import { rebuildCourseProjectionFromCMS } from '@/src/cms/publishCourse'

export async function POST(_: Request, { params }: { params: Promise<{ cmsCourseId: string }> }) {
  try {
    await requirePlatformAdmin()
    const { cmsCourseId } = await params
    const payload = await getPayload({ config })
    const result = await rebuildCourseProjectionFromCMS(payload, cmsCourseId)
    return Response.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN'
    return Response.json({ error: message }, { status: message === 'UNAUTHORIZED' ? 401 : message === 'FORBIDDEN' ? 403 : 500 })
  }
}
