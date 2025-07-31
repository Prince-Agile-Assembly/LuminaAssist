#!/usr/bin/env node

// Post-build script to ensure proper file structure for Render deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Running post-build script...');

// Fix the static files path for production
// The server expects files at ./public but they're built to ./dist/public
const distPublicPath = path.join(rootDir, 'dist', 'public');
const publicPath = path.join(rootDir, 'public');

try {
  // Remove existing public directory if it exists
  if (fs.existsSync(publicPath)) {
    fs.rmSync(publicPath, { recursive: true, force: true });
    console.log('✓ Removed existing public directory');
  }
  
  // Create symlink from public to dist/public
  try {
    fs.symlinkSync(distPublicPath, publicPath, 'dir');
    console.log('✓ Created symlink: public -> dist/public');
  } catch (symlinkError) {
    console.log('⚠️  Symlink failed, copying files instead...');
    // If symlink fails, copy the directory
    fs.cpSync(distPublicPath, publicPath, { recursive: true });
    console.log('✓ Copied dist/public to public');
  }

  // Verify files exist
  const requiredFiles = ['index.html', 'manifest.json'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(publicPath, file))) {
      throw new Error(`Required file missing: public/${file}`);
    }
  }

  console.log('✓ Post-build script completed successfully!');
  console.log('📁 Static files available at both:');
  console.log('  - dist/public/ (build output)');
  console.log('  - public/ (server expected location)');
} catch (error) {
  console.error('❌ Post-build script failed:', error.message);
  process.exit(1);
}