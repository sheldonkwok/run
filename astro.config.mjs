import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: "server",
  redirects: {
    '/': {
      status: 307,
      destination: '/weather.png'
    }
  }
});
