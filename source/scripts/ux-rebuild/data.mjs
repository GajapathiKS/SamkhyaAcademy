import {marketing,brochureRoutes,courseScreens} from './marketing.mjs';
export const additions = [
 [96,'Create a learner account','Authentication'],[97,'Log in and resume','Authentication'],[98,'Reset password request','Authentication'],[99,'Email verification confirmation','Authentication'],
 [100,'Catalog filtered results','Discovery'],[101,'Compare learning paths','Discovery'],[102,'Full Stack curriculum and delivery','Program'],[103,'Free enrollment confirmation','Commercial'],[104,'Preview limit and upgrade','Commercial'],[105,'Private course invitation','Commercial'],[106,'Organization course entitlement','Commercial'],
 [107,'Hybrid course schedule','Learning'],[108,'Offline session and attendance','Learning'],[109,'Course completion checklist','Learning'],[110,'Exam retry and improvement plan','Exam'],[111,'Certificate verification not found','Certificate'],
 [112,'C exercise compile and run','Learning'],[113,'C++ vectors practice','Learning'],[114,'DSA breadth-first search completed','Learning'],[115,'DSA checkpoint explanation','Learning'],
 [116,'Idea intake audience step','Venture'],[117,'Idea intake solution step','Venture'],[118,'Idea intake market step','Venture'],[119,'Idea intake team step','Venture'],[120,'Idea intake review and submit','Venture'],
 [121,'Artifact version history','Venture'],[122,'Artifact upload and validation','Venture'],[123,'Mentor assignment and availability','Venture'],[124,'Stage review decision','Venture'],[125,'Venture team invitation','Venture'],
 [126,'Organization invitation preview','Organization'],[127,'Organization invitation accepted','Organization'],[128,'Seat allocation and capacity','Organization'],[129,'Learner progress detail','Organization'],[130,'Organization report export','Organization'],
 [131,'Content review submission','CMS'],[132,'Content returned with feedback','CMS'],[133,'Protected setting comparison','CMS'],[134,'Publish validation issues','CMS'],[135,'Published version receipt','CMS'],[136,'Employee roles and permissions','CMS'],[137,'Author and reviewer audit history','CMS'],
 [138,'Payment failed and retry','Payment'],[139,'Private offer expired','Payment'],[140,'Campaign consent exclusions','Operations'],[141,'Email preview and console receipt','Operations'],[142,'Webinar registration confirmation','Public'],[143,'Brochure ready to download','Public'],[144,'Blog discussion reply','Editorial'],[145,'Catalog no matching results','Discovery']
];
additions.push([146,'Investor network and founder introductions','Venture'],[147,'Investor profile and access request','Venture'],[148,'Investor application received','Venture'],[149,'Consented venture showcase','Venture'],[150,'Investor introduction request','Venture'],[151,'Introduction request receipt','Venture'],[152,'Founder pitch visibility and sharing','Venture'],[153,'Idea admissions review queue','Venture'],[154,'Idea review and decision','Venture'],[155,'Idea accepted and stage unlocked','Venture'],[156,'Idea changes requested and resubmission','Venture'],[157,'Founder introduction requests','Venture'],[158,'Course brochure library','Public']);
for(const [slug,[gate,ready]] of Object.entries(brochureRoutes)){if(gate===43)continue;const name=slug.replaceAll('-',' ');additions.push([gate,`${name} brochure request`,'Brochure'],[ready,`${name} PDF download`,'Brochure']);}
export const courseIds={4:'ai-engineering',5:'applied-ml-engineering',6:'full-stack',11:'ai-leadership',12:'space-tech',13:'data-analytics',14:'cybersecurity',15:'javascript-foundations',16:'applied-ml-engineering',17:'ai-engineering',86:'c-programming-fundamentals',88:'cpp-essentials',90:'data-structures-algorithms',102:'full-stack'};
export const courseIcons={4:'Bot',5:'BrainCircuit',6:'Code2',11:'Compass',12:'Orbit',13:'ChartNoAxesCombined',14:'ShieldCheck',15:'FileCode2',16:'BrainCircuit',17:'Bot',86:'Terminal',88:'Braces',90:'Network',102:'Code2'};
export const ventureSteps=['Idea & Opportunity','Customer Validation','Business Model','MVP Build','Pilot Launch','Traction & Learning','Scale & Production'];
export const names=['Aarav Rao','Priya Sharma','Arjun Nair','Meera Iyer','Sneha Kapoor','Raghav Bansal','Kiran Shah'];
export function family(n){
 if(n===183)return 'brochure';
 if(n>=146)return n===158||(n>=159&&n<=180)?'brochure':'venture';
 if(n===1)return 'home';
 if([2,85,100,145].includes(n))return 'catalog';
 if([3,101].includes(n))return 'paths';
 if(courseIds[n])return 'program';
 if(n===9)return 'venture-landing';
 if([10,73,116,117,118,119,120].includes(n))return 'intake';
 if([96,97,98,99].includes(n))return 'auth';
 if([43,44,50,51,52,103,104,105,106,138,139,142,143].includes(n))return 'commercial';
 if([59,60,144].includes(n))return 'blog';
 if([21,22,23,24,109,110,111].includes(n))return 'exam';
 if([7,8,20,53,54,55,56,57,58,65,66,67,68,69,70,71,72,82,83,84,87,89,91,92,107,108,112,113,114,115].includes(n))return 'lesson';
 if([25,26,27,28,74,75,76,77,78,79,80,81,121,122,123,124,125].includes(n))return 'venture';
 if([40,41,42,126,127,128,129,130].includes(n))return 'organization';
 if([45,46,47,48,49,140,141].includes(n))return 'operations';
 if([18,19].includes(n))return 'learner';
 return 'admin';
}
export const primary = {1:2,2:4,3:101,4:43,5:16,6:102,7:84,8:67,9:10,10:116,11:43,12:43,13:43,14:43,15:96,16:53,17:51,18:7,19:109,20:7,21:22,22:23,23:24,24:18,25:26,26:77,27:79,28:80,29:124,30:31,31:32,32:33,33:94,34:35,35:61,36:21,37:60,38:44,39:123,40:41,41:126,42:129,43:143,44:142,45:46,46:50,47:49,48:141,49:140,50:51,51:52,52:7,53:54,54:55,55:67,56:54,57:58,58:54,59:60,60:144,61:62,62:131,63:54,64:58,65:54,66:72,67:57,68:54,69:54,70:54,71:54,72:67,73:116,74:81,75:26,76:77,77:27,78:79,79:77,80:75,81:26,82:83,83:84,84:54,85:86,86:96,87:112,88:96,89:113,90:51,91:114,92:115,93:131,94:133,95:135,96:99,97:18,98:97,99:103,100:4,101:6,102:16,103:87,104:51,105:103,106:7,107:108,108:53,109:21,110:22,111:24,112:67,113:67,114:115,115:92,116:117,117:118,118:119,119:120,120:74,121:122,122:77,123:81,124:80,125:81,126:127,127:106,128:41,129:130,130:40,131:95,132:62,133:95,134:62,135:7,136:137,137:94,138:51,139:4,140:141,141:47,142:18,143:4,144:60,145:2};
export const titles = {
 7:'Full-Stack Development Bootcamp',18:'Welcome back, Priya',19:'Your learning progress',25:'Venture Workflow & Stage Progress',26:'Artifacts & Launch Readiness',27:'Mentor Review & Feedback',30:'Academy overview',31:'Courses & learning experiences',40:'Organization Dashboard',45:'Leads & follow-ups',53:'Full-Stack Development Bootcamp',54:'Build a responsive profile card',81:'AgriPulse',82:'Full-Stack Development Bootcamp',83:'Full-Stack Development Bootcamp',87:'C Programming Fundamentals',89:'C++ Essentials',91:'Breadth-first search',92:'Linked lists: insert and remove',94:'Protected setting requests',95:'Review & publishing',112:'C: arrays and pointers',113:'C++: working with vectors'};
additions.push([181,'Accepted idea: Stage 1 workspace','Venture'],[182,'Stage 1 evidence submitted for review','Venture']);
Object.assign(primary,{146:147,147:148,148:149,149:150,150:151,151:157,152:157,153:154,154:155,155:181,156:74,157:152,158:43,181:182,182:181});
additions.push([183,'Learning formats, practice and certification hub','Learning']);
primary[183]=87;
for(const [slug,n] of Object.entries(courseScreens))primary[n]=brochureRoutes[slug][0];
for(const [slug,[gate,ready]] of Object.entries(brochureRoutes)){primary[gate]=ready;primary[ready]=slug==="entrepreneurship"?9:({ "ai-leadership":11,"applied-ml-engineering":5,"full-stack":6,"data-analytics":13,"cybersecurity":14,"space-tech":12,"c-programming-fundamentals":86,"cpp-essentials":88,"javascript-foundations":15,"data-structures-algorithms":90}[slug]||4);}
