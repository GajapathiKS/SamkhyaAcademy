import { spawnSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const env = { ...process.env, SAMKHYA_STAGE: 'test' };
for (const args of [['scripts/prepare-enquiry.mjs'], ['node_modules/astro/bin/astro.mjs', 'build'], ['scripts/prepare-social.mjs'], ['scripts/verify.mjs']]) {
  const result = spawnSync(process.execPath, args, { env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
appendFileSync('dist-test/.htaccess', '\n# Test site: do not index any response, including non-HTML assets.\n<IfModule mod_headers.c>\n  Header always set X-Robots-Tag "noindex, nofollow, noarchive"\n</IfModule>\n');
appendFileSync('dist-test/.htaccess', '\n# Dedicated staging host has a validated AutoSSL certificate.\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{HTTPS} !=on\n  RewriteCond %{REQUEST_URI} !^/\\.well-known/acme-challenge/\n  RewriteRule ^ https://test.samkhyaacademy.com%{REQUEST_URI} [R=301,L]\n</IfModule>\n');
assert.match(readFileSync('dist-test/robots.txt', 'utf8'), /Disallow: \//);
assert(!readFileSync('dist-test/sitemap.xml', 'utf8').includes('<loc>'));
assert.match(readFileSync('dist-test/index.html', 'utf8'), /https:\/\/test\.samkhyaacademy\.com\//);
console.log('Test deployment built in dist-test; production dist remains untouched.');
