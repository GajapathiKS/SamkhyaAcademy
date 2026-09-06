# Course entry and responsive layout verification

## Delivered

- One “Go to lesson” action for each of the 12 courses; eight new course-specific lesson pages supplement four existing lesson destinations.
- New lessons contain a scenario, concept explanation, worked example, practice tasks, knowledge check, self-review checklist and downloadable worksheet. Practice, notes, discussion and completion are browser-local.
- Icons on all seven primary navigation entries, including all four dropdown headings.
- A responsive Menu control below 1351px with keyboard Escape support. Dropdowns expand within the navigation on mobile.
- Consistent input heights, checkbox/radio geometry, search-field alignment, button spacing, wrapping toolbars and responsive form grids.
- Tablet Venture stage rows and mobile editor toolbar overflow corrected.

## Measured checks

| Check | Result |
|---|---|
| All 12 course landing pages → assigned lesson | Pass |
| Eight new lessons: practice/notes persistence, completion guard and persistence, safe local discussion rendering | Pass |
| 191 pages × 1440, 1280, 768 and 390px | No detected document overflow, header escape or oversized checkbox/radio controls |
| Menu, dropdown visibility and Escape at collapsed widths | Pass |
| Local links across 195 HTML documents | No broken references |
| Shared navigation icons across 183 numbered screens | Pass |
| Numbered screenshots refreshed | 183 |
| New lesson screenshots | 8 |

Automated geometry checks do not establish pixel-perfect visual approval. Representative homepage, intake, course-management, signup, investor and lesson captures are in [layout-qa](layout-qa/results.json); selected desktop/mobile captures were visually inspected. Existing production integrations and full-course authoring remain outside this static UX update.

See [all course lesson links](COURSE_LESSON_LINKS.md).
