import { notFound } from "next/navigation";
import { ProgrammingShowcase } from "@/components/learning/ProgrammingShowcase";
const modes = [
  "catalog",
  "c-course",
  "cpp-course",
  "dsa-course",
  "dsa-graph",
  "dsa-list",
] as const;
export default async function Page({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  if (!modes.includes(mode as any)) notFound();
  return <ProgrammingShowcase mode={mode as (typeof modes)[number]} />;
}
