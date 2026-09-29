import { site } from '../site.config.mjs';
const errors = [];
try { const u = new URL(site.domain); if (u.protocol !== 'https:' || u.pathname !== '/' || u.search || u.hash || u.hostname === 'localhost' || /example\.(com|org)/.test(u.hostname)) throw Error(); } catch { errors.push('Set a verified HTTPS production domain without a path.'); }
if (site.domain.endsWith('/')) errors.push('Remove the trailing slash from domain.');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)) errors.push('Set a verified public contact email.');
for(const key of ['phone','whatsapp']) if(!/^\+?[1-9][0-9 ()-]{6,20}$/.test(site[key]||'')||site[key].replace(/\D/g,'').length>15) errors.push(`Set a verified public ${key} number with country code.`);
if (site.enquiryMode === 'custom') {
 try {const u=new URL(site.customFormUrl); if(u.protocol!=='https:'||u.hostname!=='script.google.com'||!/^\/macros\/s\/[^/]+\/exec$/.test(u.pathname))throw Error();}catch{errors.push('Set a deployed Apps Script /exec URL.');}
 if(site.customFormPrototype)errors.push('Prototype form must not be launched as the client enquiry service. Complete account handover and set customFormPrototype false.');
 if(!site.enquirySecurityVerified)errors.push('Verify real CAPTCHA enforcement, throttling and saved-row tests on the production deployment; then set enquirySecurityVerified.');
} else {
for (const [key, embed] of [['formEmbedUrl', true], ['formResponderUrl', false]]) {
  try { const u = new URL(site[key]); if (u.protocol !== 'https:' || (embed ? u.hostname !== 'docs.google.com' || !u.pathname.startsWith('/forms/') || !u.pathname.endsWith('/viewform') || u.searchParams.get('embedded') !== 'true' : !['docs.google.com','forms.gle'].includes(u.hostname))) throw Error(); } catch { errors.push(`Set a published Google Forms ${key}.`); }
}
}
if (!site.organizationVerified) errors.push('Verify academy name, About copy, and public contacts; set organizationVerified.');
if (!site.privacyVerified) errors.push('Client must verify privacy copy matches form fields, access, and handling; set privacyVerified.');
if (errors.length) { console.error('Launch configuration incomplete:\n' + errors.map(e => `- ${e}`).join('\n')); process.exitCode = 1; }
else console.log('Launch configuration passes. Still verify a signed-out form submission and live cPanel routing before announcing launch.');

if(!site.indexingApproved) { console.error("BLOCKED: Indexing release approval is missing."); process.exitCode=1; }

for(const [key,reason] of Object.entries({addressVerified:'Verify the business address.',domainVerified:'Confirm the production hostname.',policiesApproved:'Obtain approved Privacy and Terms.',enquiriesEnabled:'Activate and verify the real enquiry destination.',ventureIntakeEnabled:'Activate and verify venture intake.'})) if(!site[key]){console.error('BLOCKED: '+reason);process.exitCode=1;}
for(const key of ['address','legalEntity','privacyContact','parentUrl']) if(!site[key]){console.error('BLOCKED: provide verified '+key);process.exitCode=1;}

if (site.ventureIntakeEnabled && !site.ideaFormUrl) { console.error('BLOCKED: Venture intake is enabled without a verified destination.'); process.exitCode=1; }
