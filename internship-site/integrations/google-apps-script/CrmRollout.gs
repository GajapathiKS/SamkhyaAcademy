
function setupAcademyCrms(){
 CRM_CONTEXT_KIND_='program';setupCrm();
 var p=PropertiesService.getScriptProperties();
 if(!p.getProperty('VENTURE_SPREADSHEET_ID')){
 var b=SpreadsheetApp.create('SamkhyaAcademy — Venture Ideas'),s=b.getSheets()[0];s.setName('Source Responses');s.appendRow(['Received (UTC)','Reference','Full name','Email','Phone','Organisation','Idea title','Founder stage','Team','Problem','Users','Approach','Evidence','Support','Public link','Brief acknowledgement','Mode','Terms version','Privacy version','Accepted UTC','Terms acknowledgement','Processing consent']);p.setProperty('VENTURE_SPREADSHEET_ID',b.getId());p.setProperty('VENTURE_SOURCE_SHEET','Source Responses');
 }
 CRM_CONTEXT_KIND_='venture';setupCrm();CRM_CONTEXT_KIND_='program';
 console.log('Program CRM: https://docs.google.com/spreadsheets/d/'+p.getProperty('SPREADSHEET_ID')+'/edit');console.log('Venture CRM: https://docs.google.com/spreadsheets/d/'+p.getProperty('VENTURE_SPREADSHEET_ID')+'/edit');
}
function refreshProgramCrm(){CRM_CONTEXT_KIND_='program';refreshCrm();}
function refreshVentureCrm(){CRM_CONTEXT_KIND_='venture';refreshCrm();}
