#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLS_ROOT = path.join(__dirname, '..');

async function main() {
  const logo = `
 ${chalk.cyan('██╗')}${chalk.magenta('███████╗')}${chalk.cyan('████████╗')}${chalk.magenta('███╗   ███╗')}
 ${chalk.cyan('██║')}${chalk.magenta('██╔════╝')}╚══${chalk.cyan('██╔')}══╝${chalk.magenta('████╗ ████║')}
 ${chalk.cyan('██║')}${chalk.magenta('███████╗')}   ${chalk.cyan('██║')}   ${chalk.magenta('██╔████╔██║')}
 ${chalk.cyan('██║')}╚════${chalk.magenta('██║')}   ${chalk.cyan('██║')}   ${chalk.magenta('██║')}╚██╔╝${chalk.cyan('██║')}
 ${chalk.cyan('██║')}${chalk.magenta('███████║')}   ${chalk.cyan('██║')}   ${chalk.magenta('██║')} ╚═╝ ${chalk.cyan('██║')}
 ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝
   ${chalk.bold.white('S   K   I   L   L   S')}
  `;
  
  console.log(logo);
  console.log(chalk.dim('   The master context orchestrator for AI coding agents.\n'));

  // Step 1: Harness Detection (Auto-detect default)
  const cwd = process.cwd();
  let autoDetectedHarness = '.cursorrules';
  try {
    const files = await fs.readdir(cwd);
    if (files.includes('.gemini')) autoDetectedHarness = 'GEMINI.md';
    if (files.includes('.claude')) autoDetectedHarness = 'CLAUDE.md';
    if (files.includes('.windsurf')) autoDetectedHarness = '.windsurfrules';
  } catch (err) {}

  // Step 2: The Core Interview
  const response = await prompts([
    {
      type: 'select',
      name: 'targetHarness',
      message: 'Which AI Agent Harness are you targeting?',
      choices: [
        { title: `Auto-Detect (${autoDetectedHarness})`, value: 'auto' },
        { title: 'Cursor', description: '.cursorrules', value: '.cursorrules' },
        { title: 'Windsurf', description: '.windsurfrules', value: '.windsurfrules' },
        { title: 'Claude Code', description: 'CLAUDE.md', value: 'CLAUDE.md' },
        { title: 'Gemini Antigravity CLI', description: 'GEMINI.md', value: 'GEMINI.md' },
        { title: 'Roo Code / Cline', description: '.clinerules', value: '.clinerules' },
        { title: 'GitHub Copilot', description: 'copilot-instructions.md', value: '.github/copilot-instructions.md' },
        { title: 'OpenAI Codex', description: 'CODEX.md', value: 'CODEX.md' },
        { title: 'Opencode', description: 'OPENCODE.md', value: 'OPENCODE.md' }
      ]
    },
    {
      type: 'select',
      name: 'strategy',
      message: 'How should we initialize the architecture?',
      choices: [
        { title: 'Greenfield', description: 'Start fresh from a prompt (Interactive)', value: 'greenfield' },
        { title: 'Brownfield', description: 'Reverse-engineer the existing codebase', value: 'brownfield' }
      ]
    },
    {
      type: 'confirm',
      name: 'installWorkflow',
      message: 'Install Day-to-Day Workflow Commands (/audit, /debug)?',
      initial: true
    }
  ]);

  if (!response.strategy) {
    console.log(chalk.red('Installation cancelled.'));
    process.exit(1);
  }

  console.log(chalk.cyan('\n⚙ Installing blueprints...'));

  const targetDir = cwd;
  const contextDir = path.join(targetDir, '.istm-context');
  const harness = response.targetHarness === 'auto' ? autoDetectedHarness : response.targetHarness;
  
  // SKILL.md will be handled by the workflow installer or placed in a skills folder
  const skillPath = path.join(SKILLS_ROOT, 'istm-architecture', 'SKILL.md');
  const targetSkillDir = path.join(targetDir, '.istm-workflow', 'istm-architecture');
  try {
    await fs.mkdir(targetSkillDir, { recursive: true });
    await fs.copyFile(skillPath, path.join(targetSkillDir, 'SKILL.md'));
  } catch (err) {}

  // Step 4: Inject the Pillars (Pure Installer Mode)
  console.log(chalk.green(`✓ Scaffolding .istm-context/`));
  try {
    await fs.mkdir(contextDir, { recursive: true });
  } catch (err) {}

  const templatesDir = path.join(SKILLS_ROOT, 'istm-architecture', 'templates');
  const pillars = ['project-overview.md', 'architecture.md', 'design.md']; // agents.md handled separately

  for (const pillar of pillars) {
    console.log(chalk.dim(`  - Dropping ${pillar}`));
    try {
      const templatePath = path.join(templatesDir, pillar);
      const content = await fs.readFile(templatePath, 'utf-8');
      await fs.writeFile(path.join(contextDir, pillar), content);
    } catch (err) {
      console.log(chalk.red(`  ✗ Failed to drop ${pillar}: ${err.message}`));
    }
  }

  // Handle agents.md renaming
  console.log(chalk.green(`✓ Linking context rules to ${chalk.bold(harness)}`));
  try {
    const agentsTemplate = await fs.readFile(path.join(templatesDir, 'agents.md'), 'utf-8');
    await fs.writeFile(path.join(targetDir, harness), agentsTemplate);
  } catch (err) {
    console.log(chalk.red(`  ✗ Failed to generate ${harness}: ${err.message}`));
  }

  // Step 5: Workflow Injection
  if (response.installWorkflow) {
    console.log(chalk.green(`✓ Installing workflow commands (/audit, /debug)`));
    const workflowSource = path.join(SKILLS_ROOT, 'istm-workflow');
    const workflowTarget = path.join(targetDir, '.istm-workflow');
    try {
      // Basic directory copy (Node 16.7+)
      await fs.cp(workflowSource, workflowTarget, { recursive: true });
    } catch (err) {
      console.log(chalk.yellow(`  ⚠ Workflow directory not copied (make sure istm-workflow exists).`));
    }
  }

  console.log(chalk.bold.magenta('\n✨ Initialization Complete!'));
  console.log(`Your AI is now operating under the ${chalk.bold('istmX')} architecture.`);
  console.log(chalk.dim(`Note: We generated ${chalk.bold('.istm-context/agents.md')}. Most agents support this natively.`));
  console.log(chalk.dim(`If your AI requires a specific name (like AGENTS.md or context.md), you can safely rename it.\n`));
}

main().catch(err => {
  console.error(chalk.red('Error during installation:'), err);
  process.exit(1);
});
