import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { CmsUsers } from './src/collections/CmsUsers'
import { Media } from './src/collections/Media'
import { Faculty } from './src/collections/Faculty'
import { Courses } from './src/collections/Courses'
import { CourseModules } from './src/collections/CourseModules'
import { Lessons } from './src/collections/Lessons'
import { QuestionBank } from './src/collections/QuestionBank'
import { Exams } from './src/collections/Exams'
import { LearningPaths } from './src/collections/LearningPaths'
import { Blogs } from './src/collections/Blogs'
import { Webinars } from './src/collections/Webinars'
import { Pages } from './src/collections/Pages'
import { CourseChangeRequests } from './src/collections/CourseChangeRequests'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'development-only-change-me',
  serverURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  editor: lexicalEditor({}),
  admin: {
    user: 'cms-users',
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: ' • SamkhyaAcademy Content Studio',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
    },
  },
  routes: {
    admin: '/content-studio',
    api: '/cms-api',
    graphQL: '/cms-graphql',
    graphQLPlayground: '/cms-graphql-playground',
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.PAYLOAD_DATABASE_URL || process.env.DATABASE_URL },
    schemaName: process.env.PAYLOAD_SCHEMA || 'cms',
    idType: 'uuid',
  }),
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: {
        media: {
          prefix: 'media',
          signedDownloads: {
            shouldUseSignedURL: ({ filename }) => /\.(mp4|mov|m4v|pdf)$/i.test(filename),
          },
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY ? {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_KEY,
        } : undefined,
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: Boolean(process.env.S3_ENDPOINT),
      },
    }),
  ],
  collections: [
    CmsUsers,
    Media,
    Faculty,
    Courses,
    CourseChangeRequests,
    CourseModules,
    Lessons,
    QuestionBank,
    Exams,
    LearningPaths,
    Blogs,
    Webinars,
    Pages,
  ],
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  cors: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'],
})
