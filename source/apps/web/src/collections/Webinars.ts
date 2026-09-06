import type { CollectionConfig } from 'payload'
import { enforcePublisherOnPublish } from '../cms/publishing'
import { contentEditors, internalOnly, publishedOrInternal, publishers, isInternal } from '../cms/access'

export const Webinars: CollectionConfig = {
  slug: 'webinars',
  admin: { group: 'Marketing', useAsTitle: 'title', defaultColumns: ['title', 'startsAt', 'format', '_status'] },
  access: { admin: internalOnly, create: contentEditors, read: publishedOrInternal, update: contentEditors, delete: publishers },
  versions: { drafts: true, maxPerDoc: 15 },
  hooks: { beforeChange: [enforcePublisherOnPublish] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'startsAt', type: 'date', required: true },
    { name: 'durationMin', type: 'number', required: true, defaultValue: 60 },
    { name: 'format', type: 'select', required: true, defaultValue: 'ONLINE', options: ['ONLINE', 'OFFLINE', 'HYBRID'] },
    { name: 'location', type: 'text' },
    { name: 'meetingUrl', type: 'text', access: { read: ({ req }) => isInternal(req.user) } },
    { name: 'capacity', type: 'number' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'speakers', type: 'relationship', relationTo: 'faculty', hasMany: true },
    { name: 'relatedCourses', type: 'relationship', relationTo: 'courses', hasMany: true },
  ],
}
