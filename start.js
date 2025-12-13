import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nodeModulesPath = join(__dirname, 'node_modules');
const distPath = join(__dirname, 'dist');

console.log('🚀 Starting QA Web Analyzer...\n');

if (!existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies (first time setup)...');
  try {
    execSync('pnpm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependencies installed successfully!\n');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed, skipping install step.\n');
}

console.log('🔨 Building TypeScript project...');
try {
  execSync('pnpm build', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Error building project:', error.message);
  process.exit(1);
}

if (!existsSync(distPath)) {
  console.error('❌ Build directory not found. Build may have failed.');
  process.exit(1);
}

console.log('🎯 Starting server...\n');
try {
  execSync('pnpm start', { stdio: 'inherit', cwd: __dirname });
} catch (error) {
  console.error('❌ Error starting server:', error.message);
  process.exit(1);
}

