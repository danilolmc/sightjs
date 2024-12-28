import { existsSync } from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import { projectData } from './index.js';

export async function asksForProjectName() {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Project name: ',
    default: 'app-project',
  });

  projectData.name = answer.name;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const boilerPlatePath = path.resolve(__dirname, 'quickstart_app');

  if (!existsSync(boilerPlatePath)) {
    console.error(`Boilerplate directory not found: ${boilerPlatePath}`);
    return;
  }

  const folderPath = process.cwd();
  projectData.projectPath = `${folderPath}/${projectData.name}`;
}
