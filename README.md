# SamkhyaAcademy

Interactive client UX preview and implementation source.

- Website: https://gajapathiks.github.io/SamkhyaAcademy/
- Client handoff: https://gajapathiks.github.io/SamkhyaAcademy/CLIENT_HANDOFF.html
- All 183 screens: https://gajapathiks.github.io/SamkhyaAcademy/review.html
- Course brochures: https://gajapathiks.github.io/SamkhyaAcademy/pages/158.html

## Repository structure

- `docs/`: reviewed static HTML/CSS/JS, images, screenshots and PDF brochures served by GitHub Pages.
- `source/`: latest monorepo application, transactional schema, services, tests and UX generators. It is not deployed by Pages.
- `tools/export-pages.py`: export a reviewed local UX package, rewrite public URLs and PDF link annotations, and rebuild the brochure ZIP.

GitHub Pages publishes `main /docs`. No server, database or production credentials are deployed. The preview includes simulated media, local browser state and illustrative approvals/certificates; it is not a production learning system. Do not submit confidential data.

## Updating the preview

Generate and verify the UX package with the scripts in `source/scripts/ux-rebuild`. Those generators currently depend on locally prepared reference assets and Poppins files; the committed `docs/` export is immediately usable without running them.

Install Python's `pypdf`, then run `python tools/export-pages.py PATH_TO_REVIEW_EXPORT`. Review `git diff`, verify routes/downloads, and commit and push the changed source/export. Existing localhost service settings in the implementation source are local-development defaults, not the deployed site.

Private environment files, dependencies, build caches and scratch outputs are excluded. Brochure layouts/content remain under client review; full lesson authoring and production integrations remain future work.
