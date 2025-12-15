/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { createServer, Server } from 'http';

/**
 * Checks if a specific port is available
 * @param port - The port to check
 * @returns Promise resolving to true if port is available, false otherwise
 */
export function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server: Server = createServer();

    server.listen(port, () => {
      server.close(() => resolve(true));
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(false);
      }
    });
  });
}

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
        findAvailablePort(startPort + 1)
          .then(resolve)
          .catch(reject);
      } else {
        reject(err);
      }
    });
  });
}
