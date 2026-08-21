#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLS_ROOT = path.join(__dirname, '..');

const CORE_SKILLS = [
  'istm-architecture',
  'istm-awwward-designer',
  'istm-design',
  'istm-system-design',
  'istm-animate'
];

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

  const cwd = process.cwd();
  let autoDetectedHarness = null;
  
  if (process.env.TERM_PROGRAM === 'cursor') autoDetectedHarness = '.cursorrules';
  if (process.env.TERM_PROGRAM === 'Windsurf') autoDetectedHarness = '.windsurfrules';
  
  try {
    const files = await fs.readdir(cwd);
    if (files.includes('.gemini')) autoDetectedHarness = 'GEMINI.md';
    if (files.includes('.claude')) autoDetectedHarness = 'CLAUDE.md';
    if (files.includes('.windsurf')) autoDetectedHarness = '.windsurfrules';
    if (files.includes('.cursor')) autoDetectedHarness = '.cursorrules';
    if (files.includes('.cline')) autoDetectedHarness = '.clinerules';
  } catch (err) {}

  const harnessChoices = [];
  if (autoDetectedHarness) {
    harnessChoices.push({ title: `Auto-Detect (${autoDetectedHarness})`, value: autoDetectedHarness, selected: true });
  }
  harnessChoices.push(
    { title: chalk.bold.blue('Claude Code') + chalk.dim(' (CLAUDE.md)'), value: 'CLAUDE.md', selected: autoDetectedHarness === 'CLAUDE.md' },
    { title: chalk.bold.green('OpenAI Codex / Opencode') + chalk.dim(' (AGENTS.md)'), value: 'AGENTS.md', selected: autoDetectedHarness === 'AGENTS.md' },
    { title: chalk.bold.cyan('Gemini Antigravity CLI') + chalk.dim(' (GEMINI.md)'), value: 'GEMINI.md', selected: autoDetectedHarness === 'GEMINI.md' },
    { title: chalk.bold.white('Cursor') + chalk.dim(' (.cursorrules)'), value: '.cursorrules', selected: autoDetectedHarness === '.cursorrules' },
    { title: chalk.bold.magenta('Windsurf') + chalk.dim(' (.windsurfrules)'), value: '.windsurfrules', selected: autoDetectedHarness === '.windsurfrules' },
    { title: chalk.bold.yellow('Roo Code / Cline') + chalk.dim(' (.clinerules)'), value: '.clinerules', selected: autoDetectedHarness === '.clinerules' },
    { title: chalk.bold.white('GitHub Copilot') + chalk.dim(' (.github/copilot-instructions.md)'), value: '.github/copilot-instructions.md', selected: false },
    { title: chalk.bold.gray('Other AI Agents') + chalk.dim(' (AGENTS.md)'), value: 'AGENTS.md', selected: false }
  );

  const response = await prompts([
    {
      type: 'multiselect',
      name: 'targetHarnesses',
      message: 'Which AI Agent Harnesses are you targeting? (Space to select)',
      instructions: false,
      choices: harnessChoices,
      min: 1
    }
  ]);

  if (!response.targetHarnesses || response.targetHarnesses.length === 0) {
    console.log(chalk.red('\nInstallation cancelled by user.'));
    process.exit(1);
  }

  /** Deduplicate selected harnesses in case they selected Auto-Detect and the explicit one */
  const harnessesToInstall = [...new Set(response.targetHarnesses)];

  console.log(chalk.cyan('\n⚙ Installing full @istmx/skills suite...'));

  const targetDir = cwd;
  const contextDir = path.join(targetDir, '.istm-context');
  
  /**
   * ==========================================
   * STEP 1: Global Context Scaffolding
   * ==========================================
   * Initializing the shared `.istm-context` directory and copying all core skill blueprints.
   */
  console.log(chalk.green(`✓ Scaffolding .istm-context/ blueprints...`));
  
  try { await fs.mkdir(contextDir, { recursive: true }); } catch (err) {}
  
  /** Always create the agents.md root file if it doesn't exist */
  const agentsMdPath = path.join(contextDir, 'agents.md');
  try { 
    await fs.access(agentsMdPath);
  } catch (err) {
    try { 
      await fs.writeFile(agentsMdPath, `# @istmx/skills Runtime Memory\n\nThis file will be hydrated by the master orchestrator.`); 
    } catch (err) {
      console.log(chalk.red(`  - Failed to write agents.md: ${err.message}`));
    }
  }
  
  /** Copy all core skills context templates into .istm-context */
  for (const skill of CORE_SKILLS) {
    try { 
      await fs.cp(path.join(SKILLS_ROOT, skill), path.join(contextDir, skill), { recursive: true }); 
      console.log(chalk.dim(`  - Scaffolded ${skill} in .istm-context`));
    } catch(e) {
      console.log(chalk.red(`  - Failed to scaffold ${skill} in .istm-context: ${e.message}`));
    }
  }
  
  /**
   * ==========================================
   * STEP 2: Harness Injection Loop
   * ==========================================
   */
  for (const harness of harnessesToInstall) {
    console.log(chalk.cyan(`\n⚙ Configuring ${chalk.bold(harness)}...`));
    
    let workflowTarget = path.join(targetDir, '.agents', 'skills');
    if (harness === '.cursorrules') workflowTarget = path.join(targetDir, '.cursor', 'rules');
    if (harness === 'GEMINI.md') workflowTarget = path.join(targetDir, '.gemini', 'skills');
    if (harness === '.windsurfrules') workflowTarget = path.join(targetDir, '.windsurf', 'rules');

    try { await fs.mkdir(workflowTarget, { recursive: true }); } catch (err) {}

    /** 1. Append the pointer to the root harness file without overwriting */
    const harnessPath = path.join(targetDir, harness);
    const pointerLine = `\n\n# @istmx/skills Context\n@.istm-context/agents.md\n`;
    try {
      if (harness.includes('/')) {
        await fs.mkdir(path.dirname(harnessPath), { recursive: true });
      }
      let currentContent = '';
      try { currentContent = await fs.readFile(harnessPath, 'utf8'); } catch (e) {}
      
      if (!currentContent.includes('.istm-context/agents.md')) {
        await fs.appendFile(harnessPath, currentContent ? pointerLine : `# AI Harness\n${pointerLine}`);
        console.log(chalk.dim(`  - Appended .istm-context pointer to ${harness}`));
      } else {
        console.log(chalk.dim(`  - Pointer already exists in ${harness}`));
      }
    } catch (err) {}

    /** 2. Inject the Universal NLP Router (/istm) */
    const routerPath = path.join(SKILLS_ROOT, 'istm', 'SKILL.md');
    try {
      if (harness === '.cursorrules') {
        await fs.copyFile(routerPath, path.join(workflowTarget, 'istm.mdc'));
      } else {
        await fs.cp(path.join(SKILLS_ROOT, 'istm'), path.join(workflowTarget, 'istm'), { recursive: true });
      }
      console.log(chalk.dim(`  - Injected Master Router (/istm)`));
    } catch (err) {
      console.log(chalk.red(`  - Failed to inject Master Router: ${err.message}`));
    }
    
    /** 3. Inject ALL Core Orchestrator Skills */
    for (const skill of CORE_SKILLS) {
      try {
        if (harness === '.cursorrules') {
          await fs.copyFile(path.join(SKILLS_ROOT, skill, 'SKILL.md'), path.join(workflowTarget, `${skill}.mdc`));
        } else {
          await fs.cp(path.join(SKILLS_ROOT, skill), path.join(workflowTarget, skill), { recursive: true });
        }
        console.log(chalk.dim(`  - Injected ${skill}`));
      } catch (err) {
        console.log(chalk.red(`  - Failed to inject ${skill}: ${err.message}`));
      }
    }

    /** 4. ALWAYS Inject Workflow Tools (/istm-craft, /istm-develop, etc.) */
    const workflowSource = path.join(SKILLS_ROOT, 'istm-workflow');
    try {
      const dirs = await fs.readdir(workflowSource, { withFileTypes: true });
      for (const dirent of dirs) {
        if (dirent.isDirectory()) {
          const sourceDir = path.join(workflowSource, dirent.name);
          try {
            if (harness === '.cursorrules') {
              await fs.copyFile(path.join(sourceDir, 'SKILL.md'), path.join(workflowTarget, `${dirent.name}.mdc`));
            } else {
              await fs.cp(sourceDir, path.join(workflowTarget, dirent.name), { recursive: true });
            }
            console.log(chalk.dim(`  - Injected ${dirent.name}`));
          } catch (e) {
            console.log(chalk.red(`  - Failed to inject ${dirent.name}: ${e.message}`));
          }
        }
      }
    } catch (err) {
      console.log(chalk.red(`  - Failed to inject workflow tools: ${err.message}`));
    }
  }

  console.log(chalk.bold.magenta('\n✨ Full Suite Initialization Complete!'));
  console.log(`Your AI is now powered by the full ${chalk.bold('@istmx/skills')} Operating System.`);
  
  console.log('\n' + chalk.bold('🚀 God Mode is active. Try your first prompt:'));
  console.log(chalk.cyan(`> /istm build me a sleek dashboard\n`));
  
  console.log(chalk.bold('🛠 Available Skills & Slash Commands:'));
  console.log('  ' + chalk.bold('Master Router:'));
  console.log('    - ' + chalk.cyan('/istm') + '                  (Universal NLP Router & Master Orchestrator)');
  console.log('  ' + chalk.bold('Core Orchestrators:'));
  console.log('    - ' + chalk.cyan('/istm-architecture') + '     (Full-Stack Architecture & 4 Pillars)');
  console.log('    - ' + chalk.cyan('/istm-awwward-designer') + ' (GSAP/WebGL Motion & Premium UI)');
  console.log('    - ' + chalk.cyan('/istm-design') + '           (Bespoke UI Design Tokens & Styling)');
  console.log('    - ' + chalk.cyan('/istm-system-design') + '    (Database Schemas, APIs, ORM)');
  console.log('    - ' + chalk.cyan('/istm-animate') + '          (Hardware-Accelerated Motion & Curves)');
  console.log('  ' + chalk.bold('Day-to-Day Workflow Suite:'));
  console.log('    - ' + chalk.cyan('/istm-craft') + '            (Plan a new feature spec)');
  console.log('    - ' + chalk.cyan('/istm-develop') + '          (Write feature implementation code)');
  console.log('    - ' + chalk.cyan('/istm-debug') + '            (7-Rung Efficiency Ladder & root cause fixes)');
  console.log('    - ' + chalk.cyan('/istm-audit') + '            (Deep multi-layer tech debt scan)');
  console.log('    - ' + chalk.cyan('/istm-qa') + '               (Automated headless browser & visual QA testing)');
  console.log('    - ' + chalk.cyan('/istm-cso') + '              (Chief Security Officer vulnerability scan)');
  console.log('    - ' + chalk.cyan('/istm-health') + '           (Codebase health & architecture drift score)');
  console.log('    - ' + chalk.cyan('/istm-gain') + '             (Performance & bundle optimization)');
  console.log('    - ' + chalk.cyan('/istm-debt') + '             (Harvest & track deliberate code debt)');
  console.log('    - ' + chalk.cyan('/istm-review') + '           (Pre-merge code & diff audit)');
  console.log('    - ' + chalk.cyan('/istm-ship') + '             (Autonomous release & changelog generator)');
  console.log('    - ' + chalk.cyan('/istm-test') + '             (Generate comprehensive test suites)');
  
  console.log('\n📚 Documentation & Repo: ' + chalk.dim('https://github.com/istmX/skills\n'));
}

main().catch(err => {
  console.error(chalk.red('Error during installation:'), err);
  process.exit(1);
});
