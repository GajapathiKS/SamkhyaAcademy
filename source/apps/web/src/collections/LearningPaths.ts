import type { CollectionConfig } from 'payload'
import { enforcePublisherOnPublish } from '../cms/publishing'
import { contentEditors, internalOnly, publishedOrInternal, publishers } from '../cms/access'

export const LearningPaths: CollectionConfig = {
  slug: 'learning-path-definitions',
  admin: { group: 'Learning Content', useAsTitle: 'title' },
  access: { admin: internalOnly, create: contentEditors, read: publishedOrInternal, update: contentEditors, delete: publishers },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: { beforeChange: [enforcePublisherOnPublish] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea' },
    { name: 'audience', type: 'text' },
    { name: 'items', type: 'array', minRows: 1, fields: [
      { name: 'course', type: 'relationship', relationTo: 'courses', required: true },
      { name: 'required', type: 'checkbox', defaultValue: true },
      { name: 'milestoneLabel', type: 'text' },
    ] },
  ],
}
