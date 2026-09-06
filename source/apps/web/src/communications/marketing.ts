import { prisma } from '@samkhya/db'
import { SignJWT, jwtVerify } from 'jose'
import { sendEmail, sendWhatsAppTemplate, normalizePhone } from './providers'

const unsubscribeSecret=new TextEncoder().encode(process.env.UNSUBSCRIBE_SECRET || process.env.NEXTAUTH_SECRET || 'dev-unsubscribe-secret')

export function renderTemplate(text:string, vars:Record<string,string|undefined>){
  return Object.entries(vars).reduce((out,[k,v])=>out.replaceAll(`{{${k}}}`,v||''),text)
}

export async function createUnsubscribeToken(destination:string,channel:'EMAIL'|'WHATSAPP'){
  return new SignJWT({destination,channel}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('180d').sign(unsubscribeSecret)
}
export async function readUnsubscribeToken(token:string){const {payload}=await jwtVerify(token,unsubscribeSecret);return {destination:String(payload.destination),channel:String(payload.channel) as 'EMAIL'|'WHATSAPP'}}

async function isAllowed(lead:any,channel:'EMAIL'|'WHATSAPP',destination:string){
  const suppressed=await prisma.communicationSuppression.findUnique({where:{channel_destination:{channel,destination}}})
  if(suppressed) return false
  const consent=await prisma.communicationConsent.findUnique({where:{leadId_channel:{leadId:lead.id,channel}}})
  return consent?.state==='OPTED_IN'
}

export async function buildRecipients(campaignId:string){
  const campaign=await prisma.marketingCampaign.findUnique({where:{id:campaignId},include:{template:true}})
  if(!campaign) throw new Error('CAMPAIGN_NOT_FOUND')
  const segment:any=campaign.segment || {}
  const leads=await prisma.lead.findMany({where:{
    ...(segment.statuses?.length?{status:{in:segment.statuses}}:{}),
    ...(segment.programSlugs?.length?{programSlug:{in:segment.programSlugs}}:{}),
    ...(segment.types?.length?{type:{in:segment.types}}:{}),
    ...(segment.source?{source:segment.source}:{})
  },take:segment.limit||1000,orderBy:{createdAt:'desc'}})
  let created=0
  for(const lead of leads){
    const destination=campaign.channel==='EMAIL'?lead.email:normalizePhone(lead.mobile)
    if(!destination || !(await isAllowed(lead,campaign.channel as any,destination))) continue
    await prisma.campaignRecipient.upsert({
      where:{campaignId_destination:{campaignId:campaign.id,destination}},
      update:{leadId:lead.id},create:{campaignId:campaign.id,leadId:lead.id,destination}
    });created++
  }
  return created
}

export async function sendCampaign(campaignId:string){
  const campaign=await prisma.marketingCampaign.findUnique({where:{id:campaignId},include:{template:true}})
  if(!campaign) throw new Error('CAMPAIGN_NOT_FOUND')
  await buildRecipients(campaignId)
  await prisma.marketingCampaign.update({where:{id:campaignId},data:{status:'SENDING',startedAt:new Date()}})
  const recipients=await prisma.campaignRecipient.findMany({where:{campaignId,status:'QUEUED'},include:{lead:true}})
  let sent=0,failed=0,skipped=0
  for(const r of recipients){
    const lead=r.lead
    if(!lead){skipped++;continue}
    try{
      const vars={name:lead.name,program:lead.programSlug||'',company:lead.company||'',offer_url:String((campaign.segment as any)?.offerUrl||'')}
      if(campaign.channel==='EMAIL'){
        const unsub=await createUnsubscribeToken(r.destination,'EMAIL')
        const base=process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000'
        const subject=renderTemplate(campaign.template.subject||campaign.name,vars)
        const text=renderTemplate(campaign.template.bodyText,vars)+`\n\nUnsubscribe: ${base}/api/communications/unsubscribe?token=${encodeURIComponent(unsub)}`
        const html=campaign.template.bodyHtml?renderTemplate(campaign.template.bodyHtml,vars)+`<p style="font-size:12px"><a href="${base}/api/communications/unsubscribe?token=${encodeURIComponent(unsub)}">Unsubscribe</a></p>`:undefined
        const out=await sendEmail({to:r.destination,subject,text,html})
        await prisma.campaignRecipient.update({where:{id:r.id},data:{status:out.status==='SENT'?'SENT':'SKIPPED',providerMessageId:out.providerMessageId,renderedSubject:subject,renderedBody:text,sentAt:new Date()}})
        out.status==='SENT'?sent++:skipped++
      }else{
        if(!campaign.template.providerTemplateName) throw new Error('WhatsApp template must have providerTemplateName')
        const params=((campaign.template.variables as any)?.bodyParameters||['name']).map((k:string)=>vars[k as keyof typeof vars]||'')
        const out=await sendWhatsAppTemplate({to:r.destination,templateName:campaign.template.providerTemplateName,language:campaign.template.providerLanguage||'en',parameters:params})
        await prisma.campaignRecipient.update({where:{id:r.id},data:{status:out.status==='SENT'?'SENT':'SKIPPED',providerMessageId:out.providerMessageId,renderedBody:campaign.template.bodyText,sentAt:new Date()}})
        out.status==='SENT'?sent++:skipped++
      }
      await prisma.crmActivity.create({data:{leadId:lead.id,type:campaign.channel==='EMAIL'?'EMAIL':'WHATSAPP',subject:`Campaign: ${campaign.name}`,metadata:{campaignId:campaign.id}}})
    }catch(e:any){failed++;await prisma.campaignRecipient.update({where:{id:r.id},data:{status:'FAILED',error:String(e?.message||e)}})}
  }
  const status='COMPLETED' as const
  await prisma.marketingCampaign.update({where:{id:campaign.id},data:{status,completedAt:new Date(),stats:{sent,failed,skipped,total:recipients.length}}})
  return {sent,failed,skipped,total:recipients.length}
}
