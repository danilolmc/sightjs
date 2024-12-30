import fs, { cpSync } from 'fs';
import path, { join } from 'path';
import { defineConfig } from 'tsup';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const isProd = process.env.NODE_ENV === 'production';

function copyBoilerplate() {
  const src = join(__dirname, 'src', 'bin', 'quickstart_app');
  const dest = join(__dirname, 'dist', 'bin', 'quickstart_app');

  cpSync(src, dest, { recursive: true });
  console.log('Boilerplate copied successfully');
}


export async function zipDist() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const rootDir = path.resolve(__dirname);
  const distDir = path.join(rootDir, 'dist');
  const zipFilePath = path.join(rootDir, 'tmp', 'dist.zip');

  if (!fs.existsSync(path.join(rootDir, 'tmp'))) {
    fs.mkdirSync(path.join(rootDir, 'tmp'));
  }

  if (fs.existsSync(zipFilePath)) {
    fs.unlinkSync(zipFilePath);
  }

  fs.copyFileSync(path.join(rootDir, 'package.json'), path.join(distDir, 'package.json'));
  fs.copyFileSync(path.join(rootDir, 'README.md'), path.join(distDir, 'README.md'));

  const assetsDir = path.join(rootDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const distAssetsDir = path.join(distDir, 'assets');
    fs.cpSync(assetsDir, distAssetsDir, { recursive: true });
  }

  const output = fs.createWriteStream(zipFilePath);

  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);

  archive.directory(distDir, false);

  await archive.finalize();
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
        await zipDist();
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
