import { z } from 'zod'
import { prisma } from '@samkhya/db'
import { requireUser } from '@/lib/auth'

const schema=z.object({
  ventureName:z.string().min(2).max(120), ideaSummary:z.string().min(5).max(300), problemStatement:z.string().min(10).max(3000),
  whyNow:z.string().max(2000).optional().or(z.literal('')), businessCategory:z.string().max(120).optional().or(z.literal('')),
  problemSeverity:z.string().max(60).optional().or(z.literal('')), geographicScope:z.string().max(120).optional().or(z.literal('')),
  targetCustomer:z.string().min(3).max(1200), customerSize:z.string().max(300).optional().or(z.literal('')),
  initialSolution:z.string().min(5).max(3000), differentiators:z.string().max(2000).optional().or(z.literal('')),
  expectedImpact:z.string().max(2000).optional().or(z.literal('')), existingAlternatives:z.string().max(2000).optional().or(z.literal('')),
  founderBackground:z.string().max(2000).optional().or(z.literal('')), linkedinUrl:z.string().max(500).optional().or(z.literal('')),
  supportNeeds:z.array(z.string()).max(12).default([]), status:z.enum(['DRAFT','SUBMITTED']).default('DRAFT'),
})

export async function GET(){try{const user=await requireUser();const items=await prisma.ventureIdeaSubmission.findMany({where:{userId:user.id},orderBy:{updatedAt:'desc'}});return Response.json({items})}catch(e:any){return Response.json({error:String(e?.message||e)},{status:401})}}
export async function POST(req:Request){try{const user=await requireUser();const parsed=schema.safeParse(await req.json());if(!parsed.success)return Response.json({error:'VALIDATION_FAILED',details:parsed.error.flatten()},{status:400});const x=parsed.data;const evaluationSnapshot={criteria:[{key:'problem_clarity',weight:20},{key:'customer_relevance',weight:20},{key:'solution_approach',weight:20},{key:'founder_readiness',weight:20},{key:'scalability',weight:20}]};const item=await prisma.ventureIdeaSubmission.create({data:{userId:user.id,ventureName:x.ventureName,ideaSummary:x.ideaSummary,problemStatement:x.problemStatement,whyNow:x.whyNow||null,businessCategory:x.businessCategory||null,problemSeverity:x.problemSeverity||null,geographicScope:x.geographicScope||null,targetCustomer:x.targetCustomer,customerSize:x.customerSize||null,initialSolution:x.initialSolution,differentiators:x.differentiators||null,expectedImpact:x.expectedImpact||null,existingAlternatives:x.existingAlternatives||null,founderBackground:x.founderBackground||null,linkedinUrl:x.linkedinUrl||null,supportNeeds:x.supportNeeds,evaluationSnapshot,status:x.status,submittedAt:x.status==='SUBMITTED'?new Date():null}});await prisma.outboxEvent.create({data:{aggregateType:'VentureIdeaSubmission',aggregateId:item.id,eventType:x.status==='SUBMITTED'?'VentureIdeaSubmitted':'VentureIdeaDrafted',payload:{ideaId:item.id,userId:user.id}}});return Response.json(item,{status:201})}catch(e:any){const m=String(e?.message||e);return Response.json({error:m},{status:m.includes('UNAUTHORIZED')?401:500})}}
