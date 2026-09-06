'use client'
import { useState } from 'react'
export function OfferCheckout({token,requiresIdentity}:{token:string,requiresIdentity:boolean}){
 const [error,setError]=useState(''); const [busy,setBusy]=useState(false)
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError('');const f=new FormData(e.currentTarget);const r=await fetch(`/api/offers/${token}/checkout`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:String(f.get('email')||''),mobile:String(f.get('mobile')||'')})});const j=await r.json();if(r.ok&&j.paymentUrl){window.location.href=j.paymentUrl;return}setError(j.error||'Unable to open payment');setBusy(false)}
 return <form onSubmit={submit}>{requiresIdentity&&<><label>Email<input name="email" type="email" required/></label><label>Mobile<input name="mobile" inputMode="tel" required/></label><p className="muted">For recipient-bound offers, these details must match the enquiry for which the offer was created.</p></>}{error&&<div className="danger-note">{error}</div>}<button className="btn primary" disabled={busy}>{busy?'Opening Razorpay…':'Pay securely with Razorpay'}</button></form>
}
