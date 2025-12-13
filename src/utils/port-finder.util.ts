import { createServer, Server } from 'http';

/**
 * Finds an available port starting from the specified port
 * @param startPort - The port to start checking from
 * @returns Promise resolving to an available port number
 */
export function findAvailablePort(startPort: number = 3000): Promise<number> {
  return new Promise((resolve, reject) => {
    const server: Server = createServer();

    server.listen(startPort, () => {
      const address = server.address();
      const port = typeof address === 'object' && address !== null ? address.port : startPort;
      server.close(() => resolve(port));
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

