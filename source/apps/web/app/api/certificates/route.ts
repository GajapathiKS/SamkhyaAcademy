import { z } from 'zod'
import { requireUser } from '@/lib/auth'
import { issueCertificate } from '@/src/lib/learning'
const schema = z.object({ courseId: z.string().min(1) })
export async function POST(req: Request) {
  try {
    const user = await requireUser()
    const { courseId } = schema.parse(await req.json())
    const result = await issueCertificate(user.id, courseId)
    return Response.json(result, { status: result.eligible ? 201 : 409 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'INVALID_REQUEST'
    return Response.json({ error: message }, { status: message === 'UNAUTHORIZED' ? 401 : 400 })
  }
}
