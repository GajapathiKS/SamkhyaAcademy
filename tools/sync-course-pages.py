"""Refresh course pages without re-exporting unchanged PDFs."""
import pathlib,sys
src=pathlib.Path(sys.argv[1])
dest=pathlib.Path(__file__).resolve().parents[1]/"docs"
for n in [4,5,6,11,12,13,14,15,16,17,86,88,90,102]:
    name=str(n).zfill(3)+".html"
    text=(src/"pages"/name).read_text(encoding="utf-8")
    text=text.replace("http://127.0.0.1:4310","https://gajapathiks.github.io/SamkhyaAcademy").replace("../index.html","../review.html")
    (dest/"pages"/name).write_text(text,encoding="utf-8")
print("Updated 14 course pages.")
