import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import docxPlugin from './vite-plugin-docx.js'

export default defineConfig({
  plugins: [
    docxPlugin(),
    react(),
    tailwindcss(),
  ],
  assetsInclude: ['**/*.docx'],
})
