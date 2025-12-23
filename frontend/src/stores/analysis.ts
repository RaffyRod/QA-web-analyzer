/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { AnalysisOptions as AnalysisOptionsType } from '../../../src/types/index';

export type AnalysisOptions = AnalysisOptionsType;

export interface AnalysisResults {
  images?: any[];
  links?: any[];
  buttons?: any[];
  inputs?: any[];
  roles?: any[];
  summary?: any;
}

export const useAnalysisStore = defineStore('analysis', () => {
  const isLoading = ref(false);
  const results = ref<AnalysisResults | null>(null);
  const error = ref<string | null>(null);
  let abortController: AbortController | null = null;
  const options = ref<AnalysisOptions>({
    // Elements
    checkImages: false,
    checkLinks: false,
    checkButtons: false,
    checkInputs: false,
    checkRoles: false,
    checkHeadings: false,
    checkTables: false,
    checkFormElements: false,
    // ARIA Labels & Names
    checkAltText: false,
    checkAriaLabel: false,
    checkAriaLabelledby: false,
    checkAriaDescribedby: false,
    // ARIA States
    checkAriaChecked: false,
    checkAriaDisabled: false,
    checkAriaExpanded: false,
    checkAriaHidden: false,
    checkAriaInvalid: false,
    checkAriaPressed: false,
    checkAriaRequired: false,
    // ARIA Relationships
    checkAriaControls: false,
    checkAriaCurrent: false,
    // ARIA Live Regions
    checkAriaBusy: false,
    checkAriaLive: false,
    // Form Attributes
    checkAutocomplete: false,
    checkLabels: false,
    checkRequired: false,
    // Other Attributes
    checkFocusStates: false,
    checkHref: false,
    checkLang: false,
    checkTabIndex: false,
    checkTitle: false,
  });

  /**
   * Verifies that a server is actually our QA Web Analyzer backend
   * by checking if it responds correctly to the /api/analyze endpoint
   * Uses OPTIONS for faster verification, falls back to POST if needed
   */
  async function verifyBackendServer(url: string, fastCheck: boolean = true): Promise<boolean> {
    try {
      // Fast check: Use OPTIONS to quickly verify the endpoint exists
      if (fastCheck) {
        const optionsResponse = await fetch(`${url}/analyze`, {
          method: 'OPTIONS',
          signal: AbortSignal.timeout(1000),
        });
        // If OPTIONS works and returns non-404, likely our backend
        if (optionsResponse.status !== 404) {
          return true;
        }
      }

      // Fallback: Full POST verification (slower but more reliable)
      const response = await fetch(`${url}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com', options: {} }),
        signal: AbortSignal.timeout(2000),
      });

      // Our backend should return 400 (bad request) for invalid URLs or 200 for valid ones
      // But NOT 404 (not found) which would indicate it's not our backend
      return response.status !== 404;
    } catch {
      return false;
    }
  }

  /**
   * Scans a range of ports to find the backend server
   * @param startPort - Starting port number
   * @param endPort - Ending port number
   * @param maxAttempts - Maximum number of ports to try (to avoid infinite loops)
   * @returns Promise resolving to backend URL if found, null otherwise
   */
  async function scanPortRange(
    startPort: number,
    endPort: number,
    maxAttempts: number = 50
  ): Promise<string | null> {
    const portsToScan = Math.min(endPort - startPort + 1, maxAttempts);
    let attempts = 0;

    for (let port = startPort; port <= endPort && attempts < portsToScan; port++, attempts++) {
      try {
        const testUrl = `http://localhost:${port}/api`;
        const response = await fetch(`${testUrl}/analyze`, {
          method: 'OPTIONS',
          signal: AbortSignal.timeout(800),
        });

        // Check if it responds (not 404) and verify it's our backend
        if (response.status !== 404 && response.status !== 500) {
          if (await verifyBackendServer(testUrl, true)) {
            console.log(`✅ Found QA Web Analyzer backend on port ${port}`);
            return testUrl;
          }
        }
      } catch {
        // Port not responding, try next
        continue;
      }
    }

    return null;
  }

  /**
   * Tries to find the backend server by attempting multiple ports
   * Verifies that it's actually our backend, not another server
   */
  async function findBackendUrl(): Promise<string> {
    // If VITE_API_URL is set, use it (trust the user)
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }

    // Try ports in priority order (matches server.ts)
    // Uses ports 4000-4005 and 5000-5005 which are rarely used by common frameworks
    // Also tries common ports 3000-3005, 6000-6005, 7000-7005 in case backend falls back to them
    const portsToTry = [
      4000, 4001, 4002, 4003, 4004, 4005, 5000, 5001, 5002, 5003, 5004, 5005, 3000, 3001, 3002,
      3003, 3004, 3005, 6000, 6001, 6002, 6003, 6004, 6005, 7000, 7001, 7002, 7003, 7004, 7005,
    ];

    // First, try the default proxy endpoint (Vite will handle the proxy)
    try {
      const testResponse = await fetch('/api/analyze', {
        method: 'OPTIONS',
        signal: AbortSignal.timeout(1000),
      });
      // If we get any response (not a network error), the proxy is working
      if (testResponse.status !== 500 && testResponse.status !== 404) {
        // Verify it's actually our backend (fast check)
        if (await verifyBackendServer('/api', true)) {
          return '/api';
        }
      }
    } catch {
      // Proxy failed, try direct ports
    }

    // If proxy fails, try direct connections to known backend ports
    // Verify each one is actually our backend, not another server
    for (const port of portsToTry) {
      try {
        const testUrl = `http://localhost:${port}/api`;
        const response = await fetch(`${testUrl}/analyze`, {
          method: 'OPTIONS',
          signal: AbortSignal.timeout(800),
        });

        // Check if it responds (not 404) and verify it's our backend
        if (response.status !== 404 && response.status !== 500) {
          if (await verifyBackendServer(testUrl, true)) {
            console.log(`✅ Found QA Web Analyzer backend on port ${port}`);
            return testUrl;
          } else {
            console.log(`⚠️ Port ${port} has a server, but it's not our backend (skipping)`);
          }
        }
      } catch {
        // Port not responding, try next
        continue;
      }
    }

    // Fallback: Scan wider port ranges if known ports failed
    console.warn('⚠️ Could not find backend in known ports, scanning wider range...');
    const fallbackRanges = [
      { start: 3000, end: 3999, maxAttempts: 100 }, // Common development ports
      { start: 8000, end: 8999, maxAttempts: 100 }, // Alternative common ports
    ];

    for (const range of fallbackRanges) {
      const found = await scanPortRange(range.start, range.end, range.maxAttempts);
      if (found) {
        return found;
      }
    }

    // Final fallback to proxy (will show error if backend is not running)
    console.warn('⚠️ Could not auto-detect backend, using default proxy');
    return '/api';
  }

  async function analyze(url: string) {
    // Cancel any ongoing analysis
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();
    isLoading.value = true;
    error.value = null;

    try {
      let apiUrl = await findBackendUrl();
      let fullUrl = apiUrl.endsWith('/api') ? `${apiUrl}/analyze` : apiUrl;
      let response: Response;
      let lastError: Error | null = null;

      // Try proxy first, then direct connection if it fails
      const tryRequest = async (requestUrl: string): Promise<Response> => {
        return await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, options: options.value }),
          signal: abortController!.signal,
        });
      };

      try {
        // First attempt: use the found URL (usually proxy)
        response = await tryRequest(fullUrl);
      } catch (proxyError: any) {
        console.warn('⚠️ Request failed, trying to find backend again:', proxyError.message);
        lastError = proxyError;

        // If the found URL doesn't work, try to find the backend again
        // This handles cases where the backend might have moved or the initial detection failed
        try {
          const newBackendUrl = await findBackendUrl();
          const newFullUrl = newBackendUrl.endsWith('/api')
            ? `${newBackendUrl}/analyze`
            : newBackendUrl;

          // Only retry if we found a different URL
          if (newFullUrl !== fullUrl) {
            console.log(`🔄 Retrying with backend URL: ${newFullUrl}`);
            response = await tryRequest(newFullUrl);
          } else {
            throw lastError || new Error('Failed to connect to backend server');
          }
        } catch (retryError) {
          throw lastError || new Error('Failed to connect to backend server');
        }
      }

      if (!response.ok) {
        let errorMessage = `Analysis failed (${response.status})`;
        let errorDetails = '';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            errorMessage = data.message || data.error || errorMessage;
            errorDetails = data.details || '';
          } else {
            const text = await response.text();
            // Check if we got HTML instead of JSON
            if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
              errorMessage =
                'Server returned HTML instead of JSON. The backend may not be running correctly.';
              errorDetails = 'Check the backend console for errors.';
            } else {
              errorMessage = text || errorMessage;
            }
          }
        } catch (parseError) {
          // If parsing fails, use the status text
          errorMessage = response.statusText || errorMessage;
        }
        const fullErrorMessage = errorDetails
          ? `${errorMessage}\n\nDetails: ${errorDetails}`
          : errorMessage;
        throw new Error(fullErrorMessage);
      }

      // Check if response has content before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        // Check if we got HTML instead of JSON
        if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
          throw new Error(
            'Server returned HTML instead of JSON. The backend may not be running correctly. Check the backend console for errors.'
          );
        }
        throw new Error(
          `Invalid response format from server. Expected JSON, got: ${contentType || 'unknown'}`
        );
      }

      const text = await response.text();
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server');
      }

      // Check if response is HTML (common error case)
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        throw new Error(
          'Server returned HTML instead of JSON. The backend may not be running correctly. Check the backend console for errors.'
        );
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse JSON. Response text:', text.substring(0, 200));
        throw new Error(
          `Failed to parse server response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}. The server may have returned HTML instead of JSON.`
        );
      }
      results.value = {
        ...data,
        url: url,
        analyzedAt: new Date().toISOString(),
      };

      // Trigger completion notification
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('analysis-completed', {
            detail: { success: true, url },
          })
        );
      }
    } catch (err: any) {
      console.error('Analysis error in store:', err);
      if (err.name === 'AbortError') {
        // Don't set error for cancellation - it's a user action, not an error
        error.value = null;
      } else {
        const errorMsg = err.message || 'Failed to analyze page';
        error.value = errorMsg;
        console.error('Full error message:', errorMsg);
        console.error('Error stack:', err.stack);
      }
      results.value = null;
    } finally {
      isLoading.value = false;
      abortController = null;
    }
  }

  function stop() {
    if (abortController) {
      abortController.abort();
    }
  }

  function updateOptions(newOptions: Partial<AnalysisOptions>) {
    options.value = { ...options.value, ...newOptions };
  }

  function reset() {
    results.value = null;
    error.value = null;
  }

  return {
    isLoading,
    results,
    error,
    options,
    analyze,
    stop,
    updateOptions,
    reset,
  };
});
