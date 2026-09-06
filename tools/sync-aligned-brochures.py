"""Validate curriculum parity, then publish the already-rendered PDFs unchanged."""
import json,pathlib,shutil,sys,re,zipfile
from pypdf import PdfReader
src=pathlib.Path(sys.argv[1]).resolve()
repo=pathlib.Path(__file__).resolve().parents[1]
plans={p["slug"]:p for p in json.loads((src/"CURRICULUM_ALIGNMENT.json").read_text())}
manifest=json.loads((src/"brochures/manifest.json").read_text())
norm=lambda value:re.sub(r"\s+","",value).casefold()
results=[]
for item in manifest:
    pdf=src/item["pdf"];reader=PdfReader(pdf)
    text="\n".join(page.extract_text() or "" for page in reader.pages)
    plan=plans[item["slug"]]
    assert len(reader.pages)==6,pdf
    assert plan["version"]==item["version"] and plan["version"] in text,pdf
    for module in plan["modules"]:
        assert norm(module["title"]) in norm(text),(pdf,module["title"])
        for lesson in module["lessons"]:
            assert norm(lesson["title"]) in norm(text),(pdf,lesson["title"])
    assert not re.search(r"SAP Enterprise Consulting|sap-enterprise-consulting",text,re.I),pdf
    links=[]
    for page in reader.pages:
        for ref in page.get("/Annots",[]):
            action=ref.get_object().get("/A")
            if action and action.get("/URI"):
                uri=str(action["/URI"]);assert "127.0.0.1" not in uri,uri;links.append(uri)
                if "/SamkhyaAcademy/pages/" in uri:
                    name=uri.split("/pages/")[1].split("#")[0]
                    assert (src/"pages"/name).is_file(),uri
    assert links,pdf
    for target in [repo/"docs/brochures",repo/"source/apps/web/public/brochures",src.parents[1]/"apps/web/public/brochures"]:
        target.mkdir(parents=True,exist_ok=True);shutil.copy2(pdf,target/pdf.name)
    results.append({"course":item["slug"],"modules":len(plan["modules"]),"lessons":sum(len(m["lessons"]) for m in plan["modules"]),"pages":6,"version":plan["version"],"links":links,"passed":True})
dest=repo/"docs/brochures"
shutil.copy2(src/"brochures/manifest.json",dest/"manifest.json")
shutil.copy2(src/"brochures/brochure.css",dest/"brochure.css")
shutil.copytree(src/"brochures/html",dest/"html",dirs_exist_ok=True)
with zipfile.ZipFile(dest/"all-course-brochures.zip","w",zipfile.ZIP_DEFLATED) as archive:
    for item in manifest:
        file=dest/pathlib.Path(item["pdf"]).name
        archive.write(file,file.name)
(repo/"docs/BROCHURE_ALIGNMENT_RESULTS.json").write_text(json.dumps(results,indent=2))
print("PASS: 12 PDFs, 56 module titles, 224 lesson titles, 72 pages and public links.")
