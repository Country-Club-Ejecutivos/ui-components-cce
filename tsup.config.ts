import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  clean: true,
  external: ['react', 'next', 'lucide-react', 'radix-ui', 'class-variance-authority', 'clsx', 'tailwind-merge', 'cmdk', 'sonner'],
  banner: {
    js: '"use client";',
  },
})
