import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  // ... other config options ...
  integrations: [react()],
});