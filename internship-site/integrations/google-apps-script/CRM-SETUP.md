# Google Sheets and Apps Script setup

## What goes where

- **BoundCRM.gs** is self-contained. Paste it as Code.gs in each workbook's Extensions → Apps Script project. It uses `@OnlyCurrentDoc` and only accesses its attached workbook. Do not also install CrmCore.gs/Crm.gs in the same bound project; that would duplicate definitions.
- **IntakeCRM.gs** is the self-contained private reporting engine for the intake project. Its administrative functions end in an underscore and cannot be called by google.script.run. Do not include BoundCRM.gs, Crm.gs, CrmRollout.gs or CrmSamples.gs in a web-app deployment. CrmCore.gs + Crm.gs are development sources only. The adapter uses SPREADSHEET_ID for programme responses and VENTURE_SPREADSHEET_ID for venture responses.
- **CrmRollout.gs** initializes both workbook structures using the already configured programme spreadsheet. It creates the venture spreadsheet only when no ID is configured.
- **CrmSamples.gs** adds clearly labelled synthetic review scenarios by fixed SAMPLE references. It never replaces ordinary staff decisions, and Sample rows are excluded from Live metrics.
- **Code.gs + Form.html + Idea.gs + Idea.html + IntakeCRM.gs + appsscript.json** are the future consent-aware intake package. Code.gs preserves CAPTCHA verification, durable submission budgets, identity limits and payload-bound retries. Use a separate Apps Script deployment/project for venture intake with FORM_KIND=venture, VENTURE_SPREADSHEET_ID and VENTURE_SOURCE_SHEET=Source Responses. Programme intake uses FORM_KIND=program and the existing SPREADSHEET_ID / SOURCE_SHEET=Enquiries.

## Safe upgrade sequence

1. Preserve an authorised private backup and record the existing deployment version. Do not rename/delete the original Enquiries source tab used by the currently deployed version.
2. Review policies and confirm public contact details. New form versions require distinct terms and processing-consent checkboxes. Old records remain legacy records; never invent historical consent.
3. Add headers **Terms version, Privacy version, Accepted UTC, Terms acknowledgement, Processing consent** after the original 15 programme columns. No original column moves. Venture has its own 22-column source schema defined in Idea.gs.
4. Configure private Script Properties: spreadsheet ID(s), SITE_ORIGIN, PROTOTYPE_MODE, CAPTCHA site key, CAPTCHA secret and exact allowed CAPTCHA verification hostnames. Never copy private properties into public assets or the source archive.
5. Install BoundCRM.gs in each workbook. Reopen the spreadsheet to see Academy CRM. Authorize the first manual Refresh CRM from the owner account. Verify simple onEdit tracking with sample records, then use the manual Refresh CRM action. Edits mark the dashboard stale instead of rebuilding charts on every keystroke. Do not install a second onEdit trigger if the simple trigger already records the same changes.
6. Large datasets or shared staff workflows may exceed simple-trigger limits or protected-range permissions. In that case, replace the simple onEdit function with an owner-authorized installed trigger for crmOnEdit, and verify editor identity and protection behaviour. Do not run both handlers. No background trigger is necessary for manual refresh.
7. Build the website with the approved Apps Script /exec URLs. The current local review deliberately remains disconnected. The venture template is ready for a separate endpoint; its local page retains review/download until connection is explicitly configured.
8. Test signed-out submissions for all programme selections and a venture brief. Confirm one source row per reference, separate policies, mobile validation, no false success after failure, retry receipts, correct workbook and New pipeline entry. A reporting failure after a confirmed source save must still return its original receipt.
9. Test staff status/owner/notes edits, then refresh and sort Pipeline. Confirm notes survive and Activity records the reference. Review sample/live filters and all dashboard totals.
10. Keep destructive retention flags absent. Client approval of retention, exports and version-history handling is required before activation. No email automation is included.

## Security boundaries

The public form can submit only through validated Apps Script functions. Never expose spreadsheet contents, CRM JSON, dashboard charts, service keys or administrative actions through doGet or a website endpoint. CRM functions are for editor/bound-workbook use; do not add public HTTP routes for refresh, seeding or deletion. Google Apps Script functions callable by google.script.run should use private trailing-underscore helpers for administrative actions in an intake project (see review notes before deployment).

## Sources

- https://developers.google.com/apps-script/guides/html/communication
- https://developers.google.com/apps-script/guides/triggers
- https://developers.google.com/apps-script/guides/services/authorization
- https://support.google.com/docs/answer/1218656

## Six-program catalogue
The intake and CRM source now recognise AI Engineering Training Internship, Forward Deployment Engineering, Space Technology and Satellite Systems, Machine Learning, Full-Stack Development and Forward Deployment Engineering for Leaders. Source columns retain their original order. Program reporting counts interests separately while overall totals count unique references. The Program workbook dropdown and its bound refresh code were updated privately; the live intake deployment remains unchanged. After approved rollout, test each originating programme link and verify the source programme value and matching CRM reference. Never deploy a new form against unpublished policy URLs.
