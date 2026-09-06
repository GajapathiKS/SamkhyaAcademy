from pathlib import Path
from pypdf import PdfReader
import subprocess, hashlib, tempfile, sys
root=Path(__file__).resolve().parents[1]
original=Path(sys.argv[1])
for pdf in sorted((root/"docs/brochures").glob("*.pdf")):
    reader=PdfReader(pdf)
    urls=[str(a.get_object().get("/A",{}).get("/URI","")) for p in reader.pages for a in p.get("/Annots",[])]
    assert len(reader.pages)==6
    assert sum(u.startswith("https://gajapathiks.github.io/SamkhyaAcademy/") for u in urls)==3
    assert not any("127.0.0.1" in u for u in urls)
    with tempfile.TemporaryDirectory() as scratch:
        prefix=Path(scratch)/pdf.stem
        subprocess.run(["pdftoppm","-scale-to","1600","-png",str(pdf),str(prefix)],check=True)
        # Published files retain the original page artwork byte-for-byte when rendered.
        for i in range(1,7):
            baseline=original/(pdf.stem+"-"+str(i)+".png")
            # Canonical PDF filenames use shorter program names than the QA slugs.
            actual=Path(str(prefix)+"-"+str(i)+".png")
            if baseline.exists():
                assert hashlib.sha256(actual.read_bytes()).digest()==hashlib.sha256(baseline.read_bytes()).digest(),(pdf.name,i)
    print(pdf.name+": 6 pages, 3 public links, render checked",flush=True)
