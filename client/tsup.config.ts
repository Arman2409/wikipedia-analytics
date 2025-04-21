import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist/js',
  format: ['iife'], 
  target: 'esnext',      
  sourcemap: true,
  clean: true,
  minify: true,
  bundle: true,
  platform: 'browser',
});