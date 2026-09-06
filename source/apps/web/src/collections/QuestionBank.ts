import type { CollectionConfig } from 'payload'
import { contentEditors, internalOnly, publishers } from '../cms/access'

export const QuestionBank: CollectionConfig = {
  slug: 'question-bank',
  admin: { group: 'Assessments', useAsTitle: 'prompt', defaultColumns: ['prompt', 'course', 'type', 'difficulty', 'active'] },
  access: { admin: internalOnly, create: contentEditors, read: internalOnly, update: contentEditors, delete: publishers },
  fields: [
    { name: 'course', type: 'relationship', relationTo: 'courses', required: true, index: true },
    { name: 'module', type: 'relationship', relationTo: 'course-modules' },
    { name: 'lesson', type: 'relationship', relationTo: 'lessons' },
    { name: 'type', type: 'select', required: true, defaultValue: 'SINGLE_CHOICE', options: ['SINGLE_CHOICE', 'MULTI_SELECT', 'TRUE_FALSE', 'SHORT_TEXT'] },
    { name: 'difficulty', type: 'select', defaultValue: 'MEDIUM', options: ['EASY', 'MEDIUM', 'HARD'] },
    { name: 'prompt', type: 'textarea', required: true },
    { name: 'options', type: 'array', fields: [
      { name: 'key', type: 'text', required: true },
      { name: 'label', type: 'text', required: true },
      { name: 'isCorrect', type: 'checkbox', defaultValue: false },
    ] },
    { name: 'answerText', type: 'text' },
    { name: 'explanation', type: 'textarea' },
    { name: 'points', type: 'number', defaultValue: 1, min: 0 },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text', required: true }] },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
