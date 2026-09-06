import { notFound } from "next/navigation";
import { VentureExperiencePreview } from "@/components/venture/VentureExperiencePreview";

const views = [
  "intake",
  "intake-error",
  "submitted",
  "workflow",
  "artifact",
  "review-pending",
  "changes",
  "resubmit",
  "unlocked",
] as const;
export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  if (!views.includes(view as (typeof views)[number])) notFound();
  return <VentureExperiencePreview view={view as (typeof views)[number]} />;
}
