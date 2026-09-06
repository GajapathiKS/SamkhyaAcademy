import type { Access, CollectionConfig } from "payload";

export type InternalRole =
  "platform_admin" | "content_admin" | "internal_sme" | "support";

type CmsUserLike = { id?: string | number; roles?: InternalRole[] };

export const isInternal = (user: unknown): user is CmsUserLike => {
  const roles = (user as CmsUserLike | undefined)?.roles;
  return Array.isArray(roles) && roles.length > 0;
};

export const hasRole = (user: unknown, roles: InternalRole[]) => {
  const actual = (user as CmsUserLike | undefined)?.roles ?? [];
  return roles.some((role) => actual.includes(role));
};

export const internalOnly = ({ req }: Parameters<Access>[0]) =>
  isInternal(req.user);
export const contentEditors = ({ req }: Parameters<Access>[0]) =>
  hasRole(req.user, ["platform_admin", "content_admin", "internal_sme"]);
export const publishers = ({ req }: Parameters<Access>[0]) =>
  hasRole(req.user, ["platform_admin"]);
export const platformAdmins = ({ req }: Parameters<Access>[0]) =>
  hasRole(req.user, ["platform_admin"]);

export const publishedOrInternal: Access = ({ req }) => {
  if (isInternal(req.user)) return true;
  return { _status: { equals: "published" } };
};

export const internalCollectionAccess = (): CollectionConfig["access"] => ({
  admin: internalOnly,
  create: contentEditors,
  read: internalOnly,
  update: contentEditors,
  delete: publishers,
});
