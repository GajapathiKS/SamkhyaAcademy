# Academy-owned custom enquiry form

## Current deployment

Production account resources are created and version 2 is deployed. Private links and test references are in PRODUCTION-HANDOVER.md; never upload handover files to the public site. Both programs passed signed-out real saves using invisible CAPTCHA. Sample mode stays on until public launch sign-off. The original prototype remains separate and receives no new website submissions.

## Editing and deployment

## Editing

Edit `Form.template.html`, then run `node scripts/prepare-enquiry.mjs`. This generates the Apps Script `Form.html` and the disconnected local form at `public/forms/internship-enquiry/index.html`. The regular build runs this preparation automatically.

Use `npm run test:enquiry` for local server-logic checks with mocked Google services. These do not establish that Google deployment or Sheet delivery works.

To update Google, paste the current Code.gs and generated Form.html into their matching Apps Script files, save, and deploy a new version of the existing web app. Local builds do not update Apps Script. The manifest requests Sheets and external requests, with no Gmail scope. Keep the Sheet private. Only doGet and submitEnquiry are public entry points; helpers end in underscores. Temporary setup/audit functions must be removed before deployment.

For a fresh account use a temporary editor-only wrapper around setupProduction_(), run it once and remove it before deployment. Execute the web app as the owner, allowing Anyone to access the form; this does not share the Sheet. Use the /exec URL in site.config.mjs.

## Background spam protection

Use a reCAPTCHA v2 **Invisible reCAPTCHA badge** key, not a checkbox or v3 key. The form validates ordinary inputs first and calls grecaptcha.execute on Send. Google decides whether to challenge; no promise that every legitimate visitor avoids a challenge. The hidden badge is replaced with a visible reCAPTCHA privacy/terms notice. Server Siteverify must succeed for the exact form hostname; Google enforces token expiry and single use. challenge_ts is challenge load time, so do not impose a second 120-second age test on it.

Keep Google domain validation enabled. Register the academy domain and exact deployed Apps Script iframe hostname, never all googleusercontent.com. A new Apps Script project may change the iframe hostname.

Set these private Apps Script properties:
- RECAPTCHA_SITE_KEY: public widget key (injected into form HTML).
- RECAPTCHA_SECRET_KEY: secret verification key; store only here, never in source/config/ZIPs.
- RECAPTCHA_HOSTNAMES: comma-separated exact authorised widget hostnames.
- SITE_ORIGIN: https://samkhyaacademy.com (used for links and the scoped iframe bridge).
- SPREADSHEET_ID: the private client-owned response sheet.
- PROTOTYPE_MODE: keep true during testing; set false only after launch sign-off.

The updated manifest adds script.external_request for Google Siteverify. The owner must authorise this scope. Deploy the matching Code.gs, generated Form.html and manifest as a new version, preserving the web app URL when updating an existing deployment. Missing keys, Google test keys, provider errors, invalid/expired tokens and unexpected hostnames fail closed. The secret and response token are not logged or stored in the response Sheet. CAPTCHA tokens are sent separately from the immutable enquiry payload.

Default limits in LIMITS_:
- Global verification attempts: 10/minute, 100/hour, 500/UTC day.
- New save reservations: 200/UTC day.
- Per normalised email AND per mobile: 3/hour, 6/rolling 24 hours, across page reloads.
- Per form session: 5 attempts; successful receipt retries do not consume additional budget.

Global/identity counters live in Script Properties under a lock, rather than relying on cache persistence. Identity keys use HMAC with a private generated salt. No plaintext email/phone is stored in rate-limit keys. CAPTCHA network calls occur outside the lock. Failed writes conservatively consume reserved budget; the same request reference still prevents duplicate rows. Receipt retries are bound to the form token and validated payload; a changed payload is rejected. Expired cache sessions require a fresh form and CAPTCHA.

These are application-level controls, not an edge firewall. Direct Apps Script traffic can still consume Google execution quotas before application checks run. Monitor the Apps Script Executions and CAPTCHA consoles. Under sustained abuse, disable the deployment temporarily and add an upstream service that can actually protect the origin; putting only the static website behind a CDN does not protect the public Apps Script URL. Do not blindly erase rate counters during an attack.

## Launch and verification

Set PROTOTYPE_MODE=false and customFormPrototype:false only after approved public contacts, privacy/retention and hosting details are ready. Confirm final-domain iframe resize, saved receipt, keyboard dialog, HTTPS and routing. Localhost bridge origins are allowed only in sample mode. Direct form has an in-form dialog fallback. No enquiry field values travel through postMessage.

The 11 September acceptance run verified two signed-out saves without a challenge, matching Sheet rows, Escape dismissal and receipt focus, and compact responsive button/overflow checks. Server boundary checks rejected an invalid provider token and enforced identity/global caps without writing rows. Mocked tests cover invalid/expired/wrong-host tokens, outages, duplicate retries and lock contention. Tests are not a guarantee against all spam or quota exhaustion.

References: https://developers.google.com/recaptcha/docs/invisible and https://developers.google.com/recaptcha/docs/verify and https://developers.google.com/recaptcha/docs/faq
