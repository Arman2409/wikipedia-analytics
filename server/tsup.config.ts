import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server.ts'],         // Entry point of your app
  outDir: 'dist',               // Output directory
  format: ['esm', 'cjs'],       // Output formats
  target: 'node18',             // Your Node.js version
  sourcemap: true,              // Optional: enable sourcemaps
  clean: true,                  // Clean dist before build
});
