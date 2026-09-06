import type { CollectionConfig } from 'payload'
import { enforcePublisherOnPublish } from '../cms/publishing'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { contentEditors, internalOnly, publishedOrInternal, publishers } from '../cms/access'
import { CalloutBlock, CodeBlock } from '../blocks/contentBlocks'
import { rebuildCourseProjectionFromLesson } from '../cms/publishCourse'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: { group: 'Learning Content', useAsTitle: 'title', defaultColumns: ['title', 'module', 'type', 'position', '_status'] },
  access: { admin: internalOnly, create: contentEditors, read: publishedOrInternal, update: contentEditors, delete: publishers },
  versions: { drafts: { autosave: { interval: 6000 } }, maxPerDoc: 30 },
  hooks: {
    beforeChange: [enforcePublisherOnPublish],
    afterChange: [async ({ doc, req }) => {
      if (doc?._status === 'published' && req.context?.seedInternal !== true) await rebuildCourseProjectionFromLesson(req.payload, doc)
      return doc
    }],
  },
  fields: [
    { name: 'module', type: 'relationship', relationTo: 'course-modules', required: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'type', type: 'select', required: true, defaultValue: 'VIDEO', options: ['VIDEO', 'ARTICLE', 'LIVE_SESSION', 'QUIZ', 'ASSIGNMENT', 'LAB', 'DOWNLOAD'] },
    { name: 'position', type: 'number', required: true, min: 1 },
    { name: 'durationSec', type: 'number', defaultValue: 0, min: 0 },
    { name: 'isFreePreview', label: 'Available in Freemium Preview', type: 'checkbox', defaultValue: false, admin: { description: 'When enabled, this lesson can be opened by preview-tier learners before purchase.' } },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'video', type: 'upload', relationTo: 'media', admin: { condition: (_, siblingData) => siblingData?.type === 'VIDEO' } },
    { name: 'externalVideoUrl', type: 'text', admin: { condition: (_, siblingData) => siblingData?.type === 'VIDEO' } },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: [CalloutBlock, CodeBlock] })],
      }),
    },
    {
      name: 'labConfig',
      label: 'Interactive lab / practice configuration',
      type: 'group',
      admin: { condition: (_, siblingData) => ['LAB', 'ASSIGNMENT'].includes(siblingData?.type) },
      fields: [
        { name: 'runtime', type: 'select', defaultValue: 'BROWSER_HTML', options: ['BROWSER_HTML', 'BROWSER_JAVASCRIPT', 'PYTHON_RUNNER', 'NODE_RUNNER', 'JAVA_RUNNER', 'DOTNET_RUNNER'] },
        { name: 'instructions', type: 'textarea', required: true },
        { name: 'starterFiles', type: 'array', minRows: 1, fields: [
          { name: 'path', type: 'text', required: true },
          { name: 'language', type: 'text', required: true },
          { name: 'content', type: 'textarea', required: true },
          { name: 'readOnly', type: 'checkbox', defaultValue: false },
        ] },
        { name: 'hints', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] },
        { name: 'successChecks', type: 'array', minRows: 1, fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'kind', type: 'select', required: true, options: ['DOM_SELECTOR', 'TEXT_PRESENT', 'CONSOLE_OUTPUT', 'UNIT_TEST', 'MANUAL_REVIEW'] },
          { name: 'assertion', type: 'text', required: true },
          { name: 'weight', type: 'number', defaultValue: 1, min: 1 },
        ] },
        { name: 'previewMode', type: 'select', defaultValue: 'SPLIT', options: ['SPLIT', 'EDITOR_ONLY', 'OUTPUT_ONLY'] },
        { name: 'allowDownload', type: 'checkbox', defaultValue: true },
        { name: 'executionPolicy', type: 'textarea', admin: { description: 'Browser labs run in an isolated iframe. Server runtimes must be delegated to a governed runner adapter.' } },
      ],
    },
    {
      name: 'projectConfig',
      label: 'Downloadable project package',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData?.type === 'DOWNLOAD' },
      fields: [
        { name: 'brief', type: 'upload', relationTo: 'media', required: true },
        { name: 'packageZip', type: 'upload', relationTo: 'media', required: true },
        { name: 'previewGif', type: 'upload', relationTo: 'media' },
        { name: 'repositoryUrl', type: 'text' },
        { name: 'fileTree', type: 'textarea', required: true, admin: { description: 'Human-readable project folder architecture included in the learner preview.' } },
        { name: 'setupInstructions', type: 'textarea', required: true },
        { name: 'milestones', type: 'array', minRows: 1, fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'estimatedMinutes', type: 'number', min: 1 },
        ] },
        { name: 'rubric', type: 'array', fields: [
          { name: 'criterion', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'points', type: 'number', required: true, min: 1 },
        ] },
      ],
    },
    { name: 'resources', type: 'array', fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'file', type: 'upload', relationTo: 'media' },
      { name: 'url', type: 'text' },
    ] },
    { name: 'allowComments', type: 'checkbox', defaultValue: true },
    { name: 'allowReactions', type: 'checkbox', defaultValue: true },
    { name: 'completionMode', type: 'select', defaultValue: 'MANUAL_OR_90_PERCENT_VIDEO', options: ['MANUAL', 'MANUAL_OR_90_PERCENT_VIDEO', 'RESOURCE_OPEN', 'EXAM_PASS', 'LAB_COMPLETE', 'PROJECT_SUBMISSION'] },
  ],
}
