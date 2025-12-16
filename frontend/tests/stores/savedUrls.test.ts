import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSavedUrlsStore } from '../../src/stores/savedUrls';

const STORAGE_KEY = 'qa-web-analyzer-saved-urls';

describe('savedUrls store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should initialize with empty array when no localStorage value', () => {
      const store = useSavedUrlsStore();
      expect(store.savedUrls).toEqual([]);
      expect(store.canSaveMore).toBe(true);
    });

    it('should load saved URLs from localStorage on initialization', () => {
      const testUrls = ['https://example.com', 'https://test.com'];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testUrls));

      const store = useSavedUrlsStore();
      expect(store.savedUrls).toEqual(testUrls);
      expect(store.canSaveMore).toBe(true);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid json');
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const store = useSavedUrlsStore();
      expect(store.savedUrls).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should handle non-array data in localStorage', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ urls: ['test'] }));

      const store = useSavedUrlsStore();
      expect(store.savedUrls).toEqual([]);
    });

    it('should limit loaded URLs to maximum of 10', () => {
      const manyUrls = [
        'https://url1.com',
        'https://url2.com',
        'https://url3.com',
        'https://url4.com',
        'https://url5.com',
        'https://url6.com',
        'https://url7.com',
        'https://url8.com',
        'https://url9.com',
        'https://url10.com',
        'https://url11.com',
        'https://url12.com',
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(manyUrls));

      const store = useSavedUrlsStore();
      expect(store.savedUrls.length).toBe(10);
      expect(store.savedUrls).toEqual(manyUrls.slice(0, 10));
    });
  });

  describe('addUrl', () => {
    it('should add a new URL successfully', () => {
      const store = useSavedUrlsStore();
      const result = store.addUrl('https://example.com');

      expect(result).toBe(true);
      expect(store.savedUrls).toContain('https://example.com');
      expect(store.savedUrls.length).toBe(1);
      expect(store.canSaveMore).toBe(true);
    });

    it('should trim whitespace from URLs', () => {
      const store = useSavedUrlsStore();
      store.addUrl('  https://example.com  ');

      expect(store.savedUrls).toContain('https://example.com');
      expect(store.savedUrls).not.toContain('  https://example.com  ');
    });

    it('should not add empty or whitespace-only URLs', () => {
      const store = useSavedUrlsStore();
      const result1 = store.addUrl('');
      const result2 = store.addUrl('   ');
      const result3 = store.addUrl('\n\t');

      expect(result1).toBe(false);
      expect(result2).toBe(false);
      expect(result3).toBe(false);
      expect(store.savedUrls.length).toBe(0);
    });

    it('should not add duplicate URLs', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');
      const result = store.addUrl('https://example.com');

      expect(result).toBe(false);
      expect(store.savedUrls.length).toBe(1);
      expect(store.savedUrls.filter((url) => url === 'https://example.com').length).toBe(1);
    });

    it('should not add duplicate URLs with different whitespace', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');
      const result = store.addUrl('  https://example.com  ');

      expect(result).toBe(false);
      expect(store.savedUrls.length).toBe(1);
    });

    it('should remove oldest URL when at max capacity', () => {
      const store = useSavedUrlsStore();
      // Add 10 URLs
      store.addUrl('https://url1.com');
      store.addUrl('https://url2.com');
      store.addUrl('https://url3.com');
      store.addUrl('https://url4.com');
      store.addUrl('https://url5.com');
      store.addUrl('https://url6.com');
      store.addUrl('https://url7.com');
      store.addUrl('https://url8.com');
      store.addUrl('https://url9.com');
      store.addUrl('https://url10.com');

      expect(store.savedUrls.length).toBe(10);
      expect(store.canSaveMore).toBe(false);

      // Add 11th URL - should remove first one
      store.addUrl('https://url11.com');

      expect(store.savedUrls.length).toBe(10);
      expect(store.savedUrls).not.toContain('https://url1.com');
      expect(store.savedUrls).toContain('https://url11.com');
      expect(store.savedUrls[store.savedUrls.length - 1]).toBe('https://url11.com');
    });

    it('should persist URLs to localStorage when adding', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toContain('https://example.com');
    });

    it('should add URL to store even if localStorage fails', () => {
      const store = useSavedUrlsStore();

      // Mock localStorage.setItem to throw error
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('Storage quota exceeded');
      });

      const result = store.addUrl('https://example.com');

      // Should still add to store even if localStorage fails
      expect(result).toBe(true);
      expect(store.savedUrls).toContain('https://example.com');

      Storage.prototype.setItem = originalSetItem;
    });
  });

  describe('removeUrl', () => {
    it('should remove an existing URL', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');
      store.addUrl('https://test.com');

      store.removeUrl('https://example.com');

      expect(store.savedUrls).not.toContain('https://example.com');
      expect(store.savedUrls).toContain('https://test.com');
      expect(store.savedUrls.length).toBe(1);
    });

    it('should not remove non-existent URL', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      store.removeUrl('https://nonexistent.com');

      expect(store.savedUrls.length).toBe(1);
      expect(store.savedUrls).toContain('https://example.com');
    });

    it('should persist removal to localStorage', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');
      store.addUrl('https://test.com');

      store.removeUrl('https://example.com');

      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(stored!);
      expect(parsed).not.toContain('https://example.com');
      expect(parsed).toContain('https://test.com');
    });

    it('should remove URL from store even if localStorage fails', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      // Mock localStorage.setItem to throw error
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('Storage quota exceeded');
      });

      store.removeUrl('https://example.com');

      // Should still remove from store even if localStorage fails
      expect(store.savedUrls).not.toContain('https://example.com');

      Storage.prototype.setItem = originalSetItem;
    });
  });

  describe('isUrlSaved', () => {
    it('should return true for saved URL', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      expect(store.isUrlSaved('https://example.com')).toBe(true);
    });

    it('should return false for non-saved URL', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      expect(store.isUrlSaved('https://test.com')).toBe(false);
    });

    it('should handle whitespace in URL check', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      expect(store.isUrlSaved('  https://example.com  ')).toBe(true);
    });

    it('should return false for empty or whitespace-only URLs', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      expect(store.isUrlSaved('')).toBe(false);
      expect(store.isUrlSaved('   ')).toBe(false);
      expect(store.isUrlSaved('\n\t')).toBe(false);
    });

    it('should be case-sensitive', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://Example.com');

      expect(store.isUrlSaved('https://example.com')).toBe(false);
      expect(store.isUrlSaved('https://Example.com')).toBe(true);
    });
  });

  describe('canSaveMore', () => {
    it('should return true when less than 10 URLs saved', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://url1.com');
      store.addUrl('https://url2.com');
      store.addUrl('https://url3.com');

      expect(store.canSaveMore).toBe(true);
    });

    it('should return false when 10 URLs saved', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://url1.com');
      store.addUrl('https://url2.com');
      store.addUrl('https://url3.com');
      store.addUrl('https://url4.com');
      store.addUrl('https://url5.com');
      store.addUrl('https://url6.com');
      store.addUrl('https://url7.com');
      store.addUrl('https://url8.com');
      store.addUrl('https://url9.com');
      store.addUrl('https://url10.com');

      expect(store.canSaveMore).toBe(false);
    });

    it('should return true after removing a URL when at max capacity', () => {
      const store = useSavedUrlsStore();
      // Add 10 URLs
      store.addUrl('https://url1.com');
      store.addUrl('https://url2.com');
      store.addUrl('https://url3.com');
      store.addUrl('https://url4.com');
      store.addUrl('https://url5.com');
      store.addUrl('https://url6.com');
      store.addUrl('https://url7.com');
      store.addUrl('https://url8.com');
      store.addUrl('https://url9.com');
      store.addUrl('https://url10.com');

      expect(store.canSaveMore).toBe(false);

      store.removeUrl('https://url1.com');

      expect(store.canSaveMore).toBe(true);
    });
  });

  describe('loadSavedUrls', () => {
    it('should reload URLs from localStorage', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');
      store.addUrl('https://test.com');

      // Clear and reload
      localStorage.setItem(STORAGE_KEY, JSON.stringify(['https://new.com']));
      store.loadSavedUrls();

      expect(store.savedUrls).toEqual(['https://new.com']);
    });

    it('should handle errors when loading', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://example.com');

      localStorage.setItem(STORAGE_KEY, 'invalid json');
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      store.loadSavedUrls();

      expect(store.savedUrls).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('integration', () => {
    it('should maintain order: newest URLs at the end', () => {
      const store = useSavedUrlsStore();
      store.addUrl('https://url1.com');
      store.addUrl('https://url2.com');
      store.addUrl('https://url3.com');

      expect(store.savedUrls[0]).toBe('https://url1.com');
      expect(store.savedUrls[1]).toBe('https://url2.com');
      expect(store.savedUrls[2]).toBe('https://url3.com');
    });

    it('should persist across store instances', () => {
      const store1 = useSavedUrlsStore();
      store1.addUrl('https://example.com');
      store1.addUrl('https://test.com');

      const store2 = useSavedUrlsStore();
      expect(store2.savedUrls).toEqual(['https://example.com', 'https://test.com']);
    });

    it('should handle complex URL scenarios', () => {
      const store = useSavedUrlsStore();
      const urls = [
        'http://localhost:3000',
        'https://example.com/path?query=value',
        'https://subdomain.example.com',
        'http://192.168.1.1:8080',
        'https://example.com:443',
        'https://test1.com',
        'https://test2.com',
        'https://test3.com',
        'https://test4.com',
        'https://test5.com',
      ];

      urls.forEach((url) => store.addUrl(url));

      expect(store.savedUrls.length).toBe(10);
      urls.forEach((url) => {
        expect(store.isUrlSaved(url)).toBe(true);
      });
    });
  });
});
