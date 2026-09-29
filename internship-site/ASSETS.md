# Image and brand sources

## Reused approved platform assets

- `academy-workshop`: original homepage image from `../docs/assets/workshop.png`.
- `ai-engineering` and `full-stack`: original approved course artwork from `../docs/assets/course-visuals/`.
- Brand SVG geometry: `../source/apps/web/components/BrandMark.tsx`. Wordmark styling and initiative line match the original homepage. The source does not establish legal ownership; client brand verification remains a launch prerequisite.
- SVG interface icons: lucide-static; license retained in `public/lucide-license.txt`.

## Newly generated artwork

Created using the built-in ImageGen tool. Original project copies are in `assets-originals/`; the website uses responsive versions in `public/images/`. The learner scene is explicitly labelled as an AI-generated illustration rather than a photograph of actual students.

### learning-studio

Create a premium wide 3:2 editorial 3D illustration for SamkhyaAcademy college AI engineering internship website. A welcoming aspirational learning studio: three stylized adult Indian college students collaborating around a laptop, notebook and translucent holographic interface panels, a small branching AI network floating above their shared desk. Sophisticated dimensional illustration, visibly illustrated not a photograph or real students. Deep midnight navy environment, electric indigo and cyan accents, warm natural skin tones, subtle mint details. Rich cinematic lighting, precise modern materials, uncluttered composition, subjects centered with breathing room. No text, no letters, no logos, no robots, no watermarks. Intended for a website hero about learning through building. One single finished image.

### career-path

Create a premium wide 3:2 conceptual 3D illustration for an AI engineering student's career preparation webpage. A beautiful architectural staircase of illuminated indigo glass platforms on a deep navy background, ascending from a laptop with abstract code lines through a branching data-structure sculpture and a portfolio folder to an elegant presentation screen. Cohesive electric-blue and violet rim lighting with restrained mint accents, modern product-render quality, carefully arranged realistic materials, optimistic and sophisticated. No text, no letters, no numbers, no logos, no people, no graduation cap, no currency or employment guarantee symbols. One single finished image, centered with generous breathing room.

### knowledge-bridge

Create one premium 3:2 3D conceptual illustration for the About page of a college AI engineering academy. A luminous open book at center, its pages transforming into an elegant bridge of connected blue glass modules leading toward a small glowing application window. Visual metaphor for connecting knowledge and practice. Deep midnight navy backdrop, refined electric indigo, blue and subtle mint light, contemporary precise materials, restrained cinematic glow, cohesive high-end technical editorial art, beautiful balanced composition. No people, no text, no letters, no logos, no watermark.

## Image preparation

Run `node scripts/prepare-images.mjs` after changing an original. Generates 640px and 1200px WebP/AVIF variants. Above-the-fold hero images load eagerly, other images lazily. Public versions are each below 100 KB at current quality settings; source PNGs do not ship in the GoDaddy ZIP.


## Two-track program experience

The FDE overview and catalogue reuse the approved AI-engineering artwork already optimised in `public/images`; the curriculum and project pages also reuse the existing full-stack, career-path, and knowledge-bridge illustrations. Architecture flows are accessible HTML/CSS diagrams, not screenshots of functioning applications. No new third-party imagery was introduced. Curriculum structure and the service-assistant case are adapted from `../source/packages/catalog/src/index.ts` (`ai-engineering`) and `../source/scripts/ux-rebuild/course-depth.mjs`. Commercial details and learner-operation UI from those references are excluded.

Local expansion: space-tech and venture-studio AVIF/WebP derivatives reuse ../docs/assets/course-visuals/space-tech-hero-v2.png and entrepreneurship-hero-v2.png from the approved original learning platform. These are conceptual illustrations, not evidence of actual students, hardware or ventures.

## Daylight course scenes — 12 September 2026
Six original AI-generated photorealistic illustrations: ai-engineering, fde-learning, space-tech, machine-learning, full-stack, ai-leadership. Created with the built-in image-generation tool for this academy site. They depict illustrative adult learning/workshop scenes, not actual academy students, staff, facilities or outcomes. Original PNGs are in assets/generated-photography; optimised 640/1200px AVIF/WebP files are public. Homepage and Venture images were retained. No third-party stock photography was copied.
