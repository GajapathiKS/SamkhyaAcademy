import { requireCrmUser } from '@/lib/auth'
import { sendCampaign } from '@/src/communications/marketing'
export async function POST(_:Request,{params}:{params:Promise<{id:string}>}){await requireCrmUser();const {id}=await params;try{return Response.json(await sendCampaign(id))}catch(e:any){return Response.json({error:String(e?.message||e)},{status:400})}}
