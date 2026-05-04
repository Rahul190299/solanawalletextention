import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      react(),

      // Copy correct manifest
      viteStaticCopy({
        targets: [
          {
            src: isDev
              ? "public/manifest.dev.json"
              : "public/manifest.prod.json",
            dest: ".",
            rename: "manifest.json"
          }
        ]
      })
    ],

    build: {
      sourcemap: isDev,

      rollupOptions: {
        input: {
          popup: "index.html",
          background: "src/background/index.ts",
          content: "src/content/index.ts",
          injected: "src/injected/index.ts"
        },

        output: {
          entryFileNames: "[name].js"
        }
      }
    }
  };
});