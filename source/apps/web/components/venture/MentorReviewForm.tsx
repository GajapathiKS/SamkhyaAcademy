'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

const criteria=['Problem Clarity','Customer Relevance','Solution Approach','Founder Readiness','Scalability Potential']
export function MentorReviewForm({workspaceId,stageKey}:{workspaceId:string;stageKey:string}){
  const [scores,setScores]=useState<Record<string,number>>(()=>Object.fromEntries(criteria.map(c=>[c,14])))
  const [feedback,setFeedback]=useState('')
  const [busy,setBusy]=useState(false)
  const [msg,setMsg]=useState('')
  const router=useRouter()
  const total=useMemo(()=>Object.values(scores).reduce((a,b)=>a+b,0),[scores])
  async function send(decision:'APPROVED'|'CHANGES_REQUESTED'|'COMMENT_ONLY'){
    setBusy(true);setMsg('')
    const res=await fetch(`/api/admin/venture/workspaces/${workspaceId}/stages/${stageKey}/review`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({decision,feedback,scores:criteria.map(c=>({criterion:c,score:scores[c],maxScore:20}))})})
    const data=await res.json().catch(()=>({}))
    setBusy(false)
    if(!res.ok){setMsg(data.error||'Review failed');return}
    setMsg('Review saved.');router.refresh()
  }
  return <div className="venture-panel"><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><h3 style={{margin:0}}>Structured Mentor Review</h3><p className="muted">Score the stage and give actionable feedback.</p></div><div className="venture-score">{total} / 100</div></div><div className="review-score-grid">{criteria.map(c=><label className="review-score-box" key={c}>{c}<input type="number" min={0} max={20} value={scores[c]} onChange={e=>setScores(s=>({...s,[c]:Math.max(0,Math.min(20,Number(e.target.value)||0))}))}/><span className="muted">/ 20</span></label>)}</div><label>Mentor Feedback<textarea value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="What is working? What must change before the next stage?"/></label>{msg&&<p className="muted">{msg}</p>}<div className="mentor-actions"><button disabled={busy} onClick={()=>send('APPROVED')} className="btn success">Approve Stage</button><button disabled={busy} onClick={()=>send('CHANGES_REQUESTED')} className="btn warning">Request Changes</button><button disabled={busy} onClick={()=>send('COMMENT_ONLY')} className="btn">Save Feedback Only</button></div></div>
}
