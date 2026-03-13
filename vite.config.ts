import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

const isDemo = process.env.BUILD_DEMO === 'true'

export default defineConfig({
  plugins: [
    vue(),
    ...(isDemo ? [] : [dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      insertTypesEntry: true,
    })]),
  ],
  build: isDemo ? {
    outDir: 'dist',
  } : {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueAdvancedSpeedometer',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        `vue-advanced-speedometer.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  ...(isDemo ? { root: 'demo' } : {}),
})
