import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import license from 'rollup-plugin-license';
import { fileURLToPath } from 'url';
import path from 'path';
import mdx from 'vite-plugin-mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    mdx.default({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings.bind(undefined, { behavior: 'prepend' }),
        rehypeHighlight.bind(undefined, { subset: false }),
      ],
    }),
  ],

  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      plugins: [
        license({
          sourcemap: true,
          thirdParty: {
            includePrivate: true,
            output: {
              file: path.join(dirname, 'dist', 'dependencies.txt'),
            },
          },
        }),
      ],
    },
  },
});
