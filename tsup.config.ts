import { cpSync, copyFileSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'tsup';

const isProd = process.env.NODE_ENV === 'production';

function copyBoilerplate() {
  const src = join(__dirname, 'src', 'bin', 'quickstart_app');
  const dest = join(__dirname, 'dist', 'bin', 'quickstart_app');

  cpSync(src, dest, { recursive: true });
  console.log('Boilerplate copied successfully');
}

function copyFiles() {
  try {
    copyFileSync(
      resolve('package.json'),
      resolve('dist/package.json'),
    );
    copyFileSync(resolve('README.md'), resolve('dist/README.md'));
    copyFileSync(resolve('LICENSE'), resolve('dist/LICENSE'));
    console.log('Files copied successfully');
  } catch (err) {
    console.error('Error copying files:', err);
  }
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
    onSuccess: async () => {
      try {
        copyFiles();
      } catch (error) {
        console.error(error);
      }
    },
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
