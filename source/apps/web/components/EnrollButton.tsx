'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EnrollButton({courseId,accessType,pricingCategory='PRICING',pricePaise,currency='INR'}:{courseId:string;accessType:string;pricingCategory?:string;pricePaise?:number|null;currency?:string}){
  const [busy,setBusy]=useState(false); const [msg,setMsg]=useState(''); const router=useRouter()
  async function enroll(){
    setBusy(true);setMsg('')
    const res=await fetch(`/api/courses/${courseId}/enroll`,{method:'POST'})
    const data=await res.json().catch(()=>({}));setBusy(false)
    if(res.status===402){setMsg(pricingCategory==='FREEMIUM'?'Preview access is available. Purchase the full course to unlock all lessons.':'Payment is required. Use the current course price, private offer, or counsellor-assisted payment link.');return}
    if(!res.ok){setMsg(data.error||'Unable to enroll');return}
    setMsg(data.accessTier==='PREVIEW'?'Preview access activated. Upgrade anytime to unlock the full course.':'Enrolled successfully.');router.refresh()
  }
  const money=pricePaise?new Intl.NumberFormat('en-IN',{style:'currency',currency,maximumFractionDigits:0}).format(pricePaise/100):''
  const label=pricingCategory==='FREE'?'Start Free Course':pricingCategory==='FREEMIUM'?`Start Free Preview${money?` · Full ${money}`:''}`:accessType==='PAID'?`Enroll / Buy${money?` · ${money}`:''}`:'Request Access'
  return <div><button className="btn primary" disabled={busy} onClick={enroll}>{busy?'Please wait…':label}</button>{msg&&<div className="muted" style={{marginTop:8,fontSize:12}}>{msg}</div>}</div>
}
