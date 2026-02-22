import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
    server: {
        // Указываем нужный IP-адрес
        host: "127.0.0.1",
    },
});
