# Search and sharing handover

Use Google Search Console for indexing and search performance. Looker Studio is optional reporting; it does not submit a site to Google. The Excel handover contains the page-by-page URLs, titles, descriptions and sharing images.

1. Obtain website approval and verified contacts/policy details. Keep staging/local builds noindex. Do not change DNS or upload before approval.
2. Set the approved canonical domain in site.config.mjs, disable localReview for the production build, configure approved enquiry endpoints and run build, verify, test:seo and launch:check.
3. Confirm production HTTPS, one canonical hostname, redirects, clean directory URLs and real 404 status. Upload only generated public files. Never upload CRM exports, source packages or private handover files.
4. In Search Console add a Domain property for samkhyaacademy.com. The authorized DNS owner adds Google's exact TXT verification value. Keep that record. Verification alone does not launch or index the site.
5. After approved launch submit https://samkhyaacademy.com/sitemap.xml. Inspect the homepage and each program overview using URL Inspection, test the live URL and request indexing where available. Do not request indexing of staging, legacy fallback URLs or 404 pages.
6. Review Page Indexing, Sitemaps and HTTPS reports. Confirm Google can fetch CSS, images and canonical pages. Review Search Console performance over time; indexing and rankings are Google's decisions.
7. Use PageSpeed Insights on mobile and desktop and Google's Rich Results Test where applicable. JSON-LD describes the organization, pages, breadcrumbs and courses without invented reviews, offers or credentials; rich-result eligibility is not promised.
8. Share each public canonical page to WhatsApp and other target platforms. The primary Open Graph image is JPEG for broad compatibility; a WebP copy is available for optimized reuse. Preview crawlers must be able to fetch the public page and image. Platforms cache previews; re-test after cache refresh.
9. Maintain one owner and a review date per row in the workbook. Revise metadata when approved course content changes. No analytics/cookie tracking has been silently added.

Official references:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://search.google.com/search-console/about
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://ogp.me/

## Content refresh checkpoint — 12 September
Review CONTENT-AND-SEO-REVIEW.md alongside the refreshed 35-page workbook. Confirm the expanded module counts and distinguish the engineering FDE course from executive learning. Breadcrumb identity now follows each named course; the catalogue has a six-course ItemList. Do not add invented prices, ratings, events or course dates to structured data. Use Google’s Rich Results Test after the approved public build is available; valid markup does not guarantee a search feature.
