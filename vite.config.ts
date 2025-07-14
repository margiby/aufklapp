import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from './package.json';

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        build: {
            outDir: process.env.VITE_BUILD_PATH || "build",
            manifest: true,
            rollupOptions: {
                input: ["src/main.tsx", "./index.html"],
            },
        },
        server: {
            port: parseInt(process.env.VITE_PORT ?? ""),
        },
        base: process.env.VITE_BASENAME || "",
        plugins: [react()],
         define: {'import.meta.env.VITE_APP_VERSION':
             JSON.stringify(packageJson.version),
  },
    };
});

