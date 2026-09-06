import type { CollectionConfig } from "payload";
import { enforcePublisherOnPublish } from "../cms/publishing";
import {
  contentEditors,
  hasRole,
  internalOnly,
  platformAdmins,
  publishedOrInternal,
  publishers,
} from "../cms/access";
const platformAdminField = ({ req }: any) => hasRole(req.user, ["platform_admin"]);
import { rebuildCourseProjectionFromCMS } from "../cms/publishCourse";

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    group: "Learning Content",
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "category",
      "deliveryMode",
      "_status",
      "updatedAt",
    ],
    description:
      "Internal course catalog and authoring metadata. Use Modules, Lessons and Exams for granular content.",
  },
  access: {
    admin: internalOnly,
    create: contentEditors,
    read: publishedOrInternal,
    update: contentEditors,
    delete: publishers,
  },
  versions: {
    drafts: { autosave: { interval: 8000 }, schedulePublish: true },
    maxPerDoc: 30,
  },
  hooks: {
    beforeChange: [enforcePublisherOnPublish],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (
          doc?._status === "published" &&
          req.context?.seedInternal !== true
        ) {
          await rebuildCourseProjectionFromCMS(req.payload, String(doc.id));
        }
        return doc;
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "shortDescription", type: "textarea", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        "Artificial Intelligence",
        "Full-Stack Development",
        "Space Tech",
        "Data Analytics",
        "Cybersecurity",
        "Entrepreneurship",
        "Programming",
        "Soft Skills",
      ],
    },
    {
      name: "contentType",
      label: "Content Type",
      type: "select",
      required: true,
      defaultValue: "FULL_ONLINE_VIDEOS",
      access: { update: platformAdminField },
      admin: {
        description:
          "Protected setting. Content Admins propose changes through Course Change Requests.",
      },
      options: [
        { label: "Full Online Videos", value: "FULL_ONLINE_VIDEOS" },
        { label: "Hybrid - Offline + Online", value: "HYBRID_OFFLINE_ONLINE" },
        { label: "Full Offline", value: "FULL_OFFLINE" },
      ],
    },
    {
      name: "deliveryMode",
      type: "select",
      required: true,
      access: { update: platformAdminField },
      admin: {
        description:
          "Protected setting. Content Admins propose changes through Course Change Requests.",
      },
      options: [
        { label: "Self-paced Video", value: "SELF_PACED" },
        { label: "Live Online", value: "LIVE_ONLINE" },
        { label: "Offline / Classroom", value: "OFFLINE" },
        { label: "Hybrid", value: "HYBRID" },
        { label: "Cohort / Project", value: "COHORT" },
      ],
    },
    {
      name: "pricingCategory",
      label: "Course Pricing Category",
      type: "select",
      required: true,
      defaultValue: "PRICING",
      access: { update: platformAdminField },
      options: [
        { label: "Free", value: "FREE" },
        { label: "Freemium", value: "FREEMIUM" },
        { label: "Pricing", value: "PRICING" },
      ],
    },
    {
      name: "accessType",
      type: "select",
      required: true,
      defaultValue: "PAID",
      access: { update: platformAdminField },
      admin: {
        description:
          "Protected setting. Content Admins propose changes through Course Change Requests.",
      },
      options: [
        { label: "Free", value: "FREE" },
        { label: "Paid", value: "PAID" },
        { label: "Private / Invite Only", value: "PRIVATE" },
        { label: "Organization Only", value: "ORGANIZATION_ONLY" },
      ],
    },
    {
      name: "listPricePaise",
      label: "List Price (paise)",
      type: "number",
      min: 0,
      access: { update: platformAdminField },
      admin: {
        condition: (_, siblingData) =>
          ["PRICING", "FREEMIUM"].includes(siblingData?.pricingCategory),
        description:
          "Protected. Submit a Course Change Request for Platform Admin approval.",
      },
    },
    {
      name: "salePricePaise",
      label: "Current / Offer Price (paise)",
      type: "number",
      min: 0,
      access: { update: platformAdminField },
      admin: {
        condition: (_, siblingData) =>
          ["PRICING", "FREEMIUM"].includes(siblingData?.pricingCategory),
        description:
          "Protected. Submit a Course Change Request for Platform Admin approval.",
      },
    },
    {
      name: "pricePaise",
      label: "Effective Price (legacy/payment compatibility)",
      type: "number",
      min: 0,
      access: { update: platformAdminField },
      admin: {
        condition: (_, siblingData) =>
          ["PRICING", "FREEMIUM"].includes(siblingData?.pricingCategory),
        description: "Protected. Derived at publish time.",
      },
    },
    {
      name: "freePreviewLessonCount",
      label: "Freemium Preview Lesson Count",
      type: "number",
      min: 0,
      defaultValue: 0,
      access: { update: platformAdminField },
      admin: {
        condition: (_, siblingData) =>
          siblingData?.pricingCategory === "FREEMIUM",
        description:
          "Protected. Submit a Course Change Request for Platform Admin approval.",
      },
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "INR",
      access: { update: platformAdminField },
    },
    {
      name: "level",
      type: "select",
      required: true,
      options: [
        "Foundation",
        "Beginner",
        "Intermediate",
        "Advanced",
        "Executive",
        "Multi-level",
      ],
    },
    { name: "durationText", type: "text" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "brochure", type: "upload", relationTo: "media" },
    {
      name: "brochurePublicPath",
      type: "text",
      admin: {
        description:
          "Optional static brochure path, e.g. /brochures/ai-engineering.pdf",
      },
    },
    {
      name: "faculty",
      type: "relationship",
      relationTo: "faculty",
      hasMany: true,
    },
    {
      name: "outcomes",
      type: "array",
      minRows: 1,
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "audience",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "prerequisites",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "tools",
      type: "array",
      fields: [{ name: "name", type: "text", required: true }],
    },
    {
      name: "programJourney",
      type: "array",
      admin: {
        description:
          "Marketing/program-level journey stages used on premium course pages and brochures.",
      },
      fields: [
        { name: "stage", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "implementationTracks",
      type: "array",
      admin: {
        description:
          "Language or platform tracks supported by the program. Useful for technology-agnostic programs such as FDE.",
      },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "framework", type: "text" },
        { name: "bestFor", type: "textarea" },
      ],
    },
    {
      name: "signatureFramework",
      type: "group",
      fields: [
        { name: "name", type: "text" },
        { name: "tagline", type: "text" },
        {
          name: "steps",
          type: "array",
          fields: [{ name: "label", type: "text", required: true }],
        },
      ],
    },
    {
      name: "ventureBuilder",
      type: "group",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.category === "Entrepreneurship",
        description:
          "Optional venture-building workflow settings for entrepreneurship programs.",
      },
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: false },
        { name: "mentorLed", type: "checkbox", defaultValue: true },
        {
          name: "workflowLabel",
          type: "text",
          defaultValue:
            "Idea → Validate → Model → MVP → Launch → Measure → Scale",
        },
        {
          name: "stageGateApprovalRequired",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "cohortSizeGuidance",
          type: "number",
          admin: {
            description:
              "Optional operational guidance; not a hard enrollment limit.",
          },
        },
        {
          name: "stageArtifacts",
          type: "array",
          fields: [
            { name: "stageKey", type: "text", required: true },
            { name: "artifactName", type: "text", required: true },
          ],
        },
      ],
    },
    { name: "certificateEnabled", type: "checkbox", defaultValue: true },
    {
      name: "completionRules",
      type: "group",
      fields: [
        {
          name: "minLessonCompletionPct",
          type: "number",
          defaultValue: 100,
          min: 0,
          max: 100,
        },
        { name: "requiresPassingExam", type: "checkbox", defaultValue: false },
        {
          name: "minExamPercent",
          type: "number",
          defaultValue: 70,
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
