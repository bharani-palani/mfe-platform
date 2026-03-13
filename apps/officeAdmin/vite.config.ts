import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "officeAdminApp",
      filename: "remoteEntry.js",
      exposes: {},
      remotes: {},
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 4001,
    strictPort: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
