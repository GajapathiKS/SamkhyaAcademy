import type { CollectionBeforeChangeHook } from "payload";
import { hasRole } from "./access";

export const enforcePublisherOnPublish: CollectionBeforeChangeHook = async ({
  data,
  req,
}) => {
  const trustedSeed =
    req.context?.seedInternal === true && process.env.NODE_ENV !== "production";
  if (
    data?._status === "published" &&
    !trustedSeed &&
    !hasRole(req.user, ["platform_admin"])
  ) {
    throw new Error("Only a Platform Admin can publish content.");
  }
  return data;
};
