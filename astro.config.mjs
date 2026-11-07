import { defineConfig } from 'astro/config';

// Every page is prerendered. The finished site is just HTML, CSS, images and a
// small progressive-enhancement script; no application server is required.
export default defineConfig({
  site: 'https://www.twoharbours.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: ['.e2b.app', 'localhost', '127.0.0.1'],
    },
  },
});
