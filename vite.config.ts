import React from "@vitejs/plugin-react-swc"
import UnoCSS from "unocss/vite"
import { defineConfig, loadEnv } from "vite"
import NitroDeploy from "vite-plugin-nitro-deploy"
import TsconfigPaths from "vite-tsconfig-paths"

const env = loadEnv(process.env["NODE_ENV"] ?? "development", process.cwd())

const proxyPath = env["VITE_PROXY_PATH"]
const proxyTarget = env["VITE_PROXY_TARGET"]

if (!proxyPath || !proxyTarget) {
  throw new Error("VITE_PROXY_PATH or VITE_PROXY_TARGET is not set")
}

export default defineConfig({
  plugins: [
    TsconfigPaths(),
    React({
      plugins: [
        [
          "@swc-jotai/debug-label",
          {
            atomNames: [
              "atomDark",
              "atomWithQuery",
              "atomWithSuspenseQuery",
              "atomWithLocation",
            ],
          },
        ],
        ["@swc-jotai/react-refresh", {}],
      ],
    }),
    UnoCSS(),
    NitroDeploy({
      nitro: {
        enabled: true,
      },
    }),
  ],
  server: {
    proxy: {
      [proxyPath]: {
        target: proxyTarget,
        secure: false,
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          zod: ["zod"],
        },
      },
    },
  },
})
