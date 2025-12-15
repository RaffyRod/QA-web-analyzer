import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnalyzerService } from '../../src/services/analyzer.service.js';
import { chromium } from 'playwright';
import type { AnalysisOptions } from '../../src/types/index.js';

vi.mock('playwright', () => ({
  chromium: {
    launch: vi.fn(),
  },
}));

describe('AnalyzerService', () => {
  let analyzerService: AnalyzerService;
  let mockPage: any;
  let mockBrowser: any;

  beforeEach(() => {
    analyzerService = new AnalyzerService();
    mockPage = {
      goto: vi.fn().mockResolvedValue(undefined),
      evaluate: vi.fn(),
      close: vi.fn(),
      screenshot: vi.fn().mockResolvedValue(Buffer.from('fake-image')),
    };
    mockBrowser = {
      newPage: vi.fn().mockResolvedValue(mockPage),
      close: vi.fn(),
    };
    (chromium.launch as any).mockResolvedValue(mockBrowser);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('analyzePage', () => {
    const defaultOptions: AnalysisOptions = {
      checkImages: true,
      checkLinks: true,
      checkButtons: true,
      checkInputs: true,
      checkRoles: true,
      checkAltText: true,
      checkAriaLabel: true,
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
      checkLabels: true,
      checkTitle: true,
      checkFocusStates: true,
      checkHref: false,
    };

    it('should successfully analyze a page with images', async () => {
      const mockResults = {
        images: [
          {
            index: 1,
            src: 'https://example.com/image.jpg',
            alt: 'Test image',
            hasAccessibility: true,
            missingAttributes: [],
            selector: '1',
            outerHTML: '<img src="https://example.com/image.jpg" alt="Test image">',
            screenshot: 'data:image/png;base64,fake',
          },
        ],
        links: [],
        buttons: [],
        inputs: [],
        roles: [],
        summary: {
          totalImages: 1,
          imagesWithoutAlt: 0,
        },
      };

      mockPage.evaluate.mockResolvedValue(mockResults);

      const result = await analyzerService.analyzePage('https://example.com', defaultOptions);

      expect(result).toBeDefined();
      expect(result.images).toHaveLength(1);
      expect(mockBrowser.newPage).toHaveBeenCalled();
      expect(mockPage.goto).toHaveBeenCalledWith('https://example.com', {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      expect(mockBrowser.close).toHaveBeenCalled();
    });

    it('should handle pages with no images', async () => {
      const mockResults = {
        images: [],
        links: [],
        buttons: [],
        inputs: [],
        roles: [],
        summary: {
          totalImages: 0,
          imagesWithoutAlt: 0,
        },
      };

      mockPage.evaluate.mockResolvedValue(mockResults);

      const result = await analyzerService.analyzePage('https://example.com', defaultOptions);

      expect(result.images).toHaveLength(0);
      expect(result.summary.totalImages).toBe(0);
    });

    it('should handle errors during page navigation', async () => {
      mockPage.goto.mockRejectedValue(new Error('Navigation failed'));

      await expect(
        analyzerService.analyzePage('https://example.com', defaultOptions)
      ).rejects.toThrow('Navigation failed');

      expect(mockBrowser.close).toHaveBeenCalled();
    });

    it('should handle errors during page evaluation', async () => {
      mockPage.evaluate.mockRejectedValue(new Error('Evaluation failed'));

      await expect(
        analyzerService.analyzePage('https://example.com', defaultOptions)
      ).rejects.toThrow('Evaluation failed');

      expect(mockBrowser.close).toHaveBeenCalled();
    });

    it('should close browser even if an error occurs', async () => {
      mockPage.goto.mockRejectedValue(new Error('Test error'));

      try {
        await analyzerService.analyzePage('https://example.com', defaultOptions);
      } catch (error) {
        // Expected error
      }

      expect(mockBrowser.close).toHaveBeenCalled();
    });

    it('should analyze links when checkLinks is enabled', async () => {
      const mockResults = {
        images: [],
        links: [
          {
            index: 1,
            href: 'https://example.com',
            text: 'Example Link',
            hasAccessibility: true,
            missingAttributes: [],
            selector: '1',
            outerHTML: '<a href="https://example.com">Example Link</a>',
            screenshot: 'data:image/png;base64,fake',
          },
        ],
        buttons: [],
        inputs: [],
        roles: [],
        summary: {
          totalLinks: 1,
          linksWithoutAccessibility: 0,
        },
      };

      mockPage.evaluate.mockResolvedValue(mockResults);

      const result = await analyzerService.analyzePage('https://example.com', defaultOptions);

      expect(result.links).toHaveLength(1);
      expect(result.summary.totalLinks).toBe(1);
    });

    it('should analyze buttons when checkButtons is enabled', async () => {
      const mockResults = {
        images: [],
        links: [],
        buttons: [
          {
            index: 1,
            text: 'Click Me',
            hasAccessibility: true,
            missingAttributes: [],
            selector: '1',
            outerHTML: '<button>Click Me</button>',
            screenshot: 'data:image/png;base64,fake',
          },
        ],
        inputs: [],
        roles: [],
        summary: {
          totalButtons: 1,
          buttonsWithoutAccessibility: 0,
        },
      };

      mockPage.evaluate.mockResolvedValue(mockResults);

      const result = await analyzerService.analyzePage('https://example.com', defaultOptions);

      expect(result.buttons).toHaveLength(1);
      expect(result.summary.totalButtons).toBe(1);
    });
  });
});
