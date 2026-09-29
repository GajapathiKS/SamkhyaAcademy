# Test deployment

Client review address: https://test.samkhyaacademy.com

Run `npm run build:test`. It writes `dist-test`, checks its content, adds noindex headers and HTTPS redirection, and leaves production `dist` unchanged. All test pages have noindex metadata, robots disallows crawling, and the sitemap is empty. Noindex is not password protection: anyone with the URL can view this review site.

Package only the contents of `dist-test`:

```powershell
python scripts/package-test.py
```

The cPanel document root is `/home/x4iltp3bxgpt/test.samkhyaacademy.com`, separate from the existing main hosting website at `public_html`. Upload and extract only the test ZIP here. Do not upload source, private handover files or teaching outlines. The folder contained only the automatically created `cgi-bin` before this deployment.

Deployed 11 September 2026. All 15 content pages return HTTPS 200 responses with staging canonical URLs and noindex metadata/headers. The four legacy URLs and slashless program catalogue redirect correctly; an unknown URL returns 404. HTTP redirects to HTTPS. Compiled files use 0644 and folders 0755 (verified and corrected in cPanel, which preserved earlier directory modes during extraction); the upload archive was moved to recoverable Trash after extraction and is no longer publicly downloadable.

The hosted site was opened in the in-app browser. A signed-out sample FDE enquiry saved into the academy-owned private Sheet, with all field values checked, and opened the parent website success dialog. Escape dismissed it, leaving the receipt, and the iframe reduced to approximately 233px. Private test reference is recorded in the production handover file. Search indexing is disabled; sample-only form mode remains enabled.

GoDaddy automatically added the test A record pointing to 50.62.137.207. AutoSSL validated test.samkhyaacademy.com, with its initial certificate expiring 10 December 2026 and automatic renewal enabled. The main academy domain's parked DNS and the samkhyatec.com website were not changed.

Apps Script SITE_ORIGIN is set to https://test.samkhyaacademy.com for the iframe resize/receipt bridge and direct-form return link. Sample-only mode remains enabled. The CAPTCHA widget hostname and private Sheet remain unchanged.

For Monday's main launch, obtain the remaining contact/privacy approvals, restore Apps Script SITE_ORIGIN to https://samkhyaacademy.com, and switch the form and website out of sample mode. Build with `npm run build` (without SAMKHYA_STAGE), run the launch checks, and deploy to a separate confirmed main-domain root. Do not upload the staging ZIP to the main domain. Main-domain DNS changes and the guest's launch action have not been performed.

Enquiry loading refinement: deployed a responsive shimmer skeleton, reduced-motion support, and a 12-second direct-link fallback. The skeleton is dismissed only after a validated form bridge message. Removed the initial duplicate iframe request. Verified the hosted form becomes visible, aria-busy clears, and the skeleton is hidden after readiness; Astro check reports zero errors/warnings and both builds pass.

Neutral background refresh: page canvas, pale sections, page heroes and footer now use #fcfcfc; form panels remain white. Existing navy program gradients and imagery are preserved.
