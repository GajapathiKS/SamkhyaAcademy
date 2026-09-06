import { z } from 'zod'
import { requireUser } from '@/lib/auth'
import { submitVentureStage } from '@/lib/venture-builder'
import { prisma } from '@samkhya/db'

const schema=z.object({stageKey:z.string().min(2).max(30),title:z.string().min(2).max(200),artifactType:z.string().min(2).max(120),fileObjectKey:z.string().max(1000).optional(),contentJson:z.any().optional()})
export async function GET(_:Request,{params}:{params:Promise<{workspaceId:string}>}){try{const user=await requireUser();const {workspaceId}=await params;const w=await prisma.ventureWorkspace.findFirst({where:{id:workspaceId,userId:user.id}});if(!w)return Response.json({error:'WORKSPACE_NOT_FOUND'},{status:404});const items=await prisma.ventureArtifact.findMany({where:{workspaceId},orderBy:{updatedAt:'desc'}});return Response.json({items})}catch(e:any){return Response.json({error:String(e?.message||e)},{status:401})}}
export async function POST(req:Request,{params}:{params:Promise<{workspaceId:string}>}){try{const user=await requireUser();const {workspaceId}=await params;const parsed=schema.safeParse(await req.json());if(!parsed.success)return Response.json({error:'VALIDATION_FAILED',details:parsed.error.flatten()},{status:400});const item=await submitVentureStage(user.id,workspaceId,parsed.data.stageKey,parsed.data);return Response.json(item,{status:201})}catch(e:any){const m=String(e?.message||e);return Response.json({error:m},{status:m.includes('UNAUTHORIZED')?401:m.includes('NOT_FOUND')?404:400})}}
