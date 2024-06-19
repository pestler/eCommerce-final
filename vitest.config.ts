import { defineConfig } from 'vite'

export default defineConfig({  
    test: {
        globals: true,
        // root: fileURLToPath(new URL("./", import.meta.url)),
        coverage: {
            provider: "v8",
        },
        environment: 'jsdom',
        setupFiles: './test-setup/setup.ts',
        include: ['**/*.test.?(c|m)[jt]s?(x)']
    }
})



