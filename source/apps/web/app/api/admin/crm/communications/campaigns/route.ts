import { prisma } from '@samkhya/db'
import { z } from 'zod'
import { requireCrmUser } from '@/lib/auth'

const schema=z.object({name:z.string().min(2),channel:z.enum(['EMAIL','WHATSAPP']),templateId:z.string().min(1),segment:z.any().default({}),scheduledAt:z.string().datetime().optional()})
export async function GET(){await requireCrmUser();return Response.json(await prisma.marketingCampaign.findMany({include:{template:true,_count:{select:{recipients:true}}},orderBy:{createdAt:'desc'}}))}
export async function POST(req:Request){const u=await requireCrmUser();const p=schema.safeParse(await req.json());if(!p.success)return Response.json({errors:p.error.flatten()},{status:400});const row=await prisma.marketingCampaign.create({data:{name:p.data.name,channel:p.data.channel,templateId:p.data.templateId,segment:p.data.segment,scheduledAt:p.data.scheduledAt?new Date(p.data.scheduledAt):null,status:p.data.scheduledAt?'SCHEDULED':'DRAFT',createdByUserId:u.id}});return Response.json(row,{status:201})}
