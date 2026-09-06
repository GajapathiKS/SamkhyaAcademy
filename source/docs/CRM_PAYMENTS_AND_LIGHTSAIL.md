# Mini CRM, private offers, Razorpay and AWS Lightsail

## Mini CRM

The LMS now includes an internal admissions/sales CRM. `PLATFORM_ADMIN` and `SALES_COUNSELLOR` users can access `/platform-admin/crm`.

Pipeline:

`NEW -> CONTACTED -> QUALIFIED -> COUNSELLING -> APPLICATION -> PAYMENT_PENDING -> ENROLLED | LOST`

The CRM stores brochure/webinar/contact/demo leads, follow-up dates, activity history, opportunities, private offers and payments. It is intentionally small and academy-specific rather than a generic Salesforce replacement.

## Private discounted URLs

A counsellor can create an offer against a lead and a published course. The admin submits the regular price and the negotiated price. The system creates:

1. an `Offer` with a cryptographically random private token;
2. a Razorpay Payment Link;
3. a SamkhyaAcademy URL such as `https://academy.example.com/o/<token>`.

The SamkhyaAcademy URL is what should be shared over email/WhatsApp. Recipient-bound offers verify the email/mobile before revealing the Razorpay checkout URL. Offer expiry, maximum redemptions and one-time redemption are enforced server-side.

## Razorpay flow

Admin/counsellor -> `POST /api/admin/offers` -> Razorpay `POST /v1/payment_links` -> private SamkhyaAcademy offer URL.

Razorpay webhook endpoint:

`POST https://academy.example.com/api/razorpay/webhook`

Configure the Razorpay Dashboard webhook secret as `RAZORPAY_WEBHOOK_SECRET` and subscribe to `payment_link.paid`. The handler validates `X-Razorpay-Signature` against the raw request body before processing the event.

On a valid paid event, the LMS records the payment, marks the payment link paid, increments offer redemption, updates the CRM lead, creates/invites the learner account if necessary, and enrolls the learner into the currently published course version.

Use Razorpay Test Mode keys first. Do not put key secrets in browser code.

## AWS Lightsail 4 GB deployment

Target: one 4 GB / 2 vCPU Lightsail Linux instance for the initial production phase.

Docker services:

- Caddy (HTTPS/reverse proxy)
- Next.js + Payload CMS
- PostgreSQL 16
- Redis 7
- FastAPI AI service

Large videos, images and PDFs should use S3/Lightsail Object Storage rather than the VM disk.

### First deployment

1. Create Ubuntu Lightsail 4 GB instance and attach a static IP.
2. Point the academy DNS record to the static IP.
3. Install Docker Engine + Compose plugin and Git.
4. Add a 2 GB swap file to give builds/temporary spikes additional headroom.
5. Clone/copy the repository to `/opt/samkhyaacademy`.
6. Copy `.env.production.example` to `.env.production` and replace every secret.
7. Run Prisma/Payload migrations before starting the web process.
8. `docker compose -f docker-compose.production.yml up -d --build`.
9. Caddy obtains/renews TLS automatically when `APP_DOMAIN` resolves publicly.
10. Configure Razorpay webhook URL.

### Suggested memory envelope on a 4 GB instance

- Web/Payload: up to ~1.4 GB
- PostgreSQL: up to ~1 GB
- FastAPI: ~512 MB
- Redis: ~160 MB
- Caddy + OS + Docker: remaining memory

Do not transcode video or run large AI models on this box.

### Backups

`infra/lightsail/backup-postgres.sh` creates a compressed PostgreSQL backup. Run nightly from cron and copy backups to S3/object storage. Keep Lightsail snapshots too, but do not use snapshots as the only database backup.

## Upgrade path

When 4 GB becomes constrained, create a Lightsail snapshot, launch a larger instance from it, reassign the static IP, verify the services, and retire the old instance. The application remains Dockerized, so no architecture rewrite is required.

The first component to separate at meaningful scale should normally be PostgreSQL, followed by Redis/background workers. Media should already be external.
