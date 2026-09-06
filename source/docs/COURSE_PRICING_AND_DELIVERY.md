# Course Pricing & Delivery Model

SamkhyaAcademy treats **commercial model** and **content delivery model** as independent admin-managed dimensions.

## Course Pricing Category

- `FREE` - registration is enough; learner receives full course access.
- `FREEMIUM` - learner can enroll into a preview tier. Lessons marked `isFreePreview=true` (or the configured preview count) are available before upgrade. Razorpay/private offers can upgrade the learner to full access.
- `PRICING` - payment or an authorized private/organization offer is required before full enrollment.

Admin fields:
- List Price
- Current / Sale Price
- Currency
- Freemium Preview Lesson Count
- Access Restriction (`PAID`, `PRIVATE`, `ORGANIZATION_ONLY` retained for invitation / organization rules)

## Content Type

- `FULL_ONLINE_VIDEOS` - fully online/self-paced or scheduled online learning using the LMS.
- `HYBRID_OFFLINE_ONLINE` - offline/live sessions plus online videos, resources, progress, exams and certification.
- `FULL_OFFLINE` - classroom/offline delivery; LMS is used for registration, resources, attendance/progress metadata, exams/certification and operations.

`DeliveryMode` remains as an operational scheduling attribute (self-paced, live online, cohort, offline, hybrid), while `ContentType` is the main customer-facing format category.

## Payment behavior

1. FREE -> create FULL enrollment.
2. FREEMIUM -> create PREVIEW enrollment; selected preview lessons open.
3. PRICING -> enrollment API returns `PAYMENT_REQUIRED`.
4. Razorpay success/private offer redemption -> enrollment gets `FULL` access tier.

## Seeded examples

- C / C++ / JavaScript foundations: FREE + Full Online Videos
- Full-Stack: FREEMIUM + Hybrid
- Applied ML Engineer: FREEMIUM + Hybrid
- Data Analytics: FREEMIUM + Full Online Videos
- AI FDE Engineering: PRICING + Hybrid
- AI FDE Leadership: PRICING + Hybrid
- Entrepreneurship Venture Builder: PRICING + Hybrid
- Space Tech: PRICING + Hybrid
- Cybersecurity: PRICING + Full Online Videos

The former standalone SAP consulting offer is archived and excluded from public discovery. SAP remains only as one enterprise-system integration example inside the FDE curriculum.

All seeded prices are demonstration defaults and are editable from Payload Content Studio.
