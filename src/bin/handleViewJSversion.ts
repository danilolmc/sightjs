#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { ProjectData } from '@/bin/index.ts';

export function handleViewJSVersion(projectData: ProjectData) {
  const libPackageJsonPath = path.resolve('node_modules/viewjs/package.json');

  const packageJson = JSON.parse(fs.readFileSync(libPackageJsonPath, 'utf-8'));

  const libVersion = packageJson.version;

  const boilerplatePackageJsonPath = path.resolve(
    projectData.projectPath,
    'package.json',
  );

  const boilerplatePackageJson = JSON.parse(
    fs.readFileSync(boilerplatePackageJsonPath, 'utf-8'),
  );

  boilerplatePackageJson.dependencies = {
    ...boilerplatePackageJson.dependencies,
    viewjs: `^${libVersion}`,
  };

  fs.writeFileSync(
    boilerplatePackageJsonPath,
    JSON.stringify(boilerplatePackageJson, null, 2),
  );
}
