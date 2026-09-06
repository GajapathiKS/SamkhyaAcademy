# Mini CRM — WhatsApp & Email Acquisition

## What is implemented

SamkhyaAcademy now has a consent-aware communications layer on top of the mini CRM:

- Email campaigns through Amazon SES
- WhatsApp campaigns through Meta WhatsApp Cloud API
- Approved WhatsApp template names stored in CRM templates
- Email HTML/text templates with `{{name}}`, `{{program}}`, `{{company}}`, `{{offer_url}}` variables
- Audience segmentation by lead status, lead type, program and source
- Draft, scheduled, sending and completed campaign states
- Per-recipient delivery records
- WhatsApp delivered/read/failed webhook updates
- Email unsubscribe links and suppression list
- Channel-specific consent records
- One-to-one CRM follow-up from a lead page
- Scheduled campaign worker endpoint suitable for a Lightsail cron job
- `COMMUNICATIONS_MODE=console` for local development so no real message is sent

## Consent model

Brochure and webinar forms collect separately:

1. Required consent to process the requested action.
2. Optional email marketing consent.
3. Optional WhatsApp marketing consent.

A promotional campaign only selects recipients whose channel consent is `OPTED_IN`. Suppressed destinations are always skipped.

## Local testing

Use:

```env
COMMUNICATIONS_MODE=console
```

Campaign sends will be printed to the Next.js server console and recorded as skipped/test sends. This lets CRM segmentation, templates, campaigns and consent be tested without AWS or Meta credentials.

## Production email: Amazon SES

Configure AWS credentials using the normal AWS credential chain on the Lightsail host and set:

```env
COMMUNICATIONS_MODE=live
AWS_REGION=ap-south-1
SES_FROM_EMAIL=academy@yourdomain.com
```

The sender/domain must be verified in SES. Move the SES account out of sandbox before sending to arbitrary recipients.

## Production WhatsApp

Create a Meta Business app with WhatsApp Cloud API, add a phone number, and configure:

```env
COMMUNICATIONS_MODE=live
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_VERIFY_TOKEN=...
WHATSAPP_GRAPH_VERSION=v23.0
```

Configure the Meta webhook URL:

`https://academy.yourdomain.com/api/whatsapp/webhook`

Business-initiated promotional messages use Meta-approved templates. Store the approved template name in the Marketing Template record.

## Campaign workflow

`Lead → consent → segment → template → campaign → schedule/send → provider → delivery/read status → CRM activity`

Examples:

- AI Engineering brochure downloaded + opted into WhatsApp + not enrolled
- Webinar attendee + email opt-in + status QUALIFIED
- Full Stack leads + PAYMENT_PENDING
- Organization leads from a specific source

## Scheduling on Lightsail

The application exposes:

`POST /api/internal/communications/run-scheduled`

with:

`Authorization: Bearer <CRON_SECRET>`

Example cron entry every 5 minutes:

```cron
*/5 * * * * CRON_SECRET='...' APP_URL='http://127.0.0.1:3000' /opt/samkhyaacademy/infra/lightsail/run-marketing-cron.sh >> /var/log/samkhya-marketing-cron.log 2>&1
```

## Admin route

`/admin/crm/marketing`

From there counsellors/platform admins can create templates, create segmented campaigns, and send them. The CRM lead page supports one-to-one email or WhatsApp follow-up for opted-in leads.

## Production hardening still recommended

Before a large campaign launch:

- Add SES SNS/EventBridge bounce/complaint ingestion.
- Add campaign rate limiting and provider quota awareness.
- Add retry/backoff worker using Redis/BullMQ or a queue.
- Add link tracking via signed redirect URLs.
- Add template approval/status synchronization for Meta WhatsApp.
- Add campaign preview/test-send and two-person approval for large audiences.
