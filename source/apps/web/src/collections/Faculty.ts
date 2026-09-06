import type { CollectionConfig } from 'payload'
import { contentEditors, internalOnly, publishers } from '../cms/access'

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  admin: { group: 'Content', useAsTitle: 'name' },
  access: { admin: internalOnly, create: contentEditors, read: () => true, update: contentEditors, delete: publishers },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'experience', type: 'text' },
    { name: 'bio', type: 'textarea' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'expertise', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
