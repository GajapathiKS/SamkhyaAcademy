import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth'
import { submitVentureStage } from '@/lib/venture-builder'

export async function POST(req: Request, { params }: { params: Promise<{ workspaceId: string; stageKey: string }> }) {
  try {
    const user = await requireUser()
    const { workspaceId, stageKey } = await params
    const body = await req.json()
    const artifact = await submitVentureStage(user.id, workspaceId, stageKey, {
      title: body.title || `${stageKey} submission`,
      artifactType: body.artifactType || 'WORKSHEET',
      contentJson: body.contentJson || {},
    })
    return NextResponse.json(artifact)
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unable to submit stage' }, { status: 400 })
  }
}
