#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLS_ROOT = path.join(__dirname, '..');

const DEPENDENCY_MAP = {
  'istm': ['istm-architecture', 'istm-awwward-designer', 'istm-design', 'istm-system-design', 'istm-animate'],
  'istm-architecture': ['istm-design', 'istm-system-design'],
  'istm-awwward-designer': ['istm-design', 'istm-animate'],
  'istm-system-design': [],
  'istm-design': []
};

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
    harnessChoices.push({ title: `Auto-Detect (${autoDetectedHarness})`, value: autoDetectedHarness });
  }
  harnessChoices.push(
    { title: chalk.bold.blue('Claude Code') + chalk.dim(' (CLAUDE.md)'), value: 'CLAUDE.md' },
    { title: chalk.bold.green('OpenAI Codex / Opencode') + chalk.dim(' (AGENTS.md)'), value: 'AGENTS.md' },
    { title: chalk.bold.cyan('Gemini Antigravity CLI') + chalk.dim(' (GEMINI.md)'), value: 'GEMINI.md' },
    { title: chalk.bold.white('Cursor') + chalk.dim(' (.cursorrules)'), value: '.cursorrules' },
    { title: chalk.bold.magenta('Windsurf') + chalk.dim(' (.windsurfrules)'), value: '.windsurfrules' },
    { title: chalk.bold.yellow('Roo Code / Cline') + chalk.dim(' (.clinerules)'), value: '.clinerules' },
    { title: chalk.bold.white('GitHub Copilot') + chalk.dim(' (.github/copilot-instructions.md)'), value: '.github/copilot-instructions.md' },
    { title: chalk.bold.gray('Other AI Agents') + chalk.dim(' (AGENTS.md)'), value: 'AGENTS.md' }
  );

  const response = await prompts([
    {
      type: 'multiselect',
      name: 'targetHarnesses',
      message: 'Which AI Agent Harnesses are you targeting? (Space to select)',
      instructions: false,
      choices: harnessChoices,
      min: 1
    },
    {
      type: 'multiselect',
      name: 'domainSkills',
      message: 'Which Core Architecture Skills do you want to initialize? (Space to select)',
      instructions: false,
      choices: [
        { title: chalk.bold.red('God Mode') + chalk.dim(' (Universal Router)'), value: 'istm' },
        { title: chalk.bold.blue('Architect') + chalk.dim(' (Full Stack / Standard UI)'), value: 'istm-architecture' },
        { title: chalk.bold.magenta('Awwward Designer') + chalk.dim(' (GSAP Motion / Premium Specs)'), value: 'istm-awwward-designer' },
        { title: chalk.bold.cyan('Design') + chalk.dim(' (Visual Tokens & Static UI)'), value: 'istm-design' },
        { title: chalk.bold.green('System Design') + chalk.dim(' (Backend & APIs)'), value: 'istm-system-design' }
      ],
      min: 1
    }
  ]);

  if (!response.targetHarnesses || !response.domainSkills) {
    console.log(chalk.red('\nInstallation cancelled by user.'));
    process.exit(1);
  }

  /** Deduplicate selected harnesses in case they selected Auto-Detect and the explicit one */
  const harnessesToInstall = [...new Set(response.targetHarnesses)];

  console.log(chalk.cyan('\n⚙ Installing blueprints...'));

  const targetDir = cwd;
  const contextDir = path.join(targetDir, '.istm-context');
  
  /**
   * ==========================================
   * STEP 1: Global Context Scaffolding
   * ==========================================
   * This step initializes the shared `.istm-context` directory.
   */
  console.log(chalk.green(`✓ Scaffolding .istm-context/`));
  
  try { await fs.mkdir(contextDir, { recursive: true }); } catch (err) {}
  
  /** Always create the agents.md root file if it doesn't exist */
  const agentsMdPath = path.join(contextDir, 'agents.md');
  try { 
    await fs.access(agentsMdPath);
  } catch (err) {
    try { await fs.writeFile(agentsMdPath, `# @istmx/skills Runtime Memory\n\nThis file will be hydrated by the master orchestrator.`); } catch (err) {
      console.log(chalk.red(`  - Failed to write agents.md: ${err.message}`));
    }
  }
  
  /** Copy the selected domain skills context templates */
  const allDeps = new Set();
  for (const skill of response.domainSkills) {
    /** istm has no context template */
    if (skill === 'istm') continue;
    try { 
      await fs.cp(path.join(SKILLS_ROOT, skill), path.join(contextDir, skill), { recursive: true }); 
      console.log(chalk.dim(`  - Scaffolded ${skill} in .istm-context`));
    } catch(e) {
      console.log(chalk.red(`  - Failed to scaffold ${skill} in .istm-context: ${e.message}`));
    }
    const deps = DEPENDENCY_MAP[skill] || [];
    for (const d of deps) allDeps.add(d);
  }
  
  /** Inject physical dependencies (like UI tokens or DB schemas) into the global context */
  for (const dep of allDeps) {
    try { 
      await fs.cp(path.join(SKILLS_ROOT, dep), path.join(contextDir, dep), { recursive: true });
      console.log(chalk.dim(`  - Scaffolded dependency ${dep} in .istm-context`));
    } catch(e) {
      console.log(chalk.red(`  - Failed to scaffold dependency ${dep}: ${e.message}`));
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
      /** Create directory for github copilot if needed */
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

    /** 2. Inject the Universal NLP Router (/istm) IF selected */
    if (response.domainSkills.includes('istm')) {
      const routerPath = path.join(SKILLS_ROOT, 'istm', 'SKILL.md');
      try {
        if (harness === '.cursorrules') {
          await fs.copyFile(routerPath, path.join(workflowTarget, 'istm.mdc'));
        } else {
          await fs.cp(path.join(SKILLS_ROOT, 'istm'), path.join(workflowTarget, 'istm'), { recursive: true });
        }
        console.log(chalk.dim(`  - Injected Master Orchestrator (/istm)`));
      } catch (err) {
        console.log(chalk.red(`  - Failed to inject Master Orchestrator: ${err.message}`));
      }
    }
    
    /** 3. Inject selected domain skills into autocomplete */
    const skillsToInject = new Set([...response.domainSkills, ...allDeps]);
    for (const skill of skillsToInject) {
      /** already injected */
      if (skill === 'istm') continue;
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

  console.log(chalk.bold.magenta('\n✨ Initialization Complete!'));
  console.log(`Your AI is now operating under the ${chalk.bold('istmX')} Architecture.`);
  
  if (response.domainSkills.includes('istm')) {
    console.log('\n' + chalk.bold('You are now in God Mode. Try your first prompt:'));
    console.log(chalk.cyan(`> /istm build me a sleek dashboard\n`));
  } else {
    console.log('\n' + chalk.bold('Setup complete. Ready to plan your first feature?'));
    console.log(chalk.cyan(`> /istm-craft I want to build a user authentication system\n`));
  }
  
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
