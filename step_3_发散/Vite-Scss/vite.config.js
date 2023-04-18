import { defineConfig } from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  }
});
