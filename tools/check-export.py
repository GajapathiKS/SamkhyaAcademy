from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import sys, json
root = Path(__file__).resolve().parents[1] / "docs"
bad=[]
class Links(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key,value in attrs:
            if key not in ("href","src") or not value or value.startswith(("#","data:","mailto:","tel:","javascript:")): continue
            u=urlparse(value)
            if u.scheme:
                if u.netloc.lower()!="gajapathiks.github.io": continue
                target=root / unquote(u.path.removeprefix("/SamkhyaAcademy/"))
            else: target=self.file.parent / unquote(u.path)
            if not target.exists(): bad.append((str(self.file.relative_to(root)),value))
for f in root.rglob("*.html"):
    parser=Links();parser.file=f;parser.feed(f.read_text(encoding="utf-8"))
print(json.dumps({"html_files":len(list(root.rglob("*.html"))),"broken_links":bad},indent=2))
sys.exit(bool(bad))
