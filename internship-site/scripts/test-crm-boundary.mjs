import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const source=await fs.readFile('integrations/google-apps-script/IntakeCRM.gs','utf8');const publicFunctions=[...source.matchAll(/^function (\w+)\(/gm)].map(m=>m[1]).filter(n=>!n.endsWith('_'));assert.deepEqual(publicFunctions,[],'CRM administrative functions must not be exposed to google.script.run');
console.log('PASS intake boundary: no public CRM administration functions.');
