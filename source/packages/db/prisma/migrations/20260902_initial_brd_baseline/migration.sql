-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "lms";

-- CreateEnum
CREATE TYPE "lms"."UserStatus" AS ENUM ('INVITED', 'ACTIVE', 'SUSPENDED', 'DISABLED');

-- CreateEnum
CREATE TYPE "lms"."PlatformRole" AS ENUM ('PLATFORM_ADMIN', 'CONTENT_ADMIN', 'SALES_COUNSELLOR', 'VENTURE_MENTOR', 'SUPPORT');

-- CreateEnum
CREATE TYPE "lms"."OrgRole" AS ENUM ('ORG_OWNER', 'ORG_ADMIN', 'MANAGER', 'LEARNER');

-- CreateEnum
CREATE TYPE "lms"."CourseStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "lms"."EnrollmentStatus" AS ENUM ('INVITED', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "lms"."LessonType" AS ENUM ('VIDEO', 'ARTICLE', 'LIVE_SESSION', 'QUIZ', 'ASSIGNMENT', 'LAB', 'DOWNLOAD');

-- CreateEnum
CREATE TYPE "lms"."ExamStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "lms"."AttemptStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'PASSED', 'FAILED');

-- CreateEnum
CREATE TYPE "lms"."LeadType" AS ENUM ('BROCHURE', 'WEBINAR', 'CONTACT', 'DEMO');

-- CreateEnum
CREATE TYPE "lms"."CrmLeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'COUNSELLING', 'APPLICATION', 'PAYMENT_PENDING', 'ENROLLED', 'LOST');

-- CreateEnum
CREATE TYPE "lms"."CrmActivityType" AS ENUM ('NOTE', 'CALL', 'EMAIL', 'WHATSAPP', 'MEETING', 'WEBINAR', 'BROCHURE', 'OFFER_SENT', 'PAYMENT', 'ENROLLMENT');

-- CreateEnum
CREATE TYPE "lms"."OpportunityStage" AS ENUM ('NEW', 'DISCOVERY', 'DEMO', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "lms"."DiscountType" AS ENUM ('PERCENT', 'FIXED', 'CUSTOM_PRICE');

-- CreateEnum
CREATE TYPE "lms"."OfferStatus" AS ENUM ('DRAFT', 'ACTIVE', 'REDEEMED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "lms"."PaymentStatus" AS ENUM ('CREATED', 'PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "lms"."PaymentProvider" AS ENUM ('RAZORPAY');

-- CreateEnum
CREATE TYPE "lms"."CommunicationChannel" AS ENUM ('EMAIL', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "lms"."ConsentState" AS ENUM ('UNKNOWN', 'OPTED_IN', 'OPTED_OUT');

-- CreateEnum
CREATE TYPE "lms"."MarketingTemplateStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "lms"."CampaignStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'SENDING', 'COMPLETED', 'PAUSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "lms"."DeliveryStatus" AS ENUM ('QUEUED', 'SENT', 'DELIVERED', 'READ', 'FAILED', 'SKIPPED', 'BOUNCED', 'OPTED_OUT');

-- CreateEnum
CREATE TYPE "lms"."VentureWorkspaceStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "lms"."VentureStageStatus" AS ENUM ('LOCKED', 'NOT_STARTED', 'IN_PROGRESS', 'MENTOR_REVIEW', 'CHANGES_REQUESTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "lms"."VentureArtifactStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "lms"."MentorReviewDecision" AS ENUM ('APPROVED', 'CHANGES_REQUESTED', 'COMMENT_ONLY');

-- CreateEnum
CREATE TYPE "lms"."DeliveryMode" AS ENUM ('SELF_PACED', 'LIVE_ONLINE', 'OFFLINE', 'HYBRID', 'COHORT');

-- CreateEnum
CREATE TYPE "lms"."CourseAccessType" AS ENUM ('FREE', 'PAID', 'PRIVATE', 'ORGANIZATION_ONLY');

-- CreateEnum
CREATE TYPE "lms"."CoursePricingCategory" AS ENUM ('FREE', 'FREEMIUM', 'PRICING');

-- CreateEnum
CREATE TYPE "lms"."CourseContentType" AS ENUM ('FULL_ONLINE_VIDEOS', 'HYBRID_OFFLINE_ONLINE', 'FULL_OFFLINE');

-- CreateEnum
CREATE TYPE "lms"."EnrollmentAccessTier" AS ENUM ('PREVIEW', 'FULL');

-- CreateEnum
CREATE TYPE "lms"."VentureIdeaStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'SHORTLISTED', 'REJECTED', 'CONVERTED_TO_WORKSPACE');

-- CreateEnum
CREATE TYPE "lms"."CertificateStatus" AS ENUM ('ISSUED', 'REVOKED');

-- CreateEnum
CREATE TYPE "lms"."OutboxStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "lms"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT,
    "passwordHash" TEXT,
    "status" "lms"."UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "platformRole" "lms"."PlatformRole",
    "avatarUrl" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "logoUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."OrganizationMembership" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "lms"."OrgRole" NOT NULL,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Course" (
    "id" TEXT NOT NULL,
    "cmsCourseId" TEXT,
    "cmsRevision" TEXT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "deliveryMode" "lms"."DeliveryMode" NOT NULL,
    "accessType" "lms"."CourseAccessType" NOT NULL DEFAULT 'PAID',
    "pricingCategory" "lms"."CoursePricingCategory" NOT NULL DEFAULT 'PRICING',
    "contentType" "lms"."CourseContentType" NOT NULL DEFAULT 'FULL_ONLINE_VIDEOS',
    "listPricePaise" INTEGER,
    "salePricePaise" INTEGER,
    "pricePaise" INTEGER,
    "freePreviewLessonCount" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "level" TEXT NOT NULL,
    "brochurePath" TEXT,
    "coverImage" TEXT,
    "status" "lms"."CourseStatus" NOT NULL DEFAULT 'DRAFT',
    "currentDraftVersionId" TEXT,
    "publishedVersionId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."CourseVersion" (
    "id" TEXT NOT NULL,
    "cmsVersionKey" TEXT,
    "courseId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "outcomes" JSONB NOT NULL,
    "audience" JSONB NOT NULL,
    "tools" JSONB NOT NULL,
    "status" "lms"."CourseStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "CourseVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."CourseModule" (
    "id" TEXT NOT NULL,
    "cmsModuleId" TEXT,
    "courseVersionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Lesson" (
    "id" TEXT NOT NULL,
    "cmsLessonId" TEXT,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "lms"."LessonType" NOT NULL,
    "position" INTEGER NOT NULL,
    "durationSec" INTEGER NOT NULL DEFAULT 0,
    "contentJson" JSONB NOT NULL,
    "videoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "isFreePreview" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."PublishedCourseProjection" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "projection" JSONB NOT NULL,
    "checksum" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublishedCourseProjection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "organizationId" TEXT,
    "versionId" TEXT,
    "status" "lms"."EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "progressPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "accessTier" "lms"."EnrollmentAccessTier" NOT NULL DEFAULT 'FULL',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."LessonProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "progressPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastPositionSec" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Exam" (
    "id" TEXT NOT NULL,
    "cmsExamId" TEXT,
    "courseVersionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "passPercent" DOUBLE PRECISION NOT NULL DEFAULT 70,
    "timeLimitMin" INTEGER,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "randomize" BOOLEAN NOT NULL DEFAULT true,
    "status" "lms"."ExamStatus" NOT NULL DEFAULT 'PUBLISHED',

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."ExamQuestion" (
    "id" TEXT NOT NULL,
    "cmsQuestionId" TEXT,
    "examId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "options" JSONB,
    "answerKey" JSONB NOT NULL,
    "explanation" TEXT,
    "points" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "position" INTEGER NOT NULL,

    CONSTRAINT "ExamQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."ExamAttempt" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attemptNo" INTEGER NOT NULL,
    "status" "lms"."AttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "score" DOUBLE PRECISION,
    "percentage" DOUBLE PRECISION,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."ExamAnswer" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "correct" BOOLEAN,
    "score" DOUBLE PRECISION,

    CONSTRAINT "ExamAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Certificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "certificateNo" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "status" "lms"."CertificateStatus" NOT NULL DEFAULT 'ISSUED',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "pdfUrl" TEXT,
    "metadata" JSONB,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."LearningPath" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LearningPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."LearningPathItem" (
    "id" TEXT NOT NULL,
    "learningPathId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LearningPathItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."LessonComment" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."LessonReaction" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,

    CONSTRAINT "LessonReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Lead" (
    "id" TEXT NOT NULL,
    "type" "lms"."LeadType" NOT NULL,
    "status" "lms"."CrmLeadStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "company" TEXT,
    "designation" TEXT,
    "programSlug" TEXT,
    "source" TEXT,
    "assignedToUserId" TEXT,
    "nextFollowUpAt" TIMESTAMP(3),
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."CrmActivity" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "opportunityId" TEXT,
    "actorUserId" TEXT,
    "type" "lms"."CrmActivityType" NOT NULL,
    "subject" TEXT NOT NULL,
    "notes" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CrmActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Opportunity" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "organizationId" TEXT,
    "courseId" TEXT,
    "ownerUserId" TEXT,
    "title" TEXT NOT NULL,
    "stage" "lms"."OpportunityStage" NOT NULL DEFAULT 'NEW',
    "estimatedValuePaise" INTEGER,
    "expectedCloseAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Offer" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "code" TEXT,
    "leadId" TEXT,
    "opportunityId" TEXT,
    "organizationId" TEXT,
    "courseId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "status" "lms"."OfferStatus" NOT NULL DEFAULT 'ACTIVE',
    "discountType" "lms"."DiscountType" NOT NULL,
    "originalAmountPaise" INTEGER NOT NULL,
    "discountValue" INTEGER,
    "finalAmountPaise" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "allowedEmail" TEXT,
    "allowedMobile" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "maxRedemptions" INTEGER NOT NULL DEFAULT 1,
    "redemptionCount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."PaymentLink" (
    "id" TEXT NOT NULL,
    "provider" "lms"."PaymentProvider" NOT NULL DEFAULT 'RAZORPAY',
    "offerId" TEXT,
    "leadId" TEXT,
    "courseId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "providerPaymentLinkId" TEXT,
    "providerReferenceId" TEXT NOT NULL,
    "shortUrl" TEXT,
    "amountPaise" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "lms"."PaymentStatus" NOT NULL DEFAULT 'CREATED',
    "expiresAt" TIMESTAMP(3),
    "providerPayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Payment" (
    "id" TEXT NOT NULL,
    "provider" "lms"."PaymentProvider" NOT NULL DEFAULT 'RAZORPAY',
    "paymentLinkId" TEXT,
    "offerId" TEXT,
    "leadId" TEXT,
    "courseId" TEXT,
    "userId" TEXT,
    "providerPaymentId" TEXT NOT NULL,
    "providerOrderId" TEXT,
    "amountPaise" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "lms"."PaymentStatus" NOT NULL,
    "method" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "providerPayload" JSONB,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."Webinar" (
    "id" TEXT NOT NULL,
    "cmsWebinarId" TEXT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "meetingUrl" TEXT,
    "capacity" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Webinar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureWorkspace" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "organizationId" TEXT,
    "ventureName" TEXT NOT NULL,
    "problemStatement" TEXT,
    "targetCustomer" TEXT,
    "ideaSubmissionId" TEXT,
    "cohortName" TEXT,
    "teamName" TEXT,
    "readinessScore" INTEGER NOT NULL DEFAULT 0,
    "status" "lms"."VentureWorkspaceStatus" NOT NULL DEFAULT 'DRAFT',
    "currentStageKey" TEXT NOT NULL DEFAULT 'IDEA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VentureWorkspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureStageProgress" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "stageKey" TEXT NOT NULL,
    "stageOrder" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" "lms"."VentureStageStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "startedAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "checkpointNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VentureStageProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureArtifact" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "stageKey" TEXT NOT NULL,
    "artifactType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "contentJson" JSONB,
    "fileObjectKey" TEXT,
    "status" "lms"."VentureArtifactStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VentureArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureMentorReview" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "stageProgressId" TEXT,
    "artifactId" TEXT,
    "mentorUserId" TEXT NOT NULL,
    "decision" "lms"."MentorReviewDecision" NOT NULL,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VentureMentorReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureIdeaSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ventureName" TEXT NOT NULL,
    "ideaSummary" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "whyNow" TEXT,
    "businessCategory" TEXT,
    "problemSeverity" TEXT,
    "geographicScope" TEXT,
    "targetCustomer" TEXT NOT NULL,
    "customerSize" TEXT,
    "initialSolution" TEXT NOT NULL,
    "differentiators" TEXT,
    "expectedImpact" TEXT,
    "existingAlternatives" TEXT,
    "founderBackground" TEXT,
    "linkedinUrl" TEXT,
    "pitchObjectKey" TEXT,
    "supportNeeds" JSONB,
    "evaluationSnapshot" JSONB,
    "status" "lms"."VentureIdeaStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VentureIdeaSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureMentorAssignment" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "mentorUserId" TEXT NOT NULL,
    "leadMentor" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "VentureMentorAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureReviewScore" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "criterion" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL DEFAULT 20,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VentureReviewScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."VentureMilestone" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stageKey" TEXT,
    "dueAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VentureMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."AuditLog" (
    "id" TEXT NOT NULL,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "payload" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."OutboxEvent" (
    "id" TEXT NOT NULL,
    "aggregateType" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "lms"."OutboxStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutboxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."CommunicationConsent" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "userId" TEXT,
    "channel" "lms"."CommunicationChannel" NOT NULL,
    "state" "lms"."ConsentState" NOT NULL DEFAULT 'UNKNOWN',
    "source" TEXT NOT NULL,
    "consentText" TEXT,
    "consentedAt" TIMESTAMP(3),
    "optedOutAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunicationConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."MarketingTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "channel" "lms"."CommunicationChannel" NOT NULL,
    "status" "lms"."MarketingTemplateStatus" NOT NULL DEFAULT 'DRAFT',
    "subject" TEXT,
    "bodyText" TEXT NOT NULL,
    "bodyHtml" TEXT,
    "providerTemplateName" TEXT,
    "providerLanguage" TEXT DEFAULT 'en',
    "variables" JSONB,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."MarketingCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" "lms"."CommunicationChannel" NOT NULL,
    "templateId" TEXT NOT NULL,
    "status" "lms"."CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "segment" JSONB NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdByUserId" TEXT NOT NULL,
    "stats" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."CampaignRecipient" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "leadId" TEXT,
    "userId" TEXT,
    "destination" TEXT NOT NULL,
    "status" "lms"."DeliveryStatus" NOT NULL DEFAULT 'QUEUED',
    "providerMessageId" TEXT,
    "renderedSubject" TEXT,
    "renderedBody" TEXT,
    "error" TEXT,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."CommunicationSuppression" (
    "id" TEXT NOT NULL,
    "channel" "lms"."CommunicationChannel" NOT NULL,
    "destination" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunicationSuppression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lms"."UserNotification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "readAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "lms"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "lms"."Organization"("slug");

-- CreateIndex
CREATE INDEX "OrganizationMembership_userId_role_idx" ON "lms"."OrganizationMembership"("userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMembership_organizationId_userId_key" ON "lms"."OrganizationMembership"("organizationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_cmsCourseId_key" ON "lms"."Course"("cmsCourseId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "lms"."Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CourseVersion_courseId_version_key" ON "lms"."CourseVersion"("courseId", "version");

-- CreateIndex
CREATE INDEX "CourseModule_cmsModuleId_idx" ON "lms"."CourseModule"("cmsModuleId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseModule_courseVersionId_position_key" ON "lms"."CourseModule"("courseVersionId", "position");

-- CreateIndex
CREATE INDEX "Lesson_cmsLessonId_idx" ON "lms"."Lesson"("cmsLessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_moduleId_position_key" ON "lms"."Lesson"("moduleId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "PublishedCourseProjection_courseId_key" ON "lms"."PublishedCourseProjection"("courseId");

-- CreateIndex
CREATE INDEX "PublishedCourseProjection_versionId_idx" ON "lms"."PublishedCourseProjection"("versionId");

-- CreateIndex
CREATE INDEX "Enrollment_courseId_status_idx" ON "lms"."Enrollment"("courseId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_courseId_organizationId_key" ON "lms"."Enrollment"("userId", "courseId", "organizationId");

-- CreateIndex
CREATE INDEX "LessonProgress_userId_completed_idx" ON "lms"."LessonProgress"("userId", "completed");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userId_lessonId_key" ON "lms"."LessonProgress"("userId", "lessonId");

-- CreateIndex
CREATE INDEX "Exam_cmsExamId_idx" ON "lms"."Exam"("cmsExamId");

-- CreateIndex
CREATE INDEX "ExamQuestion_cmsQuestionId_idx" ON "lms"."ExamQuestion"("cmsQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamQuestion_examId_position_key" ON "lms"."ExamQuestion"("examId", "position");

-- CreateIndex
CREATE INDEX "ExamAttempt_userId_status_idx" ON "lms"."ExamAttempt"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ExamAttempt_examId_userId_attemptNo_key" ON "lms"."ExamAttempt"("examId", "userId", "attemptNo");

-- CreateIndex
CREATE UNIQUE INDEX "ExamAnswer_attemptId_questionId_key" ON "lms"."ExamAnswer"("attemptId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateNo_key" ON "lms"."Certificate"("certificateNo");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_verificationCode_key" ON "lms"."Certificate"("verificationCode");

-- CreateIndex
CREATE INDEX "Certificate_courseId_idx" ON "lms"."Certificate"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "LearningPath_slug_key" ON "lms"."LearningPath"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LearningPathItem_learningPathId_position_key" ON "lms"."LearningPathItem"("learningPathId", "position");

-- CreateIndex
CREATE INDEX "LessonComment_lessonId_createdAt_idx" ON "lms"."LessonComment"("lessonId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "LessonReaction_lessonId_userId_kind_key" ON "lms"."LessonReaction"("lessonId", "userId", "kind");

-- CreateIndex
CREATE INDEX "Lead_email_createdAt_idx" ON "lms"."Lead"("email", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_status_nextFollowUpAt_idx" ON "lms"."Lead"("status", "nextFollowUpAt");

-- CreateIndex
CREATE INDEX "Lead_assignedToUserId_status_idx" ON "lms"."Lead"("assignedToUserId", "status");

-- CreateIndex
CREATE INDEX "CrmActivity_leadId_occurredAt_idx" ON "lms"."CrmActivity"("leadId", "occurredAt");

-- CreateIndex
CREATE INDEX "CrmActivity_opportunityId_occurredAt_idx" ON "lms"."CrmActivity"("opportunityId", "occurredAt");

-- CreateIndex
CREATE INDEX "Opportunity_stage_expectedCloseAt_idx" ON "lms"."Opportunity"("stage", "expectedCloseAt");

-- CreateIndex
CREATE INDEX "Opportunity_ownerUserId_stage_idx" ON "lms"."Opportunity"("ownerUserId", "stage");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_token_key" ON "lms"."Offer"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_code_key" ON "lms"."Offer"("code");

-- CreateIndex
CREATE INDEX "Offer_courseId_status_idx" ON "lms"."Offer"("courseId", "status");

-- CreateIndex
CREATE INDEX "Offer_leadId_status_idx" ON "lms"."Offer"("leadId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentLink_providerPaymentLinkId_key" ON "lms"."PaymentLink"("providerPaymentLinkId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentLink_providerReferenceId_key" ON "lms"."PaymentLink"("providerReferenceId");

-- CreateIndex
CREATE INDEX "PaymentLink_offerId_status_idx" ON "lms"."PaymentLink"("offerId", "status");

-- CreateIndex
CREATE INDEX "PaymentLink_leadId_status_idx" ON "lms"."PaymentLink"("leadId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_providerPaymentId_key" ON "lms"."Payment"("providerPaymentId");

-- CreateIndex
CREATE INDEX "Payment_leadId_createdAt_idx" ON "lms"."Payment"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_userId_createdAt_idx" ON "lms"."Payment"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Webinar_cmsWebinarId_key" ON "lms"."Webinar"("cmsWebinarId");

-- CreateIndex
CREATE UNIQUE INDEX "Webinar_slug_key" ON "lms"."Webinar"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VentureWorkspace_enrollmentId_key" ON "lms"."VentureWorkspace"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "VentureWorkspace_ideaSubmissionId_key" ON "lms"."VentureWorkspace"("ideaSubmissionId");

-- CreateIndex
CREATE INDEX "VentureWorkspace_userId_status_idx" ON "lms"."VentureWorkspace"("userId", "status");

-- CreateIndex
CREATE INDEX "VentureWorkspace_courseId_status_idx" ON "lms"."VentureWorkspace"("courseId", "status");

-- CreateIndex
CREATE INDEX "VentureStageProgress_workspaceId_stageOrder_idx" ON "lms"."VentureStageProgress"("workspaceId", "stageOrder");

-- CreateIndex
CREATE UNIQUE INDEX "VentureStageProgress_workspaceId_stageKey_key" ON "lms"."VentureStageProgress"("workspaceId", "stageKey");

-- CreateIndex
CREATE INDEX "VentureArtifact_workspaceId_stageKey_idx" ON "lms"."VentureArtifact"("workspaceId", "stageKey");

-- CreateIndex
CREATE INDEX "VentureMentorReview_workspaceId_createdAt_idx" ON "lms"."VentureMentorReview"("workspaceId", "createdAt");

-- CreateIndex
CREATE INDEX "VentureMentorReview_mentorUserId_createdAt_idx" ON "lms"."VentureMentorReview"("mentorUserId", "createdAt");

-- CreateIndex
CREATE INDEX "VentureIdeaSubmission_userId_status_idx" ON "lms"."VentureIdeaSubmission"("userId", "status");

-- CreateIndex
CREATE INDEX "VentureIdeaSubmission_status_submittedAt_idx" ON "lms"."VentureIdeaSubmission"("status", "submittedAt");

-- CreateIndex
CREATE INDEX "VentureMentorAssignment_mentorUserId_active_idx" ON "lms"."VentureMentorAssignment"("mentorUserId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "VentureMentorAssignment_workspaceId_mentorUserId_key" ON "lms"."VentureMentorAssignment"("workspaceId", "mentorUserId");

-- CreateIndex
CREATE UNIQUE INDEX "VentureReviewScore_reviewId_criterion_key" ON "lms"."VentureReviewScore"("reviewId", "criterion");

-- CreateIndex
CREATE INDEX "VentureMilestone_workspaceId_dueAt_idx" ON "lms"."VentureMilestone"("workspaceId", "dueAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "lms"."AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "OutboxEvent_status_availableAt_idx" ON "lms"."OutboxEvent"("status", "availableAt");

-- CreateIndex
CREATE INDEX "CommunicationConsent_channel_state_idx" ON "lms"."CommunicationConsent"("channel", "state");

-- CreateIndex
CREATE UNIQUE INDEX "CommunicationConsent_leadId_channel_key" ON "lms"."CommunicationConsent"("leadId", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "CommunicationConsent_userId_channel_key" ON "lms"."CommunicationConsent"("userId", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingTemplate_key_key" ON "lms"."MarketingTemplate"("key");

-- CreateIndex
CREATE INDEX "MarketingTemplate_channel_status_idx" ON "lms"."MarketingTemplate"("channel", "status");

-- CreateIndex
CREATE INDEX "MarketingCampaign_status_scheduledAt_idx" ON "lms"."MarketingCampaign"("status", "scheduledAt");

-- CreateIndex
CREATE INDEX "MarketingCampaign_channel_createdAt_idx" ON "lms"."MarketingCampaign"("channel", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignRecipient_providerMessageId_key" ON "lms"."CampaignRecipient"("providerMessageId");

-- CreateIndex
CREATE INDEX "CampaignRecipient_campaignId_status_idx" ON "lms"."CampaignRecipient"("campaignId", "status");

-- CreateIndex
CREATE INDEX "CampaignRecipient_leadId_createdAt_idx" ON "lms"."CampaignRecipient"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "CampaignRecipient_userId_createdAt_idx" ON "lms"."CampaignRecipient"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignRecipient_campaignId_destination_key" ON "lms"."CampaignRecipient"("campaignId", "destination");

-- CreateIndex
CREATE INDEX "CommunicationSuppression_channel_createdAt_idx" ON "lms"."CommunicationSuppression"("channel", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CommunicationSuppression_channel_destination_key" ON "lms"."CommunicationSuppression"("channel", "destination");

-- CreateIndex
CREATE INDEX "UserNotification_userId_readAt_createdAt_idx" ON "lms"."UserNotification"("userId", "readAt", "createdAt");

-- AddForeignKey
ALTER TABLE "lms"."OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "lms"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."CourseVersion" ADD CONSTRAINT "CourseVersion_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "lms"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."CourseModule" ADD CONSTRAINT "CourseModule_courseVersionId_fkey" FOREIGN KEY ("courseVersionId") REFERENCES "lms"."CourseVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "lms"."CourseModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."PublishedCourseProjection" ADD CONSTRAINT "PublishedCourseProjection_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "lms"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "lms"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."Enrollment" ADD CONSTRAINT "Enrollment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "lms"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lms"."Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."Exam" ADD CONSTRAINT "Exam_courseVersionId_fkey" FOREIGN KEY ("courseVersionId") REFERENCES "lms"."CourseVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."ExamQuestion" ADD CONSTRAINT "ExamQuestion_examId_fkey" FOREIGN KEY ("examId") REFERENCES "lms"."Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."ExamAttempt" ADD CONSTRAINT "ExamAttempt_examId_fkey" FOREIGN KEY ("examId") REFERENCES "lms"."Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."ExamAttempt" ADD CONSTRAINT "ExamAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."ExamAnswer" ADD CONSTRAINT "ExamAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "lms"."ExamAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LearningPath" ADD CONSTRAINT "LearningPath_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "lms"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LearningPathItem" ADD CONSTRAINT "LearningPathItem_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "lms"."LearningPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LearningPathItem" ADD CONSTRAINT "LearningPathItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "lms"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LessonComment" ADD CONSTRAINT "LessonComment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lms"."Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LessonComment" ADD CONSTRAINT "LessonComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LessonComment" ADD CONSTRAINT "LessonComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "lms"."LessonComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LessonReaction" ADD CONSTRAINT "LessonReaction_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lms"."Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."LessonReaction" ADD CONSTRAINT "LessonReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureWorkspace" ADD CONSTRAINT "VentureWorkspace_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "lms"."Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureWorkspace" ADD CONSTRAINT "VentureWorkspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureWorkspace" ADD CONSTRAINT "VentureWorkspace_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "lms"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureWorkspace" ADD CONSTRAINT "VentureWorkspace_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "lms"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureWorkspace" ADD CONSTRAINT "VentureWorkspace_ideaSubmissionId_fkey" FOREIGN KEY ("ideaSubmissionId") REFERENCES "lms"."VentureIdeaSubmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureStageProgress" ADD CONSTRAINT "VentureStageProgress_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "lms"."VentureWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureArtifact" ADD CONSTRAINT "VentureArtifact_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "lms"."VentureWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureMentorReview" ADD CONSTRAINT "VentureMentorReview_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "lms"."VentureWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureMentorReview" ADD CONSTRAINT "VentureMentorReview_stageProgressId_fkey" FOREIGN KEY ("stageProgressId") REFERENCES "lms"."VentureStageProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureMentorReview" ADD CONSTRAINT "VentureMentorReview_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "lms"."VentureArtifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureMentorReview" ADD CONSTRAINT "VentureMentorReview_mentorUserId_fkey" FOREIGN KEY ("mentorUserId") REFERENCES "lms"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureIdeaSubmission" ADD CONSTRAINT "VentureIdeaSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureMentorAssignment" ADD CONSTRAINT "VentureMentorAssignment_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "lms"."VentureWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureMentorAssignment" ADD CONSTRAINT "VentureMentorAssignment_mentorUserId_fkey" FOREIGN KEY ("mentorUserId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureReviewScore" ADD CONSTRAINT "VentureReviewScore_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "lms"."VentureMentorReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."VentureMilestone" ADD CONSTRAINT "VentureMilestone_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "lms"."VentureWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "lms"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."CommunicationConsent" ADD CONSTRAINT "CommunicationConsent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "lms"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."CommunicationConsent" ADD CONSTRAINT "CommunicationConsent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."MarketingCampaign" ADD CONSTRAINT "MarketingCampaign_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "lms"."MarketingTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."CampaignRecipient" ADD CONSTRAINT "CampaignRecipient_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "lms"."MarketingCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."CampaignRecipient" ADD CONSTRAINT "CampaignRecipient_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "lms"."Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."CampaignRecipient" ADD CONSTRAINT "CampaignRecipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lms"."UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "lms"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
