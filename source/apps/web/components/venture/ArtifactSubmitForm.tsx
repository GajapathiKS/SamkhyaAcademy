'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ArtifactSubmitForm({workspaceId,stageKey,requirements}:{workspaceId:string;stageKey:string;requirements:string[]}){
  const [title,setTitle]=useState(requirements[0]||'Stage Artifact')
  const [artifactType,setArtifactType]=useState(requirements[0]||'DOCUMENT')
  const [notes,setNotes]=useState('')
  const [fileObjectKey,setFileObjectKey]=useState('')
  const [busy,setBusy]=useState(false)
  const [msg,setMsg]=useState('')
  const router=useRouter()
  async function submit(){
    setBusy(true);setMsg('')
    const res=await fetch(`/api/venture/workspaces/${workspaceId}/artifacts`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({stageKey,title,artifactType,fileObjectKey:fileObjectKey||undefined,contentJson:{notes}})})
    const data=await res.json().catch(()=>({}))
    setBusy(false)
    if(!res.ok){setMsg(data.error||'Unable to submit');return}
    setMsg('Artifact submitted successfully.');router.refresh()
  }
  return <div className="venture-panel"><h3 style={{marginTop:0}}>Upload / Submit Stage Artifact</h3><div className="venture-form"><label>Artifact Requirement<select value={artifactType} onChange={e=>{setArtifactType(e.target.value);setTitle(e.target.value)}}>{requirements.map(r=><option key={r}>{r}</option>)}</select></label><label>Title<input value={title} onChange={e=>setTitle(e.target.value)}/></label><label className="full">Storage Object Key / Upload Reference<input value={fileObjectKey} onChange={e=>setFileObjectKey(e.target.value)} placeholder="e.g. ventures/workspace-id/mvp-demo.mp4"/></label><label className="full">Notes<textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="What does this artifact demonstrate?"/></label></div>{msg&&<p className="muted">{msg}</p>}<button onClick={submit} disabled={busy} className="btn primary">{busy?'Submitting…':'Submit Artifact →'}</button></div>
}
