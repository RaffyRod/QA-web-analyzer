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

  async function analyze(url: string) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, options: options.value }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Analysis failed');
      }

      const data = await response.json();
      results.value = data;
    } catch (err: any) {
      error.value = err.message || 'Failed to analyze page';
      results.value = null;
    } finally {
      isLoading.value = false;
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
    updateOptions,
    reset,
  };
});
