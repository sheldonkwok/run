import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  redirects: {
    '/': {
      status: 307,
      destination: '/weather.png'
    }
  },
  adapter: vercel({
    edgeMiddleware: true
  }),
});
