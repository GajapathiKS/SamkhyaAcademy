import type { CollectionConfig } from 'payload'
import { enforcePublisherOnPublish } from '../cms/publishing'
import { contentEditors, internalOnly, publishedOrInternal, publishers } from '../cms/access'
import { rebuildCourseProjectionFromCMS } from '../cms/publishCourse'

export const Exams: CollectionConfig = {
  slug: 'exams',
  admin: { group: 'Assessments', useAsTitle: 'title', defaultColumns: ['title', 'course', 'passPercent', 'maxAttempts', '_status'] },
  access: { admin: internalOnly, create: contentEditors, read: publishedOrInternal, update: contentEditors, delete: publishers },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeChange: [enforcePublisherOnPublish],
    afterChange: [async ({ doc, req }) => {
      if (doc?._status === 'published') {
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
    { name: 'examType', type: 'select', defaultValue: 'COURSE_FINAL', options: ['PRACTICE', 'MODULE', 'COURSE_FINAL', 'CERTIFICATION'] },
    { name: 'passPercent', type: 'number', defaultValue: 70, min: 0, max: 100 },
    { name: 'timeLimitMin', type: 'number', min: 1 },
    { name: 'maxAttempts', type: 'number', defaultValue: 3, min: 1 },
    { name: 'randomizeQuestions', type: 'checkbox', defaultValue: true },
    { name: 'randomizeOptions', type: 'checkbox', defaultValue: true },
    { name: 'questionCount', type: 'number', admin: { description: 'If set, sample this many questions from the selected pool.' } },
    { name: 'questions', type: 'relationship', relationTo: 'question-bank', hasMany: true, required: true },
    { name: 'showAnswersAfterSubmit', type: 'checkbox', defaultValue: false },
    { name: 'certificateTrigger', type: 'checkbox', defaultValue: false },
  ],
}
