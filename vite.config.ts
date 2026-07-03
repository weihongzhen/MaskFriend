import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  base: '/MaskFriend/',
    server: {
      proxy: {
        '/api': {
        target: 'https://ws-d8ze7gqhycwsltbd.cn-beijing.maas.aliyuncs.com',
      changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/compatible-mode'),
    },
    },
  },
})
