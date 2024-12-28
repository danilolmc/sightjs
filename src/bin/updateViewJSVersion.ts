#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = resolve(__dirname, './quickstart_app/package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const version = process.env.VERSION;

if (packageJson.dependencies) {
  packageJson.dependencies.viewjs = `^${version}`;
} else {
  packageJson.dependencies = {
    viewjs: `^${version}`,
  };
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
