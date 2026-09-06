import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

export type SendResult = { providerMessageId?: string; status: 'SENT'|'SKIPPED'; detail?: string }

const mode = process.env.COMMUNICATIONS_MODE || 'console'

export async function sendEmail(input:{to:string;subject:string;text:string;html?:string}):Promise<SendResult>{
  if(mode==='console'){
    console.log('[EMAIL:console]', {to:input.to, subject:input.subject, text:input.text})
    return {status:'SKIPPED',providerMessageId:`console-email-${Date.now()}`,detail:'COMMUNICATIONS_MODE=console'}
  }
  const from=process.env.SES_FROM_EMAIL
  if(!from) throw new Error('SES_FROM_EMAIL is required')
  const client=new SESv2Client({region:process.env.AWS_REGION || 'ap-south-1'})
  const out=await client.send(new SendEmailCommand({
    FromEmailAddress:from,
    Destination:{ToAddresses:[input.to]},
    Content:{Simple:{Subject:{Data:input.subject,Charset:'UTF-8'},Body:{Text:{Data:input.text,Charset:'UTF-8'},...(input.html?{Html:{Data:input.html,Charset:'UTF-8'}}:{})}}}
  }))
  return {status:'SENT',providerMessageId:out.MessageId}
}

export async function sendWhatsAppTemplate(input:{to:string;templateName:string;language?:string;parameters?:string[]}):Promise<SendResult>{
  if(mode==='console'){
    console.log('[WHATSAPP:console]', input)
    return {status:'SKIPPED',providerMessageId:`console-wa-${Date.now()}`,detail:'COMMUNICATIONS_MODE=console'}
  }
  const token=process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId=process.env.WHATSAPP_PHONE_NUMBER_ID
  if(!token||!phoneNumberId) throw new Error('WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID are required')
  const components=input.parameters?.length?[{type:'body',parameters:input.parameters.map(text=>({type:'text',text}))}]:undefined
  const res=await fetch(`https://graph.facebook.com/${process.env.WHATSAPP_GRAPH_VERSION||'v23.0'}/${phoneNumberId}/messages`,{
    method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
    body:JSON.stringify({messaging_product:'whatsapp',to:normalizePhone(input.to),type:'template',template:{name:input.templateName,language:{code:input.language||'en'},...(components?{components}:{})}})
  })
  const json:any=await res.json()
  if(!res.ok) throw new Error(json?.error?.message || `WhatsApp API error ${res.status}`)
  return {status:'SENT',providerMessageId:json?.messages?.[0]?.id}
}

export function normalizePhone(v:string){return v.replace(/[^0-9]/g,'')}
