import { courseCatalog } from "@samkhya/catalog";

export const uxCourses = courseCatalog.map((course) => ({
  ...course,
  id: `ux-${course.slug}`,
  status: "PUBLISHED",
  currency: "INR",
  pricePaise: course.listPricePaise,
  brochurePath: course.brochurePublicPath ?? null,
  publishedProjection: { projection: {
    modules: course.modules.map((module, moduleIndex) => ({ id: `${course.slug}-module-${moduleIndex + 1}`, ...module, lessons: module.lessons.map((title, lessonIndex) => ({ id: `${course.slug}-lesson-${moduleIndex + 1}-${lessonIndex + 1}`, title })) })),
    outcomes: course.outcomes,
    audience: course.audience,
    tools: course.tools,
    durationText: course.durationText,
  } },
}));

export function uxCourseBySlug(slug: string) {
  return uxCourses.find((course) => course.slug === slug);
}
