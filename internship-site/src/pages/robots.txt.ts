import { site } from '../../site.config.mjs';
export function GET() {
  const previewBots = ['WhatsApp', 'facebookexternalhit', 'Facebot', 'Twitterbot', 'LinkedInBot'];
  const previewRules = previewBots.map(bot => `User-agent: ${bot}\nAllow: /\n`).join('\n');
  const rules = site.domain && !site.staging && site.indexingApproved
    ? `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`
    : `${site.staging ? '' : previewRules + '\n'}User-agent: *\nDisallow: /\n`;
  return new Response(rules, { headers: { 'Content-Type': 'text/plain' } });
}
