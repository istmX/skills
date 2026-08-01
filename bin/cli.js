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

  // Step 1: Harness Detection (Multi-Tier)
  const cwd = process.cwd();
  let autoDetectedHarness = '.cursorrules';
  
  // Tier 1: Check Integrated Terminal
  if (process.env.TERM_PROGRAM === 'cursor') autoDetectedHarness = '.cursorrules';
  if (process.env.TERM_PROGRAM === 'Windsurf') autoDetectedHarness = '.windsurfrules';
  
  // Tier 2: Check Directory Footprints
  try {
    const files = await fs.readdir(cwd);
    if (files.includes('.gemini')) autoDetectedHarness = 'GEMINI.md';
    if (files.includes('.claude')) autoDetectedHarness = 'CLAUDE.md';
    if (files.includes('.windsurf')) autoDetectedHarness = '.windsurfrules';
    if (files.includes('.cursor')) autoDetectedHarness = '.cursorrules';
    if (files.includes('.cline')) autoDetectedHarness = '.clinerules';
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
      name: 'coreSkill',
      message: 'Which Core Architecture Skill do you want to initialize?',
      choices: [
        { title: 'All the skills (God Mode)', description: 'istm', value: 'istm' },
        { title: 'A Full Stack App', description: 'istm-architecture', value: 'istm-architecture' },
        { title: 'Premium Awwwards Site', description: 'istm-awwward-designer', value: 'istm-awwward-designer' },
        { title: 'Backend / APIs Only', description: 'istm-system-design', value: 'istm-system-design' },
        { title: 'UI Tokens Only', description: 'istm-design', value: 'istm-design' },
        { title: 'Motion & Animation Only', description: 'istm-animate', value: 'istm-animate' },
        { title: 'Workflow Tools Only', description: 'Just install /istm-craft, /istm-debug, etc.', value: 'workflow-only' }
      ]
    }
  ]);

  if (!response.targetHarness) {
    console.log(chalk.red('Installation cancelled.'));
    process.exit(1);
  }

  console.log(chalk.cyan('\n⚙ Installing blueprints...'));

  const targetDir = cwd;
  const contextDir = path.join(targetDir, '.istm-context');
  const harness = response.targetHarness === 'auto' ? autoDetectedHarness : response.targetHarness;
  
  // Step 3: Inject the Orchestrator at the root
  if (response.coreSkill !== 'workflow-only') {
    console.log(chalk.green(`✓ Injecting Master Orchestrator into ${chalk.bold(harness)}`));
    const skillPath = path.join(SKILLS_ROOT, response.coreSkill, 'SKILL.md');
    const targetHarnessPath = path.join(targetDir, harness);
    try {
      await fs.copyFile(skillPath, targetHarnessPath);
    } catch (err) {
      console.log(chalk.yellow(`  ⚠ Could not copy SKILL.md. Ensure it exists in the package.`));
    }

    // Step 4: Inject the Pillars (Pure Installer Mode)
    console.log(chalk.green(`✓ Scaffolding .istm-context/`));
    try {
      await fs.mkdir(contextDir, { recursive: true });
    } catch (err) {}

    const agentsPath = path.join(contextDir, 'agents.md');
    const initialAgentsContent = `# @istmx/skills Runtime Memory\n\nThis file will be hydrated by the master orchestrator during the initial interview.`;
    try {
      await fs.writeFile(agentsPath, initialAgentsContent);
      console.log(chalk.dim(`  - Dropped blank agents.md`));
    } catch (err) {
      console.log(chalk.red(`  ✗ Failed to drop agents.md: ${err.message}`));
    }
  } else {
    console.log(chalk.dim(`✓ Skipping Core Orchestrator injection (Workflow tools only).`));
  }

  // Step 5: Native Workflow Injection (Enables Autocomplete popups)
  console.log(chalk.green(`✓ Bundling workflow commands for native IDE autocomplete (/istm-audit, /istm-debug)`));
  const workflowSource = path.join(SKILLS_ROOT, 'istm-workflow');
 
  let workflowTarget = path.join(targetDir, '.istm-workflow'); // fallback
  if (harness === '.cursorrules') workflowTarget = path.join(targetDir, '.cursor', 'rules');
  if (harness === 'GEMINI.md') workflowTarget = path.join(targetDir, '.gemini', 'skills');
  if (harness === '.windsurfrules') workflowTarget = path.join(targetDir, '.windsurf', 'rules');
  
  try {
    if (harness === '.cursorrules') {
      // Flatten into .mdc files for Cursor
      await fs.mkdir(workflowTarget, { recursive: true });
      const dirs = await fs.readdir(workflowSource, { withFileTypes: true });
      for (const dirent of dirs) {
        if (dirent.isDirectory()) {
          const skillFile = path.join(workflowSource, dirent.name, 'SKILL.md');
          const mdcFile = path.join(workflowTarget, `${dirent.name}.mdc`);
          try {
            await fs.copyFile(skillFile, mdcFile);
          } catch (e) {
            // ignore if SKILL.md doesn't exist
          }
        }
      }
    } else {
      // Standard folder copy for Gemini/others
      await fs.cp(workflowSource, workflowTarget, { recursive: true });
    }
  } catch (err) {
    console.log(chalk.yellow(`  ⚠ Workflow directory not copied (make sure istm-workflow exists).`));
  }

  console.log(chalk.bold.magenta('\n✨ Initialization Complete!'));
  console.log(`Your AI is now operating under the ${chalk.bold('istmX')} Architecture (${response.coreSkill}).`);
  
  console.log('\n' + chalk.bold('You are now in God Mode. Try your first prompt:'));
  console.log(chalk.cyan('> /istm build me a sleek dashboard\n'));
  
  console.log(chalk.bold('💡 PRO TIP:') + ' You also just unlocked the istm-workflow skillset!');
  console.log('Whenever you are stuck, use these commands instead of chatting:');
  console.log('  - ' + chalk.cyan('/istm-craft') + '   (Plan a new feature)');
  console.log('  - ' + chalk.cyan('/istm-develop') + ' (Write the code)');
  console.log('  - ' + chalk.cyan('/istm-debug') + '   (Fix a massive error)');
  console.log('  - ' + chalk.cyan('/istm-audit') + '   (Check for tech debt)');
  
  console.log('\n📚 Read the Docs: ' + chalk.dim('https://istmx.github.io/skills\n'));
}

main().catch(err => {
  console.error(chalk.red('Error during installation:'), err);
  process.exit(1);
});
