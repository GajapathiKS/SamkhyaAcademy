import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    callout: ({ node }: any) => <aside className={`blog-callout ${node.fields.tone || 'info'}`}><strong>{node.fields.heading}</strong><p>{node.fields.body}</p></aside>,
    ctaSection: ({ node }: any) => <section className="blog-cta"><span className="pill">{node.fields.eyebrow}</span><h3>{node.fields.heading}</h3><p>{node.fields.body}</p><Link className="btn primary" href={node.fields.href}>{node.fields.buttonLabel}</Link></section>,
    code: ({ node }: any) => <figure><pre className="code-block"><code>{node.fields.code}</code></pre>{node.fields.caption && <figcaption>{node.fields.caption}</figcaption>}</figure>,
    coursePromo: ({ node }: any) => {
      const c = node.fields.course
      if (!c || typeof c !== 'object') return null
      return <div className="card"><span className="pill">RELATED PROGRAM</span><h3>{node.fields.headline || c.title}</h3><p className="muted">{c.shortDescription}</p><Link href={`/courses/${c.slug}`} className="btn">{node.fields.ctaLabel || 'Explore program'}</Link></div>
    },
    webinarPromo: ({ node }: any) => {
      const w = node.fields.webinar
      if (!w || typeof w !== 'object') return null
      return <div className="card"><span className="pill">WEBINAR</span><h3>{node.fields.headline || w.title}</h3><p className="muted">{w.summary}</p></div>
    },
    imageGallery: ({ node }: any) => <div className="blog-gallery">{(node.fields.items || []).map((item:any, i:number) => item.image && typeof item.image === 'object' ? <figure key={i}><img src={item.image.url} alt={item.image.alt || ''}/>{item.caption && <figcaption>{item.caption}</figcaption>}</figure> : null)}</div>,
    faq: ({ node }: any) => <div className="faq-list">{(node.fields.items || []).map((item:any, i:number) => <details key={i}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>,
  },
})

export function BlogRichText({ data }: { data: SerializedEditorState }) {
  return <div className="blog-rich"><RichText data={data} converters={converters}/></div>
}
