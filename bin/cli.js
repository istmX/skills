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
    { title: 'Cursor (.cursorrules)', value: '.cursorrules' },
    { title: 'Windsurf (.windsurfrules)', value: '.windsurfrules' },
    { title: 'Claude Code (CLAUDE.md)', value: 'CLAUDE.md' },
    { title: 'Gemini Antigravity CLI (GEMINI.md)', value: 'GEMINI.md' },
    { title: 'Roo Code / Cline (.clinerules)', value: '.clinerules' },
    { title: 'GitHub Copilot (.github/copilot-instructions.md)', value: '.github/copilot-instructions.md' },
    { title: 'Other AI Agents (AGENTS.md)', value: 'AGENTS.md' }
  );

  const response = await prompts([
    {
      type: 'multiselect',
      name: 'targetHarnesses',
      message: 'Which AI Agent Harnesses are you targeting? (Space to select)',
      choices: harnessChoices,
      min: 1
    },
    {
      type: 'multiselect',
      name: 'domainSkills',
      message: 'Which Core Architecture Skills do you want to initialize? (Space to select)',
      choices: [
        { title: 'Architect (Full Stack / Standard UI)', value: 'istm-architecture' },
        { title: 'Awwward Designer (GSAP Motion / Premium Specs)', value: 'istm-awwward-designer' },
        { title: 'Design (Visual Tokens & Static UI)', value: 'istm-design' },
        { title: 'System Design (Backend & APIs)', value: 'istm-system-design' }
      ],
      min: 1
    }
  ]);

  if (!response.targetHarnesses || !response.domainSkills) {
    console.log(chalk.red('\nInstallation cancelled by user.'));
    process.exit(1);
  }

  /* Deduplicate selected harnesses in case they selected Auto-Detect and the explicit one */
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
  
  /* Always create the agents.md root file if it doesn't exist */
  const agentsMdPath = path.join(contextDir, 'agents.md');
  try { 
    await fs.access(agentsMdPath);
  } catch (err) {
    try { await fs.writeFile(agentsMdPath, `# @istmx/skills Runtime Memory\n\nThis file will be hydrated by the master orchestrator.`); } catch (err) {}
  }
  
  /* Copy the selected domain skills context templates */
  const allDeps = new Set();
  for (const skill of response.domainSkills) {
    try { await fs.cp(path.join(SKILLS_ROOT, skill), path.join(contextDir, skill), { recursive: true }); } catch(e) {}
    const deps = DEPENDENCY_MAP[skill] || [];
    for (const d of deps) allDeps.add(d);
  }
  
  /* Inject physical dependencies (like UI tokens or DB schemas) into the global context */
  for (const dep of allDeps) {
    try { await fs.cp(path.join(SKILLS_ROOT, dep), path.join(contextDir, dep), { recursive: true }); } catch(e) {}
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

    /* 1. Append the pointer to the root harness file without overwriting */
    const harnessPath = path.join(targetDir, harness);
    const pointerLine = `\n\n# @istmx/skills Context\n@.istm-context/agents.md\n`;
    try {
      /* Create directory for github copilot if needed */
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

    /* 2. ALWAYS Drop the Universal NLP Router (/istm) */
    const routerPath = path.join(SKILLS_ROOT, 'istm', 'SKILL.md');
    try {
      await fs.mkdir(workflowTarget, { recursive: true });
      if (harness === '.cursorrules') {
        await fs.copyFile(routerPath, path.join(workflowTarget, 'istm.mdc'));
      } else {
        await fs.cp(path.join(SKILLS_ROOT, 'istm'), path.join(workflowTarget, 'istm'), { recursive: true });
      }
      console.log(chalk.dim(`  - Injected Master Orchestrator (/istm)`));
    } catch (err) {}
    
    /* 3. Inject selected domain skills into autocomplete */
    let injectedDeps = false;
    const skillsToInject = new Set([...response.domainSkills, ...allDeps]);
    for (const skill of skillsToInject) {
      try {
        if (harness === '.cursorrules') {
          await fs.copyFile(path.join(SKILLS_ROOT, skill, 'SKILL.md'), path.join(workflowTarget, `${skill}.mdc`));
        } else {
          await fs.cp(path.join(SKILLS_ROOT, skill), path.join(workflowTarget, skill), { recursive: true });
        }
        injectedDeps = true;
      } catch (err) {}
    }
    if (injectedDeps) console.log(chalk.dim(`  - Injected domain skills into autocomplete`));

    /* 4. ALWAYS Inject Workflow Tools (/istm-craft, /istm-develop, etc.) */
    const workflowSource = path.join(SKILLS_ROOT, 'istm-workflow');
    try {
      const dirs = await fs.readdir(workflowSource, { withFileTypes: true });
      for (const dirent of dirs) {
        if (dirent.isDirectory()) {
          const sourceDir = path.join(workflowSource, dirent.name);
          if (harness === '.cursorrules') {
            try { await fs.copyFile(path.join(sourceDir, 'SKILL.md'), path.join(workflowTarget, `${dirent.name}.mdc`)); } catch (e) {}
          } else {
            try { await fs.cp(sourceDir, path.join(workflowTarget, dirent.name), { recursive: true }); } catch (e) {}
          }
        }
      }
      console.log(chalk.dim(`  - Bundled mandatory workflow tools into autocomplete`));
    } catch (err) {}
  }

  console.log(chalk.bold.magenta('\n✨ Initialization Complete!'));
  console.log(`Your AI is now operating under the ${chalk.bold('istmX')} Architecture.`);
  
  console.log('\n' + chalk.bold('You are now in God Mode. Try your first prompt:'));
  console.log(chalk.cyan(`> /istm build me a sleek dashboard\n`));
  
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
