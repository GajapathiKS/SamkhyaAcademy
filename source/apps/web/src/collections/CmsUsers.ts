import type { CollectionConfig } from "payload";
import { hasRole, internalOnly, platformAdmins } from "../cms/access";

export const CmsUsers: CollectionConfig = {
  slug: "cms-users",
  auth: {
    tokenExpiration: 60 * 60 * 8,
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
  },
  admin: {
    group: "System",
    useAsTitle: "name",
    description:
      "Internal SamkhyaAcademy content operators only. Learners and customer organization users never receive CMS access.",
  },
  access: {
    admin: internalOnly,
    create: async ({ req }) => {
      if (hasRole(req.user, ["platform_admin"])) return true;
      // Bootstrap is allowed only for the first CMS account and only when explicitly enabled.
      if (process.env.CMS_ALLOW_BOOTSTRAP !== "true" || req.user) return false;
      const existing = await req.payload.count({
        collection: "cms-users",
        overrideAccess: true,
      });
      return existing.totalDocs === 0;
    },
    read: ({ req }) => hasRole(req.user, ["platform_admin", "content_admin"]),
    update: ({ req, id }) =>
      hasRole(req.user, ["platform_admin"]) ||
      String(req.user?.id) === String(id),
    delete: platformAdmins,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["internal_sme"],
      options: [
        { label: "Platform Admin", value: "platform_admin" },
        {
          label: "Content Admin / Author (No Publish)",
          value: "content_admin",
        },
        { label: "Internal SME / Author", value: "internal_sme" },
        { label: "Support", value: "support" },
      ],
      access: { update: ({ req }) => hasRole(req.user, ["platform_admin"]) },
    },
    { name: "jobTitle", type: "text" },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
  timestamps: true,
};
