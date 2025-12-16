import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

// Backend ports to try in order (matches server.ts priority)
// Uses ports 4000-4005 and 5000-5005 which are rarely used by common frameworks on Mac/Windows
const BACKEND_PORTS = [4000, 4001, 4002, 4003, 4004, 4005, 5000, 5001, 5002, 5003, 5004, 5005];

/**
 * Gets the default backend port
 * The frontend store will auto-detect the correct port if this one doesn't work
 */
function getDefaultBackendPort(): number {
  // If VITE_API_URL is set, extract port from it
  if (process.env.VITE_API_URL) {
    const match = process.env.VITE_API_URL.match(/:(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  // Return first port in priority list
  // The frontend store will auto-detect the correct port if this one doesn't work
  return BACKEND_PORTS[0];
}

const DEFAULT_BACKEND = `http://localhost:${getDefaultBackendPort()}`;

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
          proxy.on('error', (err, req, res) => {
            // Only log if response hasn't been sent (avoid duplicate errors)
            if (!res.headersSent) {
              console.error('❌ Proxy error connecting to backend:', err.message);
              console.error(
                `💡 Backend should be running on one of these ports: ${BACKEND_PORTS.join(', ')}`
              );
              console.error(`💡 The frontend will auto-detect and connect directly if proxy fails`);
            }
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Silent proxy logging - the store will handle connection errors
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            if (proxyRes.statusCode && proxyRes.statusCode >= 400) {
              console.error('❌ Backend error:', proxyRes.statusCode, req.url);
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
