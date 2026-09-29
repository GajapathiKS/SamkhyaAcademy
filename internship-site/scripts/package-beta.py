from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
import stat
root = Path(__file__).resolve().parents[1]
with ZipFile(root / 'artifacts/samkhya-beta-upload.zip', 'w', ZIP_DEFLATED) as archive:
    for path in sorted((root / 'dist').rglob('*')):
        name = path.relative_to(root / 'dist').as_posix()
        info = ZipInfo(name + '/' if path.is_dir() else name)
        info.create_system = 3
        info.compress_type = ZIP_DEFLATED
        info.external_attr = ((stat.S_IFDIR | 0o755) if path.is_dir() else (stat.S_IFREG | 0o644)) << 16
        archive.writestr(info, b'' if path.is_dir() else path.read_bytes())
print('Beta archive: directories 0755, files 0644; compiled public files only.')
