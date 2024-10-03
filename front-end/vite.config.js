import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

// import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
// console.log(process.env.VITE_GOOGLE_KEY);
console.log(process.env.VITE_ENV);
export default defineConfig({
  plugins: [
    react(),
    // eslint()
  ],
  server: {
    port: 5004,
    host: true,
    hmr: {
      protocol: process.env.VITE_ENV == "development" ? "ws" : "wss",
      host:
        process.env.VITE_ENV == "development"
          ? "localhost"
          : "blog.production-server.tech",
    },
  },

  css: {
    devSourcemap: process.env.VITE_ENV != "development",
  },
});
