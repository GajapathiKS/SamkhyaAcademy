"""Package compiled staging files with explicit Unix hosting permissions."""
from datetime import datetime
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

root = Path('dist-test')
assert (root / 'index.html').is_file(), 'Run npm run build:test first.'
with ZipFile('artifacts/samkhya-test-upload.zip', 'w', ZIP_DEFLATED) as archive:
    for path in sorted(root.rglob('*')):
        name = path.relative_to(root).as_posix() + ('/' if path.is_dir() else '')
        entry = ZipInfo(name, datetime.now().timetuple()[:6])
        entry.create_system = 3
        entry.compress_type = ZIP_DEFLATED
        entry.external_attr = ((0o40755 if path.is_dir() else 0o100644) << 16) | (0x10 if path.is_dir() else 0)
        archive.writestr(entry, b'' if path.is_dir() else path.read_bytes())
print('Created artifacts/samkhya-test-upload.zip: folders 0755, files 0644.')
