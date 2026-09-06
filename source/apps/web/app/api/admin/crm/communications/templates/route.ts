import { prisma } from '@samkhya/db'
import { z } from 'zod'
import { requireCrmUser } from '@/lib/auth'

const schema=z.object({name:z.string().min(2),key:z.string().min(2),channel:z.enum(['EMAIL','WHATSAPP']),subject:z.string().optional(),bodyText:z.string().min(1),bodyHtml:z.string().optional(),providerTemplateName:z.string().optional(),providerLanguage:z.string().optional(),variables:z.any().optional(),status:z.enum(['DRAFT','ACTIVE','PAUSED','ARCHIVED']).default('ACTIVE')})
export async function GET(){await requireCrmUser();return Response.json(await prisma.marketingTemplate.findMany({orderBy:{updatedAt:'desc'}}))}
export async function POST(req:Request){const u=await requireCrmUser();const p=schema.safeParse(await req.json());if(!p.success)return Response.json({errors:p.error.flatten()},{status:400});const row=await prisma.marketingTemplate.create({data:{...p.data,createdByUserId:u.id}});return Response.json(row,{status:201})}
