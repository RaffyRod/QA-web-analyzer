import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLanguageStore } from '../../src/stores/language';

describe('language store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.lang = '';
  });

  describe('initial state', () => {
    it('should initialize with English as default when no localStorage value', () => {
      const store = useLanguageStore();
      expect(store.currentLanguage).toBe('en');
    });

    it('should initialize with language from localStorage', () => {
      localStorage.setItem('language', 'es');
      const store = useLanguageStore();
      expect(store.currentLanguage).toBe('es');
    });
  });

  describe('setLanguage', () => {
    it('should change language to Spanish', () => {
      const store = useLanguageStore();
      store.setLanguage('es');

      expect(store.currentLanguage).toBe('es');
      expect(localStorage.getItem('language')).toBe('es');
      expect(document.documentElement.lang).toBe('es');
    });

    it('should change language to English', () => {
      const store = useLanguageStore();
      store.setLanguage('en');

      expect(store.currentLanguage).toBe('en');
      expect(localStorage.getItem('language')).toBe('en');
      expect(document.documentElement.lang).toBe('en');
    });

    it('should persist language in localStorage', () => {
      const store = useLanguageStore();
      store.setLanguage('es');

      const newStore = useLanguageStore();
      expect(newStore.currentLanguage).toBe('es');
    });
  });

  describe('translations', () => {
    it('should return English translation for valid key', () => {
      const store = useLanguageStore();
      store.setLanguage('en');

      expect(store.t('title')).toBe('QA Web Analyzer');
      expect(store.t('analyzeBtn')).toBe('Analyze');
      expect(store.t('summary')).toBe('Summary');
    });

    it('should return Spanish translation for valid key', () => {
      const store = useLanguageStore();
      store.setLanguage('es');

      expect(store.t('title')).toBe('QA Web Analyzer');
      expect(store.t('analyzeBtn')).toBe('Analizar');
      expect(store.t('summary')).toBe('Resumen');
    });

    it('should return key itself for invalid translation key', () => {
      const store = useLanguageStore();
      const invalidKey = 'nonexistentKey123';

      expect(store.t(invalidKey)).toBe(invalidKey);
    });

    it('should translate all common keys', () => {
      const store = useLanguageStore();
      const commonKeys = [
        'title',
        'subtitle',
        'urlPlaceholder',
        'analyzeBtn',
        'analyzing',
        'stop',
        'summary',
        'images',
        'links',
        'buttons',
        'inputs',
      ];

      store.setLanguage('en');
      commonKeys.forEach((key) => {
        const translation = store.t(key);
        expect(translation).toBeTruthy();
        expect(translation).not.toBe(key);
      });

      store.setLanguage('es');
      commonKeys.forEach((key) => {
        const translation = store.t(key);
        expect(translation).toBeTruthy();
        expect(translation).not.toBe(key);
      });
    });
  });
});
