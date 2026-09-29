# Verification — 11 September 2026

## Current build

15 canonical content pages, four noindex legacy fallbacks and a 404 (20 built HTML routes). Static directory URLs, sitemap, robots and Apache redirects remain configured. The absent final domain keeps the preview noindex. Private teaching content and private Google handover links are excluded from the public output.

Build, Astro check (52 files; zero errors/warnings/hints), content/link verification (554 targets), and mocked backend tests pass. Backend tests cover server validation, required mobile, consent, honeypot, formula escaping, expired tokens, failed writes, duplicate retries, per-form limits and configuration injection. Configuration injection uses raw template content before HtmlService sanitization; the first deployed version exposed a preview-only state and was corrected in version 2.

## Browser and live Google checks

- Chrome: home, Contact us, FAQs and enquiry checked at 320, 390, 768 and 1440 CSS pixels; no horizontal overflow or broken loaded images observed. Nested form content widths also fit all four widths.
- Shared navy/blue wave cards retain illustrations and alternating desktop placement. Mobile menu icon gap is 12px; enquiry action retains button styling. FAQ sections open by mouse and keyboard.
- Required empty mobile and missing consent each prevent submission and focus the invalid control.
- Signed-out direct-form internship and FDE sample submissions each produced a confirmed reference; every saved field was compared with the private Sheet.
- A separate embedded FDE sample saved and opened the website success dialog. Close receives initial focus, Tab reaches Explore programs, Escape dismisses and restores focus to the persistent receipt.
- Chrome nested-iframe resizing works before/after viewport changes and save: the saved embedded form reduced to 233px in the tested viewport. Direct form uses its own dialog fallback.
- Google Sheets reports “Private to only me.” No read-enquiries function or spreadsheet ID is exposed by the form.
- The in-app browser's direct form successfully saved signed-out samples. Its website embed remained blank during this session, while Chrome's embed worked. The visible direct-form link is retained as fallback; browser-specific embedding should be rechecked on the final domain.

Failed-save and duplicate-retry paths were checked with mocked services, not by deliberately breaking the live Google deployment. Live sample reference details are recorded privately in the integration handover file.

## Launch prerequisites

Verified domain, public email/mobile/WhatsApp, organisation/privacy approval, client-owned enquiry deployment, retention/access arrangements and stronger spam controls are still required. Prototype mode stays enabled; do not accept real client enquiries into the prototype account. No hosted site replacement was performed. Back up the existing site and verify HTTPS, canonical redirects, Apache 301s, clean-URL refreshes and 404 response on GoDaddy before launch.


## Academy-owned invisible CAPTCHA — 11 September 2026

Version 2 deployed to the academy account. Two signed-out samples (internship/FDE) saved without showing a challenge; references and every field matched the private Sheet. Escape dismissed the direct-form success dialog and restored focus to the persistent receipt. No success displayed for the earlier rejected checkbox test.

Production editor-only checks confirmed invalid Siteverify rejection and identity/global boundaries; temporary check functions were removed before deployment. Mocked tests cover provider outage, expiry, wrong host, write failure/retry, durable limits, duplicates and locks. Build, Astro check (zero errors/warnings) and 554-link checks pass.

The submit button is approximately 185 x 44 CSS pixels in sample mode, instead of full width. No overflow in the site or embedded form at 320, 390, 768 and 1440 viewport widths. Visible privacy/terms notice replaces the invisible badge. Real challenge display remains Google's risk decision.

Security verification flag is true. Sample mode remains on pending verified contacts, privacy/retention approval and hosting checks. Earlier prototype-only status above is historical; the website now uses the academy-owned endpoint. Public hosting has not been changed.
