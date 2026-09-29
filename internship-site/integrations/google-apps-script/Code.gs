var PROGRAM_OPTIONS_={"internship": "AI Engineering Training Internship", "fde": "Forward Deployment Engineering", "space": "Space Technology and Satellite Systems", "ml": "Machine Learning", "fullstack": "Full-Stack Development", "leadership": "Forward Deployment Engineering for Leaders"};
/** Use a temporary editor-only wrapper to initialise the appropriate private sheet. */
function setupPrototype_(){setupResponseSheet_('SamkhyaAcademy — Test enquiries');}
function setupProduction_(){
  setupResponseSheet_('SamkhyaAcademy — Program enquiries');
  PropertiesService.getScriptProperties().setProperty('SITE_ORIGIN','https://samkhyaacademy.com');
}
function setupResponseSheet_(name) {
  var properties=PropertiesService.getScriptProperties();
  if (!properties.getProperty('SPREADSHEET_ID')) {
    var spreadsheet=SpreadsheetApp.create(name);
    var sheet=spreadsheet.getSheets()[0]; sheet.setName('Enquiries');
    sheet.appendRow(['Received (UTC)','Reference','Program','Full name','Email','Phone','College','Degree','Year','Experience','Delivery preference','Interests','Question','Privacy acknowledgement','Mode','Terms version','Privacy version','Accepted UTC','Terms acknowledgement','Processing consent']);
    sheet.setFrozenRows(1);
    properties.setProperty('SPREADSHEET_ID',spreadsheet.getId());
    properties.setProperty('PROTOTYPE_MODE','true');
  }
  console.log('Response sheet: https://docs.google.com/spreadsheets/d/'+properties.getProperty('SPREADSHEET_ID')+'/edit');
}
function doGet(e) {
  var props=PropertiesService.getScriptProperties();
  var kind=props.getProperty('FORM_KIND')==='venture'||(e&&e.parameter&&e.parameter.form==='venture')?'venture':'program';
  if(kind==='venture'&&!ventureIntakeEnabled_())return HtmlService.createHtmlOutput('Venture submissions are not available yet.');
  if (!props.getProperty(kind==='venture'?'VENTURE_SPREADSHEET_ID':'SPREADSHEET_ID')) return HtmlService.createHtmlOutput('Enquiries are not connected yet.');
  var token=Utilities.getUuid(); CacheService.getScriptCache().put('form:'+token,kind,3600);
  var security=captchaConfig_();
  var settings={captchaSiteKey:security.siteKey,securityReady:security.ready,connected:true,prototype:props.getProperty('PROTOTYPE_MODE')!=='false',token:token,embedId:e&&e.parameter&&/^[0-9a-f-]{36}$/i.test(e.parameter.embedId||'')?e.parameter.embedId:'',parentOrigin:allowedOrigin_(e&&e.parameter&&e.parameter.parentOrigin),siteOrigin:props.getProperty('SITE_ORIGIN')||'http://127.0.0.1:4322',selectedProgram:e&&e.parameter&&Object.prototype.hasOwnProperty.call(PROGRAM_OPTIONS_,e.parameter.program)?e.parameter.program:''};
  var html=HtmlService.createTemplateFromFile(kind==='venture'?'Idea':'Form').getRawContent().replace(/\/\*CONFIG_START\*\/[\s\S]*?\/\*CONFIG_END\*\//,JSON.stringify(settings).replace(/</g,'\\u003c'));
  return HtmlService.createHtmlOutput(html).setTitle(kind==='venture'?'SamkhyaAcademy venture idea brief':'SamkhyaAcademy program enquiry').addMetaTag('viewport','width=device-width, initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
// Application limits protect saves and verification calls; Apps Script itself still has platform quotas.
var LIMITS_={attemptsMinute:10,attemptsHour:100,attemptsDay:500,savesDay:200,identityHour:3,identityDay:6,tokenAttempts:5};
function captchaConfig_() {
  var p=PropertiesService.getScriptProperties();
  var siteKey=p.getProperty('RECAPTCHA_SITE_KEY')||'';
  var secret=p.getProperty('RECAPTCHA_SECRET_KEY')||'';
  var hosts=(p.getProperty('RECAPTCHA_HOSTNAMES')||'').split(',').map(function(x){return x.trim().toLowerCase();}).filter(Boolean);
  // Google's published test keys must never enable a deployment.
  var test=siteKey.indexOf('6LeIxAcT')===0||secret.indexOf('6LeIxAcT')===0;
  return {siteKey:siteKey,secret:secret,hosts:hosts,ready:!!(siteKey&&secret&&hosts.length&&!test)};
}
function withLock_(fn) {
  var lock=LockService.getScriptLock();
  if(!lock.tryLock(5000))throw new Error('BUSY');
  try{return fn();}finally{lock.releaseLock();}
}
function digest_(text) {
  var p=PropertiesService.getScriptProperties(),salt=p.getProperty('RATE_SALT');
  if(!salt){salt=Utilities.getUuid()+Utilities.getUuid();p.setProperty('RATE_SALT',salt);}
  return Utilities.computeHmacSha256Signature(text,salt).map(function(b){return ('0'+(b&255).toString(16)).slice(-2);}).join('');
}
function state_(p,key,fallback){var value=p.getProperty(key);return value?JSON.parse(value):fallback;}
function attempt_(token,now) {
  var p=PropertiesService.getScriptProperties(),cache=CacheService.getScriptCache();
  var day=new Date(now).toISOString().slice(0,10);
  var state=state_(p,'RATE_ATTEMPTS',{day:day,count:0,recent:[]});
  state.recent=state.recent.filter(function(t){return now-t<3600000;});
  if(state.day!==day){state.day=day;state.count=0;}
  var count=Number(cache.get('tries:'+token)||0);
  if(count>=LIMITS_.tokenAttempts)throw new Error('FORM_LIMIT');
  if(state.count>=LIMITS_.attemptsDay||state.recent.length>=LIMITS_.attemptsHour||state.recent.filter(function(t){return now-t<60000;}).length>=LIMITS_.attemptsMinute)throw new Error('RATE_LIMIT');
  state.count++;state.recent.push(now);p.setProperty('RATE_ATTEMPTS',JSON.stringify(state));cache.put('tries:'+token,String(count+1),3600);
}
function verifyCaptcha_(response,config) {
  if(!config.ready)throw new Error('SECURITY_UNAVAILABLE');
  if(typeof response!=='string'||!response||response.length>4096)throw new Error('CAPTCHA_REQUIRED');
  var result;
  try {
    var http=UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify',{method:'post',payload:{secret:config.secret,response:response},muteHttpExceptions:true});
    if(http.getResponseCode()!==200)throw new Error();
    result=JSON.parse(http.getContentText());
  }catch(error){throw new Error('CAPTCHA_UNAVAILABLE');}
  // Siteverify enforces token expiry/replay itself. challenge_ts is challenge-load time,
  // so rejecting an otherwise valid result by that age penalises slow human completion.
  if(result.success!==true||config.hosts.indexOf(String(result.hostname||'').toLowerCase())<0){
    console.warn('CAPTCHA rejected: '+JSON.stringify({success:result.success===true,hostname:String(result.hostname||''),codes:result['error-codes']||[]}));
    throw new Error('CAPTCHA_REJECTED');
  }
}
function reserveSave_(data,now) {
  var p=PropertiesService.getScriptProperties(),day=new Date(now).toISOString().slice(0,10);
  var global=state_(p,'RATE_SAVES',{day:day,count:0});
  if(global.day!==day){
    global={day:day,count:0};
    // Bounded identity state: remove expired entries at the daily rollover.
    var all=p.getProperties();Object.keys(all).forEach(function(key){if(key.indexOf('RATE_ID_')===0){var record=JSON.parse(all[key]);if(now-record.updated>86400000)p.deleteProperty(key);}});
  }
  if(global.count>=LIMITS_.savesDay)throw new Error('RATE_LIMIT');
  var keys=['email:'+data.email.toLowerCase(),'phone:'+data.phone.replace(/\D/g,'')].map(function(value){return 'RATE_ID_'+digest_(value);});
  var states=keys.map(function(key){var state=state_(p,key,{times:[],updated:now});state.times=state.times.filter(function(t){return now-t<86400000;});return state;});
  if(states.some(function(state){return state.times.length>=LIMITS_.identityDay||state.times.filter(function(t){return now-t<3600000;}).length>=LIMITS_.identityHour;}))throw new Error('CONTACT_LIMIT');
  global.count++;p.setProperty('RATE_SAVES',JSON.stringify(global));
  states.forEach(function(state,i){state.times.push(now);state.updated=now;p.setProperty(keys[i],JSON.stringify(state));});
}
function submitEnquiry(raw,token,captchaResponse) {
  if(PropertiesService.getScriptProperties().getProperty('FORM_KIND')==='venture')throw new Error('Wrong form endpoint');
  return submitValidated_(validate_(raw),token,captchaResponse,'program');
}
function submitValidated_(data,token,captchaResponse,kind) {
  var cache=CacheService.getScriptCache(),config=captchaConfig_();
  if(!config.ready)throw new Error('SECURITY_UNAVAILABLE');
  if(typeof token!=='string'||!/^[0-9a-f-]{36}$/i.test(token)||cache.get('form:'+token)!==kind)throw new Error('FORM_EXPIRED');
  // Receipt retries must match both the form session and the exact validated payload.
  var fingerprint;
  var receipt=withLock_(function(){
    fingerprint=digest_(JSON.stringify(data));
    var saved=cache.get('saved:'+token);
    if(saved){if(saved===fingerprint)return {ok:true,reference:data.requestId};throw new Error('FORM_LIMIT');}
    attempt_(token,Date.now());return null;
  });
  if(receipt)return receipt;
  verifyCaptcha_(captchaResponse,config);
  return withLock_(function(){
    var saved=cache.get('saved:'+token);
    if(saved){if(saved===fingerprint)return {ok:true,reference:data.requestId};throw new Error('FORM_LIMIT');}
    var props=PropertiesService.getScriptProperties();
    var sheet=SpreadsheetApp.openById(props.getProperty(kind==='venture'?'VENTURE_SPREADSHEET_ID':'SPREADSHEET_ID')).getSheetByName(props.getProperty(kind==='venture'?'VENTURE_SOURCE_SHEET':'SOURCE_SHEET')||'Enquiries');
    if(!sheet)throw new Error('SAVE_UNAVAILABLE');
    var rowCount=sheet.getLastRow();
    var row=kind==='venture'?ideaRow_(data,props):[new Date().toISOString(),data.requestId,data.interests.filter(function(x){return Object.values(PROGRAM_OPTIONS_).indexOf(x)>=0;}).join(', ')||'Not specified',data.fullName,data.email,data.phone,data.college,data.degree,data.year,data.experience,data.delivery,data.interests.join(', '),data.question,'Acknowledged — '+data.privacyVersion,props.getProperty('PROTOTYPE_MODE')!=='false'?'Prototype':'Live',data.termsVersion,data.privacyVersion,new Date().toISOString(),'Accepted','Consented'].map(safeCell_);
    if(kind==='venture')row=ideaRow_(data,props);
    var duplicate=rowCount>1&&sheet.getRange(2,2,rowCount-1,1).createTextFinder(data.requestId).matchEntireCell(true).findNext();
    if(duplicate){
      var existing=sheet.getRange(duplicate.getRow(),1,1,row.length).getValues()[0];
      if(JSON.stringify(existing.slice(1,kind==='venture'?16:13).map(safeCell_))!==JSON.stringify(row.slice(1,kind==='venture'?16:13)))throw new Error('REQUEST_CONFLICT');
      cache.put('saved:'+token,fingerprint,3600);return {ok:true,reference:data.requestId};
    }
    // Reserve before writing; failed writes conservatively consume budget to prevent write-failure floods.
    reserveSave_(data,Date.now());
    var range=sheet.getRange(rowCount+1,1,1,row.length);range.setNumberFormat('@');range.setValues([row]);
    SpreadsheetApp.flush();
    // A CRM/reporting failure never changes a confirmed submission receipt.
    try{if(typeof reconcileCrm_==='function')reconcileCrm_(kind);}catch(error){props.setProperty('CRM_ERROR_'+kind,'Reconciliation pending');}
    cache.put('saved:'+token,fingerprint,3600);
    return {ok:true,reference:data.requestId};
  });
}
function safeCell_(value) {var text=String(value);return /^[\s]*[=+\-@]/.test(text)?"'"+text:text;}
function validate_(raw) {
  if(!raw||typeof raw!=='object'||Array.isArray(raw)) throw new Error('Invalid enquiry.');
  function text(key,max,required){if(typeof raw[key]!=='string') {if(!required&&raw[key]==null)return '';throw new Error('Invalid '+key);} var value=raw[key].trim();if(value.length>max||(required&&!value))throw new Error('Invalid '+key);return value;}
  var data={requestId:text('requestId',36,true),fullName:text('fullName',100,true),email:text('email',180,true),phone:text('phone',30,true),college:text('college',160,true),degree:text('degree',100,true),year:text('year',40,true),experience:text('experience',50,true),delivery:text('delivery',30,true),question:text('question',2000,false)};
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||raw.consent!==true||raw.website)throw new Error('Invalid enquiry.');
  if(!/^[+0-9 ().-]+$/.test(data.phone)||data.phone.replace(/\D/g,'').length<7||data.phone.replace(/\D/g,'').length>15)throw new Error('Invalid mobile number.');
  var choices={year:['1st year','2nd year','3rd year','4th year or later','Recently graduated','Working professional','Job seeker','Leadership / business role','Other'],experience:['New to programming','Know a few basics','Have built small projects','Experienced software engineer','Prefer a non-coding leadership track'],delivery:['Online','In person','Flexible']};
  Object.keys(choices).forEach(function(key){if(choices[key].indexOf(data[key])<0)throw new Error('Invalid '+key);});
  var interests=['Machine Learning','Full-Stack Development','Forward Deployment Engineering for Leaders','Space Technology and Satellite Systems','Forward Deployment Engineering','Python and full stack','AI Engineering Training Internship','RAG and document assistants','AI agents','DSA and interviews'];
  if(!Array.isArray(raw.interests)||raw.interests.length>interests.length||raw.interests.some(function(x){return interests.indexOf(x)<0;}))throw new Error('Invalid interests.');
  data.interests=Array.from(new Set(raw.interests));acceptPolicies_(raw,data);return data;
}

function allowedOrigin_(origin) {
 var p=PropertiesService.getScriptProperties(),configured=p.getProperty('SITE_ORIGIN');
 var local=p.getProperty('PROTOTYPE_MODE')!=='false'&&(origin==='http://127.0.0.1:4322'||origin==='http://localhost:4322');
 // Exact review origins for height/receipt messages only; never transmit entered fields.
 var review=origin==='http://127.0.0.1:4398'||origin==='https://test.samkhyaacademy.com';
 return local||review||(configured&&origin===configured)?origin:'';
}

var TERMS_VERSION_='2026-09-11-v1',PRIVACY_VERSION_='2026-09-11-v3';
function acceptPolicies_(raw,data){
 if(raw.termsAccepted!==true||raw.consent!==true||raw.termsVersion!==TERMS_VERSION_||raw.privacyVersion!==PRIVACY_VERSION_)throw new Error('Please review and accept the current terms and privacy notice.');
 data.termsVersion=TERMS_VERSION_;data.privacyVersion=PRIVACY_VERSION_;
}
