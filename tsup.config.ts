import { cpSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'tsup';

const isProd = process.env.NODE_ENV === 'production';

function copyBoilerplate() {
  const src = join(__dirname, 'src', 'bin', 'quickstart_app');
  const dest = join(__dirname, 'dist', 'bin', 'quickstart_app');

  cpSync(src, dest, { recursive: true });
  console.log('Boilerplate copied successfully');
}

export default defineConfig([
  {
    entry: ['src/lib/**/!(types).ts'],
    sourcemap: !isProd,
    clean: true,
    outDir: 'dist/lib',
    format: ['esm'],
    dts: true,
    minify: isProd,
  },
  {
    entry: ['src/bin/**/*.ts', '!src/bin/quickstart_app/**/*'],
    outDir: 'dist/bin',
    format: ['esm'],
    target: ['esnext'],
    clean: true,
    minify: isProd,
    onSuccess: async () => {
      try {
        copyBoilerplate();
      } catch (error) {
        console.error(error);
      }
    },
  },
]);
