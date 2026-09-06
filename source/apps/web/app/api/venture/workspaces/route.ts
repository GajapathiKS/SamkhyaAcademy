import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth'
import { ensureVentureWorkspace } from '@/lib/venture-builder'

export async function POST(req: Request) {
  try {
    const user = await requireUser()
    const body = await req.json()
    if (!body.enrollmentId) return NextResponse.json({ error: 'enrollmentId is required' }, { status: 400 })
    const workspace = await ensureVentureWorkspace(user.id, body.enrollmentId, body.ventureName || 'My Venture')
    return NextResponse.json(workspace)
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unable to create venture workspace' }, { status: 400 })
  }
}
