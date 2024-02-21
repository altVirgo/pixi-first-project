import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
// import { createStyleImportPlugin } from "vite-plugin-style-import";
// import viteCompression from "vite-plugin-compression";
// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode, "./");
  console.log(env);
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            BUILD_DATE: new Date().toLocaleString("chinese", { hour12: false }),
            FAVICON: `./favicon.png`,
          },
        },
      }),
    ],
    build: {
      outDir: "dist",
      rollupOptions: {
        output: {
          chunkFileNames: ({ name }) => {
            return name.includes("ezuikit") ? `assets/[name].js` : `assets/[name]-[hash].js`;
          },
          manualChunks: (id) => {
            if (id.toString().includes("ezuikit-js/")) {
              return id.toString().split("ezuikit-js/")[1].split(".")[0].toString();
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
        },
      },
    },
    server: {
      port: 8080,
      host: "0.0.0.0",
      proxy: {
        "/app-api": {
          target: "http://124.222.207.17:48080/",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
