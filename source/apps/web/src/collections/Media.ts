import type { CollectionConfig } from 'payload'
import { contentEditors, internalOnly, publishers } from '../cms/access'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/*', 'application/pdf', 'application/zip', 'application/x-zip-compressed', 'text/plain'],
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 270, position: 'centre' },
      { name: 'card', width: 900, height: 506, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  admin: { group: 'Content', useAsTitle: 'alt' },
  access: {
    admin: internalOnly,
    create: contentEditors,
    read: () => true,
    update: contentEditors,
    delete: publishers,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'textarea' },
    { name: 'assetType', type: 'select', defaultValue: 'general', options: ['general', 'course', 'lesson', 'lab', 'project-package', 'blog', 'webinar', 'faculty', 'brochure'] },
    { name: 'copyrightNote', type: 'text' },
  ],
}
