import { defineConfig } from 'vite';

/**
 * Plain multi-file dev/build config — no single-file plugin, no custom SVG pipeline. Those
 * existed only for the designed UI's own artwork and the standalone site's single-document
 * deploy; the simple kit needs neither, and this example is a normal Vite app either way.
 */
export default defineConfig({});
