import Link from 'next/link'

export function VentureNav({ workspaceId, active }: { workspaceId?: string; active: 'overview'|'workflow'|'artifacts'|'review'|'idea' }) {
  const base = workspaceId ? `/venture-builder/workspaces/${workspaceId}` : '/venture-builder'
  const links = workspaceId ? [
    ['overview', `/venture-builder`, 'Overview'],
    ['workflow', `${base}/workflow`, 'Venture Workflow'],
    ['artifacts', `${base}/artifacts`, 'Artifacts & Library'],
    ['review', `${base}/review`, 'Mentor Review'],
  ] : [
    ['overview', '/entrepreneurship', 'Program Overview'],
    ['idea', '/venture-builder/idea', 'Idea Submission'],
  ]
  return <aside className="venture-side">
    <div style={{fontWeight:850,color:'#1e1b4b',padding:'8px 10px 14px'}}>Entrepreneurship Venture Builder</div>
    {links.map(([key,href,label]) => <Link className={active===key?'active':''} key={href} href={href}>{label}</Link>)}
  </aside>
}
