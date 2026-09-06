'use client'

import { useState } from 'react'

export default function BrochureGate({ slug, brochure }: { slug: string; brochure: string }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/brochure-leads', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        programSlug: slug,
        name: form.get('name'),
        email: form.get('email'),
        mobile: form.get('mobile'),
        consent: true,
        emailMarketing: form.get('emailMarketing') === 'on',
        whatsappMarketing: form.get('whatsappMarketing') === 'on',
      }),
    })
    setBusy(false)
    if (!response.ok) {
      setError('We could not unlock the brochure. Check your details and try again.')
      return
    }
    window.location.assign(brochure)
  }

  return <>
    <button className="btn" type="button" onClick={() => setOpen(true)}>Download brochure</button>
    {open ? <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <form onSubmit={submit} className="card brochure-modal" role="dialog" aria-modal="true" aria-labelledby="brochure-title">
        <span className="pill">PROGRAM GUIDE</span><h2 id="brochure-title">Get the brochure</h2><p className="muted">Share your details to unlock the current program guide. Marketing choices remain optional.</p>
        <label>Name<input name="name" autoComplete="name" required minLength={2} /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Mobile<input name="mobile" type="tel" autoComplete="tel" required minLength={8} /></label>
        <label className="check-label"><input type="checkbox" name="emailMarketing" /> <span>Email me relevant course updates, webinars and offers.</span></label>
        <label className="check-label"><input type="checkbox" name="whatsappMarketing" /> <span>Send relevant updates and offers on WhatsApp.</span></label>
        <p className="muted consent-note">Your details are processed to deliver this brochure. Optional marketing consent can be withdrawn at any time.</p>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="actions"><button className="btn primary" disabled={busy} type="submit">{busy ? 'Unlocking…' : 'Submit & download'}</button><button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button></div>
      </form>
    </div> : null}
  </>
}
