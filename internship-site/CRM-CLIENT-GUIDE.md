# Academy CRM client guide

The CRM lives in private Google Sheets. It is not part of the public website. Two workbooks separate programme enquiries from venture ideas.

## Daily use

1. Open **Dashboard**. Live mode excludes every Sample or Prototype row.
2. Use **Settings** to select a received-date range, owner, status, programme or advisory stage. Choose Sample only for demonstrations.
3. Choose **Academy CRM → Refresh CRM**. First use requires Google authorization for the script attached to that workbook.
4. In **Pipeline**, edit columns H:S: status, assigned owner, priority, last contact, next action, follow-up date, notes, decision reason, active engagement, advisory stage, milestone and target date. Keep reference and original identity fields intact.
5. Review **Follow-ups** for due/overdue actions and missing owners/next steps. No messages are automatically sent.
6. Use Data → Filter views for a personal view. Sort the entire Pipeline table, never a single column.
7. Record a real last-contact date after a conversation. Updating notes does not reset retention.

“Accepted” venture ideas are suitable for further discussion. Acceptance does not establish a paid engagement, implementation commitment or funding.

## Data and calculations

Source records keep their original submission columns and reference. Program Enquiries retains the original **Enquiries** tab so the currently deployed form keeps working; **Source Responses** is a protected reporting copy. Venture Ideas uses **Source Responses** directly. Reconciliation adds missing references without changing staff decisions. Duplicate contact details are flagged, never automatically merged.

Overall totals count a reference once. **Program Interests** represents multiple selections separately. Programme conversion is Joined / unique non-sample enquiries in the selected received-date cohort. All dashboard filters apply to that cohort. Zero matching enquiries gives 0%, not an error. “Current status” is a distribution, not historical stage conversion.

Received timestamps are UTC. Filters and operational dates use Asia/Kolkata. The dashboard shows when it last refreshed and reconciliation errors. Refresh after new submissions and staff edits; menu/trigger authorization and end-to-end operation must be verified before relying on automation.

**Activity** records status and other management-field edits. Google may not expose the editor's identity; bulk edits may not expose previous values. This is an operational change log, not a tamper-proof audit trail.

## Privacy and retention

Keep sharing restricted to authorised academy staff. Do not publish charts or use Publish to web. Sheet/range protection primarily prevents accidental edits; file permissions control access. Never store passwords, identity documents, sensitive customer records or confidential implementation secrets.

**Review retention** produces a dry-run report. The proposal is 90 elapsed days since last contact, using receipt time when none exists. Active engagements, and records marked Joined or Active engagement, are excluded pending separate terms. Invalid contact dates require manual review. Deletion remains disabled.

Before enabling deletion, the client must approve the policy, define handling for exports/downloads, linked documents, backups and Google version history, and review the candidate references. The prepared deletion routine covers source records (including the original Enquiries tab and reporting copy), Pipeline notes, Activity, Follow-ups, Program Interests and the retention report. It does not claim to erase Google version history or external copies. Do not enable destructive flags merely to test the dashboard.

## Rollout status

Workbooks and dashboards were created in the academy account on 11 September 2026. The review website was published to test.samkhyaacademy.com on 12 September 2026; the main domain and deployed enquiry form version were not replaced. New consent-aware intake code and a separate venture intake form are prepared in the setup package. Connect them only with approved policies, correct CAPTCHA hostnames and verified save tests.

First-use authorization for both spreadsheet-bound CRM scripts is pending the owner. No email reminders or retention deletion have been activated.

Edits mark the dashboard as needing refresh. Use Academy CRM → Refresh CRM after making changes. First use requires the owner to authorize the bound script. Until that approval is complete, the seeded dashboard remains viewable but menu/edit verification is pending.

## Dashboard visual refresh — 12 September 2026

Both private workbooks now use navy/blue KPI cards, contrasting priority/status colours, direct navigation links and four native Google Sheets charts. Editable Pipeline columns are tinted blue; original identity columns use a neutral background. Dashboard Data contains only derived chart counts and stays hidden.

The review view is clearly labelled Sample: 10 program enquiries and 9 venture ideas. Choose Live in Settings and use Refresh CRM for real records. No sample is included in live totals. This styling update preserved existing source and Pipeline values. Workbook-bound code retains the design on future refreshes; first-use menu authorization remains the owner's step.
