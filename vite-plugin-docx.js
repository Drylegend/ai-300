import fs from 'node:fs';
import path from 'node:path';
import mammoth from 'mammoth';

/**
 * Vite plugin to auto-convert .docx files to HTML at build time using Mammoth.
 * - Extracts embedded images as inline base64 data URIs by default.
 * - Leaves `?url` queries alone so Vite can bundle the original .docx file for downloads.
 * - Handles errors gracefully with console warnings without breaking the build.
 */
export default function vitePluginDocx() {
  return {
    name: 'vite-plugin-docx',
    enforce: 'pre',

    async load(id) {
      // Split ID to separate file path and query parameters
      const [filePath, query] = id.split('?');

      // Only process .docx files
      if (!filePath.toLowerCase().endsWith('.docx')) {
        return null;
      }

      // If imported with ?url, let Vite's asset handling handle it (for downloads)
      if (query === 'url') {
        return null;
      }

      try {
        if (!fs.existsSync(filePath)) {
          return null;
        }

        // Inform Vite dev server to watch this file for changes
        this.addWatchFile(filePath);

        const buffer = await fs.promises.readFile(filePath);
        const result = await mammoth.convertToHtml({ buffer });

        if (result.messages && result.messages.length > 0) {
          for (const msg of result.messages) {
            if (msg.type === 'warning') {
              console.warn(`[vite-plugin-docx] Warning in ${path.basename(filePath)}: ${msg.message}`);
            }
          }
        }

        const html = result.value || '';
        return `export default ${JSON.stringify(html)};`;
      } catch (err) {
        console.warn(`[vite-plugin-docx] Failed to convert ${filePath}: ${err.message}`);
        // Fallback to empty string so build does not break
        return `export default "";`;
      }
    },
  };
}
