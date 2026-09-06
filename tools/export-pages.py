"""Publish a reviewed static export, without its private/local working files."""
import sys, pathlib, shutil, re, json, zipfile
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject
root = pathlib.Path(__file__).resolve().parents[1]
src = pathlib.Path(sys.argv[1]).resolve()
dest = root / "docs"
base = "https://gajapathiks.github.io/SamkhyaAcademy"
dest.mkdir(exist_ok=True)
for folder in ("assets", "pages", "screens", "references"):
    shutil.copytree(src / folder, dest / folder, dirs_exist_ok=True)
for name in ("index.html", "CLIENT_HANDOFF.html", "CLIENT_HANDOFF.md", "CLIENT_URLS.csv",
             "SCREEN_INVENTORY.md", "MARVEL_PROTOTYPE_MAP.csv", "MARVEL_PROTOTYPE_MAP.md",
             "REFERENCE_COMPARISON.html", "VERIFICATION_REPORT.md", "ASTRA_UX_REBUILD_BRIEF.md",
             "ENRICHMENT_REPORT.md", "CONTENT_DEPTH_UPDATE.md", "DIRECT_ACCESS_UPDATE.md", "manifest.json"):
    shutil.copy2(src / name, dest / name)
# Preserve the gallery as a separate reviewer resource.
shutil.copy2(dest / "index.html", dest / "review.html")
for f in dest.rglob("*"):
    if f.suffix.lower() not in (".html", ".js", ".css", ".md", ".csv", ".json", ".svg"):
        continue
    text = f.read_text(encoding="utf-8")
    text = text.replace("http://127.0.0.1:4310", base)
    text = text.replace("../index.html", "../review.html")
    if f.parent == dest:
        text = text.replace('href="index.html"', 'href="review.html"')
    text = re.sub(r"C:[/\\]Users[/\\]gajap[/\\][^\s\"<>]*", "[local-workspace]", text, flags=re.I)
    if f.name.startswith("CLIENT_HANDOFF"):
        text = text.replace("A localhost URL works only on the host computer. For remote review, serve this package on an agreed preview host and replace the base URL; no deployment has been performed.",
                            "This handoff uses the public GitHub Pages preview. Do not enter confidential information in this demonstration.")
        text = text.replace("Local base URL:", "Public preview URL:")
    f.write_text(text, encoding="utf-8")
(dest / "index.html").write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=pages/001.html"><title>SamkhyaAcademy</title><a href="pages/001.html">Open SamkhyaAcademy</a></html>', encoding="utf-8")
(dest / ".nojekyll").write_text("")
pdfdir = dest / "brochures"
pdfdir.mkdir(exist_ok=True)
manifest = json.loads((src / "brochures/manifest.json").read_text())
for course in manifest:
    original = src / course["pdf"]
    writer = PdfWriter()
    writer.clone_document_from_reader(PdfReader(original))
    changed = 0
    for page in writer.pages:
        for ref in page.get("/Annots", []):
            action = ref.get_object().get("/A")
            if action:
                action = action.get_object()
                uri = str(action.get("/URI", ""))
                if "http://127.0.0.1:4310" in uri:
                    action[NameObject("/URI")] = TextStringObject(uri.replace("http://127.0.0.1:4310", base))
                    changed += 1
    with (pdfdir / original.name).open("wb") as output:
        writer.write(output)
    assert changed > 0, original.name
    check = PdfReader(pdfdir / original.name)
    assert len(check.pages) == 6
    print(original.name, changed, "public links")
with zipfile.ZipFile(pdfdir / "all-course-brochures.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    for course in manifest:
        f = pdfdir / pathlib.Path(course["pdf"]).name
        archive.write(f, f.name)
print("Static Pages export:", dest)
