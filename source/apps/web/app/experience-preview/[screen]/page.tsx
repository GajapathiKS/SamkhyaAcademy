import { notFound } from "next/navigation";
import { RedesignScreen } from "@/components/experience/RedesignScreen";

const supported = new Set([
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
]);

export default async function ExperiencePreviewPage({ params }: { params: Promise<{ screen: string }> }) {
  const screen = Number((await params).screen);
  if (!supported.has(screen)) notFound();
  return <RedesignScreen screen={screen} />;
}
