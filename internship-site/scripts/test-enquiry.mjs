import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
const source=(await readFile('integrations/google-apps-script/Code.gs','utf8'))+'\n'+(await readFile('integrations/google-apps-script/Idea.gs','utf8'));
const template=await readFile('integrations/google-apps-script/Form.html','utf8');
const id=n=>`${String(n).padStart(8,'0')}-bbbb-4ccc-8ddd-eeeeeeeeeeee`;
const valid={requestId:id(1),fullName:'Test Learner',email:'learner@example.com',phone:'+1 202 555 0123',college:'Sample College',degree:'BSc',year:'2nd year',experience:'New to programming',delivery:'Flexible',interests:['AI Engineering Training Internship'],question:'Sample question',consent:true,termsAccepted:true,termsVersion:'2026-09-11-v1',privacyVersion:'2026-09-11-v3',website:''};
function harness(){
 const rows=[['headers']],cache=new Map(),properties=new Map(Object.entries({SPREADSHEET_ID:'test-sheet',PROTOTYPE_MODE:'true',RECAPTCHA_SITE_KEY:'fixture-site',RECAPTCHA_SECRET_KEY:'fixture-secret',RECAPTCHA_HOSTNAMES:'form.example.com',RATE_SALT:'fixture-salt'}));
 let now=Date.now(),failWrite=false,failFetch=false,fetches=0,locked=false,allowLock=true,reply={success:true,hostname:'form.example.com'};
 const sheet={getLastRow:()=>rows.length,getRange:(row,col=1,n=1,width=1)=>({setNumberFormat(){return this},setValues(values){if(failWrite)throw Error('write failure');rows[row-1]=values[0]},getValues:()=>rows.slice(row-1,row-1+n).map(r=>r.slice(col-1,col-1+width)),createTextFinder:ref=>({matchEntireCell(){return this},findNext(){const i=rows.findIndex(r=>r[1]===ref);return i<0?null:{getRow:()=>i+1}}})})};
 class FakeDate extends Date{constructor(...a){super(...(a.length?a:[now]));}static now(){return now;}}
 const ctx=vm.createContext({Date:FakeDate,PropertiesService:{getScriptProperties:()=>({getProperty:k=>properties.get(k)||null,setProperty:(k,v)=>properties.set(k,v),getProperties:()=>Object.fromEntries(properties),deleteProperty:k=>properties.delete(k)})},CacheService:{getScriptCache:()=>({get:k=>cache.get(k)||null,put:(k,v)=>cache.set(k,v)})},LockService:{getScriptLock:()=>({tryLock:()=>{if(!allowLock)return false;assert.equal(locked,false);locked=true;return true},releaseLock(){locked=false}})},SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush(){}},Utilities:{getUuid:()=>id(99),computeHmacSha256Signature:(text,key)=>Array.from(createHmac('sha256',key).update(text).digest())},UrlFetchApp:{fetch:(url,opts)=>{assert.equal(locked,false,'Network verification must not hold the global lock');assert.equal(url,'https://www.google.com/recaptcha/api/siteverify');assert.equal(opts.payload.secret,'fixture-secret');fetches++;if(failFetch)throw Error('network');return {getResponseCode:()=>200,getContentText:()=>JSON.stringify({challenge_ts:new Date(now).toISOString(),...reply})}}},HtmlService:{createTemplateFromFile:()=>({getRawContent:()=>template}),createHtmlOutput:html=>({html,setTitle(){return this},addMetaTag(){return this},setXFrameOptionsMode(){return this}}),XFrameOptionsMode:{ALLOWALL:'ALLOWALL'}},console});
 vm.runInContext(source,ctx);
 return {ctx,rows,cache,properties,submit(data=valid,token=id(20),captcha='captcha'){cache.set('form:'+token,'program');return ctx.submitEnquiry(data,token,captcha)},setReply:v=>reply=v,setFailWrite:v=>failWrite=v,setFailFetch:v=>failFetch=v,advance:ms=>now+=ms,fetches:()=>fetches,denyLock:()=>allowLock=false};
}
{
 const h=harness();for(const patch of [{termsAccepted:false},{privacyVersion:'old'},{consent:false},{phone:''},{phone:'invalid'},{email:'invalid'},{website:'spam'},{delivery:'unknown'},{question:'a'.repeat(2001)}])assert.throws(()=>h.ctx.validate_({...valid,...patch}));
 assert.equal(h.ctx.validate_({...valid,interests:['Forward Deployment Engineering']}).interests[0],'Forward Deployment Engineering');
 assert.ok(h.ctx.safeCell_('=IMPORTXML("x")').startsWith("'"));
 assert.throws(()=>h.ctx.submitEnquiry(valid,id(20),'captcha'),/FORM_EXPIRED/);
 assert.throws(()=>h.submit(valid,id(20),''),/CAPTCHA_REQUIRED/);assert.equal(h.rows.length,1);
 h.properties.delete('RECAPTCHA_SECRET_KEY');assert.throws(()=>h.submit(),/SECURITY_UNAVAILABLE/);assert.equal(h.fetches(),0);
}
for(const response of [{success:false,hostname:'form.example.com'},{success:true,hostname:'evil.example.com'},{success:false,hostname:'form.example.com','error-codes':['timeout-or-duplicate']}]){
 const h=harness();h.setReply(response);assert.throws(()=>h.submit(),/CAPTCHA_REJECTED/);assert.equal(h.rows.length,1);
}
{
 const h=harness();h.setFailFetch(true);assert.throws(()=>h.submit(),/CAPTCHA_UNAVAILABLE/);assert.equal(h.rows.length,1);
}
{
 const h=harness();h.setFailWrite(true);assert.throws(()=>h.submit(),/write failure/);assert.equal(h.rows.length,1);h.setFailWrite(false);
 assert.equal(h.submit().ok,true);assert.equal(h.rows.length,2);const count=h.fetches();
 assert.equal(h.submit(valid,id(20),'already-consumed').ok,true);assert.equal(h.fetches(),count);assert.equal(h.rows.length,2);
 assert.throws(()=>h.submit({...valid,question:'altered'},id(20)),/FORM_LIMIT/);
 // Lost receipt cache: a fresh verified attempt finds the same durable row without adding a duplicate.
 h.cache.delete('saved:'+id(20));assert.equal(h.submit().ok,true);assert.equal(h.rows.length,2);
 assert.throws(()=>h.submit({...valid,question:'altered'},id(21)),/REQUEST_CONFLICT/);
}
{
 const h=harness();for(let n=1;n<=3;n++)h.submit({...valid,requestId:id(n)},id(20+n));
 assert.throws(()=>h.submit({...valid,requestId:id(4),email:'other@example.com'},id(24)),/CONTACT_LIMIT/,'Phone limit persists across sessions');
 assert.throws(()=>h.submit({...valid,requestId:id(5),phone:'+12025550199'},id(25)),/CONTACT_LIMIT/,'Email limit persists across sessions');
 h.advance(3600001);for(let n=4;n<=6;n++)h.submit({...valid,requestId:id(n)},id(30+n));
 h.advance(3600001);assert.throws(()=>h.submit({...valid,requestId:id(7)},id(37)),/CONTACT_LIMIT/);
 const rate=Array.from(h.properties).filter(([k])=>k.startsWith('RATE_ID_'));assert.equal(rate.length,2);assert.ok(!JSON.stringify(rate).includes('learner@example.com'));
 h.advance(86400001);assert.equal(h.submit({...valid,requestId:id(8)},id(38)).ok,true);
}
{
 const h=harness();h.setReply({success:false});for(let n=0;n<10;n++)assert.throws(()=>h.submit(valid,id(100+n)),/CAPTCHA_REJECTED/);
 assert.throws(()=>h.submit(valid,id(200)),/RATE_LIMIT/);assert.equal(h.fetches(),10);
 h.advance(60001);assert.throws(()=>h.submit(valid,id(201)),/CAPTCHA_REJECTED/);
}
{
 const h=harness();h.setReply({success:false});for(let n=0;n<5;n++)assert.throws(()=>h.submit(),/CAPTCHA_REJECTED/);
 assert.throws(()=>h.submit(),/FORM_LIMIT/);assert.equal(h.fetches(),5);
}
{
 const h=harness();h.ctx.LIMITS_.savesDay=1;h.submit();assert.throws(()=>h.submit({...valid,requestId:id(2),email:'second@example.com',phone:'+12025550198'},id(22)),/RATE_LIMIT/);
}
{
 const h=harness();h.ctx.LIMITS_.attemptsHour=1;h.setReply({success:false});assert.throws(()=>h.submit(),/CAPTCHA_REJECTED/);h.advance(60001);assert.throws(()=>h.submit(valid,id(21)),/RATE_LIMIT/);
}
{
 const h=harness();h.ctx.LIMITS_.attemptsDay=1;h.setReply({success:false});assert.throws(()=>h.submit(),/CAPTCHA_REJECTED/);h.advance(3600001);assert.throws(()=>h.submit(valid,id(21)),/RATE_LIMIT/);
}
{
 const h=harness();h.denyLock();assert.throws(()=>h.submit(),/BUSY/);assert.equal(h.fetches(),0);
}
{
 const h=harness();const html=h.ctx.doGet({parameter:{embedId:id(1),parentOrigin:'http://127.0.0.1:4322',program:'fde'}}).html;
 const config=JSON.parse(html.match(/const settings=(.*);/)[1]);assert.equal(config.connected,true);assert.equal(config.securityReady,true);assert.equal(config.selectedProgram,'fde');assert.equal(html.includes('fixture-secret'),false);
 h.properties.set('RECAPTCHA_SITE_KEY','6LeIxAcT-test');assert.equal(h.ctx.captchaConfig_().ready,false);
 const rejected=h.ctx.doGet({parameter:{embedId:'</script>',parentOrigin:'https://evil.example',program:'unknown'}}).html;
 const settings=JSON.parse(rejected.match(/const settings=(.*);/)[1]);assert.equal(settings.embedId,'');assert.equal(settings.parentOrigin,'');assert.equal(settings.selectedProgram,'');
}
console.log('PASS: fail-closed CAPTCHA, hostname/provider expiry checks, required fields, lost-response retries, payload binding, durable contact limits across reloads, global attempt/save caps, token limits, lock contention, no plaintext rate identifiers, and secret exclusion. Google services mocked.');

{const h=harness();const result=h.submit({...valid,interests:['Space Technology and Satellite Systems']});assert.equal(result.ok,true);assert.equal(h.rows[1][2],'Space Technology and Satellite Systems');}
console.log('PASS: space-tech enquiry accepted and categorised in the program column.');

{
 const h=harness();h.submit();assert.equal(h.rows[1][15],'2026-09-11-v1');assert.equal(h.rows[1][16],'2026-09-11-v3');assert.ok(!Number.isNaN(Date.parse(h.rows[1][17])));assert.equal(h.rows[1][19],'Consented');
 const idea={requestId:id(70),name:'Sample founder',email:'founder@example.com',phone:'+12025550125',organisation:'Sample team',title:'Sample venture',stage:'Exploring a problem',team:'Student team',problem:'A clearly explained customer problem for testing.',users:'College laboratory coordinators',approach:'A manually supervised booking experiment.',evidence:'',support:'Customer discovery and validation',link:'https://example.com/demo',consent:true,termsAccepted:true,termsVersion:'2026-09-11-v1',privacyVersion:'2026-09-11-v3',website:''};
 const v=harness();v.properties.set('FORM_KIND','venture');v.properties.set('VENTURE_SPREADSHEET_ID','venture-sheet');v.cache.set('form:'+id(71),'venture');
 for(const patch of [{termsAccepted:false},{consent:false},{phone:''},{stage:'invalid'},{link:'javascript:alert(1)'},{problem:'tiny'}])assert.throws(()=>v.ctx.validateIdea_({...idea,...patch}));
 v.setFailWrite(true);assert.throws(()=>v.ctx.submitIdea(idea,id(71),'captcha'),/write failure/);v.setFailWrite(false);assert.equal(v.ctx.submitIdea(idea,id(71),'captcha').ok,true);assert.equal(v.rows.length,2);assert.equal(v.rows[1][6],'Sample venture');assert.equal(v.rows[1][17],'2026-09-11-v1');assert.equal(v.rows[1][18],'2026-09-11-v3');assert.equal(v.ctx.submitIdea(idea,id(71),'used').ok,true);assert.equal(v.rows.length,2);v.cache.delete('saved:'+id(71));assert.equal(v.ctx.submitIdea(idea,id(71),'fresh').ok,true);assert.equal(v.rows.length,2);assert.throws(()=>v.ctx.submitIdea({...idea,title:'changed'},id(71),'fresh'),/FORM_LIMIT/);
 const reporting=harness();reporting.ctx.reconcileCrm_=()=>{throw Error('report failure')};assert.equal(reporting.submit().ok,true);assert.equal(reporting.rows.length,2);assert.equal(reporting.submit().ok,true);assert.equal(reporting.rows.length,2);
 console.log('PASS: separate venture validation and save path, failed saves, duplicate-safe retries, policy versions, server acceptance time, and reporting failures after source save.');
}

for(const [key,label] of Object.entries({ml:'Machine Learning',fullstack:'Full-Stack Development',leadership:'Forward Deployment Engineering for Leaders'})){const h=harness();const result=h.submit({...valid,interests:[label]});assert.equal(result.ok,true);assert.equal(h.rows[1][2],label);const html=h.ctx.doGet({parameter:{program:key}}).html;assert.equal(JSON.parse(html.match(/const settings=(.*);/)[1]).selectedProgram,key);} console.log('PASS: all new programs validate, retain source category and accept preselection.');

{
 const h=harness();h.properties.set('PROTOTYPE_MODE','false');h.properties.set('SITE_ORIGIN','https://samkhyaacademy.com');
 for(const origin of ['https://samkhyaacademy.com','https://test.samkhyaacademy.com','http://127.0.0.1:4398'])assert.equal(h.ctx.allowedOrigin_(origin),origin);
 for(const origin of ['https://evil.example','https://samkhyaacademy.com.evil.example','http://127.0.0.1:4399','null'])assert.equal(h.ctx.allowedOrigin_(origin),'');
 console.log('PASS: production and exact review bridge origins accepted; unrelated origins rejected.');
}

{
 const h=harness(); assert.match(h.ctx.doGet({parameter:{form:'venture'}}).html,/not available/);
 h.properties.set('VENTURE_INTAKE_ENABLED','true');h.properties.set('VENTURE_SPREADSHEET_ID','venture-sheet');
 h.ctx.doGet({parameter:{form:'venture'}});assert.equal(h.cache.get('form:'+id(99)),'venture');
 assert.throws(()=>h.ctx.submitEnquiry(valid,id(99),'captcha'),/FORM_EXPIRED/);
 h.ctx.doGet({parameter:{}});assert.equal(h.cache.get('form:'+id(99)),'program');
 console.log('PASS: shared deployment keeps explicit venture enablement and binds sessions to the selected form kind.');
}

// A confirmed receipt is terminal: late CAPTCHA callbacks must neither replace it
// nor send a second request. Exercise the shipped functions, not a duplicate.
for (const filename of ['Form.template.html','Idea.template.html']) {
 const html=await readFile('integrations/google-apps-script/'+filename,'utf8');
 const functions=html.slice(html.indexOf('function submissionError('),html.indexOf('if(connected){',html.indexOf('function sendVerified(')));
 const events=[];
 const context={completed:true,verifying:true,unlock:()=>events.push('unlock'),resetCaptcha:()=>events.push('reset'),show:()=>events.push('show')};
 vm.createContext(context);vm.runInContext(functions,context);
 context.submissionError({message:'CAPTCHA_EXPIRED'});
 context.submissionError({message:'CAPTCHA_UNAVAILABLE'});
 context.sendVerified('late-token');
 assert.deepEqual(events,[]);
 context.completed=false;context.submissionError({message:'CAPTCHA_EXPIRED'});
 assert.deepEqual(events,['unlock','reset','show']);
 assert.match(html,/completed=true;clearTimeout\(challengeTimer\);verifying=false;form.hidden=true/);
 console.log('PASS: '+filename+' preserves confirmed receipts and still reports pre-save CAPTCHA errors.');
}
