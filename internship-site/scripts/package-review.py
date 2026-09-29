import os,zipfile,json
from pathlib import Path
root=Path.cwd();a=root/'artifacts'
# Review source: omit caches, live exports, transfer files and private handover.
excluded={'node_modules','.git','.astro','dist','dist-test','artifacts','outputs'}
with zipfile.ZipFile(a/'samkhya-local-review-source.zip','w',zipfile.ZIP_DEFLATED) as z:
 for base,dirs,files in os.walk(root):
  dirs[:]=[d for d in dirs if d not in excluded and not Path(base,d).is_symlink()]
  for name in files:
   p=Path(base,name)
   if name.startswith('.env') or 'HANDOVER' in name or p.suffix in {'.zip','.log'}:continue
   z.write(p,p.relative_to(root))
with zipfile.ZipFile(a/'samkhya-local-review-site.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in (root/'dist').rglob('*'):
  if p.is_file():z.write(p,p.relative_to(root/'dist'))
base=root/'integrations/google-apps-script'
with zipfile.ZipFile(a/'samkhya-crm-apps-script-setup.zip','w',zipfile.ZIP_DEFLATED) as z:
 z.write(base/'BoundCRM.gs','bound-workbook/Code.gs')
 z.writestr('bound-workbook/appsscript.json',json.dumps({'timeZone':'Asia/Kolkata','runtimeVersion':'V8','oauthScopes':['https://www.googleapis.com/auth/spreadsheets.currentonly']},indent=2))
 for name in ['Code.gs','Form.html','Idea.gs','Idea.html','IntakeCRM.gs','appsscript.json']:z.write(base/name,'intake-service/'+name)
 for name in ['CRM-SETUP.md']:z.write(base/name,name)
 for name in ['CRM-CLIENT-GUIDE.md','LOCAL-REVIEW.md','SEO-LAUNCH-GUIDE.md']:z.write(root/name,name)
 z.writestr('README-FIRST.txt','BOUND WORKBOOK: install only bound-workbook files in a spreadsheet-bound project. INTAKE SERVICE: only intake-service files belong in a web-app project. No keys are included. Do not deploy before policies, URLs and owner authorization are approved. The website is available on the test domain for review; the main domain remains unchanged.\n')
for name in ['samkhya-local-review-source.zip','samkhya-local-review-site.zip','samkhya-crm-apps-script-setup.zip']:
 p=a/name
 with zipfile.ZipFile(p) as z:assert z.testzip() is None
 print(name,p.stat().st_size)
with zipfile.ZipFile(a/'samkhya-local-review-site.zip') as z:
 assert not any('CRM' in n or 'spreadsheet' in n.lower() or n.endswith('.gs') for n in z.namelist())
print('Archives verified; public build excludes CRM data and server scripts.')

portal=root/'integrations/crm-portal'
with zipfile.ZipFile(a/'samkhya-private-operations-setup.zip','w',zipfile.ZIP_DEFLATED) as z:
 for name in ['Code.gs','Portal.html','appsscript.json','README.md']:z.write(portal/name,name)
 z.writestr('DEPLOYMENT-NOTE.txt','Owner-only version 1 is deployed. Keep execute-as-user and Only myself. Do not deploy this package in the public intake service or upload it to website hosting. No staff access has been granted. See private handover for the existing URL.\n')
with zipfile.ZipFile(a/'samkhya-private-operations-setup.zip') as z:assert z.testzip() is None
print('Private operations setup archive verified.')
