"""Refresh course pages without re-exporting unchanged PDFs."""
import pathlib,sys
src=pathlib.Path(sys.argv[1])
dest=pathlib.Path(__file__).resolve().parents[1]/"docs"
for page in (src/"pages").glob("*.html"):
    name=page.name
    text=(src/"pages"/name).read_text(encoding="utf-8")
    text=text.replace("http://127.0.0.1:4310","https://gajapathiks.github.io/SamkhyaAcademy").replace("../index.html","../review.html")
    (dest/"pages"/name).write_text(text,encoding="utf-8")
import shutil
for name in ["dedicated-lessons.css","dedicated-lessons.js","layout-fixes.css","enrichment.js","module-lessons.css","module-lessons.js"]:
    shutil.copy2(src/"assets"/name,dest/"assets"/name)
shutil.copytree(src/"assets/lesson-resources",dest/"assets/lesson-resources",dirs_exist_ok=True)
print("Updated all page navigation and dedicated lesson pages/resources.")
shutil.copy2(src/"CURRICULUM_ALIGNMENT.json",dest/"CURRICULUM_ALIGNMENT.json")
for name in ["COURSE_LESSON_LINKS.md","MODULE_LESSON_INDEX.html"]:
    shutil.copy2(src/name,dest/name)
