import type { CollectionConfig } from 'payload'
import { enforcePublisherOnPublish } from '../cms/publishing'
import { contentEditors, internalOnly, publishedOrInternal, publishers } from '../cms/access'
import { CTASectionBlock, ImageGalleryBlock, FAQBlock, CoursePromoBlock, WebinarPromoBlock } from '../blocks/contentBlocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { group: 'Marketing', useAsTitle: 'title' },
  access: { admin: internalOnly, create: contentEditors, read: publishedOrInternal, update: contentEditors, delete: publishers },
  versions: { drafts: { autosave: true, schedulePublish: true }, maxPerDoc: 30 },
  hooks: { beforeChange: [enforcePublisherOnPublish] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'pageType', type: 'select', defaultValue: 'LANDING', options: ['LANDING', 'CAMPAIGN', 'ABOUT', 'POLICY'] },
    { name: 'blocks', type: 'blocks', blocks: [CTASectionBlock, ImageGalleryBlock, FAQBlock, CoursePromoBlock, WebinarPromoBlock] },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
}
