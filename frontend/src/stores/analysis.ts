/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AnalysisOptions {
  checkImages: boolean;
  checkLinks: boolean;
  checkButtons: boolean;
  checkInputs: boolean;
  checkRoles: boolean;
  checkAltText: boolean;
  checkAriaLabel: boolean;
  checkAriaLabelledby: boolean;
  checkAriaDescribedby: boolean;
  checkAriaHidden: boolean;
  checkAriaExpanded: boolean;
  checkAriaControls: boolean;
  checkAriaCurrent: boolean;
  checkAriaRequired: boolean;
  checkAriaInvalid: boolean;
  checkTabIndex: boolean;
  checkLang: boolean;
  checkLabels: boolean;
  checkTitle: boolean;
  checkFocusStates: boolean;
  checkHref?: boolean;
}

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
    checkImages: false,
    checkLinks: false,
    checkButtons: false,
    checkInputs: false,
    checkRoles: false,
    checkAltText: false,
    checkAriaLabel: false,
    checkAriaLabelledby: false,
    checkAriaDescribedby: false,
    checkAriaHidden: false,
    checkAriaExpanded: false,
    checkAriaControls: false,
    checkAriaCurrent: false,
    checkAriaRequired: false,
    checkAriaInvalid: false,
    checkTabIndex: false,
    checkLang: false,
    checkLabels: false,
    checkTitle: false,
    checkFocusStates: false,
    checkHref: false,
  });

  /**
   * Verifies that a server is actually our QA Web Analyzer backend
   * by checking if it responds correctly to the /api/analyze endpoint
   */
  async function verifyBackendServer(url: string): Promise<boolean> {
    try {
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
   * Tries to find the backend server by attempting multiple ports
   * Verifies that it's actually our backend, not another server
   */
  async function findBackendUrl(): Promise<string> {
    // If VITE_API_URL is set, use it (trust the user)
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }

    // Try ports in priority order (matches server.ts)
    const portsToTry = [3002, 3003, 3004, 3005, 3000, 3001];

    // First, try the default proxy endpoint (Vite will handle the proxy)
    try {
      const testResponse = await fetch('/api/analyze', {
        method: 'OPTIONS',
        signal: AbortSignal.timeout(1000),
      });
      // If we get any response (not a network error), the proxy is working
      if (testResponse.status !== 500 && testResponse.status !== 404) {
        // Verify it's actually our backend
        if (await verifyBackendServer('/api')) {
          return '/api';
        }
      }
    } catch {
      // Proxy failed, try direct ports
    }

    // If proxy fails, try direct connections to backend ports
    // Verify each one is actually our backend, not another server
    for (const port of portsToTry) {
      try {
        const testUrl = `http://localhost:${port}/api`;
        const response = await fetch(`${testUrl}/analyze`, {
          method: 'OPTIONS',
          signal: AbortSignal.timeout(500),
        });

        // Check if it responds (not 404) and verify it's our backend
        if (response.status !== 404 && response.status !== 500) {
          if (await verifyBackendServer(testUrl)) {
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

    // Fallback to proxy (will show error if backend is not running)
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
        console.warn('⚠️ Proxy request failed, trying direct connection:', proxyError.message);
        lastError = proxyError;

        // If proxy fails, try direct connection to backend ports
        const portsToTry = [3002, 3003, 3004, 3005, 3000, 3001];
        let directSuccess = false;

        for (const port of portsToTry) {
          try {
            const directUrl = `http://localhost:${port}/api/analyze`;
            response = await tryRequest(directUrl);
            directSuccess = true;
            console.log(`✅ Connected directly to backend on port ${port}`);
            break;
          } catch (directError) {
            continue;
          }
        }

        if (!directSuccess) {
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
        error.value = 'Analysis cancelled';
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
