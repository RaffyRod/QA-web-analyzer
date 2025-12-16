/**
 * @author RaffyRod (https://github.com/RaffyRod)
 *
 * Automatic setup and run script
 * Installs dependencies, builds, and starts the application automatically
 */

import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const backendNodeModules = join(__dirname, 'node_modules');
const frontendNodeModules = join(__dirname, 'frontend', 'node_modules');
const distPath = join(__dirname, 'dist');

console.log('🚀 QA Web Analyzer - Automatic Setup & Run\n');
console.log('='.repeat(60));

// Helper function to detect package manager
function getPackageManager() {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {
    return 'npm';
  }
}

const pkgManager = getPackageManager();
if (pkgManager === 'npm') {
  console.log('📦 Using npm as package manager\n');
} else {
  console.log('📦 Using pnpm as package manager\n');
}

// Step 1: Install backend dependencies
if (!existsSync(backendNodeModules)) {
  console.log('📦 Step 1/4: Installing backend dependencies...');
  try {
    execSync(`${pkgManager} install`, { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Backend dependencies installed!\n');
  } catch (error) {
    console.error('❌ Error installing backend dependencies');
    process.exit(1);
  }
} else {
  console.log('✅ Backend dependencies already installed\n');
}

// Step 2: Install frontend dependencies
if (!existsSync(frontendNodeModules)) {
  console.log('📦 Step 2/4: Installing frontend dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: join(__dirname, 'frontend') });
    console.log('✅ Frontend dependencies installed!\n');
  } catch (error) {
    console.error('❌ Error installing frontend dependencies');
    process.exit(1);
  }
} else {
  console.log('✅ Frontend dependencies already installed\n');
}

// Step 3: Build backend (if needed)
if (!existsSync(distPath) || !existsSync(join(distPath, 'server.js'))) {
  console.log('🔨 Step 3/4: Building backend (TypeScript compilation)...');
  try {
    // Use detected package manager
    if (pkgManager === 'pnpm') {
      execSync('pnpm exec tsc', { stdio: 'inherit', cwd: __dirname });
    } else {
      execSync('npx tsc', { stdio: 'inherit', cwd: __dirname });
    }
    console.log('✅ Backend built successfully!\n');
  } catch (error) {
    console.error('❌ Error building backend');
    console.error('💡 Make sure TypeScript is installed: ' + pkgManager + ' install');
    process.exit(1);
  }
} else {
  console.log('✅ Backend already built\n');
}

// Verify backend is compiled before starting
if (!existsSync(join(distPath, 'server.js'))) {
  console.error('❌ Error: Backend not compiled. Please run the build step first.');
  process.exit(1);
}

// Step 4: Start both servers
console.log('🎯 Step 4/4: Starting servers...\n');
console.log('='.repeat(60));
console.log('✨ Servers will start automatically\n');
console.log('💡 The frontend will automatically connect to the backend\n');
console.log('📝 Check the console output for the exact URLs\n');
console.log('='.repeat(60) + '\n');

// Build the start command based on package manager
const startCommand = pkgManager === 'pnpm' ? 'pnpm run start:all' : 'npm run start:all';

try {
  execSync(startCommand, { stdio: 'inherit', cwd: __dirname });
} catch (error) {
  console.error('❌ Error starting servers');
  console.error('💡 Make sure concurrently is installed: ' + pkgManager + ' install');
  console.error('💡 Or install globally: npm install -g concurrently');
  process.exit(1);
}
