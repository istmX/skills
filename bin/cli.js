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
  'istm': ['istm-architecture', 'istm-awwward-designer', 'istm-animate', 'istm-design', 'istm-system-design'],
  'istm-architecture': ['istm-design', 'istm-system-design'],
  'istm-awwward-designer': ['istm-design', 'istm-animate'],
  'istm-animate': ['istm-design'],
  'istm-system-design': [],
  'istm-design': [],
  'workflow-only': []
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
    harnessChoices.push({ title: `Auto-Detect (${autoDetectedHarness})`, value: 'auto' });
  }
  harnessChoices.push(
    { title: 'Install for ALL Agents (Universal)', description: 'Generates rules for Cursor, Gemini, Claude, Windsurf, etc.', value: 'all' },
    { title: 'Cursor', description: '.cursorrules', value: '.cursorrules' },
    { title: 'Windsurf', description: '.windsurfrules', value: '.windsurfrules' },
    { title: 'Claude Code', description: 'CLAUDE.md', value: 'CLAUDE.md' },
    { title: 'Gemini Antigravity CLI', description: 'GEMINI.md', value: 'GEMINI.md' },
    { title: 'Roo Code / Cline', description: '.clinerules', value: '.clinerules' },
    { title: 'GitHub Copilot', description: 'copilot-instructions.md', value: '.github/copilot-instructions.md' },
    { title: 'OpenAI Codex / Opencode', description: 'AGENTS.md', value: 'AGENTS.md' },
    { title: 'Other AI Agents', description: 'AGENTS.md', value: 'AGENTS.md' }
  );

  const response = await prompts([
    {
      type: 'select',
      name: 'targetHarness',
      message: 'Which AI Agent Harness are you targeting?',
      choices: harnessChoices
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

  if (!response.targetHarness || !response.coreSkill) {
    console.log(chalk.red('\nInstallation cancelled by user.'));
    process.exit(1);
  }

  console.log(chalk.cyan('\n⚙ Installing blueprints...'));

  const targetDir = cwd;
  const contextDir = path.join(targetDir, '.istm-context');
  
  const allHarnesses = [
    '.cursorrules',
    '.windsurfrules',
    'CLAUDE.md',
    'GEMINI.md',
    '.clinerules',
    '.github/copilot-instructions.md',
    'AGENTS.md'
  ];
  
  const harnessesToInstall = response.targetHarness === 'all' 
    ? allHarnesses 
    : [response.targetHarness === 'auto' ? autoDetectedHarness : response.targetHarness];

  // Step 1: Global Context Scaffolding (Only do once)
  if (response.coreSkill !== 'workflow-only') {
    console.log(chalk.green(`✓ Scaffolding .istm-context/`));
    try { await fs.mkdir(contextDir, { recursive: true }); } catch (err) {}
    try { await fs.cp(path.join(SKILLS_ROOT, response.coreSkill), path.join(contextDir, response.coreSkill), { recursive: true }); } catch(e) {}
    try { await fs.writeFile(path.join(contextDir, 'agents.md'), `# @istmx/skills Runtime Memory\n\nThis file will be hydrated by the master orchestrator.`); } catch (err) {}
    
    // Copy dependencies into context
    const deps = DEPENDENCY_MAP[response.coreSkill] || [];
    for (const dep of deps) {
      try { await fs.cp(path.join(SKILLS_ROOT, dep), path.join(contextDir, dep), { recursive: true }); } catch(e) {}
    }
  } else {
    console.log(chalk.dim(`✓ Skipping Core Orchestrator context (Workflow tools only).`));
  }

  // Step 2: Loop through all selected harnesses
  for (const harness of harnessesToInstall) {
    console.log(chalk.cyan(`\n⚙ Configuring ${chalk.bold(harness)}...`));
    
    let workflowTarget = path.join(targetDir, '.agents', 'skills');
    if (harness === '.cursorrules') workflowTarget = path.join(targetDir, '.cursor', 'rules');
    if (harness === 'GEMINI.md') workflowTarget = path.join(targetDir, '.gemini', 'skills');
    if (harness === '.windsurfrules') workflowTarget = path.join(targetDir, '.windsurf', 'rules');

    // Root Orchestrator
    if (response.coreSkill !== 'workflow-only') {
      const skillPath = path.join(SKILLS_ROOT, response.coreSkill, 'SKILL.md');
      try {
        await fs.copyFile(skillPath, path.join(targetDir, harness));
        console.log(chalk.dim(`  - Injected Master Orchestrator`));
        
        // Also add the master orchestrator to autocomplete tools so they can use it as a slash command
        await fs.mkdir(workflowTarget, { recursive: true });
        if (harness === '.cursorrules') {
          await fs.copyFile(skillPath, path.join(workflowTarget, `${response.coreSkill}.mdc`));
        } else {
          await fs.mkdir(path.join(workflowTarget, response.coreSkill), { recursive: true });
          await fs.copyFile(skillPath, path.join(workflowTarget, response.coreSkill, 'SKILL.md'));
        }
      } catch (err) {}
    }
    
    // Workflow Target Dependencies (Autocomplete rules)
    const deps = DEPENDENCY_MAP[response.coreSkill] || [];
    if (deps.length > 0) {
      let injectedDeps = false;
      for (const dep of deps) {
        try {
          await fs.mkdir(workflowTarget, { recursive: true });
          if (harness === '.cursorrules') {
            await fs.copyFile(path.join(SKILLS_ROOT, dep, 'SKILL.md'), path.join(workflowTarget, `${dep}.mdc`));
          } else {
            await fs.cp(path.join(SKILLS_ROOT, dep), path.join(workflowTarget, dep), { recursive: true });
          }
          injectedDeps = true;
        } catch (err) {}
      }
      if (injectedDeps) console.log(chalk.dim(`  - Injected dependencies into autocomplete rules`));
    }

    // Workflow Tools (Autocomplete rules)
    const workflowSource = path.join(SKILLS_ROOT, 'istm-workflow');
    try {
      if (harness === '.cursorrules') {
        await fs.mkdir(workflowTarget, { recursive: true });
        const dirs = await fs.readdir(workflowSource, { withFileTypes: true });
        for (const dirent of dirs) {
          if (dirent.isDirectory()) {
            try { await fs.copyFile(path.join(workflowSource, dirent.name, 'SKILL.md'), path.join(workflowTarget, `${dirent.name}.mdc`)); } catch (e) {}
          }
        }
      } else {
        await fs.cp(workflowSource, workflowTarget, { recursive: true });
      }
      console.log(chalk.dim(`  - Bundled workflow commands into autocomplete rules`));
    } catch (err) {}
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
