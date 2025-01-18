import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000/",
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
