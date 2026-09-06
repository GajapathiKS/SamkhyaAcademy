import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@samkhya/db'
import { OfferCheckout } from '@/components/crm/OfferCheckout'

function money(paise:number){ return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(paise/100) }

export default async function OfferPage({params}:{params:Promise<{token:string}>}){
  const {token}=await params
  const offer=await prisma.offer.findUnique({where:{token}})
  if(!offer) notFound()
  const [course,link]=await Promise.all([
    prisma.course.findUnique({where:{id:offer.courseId}}),
    prisma.paymentLink.findFirst({where:{offerId:offer.id},orderBy:{createdAt:'desc'}}),
  ])
  if(!course) notFound()
  const expired=offer.expiresAt ? offer.expiresAt.getTime()<Date.now() : false
  const unavailable=expired || ['EXPIRED','CANCELLED','REDEEMED'].includes(offer.status) || offer.redemptionCount>=offer.maxRedemptions
  const saving=Math.max(0,offer.originalAmountPaise-offer.finalAmountPaise)
  return <main><section className="hero compact"><div className="shell"><span className="pill">PRIVATE SAMKHYAACADEMY OFFER</span><h1>{course.title}</h1><p>This invitation contains a private course price created for a specific enquiry or organization. Do not forward it unless permitted.</p></div></section><section><div className="shell" style={{maxWidth:820}}><div className="card"><div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}><div><div className="muted">Regular price</div><div style={{fontSize:24,textDecoration:'line-through'}}>{money(offer.originalAmountPaise)}</div></div><div><div className="muted">Your offer</div><div className="metric">{money(offer.finalAmountPaise)}</div></div></div><p className="muted">You save {money(saving)}. {offer.expiresAt?`Offer expires ${offer.expiresAt.toLocaleString('en-IN')}.`:''}</p>{unavailable?<div className="danger-note">This offer is no longer available.</div>:link?.shortUrl?<OfferCheckout token={token} requiresIdentity={Boolean(offer.allowedEmail||offer.allowedMobile)}/>:<div className="danger-note">Payment link is being prepared. Please contact SamkhyaAcademy.</div>}<Link className="btn" href={`/courses/${course.slug}`}>View course details</Link></div></div></section></main>
}
