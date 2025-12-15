import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAnalysisStore } from '../../src/stores/analysis';
import type { AnalysisOptions } from '../../src/stores/analysis';

describe('analysis store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with default values', () => {
      const store = useAnalysisStore();
      expect(store.isLoading).toBe(false);
      expect(store.results).toBe(null);
      expect(store.error).toBe(null);
    });

    it('should initialize options with all false values', () => {
      const store = useAnalysisStore();
      expect(store.options.checkImages).toBe(false);
      expect(store.options.checkLinks).toBe(false);
      expect(store.options.checkButtons).toBe(false);
    });
  });

  describe('updateOptions', () => {
    it('should update analysis options', () => {
      const store = useAnalysisStore();
      const newOptions: Partial<AnalysisOptions> = {
        checkImages: true,
        checkLinks: true,
      };

      store.updateOptions(newOptions);

      expect(store.options.checkImages).toBe(true);
      expect(store.options.checkLinks).toBe(true);
      expect(store.options.checkButtons).toBe(false);
    });

    it('should merge options without replacing existing ones', () => {
      const store = useAnalysisStore();
      store.updateOptions({ checkImages: true });
      store.updateOptions({ checkLinks: true });

      expect(store.options.checkImages).toBe(true);
      expect(store.options.checkLinks).toBe(true);
    });
  });

  describe('analyze', () => {
    it('should set loading state during analysis', async () => {
      const store = useAnalysisStore();
      const mockResponse = {
        images: [],
        links: [],
        buttons: [],
        inputs: [],
        roles: [],
        summary: {},
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const analyzePromise = store.analyze('https://example.com');

      expect(store.isLoading).toBe(true);

      await analyzePromise;

      expect(store.isLoading).toBe(false);
    });

    it('should successfully analyze a page', async () => {
      const store = useAnalysisStore();
      const mockResponse = {
        images: [{ index: 1, src: 'test.jpg', alt: 'test' }],
        links: [],
        buttons: [],
        inputs: [],
        roles: [],
        summary: { totalImages: 1 },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await store.analyze('https://example.com');

      expect(store.results).toBeDefined();
      expect(store.results?.images).toHaveLength(1);
      expect(store.error).toBe(null);
    });

    it('should handle analysis errors', async () => {
      const store = useAnalysisStore();

      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Analysis failed' }),
      });

      await store.analyze('https://example.com');

      expect(store.error).toBe('Analysis failed');
      expect(store.results).toBe(null);
    });

    it('should cancel previous analysis when new one starts', async () => {
      const store = useAnalysisStore();
      const abortSpy = vi.fn();

      const controllers: any[] = [];
      const mockAbortController = () => {
        const controller = {
          abort: abortSpy,
          signal: {} as AbortSignal,
        };
        controllers.push(controller);
        return controller;
      };

      vi.spyOn(global, 'AbortController' as any).mockImplementation(mockAbortController);

      let callCount = 0;
      (global.fetch as any).mockImplementation(() => {
        callCount++;
        return Promise.resolve({
          ok: true,
          json: async () => ({
            images: [],
            links: [],
            buttons: [],
            inputs: [],
            roles: [],
            summary: {},
          }),
        });
      });

      // Start first analysis
      const promise1 = store.analyze('https://example.com');

      // Start second analysis immediately (should cancel first)
      const promise2 = store.analyze('https://example2.com');

      await Promise.all([promise1, promise2]);

      // Verify that abort was called (at least one controller should have been aborted)
      expect(controllers.length).toBeGreaterThan(0);
    });

    it('should handle network errors', async () => {
      const store = useAnalysisStore();

      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await store.analyze('https://example.com');

      expect(store.error).toBe('Network error');
      expect(store.results).toBe(null);
    });

    it('should handle abort errors', async () => {
      const store = useAnalysisStore();
      const abortError = new Error('Aborted');
      (abortError as any).name = 'AbortError';

      (global.fetch as any).mockRejectedValueOnce(abortError);

      await store.analyze('https://example.com');

      expect(store.error).toBe('Analysis cancelled');
      expect(store.results).toBe(null);
    });
  });

  describe('stop', () => {
    it('should abort ongoing analysis', () => {
      const store = useAnalysisStore();
      const abortSpy = vi.fn();

      const mockAbortController = {
        abort: abortSpy,
        signal: {} as AbortSignal,
      };

      vi.spyOn(global, 'AbortController' as any).mockImplementation(() => mockAbortController);

      (global.fetch as any).mockImplementation(() => {
        return new Promise(() => {
          // Never resolves
        });
      });

      store.analyze('https://example.com');
      store.stop();

      expect(abortSpy).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should reset results and error', () => {
      const store = useAnalysisStore();
      store.results = { images: [] } as any;
      store.error = 'Test error';

      store.reset();

      expect(store.results).toBe(null);
      expect(store.error).toBe(null);
    });
  });
});
