import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import chakraUiPlugin from "@chakra-ui/vite-plugin";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  // other configurations...
  // base: "/static/",
});
