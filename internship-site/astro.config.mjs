import { defineConfig } from 'astro/config';
import { site } from './site.config.mjs';

export default defineConfig({
  ...(site.domain ? { site: site.domain } : {}),
  output: 'static',
  outDir: site.staging ? './dist-test' : './dist',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
