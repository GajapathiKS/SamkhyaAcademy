import {readFile,writeFile,mkdir} from 'node:fs/promises';
const font=(await readFile('public/fonts/poppins-regular.woff2')).toString('base64');
const form=(await readFile('integrations/google-apps-script/Form.template.html','utf8')).replace('__FONT_DATA__',font);
await writeFile('integrations/google-apps-script/Form.html',form);
await mkdir('public/forms/internship-enquiry',{recursive:true});
await writeFile('public/forms/internship-enquiry/index.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Program enquiries | SamkhyaAcademy</title></head><body><main><h1>Enquire about a program</h1><p>Open the academy enquiry page to share your learning goals and questions.</p><a href="/enquire/">Open the enquiry form</a></main></body></html>');
console.log('Generated private integration templates and a public non-collecting enquiry page.');

const idea=(await readFile('integrations/google-apps-script/Idea.template.html','utf8')).replace('__FONT_DATA__',font);await writeFile('integrations/google-apps-script/Idea.html',idea);
