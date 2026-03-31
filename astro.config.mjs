import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  experimental: {
    fonts: [{  // 👈 fonts vai dentro de experimental, não fora
      provider: fontProviders.fontsource(),
      name: "Lexend",
      cssVariable: "--font-lexend",
    }],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: cloudflare(),
});