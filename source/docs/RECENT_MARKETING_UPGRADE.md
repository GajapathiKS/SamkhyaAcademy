# Recent upgrade — customer acquisition layer

This build extends the existing Payload LMS + Mini CRM + Razorpay implementation with a complete first-pass acquisition communications layer.

## Added database entities

- CommunicationConsent
- MarketingTemplate
- MarketingCampaign
- CampaignRecipient
- CommunicationSuppression

## Added flows

### Brochure / webinar lead
`Form → Lead → CRM activity → optional EMAIL consent → optional WHATSAPP consent`

### Campaign
`Segment → Template → Campaign → consent filtering → suppression filtering → SES/WhatsApp provider → delivery record → CRM activity`

### One-to-one follow-up
Counsellors can send an email or approved WhatsApp template from the lead page when that lead has opted in.

### Opt out
Email contains a signed unsubscribe URL. An opt-out creates a suppression record and updates the matching lead consent.

### Local mode
`COMMUNICATIONS_MODE=console` prevents external sends while exercising the complete CRM flow.

### Production mode
`COMMUNICATIONS_MODE=live` enables Amazon SES and Meta WhatsApp Cloud API when provider credentials are configured.
