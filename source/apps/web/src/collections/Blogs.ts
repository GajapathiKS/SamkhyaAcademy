import type { CollectionConfig } from 'payload'
import { enforcePublisherOnPublish } from '../cms/publishing'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { articleBlocks } from '../blocks/contentBlocks'
import { contentEditors, internalOnly, publishedOrInternal, publishers } from '../cms/access'

export const Blogs: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', '_status', 'publishedAt'],
    description: 'CMS-managed blog, insight, announcement and thought-leadership content.',
  },
  access: {
    admin: internalOnly,
    create: contentEditors,
    read: publishedOrInternal,
    update: contentEditors,
    delete: publishers,
  },
  versions: { drafts: { autosave: { interval: 8000 }, schedulePublish: true }, maxPerDoc: 40 },
  hooks: { beforeChange: [enforcePublisherOnPublish] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'faculty' },
    { name: 'category', type: 'select', required: true, options: ['AI & Agentic Systems', 'Full-Stack', 'Enterprise Technology', 'Data & Analytics', 'Cybersecurity', 'Space Tech', 'Entrepreneurship', 'Learning & Careers'] },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text', required: true }] },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: articleBlocks })],
      }),
    },
    { name: 'relatedCourses', type: 'relationship', relationTo: 'courses', hasMany: true },
    { name: 'relatedWebinar', type: 'relationship', relationTo: 'webinars' },
    { name: 'publishedAt', type: 'date' },
    { name: 'seo', type: 'group', fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'canonicalUrl', type: 'text' },
      { name: 'ogImage', type: 'upload', relationTo: 'media' },
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
    ] },
  ],
}
