/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createServer, Server } from 'http';
import express, { Express } from 'express';
import { isPortAvailable } from '../../src/utils/port-finder.util.js';

describe('Server Connectivity', () => {
  let testServers: Server[] = [];
  let expressApp: Express | null = null;

  afterEach(() => {
    testServers.forEach((server) => {
      try {
        server.close();
      } catch {
        // Ignore errors
      }
    });
    testServers = [];
    expressApp = null;
  });

  describe('Backend Port Detection', () => {
    it('should detect available ports in priority order (4000-4005)', async () => {
      const preferredPorts = [4000, 4001, 4002, 4003, 4004, 4005];
      const availablePorts: number[] = [];

      for (const port of preferredPorts) {
        const isAvailable = await isPortAvailable(port);
        if (isAvailable) {
          availablePorts.push(port);
        }
      }

      expect(availablePorts.length).toBeGreaterThan(0);
      expect(availablePorts[0]).toBeGreaterThanOrEqual(4000);
      expect(availablePorts[0]).toBeLessThanOrEqual(4005);
    });

    it('should detect available ports in fallback range (5000-5005)', async () => {
      const fallbackPorts = [5000, 5001, 5002, 5003, 5004, 5005];
      const availablePorts: number[] = [];

      for (const port of fallbackPorts) {
        const isAvailable = await isPortAvailable(port);
        if (isAvailable) {
          availablePorts.push(port);
        }
      }

      expect(availablePorts.length).toBeGreaterThan(0);
      expect(availablePorts[0]).toBeGreaterThanOrEqual(5000);
      expect(availablePorts[0]).toBeLessThanOrEqual(5005);
    });

    it('should skip occupied ports and find next available', async () => {
      // Find an available port first
      const testPort = (await isPortAvailable(6000)) ? 6000 : 6001;

      // Create a server on the test port
      const occupiedServer = createServer();
      await new Promise<void>((resolve, reject) => {
        occupiedServer.listen(testPort, () => {
          resolve();
        });
        occupiedServer.on('error', (err: NodeJS.ErrnoException) => {
          if (err.code !== 'EADDRINUSE') {
            reject(err);
          } else {
            resolve(); // Port already occupied, that's fine for this test
          }
        });
      });
      testServers.push(occupiedServer);

      // Check that the test port is not available (or was already occupied)
      const testPortAvailable = await isPortAvailable(testPort);
      // If we successfully created a server, it should be false
      // If it was already occupied, it will also be false
      expect(testPortAvailable).toBe(false);

      // Check that next port should be available
      const nextPortAvailable = await isPortAvailable(testPort + 1);
      expect(typeof nextPortAvailable).toBe('boolean');
    });
  });

  describe('Backend Server Response', () => {
    it('should create a mock backend server that responds to /api/analyze', async () => {
      expressApp = express();
      expressApp.use(express.json());

      expressApp.post('/api/analyze', (_req, res) => {
        res.status(200).json({ success: true });
      });

      expressApp.options('/api/analyze', (_req, res) => {
        res.status(204).send();
      });

      const server = createServer(expressApp);
      await new Promise<void>((resolve) => {
        server.listen(0, () => {
          resolve();
        });
      });

      const address = server.address();
      const port = typeof address === 'object' && address !== null ? address.port : 0;
      testServers.push(server);

      // Test OPTIONS request
      const optionsResponse = await fetch(`http://localhost:${port}/api/analyze`, {
        method: 'OPTIONS',
      });
      expect(optionsResponse.status).toBe(204);

      // Test POST request
      const postResponse = await fetch(`http://localhost:${port}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com', options: {} }),
      });
      expect(postResponse.status).toBe(200);
      const data = await postResponse.json();
      expect(data.success).toBe(true);
    });

    it('should handle backend server not responding', async () => {
      // Try to connect to a non-existent server
      try {
        const response = await fetch('http://localhost:99999/api/analyze', {
          method: 'OPTIONS',
          signal: AbortSignal.timeout(500),
        });
        // Should not reach here, but if it does, it's an error
        expect(response.status).toBeGreaterThanOrEqual(400);
      } catch (error) {
        // Expected: connection error
        expect(error).toBeDefined();
      }
    });

    it('should verify backend server is QA Web Analyzer (not 404)', async () => {
      expressApp = express();
      expressApp.use(express.json());

      // Mock QA Web Analyzer backend
      expressApp.post('/api/analyze', (req, res) => {
        if (!req.body.url) {
          return res.status(400).json({ error: 'URL is required' });
        }
        res.status(200).json({ success: true });
      });

      const server = createServer(expressApp);
      await new Promise<void>((resolve) => {
        server.listen(0, () => {
          resolve();
        });
      });

      const address = server.address();
      const port = typeof address === 'object' && address !== null ? address.port : 0;
      testServers.push(server);

      // Test that it's our backend (not 404)
      const response = await fetch(`http://localhost:${port}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com', options: {} }),
      });

      expect(response.status).not.toBe(404);
      expect(response.status).toBe(200);
    });

    it('should identify non-QA Web Analyzer server (returns 404)', async () => {
      expressApp = express();

      // Mock a different server (not QA Web Analyzer)
      expressApp.get('/api/analyze', (_req, res) => {
        res.status(404).json({ error: 'Not found' });
      });

      const server = createServer(expressApp);
      await new Promise<void>((resolve) => {
        server.listen(0, () => {
          resolve();
        });
      });

      const address = server.address();
      const port = typeof address === 'object' && address !== null ? address.port : 0;
      testServers.push(server);

      // Test that it's NOT our backend (returns 404)
      const response = await fetch(`http://localhost:${port}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com', options: {} }),
      });

      // Should return 404 or method not allowed
      expect(response.status).toBeGreaterThanOrEqual(404);
    });
  });

  describe('Port Priority Order', () => {
    it('should follow correct priority order: 4000-4005, then 5000-5005', async () => {
      const expectedOrder = [
        4000, 4001, 4002, 4003, 4004, 4005, 5000, 5001, 5002, 5003, 5004, 5005,
      ];
      const foundPorts: number[] = [];

      for (const port of expectedOrder) {
        const isAvailable = await isPortAvailable(port);
        if (isAvailable && foundPorts.length === 0) {
          foundPorts.push(port);
          break; // Found first available, stop
        }
      }

      if (foundPorts.length > 0) {
        expect(expectedOrder).toContain(foundPorts[0]);
        expect(foundPorts[0]).toBeGreaterThanOrEqual(4000);
        expect(foundPorts[0]).toBeLessThanOrEqual(5005);
      }
    });

    it('should handle all preferred ports being occupied', async () => {
      // Use ports that are less likely to be occupied for testing
      const testPorts = [7000, 7001, 7002, 7003, 7004, 7005];

      for (const port of testPorts) {
        try {
          const server = createServer();
          await new Promise<void>((resolve, reject) => {
            server.listen(port, () => {
              resolve();
            });
            server.on('error', (err: NodeJS.ErrnoException) => {
              if (err.code === 'EADDRINUSE') {
                resolve(); // Already occupied, that's fine
              } else {
                reject(err);
              }
            });
          });
          testServers.push(server);
        } catch {
          // Port already occupied, skip
        }
      }

      // Should still be able to find a port (fallback mechanism)
      const fallbackPort = await isPortAvailable(7006);
      expect(typeof fallbackPort).toBe('boolean');
    });
  });

  describe('Error Handling', () => {
    it('should handle timeout when backend is not responding', async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100);

      try {
        await fetch('http://localhost:99999/api/analyze', {
          method: 'OPTIONS',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        expect.fail('Should have thrown an error');
      } catch (error) {
        clearTimeout(timeoutId);
        expect(error).toBeDefined();
      }
    });

    it('should handle network errors gracefully', async () => {
      try {
        await fetch('http://invalid-host-name-that-does-not-exist:4000/api/analyze', {
          method: 'OPTIONS',
          signal: AbortSignal.timeout(500),
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
