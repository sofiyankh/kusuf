import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  start: {
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
    },
  },

  vite: {
    base: process.env.NODE_ENV === "production" ? "/kusuf/" : "/",
  },
});