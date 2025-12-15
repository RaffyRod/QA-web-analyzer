import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref<'en' | 'es'>(
    (localStorage.getItem('language') as 'en' | 'es') || 'en'
  );

  const translations = {
    en: {
      title: 'QA Web Analyzer',
      subtitle: 'Accessibility Analysis Tool',
      urlPlaceholder: 'Enter URL (e.g., http://localhost:3000 or https://example.com)',
      analyzeBtn: 'Analyze',
      analyzing: 'Analyzing page...',
      analysisOptions: 'Analysis Options',
      elementsToCheck: 'Elements to Check',
      attributesToCheck: 'Attributes to Check',
      images: 'Images',
      links: 'Links',
      buttons: 'Buttons',
      inputs: 'Inputs',
      elementsWithRole: 'Elements with Role',
      altText: 'Alt Text',
      ariaLabel: 'aria-label',
      ariaLabelledby: 'aria-labelledby',
      ariaDescribedby: 'aria-describedby',
      ariaHidden: 'aria-hidden',
      ariaExpanded: 'aria-expanded',
      ariaControls: 'aria-controls',
      ariaCurrent: 'aria-current',
      ariaRequired: 'aria-required',
      ariaInvalid: 'aria-invalid',
      tabIndex: 'tabindex',
      lang: 'lang',
      labelElements: '<label> elements',
      titleAttribute: 'title attribute',
      focusStates: 'Focus States (WCAG 2.2 AA)',
      selectAll: 'All',
      deselectAll: 'None',
      summary: 'Summary',
      errorUrlRequired: 'Please enter a URL',
      errorInvalidUrl: 'URL must start with http:// or https://',
      errorAnalysisFailed: 'Failed to analyze page',
    },
    es: {
      title: 'QA Web Analyzer',
      subtitle: 'Herramienta de Análisis de Accesibilidad',
      urlPlaceholder: 'Ingresa URL (ej: http://localhost:3000 o https://example.com)',
      analyzeBtn: 'Analizar',
      analyzing: 'Analizando página...',
      analysisOptions: 'Opciones de Análisis',
      elementsToCheck: 'Elementos a Verificar',
      attributesToCheck: 'Atributos a Verificar',
      images: 'Imágenes',
      links: 'Enlaces',
      buttons: 'Botones',
      inputs: 'Inputs',
      elementsWithRole: 'Elementos con Role',
      altText: 'Texto Alt',
      ariaLabel: 'aria-label',
      ariaLabelledby: 'aria-labelledby',
      ariaDescribedby: 'aria-describedby',
      ariaHidden: 'aria-hidden',
      ariaExpanded: 'aria-expanded',
      ariaControls: 'aria-controls',
      ariaCurrent: 'aria-current',
      ariaRequired: 'aria-required',
      ariaInvalid: 'aria-invalid',
      tabIndex: 'tabindex',
      lang: 'lang',
      labelElements: 'elementos <label>',
      titleAttribute: 'atributo title',
      focusStates: 'Estados de Foco (WCAG 2.2 AA)',
      selectAll: 'Todo',
      deselectAll: 'Ninguno',
      summary: 'Resumen',
      errorUrlRequired: 'Por favor ingresa una URL',
      errorInvalidUrl: 'La URL debe comenzar con http:// o https://',
      errorAnalysisFailed: 'Error al analizar la página',
    },
  };

  function setLanguage(lang: 'en' | 'es') {
    currentLanguage.value = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }

  function t(key: string): string {
    return translations[currentLanguage.value][key as keyof typeof translations.en] || key;
  }

  return {
    currentLanguage,
    translations,
    setLanguage,
    t,
  };
});
