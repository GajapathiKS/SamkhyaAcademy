-- Align legacy commercial enum labels with the authoritative Functional BRD.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typnamespace = 'lms'::regnamespace AND t.typname = 'CoursePricingCategory' AND e.enumlabel = 'PRICED'
  ) THEN
    ALTER TYPE "lms"."CoursePricingCategory" RENAME VALUE 'PRICED' TO 'PRICING';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typnamespace = 'lms'::regnamespace AND t.typname = 'CourseContentType' AND e.enumlabel = 'HYBRID_OFFLINE_ONLINE_VIDEOS'
  ) THEN
    ALTER TYPE "lms"."CourseContentType" RENAME VALUE 'HYBRID_OFFLINE_ONLINE_VIDEOS' TO 'HYBRID_OFFLINE_ONLINE';
  END IF;
END $$;

-- Retire the standalone SAP Consulting offer while preserving historical versions,
-- enrollments, payments, certificates and audit records.
UPDATE "lms"."Course"
SET "status" = 'ARCHIVED',
    "publishedVersionId" = NULL,
    "publishedAt" = NULL,
    "brochurePath" = NULL,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'sap-enterprise-consulting';

DELETE FROM "lms"."PublishedCourseProjection"
WHERE "courseId" IN (
  SELECT "id" FROM "lms"."Course" WHERE "slug" = 'sap-enterprise-consulting'
);
