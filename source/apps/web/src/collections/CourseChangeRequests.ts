import type { CollectionConfig } from "payload";
import { contentEditors, hasRole, internalOnly, platformAdmins } from "../cms/access";
const platformAdminField = ({ req }: any) => hasRole(req.user, ["platform_admin"]);

export const CourseChangeRequests: CollectionConfig = {
  slug: "course-change-requests",
  admin: {
    group: "Learning Content",
    useAsTitle: "title",
    defaultColumns: ["title", "course", "status", "requestedBy", "updatedAt"],
    description:
      "Approval queue for protected commercial, access and delivery settings. Draft course content uses normal version review; these settings never apply without Platform Admin approval.",
  },
  access: {
    admin: internalOnly,
    create: contentEditors,
    read: internalOnly,
    update: platformAdmins,
    delete: platformAdmins,
  },
  hooks: {
    beforeChange: [
      ({ data, req, originalDoc }) => {
        const decision = data?.status;
        const requester = originalDoc?.requestedBy ?? data?.requestedBy;
        const requesterId =
          typeof requester === "object" ? requester?.id : requester;
        if (
          ["APPROVED", "REJECTED"].includes(String(decision)) &&
          String(requesterId) === String(req.user?.id)
        ) {
          throw new Error(
            "The employee who requested a protected setting change cannot approve or reject the same request.",
          );
        }
        if (["APPROVED", "REJECTED"].includes(String(decision))) {
          data.reviewedBy = req.user?.id;
          data.reviewedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
    },
    { name: "reason", type: "textarea", required: true },
    {
      name: "proposedSettings",
      type: "json",
      required: true,
      admin: {
        description:
          "Only pricingCategory, accessType, contentType, deliveryMode, currency, preview count and price fields are accepted by the approval service.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "PENDING",
      options: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
      access: { update: platformAdminField },
    },
    {
      name: "requestedBy",
      type: "relationship",
      relationTo: "cms-users",
      required: true,
      access: { update: platformAdminField },
    },
    {
      name: "reviewedBy",
      type: "relationship",
      relationTo: "cms-users",
      access: { update: platformAdminField },
    },
    {
      name: "reviewNote",
      type: "textarea",
      access: { update: platformAdminField },
    },
    { name: "reviewedAt", type: "date", access: { update: platformAdminField } },
  ],
  timestamps: true,
};
