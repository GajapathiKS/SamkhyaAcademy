import type { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    { name: 'tone', type: 'select', defaultValue: 'info', options: ['info', 'success', 'warning', 'important'] },
    { name: 'heading', type: 'text' },
    { name: 'body', type: 'textarea', required: true },
  ],
}

export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  labels: { singular: 'CTA Section', plural: 'CTA Sections' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'buttonLabel', type: 'text', required: true },
    { name: 'href', type: 'text', required: true },
  ],
}

export const CodeBlock: Block = {
  slug: 'code',
  fields: [
    { name: 'language', type: 'text', defaultValue: 'text' },
    { name: 'code', type: 'code', required: true },
    { name: 'caption', type: 'text' },
  ],
}

export const CoursePromoBlock: Block = {
  slug: 'coursePromo',
  fields: [
    { name: 'course', type: 'relationship', relationTo: 'courses', required: true },
    { name: 'headline', type: 'text' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Explore program' },
  ],
}

export const WebinarPromoBlock: Block = {
  slug: 'webinarPromo',
  fields: [
    { name: 'webinar', type: 'relationship', relationTo: 'webinars', required: true },
    { name: 'headline', type: 'text' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Register for webinar' },
  ],
}

export const ImageGalleryBlock: Block = {
  slug: 'imageGallery',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const articleBlocks = [CalloutBlock, CTASectionBlock, CodeBlock, CoursePromoBlock, WebinarPromoBlock, ImageGalleryBlock, FAQBlock]
