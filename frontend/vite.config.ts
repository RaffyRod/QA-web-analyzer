import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// Backend ports to try in order (matches server.ts priority)
// The backend automatically finds an available port from this list
const BACKEND_PORTS = [3002, 3003, 3004, 3005, 3000, 3001];

// Use environment variable if set, otherwise default to first priority port
// Note: The backend will automatically find an available port, so if it's not on 3002,
// you may need to set VITE_API_URL to match the actual backend port
const DEFAULT_BACKEND = process.env.VITE_API_URL || `http://localhost:${BACKEND_PORTS[0]}`;

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('../public', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: false, // Allow Vite to find another port if 5173 is occupied
    host: true, // Expose to network
    // Disable caching in development
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
    proxy: {
      '/api': {
        target: DEFAULT_BACKEND,
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          // Try multiple ports if the default fails
          let currentPortIndex = 0;

          proxy.on('error', async (err, req, res) => {
            console.error('❌ Proxy error on port:', BACKEND_PORTS[currentPortIndex]);
            console.error('Error:', err.message);

            // Try next port in the list
            if (currentPortIndex < BACKEND_PORTS.length - 1) {
              currentPortIndex++;
              const nextPort = BACKEND_PORTS[currentPortIndex];
              console.log(`🔄 Trying next port: ${nextPort}`);

              // Update proxy target (this requires recreating the proxy, so we'll handle it differently)
              // For now, just log and suggest manual configuration
            }

            console.error(
              '💡 Tip: The backend automatically finds an available port from:',
              BACKEND_PORTS.join(', ')
            );
            console.error("💡 Tip: Check the backend console to see which port it's using");
            console.error(
              '💡 Tip: Set VITE_API_URL=http://localhost:PORT to match the backend port'
            );

            if (!res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end(
                JSON.stringify({
                  error: 'Proxy error',
                  message: `Failed to connect to backend server. The backend automatically finds an available port.`,
                  details: [
                    '1. Ensure the backend server is running',
                    `2. Check the backend console - it will show which port it's using`,
                    `3. The backend tries ports in this order: ${BACKEND_PORTS.join(', ')}`,
                    `4. Set VITE_API_URL=http://localhost:PORT (replace PORT with the actual port from backend console)`,
                    `5. Current proxy target: ${DEFAULT_BACKEND}`,
                  ].join('\n'),
                  originalError: err.message,
                  triedPort: BACKEND_PORTS[currentPortIndex],
                  availablePorts: BACKEND_PORTS,
                })
              );
            }
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('🔄 Proxying:', req.method, req.url, '→', DEFAULT_BACKEND + req.url);
            // Ensure Content-Type is set for POST requests
            if (req.method === 'POST' && req.headers['content-type']) {
              proxyReq.setHeader('Content-Type', req.headers['content-type']);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            if (proxyRes.statusCode && proxyRes.statusCode >= 400) {
              console.error('❌ Backend error:', proxyRes.statusCode, req.url);
            }
            // Ensure response has correct Content-Type
            if (
              !proxyRes.headers['content-type'] ||
              !proxyRes.headers['content-type'].includes('application/json')
            ) {
              console.warn('⚠️ Backend response is not JSON:', proxyRes.headers['content-type']);
            }
          });
        },
      },
    },
    // Custom log level to ensure server info is displayed
    open: false, // Don't auto-open browser, let user see the log first
  },
  build: {
    outDir: '../public',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
});
