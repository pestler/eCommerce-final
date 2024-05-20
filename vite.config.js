import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import NodeModulesPolyfillPlugin from "@esbuild-plugins/node-modules-polyfill";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  define: {},
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      stream: 'stream-browserify',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup/setup.ts',
    include: ['**/*.test.?(c|m)[jt]s?(x)']
  }
})

