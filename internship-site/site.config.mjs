// Public information only. Complete these fields before running launch:check.
const staging = process.env.SAMKHYA_STAGE === 'test';
export const site = {
  staging,
  beta: {
    enabled: true, // Set false and rebuild to remove the ribbon after the official launch.
    message: 'Official launch and full operations coming soon.',
  },
  ideaFormUrl: 'https://script.google.com/macros/s/AKfycbzxfP7lFRFFvuoI3TDXdeHPxp9MTgG32ijgiKEv7t3G2Fik8BLDkmctoIWVypUU7-9G/exec?form=venture', // Separate validated route and private response workbook
  termsVersion: '2026-09-11-v1',
  privacyVersion: '2026-09-11-v3',
  indexingApproved: false, // Owner release gate, independent of the build environment.
  enquiriesEnabled: true, // Production intake enabled and verified 14 September 2026.
  ventureIntakeEnabled: true,
  parentUrl: '', // Owner-verified Samkhya Technologies URL.
  legalEntity: '',
  privacyContact: '',
  policiesApproved: false,
  domainVerified: true,
  addressVerified: false,
  name: 'SamkhyaAcademy',
  domain: staging ? 'https://test.samkhyaacademy.com' : 'https://samkhyaacademy.com',
  email: 'contact@samkhyaacademy.com',
  phone: '+91 7019712730',
  whatsapp: '+91 7019712730',
  address: '',
  enquiryMode: 'custom',
  customFormUrl: 'https://script.google.com/macros/s/AKfycbzxfP7lFRFFvuoI3TDXdeHPxp9MTgG32ijgiKEv7t3G2Fik8BLDkmctoIWVypUU7-9G/exec', // Academy-owned production enquiry deployment
  customFormPrototype: false,
  enquirySecurityVerified: true, // Invisible CAPTCHA saves and production server limits verified 2026-09-11
  formEmbedUrl: '', // The previous client form was an example only
  formResponderUrl: '',
  organizationVerified: false,
  privacyVerified: false,
};
export const routes = ['/', '/programs/', '/about/', '/enquire/', '/privacy/', '/terms/', '/contact/', '/faqs/', '/venture-studio/', '/venture-studio/journey/', '/venture-studio/submit/', ...['ai-engineering-internship', 'forward-deployment-engineer', 'space-technology', 'machine-learning', 'full-stack-development', 'fde-for-leaders'].flatMap(slug => ['', 'curriculum/', 'projects/', 'career-preparation/'].map(section => `/programs/${slug}/${section}`))];
export const legacyRoutes = { '/internship/': '/programs/ai-engineering-internship/', '/curriculum/': '/programs/ai-engineering-internship/curriculum/', '/projects/': '/programs/ai-engineering-internship/projects/', '/career-preparation/': '/programs/ai-engineering-internship/career-preparation/' };
