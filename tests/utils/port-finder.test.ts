import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { findAvailablePort, isPortAvailable } from '../../src/utils/port-finder.util.js';
import { createServer, Server } from 'http';

describe('port-finder.util', () => {
  describe('findAvailablePort', () => {
    let testServer: Server | null = null;

    afterEach(() => {
      if (testServer) {
        testServer.close();
        testServer = null;
      }
    });

    it('should find an available port starting from default port 3000', async () => {
      const port = await findAvailablePort(3000);
      expect(port).toBeGreaterThanOrEqual(3000);
      expect(typeof port).toBe('number');
    });

    it('should find an available port starting from custom port', async () => {
      const port = await findAvailablePort(4000);
      expect(port).toBeGreaterThanOrEqual(4000);
      expect(typeof port).toBe('number');
    });

    it('should find next available port if starting port is in use', async () => {
      // Create a server on port 5000
      testServer = createServer();
      await new Promise<void>((resolve) => {
        testServer!.listen(5000, () => {
          resolve();
        });
      });

      // Try to find port starting from 5000
      const port = await findAvailablePort(5000);
      expect(port).toBeGreaterThan(5000);
    });

    it('should handle multiple consecutive port checks', async () => {
      const ports: number[] = [];
      for (let i = 0; i < 5; i++) {
        const port = await findAvailablePort(6000 + i);
        ports.push(port);
      }
      expect(ports.length).toBe(5);
      expect(new Set(ports).size).toBeGreaterThan(1);
    });

    it('should reject on non-EADDRINUSE errors', async () => {
      const originalListen = Server.prototype.listen;
      const mockListen = vi.fn().mockImplementation(function (this: Server, ...args: any[]) {
        const callback = args[args.length - 1];
        if (typeof callback === 'function') {
          const error = new Error('Custom error') as NodeJS.ErrnoException;
          error.code = 'CUSTOM_ERROR';
          this.emit('error', error);
        }
        return this;
      });

      Server.prototype.listen = mockListen;

      await expect(findAvailablePort(7000)).rejects.toThrow('Custom error');

      Server.prototype.listen = originalListen;
    });
  });

  describe('isPortAvailable', () => {
    let testServer: Server | null = null;

    afterEach(() => {
      if (testServer) {
        testServer.close();
        testServer = null;
      }
    });

    it('should return true for an available port', async () => {
      const isAvailable = await isPortAvailable(8000);
      expect(isAvailable).toBe(true);
    });

    it('should return false for an occupied port', async () => {
      // Create a server on port 8001
      testServer = createServer();
      await new Promise<void>((resolve) => {
        testServer!.listen(8001, () => {
          resolve();
        });
      });

      const isAvailable = await isPortAvailable(8001);
      expect(isAvailable).toBe(false);
    });

    it('should correctly identify multiple ports', async () => {
      const results = await Promise.all([
        isPortAvailable(9000),
        isPortAvailable(9001),
        isPortAvailable(9002),
      ]);

      expect(results.every((result) => typeof result === 'boolean')).toBe(true);
    });
  });
});
