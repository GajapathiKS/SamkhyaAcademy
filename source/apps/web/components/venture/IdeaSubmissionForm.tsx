'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const initial = {
  ventureName:'', ideaSummary:'', problemStatement:'', whyNow:'', businessCategory:'', problemSeverity:'', geographicScope:'',
  targetCustomer:'', customerSize:'', initialSolution:'', differentiators:'', expectedImpact:'', existingAlternatives:'',
  founderBackground:'', linkedinUrl:'', supportNeeds:['IDEA_VALIDATION','MARKET_RESEARCH'] as string[],
}

export function IdeaSubmissionForm(){
  const [form,setForm]=useState(initial)
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState('')
  const router=useRouter()
  function field(name:string,value:any){setForm(f=>({...f,[name]:value}))}
  function toggleSupport(value:string){setForm(f=>({...f,supportNeeds:f.supportNeeds.includes(value)?f.supportNeeds.filter(x=>x!==value):[...f.supportNeeds,value]}))}
  async function submit(status:'DRAFT'|'SUBMITTED'){
    setBusy(true);setError('')
    const res=await fetch('/api/venture/ideas',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...form,status})})
    const data=await res.json().catch(()=>({}))
    setBusy(false)
    if(!res.ok){setError(data.error||'Unable to save idea');return}
    if(status==='SUBMITTED') router.push(`/venture-builder/idea/submitted?id=${data.id}`)
  }
  return <div className="venture-panel">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,marginBottom:16}}><div><h2 style={{margin:0}}>Step 1 of 6: Define the Problem</h2><p className="muted">Help us understand the problem you are solving and why it matters.</p></div><button disabled={busy} className="btn" onClick={()=>submit('DRAFT')}>Save Draft</button></div>
    <div className="venture-form">
      <label>Venture / Idea Name *<input value={form.ventureName} onChange={e=>field('ventureName',e.target.value)} placeholder="e.g., AgriSense, LearnLoop"/></label>
      <label>One-line Idea Summary *<input value={form.ideaSummary} onChange={e=>field('ideaSummary',e.target.value)} placeholder="10–15 word description"/></label>
      <label>Problem Statement *<textarea value={form.problemStatement} onChange={e=>field('problemStatement',e.target.value)} placeholder="What problem are you solving? Who faces it and how?"/></label>
      <label>Why is this a real problem? (Why now?)<textarea value={form.whyNow} onChange={e=>field('whyNow',e.target.value)} placeholder="Trends, recent changes or urgency"/></label>
      <label>Business Category<input value={form.businessCategory} onChange={e=>field('businessCategory',e.target.value)} placeholder="HealthTech, SaaS, EdTech..."/></label>
      <label>Problem Severity<select value={form.problemSeverity} onChange={e=>field('problemSeverity',e.target.value)}><option value="">Select severity</option><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
      <label>Geographic Scope<input value={form.geographicScope} onChange={e=>field('geographicScope',e.target.value)} placeholder="India / Global / City"/></label>
      <label>Target Customer / User *<input value={form.targetCustomer} onChange={e=>field('targetCustomer',e.target.value)} placeholder="Who is the primary customer?"/></label>
      <label>Customer Size / TAM<input value={form.customerSize} onChange={e=>field('customerSize',e.target.value)} placeholder="Optional market size estimate"/></label>
      <label>Initial Solution Concept *<textarea value={form.initialSolution} onChange={e=>field('initialSolution',e.target.value)} placeholder="How do you plan to solve this problem?"/></label>
      <label>Differentiators<textarea value={form.differentiators} onChange={e=>field('differentiators',e.target.value)} placeholder="What makes your approach better?"/></label>
      <label>Expected Impact<textarea value={form.expectedImpact} onChange={e=>field('expectedImpact',e.target.value)} placeholder="What impact do you expect to create?"/></label>
      <label>Existing Alternatives<textarea value={form.existingAlternatives} onChange={e=>field('existingAlternatives',e.target.value)} placeholder="Current solutions and limitations"/></label>
      <label>Founder / Team Background<textarea value={form.founderBackground} onChange={e=>field('founderBackground',e.target.value)} placeholder="Your role, experience and team strengths"/></label>
      <label>LinkedIn Profile<input value={form.linkedinUrl} onChange={e=>field('linkedinUrl',e.target.value)} placeholder="https://linkedin.com/in/..."/></label>
      <div className="full"><strong>What mentorship or support do you need?</strong><div className="venture-grid-3" style={{marginTop:8}}>{['IDEA_VALIDATION','MARKET_RESEARCH','PRODUCT_DEVELOPMENT','FUNDRAISING','GO_TO_MARKET','BUSINESS_MODEL'].map(v=><label key={v} style={{display:'flex',gridTemplateColumns:'auto 1fr',alignItems:'center',gap:8,fontWeight:500}}><input style={{width:'auto'}} type="checkbox" checked={form.supportNeeds.includes(v)} onChange={()=>toggleSupport(v)}/>{v.replaceAll('_',' ')}</label>)}</div></div>
    </div>
    {error&&<p style={{color:'#dc2626'}}>{error}</p>}
    <div className="actions" style={{justifyContent:'flex-end'}}><button className="btn" disabled={busy} onClick={()=>submit('DRAFT')}>Save Draft</button><button className="btn primary" disabled={busy} onClick={()=>submit('SUBMITTED')}>{busy?'Submitting…':'Submit Idea for Review →'}</button></div>
  </div>
}
