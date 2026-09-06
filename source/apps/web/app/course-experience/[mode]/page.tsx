import { notFound } from "next/navigation";
import { CourseExperienceMaster } from "@/components/learning/CourseExperienceMaster";
const modes = ["video", "text", "example"] as const;
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ mode: string }>;
  searchParams: Promise<{ track?: string }>;
}) {
  const { mode } = await params;
  const query = await searchParams;
  if (!modes.includes(mode as any)) notFound();
  const track = ["c", "cpp"].includes(String(query.track))
    ? (query.track as "c" | "cpp")
    : "fullstack";
  return (
    <CourseExperienceMaster
      mode={mode as (typeof modes)[number]}
      track={track}
    />
  );
}
