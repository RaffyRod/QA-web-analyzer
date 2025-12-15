import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from '../../src/stores/theme';

describe('theme store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.body.removeAttribute('data-theme');
    document.documentElement.style.cssText = '';
  });

  describe('initial state', () => {
    it('should initialize with light theme as default when no localStorage value', () => {
      const store = useThemeStore();
      expect(store.currentTheme).toBe('light');
    });

    it('should initialize with theme from localStorage', () => {
      localStorage.setItem('theme', 'dark');
      const store = useThemeStore();
      expect(store.currentTheme).toBe('dark');
    });
  });

  describe('applyTheme', () => {
    it('should apply light theme', () => {
      const store = useThemeStore();
      store.applyTheme('light');

      expect(store.currentTheme).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
      expect(document.body.getAttribute('data-theme')).toBe('light');
    });

    it('should apply dark theme', () => {
      const store = useThemeStore();
      store.applyTheme('dark');

      expect(store.currentTheme).toBe('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
      expect(document.body.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply glassmorphism theme', () => {
      const store = useThemeStore();
      store.applyTheme('glassmorphism');

      expect(store.currentTheme).toBe('glassmorphism');
      expect(localStorage.getItem('theme')).toBe('glassmorphism');
    });

    it('should fallback to light theme for invalid theme name', () => {
      const store = useThemeStore();
      store.applyTheme('invalidTheme' as any);

      expect(store.currentTheme).toBe('light');
    });

    it('should set CSS variables on document root', () => {
      const store = useThemeStore();
      store.applyTheme('dark');

      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue(
        '--primary-color'
      );
      expect(primaryColor).toBeTruthy();
    });

    it('should persist theme in localStorage', () => {
      const store = useThemeStore();
      store.applyTheme('dark');

      const newStore = useThemeStore();
      expect(newStore.currentTheme).toBe('dark');
    });
  });

  describe('themes object', () => {
    it('should have themes object available', () => {
      const store = useThemeStore();
      expect(store.themes).toBeDefined();
      expect(typeof store.themes).toBe('object');
    });

    it('should have common themes available', () => {
      const store = useThemeStore();
      const commonThemes = ['light', 'dark', 'glassmorphism'];

      commonThemes.forEach((theme) => {
        expect(store.themes[theme]).toBeDefined();
      });
    });
  });
});
