#!/usr/bin/env node

// Post-build script to ensure proper file structure for Render deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Running post-build script...');

// Ensure static files are in the correct location for production
const distPublicPath = path.join(rootDir, 'dist', 'public');
const manifestSrc = path.join(rootDir, 'client', 'public', 'manifest.json');
const manifestDest = path.join(distPublicPath, 'manifest.json');
const swSrc = path.join(rootDir, 'client', 'public', 'sw.js');
const swDest = path.join(distPublicPath, 'sw.js');
const iconsSrc = path.join(rootDir, 'client', 'public', 'icons');
const iconsDest = path.join(distPublicPath, 'icons');

try {
  // Copy manifest.json
  if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, manifestDest);
    console.log('✓ Copied manifest.json');
  }

  // Copy service worker
  if (fs.existsSync(swSrc)) {
    fs.copyFileSync(swSrc, swDest);
    console.log('✓ Copied service worker');
  }

  // Copy icons directory
  if (fs.existsSync(iconsSrc)) {
    if (!fs.existsSync(iconsDest)) {
      fs.mkdirSync(iconsDest, { recursive: true });
    }
    const iconFiles = fs.readdirSync(iconsSrc);
    iconFiles.forEach(file => {
      fs.copyFileSync(
        path.join(iconsSrc, file),
        path.join(iconsDest, file)
      );
    });
    console.log('✓ Copied icon files');
  }

  console.log('Post-build script completed successfully!');
} catch (error) {
  console.error('Post-build script failed:', error);
  process.exit(1);
}