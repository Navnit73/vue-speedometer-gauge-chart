// vite.config.ts
import { defineConfig } from "file:///C:/Users/navni/OneDrive/Desktop/vue%20speedometer/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/navni/OneDrive/Desktop/vue%20speedometer/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///C:/Users/navni/OneDrive/Desktop/vue%20speedometer/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\navni\\OneDrive\\Desktop\\vue speedometer";
var isDemo = process.env.BUILD_DEMO === "true";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    ...isDemo ? [] : [dts({
      include: ["src/**/*.ts", "src/**/*.vue"],
      outDir: "dist",
      insertTypesEntry: true
    })]
  ],
  build: isDemo ? {
    outDir: "dist"
  } : {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "VueAdvancedSpeedometer",
      formats: ["es", "cjs"],
      fileName: (format) => `vue-advanced-speedometer.${format === "es" ? "mjs" : "cjs"}`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" }
      }
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  ...isDemo ? { root: "demo" } : {}
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxuYXZuaVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHZ1ZSBzcGVlZG9tZXRlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbmF2bmlcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFx2dWUgc3BlZWRvbWV0ZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL25hdm5pL09uZURyaXZlL0Rlc2t0b3AvdnVlJTIwc3BlZWRvbWV0ZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuXG5jb25zdCBpc0RlbW8gPSBwcm9jZXNzLmVudi5CVUlMRF9ERU1PID09PSAndHJ1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIC4uLihpc0RlbW8gPyBbXSA6IFtkdHMoe1xuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi50cycsICdzcmMvKiovKi52dWUnXSxcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICB9KV0pLFxuICBdLFxuICBidWlsZDogaXNEZW1vID8ge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICB9IDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAnVnVlQWR2YW5jZWRTcGVlZG9tZXRlcicsXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+XG4gICAgICAgIGB2dWUtYWR2YW5jZWQtc3BlZWRvbWV0ZXIuJHtmb3JtYXQgPT09ICdlcycgPyAnbWpzJyA6ICdjanMnfWAsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7IHZ1ZTogJ1Z1ZScgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICB9LFxuICB9LFxuICAuLi4oaXNEZW1vID8geyByb290OiAnZGVtbycgfSA6IHt9KSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZVLFNBQVMsb0JBQW9CO0FBQzFXLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBS3pDLElBQU0sU0FBUyxRQUFRLElBQUksZUFBZTtBQUUxQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixHQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSTtBQUFBLE1BQ3JCLFNBQVMsQ0FBQyxlQUFlLGNBQWM7QUFBQSxNQUN2QyxRQUFRO0FBQUEsTUFDUixrQkFBa0I7QUFBQSxJQUNwQixDQUFDLENBQUM7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPLFNBQVM7QUFBQSxJQUNkLFFBQVE7QUFBQSxFQUNWLElBQUk7QUFBQSxJQUNGLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUNULDRCQUE0QixXQUFXLE9BQU8sUUFBUSxLQUFLO0FBQUEsSUFDL0Q7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ04sU0FBUyxFQUFFLEtBQUssTUFBTTtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsR0FBSSxTQUFTLEVBQUUsTUFBTSxPQUFPLElBQUksQ0FBQztBQUNuQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
