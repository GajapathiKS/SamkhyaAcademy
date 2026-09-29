# Test release — 12 September 2026

Published generated static files to https://test.samkhyaacademy.com/ only. The previous test site was backed up outside its document root before replacement. The main domain was not modified.

Checks: 40 page requests (content, legacy destinations and review form) returned successfully; all 17 directly referenced asset URLs passed. HTTPS works, legacy internship redirects to its new program route, unknown paths return HTTP 404, and robots/header metadata blocks indexing. Program catalogue checked at 390px without horizontal overflow.

Enquiry and venture submission pages retain honest disconnected review behaviour. This release does not deploy the newer consent-aware Apps Script intake or activate real venture submissions.

Private CRM visual refresh and setup source are separate from public files. No spreadsheet records, private URLs or Apps Script source were uploaded to the website.
