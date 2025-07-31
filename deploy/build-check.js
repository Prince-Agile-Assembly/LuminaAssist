#!/usr/bin/env node

// Script to verify build requirements for Render deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Checking build requirements for Render deployment...\n');

// Check essential files
const requiredFiles = [
  'package.json',
  'server/index.ts',
  'client/index.html',
  'vite.config.ts',
  'render.yaml',
  '.nvmrc',
  'Procfile'
];

console.log('✓ Required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(rootDir, file));
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
});

// Check package.json scripts
const packagePath = path.join(rootDir, 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  console.log('\n✓ Package.json scripts:');
  const requiredScripts = ['build', 'start'];
  requiredScripts.forEach(script => {
    const exists = pkg.scripts && pkg.scripts[script];
    console.log(`  ${exists ? '✓' : '✗'} ${script}: ${exists || 'missing'}`);
  });
}

// Check for environment variable requirements
console.log('\n✓ Environment variables needed:');
console.log('  - GEMINI_API_KEY (set in Render dashboard)');
console.log('  - NODE_ENV=production (set in Render dashboard)');

console.log('\n✓ Deployment checklist:');
console.log('  1. Push code to GitHub repository');
console.log('  2. Connect repository to Render');
console.log('  3. Set environment variables in Render dashboard');
console.log('  4. Deploy using render.yaml configuration');

console.log('\nBuild check completed!');