#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function findSkills() {
  const skills = [];
  for (const entry of await fs.readdir(ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const root = path.join(ROOT, entry.name);
    if (await exists(path.join(root, 'SKILL.md'))) skills.push({ name: entry.name, source: root });
    if (entry.name !== 'istm-workflow') continue;
    for (const workflow of await fs.readdir(root, { withFileTypes: true })) {
      if (!workflow.isDirectory()) continue;
      const source = path.join(root, workflow.name);
      if (await exists(path.join(source, 'SKILL.md'))) skills.push({ name: workflow.name, source });
    }
  }
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

async function main() {
  const cwd = process.cwd();
  const entries = await fs.readdir(cwd);
  let detected = null;
  if (process.env.TERM_PROGRAM === 'cursor' || entries.includes('.cursor')) detected = '.cursorrules';
  else if (process.env.TERM_PROGRAM === 'Windsurf' || entries.includes('.windsurf')) detected = '.windsurfrules';
  else if (entries.includes('.gemini')) detected = 'GEMINI.md';
  else if (entries.includes('.claude')) detected = 'CLAUDE.md';
  else if (entries.includes('.cline')) detected = '.clinerules';

  const harnesses = [
    { title: 'Claude Code (CLAUDE.md)', value: 'CLAUDE.md' },
    { title: 'Codex / OpenCode (AGENTS.md)', value: 'AGENTS.md' },
    { title: 'Gemini (GEMINI.md)', value: 'GEMINI.md' },
    { title: 'Cursor (.cursorrules)', value: '.cursorrules' },
    { title: 'Windsurf (.windsurfrules)', value: '.windsurfrules' },
    { title: 'Cline / Roo Code (.clinerules)', value: '.clinerules' },
    { title: 'GitHub Copilot', value: '.github/copilot-instructions.md' }
  ].map(option => ({ ...option, selected: option.value === detected }));

  const skillList = await findSkills();
  const response = await prompts([
    { type: 'select', name: 'harness', message: 'Choose an agent integration', choices: harnesses },
    { type: 'multiselect', name: 'skills', message: 'Choose skills to install', instructions: false, min: 1,
      choices: skillList.map(skill => ({ title: skill.name, value: skill.name })) }
  ]);
  if (!response.harness || !response.skills?.length) {
    console.log(chalk.yellow('Installation cancelled.'));
    process.exitCode = 1;
    return;
  }

  let target = path.join(cwd, '.agents', 'skills');
  if (response.harness === '.cursorrules') target = path.join(cwd, '.cursor', 'rules');
  else if (response.harness === 'GEMINI.md') target = path.join(cwd, '.gemini', 'skills');
  else if (response.harness === '.windsurfrules') target = path.join(cwd, '.windsurf', 'rules');
  else if (response.harness === '.clinerules') target = path.join(cwd, '.clinerules', 'skills');
  else if (response.harness === '.github/copilot-instructions.md') target = path.join(cwd, '.github', 'skills');

  await fs.mkdir(target, { recursive: true });
  for (const name of response.skills) {
    const skill = skillList.find(item => item.name === name);
    if (!skill) continue;
    await fs.cp(skill.source, path.join(target, name), { recursive: true, force: true });
    console.log(chalk.green(`Installed ${name}`));
  }
  console.log(chalk.bold(`\nInstalled ${response.skills.length} skill(s) for ${response.harness}.`));
}

main().catch(error => {
  console.error(chalk.red('Installation failed:'), error);
  process.exitCode = 1;
});
