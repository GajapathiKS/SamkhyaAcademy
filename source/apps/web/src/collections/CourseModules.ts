import type { CollectionConfig } from 'payload'
import { enforcePublisherOnPublish } from '../cms/publishing'
import { contentEditors, internalOnly, publishedOrInternal, publishers } from '../cms/access'
import { rebuildCourseProjectionFromCMS } from '../cms/publishCourse'

export const CourseModules: CollectionConfig = {
  slug: 'course-modules',
  admin: { group: 'Learning Content', useAsTitle: 'title', defaultColumns: ['title', 'course', 'position', '_status'] },
  access: { admin: internalOnly, create: contentEditors, read: publishedOrInternal, update: contentEditors, delete: publishers },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeChange: [enforcePublisherOnPublish],
    afterChange: [async ({ doc, req }) => {
      if (doc?._status === 'published' && req.context?.seedInternal !== true) {
        const courseId = typeof doc.course === 'object' ? doc.course.id : doc.course
        if (courseId) await rebuildCourseProjectionFromCMS(req.payload, String(courseId))
      }
      return doc
    }],
  },
  fields: [
    { name: 'course', type: 'relationship', relationTo: 'courses', required: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'position', type: 'number', required: true, min: 1 },
    { name: 'estimatedMinutes', type: 'number', min: 0 },
    { name: 'learningObjective', type: 'textarea' },
  ],
}
