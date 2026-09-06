import { z } from 'zod'
import { prisma } from '@samkhya/db'
import { requireCrmUser } from '@/lib/auth'
const schema=z.object({leadId:z.string().optional(),opportunityId:z.string().optional(),type:z.enum(['NOTE','CALL','EMAIL','WHATSAPP','MEETING','WEBINAR','BROCHURE','OFFER_SENT','PAYMENT','ENROLLMENT']),subject:z.string().min(2).max(300),notes:z.string().max(4000).optional()})
export async function POST(req:Request){try{const admin=await requireCrmUser();const parsed=schema.safeParse(await req.json());if(!parsed.success)return Response.json({errors:parsed.error.flatten()},{status:400});const activity=await prisma.crmActivity.create({data:{...parsed.data,actorUserId:admin.id}});return Response.json(activity,{status:201})}catch(e:any){return Response.json({error:String(e?.message||e)},{status:String(e?.message).includes('FORBIDDEN')?403:500})}}
