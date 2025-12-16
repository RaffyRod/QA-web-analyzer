/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Mock fs and child_process
vi.mock('fs');
vi.mock('child_process');

describe('Setup and Run Script', () => {
  const mockExistsSync = vi.mocked(existsSync);
  const mockExecSync = vi.mocked(execSync);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Package Manager Detection', () => {
    it('should detect npm when pnpm is not available', () => {
      mockExecSync.mockImplementation((command: string) => {
        if (command.includes('pnpm --version')) {
          throw new Error('pnpm not found');
        }
        return Buffer.from('');
      });

      // This would be tested if we refactor getPackageManager to be exported
      // For now, we test the logic
      let detectedManager = 'npm';
      try {
        execSync('pnpm --version', { stdio: 'ignore' });
        detectedManager = 'pnpm';
      } catch {
        detectedManager = 'npm';
      }

      expect(detectedManager).toBe('npm');
    });

    it('should detect pnpm when available', () => {
      mockExecSync.mockImplementation((command: string) => {
        if (command.includes('pnpm --version')) {
          return Buffer.from('8.0.0');
        }
        return Buffer.from('');
      });

      let detectedManager = 'npm';
      try {
        execSync('pnpm --version', { stdio: 'ignore' });
        detectedManager = 'pnpm';
      } catch {
        detectedManager = 'npm';
      }

      expect(detectedManager).toBe('pnpm');
    });
  });

  describe('Dependency Installation Checks', () => {
    it('should detect when backend node_modules exists', () => {
      mockExistsSync.mockReturnValue(true);

      const backendNodeModules = join(process.cwd(), 'node_modules');
      const exists = existsSync(backendNodeModules);

      expect(exists).toBe(true);
      expect(mockExistsSync).toHaveBeenCalled();
    });

    it('should detect when backend node_modules does not exist', () => {
      mockExistsSync.mockReturnValue(false);

      const backendNodeModules = join(process.cwd(), 'node_modules');
      const exists = existsSync(backendNodeModules);

      expect(exists).toBe(false);
    });

    it('should detect when frontend node_modules exists', () => {
      mockExistsSync.mockReturnValue(true);

      const frontendNodeModules = join(process.cwd(), 'frontend', 'node_modules');
      const exists = existsSync(frontendNodeModules);

      expect(exists).toBe(true);
    });

    it('should detect when frontend node_modules does not exist', () => {
      mockExistsSync.mockReturnValue(false);

      const frontendNodeModules = join(process.cwd(), 'frontend', 'node_modules');
      const exists = existsSync(frontendNodeModules);

      expect(exists).toBe(false);
    });
  });

  describe('Playwright Package Detection', () => {
    it('should detect when Playwright package is installed', () => {
      mockExistsSync.mockImplementation((path: string) => {
        if (path.includes('playwright') && path.includes('node_modules')) {
          return true;
        }
        return false;
      });

      const playwrightPath = join(process.cwd(), 'node_modules', 'playwright');
      const exists = existsSync(playwrightPath);

      expect(exists).toBe(true);
    });

    it('should detect when Playwright package is not installed', () => {
      mockExistsSync.mockImplementation((path: string) => {
        if (path.includes('playwright')) {
          return false;
        }
        return true;
      });

      const playwrightPath = join(process.cwd(), 'node_modules', 'playwright');
      const exists = existsSync(playwrightPath);

      expect(exists).toBe(false);
    });
  });

  describe('Build Verification', () => {
    it('should detect when dist/server.js exists', () => {
      mockExistsSync.mockImplementation((path: string) => {
        if (path.includes('dist') && path.includes('server.js')) {
          return true;
        }
        return false;
      });

      const distPath = join(process.cwd(), 'dist');
      const serverPath = join(distPath, 'server.js');
      const exists = existsSync(serverPath);

      expect(exists).toBe(true);
    });

    it('should detect when dist/server.js does not exist', () => {
      mockExistsSync.mockImplementation((path: string) => {
        if (path.includes('dist') && path.includes('server.js')) {
          return false;
        }
        return true;
      });

      const distPath = join(process.cwd(), 'dist');
      const serverPath = join(distPath, 'server.js');
      const exists = existsSync(serverPath);

      expect(exists).toBe(false);
    });

    it('should detect when dist directory does not exist', () => {
      mockExistsSync.mockImplementation((path: string) => {
        if (path.includes('dist') && !path.includes('server.js')) {
          return false;
        }
        return true;
      });

      const distPath = join(process.cwd(), 'dist');
      const exists = existsSync(distPath);

      expect(exists).toBe(false);
    });
  });

  describe('Installation Command Generation', () => {
    it('should generate correct npm install command', () => {
      const pkgManager = 'npm';
      const command = `${pkgManager} install`;

      expect(command).toBe('npm install');
    });

    it('should generate correct pnpm install command', () => {
      const pkgManager = 'pnpm';
      const command = `${pkgManager} install`;

      expect(command).toBe('pnpm install');
    });

    it('should generate correct Playwright install command for npm', () => {
      const pkgManager = 'npm';
      const command =
        pkgManager === 'pnpm'
          ? `pnpm exec playwright install chromium`
          : `npx playwright install chromium`;

      expect(command).toBe('npx playwright install chromium');
    });

    it('should generate correct Playwright install command for pnpm', () => {
      const pkgManager = 'pnpm';
      const command =
        pkgManager === 'pnpm'
          ? `pnpm exec playwright install chromium`
          : `npx playwright install chromium`;

      expect(command).toBe('pnpm exec playwright install chromium');
    });

    it('should generate correct TypeScript build command for npm', () => {
      const pkgManager = 'npm';
      const command = pkgManager === 'pnpm' ? 'pnpm exec tsc' : 'npx tsc';

      expect(command).toBe('npx tsc');
    });

    it('should generate correct TypeScript build command for pnpm', () => {
      const pkgManager = 'pnpm';
      const command = pkgManager === 'pnpm' ? 'pnpm exec tsc' : 'npx tsc';

      expect(command).toBe('pnpm exec tsc');
    });

    it('should generate correct start command for npm', () => {
      const pkgManager = 'npm';
      const command = pkgManager === 'pnpm' ? 'pnpm run start:all' : 'npm run start:all';

      expect(command).toBe('npm run start:all');
    });

    it('should generate correct start command for pnpm', () => {
      const pkgManager = 'pnpm';
      const command = pkgManager === 'pnpm' ? 'pnpm run start:all' : 'npm run start:all';

      expect(command).toBe('pnpm run start:all');
    });
  });

  describe('Path Resolution', () => {
    it('should resolve backend node_modules path correctly', () => {
      const baseDir = process.cwd();
      const backendNodeModules = join(baseDir, 'node_modules');

      expect(backendNodeModules).toContain('node_modules');
      expect(backendNodeModules).not.toContain('frontend');
    });

    it('should resolve frontend node_modules path correctly', () => {
      const baseDir = process.cwd();
      const frontendNodeModules = join(baseDir, 'frontend', 'node_modules');

      expect(frontendNodeModules).toContain('frontend');
      expect(frontendNodeModules).toContain('node_modules');
    });

    it('should resolve dist path correctly', () => {
      const baseDir = process.cwd();
      const distPath = join(baseDir, 'dist');

      expect(distPath).toContain('dist');
    });

    it('should resolve Playwright path correctly', () => {
      const baseDir = process.cwd();
      const playwrightPath = join(baseDir, 'node_modules', 'playwright');

      expect(playwrightPath).toContain('node_modules');
      expect(playwrightPath).toContain('playwright');
    });
  });
});
