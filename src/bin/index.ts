#!/usr/bin/env node

import { Command } from 'commander';
import ora from 'ora';
import path from 'path';
import { asksForProjectName } from './asksForProjectName.js';
import { createProjectQuickstart } from './createProjectQuickstart.ts';
import { showBanner } from './showBanner.js';
import { execa } from 'execa';

export const LIBNAME = 'VistaJS';

process.stdin.on('keypress', (_, key) => {
  if (key.name === 'escape' || (key.ctrl && key.name === 'c')) {
    console.log('\n');
    console.log('\n');

    console.log(`${LIBNAME} CLI has been interrupted...`);

    process.exit(0);
  }
});

export type ProjectData = {
  name: string;
  projectPath: string;
};

export const projectData = {
  name: 'app-project',
  projectPath: path.join(process.cwd()),
} as ProjectData;

const program = new Command();

program
  .name(LIBNAME)
  .command('create')
  .description("Let's setup a new project")
  .action(async () => {
    await showBanner();

    console.log('\n');

    await asksForProjectName();

    const spinner = ora();

    try {
      spinner.start('Creating project...');

      await createProjectQuickstart(projectData);
      spinner.succeed('Project created!');

      spinner.start('Installing dependencies...');
      await execa('npm', ['install'], {
        cwd: `./${projectData.name}`,
        stdio: 'inherit',
      });
      spinner.succeed('Dependencies installed successfully!');

      console.log(
        `\nTo start your project, run: "cd ${projectData.name} && npm start"`,
      );
    } catch (error: unknown) {
      spinner.fail(`Error on creating project ${error}`);
    }
  });

try {
  program.parse(process.argv);
} catch (error) {
  console.error(error);
}
